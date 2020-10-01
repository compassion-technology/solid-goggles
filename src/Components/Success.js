import React, { useState, useContext } from 'react'
import axios from 'axios';
import { ViewContext } from '../Context/ViewContext'
import { HOME } from '../constants'
import Confetti from './Confetti'

const Success = ({childName}) => {
  const [, setView] = useContext(ViewContext)
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    //send thank you email
    axios.get(`https://us-central1-email-api-548d6.cloudfunctions.net/sendEmail?dest=${email}&child=${childName}`)
    clearTimeout(timeoutBoy)
    setView(HOME)
  }

  const timeoutBoy = setTimeout(() => {
    handleSubmit()
  }, 30000000)

  return (
    <div>
      <Confetti />
      <div className='Success-View'>
        <h1>Thank you for your encouragement!</h1>
        <h3>Interested in sponsoring this child or receiving updates about Compassion?</h3>
        <div className='Email-Submission'>
          <label>
            Please provide your email:
            <input type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
          </label>
          <button className='Submit-Button' onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Success
