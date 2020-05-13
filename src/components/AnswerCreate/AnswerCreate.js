import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import AnswerForm from '../Shared/AnswerForm'
import Layout from '../Shared/Layout'

const AnswerCreate = (props, match, location, cancelPath) => {
  const [answer, setAnswer] = useState({
    title: '',
    description: '',
    user_id: props.user.id,
    question_id: props.match.params.id
  })

  const [createdAnswerId, setCreatedAnswerId] = useState(null)

  const handleChange = event => {
    event.persist()
    // const updatedField = { [event.target.name]: event.target.value }
    // const editedMovie = Object.assign(movie, updatedField)
    setAnswer(answer => ({ ...answer, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/answers`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { answer }
    })
      .then(res => setCreatedAnswerId(res.data.answer.id))
      .catch(console.error)
  }

  if (createdAnswerId) {
    return <Redirect to={`/answers/${createdAnswerId}`} />
  }

  return (
    <Layout>
      <AnswerForm
        answer={answer}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </Layout>
  )
}

export default AnswerCreate
