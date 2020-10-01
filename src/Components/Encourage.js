import React, { useContext, useEffect, useState } from 'react'
import { SUCCESS } from '../constants'
import { ViewContext } from '../Context/ViewContext'
import BenPhoto from '../photos/Beneficiary Picture.jpg'
import childInfo from '../utils/children/index'
import CaptureVideoEncouragement from './CaptureVideoEncouragement'

const Encourage = ({randomChild, setRandomChild}) => {
  const [encourageCount, setEncourageCount] = useState(0)
  const [encouragementVideoState, setEncouragementVideoState] = useState(false)
  const [hasWebcam, setHasWebcam] = useState(undefined)
  const [, setView] = useContext(ViewContext)
  const [childVideoURL, setChildVideoURL] = useState(undefined)

  useEffect(() => {
    const randomChild = async () => {
      const random = await childInfo.getRandomChild()
      setRandomChild(random)
    }
    randomChild()
  }, [encourageCount, setRandomChild])// This seemingly random dependency is to trigger a new random child anytime you click the shuffle button. Such wow.

  useEffect(() => {
    const getVideo = async () => {
      const headers = {
        apikey: process.env.REACT_APP_API_KEY
      }
      const response = await window.fetch(`https://dev.api.cot-refinery.com/dev/encourages/${randomChild.childId}`, { headers: headers })
      const body = await response.json()
      if (body.mp4Urls) {
        setChildVideoURL(body.mp4Urls[0])
      } else {
        setChildVideoURL(null)
      }
    }
    if (randomChild) {
      getVideo()
    }
  }, [randomChild])

  useEffect(() => {
    function detectWebcam (callback) {
      const md = navigator.mediaDevices
      if (!md || !md.enumerateDevices) return callback(false)
      md.enumerateDevices().then(devices => {
        callback(devices.some(device => device.kind === 'videoinput'))
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
    if (childVideoURL) {
      childBlurb = (
        <video controls>
          Your browser asplode
          <source src={childVideoURL} type='video/mp4' />
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
        <div className='view-button' onClick={handleSendEncouragement}>
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
        <div className='view-button' onClick={handleSendEncouragement}>
          Send Encouragement
        </div>
      </>
    )
  }

  return (
    <div className='Encouragement-View'>
      <div className='Child-Bio' style={childVideoURL ? { margin: '0 3rem' } : {}}>
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
