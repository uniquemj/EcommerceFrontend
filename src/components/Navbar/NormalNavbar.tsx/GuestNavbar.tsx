
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const GuestNavbar = () => {
  return (
    <>
      <div className="block sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <AlignRight />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <Link to="/auth/seller/login">
                <DropdownMenuItem>Become a Seller</DropdownMenuItem>
              </Link>
              <Link to="/auth/login">
                <DropdownMenuItem className="hover:bg-red-400 hover:text-amber-50">
                  Log In
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className=" items-center space-x-4 sm:space-x-8 hidden sm:flex">
        <Link to="/auth/seller/login" className="hover:underline sm:text-md">
          Become a Seller
        </Link>
        <Link to="/auth/login">
          <Button className="border-2 border-red-50 bg-transparent text-white hover:cursor-pointer  hover:bg-red-50 hover:text-red-400">
            Login
          </Button>
        </Link>
      </div>
    </>
  );
};

export default GuestNavbar;
