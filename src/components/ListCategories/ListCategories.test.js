import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render, cleanup, waitForElementToBeRemoved, fireEvent } from '@testing-library/react'

import ListCategories from '.'

afterEach(cleanup)
const mockStore = configureStore([])



describe('<ListCategories /> spec', () => {
  let store
  beforeEach(() => {
    store = mockStore({
      getState: jest.fn(),
      questionsReducer: {
        levelQuestions : ''
      },
      trivia_categories: [{id: 9, name: "General Knowledge"}]
    })
  })

  test('renders <ListCategories />', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ListCategories />
      </Provider>
    )

    expect(getByTestId('listcategories')).toBeVisible()
  })
})
