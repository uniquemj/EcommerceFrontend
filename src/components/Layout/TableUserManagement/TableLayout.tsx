import { DataTable } from '@/components/Table/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import DashboardHeader from '../DashboardHeader/DashboardHeader';


interface TableLayoutProps<TData, TValue>{
    header: string,
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
    buttons: React.ReactNode[]
}

const TableLayout = <TData, TValue>({header, columns, data, buttons}:TableLayoutProps<TData, TValue>) => {
  return (
    <DashboardHeader header={header} buttons={buttons}>
        <DataTable columns={columns} data={data} />
    </DashboardHeader>
  );
}

export default TableLayout