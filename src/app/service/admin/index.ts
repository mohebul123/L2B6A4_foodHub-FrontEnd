"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

/* eslint-disable @typescript-eslint/no-explicit-any */

const getToken = async () => {
  const storeCookies = await cookies();
  return storeCookies.get("token")?.value;
};

export const getAllUsers = async () => {
  try {
    const token = await getToken();
    const res = await fetch(`${env.BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    return { success: false, message: "Failed to fetch users" };
  }
};

export const getAllCategories = async () => {
  try {
    const token = await getToken();
    const res = await fetch(`${env.BASE_URL}/category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
      cache: "no-store",
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: "Failed to fetch categories" };
  }
};

export const createCategory = async (categoryData: { name: string }) => {
  try {
    const token = await getToken();
    const res = await fetch(`${env.BASE_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
      body: JSON.stringify(categoryData),
      cache: "no-store",
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: "Failed to create category" };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const token = await getToken();
    const res = await fetch(`${env.BASE_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token!}`,
      },
      cache: "no-store",
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: "Failed to delete category" };
  }
};

export const getAllOrders = async () => {
  try {
    const token = await getToken();
    const res = await fetch(`${env.BASE_URL}/orders/allOrders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
      cache: "no-store",
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: "Failed to fetch orders" };
  }
};

export const updateUserStatus = async (
  userId: string,
  currentStatus: string,
) => {
  try {
    const token = await getToken();
    const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";

    const res = await fetch(`${env.BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
      body: JSON.stringify({ status: newStatus }),
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    return { success: false, message: "Failed to update user status" };
  }
};

export const getAdminStatistics = async () => {
  const token = (await cookies()).get("token")?.value;
  const res = await fetch(`${env.BASE_URL}/admin/statistics`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return await res.json();
};
