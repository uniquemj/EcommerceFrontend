import TableDropdown from "@/components/DropDown/table-dropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { ShipmentInfo } from "@/types/shipment.type";
import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { EditIcon, LocationEditIcon, PhoneIcon, TrashIcon } from "lucide-react";

// export const addressColumns: ColumnDef<ShipmentInfo>[] = [
//   {
//     accessorKey: "full_name",
//     header: "Full Name",
//     cell:({row})=>{
//         const full_name = row.original.full_name
//         return <p className="font-semibold text-secondary-shade-dark">{full_name}</p>
//     }
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//     cell: ({row}) => {
//         const email = row.original.email
//         return <p className="">{email}</p>
//     }
//   },
//   {
//     accessorKey: "phone_number",
//     header: "Phone Number",
//     cell: ({ row }) => {
//       const phone_number= row.original.phone_number;
//       return <p className="font-medium">{phone_number}</p>
//     },
//   },
//   {
//     accessorKey: "address",
//     header: "Street Address",
//     cell: ({ row }) => {
//       const address = row.original.address;
//       return <p className="w-space-140 truncate">{address}</p>;
//     },
//   },
//   {
//     accessorKey: "city",
//     header: "City",
//     cell: ({ row }) => {
//       const city = row.original.city;
//       return <p>{city}</p>;
//     },
//   },
//   {
//     accessorKey: "region",
//     header: "Region/Province",
//     cell: ({ row }) => {
//       const region = row.original.region;
//       return <p>{region}</p>
//     },
//   },
//   {
//         id: "action",
//         header: "Actions",
//         cell: ({row}) =>{
//             const addressInfo= row.original
//             const menuOptions = [<Link to={`/customer/address`} params={{id:addressInfo._id}} className="hover:cursor-pointer">
//           <DropdownMenuItem>Edit</DropdownMenuItem>
//         </Link>]
//             return <>
//                 <TableDropdown id={addressInfo._id} menuOptions={menuOptions} option={"address"}/>
//                 </> 
//         }
//     }
// ];

export const addressColumns: ColumnDef<ShipmentInfo>[] = [
  {
    accessorKey: "full_name",
    header: () => <span className="font-medium text-gray-600">Full Name</span>,
    cell: ({ row }) => {
      const full_name = row.original.full_name;
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
            {full_name.charAt(0).toUpperCase()}
          </div>
          <p className="font-semibold text-gray-800">{full_name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => <span className="font-medium text-gray-600">Email</span>,
    cell: ({ row }) => {
      const email = row.original.email;
      return (
        <div className="flex items-center">
          <a 
            href={`mailto:${email}`} 
            className="text-primary hover:underline hover:text-primary-shade-dark transition-colors"
          >
            {email}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "phone_number",
    header: () => <span className="font-medium text-gray-600">Phone Number</span>,
    cell: ({ row }) => {
      const phone_number = row.original.phone_number;
      return (
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-4 h-4 text-gray-500" />
          <a 
            href={`tel:${phone_number}`} 
            className="font-medium text-gray-700 hover:text-primary transition-colors"
          >
            {phone_number}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: () => <span className="font-medium text-gray-600">Street Address</span>,
    cell: ({ row }) => {
      const address = row.original.address;
      return (
        <div className="flex items-center gap-2">
          <LocationEditIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <p className="max-w-[180px] truncate text-gray-700" title={address}>
            {address}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "city",
    header: () => <span className="font-medium text-gray-600">City</span>,
    cell: ({ row }) => {
      const city = row.original.city;
      return <p className="text-gray-700">{city}</p>;
    },
  },
  {
    accessorKey: "region",
    header: () => <span className="font-medium text-gray-600">Region/Province</span>,
    cell: ({ row }) => {
      const region = row.original.region;
      return <p className="text-gray-700">{region}</p>;
    },
  },
  {
    id: "action",
    header: () => <span className="font-medium text-gray-600">Actions</span>,
    cell: ({ row }) => {
      const addressInfo = row.original;
      const menuOptions = [
        <Link 
           to={`/customer/address/$id`} params={{id:addressInfo._id}} 
          className="hover:cursor-pointer"
        >
          <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-50">
            <EditIcon className="w-4 h-4 text-gray-600" />
            <span>Edit</span>
          </DropdownMenuItem>
        </Link>,
      ];
      return (
        <div className="flex justify-end">
          <TableDropdown 
            id={addressInfo._id} 
            menuOptions={menuOptions} 
            option={"address"}
          />
        </div>
      );
    },
  },
];