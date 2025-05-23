import TableLayout from '@/components/Layout/TableUserManagement/TableLayout';
import { adminColumns } from '@/components/Table/columns';
import Spinner from '@/components/ui/spinner';
import { useGetAllAdmin } from '@/hooks/admin.hooks';
import type { Admin } from '@/types/user.types';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/dashboard/admins/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isPending, data: admin } = useGetAllAdmin({ page: 0, limit: 0 });
  if (isPending) return <Spinner />;

  return (
    <>
     <TableLayout header="Manage Admins" columns={adminColumns} data={admin?.data as Admin[]}/>
    </>
  );
}

