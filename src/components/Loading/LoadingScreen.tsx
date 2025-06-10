import React from 'react'
import Spinner from '../ui/spinner'


interface LoadingScreenProps{
    description: string
}

const LoadingScreen = ({description}:LoadingScreenProps) => {
  return (
    <div className='flex flex-col items-center justify-center'> 
        <Spinner/>
        {description}
    </div>
  )
}

export default LoadingScreen