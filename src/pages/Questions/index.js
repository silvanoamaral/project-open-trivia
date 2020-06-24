import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'

import Feedback from '../../components/Feedback'
import QuestionOptions from '../../components/QuestionOptions'

import {
  viewFeedback,
  setRightAnswer,
  setErrorAnswer,
  changeDifficulty,
  resetLevel,
  fetchQuestions,
  resetIndexCurrent
} from '../../redux/actions'

const Questions = props => {
  const {
    questions,
    indexCurrent,
    viewFeedback,
    showHideFeedback,
    setRightAnswer,
    setErrorAnswer,
    errorAnswer,
    rightAnswer,
    levelQuestions,
    changeDifficulty,
    fetchQuestions,
    resetIndexCurrent,
    resetLevel,
    idCategorie,
    history
  } = props

  const [answer, setAnswer] = useState()
  const [activeTab, setActiveTab] = useState()
  const [message, setMessage] = useState()
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [statusAnswer, setStatusAnswer] = useState('')

  const getQuestions = async (level) => {
    if (indexCurrent < 10) {
      try {
        var response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${idCategorie}&difficulty=${level}&type=multiple`)
        fetchQuestions(response.data)
      } catch (error) {
        throw new Error('Unable to fetch questions', error)
      }
    }
  }

  const handleClickClose = () => {
    history.push('/')
    console.log('resetIndexCurrent')
    resetIndexCurrent()
  }

  const rangeCategorie = () => {
    if (rightAnswer === 2 && levelQuestions === 'medium') {
      changeDifficulty('hard')
      getQuestions('hard')
      resetLevel()
    }
    if (rightAnswer === 2 && levelQuestions === 'easy') {
      changeDifficulty('medium')
      getQuestions('medium')
      resetLevel()
    }
    if (errorAnswer === 2 && levelQuestions === 'medium') {
      changeDifficulty('easy')
      getQuestions('easy')
      resetLevel()
    }
    if (errorAnswer === 2 && levelQuestions === 'hard') {
      changeDifficulty('medium')
      getQuestions('medium')
      resetLevel()
    }
  }

  const resetQuestions = () => {
    setActiveTab(null)
    setButtonDisabled(true)
  }

  const handleClickAnswer = () => {
    if (answer) {
      setMessage('Você acertou! ')
      setRightAnswer()
      setStatusAnswer('')
    } else {
      setMessage('Você errou!')
      setStatusAnswer('error')
      setErrorAnswer()
    }
    viewFeedback()
    resetQuestions()
  }

  const handleClickQuestion = (params, index) => {
    setAnswer(params)
    setActiveTab(index)
    setButtonDisabled(false)
  }

  useEffect(() => {
    if (indexCurrent > 9) {
      history.push('/dashboard')
    }

    if (idCategorie === '') {
      history.push('/')
    }

    if (rightAnswer > 1 || errorAnswer > 1) {
      rangeCategorie()
    }
  }, [indexCurrent, idCategorie, rightAnswer, errorAnswer])

  return (
    <div className='questions container'>
      {showHideFeedback &&
        <Feedback message={message} status={statusAnswer} />
      }
      {questions[indexCurrent] &&
        <>
          <QuestionOptions
            {...questions[indexCurrent]}
            incorrectAnswers = {questions[indexCurrent].incorrect_answers}
            correctAnswer = {questions[indexCurrent].correct_answer}
            onClick={handleClickQuestion}
            onClickAnswer={handleClickAnswer}
            onClickClose={handleClickClose}
            disabled={buttonDisabled}
            activeTab={activeTab}
            indexCurrent={indexCurrent}
          />
        </>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    questions: state.questionsReducer.questions,
    indexCurrent: state.questionsReducer.indexCurrent,
    showHideFeedback: state.questionsReducer.showHideFeedback,
    rightAnswer: state.questionsReducer.rightAnswer,
    errorAnswer: state.questionsReducer.errorAnswer,
    levelQuestions: state.questionsReducer.levelQuestions,
    idCategorie: state.questionsReducer.idCategorie
  }
}

const mapDispatchToProps = dispatch => {
  return {
    viewFeedback: () => { dispatch(viewFeedback()) },
    setRightAnswer: () => { dispatch(setRightAnswer()) },
    setErrorAnswer: () => { dispatch(setErrorAnswer()) },
    resetLevel: () => { dispatch(resetLevel()) },
    resetIndexCurrent: () => { dispatch(resetIndexCurrent()) },
    fetchQuestions: data => { dispatch(fetchQuestions(data)) },
    changeDifficulty: difficulty => { dispatch(changeDifficulty(difficulty)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions)

Questions.propTypes = {
  questions: PropTypes.array,
  idCategorie: PropTypes.string,
  indexCurrent: PropTypes.number,
  showHideFeedback: PropTypes.bool,
  fetchQuestions: PropTypes.func,
  viewFeedback: PropTypes.func,
  setRightAnswer: PropTypes.func,
  setErrorAnswer: PropTypes.func,
  changeDifficulty: PropTypes.func,
  resetIndexCurrent: PropTypes.func,
  resetLevel: PropTypes.func,
  rightAnswer: PropTypes.number,
  errorAnswer: PropTypes.number,
  levelQuestions: PropTypes.string,
  history: PropTypes.object
}
