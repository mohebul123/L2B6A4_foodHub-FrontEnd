/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Utensils,
  Users,
  ShoppingBag,
  Star,
  HelpCircle,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { HeroSection } from "@/components/modules/home/hero";
import {
  MealListServer,
  MealListSkeleton,
} from "@/components/modules/home/MealListServer";
import { WhyChooseUs } from "@/components/modules/home/WhyChooseUs";
import { HowItWorks } from "@/components/modules/home/HowItWorks";

import { getAllCategories } from "@/app/service/admin";

const SYSTEM_FAQS = [
  {
    q: "How are the kitchen standards verified?",
    a: "Every home chef or kitchen profile under registration undergoes a strict sanitation review and background audit by our platform quality assurance team before their menus become active.",
  },
  {
    q: "Can I order meals from multiple chefs simultaneously?",
    a: "To ensure direct, hot logistics deliveries without transit overlap bottlenecks, an individual order checkout invoice tracks a single store origin source at a time.",
  },
  {
    q: "How do I sign up as a food provider vendor?",
    a: "Register an account, navigate to your account dashboard settings panel, select the 'Join as Provider' option workspace, and submit your kitchen verification details for active approval.",
  },
];

const DELIVERY_LOCATIONS = [
  { name: "Mirpur", status: "Active", description: "Sec 1 to 14" },
  { name: "Uttara", status: "Active", description: "Sector 1 to 18" },
  { name: "Gulshan", status: "Active", description: "Circle 1 & 2" },
  { name: "Banani", status: "Active", description: "Core Area" },
  { name: "Dhanmondi", status: "Active", description: "All Blocks" },
  { name: "Badda", status: "Active", description: "Rampura link road" },
  {
    name: "Mohammadpur",
    status: "Active",
    description: "Town Hall & Asad Gate",
  },
  { name: "Khilgaon", status: "Active", description: "Taza Kitchen Hubs" },
];

export default async function Home() {
  const categoryResponse = await getAllCategories();

  const categories =
    categoryResponse?.data ||
    (Array.isArray(categoryResponse) ? categoryResponse : []);

  return (
    <div className="flex flex-col gap-20 pb-20">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-6 space-y-24 w-full">
        {categories && categories.length > 0 && (
          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Browse by Category
              </h2>
              <p className="text-muted-foreground mt-2">
                Explore meals tailored to your dietary goals and local cravings.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {categories.map((cat: any) => (
                <Link
                  key={cat._id || cat.id}
                  href={`/meals?category=${cat.slug || cat.name.toLowerCase()}`}
                  className="group border border-border bg-card p-5 rounded-2xl text-center hover:border-primary hover:shadow-sm transition-all"
                >
                  <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">
                    {cat.icon || "🍲"}
                  </span>
                  <h3 className="text-sm font-semibold tracking-tight text-foreground truncate">
                    {cat.name}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Popular Meals
              </h2>
              <p className="text-muted-foreground mt-2">
                Explore the most ordered dishes this week.
              </p>
            </div>
          </div>

          <Suspense fallback={<MealListSkeleton />}>
            <MealListServer />
          </Suspense>
        </section>

        <HowItWorks />

        <section className="space-y-8 border-y border-border/50 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2">
                <MapPin size={12} className="animate-bounce" /> Service Areas
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                We Deliver To Your Doorstep
              </h2>
              <p className="text-muted-foreground mt-1">
                Our active network of local home chefs delivers hot and fresh
                food to these primary zones.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {DELIVERY_LOCATIONS.map((loc, idx) => (
              <div
                key={idx}
                className="group relative border border-border/70 bg-card p-4 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 rounded-bl-full transition-all group-hover:bg-primary/10" />

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {loc.name}
                    </h3>

                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    {loc.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="font-medium tracking-wide uppercase text-primary/80">
                    Express Delivery
                  </span>
                  <span>30-45m</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <WhyChooseUs />

        <section className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2 mb-4">
            <h2 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
              <HelpCircle className="text-primary" /> Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Quick structural answers regarding food safety guidelines,
              platform rules, and delivery management mappings.
            </p>
          </div>
          <div className="space-y-3">
            {SYSTEM_FAQS.map((faq, i) => (
              <div
                key={i}
                className="border border-border/80 bg-card p-5 rounded-xl space-y-1"
              >
                <h3 className="text-sm font-bold text-foreground flex gap-2">
                  <span>❓</span> {faq.q}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
