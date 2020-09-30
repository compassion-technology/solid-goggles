import React, { useContext } from 'react'
import { ViewContext } from '../Context/ViewContext'
import { HOME } from '../constants'
import Confetti from './Confetti'

const Success = () => {
  const [, setView] = useContext(ViewContext)

  const goHome = () => {
    clearTimeout(timeoutBoy)
    setView(HOME)
  }

  const timeoutBoy = setTimeout(() => {
    goHome()
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
            <input type='email' />
          </label>
          <button className='Submit-Button' onClick={goHome}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Success
