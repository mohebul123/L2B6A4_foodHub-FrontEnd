/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Meal {
  id: string
  title: string
  description: string
  price: number
  image: string | null
  isAvailable: boolean
  provider?: { restaurantName: string }
}

interface MealCardProps {
  meal: Meal
}

export function MealCard({ meal }: MealCardProps) {
  const handleAddToLocalCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const exist = cart.find((item: any) => item.mealId === meal.id)
    if (exist) exist.quantity += 1
    else cart.push({ mealId: meal.id, title: meal.title, price: meal.price, quantity: 1 })
    localStorage.setItem("cart", JSON.stringify(cart))
    alert("Added to cart ✅")
  }

  return (
    <Card className="overflow-hidden border-border/60 transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {meal.image ? <Image src={meal.image} alt={meal.title} fill className="object-cover" /> : <div>No image</div>}
        {!meal.isAvailable && <div className="absolute inset-0 flex items-center justify-center bg-black/50"><Badge variant="secondary">Unavailable</Badge></div>}
      </div>
      <CardContent className="p-4">
        <div className="mb-1 flex items-start justify-between">
          <h3 className="font-semibold line-clamp-1">{meal.title}</h3>
          <span className="font-semibold text-primary">৳{meal.price}</span>
        </div>
        {meal.provider && <p className="text-sm text-muted-foreground">{meal.provider.restaurantName}</p>}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{meal.description}</p>

        <div className="mt-4 flex gap-2">
          <Button asChild className="flex-1"><Link href={`/meals/${meal.id}`}>See Details</Link></Button>
          <Button variant="outline" className="flex-1" disabled={!meal.isAvailable} onClick={handleAddToLocalCart}>Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  )
}