import React from 'react'
import { Button } from '../ui/button'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Separator } from '../ui/separator'

interface ProductDisplayProps{
    title: string,
    url: string,
    children: React.ReactNode
}

const ProductDisplay = ({title, url, children}: ProductDisplayProps) => {
  return (
    <div className='flex flex-col justify-center gap-space-32 px-space-24 py-space-24'>
        <div className='flex justify-between items-center'>
            <div>
                <h1 className='font-bold text-28 text-secondary-shade-dark'>{title}</h1>
            </div>
            <div className='w-3/5 px-space-24'>
                <Separator/>
            </div>
            <div>
                <Link to={url}>
                    <Button variant={"outline"} className='rounded-none group/display hover:cursor-pointer text-secondary-shade-normal hover:text-text-color hover:bg-secondary-shade-normal border-secondary-shade-normal'>
                        Explore More
                        <ArrowRight size={18} className='text-secondary-shade-normal group-hover/display:text-secondary-shade-lightest'/>
                    </Button>
                </Link>
            </div>
        </div>
        <div className='flex flex-wrap max-sm:gap-space-24 gap-space-38'>
            {children}
        </div>
    </div>
  )
}

export default ProductDisplay

// max-sm:justify-center