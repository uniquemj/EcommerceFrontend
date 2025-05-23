import type {NavMetaData} from '@/types/navbar.typs'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { useSellerState } from '@/store/seller.store'
import { useAuth } from '@/store/auth.store'
import { UserRole } from '@/types/enum.types'

const NavMain = ({items}: {items: NavMetaData[]}) => {
    const {role} = useAuth()
    const {isVerified} = useSellerState()
  return (
    <SidebarGroup>
        <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
        <SidebarMenu>
            {
                items.map((item)=>(
                    <Collapsible key={item.title} asChild>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={item.title}>
                                <Link to={item.url}>
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                            {item.subItems?.length ? (
                                <>
                                    <CollapsibleTrigger asChild>
                                      <SidebarMenuAction className='data-[state=open]:rotate-90'>
                                        <ChevronRight/>
                                        <span className='sr-only'>Toggle</span>
                                      </SidebarMenuAction>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.subItems?.map((subItem)=>(
                                                 <SidebarMenuSubItem key={subItem.title}>
                                                    {isVerified == !subItem.include && role== UserRole.SELLER ? null:
                                                    <SidebarMenuSubButton asChild>
                                                    <Link to={subItem.url}>
                                                    <span>{subItem.title}</span>
                                                    </Link>
                                                    </SidebarMenuSubButton>
                                                    }
                                                </SidebarMenuSubItem>
                                               
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </>
                            ): null}
                        </SidebarMenuItem>
                    </Collapsible>
                ))
            }
        </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavMain