/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { env } from "@/env";
import { cookies } from "next/headers";

export const createOrder = async (orderData: any) => {
  try {
    const storeCookies = await cookies();
    const token = storeCookies.get("token")?.value;
    const res = await fetch(`${env.BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
      body: JSON.stringify(orderData),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log("ORDER ERROR:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

// services/index.ts-e add koro
export const getMyOrders = async () => {
  try {
    const storeCookies = await cookies();
    const token = storeCookies.get("token")?.value;

    const res = await fetch(`${env.BASE_URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
      cache: "no-store", // Data refresh thakar jonno
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log("FETCH ORDERS ERROR:", error);
    return { success: false, data: [] };
  }
};
