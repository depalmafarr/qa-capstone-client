import React from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'

// import apiUrl from '../../apiConfig'
// import Layout from '../Shared/Layout'

// let questionId = ''

const Home = () => {
  return (
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <h3 id="homeTitle">Welcome to the Mixer Questions and Answers app!</h3>
      <p>This app was made to give anybody the ability to have their mixer.com questions answered. If you have any questions about anything related to Mixer, check the questions tab after signing in. If you do not find the answer you are looking for, try creating your own question and come back to see if it was answered!</p>
      <p><Link to="/sign-up">Sign up</Link> or <Link to="/sign-in">Sign in</Link> to look at questions, ask a question, or check out answers to current questions about Mixer.</p>
    </div>
  )
}
export default Home
