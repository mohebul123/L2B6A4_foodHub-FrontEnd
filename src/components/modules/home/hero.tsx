import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getUser } from "@/app/service/auth"

// ⚠️ Note: File-er ekdom upore 'use client' thakle sheta remove kore dao
// Karon async component shudhu Server side-e kaj kore.

export async function HeroSection() {
  // Server-side theke user data fetch kora hochhe
  const user  = await getUser();

  return (
    <section className="relative overflow-hidden bg-foreground mx-auto">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-food.jpg"
          alt="Hero Food"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-center px-4 py-24 sm:py-32 lg:px-8 lg:py-40">
        <span className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary">
          Fresh meals, delivered fast
        </span>
        <h1 className="max-w-2xl text-balance text-4xl font-bold leading-tight tracking-tight text-background sm:text-5xl lg:text-6xl">
          Discover & Order Delicious Meals
        </h1>
        <p className="mt-4 max-w-lg text-pretty text-lg leading-relaxed text-background/70">
          Browse menus from the best local food providers, order with ease,
          and enjoy restaurant-quality meals at your doorstep.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" asChild>
            <Link href="/meals">
              Browse Meals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          {/* ✅ Fixed Logic: User login thakle ebong role CUSTOMER holei shudhu dekhabe */}
          {user?.role === "CUSTOMER" && (
            <Button 
              size="lg" 
              variant="outline" 
              className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background" 
              asChild
            >
              <Link href="/customer-dashboard/becomeProvider">Become a Provider</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}