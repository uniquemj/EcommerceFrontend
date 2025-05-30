import { useGetAllSeller } from "@/hooks/seller.hooks";
import { createFileRoute } from "@tanstack/react-router";
import { sellerColumns } from "@/components/Table/columns";
import type { Seller } from "@/types/user.types";
import Spinner from "@/components/ui/spinner";
import TableLayout from "@/components/Layout/TableUserManagement/TableLayout";

export const Route = createFileRoute("/admin/dashboard/sellers/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, data: seller } = useGetAllSeller({ page: 0, limit: 0 });
  if (isPending) return <Spinner />;

  return (
    <>
     <TableLayout header="Manage Sellers" columns={sellerColumns} data={seller?.data as Seller[]} buttons={[]}/>
    </>
  );
}
