import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'

import ListCategories from '../../components/ListCategories'

const initialRequestInfo = {
  error: null,
  data: null,
  loading: false
}

const Categories = props => {
  const {
    history
  } = props

  const [requestInfo, setRequestInfo] = useState(initialRequestInfo)

  const load = async (config) => {
    setRequestInfo({
      ...initialRequestInfo,
      loading: true
    })

    let response = null

    try {
      response = await axios({
        ...config
      })

      setRequestInfo({
        ...initialRequestInfo,
        data: response.data
      })
    } catch (error) {
      setRequestInfo({
        ...initialRequestInfo,
        error
      })
    }
  }

  useEffect(() => {
    load({
      url: 'https://opentdb.com/api_category.php',
      method: 'get'
    })
  }, [])

  return (
    <div data-testid='categories' className='container'>
      {requestInfo.data &&
        <ListCategories {...requestInfo.data} history={history} />
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    levelQuestions: state.questionsReducer.levelQuestions
  }
}

export default connect(mapStateToProps)(Categories)

Categories.propTypes = {
  history: PropTypes.object,
  levelQuestions: PropTypes.string
}
