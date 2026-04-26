"use client";

import Link from "next/link";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      {/* Animated Success Icon */}
      <div className="mb-6 animate-bounce">
        <CheckCircle2 className="w-20 h-20 text-green-500" />
      </div>

      {/* Success Message */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
        Payment Successful!
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        Your order is placed successfully. we are about to preparing your
        delicious food ...
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Link
          href="/customer-dashboard/"
          className="flex items-center justify-center gap-2 flex-1 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition"
        >
          <ShoppingBag className="w-5 h-5" />
          Track Order
        </Link>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 flex-1 bg-gray-100 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-200 transition border border-gray-200"
        >
          Back to Home
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Order Info Note */}
      <p className="mt-10 text-sm text-gray-400">
        If there have any trouble you facing , Please contact us immediately...
      </p>
    </div>
  );
}
