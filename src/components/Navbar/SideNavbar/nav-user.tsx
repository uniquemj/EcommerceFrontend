import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import { DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { useLogout } from "@/hooks/auth.hooks";
import type { UserInfo } from "@/types/navbar.typs";
import { AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Link } from "@tanstack/react-router";
import { ChevronsUpDown, Loader2} from "lucide-react";


const NavUser = ({
  user,
}: {
  user: Partial<UserInfo>;
}) => {
    const {isMobile} = useSidebar()
    const {isPending, mutate} = useLogout()

    const handleLogout = () =>{
        mutate(user.role as string)
    }
  return (
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={user.avatar as string} alt={user.initials}/>
                            <AvatarFallback className="rounded-lg text-red-400 font-semibold">{user.initials}</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                           <span className="truncate font-semibold">{user.name}</span>
                           <span className="truncate text-xs">{user.email}</span>
                        </div>
                        <ChevronsUpDown className="ml-auto size-4"/>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#e3e2e2] w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg flex flex-col" side={isMobile?"bottom": "right"} align="end" sideOffset={4}>
                   <DropdownMenuLabel className="py-3 font-normal">
                        <h1 className="text-center text-sm font-semibold">Your Account</h1>
                   </DropdownMenuLabel>
                   <DropdownMenuSeparator />
                   <DropdownMenuGroup className="flex flex-col gap-0.5 pb-3">
                    <Link to="/seller/dashboard" className="hover:bg-red-300 hover:text-amber-50 rounded-xl p-3">
                      <DropdownMenuItem className="text-sm text-center">
                        Account
                      </DropdownMenuItem>
                    </Link>
                      <DropdownMenuItem onClick={handleLogout} className="hover:bg-red-300 hover:text-amber-50 rounded-xl p-3 text-sm text-center">
                        {isPending ?<Loader2 className="animate-spin w-4 h-4 mr-2" /> :"Log out"}
                      </DropdownMenuItem>
                   </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
  )
};

export default NavUser;
