import React from 'react'

interface PromotionProps{
    children: React.ReactNode
}
const PromotionLayout = ({children}:PromotionProps) => {
  return (
    <div className={`px-space-24 py-space-24 grid grid-cols-1 min-940:grid-cols-2 gap-space-14`}>
        {children}
    </div>
  )
}

export default PromotionLayout