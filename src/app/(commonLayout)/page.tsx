import { HeroSection } from "@/components/modules/home/hero";
import { MealList } from "@/components/modules/home/MealList";
import { getAllmeals } from "../service/meal";
// import { HowItWorks } from "@/components/modules/home/HowItWorks";
import { WhyChooseUs } from "@/components/modules/home/WhyChooseUs";
import { HowItWorks } from "@/components/modules/home/HowItWorks";

export default async function Home() {
  const res = await getAllmeals();
  const meals = res?.data?.slice(0, 4) || []; 

  return (
    <div className="flex flex-col gap-20 pb-20 ">
      {/* Full Width Hero */}
      <HeroSection /> 
      
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        {/* Featured Meals Section */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Popular Meals</h2>
              <p className="text-muted-foreground mt-2">Explore the most ordered dishes this week.</p>
            </div>
          </div>
          <MealList meals={meals} />
        </section>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Why Choose Us Section */}
        <WhyChooseUs />
      </div>
    </div>
  );
}