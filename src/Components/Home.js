import React from 'react'
import img1 from '../photos/passion-project-img1.jpg'
import ConfettiButton from './ConfettiButton'

const Home = () => {

  const rings = [
    { count: 6, baseRadius: 300 },
    { count: 15, baseRadius: 600 }
  ]
  const imageCount = 21
  const renderImages = (imageCount) => {
    const images = []
    const centerY = window.innerHeight / 2
    const centerX = window.innerWidth / 2
    const imgClasses = [
      { className: 'imgLarge', size: 150 },
      { className: 'imgMedium', size: 125 },
      { className: 'imgSmall', size: 100 }]

    for (const currentRing of rings) {
      for (let i = 0; i < currentRing.count && images.length < imageCount; i++) {
        const imageClass = imgClasses[Math.round(Math.random() * 2)]
        const angleEntropy = (Math.random() * Math.PI / 9) - (Math.PI / 18)
        const radiusEntropy = Math.round(Math.random() * currentRing.baseRadius / 6)
        const positionStyle = {
          left: `${centerX - imageClass.size + Math.cos((2 * Math.PI * i / currentRing.count) + angleEntropy) * (currentRing.baseRadius + radiusEntropy)}px`,
          top: `${centerY - imageClass.size + Math.sin((2 * Math.PI * i / currentRing.count) + angleEntropy) * (currentRing.baseRadius + radiusEntropy)}px`
        }
        images.push(
          <img className={`imgBase ${imageClass.className}`} src={img1} style={positionStyle} />
        )
      }
    }
    return images
  }

  return (
    <div className='Home'>
      <ConfettiButton />
      {renderImages(imageCount)}
    </div>
  )
}

export default Home
