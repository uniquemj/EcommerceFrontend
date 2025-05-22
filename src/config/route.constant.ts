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
                    url: "#",
                    include: true,
                },
                {
                    title: "Add Bussiness Information",
                    url: "/seller/dashboard/business-information",
                    include: true,
                }
            ]
        }
    ],
    admin: [
        {
            title: "Sellers",
            url: "#",
            include: true,
        },
        {
            title: "Customers",
            url: "#",
            include: true,
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
        }
    ]
}