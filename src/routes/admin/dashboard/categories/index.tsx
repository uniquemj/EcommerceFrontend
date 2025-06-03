import Spinner from '@/components/ui/spinner';
import { useGetAllCategory } from '@/hooks/category.hooks';
import { createFileRoute} from '@tanstack/react-router'
import type { Category } from '@/types/category.types';
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
      <DashboardHeader header='Manage Category' buttons={buttons}>
        <AccordianLayout data={category?.data as Category[]}/>
      </DashboardHeader>
  );
}
