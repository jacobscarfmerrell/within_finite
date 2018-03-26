import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'
import SectionIndexContainer from './containers/SectionIndexContainer'
import Layout from './components/Layout'

const App = props => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute component={SectionIndexContainer} />
      </Route>
    </Router>
  )
}

export default App;
