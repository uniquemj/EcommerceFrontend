import DashboardHeader from '@/components/Layout/DashboardHeader/DashboardHeader';
import { Button } from '@/components/ui/button';
import { createFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/dashboard/orders')({
  component: RouteComponent,
})

function RouteComponent() {

//   const buttons = [
  
//   // <Link
//   //   to="/seller/dashboard/orders/toship"
//   //   className="[&.active]:text-secondary-shade-normal group/order"
//   // >
//   //   <Button className="shadow-none text-little-dark rounded-none bg-transparent group-[&.active]/order:border-1 group-[&.active]/order:border-secondary-shade-normal group-[&.active]/order:text-secondary-shade-normal hover:cursor-pointer hover:bg-secondary-shade-normal hover:text-text-color">
//   //     To Ship
//   //   </Button>
//   // </Link>,
//   // <Link
//   //   to="/seller/dashboard/orders/shipping"
//   //   className="[&.active]:text-secondary-shade-normal group/order"
//   // >
//   //   <Button className="shadow-none text-little-dark rounded-none bg-transparent group-[&.active]/order:border-1 group-[&.active]/order:border-secondary-shade-normal group-[&.active]/order:text-secondary-shade-normal hover:cursor-pointer hover:bg-secondary-shade-normal hover:text-text-color">
//   //     Shipping
//   //   </Button>
//   // </Link>,
//   // <Link
//   //   to="/seller/dashboard/orders/delivered"
//   //   className="[&.active]:text-secondary-shade-normal group/order"
//   // >
//   //   <Button className="shadow-none text-little-dark rounded-none bg-transparent group-[&.active]/order:border-1 group-[&.active]/order:border-secondary-shade-normal group-[&.active]/order:text-secondary-shade-normal hover:cursor-pointer hover:bg-secondary-shade-normal hover:text-text-color">
//   //     Delivered
//   //   </Button>
//   // </Link>,
//   // <Link
//   //   to="/seller/dashboard/orders/fail-delivery"
//   //   className="[&.active]:text-secondary-shade-normal group/order"
//   // >
//   //   <Button className="shadow-none text-little-dark rounded-none bg-transparent group-[&.active]/order:border-1 group-[&.active]/order:border-secondary-shade-normal group-[&.active]/order:text-secondary-shade-normal hover:cursor-pointer hover:bg-secondary-shade-normal hover:text-text-color">
//   //     Fail Delivery
//   //   </Button>
//   // </Link>,
// ];

  const route = useRouterState()
  const isDetailPage = route.location.pathname.includes('/items')

  return (
    <>
    {
      !isDetailPage ? 
      <DashboardHeader header='Orders' buttons={[]}>
      <Outlet/>
    </DashboardHeader>:
      <div>
      <Outlet/>
    </div>
    }
    </>
  )
}
