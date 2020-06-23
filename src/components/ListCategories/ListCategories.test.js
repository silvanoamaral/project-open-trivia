import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render, cleanup, waitForElementToBeRemoved, fireEvent } from '@testing-library/react'

import { fetchQuestions } from '../../redux/actions'

import ListCategories from '.'

afterEach(cleanup)
const mockStore = configureStore([])

const data = [
  {id: 9, name: "General Knowledge"}
]

const response = {
  category: "Sports",
  type: "multiple",
  difficulty: "medium",
  question: "How many premier league trophies did Sir Alex Ferguson win during his time at Manchester United?",
  correct_answer: "13",
  incorrect_answers: [
    "11",
    "20",
    "22"
  ]
}

describe('<ListCategories /> spec', () => {
  let store
  beforeEach(() => {
    store = mockStore({
      getState: jest.fn(),
      questionsReducer: {
        levelQuestions : ''
      }
    })
  })

  test('renders <ListCategories />', async () => {
    const { getByTestId, container } = render(
      <Provider store={store}>
        <ListCategories trivia_categories={data} history={{push: jest.fn()}} />
      </Provider>
    )

    const btn = getByTestId('linkcategories')
    fireEvent.click(btn)

    await waitForElementToBeRemoved(async () => {
      store.dispatch(fetchQuestions(response))
    }).catch(err =>
      err
    )
    
    expect(getByTestId('listcategories')).toBeVisible()
  })
})
