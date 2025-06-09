import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/product/all')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='px-space-24 py-space-24'>
      <Outlet/>
    </div>
}
