import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import IndexQuestions from '../IndexQuestions/IndexQuestions'
import Question from '../Question/Question'
import QuestionEdit from '../QuestionEdit/QuestionEdit'
import QuestionCreate from '../QuestionCreate/QuestionCreate'
import AnswerCreate from '../AnswerCreate/AnswerCreate'
import AnswerEdit from '../AnswerEdit/AnswerEdit'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          {/* This is where the questions start */}
          <Route user={user} exact path='/questions/:id' render={({ match }) => (
            <Question msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} exact path='/questions/:id/edit' render={({ match }) => (
            <QuestionEdit msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-question' render={() => (
            <QuestionCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/questions' render={() => (
            <IndexQuestions msgAlert={this.msgAlert} />
          )} />

          {/* This is where the answers start */}
          <AuthenticatedRoute user={user} exact path='/create-answer/:id' render={({ match }) => (
            <AnswerCreate msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} exact path='/answers/:id/edit' render={({ match }) => (
            <AnswerEdit msgAlert={this.msgAlert} user={user} match={match} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
