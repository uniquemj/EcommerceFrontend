import { Link } from '@tanstack/react-router'
import React from 'react'
import { Button } from '../ui/button'

interface OrderSummaryCardProps{
    subTotal: number,
    delivery_fee: number,
    total: number,
    buttonContent: string
}

const OrderSummaryCard = ({subTotal, delivery_fee, total, buttonContent}: OrderSummaryCardProps) => {
  return (
    <div className="flex min-sm:justify-center min-940:justify-end">
          <div className="flex flex-col gap-space-34 max-sm:w-full min-sm:w-3/5  border-1 px-space-34 py-space-24">
            <div className="">
              <h1 className="text-18 text-secondary-shade-dark font-bold">
                Order Summary
              </h1>
            </div>
            <div className="flex flex-col gap-space-34 h-full">
              <div className="flex flex-col gap-space-20">
                <div className="flex justify-between items-center">
                  <h1 className="text-16 font-medium">SubTotal:</h1>
                  <h2 className="text-16 font-medium text-secondary-color">Rs. {subTotal}</h2>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-16 text-ternary-color font-medium">Delivery Fee:</h1>
                  <h2 className="text-16 font-medium text-secondary-color">Rs. {delivery_fee}</h2>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-16 font-medium">Total:</h1>
                  <h2 className="text-16 font-medium text-secondary-color">Rs. {total}</h2>
                </div>
              </div>
              <div className="w-full">
                <Link to='/checkout'>
                <Button className="py-space-24 px-space-24 w-full rounded-none bg-secondary-color text-text-color border-1 hover:border-secondary-color hover:bg-transparent hover:text-secondary-color hover:cursor-pointer">
                  {buttonContent}
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
  )
}

export default OrderSummaryCard