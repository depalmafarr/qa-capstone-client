import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import QuestionForm from '../Shared/QuestionForm'
import Layout from '../Shared/Layout'

const QuestionCreate = (props, match, location, cancelPath) => {
  const [question, setQuestion] = useState({
    title: '',
    description: '',
    user_id: props.user.id
  })

  const [createdQuestionId, setCreatedQuestionId] = useState(null)

  const handleChange = event => {
    event.persist()
    // const updatedField = { [event.target.name]: event.target.value }
    // const editedMovie = Object.assign(movie, updatedField)
    setQuestion(editedQuestion => ({ ...question, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/questions`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { question }
    })
      .then(res => setCreatedQuestionId(res.data.question.id))
      .catch(console.error)
  }

  if (createdQuestionId) {
    return <Redirect to={`/questions/${createdQuestionId}`} />
  }

  return (
    <Layout>
      <QuestionForm
        question={question}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </Layout>
  )
}

export default QuestionCreate
