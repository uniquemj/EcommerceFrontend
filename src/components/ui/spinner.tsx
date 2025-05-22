import React from 'react'
import {PuffLoader} from 'react-spinners'
const Spinner = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <PuffLoader color="#FF6467" />
    </div>
  )
}

export default Spinner