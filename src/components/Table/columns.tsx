import type { Admin, Customer, Seller } from "@/types/user.types"
import type {ColumnDef} from "@tanstack/react-table"
import TableDropdown from "../DropDown/table-dropdown"

export const sellerColumns: ColumnDef<Seller>[] = [
    {
        accessorKey: "_id",
        header: "ID",
        cell: ({row})=>{
            const _id = row.original._id
            return <p className="w-20 truncate">{_id}</p>
        }
    },
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
        accessorKey: "city",
        header: "City"
    },
    {
        accessorKey: "country",
        header: "Country"
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: ({row})=>{
            const address = row.original.address
            return <p className="w-20 truncate">{address}</p>
        }
    },
    {
        accessorKey: "verified_status",
        header: "Seller Verified"
    },
    {
        id: "action",
        header: "Actions",
        cell: () =>(
            <>
                <TableDropdown/>
            </>
        )
    }
]


export const customerColumns: ColumnDef<Customer>[] = [
    {
        accessorKey: "_id",
        header: "ID",
        cell: ({row})=>{
            const _id = row.original._id
            return <p className="w-20 truncate">{_id}</p>
        }
    },
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
    {
        accessorKey: "date_of_birth",
        header: "DOB",
        cell: ({row})=>{
            const dob = row.original.date_of_birth.split('T')[0]
            return <p>{dob}</p>
        }
    },
    {
        id: "action",
        header: "Actions",
        cell: () =>(
            <>
                <TableDropdown/>
            </>
        )
    }
]


export const adminColumns: ColumnDef<Admin>[] =[
    {
        accessorKey: '_id',
        header: 'ID',
        cell: ({row})=>{
            const _id = row.original._id
            return <p className="w-20 truncate">{_id}</p>
        }
    },
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
    },
    {
        id: "action",
        header: "Actions",
        cell: () =>{
            // const isSuperAdmin = row.original.isSuperAdmin
            return <>
                <TableDropdown/>
                </> 
        }
    }
]