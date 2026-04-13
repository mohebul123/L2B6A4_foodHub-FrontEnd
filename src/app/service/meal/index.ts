"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAllmeals = async () => {
  try {
    const res = await fetch(`${env.BASE_URL}/meals`, {
      method: "GET",
      headers: {
        "Content-Pype": "application/json",
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const addMeal = async (mealData: any) => {
  try {
    const storeCookies = await cookies();
    const token = storeCookies.get("token")?.value;

    const res = await fetch(`${env.BASE_URL}/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
      body: JSON.stringify(mealData),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Meal addition failed" };
  }
};

export const getProviderOrders = async () => {
  try {
    const storeCookies = await cookies();
    const token = storeCookies.get("token")?.value;

    const res = await fetch(`${env.BASE_URL}/orders/provider-orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Meal addition failed" };
  }
};
