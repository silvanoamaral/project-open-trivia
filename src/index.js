import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Router from './routes'
import store from './redux/store'
import Header from './common/Header'

import './styles/main.scss'

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  </Provider>, document.getElementById('root')
)
