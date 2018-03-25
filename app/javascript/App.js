import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'
import SectionRhythmContainer from './containers/SectionRhythmContainer'
import Layout from './components/Layout'

const App = props => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute component={SectionRhythmContainer} />
      </Route>
    </Router>
  )
}

export default App;
