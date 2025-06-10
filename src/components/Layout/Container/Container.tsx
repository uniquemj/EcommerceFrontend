import React from 'react'

const Container = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='px-space-12 py-space-12 min-sm:px-space-48 min-sm:py-space-48'>
            {children}
    </div>
  )
}

export default Container