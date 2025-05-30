import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import { DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { useLogout } from "@/hooks/auth.hooks";
import type { UserInfo } from "@/types/navbar.typs";
import { AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Link } from "@tanstack/react-router";
import { ChevronsUpDown, Key, Loader2, Lock, LogOut, User2Icon} from "lucide-react";


const NavUser = ({
  user,
}: {
  user: Partial<UserInfo>;
}) => {
    const {isMobile} = useSidebar()
    const {isPending, mutate} = useLogout()

    const route = `/${user.role}/profile`
    const updatePasswordRoute = `/${user.role}/dashboard/update-password`

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
                            <AvatarFallback className="rounded-lg text-text-color bg-ternary-color font-semibold">{user.initials}</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                           <span className="truncate font-semibold">{user.name}</span>
                           <span className="truncate text-xs">{user.email}</span>
                        </div>
                        <ChevronsUpDown className="ml-auto size-4"/>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-footer-color text-text-color w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg flex flex-col" side={isMobile?"bottom": "right"} align="end" sideOffset={4}>
                   <DropdownMenuLabel className="py-3 font-normal">
                        <h1 className="text-center text-sm font-semibold">Your Account</h1>
                   </DropdownMenuLabel>
                   <div className="flex justify-center">
                   <DropdownMenuSeparator className="bg-text-color w-4/5"/>
                   </div>
                   <DropdownMenuGroup className="flex flex-col gap-0.5 pb-3">
                    <Link to={route} className="">
                      <DropdownMenuItem className="flex  items-center gap-5 text-sm text-center hover:underline hover:text-amber-50 rounded-xl p-3">
                        <User2Icon size={16}/> Account
                      </DropdownMenuItem>
                    </Link>
                    <Link to={updatePasswordRoute} className="">
                      <DropdownMenuItem className="flex items-center gap-5 text-sm text-center hover:underline hover:text-amber-50 rounded-xl p-3">
                        <Lock size={16}/>Update Password
                      </DropdownMenuItem>
                    </Link>
                      <DropdownMenuItem onClick={handleLogout} className="hover:underline hover:text-amber-50 rounded-xl p-3 text-sm text-center cursor-pointer">
                        {isPending ?<Loader2 className="animate-spin w-4 h-4 mr-2" /> :(<div className="flex items-center gap-4"><LogOut size={16}/> Log out</div>)}
                      </DropdownMenuItem>
                   </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
  )
};

export default NavUser;
