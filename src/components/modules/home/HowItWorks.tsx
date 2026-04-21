import { Search, ShoppingBag, Truck } from "lucide-react";

export function HowItWorks() {
  const steps = [
    { icon: <Search className="w-8 h-8 text-primary" />, title: "Choose Meal", desc: "Select from a variety of home-made dishes." },
    { icon: <ShoppingBag className="w-8 h-8 text-primary" />, title: "Order Online", desc: "Easy checkout with secure payment." },
    { icon: <Truck className="w-8 h-8 text-primary" />, title: "Fast Delivery", desc: "Fresh food delivered straight to your door." },
  ];

  return (
    <section className="bg-slate-50 py-16 rounded-3xl px-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">How It Works</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center space-y-4">
            <div className="bg-white p-4 rounded-full shadow-sm border border-slate-100">{step.icon}</div>
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-muted-foreground text-sm max-w-[200px]">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}