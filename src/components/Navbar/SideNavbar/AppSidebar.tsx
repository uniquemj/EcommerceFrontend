import { Sidebar, SidebarContent, SidebarFooter,  SidebarHeader, SidebarMenu, SidebarMenuItem, } from "@/components/ui/sidebar";

import React from "react";
import NavUser from "./nav-user";
import type { DataType } from "@/types/navbar.typs";
import NavMain from "./nav-main";



type AppSidebarType = React.ComponentProps<typeof Sidebar> & {
  data: DataType;
}
const AppSidebar = ({ data, ...props}: AppSidebarType) => {
  return (
    <Sidebar variant="inset" {...props} >
      <SidebarHeader className="flex flex-col gap-2 mb-2" >
        <SidebarMenu>
          <SidebarMenuItem className="rounded-xl px-2 flex line-clamp-4">
            <div className="grid flex-1 text-left text-xl leading-tight">
              <span className="truncate font-extrabold text-2xl text-primary-color">{data.heading}</span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* <Separator className="bg-primary-color"/> */}
      </SidebarHeader>
      <SidebarContent className=" rounded-xl">
        <NavMain items={data.menu}/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user}/>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
