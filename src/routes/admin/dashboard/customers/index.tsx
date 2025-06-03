import DashboardHeader from '@/components/Layout/DashboardHeader/DashboardHeader';
import { customerColumns } from '@/components/Table/columns';
import { DataTable } from '@/components/Table/data-table';
import Spinner from '@/components/ui/spinner';
import { useGetAllCustomer } from '@/hooks/customer.hooks';
import type { Customer } from '@/types/user.types';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/dashboard/customers/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isPending, data: customer } = useGetAllCustomer({ page: 0, limit: 0 });
  if (isPending) return <Spinner />;

  return (
    <DashboardHeader header ="Manage Customers" buttons={[]}>
      <DataTable columns={customerColumns} data={customer?.data as Customer[]}/>
    </DashboardHeader>
  );
}
