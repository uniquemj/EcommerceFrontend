import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/seller/dashboard/products/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/seller/dashboard/products/$id"!</div>
}
