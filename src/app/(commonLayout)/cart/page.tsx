/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import Link from "next/link"
import { createOrder } from "@/app/service/order"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// Initialize from localStorage
const getInitialCart = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("cart") || "[]")
  }
  return []
}

export default function CartPage() {
  const router = useRouter()
  const [cart, setCart] = useState<any[]>(getInitialCart)
  const updateQuantity = (mealId: string, newQty: number) => {
    const updated = cart.map((item) =>
      item.mealId === mealId ? { ...item, quantity: newQty } : item
    )
    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
  }

  const removeItem = (mealId: string) => {
    const updated = cart.filter((item) => item.mealId !== mealId)
    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const handleCheckout = async () => {
    const deliveryAddress = "dhaka"
  const result = await createOrder({
    deliveryAddress,
    orderItems: cart
  });

  console.log("RESULT:", result);

  if (!result) {
    alert("No response from server");
    return;
  }

  if (result.success) {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    setCart([]);
  } else {
    alert(result.message || "Order failed");
  }
};

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center">
          Your cart is empty.{" "}
          <Link href="/" className="text-blue-500 hover:underline">
            Go shopping
          </Link>
        </p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.mealId}
              className="flex justify-between items-center border p-4 rounded"
            >
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p>Price: ৳{item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.mealId, Math.max(1, item.quantity - 1))
                  }
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.mealId, item.quantity + 1)
                  }
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.mealId)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <p className="text-xl font-semibold">Total: ৳{total}</p>
          <button
            onClick={handleCheckout}
            className="w-full py-3 bg-black text-white rounded-lg font-semibold"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  )
}