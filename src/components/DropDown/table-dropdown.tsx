import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { UserRole } from "@/types/enum.types";
import { useDeleteAdmin } from "@/hooks/admin.hooks";
import { useDeleteCustomer } from "@/hooks/customer.hooks";
import { useDeleteSeller } from "@/hooks/seller.hooks";
import { useDeleteCategory } from "@/hooks/category.hooks";


const TableDropdown = ({URL, id, option}: {URL: string, id: string, option: string}) => {
  let deleteHook;

  switch(option){
    case UserRole.ADMIN:
      deleteHook = useDeleteAdmin
      break
    case UserRole.CUSTOMER:
      deleteHook = useDeleteCustomer
      break
    case UserRole.SELLER:
      deleteHook = useDeleteSeller
      break
    case "category":
      deleteHook = useDeleteCategory
      break
    default:
      throw Error("Invalid")
  }

  const {mutate} = deleteHook()

  const handleDelete = () =>{
    mutate(id)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
            option == UserRole.ADMIN || option == "category" ?
          <Link to={URL} params={{id:id}} className="hover:cursor-pointer">
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>: null
        }
        {
          option == UserRole.SELLER ? 
          <Link to={URL} params={{id:id}} className="hover:cursor-pointer">
          <DropdownMenuItem>Review & Verfiy</DropdownMenuItem>
        </Link>: null
        }
          <DropdownMenuItem onClick={handleDelete} className="hover:cursor-pointer">
            Delete
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableDropdown;