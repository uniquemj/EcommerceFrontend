import { VerificationStatus, type Admin, type Customer, type Seller } from "@/types/user.types"
import type {ColumnDef} from "@tanstack/react-table"
import TableDropdown from "../DropDown/table-dropdown"
import { Badge } from "../ui/badge"
import type { Category } from "@/types/category.types"
import { UserRole } from "@/types/enum.types"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import { Link } from "@tanstack/react-router"

export const sellerColumns: ColumnDef<Seller>[] = [
    {
        accessorKey: "fullname",
        header: "Seller Name"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "store_name",
        header: "Store Name"
    },
    {
        accessorKey: "phone_number",
        header: "Phone Number",
    },
    {
        accessorKey: "verification_status",
        header: "Seller Verified",
        cell: ({row})=>{
            const verification_status = row.original.verification_status
            return <Badge className={`${verification_status == VerificationStatus.PENDING ? `bg-light-tan text-primary-color` : verification_status == VerificationStatus.VERIFIED ? `bg-success-color text-text-color`: `bg-error-color text-text-color`} mt-2`}>
                {verification_status}
              </Badge>
        }
    },
    {
        id: "action",
        header: "Actions",
        cell: ({row}) =>{
            const seller = row.original
            const menuOptions = [<Link to={'/admin/dashboard/sellers/$id'} params={{id:seller._id}} className="hover:cursor-pointer">
          <DropdownMenuItem>Review & Verfiy</DropdownMenuItem>
        </Link>]
            return(
                <TableDropdown id={seller._id} menuOptions={menuOptions} option={UserRole.SELLER}/>
            )
        }
    }
]


export const customerColumns: ColumnDef<Customer>[] = [
    {
        accessorKey: "fullname",
        header: "Full Name",
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "phone_number",
        header: "Phone Number"
    },
    // {
    //     accessorKey: "date_of_birth",
    //     header: "DOB",
    //     cell: ({row})=>{
    //         let dob = "";
    //         if(row.original.date_of_birth){
    //             dob = row.original.date_of_birth.split('T')[0]
    //         }
    //         return <p>{dob}</p>
    //     }
    // },
    {
        id: "action",
        header: "Actions",
        cell: ({row}) =>{

            return <>
                <TableDropdown id={row.original._id} menuOptions={[]} option={UserRole.CUSTOMER}/>
            </>
        }
    }
]


export const superAdminColumns: ColumnDef<Admin>[] =[
    {
        accessorKey: 'username',
        header: "Username"
    },
    {
        accessorKey: 'fullname',
        header: 'Full Name'
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'isSuperAdmin',
        header: 'Admin Status',
        cell: ({row})=>{
            const isSuperAdmin = row.original.isSuperAdmin
            return isSuperAdmin ? ( <Badge className="bg-secondary-color text-text-color">Super</Badge>) : (<Badge className="bg-multed-blue text-text-color">Normal</Badge>)
        }
    },
    {
        id: "action",
        header: "Actions",
        cell: ({row}) =>{
            const admin = row.original
            const menuOptions = [<Link to={`/admin/dashboard/admins/$id`} params={{id:admin._id}} className="hover:cursor-pointer">
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>]
            return <>
                <TableDropdown id={admin._id} menuOptions={menuOptions} option={UserRole.ADMIN}/>
                </> 
        }
    }
]

export const adminColumns: ColumnDef<Admin>[] =[
    {
        accessorKey: 'username',
        header: "Username"
    },
    {
        accessorKey: 'fullname',
        header: 'Fullname'
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'isSuperAdmin',
        header: 'Admin Status',
        cell: ({row})=>{
            const isSuperAdmin = row.original.isSuperAdmin
            return isSuperAdmin ? (<span className='rounded-lg bg-red-400 py-1 px-2 text-amber-50'>Super Admin</span>) : (<span className='rounded-lg bg-gray-400 py-1 px-2 text-amber-50'>Normal Admin</span>)
        }
    }
]

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
