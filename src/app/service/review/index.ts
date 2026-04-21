/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { env } from "@/env";
import { cookies } from "next/headers";

export const createReview = async (reviewData: any) => {
  try {
    const storeCookies = await cookies();
    const token = storeCookies.get("token")?.value;

    const res = await fetch(`${env.BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token!}`,
      },
      body: JSON.stringify(reviewData),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.log("REVIEW ERROR:", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
