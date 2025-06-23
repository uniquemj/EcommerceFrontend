import React, { useState } from 'react'
import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AdminOrderStatus, SellerOrderStatus, status_style, type adminOrderStatus, type sellerOrderStatus, type statusSylteType } from '@/config/status.config'
import { OrderStatus } from '@/types/order.types'
import { Badge } from '@/components/ui/badge'
import { getFormalStatus } from '@/utils/helper'
import { useUpdateAdminOrderStatus, useUpdateSellerOrderStatus, useUpdateSellerReturnStatus } from '@/hooks/order.hooks'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/store/auth.store'
import { UserRole } from '@/types/enum.types'


interface OrderStatusSheetProps{
  id: string,
  currentStatus: sellerOrderStatus | adminOrderStatus
}
const OrderStatusSheet = ({id, currentStatus}: OrderStatusSheetProps) => {
  const {role} = useAuth()

   const [selectedStatus, setSelectedStatus] = useState<string>(currentStatus);
  const availableStatuses = role == UserRole.SELLER ?  SellerOrderStatus[currentStatus as sellerOrderStatus]?.include || []: AdminOrderStatus[currentStatus as adminOrderStatus]?.include;
  const styleStatus:statusSylteType = currentStatus as unknown as statusSylteType
  const obtainStatus = getFormalStatus(currentStatus as unknown as string)
  console.log(selectedStatus)
  let updateStatus = null
  switch(role) {
    case UserRole.SELLER: 
      if(selectedStatus == 'return'){
        updateStatus = useUpdateSellerReturnStatus
      } else{

        updateStatus =useUpdateSellerOrderStatus
      }
      break
    case UserRole.ADMIN:
      updateStatus = useUpdateAdminOrderStatus
      break
    default:
      throw new Error("Something went wrong with status update.")
  }

  const {isPending, mutate} = updateStatus()

  const onStatusChange = () =>{
    mutate({orderItemId: id, order_status: selectedStatus})
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {currentStatus !== "delivered" && (
          <Button variant="outline" className='rounded-none border-1 border-secondary-color text-secondary-color hover:bg-secondary-color hover:text-text-color hover:cursor-pointer'>Update Status</Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update Order Status</SheetTitle>
          <SheetDescription>
            Current status: <Badge className={`font-medium ${status_style[styleStatus]?.className || status_style['other'].className}`}>{obtainStatus}</Badge>
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="status-select">Select new status</Label>
            <Select
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value as OrderStatus)}
            >
              <SelectTrigger id="status-select" className='w-full'>
                <SelectValue placeholder="Select status" className='text-ternary-color'/>
              </SelectTrigger>
              <SelectContent>
                {availableStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <Button 
            type="submit"
            onClick={onStatusChange}
            disabled={selectedStatus === currentStatus}
            className='bg-secondary-color text-text-color hover:bg-secondary-color hover:cursor-pointer'
          >
            {
              isPending ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> :
              "Save changes"
            }
          
          
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>            
      </SheetContent>
    </Sheet>
  );
}

export default OrderStatusSheet