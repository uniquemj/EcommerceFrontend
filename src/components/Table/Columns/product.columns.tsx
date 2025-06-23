import { StatusToggle } from "@/components/Button/StatusToggle";
import TableDropdown from "@/components/DropDown/table-dropdown";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ArchieveStatus, type ProductInfo } from "@/types/product.types";
import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";

// export const productColumns: ColumnDef<ProductInfo>[] = [
//   {
//     accessorKey: "name",
//     header: "Product Name",
//   },
//   {
//     accessorKey: "productDescription",
//     header: "Description",
//     cell: ({row}) => {
//         const description = row.original.productDescription
//         return <p className="w-[150px] truncate">{description ? description : "-"}</p>
//     }
//   },
//   {
//     accessorKey: "category",
//     header: "Category",
//     cell: ({ row }) => {
//       const category = row.original.category;
//       return <Badge className="bg-secondary-color">{category.title}</Badge>;
//     },
//   },
//   {
//     accessorKey: "createdAt",
//     header: "Create At",
//     cell: ({ row }) => {
//       const createdAt = `${row.original.createdAt}`;
//       const output = createdAt ? createdAt.split("T")[0] : "-";
//       return <p>{output}</p>;
//     },
//   },
//   {
//     accessorKey: "updatedAt",
//     header: "Modified At",
//     cell: ({ row }) => {
//       const updatedAt = `${row.original.updatedAt}`;
//       const output = updatedAt ? updatedAt.split("T")[0] : "-";
//       return <p>{output}</p>;
//     },
//   },
//   {
//     accessorKey: "archieveStatus",
//     header: "Status",
//     cell: ({ row }) => {
//       const archieveStatus = row.original.archieveStatus;
//       return archieveStatus == ArchieveStatus.Archieve ? (
//         <Badge className="bg-ternary-color"></Badge>
//       ) : (
//         <Badge className="bg-green-400"></Badge>
//       );
//     },
//   },
//   {
//         id: "action",
//         header: "Actions",
//         cell: ({row}) =>{
//             const product = row.original
//             const menuOptions = [<Link to={`/seller/dashboard/products/$id`} params={{id:product._id}} className="hover:cursor-pointer">
//           <DropdownMenuItem>View Details</DropdownMenuItem>
//         </Link>]
//             return <>
//                 <TableDropdown id={product._id} menuOptions={menuOptions} option={"product"}/>
//                 </> 
//         }
//     }
// ];
// export const adminProductColumns: ColumnDef<ProductInfo>[] = [
//   {
//     accessorKey: "name",
//     header: "Product Name",
//   },
//   {
//     accessorKey: "productDescription",
//     header: "Description",
//     cell: ({row}) => {
//         const description = row.original.productDescription
//         return <p className="w-[150px] truncate">{description ? description : "-"}</p>
//     }
//   },
//   {
//     accessorKey: "category",
//     header: "Category",
//     cell: ({ row }) => {
//       const category = row.original.category;
//       return <Badge className="bg-secondary-color">{category.title}</Badge>;
//     },
//   },
//   {
//     accessorKey: "createdAt",
//     header: "Create At",
//     cell: ({ row }) => {
//       const createdAt = `${row.original.createdAt}`;
//       const output = createdAt ? createdAt.split("T")[0] : "-";
//       return <p>{output}</p>;
//     },
//   },
//   {
//     accessorKey: "updatedAt",
//     header: "Modified At",
//     cell: ({ row }) => {
//       const updatedAt = `${row.original.updatedAt}`;
//       const output = updatedAt ? updatedAt.split("T")[0] : "-";
//       return <p>{output}</p>;
//     },
//   },
//   {
//     accessorKey: "archieveStatus",
//     header: "Status",
//     cell: ({ row }) => {
//       const archieveStatus = row.original.archieveStatus;
//       return archieveStatus == ArchieveStatus.Archieve ? (
//         <Badge className="bg-ternary-color"></Badge>
//       ) : (
//         <Badge className="bg-green-400"></Badge>
//       );
//     },
//   },
//   {
//         id: "action",
//         header: "Actions",
//         cell: ({row}) =>{
//             const product = row.original
//             const menuOptions = [<Link to={`/admin/dashboard/products/$id`} params={{id:product._id}} className="hover:cursor-pointer">
//           <DropdownMenuItem>View Details</DropdownMenuItem>
//         </Link>]
//             return <>
//                 <TableDropdown id={product._id} menuOptions={menuOptions} option={"product"}/>
//                 </> 
//         }
//     }
// ];

