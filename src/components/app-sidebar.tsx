"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import { Route } from "@/types"
import { adminRoutes } from "@/routes/adminRoutes"
import { customerRoutes } from "@/routes/customerRoutes"
import { providerRoutes } from "@/routes/providerRoutes"

export function AppSidebar({ 
  user, 
  ...props 
}: { 
  user: { role: string } 
} & React.ComponentProps<typeof Sidebar>) {
  
  const pathname = usePathname()

  // Role based routes selection
  let routes: Route[] = []
  switch (user.role) {
    case "ADMIN":
      routes = adminRoutes
      break
    case "CUSTOMER":
      routes = customerRoutes
      break
    case "PROVIDER":
      routes = providerRoutes
      break
    default:
      routes = []
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  // ✅ Selection Logic:
                  // Exact match check korbe, athoba sub-route hole (e.g. meals/add) select thakbe
                  // dashboard '/' thakle sheta jeno shob jaygay highlight na hoy sheta handle kora hoyeche
                  const isActive = 
                    pathname === item.url || 
                    (item.url !== "/" && pathname.startsWith(`${item.url}/`))

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive}
                        className={isActive 
                          ? "bg-orange-100 text-orange-600 font-bold hover:bg-orange-100 hover:text-orange-600" 
                          : "text-slate-600 hover:bg-slate-50"
                        }
                      >
                        <Link href={item.url}>
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}