import React, { useEffect, useState } from 'react'
import childInfo from '../utils/children/index'
import CaptureVideoEncouragement from './CaptureVideoEncouragement'

const Encourage = () => {
  const [randomChild, setRandomChild] = useState(undefined)

  useEffect(() => {
    const randomChild = async () => {
      const random = await childInfo.getRandomChild()
      setRandomChild(random)
    }
    randomChild()
  }, [])

  let childName = null
  let childBio = null
  if (randomChild) {
    childName = randomChild.name
    childBio = (
      <div className='Bio-Info'>
        <img src={randomChild.image} alt={`${randomChild.name}'s portrait`} />
        <div>
          Name: {randomChild.name}
        </div>
        <div>
          Age: {randomChild.age}
        </div>
        <div>
          Gender: {randomChild.gender}
        </div>
        <div>
          Country: {randomChild.country}
        </div>
      </div>
    )
  }

  return (
    <div className='Encouragement-View'>
      <div className='Child-Bio'>
        {childBio}
      </div>
      <div className='Encouragement'>
        <CaptureVideoEncouragement />
        {/*Write an encouraging message to {childName}*/}
        {/*<textarea className='Encouragement-Text' />*/}
        {/*<div className='EncouragementCTA'>*/}
        {/*  Send Encouragement*/}
        {/*</div>*/}
      </div>
    </div>
  )
}

export default Encourage
