import type { NavRoute } from "@/types/navbar.typs";


export const navRoute: NavRoute = {
    seller: [
        {
            title: "Products",
            url: "#",
            include: true,
            subItems: [
                {
                    title: "Manage Products",
                    url: "#",
                    include: true,
                },
                {
                    title: "Add product",
                    url: "#",
                    include: true,
                }
            ]
        },
        {
            title: "Orders",
            url: "#",
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
            title: "Admins",
            url: "#",
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
            title: "Products",
            url: '#',
            include: true,
        },
        {
            title: "Orders",
            url: "#",
            include: true,
        },
        {
            title: "Account Information",
            url: "/admin/profile",
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