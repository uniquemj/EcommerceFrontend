import type { OrderSummaryDetail } from '@/types/order.types'
import React from 'react'
import { Button } from '../ui/button'
import { useMarkOrderCompleted } from '@/hooks/order.hooks'
import { Loader2 } from 'lucide-react'

const ActionOrderListMenu
 = ({row}: {row: {original: OrderSummaryDetail}}) => {

    const canMarkAsComplete = row.original.orderCount.shipping == 0 && row.original.orderCount.faildelivery == 0 && row.original.orderCount.processing == 0
    const {isPending, mutate} = useMarkOrderCompleted()

    const handleComplete = () =>{
        mutate(row.original.orderInfo._id)
    }
  return (
    <div>
        {
            !row.original.orderInfo.isCompleted &&
            <Button className='border-1 bg-transparent text-secondary-color border-secondary-color hover:bg-secondary-color hover:text-text-color hover:cursor-pointer' disabled={!canMarkAsComplete} onClick={handleComplete}>
            {
                isPending ? (
                    <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
              'Mark as Complete'
            )}
        </Button>
        }
    </div>
  )
}

export default ActionOrderListMenu
