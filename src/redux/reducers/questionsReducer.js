const initState = {
  idCategorie: '',
  levelQuestions: 'medium',
  dashboard: {
    easy: {
      errorAnswer: 0,
      rightAnswer: 0
    },
    medium: {
      errorAnswer: 0,
      rightAnswer: 0
    },
    hard: {
      errorAnswer: 0,
      rightAnswer: 0
    }
  },
  errorAnswer: 1,
  rightAnswer: 1,
  showHideFeedback: false,
  indexCurrent: 0,
  questions: []
}

export const questionsReducer = (state = initState, action) => {
  let level
  let dashboard

  switch (action.type) {
    case 'LIST_QUESTIONS':
      return {
        ...state,
        questions: action.data.results
      }
    case 'NEXT_QUESTION':
      return {
        ...state,
        indexCurrent: state.indexCurrent + 1
      }
    case 'VIEW_FEEDBACK':
      return {
        ...state,
        showHideFeedback: !state.showHideFeedback
      }
    case 'SET_RIGHT_ANSWER':
      level = state.levelQuestions
      dashboard = state.dashboard
      console.log('level', level)

      return {
        ...state,
        errorAnswer: 0,
        rightAnswer: state.rightAnswer + 1,
        dashboard: {
          ...state.dashboard,
          [level]: {
            ...state.dashboard[level],
            rightAnswer: dashboard[level].rightAnswer + 1
          }
        }
      }
    case 'SET_ERROR_ANSWER':
      level = state.levelQuestions
      dashboard = state.dashboard
      console.log('level', level)

      return {
        ...state,
        errorAnswer: state.errorAnswer + 1,
        rightAnswer: 0,
        dashboard: {
          ...state.dashboard,
          [level]: {
            ...state.dashboard[level],
            errorAnswer: dashboard[level].errorAnswer + 1
          }
        }
      }
    case 'RESET_LEVEL':
      return {
        ...state,
        errorAnswer: 1,
        rightAnswer: 1
      }
    case 'SET_ID_CATEGORIE':
      return {
        ...state,
        idCategorie: action.id
      }
    case 'CHANGE_DIFFICULTY_QUESTIONS':
      console.log('CHANGE_DIFFICULTY_QUESTIONS', action)
      return {
        ...state,
        levelQuestions: action.difficulty
      }
    default:
      return state
  }
}
