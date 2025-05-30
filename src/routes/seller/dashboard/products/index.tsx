import TableLayout from '@/components/Layout/TableUserManagement/TableLayout'
import { productColumns } from '@/components/Table/columns'
import Spinner from '@/components/ui/spinner'
import { useGetSellerProductList } from '@/hooks/product.hooks'
import type { ProductInfo } from '@/types/product.types'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/seller/dashboard/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {isPending, data: sellerProducts} = useGetSellerProductList({page: 0, limit: 0})
  if(isPending) return <Spinner/>
  const data = sellerProducts?.data
  return (
    <div>
      <TableLayout header="Manage Product" columns={productColumns} data={data as ProductInfo[]} buttons={[]}/>
    </div>
  )
}
