import React from 'react'
import PropTypes from 'prop-types'

import './QuestionOptions.scss'

const QuestionOptions = props => {
  const {
    category,
    difficulty,
    question,
    activeTab,
    incorrectAnswers,
    correctAnswer,
    indexCurrent,
    onClick,
    disabled,
    onClickAnswer,
    onClickClose
  } = props

  return (
    <div>
      <div className='title'>
        <h2>{category}</h2>
        <span onClick={onClickClose}>
          <img src={require('../../assets/images/x-circle.svg')} alt='x-circle' />
          Fechar
        </span>
      </div>

      <div className='questions__box'>
        <div>
          <p>Questão {indexCurrent + 1}</p>
          <p className='level'>
            <img src={require('../../assets/images/star.svg')} alt='star' />
            {difficulty}
          </p>
        </div>

        <p>{question}</p>

        <div className='answer'>
          <ul>
            {incorrectAnswers.map((item, index) => {
              return <li key={item} className={activeTab === index ? 'active' : ''}>
                <span
                  onClick={() => onClick(false, index)}
                >{item}
                </span></li>
            })}
            <li className={activeTab === 4 ? 'active' : ''}>
              <span onClick={() => onClick(true, 4)}>
                {correctAnswer}
              </span>
            </li>
          </ul>
        </div>
        <div className='btn'>
          <button onClick={onClickAnswer} disabled={disabled}>Responder</button>
        </div>
      </div>
    </div>
  )
}

export default QuestionOptions

QuestionOptions.propTypes = {
  onClickClose: PropTypes.func,
  onClickAnswer: PropTypes.func,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  category: PropTypes.string,
  difficulty: PropTypes.string,
  question: PropTypes.string,
  correctAnswer: PropTypes.string,
  incorrectAnswers: PropTypes.array,
  activeTab: PropTypes.number,
  indexCurrent: PropTypes.number
}
