import type { NavMetaData } from "@/types/navbar.typs";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useSellerState } from "@/store/seller.store";
import { useAuth } from "@/store/auth.store";
import { UserRole } from "@/types/enum.types";

const NavMain = ({ items }: { items: NavMetaData[] }) => {
  const { role } = useAuth();
  const { isVerified } = useSellerState();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} className="group/collapsible" asChild>
            <SidebarMenuItem>
              {item.subItems?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <div>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className="flex items-end gap-4 hover:text-secondary-color hover:cursor-pointer"
                      >
                        <span className="group-data-[state=open]/collapsible:text-secondary-color">{item.icons}</span>
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      <SidebarMenuAction className="group-data-[state=open]/collapsible:rotate-90">
                        <ChevronRight/>
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-2">
                    <SidebarMenuSub>
                      {item.subItems?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          {role == UserRole.SELLER ? (isVerified == subItem.include ? (

                            <SidebarMenuSubButton
                              asChild
                              className="[&.active]:text-secondary-color [&.active]:font-medium"
                            >
                              <Link to={subItem.url} activeOptions={{ exact: true }} className="hover:text-secondary-color">
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          ): null): <SidebarMenuSubButton
                              asChild
                              className="[&.active]:text-secondary-color [&.active]:font-medium hover:text-secondary-color hover:cursor-pointer"
                            >
                              <Link to={subItem.url} activeOptions={{ exact: true }}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>}
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuSubButton className="hover:text-secondary-color hover:cursor-pointer">
                    <Link
                      to={item.url}
                      activeOptions={{ exact: true }}
                      className="flex items-end gap-4 [&.active]:text-secondary-color [&.active]:font-medium p-0"
                    >
                      <span>{item.icons}</span>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuItem>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
