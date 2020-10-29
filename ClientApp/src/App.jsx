import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './custom.scss'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'
import { Home } from './Home'
import { ViewPolicy } from './ViewPolicy'
import { NewPolicy } from './NewPolicy'
import { EditUserProfile } from './EditUserProfile'
import { UserProfile } from './UserProfile'
import { UpdatePolicyForm } from './UpdatePolicyForm'
import { isLoggedIn } from './auth'

export function App() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      {isLoggedIn() && <Route exact path="/home" component={Home} />}
      {isLoggedIn() && <Route exact path="/view" component={ViewPolicy} />}
      {isLoggedIn() && <Route exact path="/new" component={NewPolicy} />}
      {isLoggedIn() && (
        <Route exact path="/update" component={UpdatePolicyForm} />
      )}
      {isLoggedIn() && <Route exact path="/profile" component={UserProfile} />}
      {isLoggedIn() && <Route exact path="/edit" component={EditUserProfile} />}
      <div>Not Found</div>
    </Switch>
  )
}
