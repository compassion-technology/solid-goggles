import React from 'react'
import img1 from '../photos/passion-project-img1.jpg'

const Home = () => {

  const imageCount = 6
  const renderImages = (imageCount) => {
    let images = []
    const centerY = window.innerHeight / 2
    const centerX = window.innerWidth / 2
    const imgClasses = ['imgLarge', 'imgMedium', 'imgSmall']
    for (let i = 0; i < imageCount; i++) {
      const positionStyle = {
        left: `${centerX + Math.cos(Math.PI * i / 3) * 350}px`,
        top: `${centerY + Math.sin(Math.PI * i / 3) * 350}px`
      }
      images.push(
        <img className={imgClasses[Math.round(Math.random() * 2)]} src={img1} style={positionStyle} />
      )
    }
    return images
  }

  return (
    <div className='Home'>
      <div className='EncouragementCTA'>
        ENCOURAGE A CHILD OR ELSE...
      </div>
      {renderImages(imageCount)}
    </div>
  )
}

export default Home
