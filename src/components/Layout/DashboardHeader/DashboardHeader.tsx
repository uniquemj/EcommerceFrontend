import { Separator } from '@/components/ui/separator'
import React from 'react'

interface DashboardHeaderProps{
    header: string,
    children: React.ReactNode,
    buttons: React.ReactNode[]
}

const DashboardHeader = ({header, children, buttons}:DashboardHeaderProps) => {
  return (
     <>
      <div className="flex gap-3 mb-4 justify-between items-center">
        <h1 className="max-[410px]:text-2xl text-3xl font-bold">
          {header}
        </h1>
        <div className='flex gap-3'>
            {
                buttons.length > 0 ? (
                    buttons.map((button, index)=>(
                        <div key={index}>
                        {button}
                        </div>
                    ))
                ):null
            }
        </div>
      </div>
    <Separator className="bg-[rgba(0,0,0,0.3)]" />
      <div className="container mx-auth py-10">
        {children}
      </div>
    </>
  )
}

export default DashboardHeader