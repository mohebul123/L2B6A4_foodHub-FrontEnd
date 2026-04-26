"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { env } from "@/env";
import { cookies } from "next/headers";

const getToken = async () => {
  const storeCookies = await cookies();
  return storeCookies.get("token")?.value;
};

export const createOrder = async (orderData: any) => {
  try {
    const token = await getToken();
    const res = await fetch(`${env.BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
      body: JSON.stringify(orderData),
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    console.log("ORDER ERROR:", error);
    return {
      success: false,
      message: "Something went wrong while creating the order",
    };
  }
};

export const getMyOrders = async () => {
  try {
    const token = await getToken();
    const res = await fetch(`${env.BASE_URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    console.log("FETCH ORDERS ERROR:", error);
    return { success: false, data: [], message: "Failed to fetch orders" };
  }
};

export const updateOrderstatus = async (orderId: any, orderStatusData: any) => {
  try {
    const token = await getToken();
    const res = await fetch(
      `${env.BASE_URL}/providers/orders/${orderId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token!}`,
        },
        body: JSON.stringify(orderStatusData),
        cache: "no-store",
      },
    );

    return await res.json();
  } catch (error) {
    console.log("UPDATE ORDER STATUS ERROR:", error);
    return {
      success: false,
      message: "Something went wrong while updating status",
    };
  }
};
