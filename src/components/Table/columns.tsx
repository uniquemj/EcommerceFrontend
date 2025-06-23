import { VerificationStatus, type Admin, type Customer, type Seller } from "@/types/user.types"
import type {ColumnDef} from "@tanstack/react-table"
import TableDropdown from "../DropDown/table-dropdown"
import { Badge } from "../ui/badge"
import type { Category } from "@/types/category.types"
import { UserRole } from "@/types/enum.types"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import { Link } from "@tanstack/react-router"

// export const sellerColumns: ColumnDef<Seller>[] = [
//     {
//         accessorKey: "fullname",
//         header: "Seller Name"
//     },
//     {
//         accessorKey: "email",
//         header: "Email"
//     },
//     {
//         accessorKey: "store_name",
//         header: "Store Name"
//     },
//     {
//         accessorKey: "phone_number",
//         header: "Phone Number",
//     },
//     {
//         accessorKey: "verification_status",
//         header: "Seller Verified",
//         cell: ({row})=>{
//             const verification_status = row.original.verification_status
//             return <Badge className={`${verification_status == VerificationStatus.PENDING ? `bg-light-tan text-primary-color` : verification_status == VerificationStatus.VERIFIED ? `bg-success-color text-text-color`: `bg-error-color text-text-color`} mt-2`}>
//                 {verification_status}
//               </Badge>
//         }
//     },
//     {
//         id: "action",
//         header: "Actions",
//         cell: ({row}) =>{
//             const seller = row.original
//             const menuOptions = [<Link to={'/admin/dashboard/sellers/$id'} params={{id:seller._id}} className="hover:cursor-pointer">
//           <DropdownMenuItem>Review & Verfiy</DropdownMenuItem>
//         </Link>]
//             return(
//                 <TableDropdown id={seller._id} menuOptions={menuOptions} option={UserRole.SELLER}/>
//             )
//         }
//     }
// ]


// export const customerColumns: ColumnDef<Customer>[] = [
//     {
//         accessorKey: "fullname",
//         header: "Full Name",
//     },
//     {
//         accessorKey: "email",
//         header: "Email"
//     },
//     {
//         accessorKey: "phone_number",
//         header: "Phone Number"
//     },
//     // {
//     //     accessorKey: "date_of_birth",
//     //     header: "DOB",
//     //     cell: ({row})=>{
//     //         let dob = "";
//     //         if(row.original.date_of_birth){
//     //             dob = row.original.date_of_birth.split('T')[0]
//     //         }
//     //         return <p>{dob}</p>
//     //     }
//     // },
//     {
//         id: "action",
//         header: "Actions",
//         cell: ({row}) =>{

//             return <>
//                 <TableDropdown id={row.original._id} menuOptions={[]} option={UserRole.CUSTOMER}/>
//             </>
//         }
//     }
// ]

export const sellerColumns: ColumnDef<Seller>[] = [
  {
    accessorKey: "fullname",
    header: "SELLER NAME",
    cell: ({ row }) => {
      const name = row.original.fullname;
      return (
        <div className="min-w-[180px] max-w-[220px] p-2">
          <p className="font-medium text-gray-900 truncate">
            {name || "Unknown Seller"}
          </p>
        </div>
      );
    },
    size: 220,
  },
  {
    accessorKey: "email",
    header: "EMAIL",
    cell: ({ row }) => {
      const email = row.original.email;
      return (
        <div className="min-w-[200px] max-w-[280px] p-2">
          <p className="text-gray-600 text-sm truncate" title={email}>
            {email || "-"}
          </p>
        </div>
      );
    },
    size: 280,
  },
  {
    accessorKey: "store_name",
    header: "STORE",
    cell: ({ row }) => {
      const storeName = row.original.store_name;
      return (
        <div className="min-w-[150px] max-w-[200px] p-2">
          <p className="font-medium text-blue-600 truncate">
            {storeName || "No Store"}
          </p>
        </div>
      );
    },
    size: 200,
  },
  {
    accessorKey: "phone_number",
    header: "PHONE",
    cell: ({ row }) => {
      const phone = row.original.phone_number;
      return (
        <div className="min-w-[120px] p-2">
          <p className="text-gray-600 text-sm">
            {phone ? formatPhoneNumber(phone) : "-"}
          </p>
        </div>
      );
    },
    size: 150,
  },
  {
    accessorKey: "verification_status",
    header: "VERIFICATION",
    cell: ({ row }) => {
      const verification_status = row.original.verification_status;
      
      const statusConfig = {
        [VerificationStatus.PENDING]: {
          className: "bg-yellow-100 text-yellow-800",
          label: "Pending Review"
        },
        [VerificationStatus.VERIFIED]: {
          className: "bg-green-100 text-green-800",
          label: "Verified"
        },
        [VerificationStatus.REJECTED]: {
          className: "bg-red-100 text-red-800",
          label: "Rejected"
        },
        default: {
          className: "bg-gray-100 text-gray-800",
          label: "Unknown"
        }
      };

      const config = statusConfig[verification_status] || statusConfig.default;

      return (
        <div className="p-2 min-w-[120px]">
          <Badge className={`${config.className} capitalize`}>
            {config.label}
          </Badge>
        </div>
      );
    },
    size: 150,
  },
  {
    id: "action",
    header: "ACTIONS",
    cell: ({ row }) => {
      const seller = row.original;
      return (
        <div className="flex justify-center p-2 min-w-[80px]">
          <TableDropdown
            id={seller._id}
            menuOptions={[
              <Link 
                to={`/admin/dashboard/sellers/$id`}
                params={{id: seller._id}}
                key="review-verify"
                className="hover:cursor-pointer"
              >
                <DropdownMenuItem className="text-sm">
                  Review & Verify
                </DropdownMenuItem>
              </Link>,
            ]}
            option={UserRole.SELLER}
          />
        </div>
      );
    },
    size: 120,
  },
];


