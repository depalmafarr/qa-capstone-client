import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import QuestionForm from '../Shared/QuestionForm'
import Layout from '../Shared/Layout'

const QuestionEdit = (props, match, location, cancelPath) => {
  const [question, setQuestion] = useState(
    {
      title: '',
      description: ''
    })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/questions/${props.match.params.id}`)
      .then(res => setQuestion(res.data.question))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setQuestion(question => ({ ...question, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/questions/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { question }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to={`/questions/${props.match.params.id}`} />
  }

  return (
    <Layout>
      <QuestionForm
        question={question}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/questions/${props.match.params.id}`}
      />
    </Layout>
  )
}

export default QuestionEdit
