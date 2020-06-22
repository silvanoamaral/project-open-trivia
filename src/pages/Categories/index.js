import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ListCategories from '../../components/ListCategories'

import useApi from '../../utils/useApi'
import { fetchQuestions, setIdCategorie } from '../../redux/actions'

const Categories = props => {
  const {
    history
  } = props

  const [load, loadInfo] = useApi({
    url: 'https://opentdb.com/api_category.php',
    method: 'get'
  })

  useEffect(() => {
    load()
  }, [])

  return (
    <div data-testid='categories' className='container'>
      {loadInfo.data &&
        <ListCategories {...loadInfo.data} history={history} />
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
