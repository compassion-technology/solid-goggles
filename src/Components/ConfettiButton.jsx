import React, { useContext, useEffect } from 'react'
import { ViewContext } from '../Context/ViewContext'
import { ENCOURAGE } from '../constants'

const ConfettiButton = () => {
  const [, setView] = useContext(ViewContext)

  // Taken from https://codepen.io/timohausmann/pen/icCer
  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60)
      }
  })()

  Math.randMinMax = function (min, max, round) {
    let val = min + (Math.random() * (max - min))

    if (round) val = Math.round(val)

    return val
  }
  Math.TO_RAD = Math.PI / 180
  Math.getAngle = function (x1, y1, x2, y2) {
    const dx = x1 - x2
    const dy = y1 - y2

    return Math.atan2(dy, dx)
  }
  Math.getDistance = function (x1, y1, x2, y2) {
    let xs = x2 - x1
    let ys = y2 - y1

    xs *= xs
    ys *= ys

    return Math.sqrt(xs + ys)
  }

  const FX = {}

  // Yes, yes, I know this is super not reacty, but this is not the time/place to translate all this raw JS into Reactifiedness --FBurklin, 2020/09/29
  useEffect(() => {
    const canvas = document.getElementById('myCanvas')
    const ctx = canvas.getContext('2d')
    let lastUpdate = new Date()
    let width, height

    FX.particles = []

    setFullscreen()

    function buttonEffect () {
      const button = document.getElementById('button')
      const height = button.offsetHeight
      const left = button.offsetLeft
      const top = button.offsetTop
      const width = button.offsetWidth
      let x, y, degree

      for (let i = 0; i < 40; i = i + 1) {
        if (Math.random() < 0.5) {
          y = Math.randMinMax(top, top + height)

          if (Math.random() < 0.5) {
            x = left
            degree = Math.randMinMax(-45, 45)
          } else {
            x = left + width
            degree = Math.randMinMax(135, 225)
          }
        } else {
          x = Math.randMinMax(left, left + width)

          if (Math.random() < 0.5) {
            y = top
            degree = Math.randMinMax(45, 135)
          } else {
            y = top + height
            degree = Math.randMinMax(-135, -45)
          }
        }
        createParticle({
          x: x,
          y: y,
          degree: degree,
          speed: Math.randMinMax(100, 150),
          vs: Math.randMinMax(-4, -1)
        })
      }
      setTimeout(() => {
        setView(ENCOURAGE)
      }, 500)
    }

    const button = document.getElementById('button')
    button.addEventListener('mousedown', buttonEffect)

    loop()

    window.addEventListener('resize', setFullscreen)

    function createParticle (args) {
      const options = {
        x: width / 2,
        y: height / 2,
        color: 'hsla(' + Math.randMinMax(0, 190) + ', 100%, 50%, ' + (Math.random().toFixed(2)) + ')',
        degree: Math.randMinMax(0, 360),
        speed: Math.randMinMax(300, 350),
        vd: Math.randMinMax(-90, 90),
        vs: Math.randMinMax(-8, -5)
      }

      for (const key in args) {
        options[key] = args[key]
      }

      FX.particles.push(options)
    }

    function loop () {
      const thisUpdate = new Date()
      const delta = (lastUpdate - thisUpdate) / 1000
      const amount = FX.particles.length
      const size = 2
      let i = 0
      let p

      ctx.fillStyle = '#00529e'
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeStyle = 'lighter'

      for (; i < amount; i = i + 1) {
        p = FX.particles[i]

        p.degree += (p.vd * delta)
        p.speed += (p.vs)// * delta);
        if (p.speed < 0) continue

        p.x += Math.cos(p.degree * Math.TO_RAD) * (p.speed * delta)
        p.y += Math.sin(p.degree * Math.TO_RAD) * (p.speed * delta)

        ctx.save()

        ctx.translate(p.x, p.y)
        ctx.rotate(p.degree * Math.TO_RAD)

        ctx.fillStyle = p.color
        ctx.fillRect(-size, -size, size * 2, size * 2)

        ctx.restore()
      }

      lastUpdate = thisUpdate

      window.requestAnimFrame(loop)
    }

    function setFullscreen () {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
  })
  return (
    <>
      <button className='EncouragementCTA' id='button'>
        ENCOURAGE A CHILD
      </button>
      <canvas id='myCanvas' width='500' height='500' />
    </>
  )
}

export default ConfettiButton
