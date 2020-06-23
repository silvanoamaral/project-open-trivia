import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render, cleanup, waitForElementToBeRemoved } from '@testing-library/react'

import Categories from '.'

afterEach(cleanup)
const mockStore = configureStore([])

describe('<Categories /> spec', () => {
  let store
  beforeEach(() => {
    store = mockStore({
      getState: jest.fn(),
      questionsReducer: {
        levelQuestions : ''
      }
    })
  })

  test('renders <Categories />', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Categories />
      </Provider>
    )

    await waitForElementToBeRemoved(async () => {
      expect(getByTestId('categories')).toBeVisible()
    }).catch(err =>
      err
    )
  })
})
