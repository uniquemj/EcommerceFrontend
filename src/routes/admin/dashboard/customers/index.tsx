import TableLayout from '@/components/Layout/TableUserManagement/TableLayout';
import { customerColumns } from '@/components/Table/columns';
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
    <>
     <TableLayout header="Manage Customers" columns={customerColumns} data={customer?.data as Customer[]} buttons={[]}/>
    </>
  );
}
