import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/dashboard/orders/')({
  component: RouteComponent,
  beforeLoad: ()=>{
    throw redirect({to: '/admin/dashboard/orders/all'})
  }
})

function RouteComponent() {
  return <div>Hello "/admin/dashboard/orders/"!</div>
}
