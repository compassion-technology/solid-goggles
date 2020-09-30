import React, { useContext, useEffect, useState } from 'react'
import { SUCCESS } from '../constants'
import { ViewContext } from '../Context/ViewContext'
import BenPhoto from '../photos/Beneficiary Picture.jpg'
import childInfo from '../utils/children/index'
import CaptureVideoEncouragement from './CaptureVideoEncouragement'

const Encourage = () => {
  const [encourageCount, setEncourageCount] = useState(0)
  const [randomChild, setRandomChild] = useState(undefined)
  const [encouragementVideoState, setEncouragementVideoState] = useState(false)
  const [hasWebcam, setHasWebcam] = useState(undefined)
  const [, setView] = useContext(ViewContext)

  useEffect(() => {
    const randomChild = async () => {
      const random = await childInfo.getRandomChild()
      const childHasVideo = Math.random() < 0.5
      if (childHasVideo) {
        random.video = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
      }
      setRandomChild(random)
    }
    randomChild()
  }, [encourageCount])// This seemingly random dependency is to trigger a new random child anytime you click the shuffle button. Such wow.

  useEffect(() => {
    function detectWebcam (callback) {
      let md = navigator.mediaDevices
      if (!md || !md.enumerateDevices) return callback(false)
      md.enumerateDevices().then(devices => {
        callback(devices.some(device => 'videoinput' === device.kind))
      })
    }

    detectWebcam(deviceHasWebcam => {
      setHasWebcam(deviceHasWebcam)
    })
  }, [])

  const handleSendEncouragement = () => {
    setView(SUCCESS)
  }

  let childName = null
  let childBio = null
  if (randomChild) {
    childName = randomChild.name

    let childBlurb = null
    if (randomChild.video) {
      childBlurb = (
        <video controls>
          Your browser asplode
          <source src={randomChild.video} type='video/mp4' />
        </video>)
    } else {
      childBlurb = (<img src={BenPhoto} alt={`${randomChild.name}'s portrait`} />)
    }
    childBio = (
      <>
        <div className='Bio-Info'>
          {childBlurb}
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
        <button className='state-button' onClick={() => {setEncourageCount(encourageCount + 1)}}>
          Shuffle
        </button>
      </>
    )
  }

  let encouragementType = null
  let encouragementToggleText = ''
  if (encouragementVideoState && hasWebcam) {
    encouragementToggleText = 'Push this button to write an encouraging message instead!'
    encouragementType = (
      <>
        <h1>Record an encouraging message to {childName}</h1>
        <CaptureVideoEncouragement />
        <div className='EncouragementCTA' onClick={handleSendEncouragement}>
          Send Encouragement
        </div>
      </>
    )
  } else {
    encouragementToggleText = 'Push this button to record an encouraging video instead!'
    encouragementType = (
      <>
        <h1>Write an encouraging message to {childName}!</h1>
        <textarea className='Encouragement-Text' />
        <div className='EncouragementCTA' onClick={handleSendEncouragement}>
          Send Encouragement
        </div>
      </>
    )
  }

  return (
    <div className='Encouragement-View'>
      <div className='Child-Bio' style={randomChild && randomChild.video ? { margin: '0 3rem' } : {}}>
        {childBio}
      </div>
      <div className='Encouragement'>
        {hasWebcam ? <button
          onClick={() => setEncouragementVideoState(!encouragementVideoState)}
          className='state-button'>{encouragementToggleText}</button> : null}
        {encouragementType}
      </div>
    </div>
  )
}

export default Encourage
