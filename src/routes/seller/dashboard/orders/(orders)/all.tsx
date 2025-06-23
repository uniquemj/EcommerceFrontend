import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/seller/dashboard/orders/(orders)/all')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/seller/dashboard/orders/(orders)/all"!</div>
}
