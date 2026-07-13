import { ShieldCheck, Clock, ChefHat } from "lucide-react";
import Image from "next/image"; // Next.js Image import korun

export function WhyChooseUs() {
  const features = [
    {
      icon: <ChefHat className="h-6 w-6 text-primary" />,
      title: "Expert Chefs",
      desc: "Home cooks with a passion for flavor.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Quality Assured",
      desc: "We ensure every meal meets food safety standards.",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "On-Time Delivery",
      desc: "Your food arrives hot and when you expect it.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl font-bold mb-6">Why Choose Our Marketplace?</h2>
        <p className="text-muted-foreground mb-8 text-lg">
          We bridge the gap between talented home chefs and food lovers,
          ensuring authentic taste and local support.
        </p>

        <div className="space-y-8">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                {f.icon}
              </div>
              <div>
                <h4 className="font-semibold text-xl">{f.title}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-[500px] w-full overflow-hidden rounded-3xl shadow-2xl">
        <Image
          src="/premium.png"
          alt="Fresh and healthy food"
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </section>
  );
}
