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

  // console.log('line 66', props.user.id)
  const answersJsx = question.answers.map(answer => {
    // console.log(answer.user.id)
    return answer.user.id === props.user.id
      ? <li id="answerList" key={answer.id}>{answer.response}
        <Link to={`/answers/${answer.id}/edit`} answer={answer}>
          <button>Edit</button>
        </Link>
        <button id={answer.id} key={answer.id} onClick={destroyA}>Delete Answer</button>
      </li> : <li key={answer.id}>{answer.response}</li>
  }
  //   (
  //   if (answer.user.id === props.user.id) {
  //     <li key={answer.id}>{answer.response}
  //       <Link to={`/answers/${answer.id}/edit`} answer={answer}>
  //         <button>Edit</button>
  //       </Link>
  //       <button id={answer.id} key={answer.id} onClick={destroyA}>Delete Answer</button>
  //     </li>
  //   } else {
  //   <li key={answer.id}>{answer.response}</li>
  // }
  // )
  )

  questionId = question.id
  // console.log(questionId)
  // console.log('props', props)
  // console.log('question', question.user.id)
  let jsx
  if (question.user.id === props.user.id) {
    jsx = (
      <Layout>
        <br></br>
        <h4 className="questionTitle">{question.title}</h4>
        <p>Description: {question.description}</p>
        <button onClick={destroy}>Delete Question</button>
        <Link to={`/questions/${props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to={`/create-answer/${props.match.params.id}`}>
          <button>Answer</button>
        </Link>

        <p id="answerTitle">Answers: {answersJsx}</p>

        <Link to="/questions">Back to all questions</Link>
      </Layout>
    )
  } else {
    jsx = (
      <Layout>
        <h4 className="questionTitle">{question.title}</h4>
        <p>Description: {question.description}</p>
        <Link to={`/create-answer/${props.match.params.id}`}>
          <button>Answer</button>
        </Link>

        <p id="answerTitle">Answers: {answersJsx}</p>

        <Link to="/questions">Back to all questions</Link>
      </Layout>
    )
  }
  return jsx
}
export default Question
export { questionId }
