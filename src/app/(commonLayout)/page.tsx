/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
"use client"
import { useEffect, useState } from "react"
import { HeroSection } from "@/components/modules/home/hero"
import { MealCard } from "@/components/modules/home/MealCard"
import { getAllmeals } from "../service/meal"
import { toast } from "sonner"

export default function Home() {
  const [meals, setMeals] = useState<any[]>([])

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await getAllmeals()
      setMeals(res.data)
    }
    fetchMeals()
  }, [])

  const handleAddToCart = (meal: any) => {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // logic: Jodi cart-e agey theke onyo provider-er meal thake
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
      providerId: meal.providerId, // Backend-er single-provider check-er jonno eita dorkar
      quantity: 1 
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  toast.success(`${meal.title} added to cart!`);
};

 return (
  <div className="max-w-6xl mx-auto px-6 py-10">
    <HeroSection />
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
      {meals?.slice(0, 4).map((meal) => (
        <MealCard 
          key={meal.id} 
          meal={meal} 
          // EIKHANE function-ta pass korte hobe
          handleAddToCart={() => handleAddToCart(meal)} 
        />
      ))}
    </div>
  </div>
);
}