import {
  LIST_QUESTIONS,
  NEXT_QUESTION,
  VIEW_FEEDBACK,
  SET_RIGHT_ANSWER,
  SET_ERROR_ANSWER,
  RESET_LEVEL,
  SET_ID_CATEGORIE,
  RESET_INDEX_CURRENT,
  CHANGE_DIFFICULTY_QUESTIONS
} from './actionTypes'

export const fetchQuestions = data => ({
  type: LIST_QUESTIONS,
  data
})

export const nextQuestion = index => ({
  type: NEXT_QUESTION,
  index
})

export const viewFeedback = () => ({
  type: VIEW_FEEDBACK
})

export const setRightAnswer = () => ({
  type: SET_RIGHT_ANSWER
})

export const setErrorAnswer = () => ({
  type: SET_ERROR_ANSWER
})

export const resetLevel = () => ({
  type: RESET_LEVEL
})

export const resetIndexCurrent = () => ({
  type: RESET_INDEX_CURRENT
})

export const changeDifficulty = difficulty => ({
  type: CHANGE_DIFFICULTY_QUESTIONS,
  difficulty
})

export const setIdCategorie = id => ({
  type: SET_ID_CATEGORIE,
  id
})
