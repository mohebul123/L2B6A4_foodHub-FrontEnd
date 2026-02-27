import { Navbar } from "@/components/shared/Navbar";
import React, { ReactNode } from "react";
import { getUser } from "../service/auth";
export default async function DashboardLayout({adminslot,customerslot,providerslot,children}: {adminslot : ReactNode,customerslot : ReactNode,providerslot : ReactNode,children: ReactNode}) {

  const user = await getUser();
  // console.log(user);

  return (
      <div>
        <Navbar/>
        <div className="">
          {user.role === "ADMIN" && adminslot}
          {user.role === "CUSTOMER" && customerslot}
          {user.role === "PROVIDER" && providerslot}
        </div>
      </div>
      
  );
}
