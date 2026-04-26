"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import { cookies } from "next/headers";

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

export const getOwnProviderProfile = async () => {
  try {
    const token = await getToken();

    if (!token) {
      return {
        success: false,
        message: "Unauthorized access! Please login.",
      };
    }

    const res = await fetch(`${env.BASE_URL}/providers/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    console.error("GET_PROVIDER_PROFILE_ERROR:", error);
    return {
      success: false,
      message: "Failed to fetch provider profile. Please try again.",
    };
  }
};

export const updateProviderProfile = async (updateData: any) => {
  try {
    const token = await getToken();
    const res = await fetch(`${env.BASE_URL}/providers/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    console.error("UPDATE_PROVIDER_ERROR:", error);
    return { success: false, message: "Failed to update profile" };
  }
};
