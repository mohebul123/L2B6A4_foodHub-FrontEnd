import type { ApiError } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error: ApiError = {
      message: `API Error: ${response.statusText}`,
      status: response.status,
    };
    try {
      const body = await response.json();
      error.message = body.message || error.message;
    } catch {
      // Use default error message
    }
    throw error;
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),

  post: <T>(endpoint: string, data: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data: unknown) =>
    request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, {
      method: "DELETE",
    }),
};

// Endpoint helpers
export const endpoints = {
  // Categories
  categories: "/categories",

  // Meals
  meals: "/meals",
  meal: (id: number | string) => `/meals/${id}`,
  mealReviews: (id: number | string) => `/meals/${id}/reviews`,

  // Providers
  providers: "/providers",
  provider: (id: number | string) => `/providers/${id}`,
  providerMeals: (id: number | string) => `/providers/${id}/meals`,

  // Auth (UI only for now)
  login: "/auth/login",
  register: "/auth/register",

  // Cart
  cart: "/cart",
  cartItem: (id: number | string) => `/cart/${id}`,

  // Orders
  orders: "/orders",
  order: (id: number | string) => `/orders/${id}`,
};
