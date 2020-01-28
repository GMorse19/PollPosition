import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Subject from '../Subjects/Subject.js'
import Subjects from '../Subjects/Subjects.js'
import SubjectCreate from '../Subjects/SubjectCreate.js'
import SubjectEdit from '../Subjects/SubjectEdit.js'
import ChoiceCreate from '../Choices/ChoiceCreate.js'
import Choices from '../Choices/Choices.js'
import ChoiceEdit from '../Choices/ChoiceEdit.js'
import Home from '../Home/Home.js'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <Route exact path='/' render={() => (
            <Home alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} exact path='/subjects' render={() => (
            <Subjects alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/subjects/:id' render={() => (
            <Subject alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-subject' render={() => (
            <SubjectCreate alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/subjects/:id/edit' render={() => (
            <SubjectEdit alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/choices' render={() => (
            <Choices alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/subjects/:id/create-choice' render={() => (
            <ChoiceCreate alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/subjects/:id/choices/:id/edit-choice' render={() => (
            <ChoiceEdit alert={this.alert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
