/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

const getToken = async () => {
  const storeCookies = await cookies();
  return storeCookies.get("token")?.value;
};

export const createReview = async (reviewData: any) => {
  try {
    const token = await getToken();

    const res = await fetch(`${env.BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
      body: JSON.stringify(reviewData),
      cache: "no-store",
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("REVIEW_ERROR:", error);
    return {
      success: false,
      message: "Something went wrong while posting your review.",
    };
  }
};
