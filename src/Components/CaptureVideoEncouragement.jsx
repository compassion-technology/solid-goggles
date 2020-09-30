import React from 'react'
import Webcam from 'react-webcam'
import recordIcon from '../photos/record icon.png'
import stopIcon from '../photos/stop icon.png'

const CaptureVideoEncouragement = () => {
  const webcamRef = React.useRef(null)
  const mediaRecorderRef = React.useRef({})
  const [capturing, setCapturing] = React.useState(false)
  const [recordedChunks, setRecordedChunks] = React.useState([])

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data))
      }
    },
    [setRecordedChunks]
  )

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true)
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm'
    })
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    )
    mediaRecorderRef.current.start()
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable])

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop()
    setCapturing(false)
  }, [mediaRecorderRef, setCapturing])

  // TODO: If we get storing to S3 working, this will hopefully help
  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm'
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.style = 'display: none'
      a.href = url
      a.download = 'react-webcam-stream-capture.webm'
      a.click()
      window.URL.revokeObjectURL(url)
      setRecordedChunks([])
    }
  }, [recordedChunks])

  return (
    <>
      <Webcam audio={false} ref={webcamRef} style={{ height: '50vh', width: '45vw' }} />
      {capturing ? (
        <button className='media-button stop' onClick={handleStopCaptureClick}><img alt='stop icon' src={stopIcon} />Stop Capture</button>
      ) : (
        <button className='media-button record' onClick={handleStartCaptureClick}><img alt='record icon' src={recordIcon} />Start Capture</button>
      )}
    </>
  )
}

export default CaptureVideoEncouragement
