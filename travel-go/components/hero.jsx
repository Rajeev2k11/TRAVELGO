import { Fullscreen } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <>
     <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/heroimage.jpg')",
          filter: 'blur(3px)',
          
        }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">Welcome to Your Dream Destination</h1>
        <p className="text-lg sm:text-2xl mb-6">
          Discover amazing places with us. Plan your next adventure today!
        </p>
        
      </div>
      
    </div>
   
    </>
    
  )
}

export default Hero