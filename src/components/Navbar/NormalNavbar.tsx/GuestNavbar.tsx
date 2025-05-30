
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { LogIn } from 'lucide-react';
import { Store } from 'lucide-react';

const GuestNavbar = () => {
  return (
    <>
      <div className="block sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <AlignRight className=""/>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <Link to="/auth/seller/login" className="[&.active]:underline text-primary-color">
                <DropdownMenuItem>Become a Seller</DropdownMenuItem>
              </Link>
              <Link to="/auth/login" className="[&.active]:underline text-primary-color">
                <DropdownMenuItem>
                  Log In
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className=" items-center space-x-4 sm:space-x-8 hidden sm:flex">
        <Link to="/auth/seller/login" className="hover:underline sm:text-md flex gap-2 justify-end">
          <Store size={20}/>
          Become a Seller
        </Link>
        <Link to="/auth/login" className="flex gap-2 justify-end hover:underline">
            <LogIn size={20}/>
            Login
        </Link>
      </div>
    </>
  );
};

export default GuestNavbar;
