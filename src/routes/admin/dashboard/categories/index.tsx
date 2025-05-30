import TableLayout from '@/components/Layout/TableUserManagement/TableLayout';
import Spinner from '@/components/ui/spinner';
import { categoryColumns } from '@/components/Table/columns';
import { useGetAllCategory } from '@/hooks/category.hooks';
import { createFileRoute, Link } from '@tanstack/react-router'
import type { Category } from '@/types/category.types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CategoryForm from '@/components/Form/CategoryForm';
import DashboardHeader from '@/components/Layout/DashboardHeader/DashboardHeader';
import AccordianLayout from '@/components/Layout/AccordianLayout/AccordianLayout';

export const Route = createFileRoute('/admin/dashboard/categories/')({
  component: RouteComponent,
})

function RouteComponent() {
 
  const { isPending, data: category } = useGetAllCategory({ page: 0, limit: 0 });
  
  if (isPending) return <Spinner />;

  const buttons = [<CategoryForm/>]
  return (
    <div className=''>
      <DashboardHeader header='Manage Category' buttons={buttons}>
        <AccordianLayout data={category?.data as Category[]}/>
      </DashboardHeader>
     {/* <TableLayout header="Manage Category" columns={categoryColumns} data={category?.data as Category[]} buttons={buttons}/> */}
    </div>
  );
}
