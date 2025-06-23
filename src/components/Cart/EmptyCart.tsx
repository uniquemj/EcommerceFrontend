import React from 'react'
import EmptyCartImage from '@/assets/SVGImages/EmptyCart.svg'
import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'

const EmptyCart = () => {
  return (
    <div className='w-full h-screen-minus'>
        <div className='h-3/5 flex flex-col justify-center items-center gap-space-24'>
            <img src={EmptyCartImage} className='w-space-140'/>
            <h1 className='text-20 font-semibold'>Your Cart is Currently Empty.</h1>
            <Link to='/product/all'>
                <Button className='rounded-none border-1 bg-transparent border-secondary-color text-secondary-color hover:bg-secondary-color hover:text-text-color hover:cursor-pointer'>
                    Browse Products
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default EmptyCart