import React from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'

// import apiUrl from '../../apiConfig'
// import Layout from '../Shared/Layout'

// let questionId = ''

const Home = () => {
  return (
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <h3>Welcome to the Mixer Questions and Answers app!</h3>
      <p><Link to="/sign-up">Sign up</Link> or <Link to="/sign-in">Sign in</Link> to look at questions, ask a question, or check out answers to current question</p>
    </div>
  )
}
export default Home
