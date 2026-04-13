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

export const updateOrderstatus = async (orderId: any, orderStatusData: any) => {
  try {
    const storeCookies = await cookies();
    const token = storeCookies.get("token")?.value;
    const res = await fetch(
      `${env.BASE_URL}/providers/orders/${orderId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token!}`,
        },
        body: JSON.stringify(orderStatusData),
      },
    );
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
