import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { nextQuestion, viewFeedback } from '../../redux/actions'

import './Feedback.scss'

const Feedback = props => {
  const {
    message,
    nextQuestion,
    viewFeedback,
    status
  } = props

  const handleClick = () => {
    nextQuestion()
    viewFeedback()
  }

  return (
    <div className={`lightbox ${status}`}>
      <div>
        <span></span>
        <strong>{message}</strong>
        <button onClick={handleClick}>Avançar <img src={require('../../assets/images/arrow-right.svg')} alt='arrow' /></button>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    nextQuestion: () => { dispatch(nextQuestion()) },
    viewFeedback: () => { dispatch(viewFeedback()) }
  }
}

export default connect(null, mapDispatchToProps)(Feedback)

Feedback.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string,
  nextQuestion: PropTypes.func,
  viewFeedback: PropTypes.func
}