export const customerColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "fullname",
    header: "CUSTOMER NAME",
    cell: ({ row }) => {
      const name = row.original.fullname;
      return (
        <div className="min-w-[180px] max-w-[220px] p-2">
          <p className="font-medium text-gray-900 truncate">
            {name || "Unknown Customer"}
          </p>
        </div>
      );
    },
    size: 220,
  },
  {
    accessorKey: "email",
    header: "EMAIL",
    cell: ({ row }) => {
      const email = row.original.email;
      return (
        <div className="min-w-[200px] max-w-[280px] p-2">
          <p className="text-gray-600 text-sm truncate" title={email}>
            {email || "-"}
          </p>
        </div>
      );
    },
    size: 280,
  },
  {
    accessorKey: "phone_number",
    header: "PHONE",
    cell: ({ row }) => {
      const phone = row.original.phone_number;
      return (
        <div className="min-w-[120px] p-2">
          <p className="text-gray-600 text-sm">
            {phone ? formatPhoneNumber(phone) : "-"}
          </p>
        </div>
      );
    },
    size: 150,
  },
  // Uncomment if you need date of birth
  // {
  //   accessorKey: "date_of_birth",
  //   header: "DOB",
  //   cell: ({ row }) => {
  //     const dob = row.original.date_of_birth;
  //     return (
  //       <div className="min-w-[100px] p-2">
  //         <p className="text-gray-600 text-sm">
  //           {dob ? new Date(dob).toLocaleDateString() : "-"}
  //         </p>
  //       </div>
  //     );
  //   },
  //   size: 120,
  // },
  {
    id: "action",
    header: "ACTIONS",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <div className="flex justify-center p-2 min-w-[80px]">
          <TableDropdown
            id={customer._id}
            menuOptions={[
              // Add your menu options here when needed
              // Example:
              // <Link 
              //   to={`/admin/customers/${customer._id}`}
              //   key="view-details"
              //   className="hover:cursor-pointer"
              // >
              //   <DropdownMenuItem className="text-sm">
              //     View Details
              //   </DropdownMenuItem>
              // </Link>,
            ]}
            option={UserRole.CUSTOMER}
          />
        </div>
      );
    },
    size: 100,
  },
];

// Helper function to format phone numbers
function formatPhoneNumber(phoneNumber: string) {
  return phoneNumber;
}

// export const superAdminColumns: ColumnDef<Admin>[] =[
//     {
//         accessorKey: 'username',
//         header: "Username"
//     },
//     {
//         accessorKey: 'fullname',
//         header: 'Full Name'
//     },
//     {
//         accessorKey: 'email',
//         header: 'Email'
//     },
//     {
//         accessorKey: 'isSuperAdmin',
//         header: 'Admin Status',
//         cell: ({row})=>{
//             const isSuperAdmin = row.original.isSuperAdmin
//             return isSuperAdmin ? ( <Badge className="bg-secondary-color text-text-color">Super</Badge>) : (<Badge className="bg-multed-blue text-text-color">Normal</Badge>)
//         }
//     },
//     {
//         id: "action",
//         header: "Actions",
//         cell: ({row}) =>{
//             const admin = row.original
//             const menuOptions = [<Link to={`/admin/dashboard/admins/$id`} params={{id:admin._id}} className="hover:cursor-pointer">
//           <DropdownMenuItem>Edit</DropdownMenuItem>
//         </Link>]
//             return <>
//                 <TableDropdown id={admin._id} menuOptions={menuOptions} option={UserRole.ADMIN}/>
//                 </> 
//         }
//     }
// ]

// export const adminColumns: ColumnDef<Admin>[] =[
//     {
//         accessorKey: 'username',
//         header: "Username"
//     },
//     {
//         accessorKey: 'fullname',
//         header: 'Fullname'
//     },
//     {
//         accessorKey: 'email',
//         header: 'Email'
//     },
//     {
//         accessorKey: 'isSuperAdmin',
//         header: 'Admin Status',
//         cell: ({row})=>{
//             const isSuperAdmin = row.original.isSuperAdmin
//             return isSuperAdmin ? (<span className='rounded-lg bg-red-400 py-1 px-2 text-amber-50'>Super Admin</span>) : (<span className='rounded-lg bg-gray-400 py-1 px-2 text-amber-50'>Normal Admin</span>)
//         }
//     }
// ]

