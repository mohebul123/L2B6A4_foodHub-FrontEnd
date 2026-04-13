/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { MealCard } from "./MealCard"
import { toast } from "sonner"

export function MealList({ meals }: { meals: any[] }) {
  const handleAddToCart = (meal: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const differentProvider = cart.find((item: any) => item.providerId !== meal.providerId);

    if (differentProvider) {
      toast.error("You can only order from one restaurant at a time. Please clear your cart first!");
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
        quantity: 1 
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${meal.title} added to cart!`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
      {meals?.slice(0, 4).map((meal: any) => (
        <MealCard 
          key={meal.id} 
          meal={meal} 
          handleAddToCart={() => handleAddToCart(meal)} 
        />
      ))}
    </div>
  );
}