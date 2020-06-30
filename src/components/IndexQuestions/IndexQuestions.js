import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../Shared/Layout'

const IndexQuestions = (props) => {
  const [questions, setQuestions] = useState([])
  // const [deleted, setDeleted] = useState(false)
  useEffect(() => {
    axios(`${apiUrl}/questions`)
      .then(res => setQuestions(res.data.questions))
      .catch(console.error)
  }, [])

  const questionsJsx = questions.map(question => (
    <li id="Questions" key={question.id}>
      <Link to={`/questions/${question.id}`}>
        {question.title}</Link>
    </li>
  ))

  return (
    <Layout>
      <div>
        <h4>{questions.title}</h4>
        <p>Unsolved Questions: {questions.description}</p>

        { questionsJsx }
      </div>
    </Layout>
  )
}

export default IndexQuestions
