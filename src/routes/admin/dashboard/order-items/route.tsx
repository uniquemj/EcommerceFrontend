import DashboardHeader from '@/components/Layout/DashboardHeader/DashboardHeader';
import { Button } from '@/components/ui/button';
import { createFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/dashboard/order-items')({
  component: RouteComponent,
})

function RouteComponent() {

  const buttons = [
  <Link
    to="/admin/dashboard/order-items/all"
    className="[&.active]:text-secondary-shade-normal group/order"
  >
    <Button className="text-little-dark shadow-none rounded-none bg-transparent group-[&.active]/order:border-1 group-[&.active]/order:border-secondary-shade-normal group-[&.active]/order:text-secondary-shade-normal hover:cursor-pointer hover:bg-secondary-shade-normal hover:text-text-color">
      All
    </Button>
  </Link>,
  <Link
    to="/admin/dashboard/order-items/shipping"
    className="[&.active]:text-secondary-shade-normal group/order"
  >
    <Button className="text-little-dark shadow-none rounded-none bg-transparent group-[&.active]/order:border-1 group-[&.active]/order:border-secondary-shade-normal group-[&.active]/order:text-secondary-shade-normal hover:cursor-pointer hover:bg-secondary-shade-normal hover:text-text-color">
      Shipping
    </Button>
  </Link>,
  <Link
    to="/admin/dashboard/order-items/delivered"
    className="[&.active]:text-secondary-shade-normal group/order"
  >
    <Button className="shadow-none text-little-dark rounded-none bg-transparent group-[&.active]/order:border-1 group-[&.active]/order:border-secondary-shade-normal group-[&.active]/order:text-secondary-shade-normal hover:cursor-pointer hover:bg-secondary-shade-normal hover:text-text-color">
      Delivered
    </Button>
  </Link>,
  <Link
    to="/admin/dashboard/order-items/fail-delivery"
    className="[&.active]:text-secondary-shade-normal group/order"
  >
    <Button className="shadow-none text-little-dark rounded-none bg-transparent group-[&.active]/order:border-1 group-[&.active]/order:border-secondary-shade-normal group-[&.active]/order:text-secondary-shade-normal hover:cursor-pointer hover:bg-secondary-shade-normal hover:text-text-color">
      Fail Delivery
    </Button>
  </Link>,
];

  const route = useRouterState()
  const isDetailPage = route.location.pathname.includes('/items')

  return (
    <>
    {
      !isDetailPage ? 
      <DashboardHeader header='Orders' buttons={buttons}>
      <Outlet/>
    </DashboardHeader>:
      <div>
      <Outlet/>
    </div>
    }
    </>
  )
}
