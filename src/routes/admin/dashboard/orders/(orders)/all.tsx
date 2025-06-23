import LoadingScreen from "@/components/Loading/LoadingScreen";
import { adminOrderColumns } from "@/components/Table/Columns/order.columns";
import { OrderDataTable } from "@/components/Table/OrderDataTable";
import { useGetOrderListSummaryForAdmin } from "@/hooks/order.hooks";
import type { OrderSummaryDetail } from "@/types/order.types";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/admin/dashboard/orders/(orders)/all")({
  component: RouteComponent,
});

function RouteComponent() {
  const [pageIndex, setPageIndex] = React.useState(0); // zero-based for table
  const [filterValue, setFilterValue] = React.useState(""); // for future search

  const pageSize = 10;
  const { isPending, data: allOrderListSummary } =
    useGetOrderListSummaryForAdmin({
      page: pageIndex + 1,
      limit: pageSize,
    });

  if (isPending) return <LoadingScreen description="Loading . . ." />;
  return (
    <div>
      <OrderDataTable
        data={allOrderListSummary?.data as OrderSummaryDetail[]}
        columns={adminOrderColumns}
         totalCount={allOrderListSummary?.paginationData?.total_items || 0} // required for pagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPageChange={setPageIndex}
        filterValue={filterValue}
        onFilterChange={(value) => {
          setFilterValue(value);
          setPageIndex(0); // reset to first page on filter
        }}
        filterInclude={false}
      />
    </div>
  );
}
