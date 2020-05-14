import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import AnswerForm from '../Shared/AnswerForm'
import Layout from '../Shared/Layout'
import { questionId } from '../Question/Question'

const AnswerEdit = (props, match, location, cancelPath) => {
  const [answer, setAnswer] = useState(
    {
      response: ''
    })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/answers/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setAnswer(res.data.answer))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setAnswer(answer => ({ ...answer, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    // console.log('In handleSubmit')
    // console.log(answer)
    // console.log(event.target)
    axios({
      url: `${apiUrl}/answers/${answer.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { answer }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to={`/questions/${questionId}`} />
  }

  return (
    <Layout>
      <AnswerForm
        answer={answer}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/questions/${questionId}`}
      />
    </Layout>
  )
}

export default AnswerEdit
