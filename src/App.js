import React, { useState, useEffect, useContext } from 'react'
import './App.css'
import Home from './Components/Home'
import { ViewContext } from './Context/ViewContext'
import { ENCOURAGE, HOME, SUCCESS } from './constants'
import Encourage from './Components/Encourage'
import Success from './Components/Success'
import childInfo from './utils/children/index'

function App () {
  const [view] = useContext(ViewContext)
  const [randomChild, setRandomChild] = useState(undefined)

  useEffect(() => {
    const randomChild = async () => {
      const random = await childInfo.getRandomChild()
      setRandomChild(random)
    }
    randomChild()
  }, [])

  let content
  switch (view) {
    case HOME:
      content = <Home />
      break
    case ENCOURAGE:
      content = <Encourage randomChild={randomChild} setRandomChild={setRandomChild}/>
      break
    case SUCCESS:
      content = <Success childName={randomChild.name}/>
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
