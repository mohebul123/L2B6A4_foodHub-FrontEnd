import { HeroSection } from "@/components/modules/home/hero";
import { MealList } from "@/components/modules/home/MealList";
import { getAllmeals } from "../service/meal";

export default async function Home() {
  // Server-side fetch: page load hoar agei data ready thakbe
  const res = await getAllmeals();
  const meals = res?.data || [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Server Component (Async/Await allowed) */}
      <HeroSection /> 
      
      {/* Client Component (Cart Logic allowed) */}
      <MealList meals={meals} />
    </div>
  );
}