export const productColumns: ColumnDef<ProductInfo>[] = [
  {
    accessorKey: "name",
    header: "PRODUCT NAME",
    cell: ({ row }) => {
      const name = row.original.name;
      return (
        <div className="min-w-[180px] max-w-[220px] p-2">
          <p className="font-medium text-gray-900 truncate">{name}</p>
        </div>
      );
    },
    size: 220,
  },
  {
    accessorKey: "productDescription",
    header: "DESCRIPTION",
    cell: ({ row }) => {
      const description = row.original.productDescription;
      return (
        <div className="min-w-[150px] max-w-[200px] p-2">
          <p className="text-gray-600 text-sm truncate" title={description}>
            {description || "-"}
          </p>
        </div>
      );
    },
    size: 200,
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
    cell: ({ row }) => {
      const category = row.original.category;
      return (
        <div className="p-2 min-w-[120px]">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            {category?.title || "Uncategorized"}
          </Badge>
        </div>
      );
    },
    size: 150,
  },
  {
    accessorKey: "createdAt",
    header: "CREATED",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      const date = createdAt ? new Date(createdAt).toLocaleDateString() : "-";
      return (
        <div className="p-2 min-w-[100px]">
          <p className="text-sm text-gray-600">{date}</p>
        </div>
      );
    },
    size: 120,
  },
  {
    accessorKey: "updatedAt",
    header: "MODIFIED",
    cell: ({ row }) => {
      const updatedAt = row.original.updatedAt;
      const date = updatedAt ? new Date(updatedAt).toLocaleDateString() : "-";
      return (
        <div className="p-2 min-w-[100px]">
          <p className="text-sm text-gray-600">{date}</p>
        </div>
      );
    },
    size: 120,
  },
  {
    accessorKey: "archieveStatus",
    header: "STATUS",
    cell: ({ row }) => {
      const archieveStatus = row.original.archieveStatus;
     
      return (
       <StatusToggle currentStatus={archieveStatus} productId={row.original._id}/>
      );
    },
    size: 180,
  },
  {
    id: "action",
    header: "ACTIONS",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex justify-center p-2 min-w-[80px]">
          <TableDropdown
            id={product._id}
            menuOptions={[
              <Link
                to={`/seller/dashboard/products/$id`}
                params={{id: product._id}}
                key="view-details"
                className="hover:cursor-pointer"
              >
                <DropdownMenuItem className="text-sm">
                  View Details
                </DropdownMenuItem>
              </Link>,
            ]}
            option="product"
          />
        </div>
      );
    },
    size: 120,
  },
];

export const adminProductColumns: ColumnDef<ProductInfo>[] = [
  {
    accessorKey: "name",
    header: "PRODUCT NAME",
    cell: ({ row }) => {
      const name = row.original.name;
      return (
        <div className="min-w-[180px] max-w-[250px] p-2">
          <p className="font-medium text-gray-900 truncate">{name}</p>
        </div>
      );
    },
    size: 250,
  },
  {
    accessorKey: "productDescription",
    header: "DESCRIPTION",
    cell: ({ row }) => {
      const description = row.original.productDescription;
      return (
        <div className="min-w-[150px] max-w-[200px] p-2">
          <p className="text-gray-600 text-sm truncate" title={description}>
            {description || "-"}
          </p>
        </div>
      );
    },
    size: 200,
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
    cell: ({ row }) => {
      const category = row.original.category;
      return (
        <div className="p-2 min-w-[120px]">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            {category?.title || "Uncategorized"}
          </Badge>
        </div>
      );
    },
    size: 150,
  },
  {
    accessorKey: "createdAt",
    header: "CREATED",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      const date = createdAt ? new Date(createdAt).toLocaleDateString() : "-";
      return (
        <div className="p-2 min-w-[100px]">
          <p className="text-sm text-gray-600">{date}</p>
        </div>
      );
    },
    size: 120,
  },
  {
    accessorKey: "updatedAt",
    header: "MODIFIED",
    cell: ({ row }) => {
      const updatedAt = row.original.updatedAt;
      const date = updatedAt ? new Date(updatedAt).toLocaleDateString() : "-";
      return (
        <div className="p-2 min-w-[100px]">
          <p className="text-sm text-gray-600">{date}</p>
        </div>
      );
    },
    size: 120,
  },
  {
    accessorKey: "archieveStatus",
    header: "STATUS",
    cell: ({ row }) => {
      const archieveStatus = row.original.archieveStatus;
      return (
        <div className="p-2 min-w-[100px]">
          <Badge
            className={
              archieveStatus == ArchieveStatus.Archieve
                ? "bg-gray-200 text-gray-800" // Archived status
                : "bg-green-100 text-green-800" // Active status
            }
          >
            {archieveStatus == ArchieveStatus.Archieve ? "Archived" : "Active"}
          </Badge>
        </div>
      );
    },
    size: 100,
  },
  {
    id: "action",
    header: "ACTIONS",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex justify-center p-2 min-w-[80px]">
          <TableDropdown
            id={product._id}
            menuOptions={[
              <Link
                to={`/admin/dashboard/products/$id`}
                params={{id: product._id}}
                key="view-details"
                className="hover:cursor-pointer"
              >
                <DropdownMenuItem className="text-sm">
                  View Details
                </DropdownMenuItem>
              </Link>,
            ]}
            option="product"
          />
        </div>
      );
    },
    size: 100,
  },
];