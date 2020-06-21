import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'

import { fetchQuestions, setIdCategorie } from '../../redux/actions'

const ListCategories = props => {
  const {
    history,
    setIdCategorie,
    levelQuestions,
    fetchQuestions
  } = props

  const getQuestions = async id => {
    try {
      var response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${id}&difficulty=${levelQuestions}&type=multiple`)
      fetchQuestions(response.data)
      history.push('/questoes')
    } catch (error) {
      throw new Error('Unable to fetch questions', error)
    }
  }

  const handleClick = (idCategorie) => {
    setIdCategorie(idCategorie)
    getQuestions(idCategorie)
  }

  return (
    <div>
      <h2>Categorias</h2>
      {props.trivia_categories &&
        props.trivia_categories.map(cat => {
          return <div key={cat.id} onClick={() => handleClick((cat.id).toString())}>
            <p>{cat.name}</p>
          </div>
        })
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    levelQuestions: state.questionsReducer.levelQuestions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setIdCategorie: id => { dispatch(setIdCategorie(id)) },
    fetchQuestions: data => { dispatch(fetchQuestions(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCategories)

ListCategories.propTypes = {
  setIdCategorie: PropTypes.func,
  fetchQuestions: PropTypes.func,
  history: PropTypes.object,
  trivia_categories: PropTypes.array,
  levelQuestions: PropTypes.string
}
