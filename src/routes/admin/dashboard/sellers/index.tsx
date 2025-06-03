import { useGetAllSeller } from "@/hooks/seller.hooks";
import { createFileRoute } from "@tanstack/react-router";
import { sellerColumns } from "@/components/Table/columns";
import type { Seller } from "@/types/user.types";
import Spinner from "@/components/ui/spinner";
import DashboardHeader from "@/components/Layout/DashboardHeader/DashboardHeader";
import { DataTable } from "@/components/Table/data-table";

export const Route = createFileRoute("/admin/dashboard/sellers/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, data: seller } = useGetAllSeller({ page: 0, limit: 0 });
  if (isPending) return <Spinner />;

  return (
    <DashboardHeader header="Manage Sellers" buttons={[]}>
      <DataTable columns={sellerColumns} data={seller?.data as Seller[]}/>
    </DashboardHeader>
  );
}
