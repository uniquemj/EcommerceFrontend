import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, TrashIcon } from "lucide-react";
import { UserRole } from "@/types/enum.types";
import { useDeleteAdmin } from "@/hooks/admin.hooks";
import { useDeleteCustomer } from "@/hooks/customer.hooks";
import { useDeleteSeller } from "@/hooks/seller.hooks";
import { useDeleteCategory } from "@/hooks/category.hooks";
import { useDeleteProduct } from "@/hooks/product.hooks";
import { useDeleteAddress } from "@/hooks/shipment.hooks";


const TableDropdown = ({id, menuOptions ,option}: {id: string, menuOptions: React.ReactNode[], option: string}) => {
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
    case "product":
      deleteHook = useDeleteProduct
      break
    case "address":
      deleteHook = useDeleteAddress
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
      <DropdownMenuTrigger className="hover:cursor-pointer" asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
          menuOptions.map((option)=>(option))
        }
          <DropdownMenuItem onClick={handleDelete} className="hover:cursor-pointer text-red-500 hover:bg-red-50">
            <TrashIcon className="w-4 h-4" />
          <span>Delete</span>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableDropdown;