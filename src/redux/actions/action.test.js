import * as types from './actionTypes'
import * as actions from './'

describe('actions', () => {
  it('LIST_QUESTIONS', () => {
    const data = {id: 9, name: "General Knowledge"}
    const expectedAction = {
      type: types.LIST_QUESTIONS,
      data
    }
    expect(actions.fetchQuestions(data)).toEqual(expectedAction)
  })

  it('NEXT_QUESTION', () => {
    const index = 9
    const expectedAction = {
      type: types.NEXT_QUESTION,
      index
    }
    expect(actions.nextQuestion(index)).toEqual(expectedAction)
  })

  it('VIEW_FEEDBACK', () => {
    const expectedAction = {
      type: types.VIEW_FEEDBACK
    }
    expect(actions.viewFeedback()).toEqual(expectedAction)
  })

  it('SET_RIGHT_ANSWER', () => {
    const expectedAction = {
      type: types.SET_RIGHT_ANSWER
    }
    expect(actions.setRightAnswer()).toEqual(expectedAction)
  })

  it('SET_ERROR_ANSWER', () => {
    const expectedAction = {
      type: types.SET_ERROR_ANSWER
    }
    expect(actions.setErrorAnswer()).toEqual(expectedAction)
  })

  it('RESET_LEVEL', () => {
    const expectedAction = {
      type: types.RESET_LEVEL
    }
    expect(actions.resetLevel()).toEqual(expectedAction)
  })

  it('RESET_INDEX_CURRENT', () => {
    const expectedAction = {
      type: types.RESET_INDEX_CURRENT
    }
    expect(actions.resetIndexCurrent()).toEqual(expectedAction)
  })

  it('NEXT_QUESTION', () => {
    const difficulty = 'hard'
    const expectedAction = {
      type: types.CHANGE_DIFFICULTY_QUESTIONS,
      difficulty
    }
    expect(actions.changeDifficulty(difficulty)).toEqual(expectedAction)
  })
})
