"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAllmeals = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meals`, {
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
