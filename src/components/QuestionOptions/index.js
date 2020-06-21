import React from 'react'
import PropTypes from 'prop-types'

const QuestionOptions = props => {
  const {
    category,
    difficulty,
    question,
    activeTab,
    incorrectAnswers,
    correctAnswer,
    indexCurrent,
    onClick
  } = props

  return (
    <div>
      <div>
        <h2>{category}</h2>
        <span>Fechar</span>
      </div>

      <div className='questions__box'>
        <div>
          <p>Questão {indexCurrent + 1}</p>
          <p>{difficulty}</p>
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
      </div>
    </div>
  )
}

export default QuestionOptions

QuestionOptions.propTypes = {
  category: PropTypes.string,
  difficulty: PropTypes.string,
  question: PropTypes.string,
  correctAnswer: PropTypes.string,
  incorrectAnswers: PropTypes.array,
  onClick: PropTypes.func,
  activeTab: PropTypes.number,
  indexCurrent: PropTypes.number
}
