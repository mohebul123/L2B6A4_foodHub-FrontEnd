/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Link from "next/link";
import { createOrder } from "@/app/service/order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>(() => {
    if (typeof window !== "undefined")
      return JSON.parse(localStorage.getItem("cart") || "[]");
    return [];
  });
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">(
    "ONLINE",
  );
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!deliveryAddress) return toast.error("Delivery address is required!");
    setLoading(true);

    try {
      const result = await createOrder({
        deliveryAddress,
        orderItems: cart,
        paymentMethod,
      });

      if (result?.success) {
        localStorage.removeItem("cart");
        toast.success("Order placed successfully!");

        if (paymentMethod === "ONLINE" && result.data.paymentUrl) {
          window.location.href = result.data.paymentUrl;
        } else {
          router.push("/dashboard/orders");
        }
      } else {
        toast.error(result.message || "Order creation failed");
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0)
    return <div className="p-20 text-center font-bold">Cart is empty!</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 space-y-8">
      <h1 className="text-3xl font-bold">Checkout</h1>

      {/* Cart Summary */}
      <div className="border rounded-lg p-4 space-y-2">
        {cart.map((item) => (
          <div key={item.mealId} className="flex justify-between border-b pb-2">
            <span>
              {item.title} (x{item.quantity})
            </span>
            <span className="font-semibold">৳{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="text-xl font-bold pt-2 text-right">Total: ৳{total}</div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label className="font-semibold">Delivery Address</label>
        <textarea
          className="w-full border p-3 rounded"
          rows={3}
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="House #, Road #, City..."
        />
      </div>

      {/* Payment Selection */}
      <div className="space-y-3">
        <label className="font-semibold">Payment Method</label>
        <div className="flex gap-4">
          <button
            onClick={() => setPaymentMethod("ONLINE")}
            className={`flex-1 border p-4 rounded-lg transition ${paymentMethod === "ONLINE" ? "bg-black text-white border-black" : "bg-white text-black"}`}
          >
            Online Payment
          </button>
          <button
            onClick={() => setPaymentMethod("COD")}
            className={`flex-1 border p-4 rounded-lg transition ${paymentMethod === "COD" ? "bg-black text-white border-black" : "bg-white text-black"}`}
          >
            Cash on Delivery
          </button>
        </div>
      </div>

      <button
        disabled={loading}
        onClick={handleCheckout}
        className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}
