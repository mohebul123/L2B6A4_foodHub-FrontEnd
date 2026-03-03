/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
"use client"
import { useEffect, useState } from "react"
import { HeroSection } from "@/components/modules/home/hero"
import { MealCard } from "@/components/modules/home/MealCard"
import { getAllmeals } from "../service/meal"

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
    let cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existing = cart.find((item: any) => item.mealId === meal.id)
    if (existing) existing.quantity += 1
    else cart.push({ mealId: meal.id, title: meal.title, price: meal.price, quantity: 1 })
    localStorage.setItem("cart", JSON.stringify(cart))
    alert(`${meal.title} added to cart!`)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <HeroSection />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
        {meals.slice(0,4).map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  )
}