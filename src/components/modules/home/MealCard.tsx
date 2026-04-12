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
  providerId: string // Eita must thakte hobe validation er jonno
}

interface MealCardProps {
  meal: Meal;
  handleAddToCart: () => void; // Prop-ta ekhane add korlam
}

export function MealCard({ meal, handleAddToCart }: MealCardProps) {
  // Purano local function-ta bad diye prop use korbo
  
  return (
    <Card className="overflow-hidden border-border/60 transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {meal.image ? (
          <Image src={meal.image} alt={meal.title} fill className="object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">No image</div>
        )}
        {!meal.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Badge variant="secondary">Unavailable</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-1 flex items-start justify-between">
          <h3 className="font-semibold line-clamp-1">{meal.title}</h3>
          <span className="font-semibold text-primary">৳{meal.price}</span>
        </div>
        {meal.provider && (
          <p className="text-sm text-muted-foreground">{meal.provider.restaurantName}</p>
        )}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{meal.description}</p>

        <div className="mt-4 flex gap-2">
          <Button asChild className="flex-1">
            <Link href={`/meals/${meal.id}`}>See Details</Link>
          </Button>
          <Button 
            variant="outline" 
            className="flex-1" 
            disabled={!meal.isAvailable} 
            onClick={handleAddToCart} // Home theke asha logic ekhane trigger hobe
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}