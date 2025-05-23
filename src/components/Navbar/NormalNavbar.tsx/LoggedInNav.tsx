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
            <AvatarFallback className="bg-red-200 text-red-400 hover:cursor-pointer">
              {initials}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="text-center">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link to="/customer/profile">
              <DropdownMenuItem>Manage Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="hover:bg-red-400 hover:text-amber-50"
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default LoggedInNav;
