/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

export const updateCustomerProfile = async (updateData: any) => {
  try {
    const storeCookies = await cookies();
    const token = storeCookies.get("token")?.value;

    const res = await fetch(`${env.BASE_URL}/users/update-profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    console.error("UPDATE_CUSTOMER_ERROR:", error);
    return { success: false, message: "Failed to update profile" };
  }
};
