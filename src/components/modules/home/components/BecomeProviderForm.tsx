/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Store, MapPin, Phone, FileText } from "lucide-react";
import { becomeProvider } from "@/app/service/providers";

export default function BecomeProviderForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      restaurantName: formData.get("restaurantName"),
      description: formData.get("description"),
      address: formData.get("address"),
      phone: formData.get("phone"),
    };

    try {
      const result = await becomeProvider(payload);

      if (result?.success) {
        toast.success("Profile created! Redirecting to login...");

        // 1. Clear Cookies (Sabdhan: Tomar cookie name 'accessToken' ba 'token' hote pare)
        // Client-side e cookie delete korar procheshtha
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // 2. Clear LocalStorage (Just in case)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("token");

        // 3. Instant Hard Redirect (window.location use kora eikhane best)
        // router.push er cheye window.location.href beshi powerful refresh er jonno
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        toast.error(result?.message || "Failed to become a provider");
      }
    } catch (error: any) {
      console.error("FORM_SUBMIT_ERROR:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white shadow-xl rounded-2xl border border-slate-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800">
          Become a Provider 🍱
        </h1>
        <p className="text-slate-500 mt-2">
          Fill in your kitchen details to start selling
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Restaurant Name */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Store size={18} className="text-orange-500" /> Restaurant Name
          </label>
          <input
            name="restaurantName"
            required
            placeholder="e.g. Kacchi Bari"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <FileText size={18} className="text-orange-500" /> Description
          </label>
          <textarea
            name="description"
            rows={3}
            placeholder="Tell us about your delicious food..."
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Address */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <MapPin size={18} className="text-orange-500" /> Address
            </label>
            <input
              name="address"
              required
              placeholder="Mirpur-2, Dhaka"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Phone size={18} className="text-orange-500" /> Phone
            </label>
            <input
              name="phone"
              required
              placeholder="01XXXXXXXXX"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all transform active:scale-[0.98] disabled:bg-slate-400"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              Launching Kitchen...
            </span>
          ) : (
            "Launch My Store 🚀"
          )}
        </button>
      </form>
    </div>
  );
}
