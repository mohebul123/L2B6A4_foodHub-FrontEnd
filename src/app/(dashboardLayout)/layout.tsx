import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"; // 🚩 SidebarTrigger import koro
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
        <header className="flex h-16 items-center gap-4 border-b bg-white px-6 md:hidden">
          <SidebarTrigger className="-ml-2 bg-orange-50 text-orange-600 hover:bg-orange-100 hover:text-orange-700 border border-orange-200 rounded-lg shadow-sm transition-all" />

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-bold text-slate-800 tracking-tight">
              Dashboard
            </span>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userRole.role === "ADMIN" && adminslot}
          {userRole.role === "CUSTOMER" && customerslot}
          {userRole.role === "PROVIDER" && providerslot}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
