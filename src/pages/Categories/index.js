import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'

import { fetchQuestions, setIdCategorie } from '../../redux/actions'

const Categories = props => {
  const {
    history,
    levelQuestions,
    fetchQuestions,
    setIdCategorie
  } = props

  const [categories, setCategories] = useState(null)

  const getCategories = async () => {
    try {
      var response = await axios.get('https://opentdb.com/api_category.php')
      return response.data
    } catch (error) {
      throw new Error('Unable to fetch categories', error)
    }
  }

  const getQuestions = async id => {
    try {
      var response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${id}&difficulty=${levelQuestions}&type=multiple`)
      fetchQuestions(response.data)
      history.push('/questoes')
    } catch (error) {
      throw new Error('Unable to fetch questions', error)
    }
  }

  useEffect(() => {
    const load = async () => {
      const data = await getCategories()
      setCategories(data.trivia_categories)
    }
    load()
  }, [])

  const handleChange = async (event) => {
    const idCategorie = event.target.value
    getQuestions(idCategorie)
    setIdCategorie(idCategorie)
  }

  return (
    <>
      {categories &&
        <select onChange={handleChange}>
          <option value='0'>Select Category</option>
          {categories.map(cat => {
            return <option value={cat.id} key={cat.id}>{cat.name}</option>
          })}
        </select>
      }
    </>
  )
}

const mapStateToProps = state => {
  return {
    levelQuestions: state.questionsReducer.levelQuestions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchQuestions: data => { dispatch(fetchQuestions(data)) },
    setIdCategorie: id => { dispatch(setIdCategorie(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)

Categories.propTypes = {
  fetchQuestions: PropTypes.func,
  history: PropTypes.object,
  levelQuestions: PropTypes.string,
  setIdCategorie: PropTypes.func
}
