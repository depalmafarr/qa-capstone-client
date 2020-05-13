import React from 'react'
import { Link } from 'react-router-dom'

const AnswerForm = ({ answer, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Reponse</label>
    <input
      placeholder="Your Answer"
      value={answer.response}
      name="response"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default AnswerForm
