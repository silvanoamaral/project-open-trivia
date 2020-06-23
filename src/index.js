import React from 'react'
import { render } from 'react-snapshot'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Router from './routes'
import store from './redux/store'
import Header from './common/Header'

import './styles/main.scss'

render(
  <Provider store={ store }>
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  </Provider>, document.getElementById('root')
)
