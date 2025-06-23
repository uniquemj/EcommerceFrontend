import DashboardHeader from '@/components/Layout/DashboardHeader/DashboardHeader'
import { adminProductColumns } from '@/components/Table/Columns/product.columns'
import { DataTable } from '@/components/Table/data-table'
import Spinner from '@/components/ui/spinner'
import { useGetAllProducts } from '@/hooks/product.hooks'
import type { ProductInfo } from '@/types/product.types'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/dashboard/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {isPending, data: sellerProducts} = useGetAllProducts({page: 0, limit: 0})
  if(isPending) return <Spinner/>
  const data = sellerProducts?.data
  return (
    <DashboardHeader header ="Manage Product" buttons={[]}>
      <DataTable columns = {adminProductColumns} data={data as ProductInfo[]} filterId='name'/>
    </DashboardHeader>
  )
}
