import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getUser } from "@/app/service/auth"

export async function HeroSection() {
  const user = await getUser();

  return (
    // Height fixed kora hoyeche (min-h-[80vh]) jate boro dekhay
    <section className="relative w-full min-h-[70vh] lg:min-h-[85vh] flex items-center overflow-hidden bg-foreground">
      
      {/* Background image container */}
      <div className="absolute inset-0">
        <Image
          src="/cover.png"
          alt="Hero Food"
          fill
          // object-cover image-ke resize hote dibe na
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/70 to-transparent" />
      </div>

      {/* Content Area - eita ekhon vertical center thakbe */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <span className="mb-6 inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary">
            Fresh meals, delivered fast
          </span>
          
          <h1 className="text-balance text-5xl font-extrabold leading-tight tracking-tight text-background sm:text-6xl lg:text-7xl">
            Discover & Order <br className="hidden md:block" /> Delicious Meals
          </h1>
          
          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-background/80">
            Browse menus from the best local food providers, order with ease,
            and enjoy restaurant-quality meals at your doorstep.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button size="lg" className="h-12 px-8 text-lg" asChild>
              <Link href="/meals">
                Browse Meals
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            {/* User Login Logic */}
            {user?.role === "CUSTOMER" && (
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 border-background/30 bg-white/10 px-8 text-lg text-background backdrop-blur-sm hover:bg-background hover:text-foreground" 
                asChild
              >
                <Link href="/customer-dashboard/becomeProvider">Become a Provider</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}