import { getAllmeals } from "@/app/service/meal";
import { MealList } from "@/components/modules/home/MealList";
import { MealSkeleton } from "@/components/ui/meal-skeleton";

export async function MealListServer() {
  const res = await getAllmeals();
  const meals =
    (Array.isArray(res?.data) ? res?.data : res?.data?.data)?.slice(0, 8) || [];

  if (meals.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed rounded-xl">
        <p className="text-muted-foreground font-medium">
          No active meals found today.
        </p>
      </div>
    );
  }

  return <MealList meals={meals} />;
}

export function MealListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {Array.from({ length: 4 }).map((_, idx) => (
        <MealSkeleton key={idx} />
      ))}
    </div>
  );
}
