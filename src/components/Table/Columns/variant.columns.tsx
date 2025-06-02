import TableDropdown from "@/components/DropDown/table-dropdown";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { VariantInfo } from "@/types/variant.types";
import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

export const variantColumns: ColumnDef<VariantInfo>[] = [
    {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const imageURL = row.original.images.url;
      return <Avatar className="h-13 w-12 rounded-none">
        <AvatarImage src={imageURL}/>
      </Avatar>
    },
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({row}) => {
        const size = row.original.size.length > 0 ? row.original.size : "-"
        return <p className="w-[150px] truncate">{size}</p>
    }
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.price;
      return <p>Rs. {price}</p>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const stock = row.original.stock
      return stock> 0 ? stock : <Badge className="bg-ternary-color text-text-color">"Out of Stock"</Badge>
    },
  },
  {
    accessorKey: "availability",
    header: "Available",
    cell: ({ row }) => {
      const available = row.original.availability;
      return available ? <Badge className="bg-green-color"></Badge>: <Badge className="bg-error-color"></Badge>;
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
