import DashboardHeader from "@/components/Layout/DashboardHeader/DashboardHeader";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/customer/order")({
  component: RouteComponent,
});

const buttons = [
  <Link
    to="/customer/order/processing"
    className="[&.active]:text-secondary-shade-normal group/order"
  >
    <Button className="text-little-dark shadow-none rounded-none bg-transparent group-[&.active]/order:border-1 group-[&.active]/order:border-secondary-shade-normal group-[&.active]/order:text-secondary-shade-normal hover:cursor-pointer hover:bg-secondary-shade-normal hover:text-text-color">
      Processing
    </Button>
  </Link>,
  <Link
    to="/customer/order/completed"
    className="[&.active]:text-secondary-shade-normal group/order"
  >
    <Button className="shadow-none text-little-dark rounded-none bg-transparent group-[&.active]/order:border-1 group-[&.active]/order:border-secondary-shade-normal group-[&.active]/order:text-secondary-shade-normal hover:cursor-pointer hover:bg-secondary-shade-normal hover:text-text-color">
      Completed
    </Button>
  </Link>,
];

function RouteComponent() {
  return (
    <DashboardHeader header="Your Order" buttons={buttons}>
      <Outlet />
    </DashboardHeader>
  );
}
