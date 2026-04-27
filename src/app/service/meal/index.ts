"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

/* eslint-disable @typescript-eslint/no-explicit-any */

const getToken = async () => {
  const storeCookies = await cookies();
  return storeCookies.get("token")?.value;
};

export const getAllmeals = async () => {
  try {
    const res = await fetch(`${env.BASE_URL}/meals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: "Failed to fetch meals" };
  }
};

export const addMeal = async (mealData: any) => {
  try {
    const token = await getToken();

    const res = await fetch(`${env.BASE_URL}/providers/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
      body: JSON.stringify(mealData),
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.log("test", `${env.BASE_URL}/meals/`);
    console.log(error);
    return { success: false, message: "Meal addition failed" };
  }
};

export const getProviderOrders = async () => {
  try {
    const token = await getToken();

    const res = await fetch(`${env.BASE_URL}/orders/provider-orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Failed to fetch provider orders" };
  }
};
