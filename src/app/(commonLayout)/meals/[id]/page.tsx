/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { env } from "@/env";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  Store,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function MealDetailsPage() {
  const { id } = useParams();
  const [meal, setMeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    const fetchMeal = async () => {
      try {
        const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/meals/${id}`);
        const data = await res.json();
        setMeal(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  const handleAddToCartLogic = () => {
    if (!meal) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (
      cart.length > 0 &&
      String(cart[0].providerId) !== String(meal.providerId)
    ) {
      toast.error(
        "You can only order from one provider at a time! Clear your cart first.",
      );
      return;
    }
    const existing = cart.find((item: any) => item.mealId === meal.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        mealId: meal.id,
        title: meal.title,
        price: meal.price,
        providerId: meal.providerId,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${meal.title} added to cart!`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="p-10 text-center text-muted-foreground bg-background">
        Meal not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group mb-8"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="relative w-full h-[400px] bg-muted border border-border rounded-2xl overflow-hidden shadow-xl shadow-black/10">
            {meal.image ? (
              <>
                <Image
                  src={meal.image}
                  alt={meal.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
                <span className="text-4xl">🍲</span>
                <p className="text-sm">No Image Available</p>
              </div>
            )}
          </div>

          <div className="flex flex-col h-full justify-between space-y-6">
            <div className="space-y-4">
              <div>
                {meal.isAvailable ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 rounded-full text-xs font-semibold">
                    <CheckCircle2 size={12} /> Available Now
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-destructive/10 text-destructive rounded-full text-xs font-semibold">
                    <XCircle size={12} /> Out of Stock
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                {meal.title}
              </h1>

              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 p-3 rounded-xl border border-border/60">
                <Store size={16} className="text-primary" />
                <span>Chef Hub:</span>
                <span className="font-semibold text-foreground">
                  {meal.provider?.restaurantName || "Local Home Chef"}
                </span>
              </div>

              <div className="text-3xl font-bold text-emerald-500 dark:text-emerald-400 tracking-tight">
                ৳ {meal.price}
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Description
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {meal.description ||
                    "No specific details provided by the kitchen host for this preparation."}
                </p>
              </div>
            </div>

            <div className="border-t border-border/80 pt-6 mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Select Quantity
                </span>

                <div className="flex items-center gap-1 bg-muted p-1 rounded-xl border border-border/80">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!meal.isAvailable}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-background rounded-lg transition-all disabled:opacity-50"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold w-10 text-center select-none text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!meal.isAvailable}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-background rounded-lg transition-all disabled:opacity-50"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCartLogic}
                disabled={!meal.isAvailable}
                className={`w-full py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                  meal.isAvailable
                    ? "bg-foreground text-background hover:bg-foreground/90 shadow-lg shadow-foreground/5 active:scale-[0.99]"
                    : "bg-muted text-muted-foreground cursor-not-allowed border border-border"
                }`}
              >
                <ShoppingCart size={18} />
                {meal.isAvailable
                  ? `Add to Cart • ৳ ${meal.price * quantity}`
                  : "Currently Unavailable"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
