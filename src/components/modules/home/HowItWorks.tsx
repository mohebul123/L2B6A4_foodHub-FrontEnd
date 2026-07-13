import { Search, ShoppingBag, Truck } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-orange-600 dark:text-orange-500" />,
      title: "Choose Meal",
      desc: "Select from a variety of home-made dishes.",
    },
    {
      icon: (
        <ShoppingBag className="w-8 h-8 text-orange-600 dark:text-orange-500" />
      ),
      title: "Order Online",
      desc: "Easy checkout with secure payment.",
    },
    {
      icon: <Truck className="w-8 h-8 text-orange-600 dark:text-orange-500" />,
      title: "Fast Delivery",
      desc: "Fresh food delivered straight to your door.",
    },
  ];

  return (
    <section className="bg-muted/50 py-16 rounded-3xl px-10 text-foreground transition-colors duration-300">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="bg-card p-4 rounded-full shadow-sm border border-border">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-sm max-w-[200px]">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
