import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ReactNode } from "react"
import { getUser } from "../service/auth"

export default async function DashboardLayout({adminslot,customerslot,providerslot}:{adminslot: ReactNode,customerslot: ReactNode,providerslot: ReactNode}) {
  const userInfo = await getUser();
  const userRole = {
    role: userInfo.role
  }
  return (
    <SidebarProvider>
      <AppSidebar user={userRole}/>
      <SidebarInset>
        {/* <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header> */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          
          {userRole.role === "ADMIN" &&  adminslot}
          {userRole.role === "CUSTOMER" &&  customerslot}
          {userRole.role === "PROVIDER" &&  providerslot}
          
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
