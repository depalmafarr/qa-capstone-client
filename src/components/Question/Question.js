import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../Shared/Layout'

let questionId = ''

const Question = (props, match, location, cancelPath) => {
  const [question, setQuestion] = useState(null)
  const [deleted, setDeleted] = useState(false)
  useEffect(() => {
    axios(`${apiUrl}/questions/${props.match.params.id}`)
      .then(res => setQuestion(res.data.question))
      .catch(console.error)
  }, [])

  const destroy = () => {
    // console.log(props)
    axios({
      url: `${apiUrl}/questions/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }
  // render () {
  //   const { question, deleted } = this.state
  if (!question) {
    return <p>Loading...</p>
  }
  if (deleted) {
    return <Redirect to={
      { pathname: '/questions', state: { msg: 'Question succesfully deleted!' } }
    } />
  }

  // destroy answer
  const destroyA = (event) => {
    console.log('line 44 question file', event.target.id)
    axios({
      url: `${apiUrl}/answers/${event.target.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }
  // render () {
  //   const { question, deleted } = this.state
  if (!question) {
    return <p>Loading...</p>
  }
  if (deleted) {
    return <Redirect to={
      { pathname: '/questions', state: { msg: 'Answer succesfully deleted!' } }
    } />
  }

  // console.log(question.answers)
  const answersJsx = question.answers.map(answer => (
    <li key={answer.id}>{answer.response}
      <Link to={`/answers/${answer.id}/edit`} answer={answer}>
        <button>Edit</button>
      </Link>
      <button id={answer.id} key={answer.id} onClick={destroyA}>Delete Answer</button>
    </li>
  ))

  questionId = question.id
  // console.log(questionId)

  return (
    <Layout>
      <h4>{question.title}</h4>
      <p>Description: {question.description}</p>
      <button onClick={destroy}>Delete Question</button>
      <Link to={`/questions/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to={`/create-answer/${props.match.params.id}`}>
        <button>Answer</button>
      </Link>

      <p>Answers: {answersJsx}</p>

      <Link to="/questions">Back to all questions</Link>
    </Layout>
  )
}
export default Question
export { questionId }
