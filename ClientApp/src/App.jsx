import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './custom.scss'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'
import { Home } from './Home'
import { NewPolicy } from './NewPolicy'

export function App() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/new" component={NewPolicy} />
    </Switch>
  )
}
