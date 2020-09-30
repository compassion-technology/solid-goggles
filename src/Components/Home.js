import React from 'react'
import img1 from '../photos/passion-project-img1.jpg'
import img10 from '../photos/passion-project-img10.jpg'
import img11 from '../photos/passion-project-img11.jpg'
import img12 from '../photos/passion-project-img12.jpg'
import img13 from '../photos/passion-project-img13.jpg'
import img14 from '../photos/passion-project-img14.jpg'
import img15 from '../photos/passion-project-img15.jpg'
import img16 from '../photos/passion-project-img16.jpg'
import img17 from '../photos/passion-project-img17.jpg'
import img18 from '../photos/passion-project-img18.jpg'
import img19 from '../photos/passion-project-img19.jpg'
import img2 from '../photos/passion-project-img2.jpg'
import img20 from '../photos/passion-project-img20.jpg'
import img3 from '../photos/passion-project-img3.jpg'
import img4 from '../photos/passion-project-img4.jpg'
import img5 from '../photos/passion-project-img5.jpg'
import img6 from '../photos/passion-project-img6.jpg'
import img7 from '../photos/passion-project-img7.jpg'
import img8 from '../photos/passion-project-img8.jpg'
import img9 from '../photos/passion-project-img9.jpg'
import ConfettiButton from './ConfettiButton'

const Home = () => {

  const orderedPhotos = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
    img11, img12, img13, img14, img15, img16, img17, img18, img19, img20]

  const photos = []
  for (let i = 0; i < 20; i++) {
    const randIndex = Math.round(Math.random() * (orderedPhotos.length - 1))
    photos.push(orderedPhotos.slice(randIndex, randIndex + 1)[0])
    orderedPhotos.splice(randIndex, 1)
  }

  // Okay so this is horrible but...what happens in hackathon, stays in hackathon -- FBurklin, 2020-09-30
  // (to be clear, this is ensuring that the 21st image is set to be a duplicate of one that it's both not close to, and shouldn't even be on screen)
  photos.push(photos[15])

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
          <img className={`imgBase ${imageClass.className}`} alt='' src={photos[images.length]} style={positionStyle} />
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
