import React, { useContext } from 'react'
import './App.css'
import Home from './Components/Home'
import { ViewContext } from './Context/ViewContext'
import { ENCOURAGE, HOME, SUCCESS } from './constants'
import Encourage from './Components/Encourage'
import Success from './Components/Success'

function App () {
  const [view] = useContext(ViewContext)

  let content
  switch (view) {
    case HOME:
      content = <Home />
      break
    case ENCOURAGE:
      content = <Encourage />
      break
    case SUCCESS:
      content = <Success />
      break
    default:
      break
  }
  return (
    <div className='App'>
      {content}
    </div>
  )
}

export default App
