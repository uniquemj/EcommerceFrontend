
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/seller/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Hello '/seller/dashboard'</h1>
    </div>
  );
}
