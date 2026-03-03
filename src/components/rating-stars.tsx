import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingStarsProps {
  rating: number
  totalReviews?: number
  size?: "sm" | "md"
  showCount?: boolean
}

export function RatingStars({
  rating,
  totalReviews,
  size = "sm",
  showCount = true,
}: RatingStarsProps) {
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              iconSize,
              i < Math.round(rating)
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            )}
          />
        ))}
      </div>
      {showCount && totalReviews !== undefined && (
        <span className="text-xs text-muted-foreground">
          {`${rating.toFixed(1)} (${totalReviews})`}
        </span>
      )}
    </div>
  )
}
