"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CurvedLineAnimation: React.FC = () => {
  const pathRef = useRef<SVGPathElement | null>(null)

  useEffect(() => {
    const path = pathRef.current

    if (path) {
      const length = path.getTotalLength()
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 3,
        scrollTrigger: {
          trigger: path,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })
    }
  }, [])

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full z-0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 2000" // Adjust based on your design
    >
      <path
        ref={pathRef}
        d="M0,200 C400,300 400,600 100,800 
           C-200,1000 500,1400 300,1800" // Adjust curve points to wrap sections
        stroke="url(#gradient)" // Optional gradient
        strokeWidth="15"
        fill="none"
      />
      {/* Optional Gradient for the Path */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#00b4d8', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#03045e', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default CurvedLineAnimation
