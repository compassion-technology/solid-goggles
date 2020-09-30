import React, { useContext, useEffect, useState } from 'react'
import childInfo from '../utils/children/index'
import CaptureVideoEncouragement from './CaptureVideoEncouragement'
import { ViewContext } from '../Context/ViewContext'
import { SUCCESS } from '../constants'

const Encourage = () => {
  const [randomChild, setRandomChild] = useState(undefined)
  const [encouragementVideoState, setEncouragementVideoState] = useState(false)
  const [hasWebcam, setHasWebcam] = useState(undefined)
  const [, setView] = useContext(ViewContext)

  useEffect(() => {
    const randomChild = async () => {
      const random = await childInfo.getRandomChild()
      setRandomChild(random)
    }
    randomChild()
  }, [])

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

  let encouragementType = null
  let encouragementToggleText = ''
  if (encouragementVideoState && hasWebcam) {
    encouragementToggleText = 'Write an encouraging message'
    encouragementType = (
      <>
        Record an encouraging message to {childName}
        <CaptureVideoEncouragement />
        <div className='EncouragementCTA' onClick={handleSendEncouragement}>
          Send Encouragement
        </div>
      </>
    )
  } else {
    encouragementToggleText = 'Record an encouraging video'
    encouragementType = (
      <>
        Write an encouraging message to {childName}
        <textarea className='Encouragement-Text' />
        <div className='EncouragementCTA' onClick={handleSendEncouragement}>
          Send Encouragement
        </div>
      </>
    )
  }

  return (
    <div className='Encouragement-View'>
      <div className='Child-Bio'>
        {childBio}
      </div>
      <div className='Encouragement'>
        {hasWebcam ? <button
          onClick={() => setEncouragementVideoState(!encouragementVideoState)}>{encouragementToggleText}</button> : null}
        {encouragementType}
      </div>
    </div>
  )
}

export default Encourage
