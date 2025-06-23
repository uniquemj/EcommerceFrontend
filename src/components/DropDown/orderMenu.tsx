import { useAuth } from '@/store/auth.store'
import { UserRole } from '@/types/enum.types'
import type { OrderItem } from '@/types/order.types'
import { Link } from '@tanstack/react-router'
import { Eye } from 'lucide-react'
import React from 'react'

const ActionOrderMenu = ({row}: {row: {original: OrderItem}}) => {
  const {role} = useAuth()
  const detailURL = role === UserRole.SELLER ? '/seller/dashboard/orders/items/$id' : '/admin/dashboard/order-items/items/$id'
  return (
    <div className="flex items-center gap-space-20">
        <Link to={detailURL} params={{id: row.original._id}}>
            <Eye size={20} className="hover:cursor-pointer text-secondary-600" />
        </Link>
    </div>
  )
}

export default ActionOrderMenu