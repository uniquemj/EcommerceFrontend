import type { NavRoute } from "@/types/navbar.typs";
import { LayoutDashboard, ShieldCheck, User, Store, Package, Clipboard, Tag, UserCog } from "lucide-react";

export const navRoute: NavRoute = {
    seller: [
        {
            title: "Dashboard",
            icons: (<LayoutDashboard size={18}/>),
            url: '/seller/dashboard',
            include: true,
            subItems: []
        },
        {
            title: "Products",
            url: "#",
            icons: (<Package size={18}/>),
            include: true,
            subItems: [
                {
                    title: "Manage Products",
                    url: "/seller/dashboard/products",
                    include: true,
                },
                {
                    title: "Add product",
                    url: "/seller/dashboard/products/create",
                    include: true,
                }
            ]
        },
        {
            title: "Orders",
            url: "#",
            icons: (<Clipboard size={18} />),
            include: true,
            subItems:[
                {
                    title: "Manage Orders",
                    url: "#",
                    include: true,
                },
            ]
        },
        {
            title: "Account Information",
            url: "/seller/profile",
            icons: (<UserCog size={18}/>),
            include: true,
            subItems: [
                {
                    title: "Manage Account",
                    url: "/seller/dashboard/account-settings",
                    include: true,
                },
                {
                    title: "Add Bussiness Information",
                    url: "/seller/dashboard/business-information",
                    include: false,
                }
            ]
        }
    ],
    admin: [
        {
            title: "Dashboard",
            icons: (<LayoutDashboard size={18}/>),
            url: '/admin/dashboard',
            include: true,
            subItems: []
        },
        {
            title: "Admins",
            url: "#",
            icons: (<ShieldCheck size={18}/>),
            include: true,
            subItems: [
                {
                    title: "Manage Admins",
                    url: "/admin/dashboard/admins",
                    include: true
                }, 
            ]
        },
        {
            title: "Sellers",
            url: "#",
            icons: (<Store size={16}/>),
            include: true,
            subItems: [
                {
                    title: "Manage Sellers",
                    url: "/admin/dashboard/sellers",
                    include: true
                }, 
            ]
        },
        {
            title: "Customers",
            url: "#",
            icons: (<User size={18}/>),
            include: true,
            subItems: [
                {
                    title: "Manage Customers",
                    url: "/admin/dashboard/customers",
                    include: true
                }
            ]
        },
        {
            title: "Category",
            url: "#",
            icons: (<Tag size={18}/>),
            include: true,
            subItems: [
                {
                    title: "Manage Category",
                    url: "/admin/dashboard/categories",
                    include: true
                }
            ]
        },
        {
            title: "Products",
            url: "#",
            icons: (<Package size={18}/>),
            include: true,
            subItems: [
                {
                    title: "Manage Products",
                    url: "/seller/dashboard/products",
                    include: true,
                },
                {
                    title: "Add product",
                    url: "/seller/dashboard/products/create",
                    include: true,
                }
            ]
        },
        {
            title: "Orders",
            icons: (<Clipboard size={18}/>),
            url: "#",
            include: true,
        },
        {
            title: "Account Information",
            url: "/admin/profile",
            icons: (<UserCog size={18}/>),
            include: true,
            subItems: [
                {
                    title: "Manage Account",
                    url: "/admin/dashboard/account-settings",
                    include: true,
                },
            ]
        }
    ]
}