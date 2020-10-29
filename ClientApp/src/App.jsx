import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './custom.scss'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'
import { Home } from './Home'
import { ViewPolicy } from './ViewPolicy'
import { NewPolicy } from './NewPolicy'
import { UpdatePolicy } from './UpdatePolicy'
import { DeletePolicy } from './DeletePolicy'
import { EditUserProfile } from './EditUserProfile'
import { UserProfile } from './UserProfile'
import { UpdatePolicyForm } from './UpdatePolicyForm'

export function App() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/view" component={ViewPolicy} />
      <Route exact path="/new" component={NewPolicy} />
      <Route exact path="/update" component={UpdatePolicy} />
      <Route exact path="/updateform" component={UpdatePolicyForm} />
      <Route exact path="/delete" component={DeletePolicy} />
      <Route exact path="/profile" component={UserProfile} />
      <Route exact path="/edit" component={EditUserProfile} />
    </Switch>
  )
}
