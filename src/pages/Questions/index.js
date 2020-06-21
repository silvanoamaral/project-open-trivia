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
  fetchQuestions
} from '../../redux/actions'

import './Questions.scss'

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
    resetLevel,
    idCategorie,
    history
  } = props

  const [answer, setAnswer] = useState()
  const [activeTab, setActiveTab] = useState()
  const [message, setMessage] = useState()
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const resetQuestions = () => {
    setActiveTab(null)
    setButtonDisabled(true)
  }

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

  const rangeCategorie = () => {
    if (rightAnswer === 2 && levelQuestions === 'medium') {
      console.log('Precisa aumentar o nível...', 'Nivel atual: ', levelQuestions, 'Nudar nível para hard', 'Id da Categoria', idCategorie)
      changeDifficulty('hard')

      resetLevel()
      getQuestions('hard')
    }
    if (rightAnswer === 2 && levelQuestions === 'easy') {
      changeDifficulty('medium')
      resetLevel()
      getQuestions('medium')
      console.log('Precisa aumentar o nível...', 'Nivel atual: ', levelQuestions, 'Nudar nível para medium', 'Id da Categoria', idCategorie)
    }
    if (errorAnswer === 2 && levelQuestions === 'medium') {
      changeDifficulty('easy')
      resetLevel()
      getQuestions('easy')
      console.log('Precisa diminuir o nível...', 'Nivel atual: ', levelQuestions, 'Nudar nível para easy', 'Id da Categoria', idCategorie)
    }
    if (errorAnswer === 2 && levelQuestions === 'hard') {
      changeDifficulty('medium')
      resetLevel()
      getQuestions('medium')
      console.log('Precisa diminuir o nível...', 'Nivel atual: ', levelQuestions, 'Nudar nível para medium', 'Id da Categoria', idCategorie)
    }
  }

  const handleClickAnswer = () => {
    if (answer) {
      setMessage('Você acertou! ')
      setRightAnswer()
    } else {
      setMessage('Você errou!')
      setErrorAnswer()
    }
    viewFeedback()
    resetQuestions()

    rangeCategorie()
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
  }, [indexCurrent, idCategorie])

  return (
    <div className='questions'>
      {showHideFeedback &&
        <Feedback message={message} />
      }
      {questions[indexCurrent] &&
        <>
          <QuestionOptions
            {...questions[indexCurrent]}
            incorrectAnswers = {questions[indexCurrent].incorrect_answers}
            correctAnswer = {questions[indexCurrent].correct_answer}
            onClick={handleClickQuestion}
            activeTab={activeTab}
            indexCurrent={indexCurrent}
          />
          <button onClick={handleClickAnswer} disabled={buttonDisabled}>Responder</button>
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
  resetLevel: PropTypes.func,
  rightAnswer: PropTypes.number,
  errorAnswer: PropTypes.number,
  levelQuestions: PropTypes.string,
  history: PropTypes.object
}
