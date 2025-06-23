import React from 'react'

const Container = ({children, className}:{children: React.ReactNode, className?:string}) => {
  return (
    <div className={`px-space-12 py-space-12 min-sm:px-space-48 min-sm:py-space-48 ${className}`}>
            {children}
    </div>
  )
}

export default Container