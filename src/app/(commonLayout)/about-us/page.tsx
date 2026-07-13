/* eslint-disable react/no-unescaped-entities */
import {
  UtensilsCrossed,
  ShieldCheck,
  Truck,
  Users,
  Target,
  Zap,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  const values = [
    {
      icon: (
        <Award className="w-10 h-10 text-orange-600 dark:text-orange-500" />
      ),
      title: "Quality First",
      description:
        "We partner with top-rated local kitchens to ensure every meal meets the highest standards.",
    },
    {
      icon: (
        <Truck className="w-10 h-10 text-orange-600 dark:text-orange-500" />
      ),
      title: "Fast Delivery",
      description:
        "Our dedicated delivery partners ensure your food reaches you fresh and piping hot.",
    },
    {
      icon: (
        <ShieldCheck className="w-10 h-10 text-orange-600 dark:text-orange-500" />
      ),
      title: "Safe & Secure",
      description:
        "Strict hygiene standards and secure payments for a worry-free experience.",
    },
    {
      icon: <Zap className="w-10 h-10 text-orange-600 dark:text-orange-500" />,
      title: "Easy to Use",
      description:
        "A seamless platform designed to make ordering food as simple as a few clicks.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <section className="bg-slate-950 dark:bg-zinc-950 text-slate-50 py-24 px-6 text-center border-b border-border/40">
        <div className="max-w-4xl mx-auto">
          <UtensilsCrossed className="w-16 h-16 text-orange-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
            The Story Behind FoodHub
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-slate-400">
            Bringing local flavors and hungry hearts together in a sustainable
            food ecosystem.
          </p>
        </div>
      </section>

      {/* 2. Mission Statement */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 sticky top-24">
            <Target className="w-12 h-12 text-orange-600 dark:text-orange-500 mb-4" />
            <h2 className="text-3xl font-bold text-foreground">
              Our Mission 🎯
            </h2>
            <p className="text-muted-foreground mt-2">
              Satisfying hunger, one meal at a time.
            </p>
          </div>

          <div className="md:col-span-8 space-y-6 text-muted-foreground leading-relaxed text-lg border-l-4 border-orange-500/20 pl-8">
            <p>
              At{" "}
              <span className="font-semibold text-orange-600 dark:text-orange-500">
                FoodHub
              </span>
              , we believe that access to great, fresh food is a fundamental
              right. Founded in 2024, our journey began with a single mission:
              to empower local food creators and make delicious, local meals
              accessible to everyone with a click.
            </p>
            <p>
              We bridge the gap between talented home-chefs, passionate small
              restaurants, and busy customers. By fostering a collaborative food
              community, we are building a more connected, sustainable, and
              satisfying food experience for everyone involved.
            </p>
            <p>
              From the very beginning, we’ve focused on leveraging technology to
              solve the logistical challenges of food delivery, ensuring that
              both providers and customers get the best possible value.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-24 px-6 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Our Core Values ❤️
            </h2>
            <p className="text-muted-foreground mt-3 text-lg max-w-xl mx-auto">
              What drives us forward every single day.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:border-orange-500/30 transition-all group"
              >
                {/* 🎯 Icon backdrop transformed with soft alpha opacity variant layer layout logic */}
                <div className="mb-6 p-4 bg-orange-500/10 inline-block rounded-full group-hover:bg-orange-500/15 transition-colors">
                  {v.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight text-foreground">
                  {v.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center max-w-7xl mx-auto border-b border-border">
        <div className="max-w-3xl mx-auto space-y-8">
          <Users className="w-16 h-16 text-orange-500 mx-auto" />
          <h2 className="text-4xl font-extrabold tracking-tighter text-foreground">
            Be Part of the FoodHub Journey
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Whether you're a food enthusiast or a local kitchen owner ready to
            expand your reach, FoodHub is here to welcome you. We believe in the
            power of local cuisine and the joy of a good meal. Join us in making
            local food extraordinary.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Link href="/meals" className="inline-block">
              <span className="bg-orange-600 text-white px-10 py-3.5 rounded-full font-bold hover:bg-orange-700 transition-colors shadow-md block cursor-pointer">
                Order Your First Meal
              </span>
            </Link>

            <Link
              href="/customer-dashboard/becomeProvider"
              className="inline-block"
            >
              <span className="border-2 border-orange-500 text-orange-600 dark:text-orange-400 px-10 py-3 rounded-full font-bold hover:bg-orange-500/10 transition-colors block cursor-pointer">
                Become A Provider
              </span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-background py-12 text-center text-muted-foreground text-sm border-t border-border/20">
        <p>Made with ❤️ for food lovers.</p>
        <p className="mt-2">© 2026 FoodHub. Registered Trademark.</p>
      </footer>
    </div>
  );
}
