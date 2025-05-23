import { createFileRoute,Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/customer")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-10">
        <Outlet/>
    </div>

  );
}
