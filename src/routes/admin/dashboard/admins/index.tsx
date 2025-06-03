import DashboardHeader from '@/components/Layout/DashboardHeader/DashboardHeader';
import { adminColumns, superAdminColumns } from '@/components/Table/columns';
import { DataTable } from '@/components/Table/data-table';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import { useGetAllAdmin } from '@/hooks/admin.hooks';
import { useAdminState } from '@/store/admin.store';
import type { Admin } from '@/types/user.types';
import { createFileRoute, Link} from '@tanstack/react-router'
import { Plus } from 'lucide-react';
export const Route = createFileRoute('/admin/dashboard/admins/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {isSuperAdmin} = useAdminState()
 
  const { isPending, data: admin } = useGetAllAdmin({ page: 0, limit: 0 });
  
  if (isPending) return <Spinner />;
  const columns = isSuperAdmin ? superAdminColumns : adminColumns

  const buttons = [<Link to='/admin/dashboard/admins/create'>
          <Button className="bg-secondary-color hover:cursor-pointer hover"><Plus/>Admin</Button>
        </Link>]
  return (
    <DashboardHeader header="Manage Admins" buttons={buttons}>
        <DataTable columns={columns} data={admin?.data as Admin[]} />
    </DashboardHeader>
  );
}

