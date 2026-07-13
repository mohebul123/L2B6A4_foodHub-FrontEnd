"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
} from "@/components/ui/sidebar";

import { Route } from "@/types";
import { adminRoutes } from "@/routes/adminRoutes";
import { customerRoutes } from "@/routes/customerRoutes";
import { providerRoutes } from "@/routes/providerRoutes";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string };
} & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  // Role based routes selection
  let routes: Route[] = [];
  switch (user.role) {
    case "ADMIN":
      routes = adminRoutes;
      break;
    case "CUSTOMER":
      routes = customerRoutes;
      break;
    case "PROVIDER":
      routes = providerRoutes;
      break;
    default:
      routes = [];
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-muted-foreground">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  // 🔥 FIXED SELECTION LOGIC:
                  // Base path overlap logic validation tight kora holo jeno single trailing segment match na khay.
                  // Jodi base route ekdom exact match hoy ba structure folder complete map thake tokhon e active hobe.
                  const isActive =
                    pathname === item.url ||
                    (item.url !== "/" &&
                      item.url !== "/provider-dashboard" &&
                      pathname.startsWith(`${item.url}/`));

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        /* 🎯 Changed light styles to multi-theme semantic responsive tokens */
                        className={
                          isActive
                            ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold hover:bg-orange-500/15 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors"
                        }
                      >
                        <Link href={item.url}>
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
