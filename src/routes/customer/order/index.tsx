import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/customer/order/')({
  component: RouteComponent,
  beforeLoad: ()=>{
    throw redirect({to:'/customer/order/processing'})
  }
})

function RouteComponent() {
  return <div>Hello "/customer/order/"!</div>
}
