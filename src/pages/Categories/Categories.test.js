import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render, cleanup, fireEvent } from '@testing-library/react'

import Categories from '.'

afterEach(cleanup)
const mockStore = configureStore([])

describe('<Categories /> spec', () => {
  let store = mockStore({
    getState: jest.fn(),
    questionsReducer: {
      levelQuestions : ''
    }
  })

  test('renders <Categories />', () => {
    const { getByTestId, container } = render(
      <Provider store={store}>
        <Categories />
      </Provider>
    )

    expect(getByTestId('categories')).toBeVisible()
  })
})
