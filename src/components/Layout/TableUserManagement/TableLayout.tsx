import { DataTable } from '@/components/Table/data-table';
import { Separator } from '@/components/ui/separator';
import type { ColumnDef } from '@tanstack/react-table';


interface TableLayoutProps<TData, TValue>{
    header: string,
    columns: ColumnDef<TData, TValue>[],
    data: TData[]
}

const TableLayout = <TData, TValue>({header, columns, data}:TableLayoutProps<TData, TValue>) => {
  return (
    <>
      <div className="flex flex-col gap-3 mb-4">
        <h1 className="max-[410px]:text-2xl text-3xl font-bold">
          {header}
        </h1>
        <Separator className="bg-[rgba(0,0,0,0.3)]" />
      </div>
      <div className="container mx-auth py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}

export default TableLayout