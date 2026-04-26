/* eslint-disable @typescript-eslint/no-explicit-any */
"use-server";
import { env } from "@/env";
import { cookies } from "next/headers";

// export const updateOrderstatus = async (orderId: any, orderStatusData: any) => {
//   try {
//     const storeCookies = await cookies();
//     const token = storeCookies.get("token")?.value;
//     const res = await fetch(
//       `${env.BASE_URL}/providers/orders/${orderId}/status`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${token!}`,
//         },
//         body: JSON.stringify(orderStatusData),
//       },
//     );

/* eslint-disable @typescript-eslint/no-explicit-any */

const getToken = async () => {
  const storeCookies = await cookies();
  return storeCookies.get("token")?.value;
};

export const becomeProvider = async (providerData: any) => {
  try {
    const token = await getToken();

    const res = await fetch(`${env.BASE_URL}/providers/become-provider`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
      body: JSON.stringify(providerData),
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    console.error("BECOME_PROVIDER_ERROR:", error);
    return {
      success: false,
      message: "Server connection failed. Please try again later.",
    };
  }
};
