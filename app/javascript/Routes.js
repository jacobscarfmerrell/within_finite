import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'
import App from './containers/App'
import Layout from './components/Layout'

const Routes = props => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute component={App} />
      </Route>
    </Router>
  )
}

export default Routes;
