import TableDropdown from "@/components/DropDown/table-dropdown";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ArchieveStatus, type ProductInfo } from "@/types/product.types";
import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

export const productColumns: ColumnDef<ProductInfo>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "productDescription",
    header: "Description",
    cell: ({row}) => {
        const description = row.original.productDescription
        return <p className="w-[150px] truncate">{description ? description : "-"}</p>
    }
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      return <Badge className="bg-secondary-color">{category.title}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Create At",
    cell: ({ row }) => {
      const createdAt = `${row.original.createdAt}`;
      const output = createdAt ? createdAt.split("T")[0] : "-";
      return <p>{output}</p>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Modified At",
    cell: ({ row }) => {
      const updatedAt = `${row.original.updatedAt}`;
      const output = updatedAt ? updatedAt.split("T")[0] : "-";
      return <p>{output}</p>;
    },
  },
  {
    accessorKey: "archieveStatus",
    header: "Status",
    cell: ({ row }) => {
      const archieveStatus = row.original.archieveStatus;
      return archieveStatus == ArchieveStatus.Archieve ? (
        <Badge className="bg-ternary-color"></Badge>
      ) : (
        <Badge className="bg-green-400"></Badge>
      );
    },
  },
  {
        id: "action",
        header: "Actions",
        cell: ({row}) =>{
            const product = row.original
            const menuOptions = [<Link to={`/seller/dashboard/products/$id`} params={{id:product._id}} className="hover:cursor-pointer">
          <DropdownMenuItem>View Details</DropdownMenuItem>
        </Link>]
            return <>
                <TableDropdown id={product._id} menuOptions={menuOptions} option={"product"}/>
                </> 
        }
    }
];
