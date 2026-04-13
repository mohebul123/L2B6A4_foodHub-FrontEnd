"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Ba tomar priyo toast library
import { Store, MapPin, Phone, FileText } from "lucide-react";

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

    // Backend-e data pathano
    const res = await fetch("/api/providers/become-provider", { // Tomar Route onujayi
        method: "POST",
        body: JSON.stringify(payload)
    });
    
    const result = await res.json();

    if (result.success) {
      toast.success("Profile created! Please login again to sync your new role.");
      router.push("/login"); // Role change hoile login kora best jate token update hoy
    } else {
      toast.error(result.message || "Failed to become a provider");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white shadow-xl rounded-2xl border border-slate-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800">Become a Provider 🍱</h1>
        <p className="text-slate-500 mt-2">Fill in your kitchen details to start selling</p>
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
            placeholder="e.g. Babys Out"
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
              placeholder="02222222222"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all transform active:scale-[0.98] disabled:bg-slate-400"
        >
          {loading ? "Registering Your Kitchen..." : "Launch My Store 🚀"}
        </button>
      </form>
    </div>
  );
}