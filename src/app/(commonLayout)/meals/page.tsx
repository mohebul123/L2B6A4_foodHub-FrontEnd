/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
"use client";
import { useEffect, useState } from "react";

import { MealCard } from "@/components/modules/home/MealCard";
import { getAllmeals } from "@/app/service/meal";
import { toast } from "sonner";

export default function Home() {
  const [meals, setMeals] = useState<any[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await getAllmeals();
      setMeals(res.data);
    };
    fetchMeals();
  }, []);

  const handleAddToCartLogic = (meal: any) => {
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
      existing.quantity += 1;
    } else {
      cart.push({
        mealId: meal.id,
        title: meal.title,
        price: meal.price,
        providerId: meal.providerId,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${meal.title} added to cart!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
        {meals.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            handleAddToCart={() => handleAddToCartLogic(meal)}
          />
        ))}
      </div>
    </div>
  );
}
