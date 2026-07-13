"use client";

import Link from "next/link";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-foreground bg-background transition-colors duration-300">
      <div className="mb-6 animate-bounce">
        <CheckCircle2 className="w-20 h-20 text-green-500 dark:text-green-400" />
      </div>

      <h1 className="text-4xl font-extrabold text-foreground mb-2 text-center">
        Payment Successful!
      </h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-md">
        Your order is placed successfully. We are preparing your delicious
        food... 🍳
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Link
          href="/customer-dashboard/"
          className="flex items-center justify-center gap-2 flex-1 bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:opacity-90 shadow-md transition-all active:scale-[0.98]"
        >
          <ShoppingBag className="w-5 h-5" />
          Track Order
        </Link>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 flex-1 bg-muted text-foreground py-4 rounded-xl font-bold hover:bg-muted/80 transition-all border border-border active:scale-[0.98]"
        >
          Back to Home
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <p className="mt-10 text-sm text-muted-foreground/60 text-center">
        If you face any trouble, please contact us immediately.
      </p>
    </div>
  );
}
