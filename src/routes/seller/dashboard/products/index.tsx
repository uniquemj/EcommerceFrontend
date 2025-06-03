import DashboardHeader from '@/components/Layout/DashboardHeader/DashboardHeader'
import { productColumns } from '@/components/Table/Columns/product.columns'
import { DataTable } from '@/components/Table/data-table'
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
    <DashboardHeader header ="Manage Product" buttons={[]}>
      <DataTable columns = {productColumns} data={data as ProductInfo[]}/>
    </DashboardHeader>
  )
}
