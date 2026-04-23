"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

/* eslint-disable @typescript-eslint/no-explicit-any */

//  headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token!}`,
//     },
//     body: JSON.stringify(mealData),

// 1. Get All Users (Admin Only)
export const getAllUsers = async () => {
  try {
    const storeCookies = await cookies();
    const token = storeCookies.get("token")?.value;
    const res = await fetch(`${env.BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Admin data access korar jonno token pathano lagte pare
        authorization: `Bearer ${token!}`,
      },
      next: { revalidate: 0 }, // Jeno cache theke puran data na dekhay
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return new Error(error);
  }
};

// 2. Get All Categories
export const getAllCategories = async () => {
  try {
    const storeCookies = await cookies();
    const token = storeCookies.get("token")?.value;
    const res = await fetch(`${env.BASE_URL}/category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
    });
    const result = await res.json();
    console.log("cata", result);
    return result;
  } catch (error: any) {
    return new Error(error);
  }
};

export const createCategory = async (categoryData: { name: string }) => {
  try {
    const storeCookies = await cookies();
    const token = storeCookies.get("token")?.value;

    const res = await fetch(`${env.BASE_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
      body: JSON.stringify(categoryData),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: "Failed to create category" };
  }
};

// Delete Category
// src/app/service/admin.ts
export const deleteCategory = async (id: string) => {
  try {
    const storeCookies = await cookies();
    const token = storeCookies.get("token")?.value;

    const res = await fetch(`${env.BASE_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token!}`,
      },
      cache: "no-store",
    });

    // API result ta return koro, error holeo
    return await res.json();
  } catch (error: any) {
    return { success: false, message: "Network error occurred" };
  }
};

// 3. Get All Orders (Admin Only)
export const getAllOrders = async () => {
  try {
    const storeCookies = await cookies();
    const token = storeCookies.get("token")?.value;
    const res = await fetch(`${env.BASE_URL}/orders/allOrders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
      next: { revalidate: 0 },
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return new Error(error);
  }
};

// 4. Update User Status (Suspend/Activate)
export const updateUserStatus = async (formData: FormData) => {
  const userId = formData.get("userId");
  const status = formData.get("status");

  try {
    const storeCookies = await cookies();
    const token = storeCookies.get("token")?.value;
    const res = await fetch(`${env.BASE_URL}/users/${userId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")?.value || "",
      },
      body: JSON.stringify({ status }),
    });

    const result = await res.json();
    // Jodi server action hishebe use koro, tahole revalidatePath('/') call kora bhalo
    return result;
  } catch (error: any) {
    return new Error(error);
  }
};
