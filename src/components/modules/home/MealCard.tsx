/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Meal {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string | null;
  isAvailable: boolean;
  provider?: { restaurantName: string };
  providerId: string;
}

interface MealCardProps {
  meal: Meal;
  handleAddToCart: () => void;
}

export function MealCard({ meal, handleAddToCart }: MealCardProps) {
  return (
    <Card className="group overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {meal.image ? (
          <Image
            src={meal.image}
            alt={meal.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No image
          </div>
        )}
        {!meal.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <Badge variant="secondary">Unavailable</Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-1 flex items-start justify-between">
          <h3 className="font-semibold line-clamp-1 transition-colors group-hover:text-primary">
            {meal.title}
          </h3>
          <span className="font-semibold text-primary">৳{meal.price}</span>
        </div>
        {meal.provider && (
          <p className="text-sm text-muted-foreground">
            {meal.provider.restaurantName}
          </p>
        )}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {meal.description}
        </p>

        <div className="mt-4 flex gap-2">
          <Button
            asChild
            className="flex-1 shadow-sm transition-transform duration-200 active:scale-95"
          >
            <Link href={`/meals/${meal.id}`}>See Details</Link>
          </Button>
          <Button
            variant="outline"
            className="flex-1 shadow-sm transition-transform duration-200 active:scale-95"
            disabled={!meal.isAvailable}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
