import type { ShipmentInfo } from '@/types/shipment.type'
import React from 'react'

interface ShipmentDisplayProps{
    shipmentInfo: ShipmentInfo
}

const ShipmentDisplay = ({shipmentInfo}: ShipmentDisplayProps) => {

  return (
    <div className='flex flex-col gap-space-12 border-1 px-space-12 min-940:px-space-24 py-space-12 min-940:py-space-24'>
        <div className='flex gap-space-24 flex-wrap text-center'>
          <h1 className='text-14 font-medium'>{shipmentInfo.full_name}</h1>
          <p className='text-14 font-medium'>{shipmentInfo.phone_number}</p>
        </div>
        <div className='flex flex-wrap text-11 gap-space-4 text-ternary-color'>
          <p className=''>Street Address: <span>{shipmentInfo.address}</span></p>,
          <p>City: {shipmentInfo.city},</p>
          <p>Region: {shipmentInfo.region},</p>
        </div>
    </div>
  )
}

export default ShipmentDisplay