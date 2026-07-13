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

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const saveCart = (updatedCart: any[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

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
      <div className="p-20 text-center font-bold space-y-4 text-foreground bg-background">
        <p className="text-2xl text-foreground">Cart is empty! 🛒</p>
        <button
          onClick={() => router.push("/")}
          className="text-orange-600 dark:text-orange-500 hover:underline transition"
        >
          Continue Shopping
        </button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 space-y-8 text-foreground bg-background transition-colors duration-300">
      <h1 className="text-3xl font-bold text-foreground">Checkout</h1>

      <div className="border border-border rounded-xl p-6 space-y-4 bg-muted/40 shadow-sm">
        <h2 className="text-xl font-semibold border-b border-border pb-2 text-foreground">
          Order Items
        </h2>
        {cart.map((item) => (
          <div
            key={item.mealId}
            className="flex justify-between items-center bg-card p-4 rounded-lg shadow-sm border border-border/50"
          >
            <div className="space-y-1">
              <p className="font-bold text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">
                ৳{item.price} per item
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Quantity Controls Wrapper */}
              <div className="flex items-center border border-input rounded-lg bg-background overflow-hidden">
                <button
                  onClick={() => updateQuantity(item.mealId, -1)}
                  className="p-2 text-muted-foreground hover:bg-muted transition-all"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 font-semibold text-foreground">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.mealId, 1)}
                  className="p-2 text-muted-foreground hover:bg-muted transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={() => removeItem(item.mealId)}
                className="text-red-500 dark:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-all"
              >
                <Trash2 size={20} />
              </button>

              <span className="font-bold w-20 text-right text-foreground">
                ৳{item.price * item.quantity}
              </span>
            </div>
          </div>
        ))}
        <div className="text-2xl font-bold pt-4 text-right text-foreground">
          Total:{" "}
          <span className="text-orange-600 dark:text-orange-500">৳{total}</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-semibold text-lg text-foreground">
          Delivery Address
        </label>
        <textarea
          className="w-full border border-input p-3 rounded-xl bg-background text-foreground focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
          rows={3}
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="House #, Road #, City..."
        />
      </div>

      <div className="space-y-3">
        <label className="font-semibold text-lg text-foreground">
          Payment Method
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setPaymentMethod("ONLINE")}
            className={`flex-1 border p-4 rounded-xl font-medium transition-all duration-200 ${
              paymentMethod === "ONLINE"
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-foreground border-input hover:bg-muted"
            }`}
          >
            Online Payment
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod("COD")}
            className={`flex-1 border p-4 rounded-xl font-medium transition-all duration-200 ${
              paymentMethod === "COD"
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-foreground border-input hover:bg-muted"
            }`}
          >
            Cash on Delivery
          </button>
        </div>
      </div>

      <button
        disabled={loading}
        onClick={handleCheckout}
        className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 disabled:bg-muted disabled:text-muted-foreground transition shadow-md"
      >
        {loading ? "Processing..." : `Place Order (৳${total})`}
      </button>
    </div>
  );
}
