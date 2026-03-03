// TypeScript interfaces matching the FoodHub database schema

export interface User {
  id: number
  name: string
  email: string
  role: "customer" | "provider" | "admin"
  phone?: string
  address?: string
  avatar_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Provider {
  id: number
  user_id: number
  business_name: string
  description?: string
  logo_url?: string
  cover_image_url?: string
  cuisine_type?: string
  address?: string
  phone?: string
  is_verified: boolean
  rating: number
  total_reviews: number
  created_at: string
  updated_at: string
  user?: User
}

export interface Category {
  id: number
  name: string
  description?: string
  image_url?: string
  created_at: string
}

export interface Meal {
  id: number
  provider_id: number
  category_id: number
  name: string
  description?: string
  price: number
  image_url?: string
  is_available: boolean
  is_featured: boolean
  dietary_info?: string[]
  cuisine_type?: string
  preparation_time?: number
  rating: number
  total_reviews: number
  created_at: string
  updated_at: string
  provider?: Provider
  category?: Category
}

export interface Review {
  id: number
  user_id: number
  meal_id: number
  order_id: number
  rating: number
  comment?: string
  created_at: string
  updated_at: string
  user?: User
}

export interface CartItem {
  id: number
  user_id: number
  meal_id: number
  quantity: number
  created_at: string
  meal?: Meal
}

export interface Order {
  id: number
  user_id: number
  provider_id: number
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
  total_amount: number
  delivery_address: string
  delivery_phone: string
  notes?: string
  created_at: string
  updated_at: string
  user?: User
  provider?: Provider
  items?: OrderItem[]
}

export interface OrderItem {
  id: number
  order_id: number
  meal_id: number
  quantity: number
  unit_price: number
  total_price: number
  meal?: Meal
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  message: string
  status: number
}
