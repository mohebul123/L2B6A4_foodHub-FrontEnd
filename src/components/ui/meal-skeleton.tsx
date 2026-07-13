import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function MealSkeleton() {
  return (
    <Card className="w-full h-full rounded-xl overflow-hidden border bg-card animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-video w-full bg-muted" />

      <CardHeader className="p-4 space-y-2">
        {/* Title Skeleton */}
        <div className="h-5 bg-muted rounded-md w-3/4" />
        {/* Category Badge Skeleton */}
        <div className="h-4 bg-muted rounded-md w-1/4" />
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-4">
        {/* Description Skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded-md w-full" />
          <div className="h-3 bg-muted rounded-md w-5/6" />
        </div>

        {/* Price & Action Button Skeleton */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-muted rounded-md w-16" />
          <div className="h-9 bg-muted rounded-xl w-24" />
        </div>
      </CardContent>
    </Card>
  );
}
