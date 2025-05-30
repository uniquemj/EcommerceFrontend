import { VerificationStatus, type Admin, type Customer, type Seller } from "@/types/user.types"
import type {ColumnDef} from "@tanstack/react-table"
import TableDropdown from "../DropDown/table-dropdown"
import { Badge } from "../ui/badge"
import type { Category } from "@/types/category.types"
import { UserRole } from "@/types/enum.types"
import { ArchieveStatus, type ProductInfo } from "@/types/product.types"

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
            return(
                <TableDropdown URL={'/admin/dashboard/sellers/$id'} id={seller._id} option={UserRole.SELLER}/>
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
                <TableDropdown URL="" id={row.original._id} option={UserRole.CUSTOMER}/>
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
            return <>
                <TableDropdown URL={`/admin/dashboard/admins/$id`} id={admin._id} option={UserRole.ADMIN}/>
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

            return <>
                <TableDropdown URL={`/admin/dashboard/categories/$id`} id={category._id} option={"category"}/>
                </> 
        }
    }
]

export const productColumns: ColumnDef<ProductInfo>[] =[
    {
        accessorKey: 'name',
        header: 'Product Name'
    },
    {
        accessorKey: 'category',
        header: 'Category',
        cell: ({row}) => {
            const category = row.original.category
            return <Badge className="bg-secondary-color">{category.title}</Badge>
        }
    },
    {
        accessorKey: 'variants',
        header: 'Variant Count',
        cell: ({row})=>{
            const variant = row.original.variants
            return variant.length
        }
    },
    {
        accessorKey: 'archieveStatus',
        header: 'Archieve Status',
        cell: ({row})=>{
            const archieveStatus = row.original.archieveStatus
            return archieveStatus == ArchieveStatus.Archieve ? <Badge className="bg-ternary-color"></Badge> : <Badge className="bg-green-400"></Badge>
        }
    }
]