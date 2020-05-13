import React from 'react'
import { Link } from 'react-router-dom'

const QuestionForm = ({ question, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder="Your Question"
      value={question.title}
      name="title"
      onChange={handleChange}
    />

    <label>Description</label>
    <input
      placeholder="Description"
      value={question.director}
      name="description"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default QuestionForm
