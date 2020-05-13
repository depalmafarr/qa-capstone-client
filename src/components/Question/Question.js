import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../Shared/Layout'

const Question = (props) => {
  const [question, setQuestion] = useState(null)
  const [deleted, setDeleted] = useState(false)
  useEffect(() => {
    axios(`${apiUrl}/questions/${props.match.params.id}`)
      .then(res => setQuestion(res.data.question))
      .catch(console.error)
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/questions/${props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }
  // render () {
  //   const { movie, deleted } = this.state
  if (!question) {
    return <p>Loading...</p>
  }
  if (deleted) {
    return <Redirect to={
      { pathname: '/', state: { msg: 'Question succesfully deleted!' } }
    } />
  }
  return (
    <Layout>
      <h4>{question.title}</h4>
      <p>Description: {question.description}</p>
      <button onClick={destroy}>Delete Question</button>
      <Link to={`/questions/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/questions">Back to all questions</Link>
    </Layout>
  )
}
export default Question
