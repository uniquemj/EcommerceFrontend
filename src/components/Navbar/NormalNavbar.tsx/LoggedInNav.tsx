import { Link } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../../ui/avatar";
// import { useLogout } from "@/hooks/auth.hooks";
// import { UserRole } from "@/types/enum.types";
import { useAuth } from "@/store/auth.store";
import { useLogout } from "@/hooks/auth.hooks";
import { LogOut, UserCogIcon } from "lucide-react";


const LoggedInNav = () => {
    const { mutate } = useLogout();
    const {role, initials} = useAuth()

  const handleLogout = () => {
    mutate(role);
  };

  return (
    <>
      <div className="hidden md:flex gap-12">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarFallback className="bg-ternary-color text-text-color hover:cursor-pointer">
              {initials}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-footer-color text-text-color">
          <DropdownMenuLabel className="text-center">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-text-color" />
          <DropdownMenuGroup className="text-text-color">
            <Link to="/customer/profile">
              <DropdownMenuItem> <UserCogIcon size={16}/> Manage Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="hover:bg-red-400 hover:text-amber-50"
              onClick={handleLogout}
            >
              <LogOut size={16}/>
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default LoggedInNav;
