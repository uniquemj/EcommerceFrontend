import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  onPageChange: (pageIndex: number) => void;
  onFilterChange: (value: string) => void;
  filterValue: string;
  filterInclude?: boolean;
}

export function OrderDataTable<TData, TValue>({
  columns,
  data,
  totalCount,
  pageIndex,
  pageSize,
  onPageChange,
  onFilterChange,
  filterValue,
  filterInclude = true,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    manualFiltering: true,
    pageCount: Math.ceil(totalCount / pageSize),
    state: {
      pagination: { pageIndex, pageSize },
      columnFilters: [
        {
          id: "order_id.payment_status",
          value: filterValue,
        },
      ],
    },
    getCoreRowModel: getCoreRowModel(),

    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      onPageChange(newState.pageIndex);
    },
    onColumnFiltersChange: (updater) => {
      const resolved =
        typeof updater === "function"
          ? updater([
              {
                id: "order_id.payment_status",
                value: filterValue,
              },
            ])
          : updater;

      const nameFilter = resolved.find(
        (f) => f.id === "order_id.payment_status"
      );
      onFilterChange((nameFilter?.value as string) ?? "");
    },
  });

  return (
    <div>
      {filterInclude && (
        <div className="flex items-center justify-end py-4">
          <Select
            value={filterValue}
            onValueChange={(value) => {
              onFilterChange(value);
              onPageChange(0);
            }}
          >
            <SelectTrigger className="w-[180px] border-gray-300">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">All orders</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <Table className="p-0 border-1 border-secondary-200">
        <TableHeader className="bg-primary-50 h-space-45">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="py-space-12 px-space-24 gap-space-12 font-semi-bold text-size-12 text-secondary-600 leading-space-18 space-y-space-12"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="w-space-160 h-space-72 py-space-4 px-space-24 border-b-1 gap-space-12 overflow-x-hidden"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground px-2">
          Page {pageIndex + 1} of {Math.ceil(totalCount / pageSize)}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={(pageIndex + 1) * pageSize >= totalCount}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
