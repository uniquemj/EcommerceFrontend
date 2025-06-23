import LoadingScreen from "@/components/Loading/LoadingScreen";
import { sellerOrderColumns } from "@/components/Table/Columns/order.columns";
import { OrderDataTable } from "@/components/Table/OrderDataTable";
import { useGetSellerOrderItems } from "@/hooks/order.hooks";
import { OrderStatus, type OrderItem } from "@/types/order.types";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute(
  "/seller/dashboard/orders/(orders)/return-request"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [pageIndex, setPageIndex] = React.useState(0); // zero-based for table
  const [filterValue, setFilterValue] = React.useState(" "); // for future search
  const pageSize = 10;

  const { isPending, data: sellerOrderItems } = useGetSellerOrderItems({
    orderFilter: OrderStatus.ReturnInitialized,
    pagination: {
      page: pageIndex + 1,
      limit: pageSize,
    },
  });

   const filteredData =
    filterValue === " "
      ? sellerOrderItems?.data
      : sellerOrderItems?.data?.filter((item) => item.order_id.payment_status === filterValue);

  if (isPending) return <LoadingScreen description="Loading . . ." />;
  return (
    <div>
      <OrderDataTable
        data={filteredData as OrderItem[]}
        columns={sellerOrderColumns}
        totalCount={sellerOrderItems?.paginationData?.total_items || 0} // required for pagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPageChange={setPageIndex}
        filterValue={filterValue}
        onFilterChange={(value) => {
          setFilterValue(value);
          setPageIndex(0); // reset to first page on filter
        }}
      />
    </div>
  );
}
