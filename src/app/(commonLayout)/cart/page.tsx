/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { createOrder } from "@/app/service/order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus, Minus, Trash2 } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">(
    "ONLINE",
  );
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  // Helper function to save cart to localStorage
  const saveCart = (updatedCart: any[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Item Quantity Barano (Add)
  const updateQuantity = (mealId: string, delta: number) => {
    const updatedCart = cart.map((item) => {
      if (item.mealId === mealId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    saveCart(updatedCart);
  };

  // ✅ Item Soraia Fela (Remove)
  const removeItem = (mealId: string) => {
    const updatedCart = cart.filter((item) => item.mealId !== mealId);
    saveCart(updatedCart);
    toast.success("Item removed from cart");
  };

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
        setCart([]);
        toast.success("Order placed successfully!");

        if (paymentMethod === "ONLINE" && result.data.paymentUrl) {
          window.location.href = result.data.paymentUrl;
        } else {
          router.push("/customer-dashboard");
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
    return (
      <div className="p-20 text-center font-bold space-y-4">
        <p className="text-2xl">Cart is empty!</p>
        <button
          onClick={() => router.push("/")}
          className="text-orange-600 underline"
        >
          Continue Shopping
        </button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 space-y-8">
      <h1 className="text-3xl font-bold">Checkout</h1>

      {/* Cart Summary */}
      <div className="border rounded-xl p-6 space-y-4 bg-gray-50">
        <h2 className="text-xl font-semibold border-b pb-2">Order Items</h2>
        {cart.map((item) => (
          <div
            key={item.mealId}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm"
          >
            <div className="space-y-1">
              <p className="font-bold">{item.title}</p>
              <p className="text-sm text-gray-500">৳{item.price} per item</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Quantity Controls */}
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => updateQuantity(item.mealId, -1)}
                  className="p-2 hover:bg-gray-100 transition"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.mealId, 1)}
                  className="p-2 hover:bg-gray-100 transition"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => removeItem(item.mealId)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
              >
                <Trash2 size={20} />
              </button>

              <span className="font-bold w-20 text-right">
                ৳{item.price * item.quantity}
              </span>
            </div>
          </div>
        ))}
        <div className="text-2xl font-bold pt-4 text-right">
          Total: ৳{total}
        </div>
      </div>

      {/* Delivery Address */}
      <div className="space-y-2">
        <label className="font-semibold text-lg">Delivery Address</label>
        <textarea
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
          rows={3}
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="House #, Road #, City..."
        />
      </div>

      {/* Payment Method */}
      <div className="space-y-3">
        <label className="font-semibold text-lg">Payment Method</label>
        <div className="flex gap-4">
          <button
            onClick={() => setPaymentMethod("ONLINE")}
            className={`flex-1 border p-4 rounded-xl font-medium transition ${paymentMethod === "ONLINE" ? "bg-black text-white border-black" : "bg-white text-black hover:bg-gray-50"}`}
          >
            Online Payment
          </button>
          <button
            onClick={() => setPaymentMethod("COD")}
            className={`flex-1 border p-4 rounded-xl font-medium transition ${paymentMethod === "COD" ? "bg-black text-white border-black" : "bg-white text-black hover:bg-gray-50"}`}
          >
            Cash on Delivery
          </button>
        </div>
      </div>

      <button
        disabled={loading}
        onClick={handleCheckout}
        className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 disabled:bg-gray-400 shadow-lg"
      >
        {loading ? "Processing..." : `Place Order (৳${total})`}
      </button>
    </div>
  );
}
