import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { getUser } from "../service/auth";

export default async function DashboardLayout({
  adminslot,
  customerslot,
  providerslot,
}: {
  adminslot: ReactNode;
  customerslot: ReactNode;
  providerslot: ReactNode;
}) {
  const userInfo = await getUser();
  const userRole = {
    role: userInfo.role,
  };
  return (
    <SidebarProvider>
      <AppSidebar user={userRole} />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userRole.role === "ADMIN" && adminslot}
          {userRole.role === "CUSTOMER" && customerslot}
          {userRole.role === "PROVIDER" && providerslot}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
