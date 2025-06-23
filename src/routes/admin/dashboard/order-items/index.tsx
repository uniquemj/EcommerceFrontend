import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/dashboard/order-items/')({
  component: RouteComponent,
  beforeLoad: () =>{
    throw redirect({to: '/admin/dashboard/order-items/all'})
  }
})

function RouteComponent() {
  return <div>Hello "/admin/dashboard/order-items/"!</div>
}
