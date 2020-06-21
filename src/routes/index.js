import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Questions from '../pages/Questions'
import NotFound from '../pages/NotFound'
import Categories from '../pages/Categories'
import Dashboard from '../pages/Dashboard'

const Router = () => (
  <Switch>
    <Route path="/" exact component={Categories} />
    <Route path="/questoes" component={Questions} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="*" component={NotFound} />
  </Switch>
)

export default Router
