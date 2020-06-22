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
    onClickAnswer
  } = props

  return (
    <div>
      <div className='title'>
        <h2>{category}</h2>
        <span><img src={require('../../assets/images/x-circle.svg')} /> Fechar</span>
      </div>

      <div className='questions__box'>
        <div>
          <p>Questão {indexCurrent + 1}</p>
          <p className='level'>
            <img src={require('../../assets/images/star.svg')} />
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
  onClickAnswer: PropTypes.func,
  disabled: PropTypes.bool,
  category: PropTypes.string,
  difficulty: PropTypes.string,
  question: PropTypes.string,
  correctAnswer: PropTypes.string,
  incorrectAnswers: PropTypes.array,
  onClick: PropTypes.func,
  activeTab: PropTypes.number,
  indexCurrent: PropTypes.number
}
