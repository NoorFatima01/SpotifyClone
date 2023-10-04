'use client'

import { usePathname } from "next/navigation";
import path from "path";
import React, { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";


interface SidebarProps {
    children: React.ReactNode;
    //React.ReactNode. React.ReactNode is a type that can represent any node that could be rendered in React, such as strings, numbers, JSX elements, arrays, fragments, etc.
}


//React.FC<SidebarProps>: This is a generic type provided by React for functional components. FC stands for "Functional Component". By using React.FC<SidebarProps>, you're specifying that Sidebar is a functional component that expects props of type SidebarProps.

const Sidebar: React.FC<SidebarProps> = ({children}) => { 

    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: "Home",
            active: pathname !== "/search",
            href: "/",

        },
        {
            icon: BiSearch,
            label: "Search",
            active: pathname === "/search",
            href: "/search",
        }
    ],[pathname])

    return (
        <div className="flex h-full">
            <div className="
            hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
            <Box >
                <div className="flex flex-col gap-y-4 px-5 py-4">
                    {routes.map((route) => {
                        return (
                        <SidebarItem
                        key={route.label}
                        {...route}/>
                        )
                    })}
                </div>
            </Box>
            <Box className="overflow-y-auto h-full">
                Song Library
            </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    )
}

export default Sidebar;