export const superAdminColumns: ColumnDef<Admin>[] = [
  {
    accessorKey: 'username',
    header: "USERNAME",
    cell: ({ row }) => {
      const username = row.original.username;
      return (
        <div className="min-w-[150px] max-w-[200px] p-2">
          <p className="font-medium text-gray-900 truncate">
            {username || "-"}
          </p>
        </div>
      );
    },
    size: 200
  },
  {
    accessorKey: 'fullname',
    header: 'FULL NAME',
    cell: ({ row }) => {
      const fullname = row.original.fullname;
      return (
        <div className="min-w-[180px] max-w-[220px] p-2">
          <p className="text-gray-700 truncate">
            {fullname || "-"}
          </p>
        </div>
      );
    },
    size: 220
  },
  {
    accessorKey: 'email',
    header: 'EMAIL',
    cell: ({ row }) => {
      const email = row.original.email;
      return (
        <div className="min-w-[200px] max-w-[280px] p-2">
          <p className="text-gray-600 text-sm truncate" title={email}>
            {email || "-"}
          </p>
        </div>
      );
    },
    size: 280
  },
  {
    accessorKey: 'isSuperAdmin',
    header: 'ADMIN ROLE',
    cell: ({ row }) => {
      const isSuperAdmin = row.original.isSuperAdmin;
      return (
        <div className="p-2 min-w-[120px]">
          <Badge 
            className={
              isSuperAdmin 
                ? "bg-purple-100 text-purple-800" 
                : "bg-blue-100 text-blue-800"
            }
          >
            {isSuperAdmin ? "Super Admin" : "Admin"}
          </Badge>
        </div>
      );
    },
    size: 150
  },
  {
    id: "action",
    header: "ACTIONS",
    cell: ({ row }) => {
      const admin = row.original;
      return (
        <div className="flex justify-center p-2 min-w-[80px]">
          <TableDropdown
            id={admin._id}
            menuOptions={[
              <Link 
                to={`/admin/dashboard/admins/$id`}
                params={{id: admin._id}}
                key="edit-admin"
                className="hover:cursor-pointer"
              >
                <DropdownMenuItem className="text-sm">
                  Edit Admin
                </DropdownMenuItem>
              </Link>,
            ]}
            option={UserRole.ADMIN}
          />
        </div>
      );
    },
    size: 120
  }
];

export const adminColumns: ColumnDef<Admin>[] = [
  {
    accessorKey: 'username',
    header: "USERNAME",
    cell: ({ row }) => {
      const username = row.original.username;
      return (
        <div className="min-w-[150px] max-w-[200px] p-2">
          <p className="font-medium text-gray-900 truncate">
            {username || "-"}
          </p>
        </div>
      );
    },
    size: 200
  },
  {
    accessorKey: 'fullname',
    header: 'FULL NAME',
    cell: ({ row }) => {
      const fullname = row.original.fullname;
      return (
        <div className="min-w-[180px] max-w-[220px] p-2">
          <p className="text-gray-700 truncate">
            {fullname || "-"}
          </p>
        </div>
      );
    },
    size: 220
  },
  {
    accessorKey: 'email',
    header: 'EMAIL',
    cell: ({ row }) => {
      const email = row.original.email;
      return (
        <div className="min-w-[200px] max-w-[280px] p-2">
          <p className="text-gray-600 text-sm truncate" title={email}>
            {email || "-"}
          </p>
        </div>
      );
    },
    size: 280
  },
  {
    accessorKey: 'isSuperAdmin',
    header: 'ADMIN ROLE',
    cell: ({ row }) => {
      const isSuperAdmin = row.original.isSuperAdmin;
      return (
        <div className="p-2 min-w-[120px]">
          <Badge 
            className={
              isSuperAdmin 
                ? "bg-purple-100 text-purple-800" 
                : "bg-blue-100 text-blue-800"
            }
          >
            {isSuperAdmin ? "Super Admin" : "Admin"}
          </Badge>
        </div>
      );
    },
    size: 150
  }
];

export const categoryColumns: ColumnDef<Category>[] =[
    {
        accessorKey: 'title',
        header: "Title"
    },
    {
        accessorKey: 'parent_category',
        header: ()=>{
            return <p className="font-bold text-primary-color">Parent Category</p>
        },
        cell: ({row}) => {
            const parent_category_title = row.original.parent_category?.title ?? '-'
            return (parent_category_title == '-' ? <p>{parent_category_title}</p> : <Badge className="bg-ternary-color">{parent_category_title}</Badge>)
        }
    },
    {
        id: "action",
        header: "Actions",
        cell: ({row}) =>{
            const category = row.original
            const menuOptions = [<Link to={`/admin/dashboard/categories/$id`} params={{id:category._id}} className="hover:cursor-pointer">
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>]
            return <>
                <TableDropdown id={category._id} menuOptions={menuOptions} option={"category"}/>
                </> 
        }
    }
]
