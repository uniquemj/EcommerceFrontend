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
      <SidebarHeader >
        <SidebarMenu>
          <SidebarMenuItem className="bg-red-400 rounded-xl p-4 flex">
            <div className="grid flex-1 text-left text-xl leading-tight">
              <span className="truncate font-semibold text-amber-50">{data.heading}</span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
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
