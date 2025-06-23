import Container from "@/components/Layout/Container/Container";
import CustomerSideBar from "@/components/Layout/SideNavbar/CustomerSideBar";
import { createFileRoute,Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/customer")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-1 min-940:grid-cols-[400px_1fr]">
      <div className="max-940:hidden">
      <CustomerSideBar />
      </div>
     
        <Container>
          <Outlet/>
        </Container>

    </div>
  );
}
