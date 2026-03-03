/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export const createOrder = async (orderData: any) => {
  try {
    const storeCookies = await cookies();
    const token = storeCookies.get("token")?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders`, {
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
