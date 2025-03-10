import React from 'react'

export const DestinationCard = ({destination}) => {
    console.log("about",destination)
  return (
    <>
    <h1 className='text-2xl font-bold'>{destination.name}</h1>
    <p className='p-2 py-4'>{destination.description}</p>
    
    </>
  )
}

