import Container from "@/components/Layout/Container/Container";
import DashboardHeader from "@/components/Layout/DashboardHeader/DashboardHeader";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import { addressColumns } from "@/components/Table/Columns/address.columns";
import { DataTable } from "@/components/Table/data-table";
import { Button } from "@/components/ui/button";
import { useGetAddressListOfCustomer } from "@/hooks/shipment.hooks";
import type { ShipmentInfo } from "@/types/shipment.type";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/customer/address/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, data: addressData } = useGetAddressListOfCustomer({
    page: 0,
    limit: 0,
  });

  if (isPending)
    return <LoadingScreen description="Loading shipping addresses . . ." />;

  const buttons = [
    <Link to='/customer/address/create'>
      <Button className="hover:cursor-pointer bg-secondary-color rounded-none text-text-color border-1 border-secondary-color hover:bg-transparent hover:text-secondary-color">
        <Plus/>
       Add Address
      </Button>
    </Link>
  ]
  return (
    <DashboardHeader header="Your Address" buttons={buttons}>
        <DataTable
          columns={addressColumns}
          data={addressData?.data as ShipmentInfo[]}
        />
    </DashboardHeader>
  );
}
