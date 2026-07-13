"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

/* eslint-disable @typescript-eslint/no-explicit-any */

const getToken = async () => {
  const storeCookies = await cookies();
  return storeCookies.get("token")?.value;
};

// Gladiator Rule: Dynamic backend-ready query arguments passage
export const getAllmeals = async (queries?: {
  search?: string;
  category?: string;
  sort?: string;
  page?: number; // 🎯 Added page type definition
  limit?: number; // 🎯 Added limit type definition
}) => {
  try {
    const params = new URLSearchParams();
    if (queries?.search) params.append("search", queries.search);
    if (queries?.category) params.append("category", queries.category);
    if (queries?.sort) params.append("sort", queries.sort);
    if (queries?.page) params.append("page", String(queries.page)); // 🎯 Appending current page token
    if (queries?.limit) params.append("limit", String(queries.limit)); // 🎯 Appending limit value

    const url = `${env.BASE_URL}/meals?${params.toString()}`;

    const res = await fetch(url, {
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
