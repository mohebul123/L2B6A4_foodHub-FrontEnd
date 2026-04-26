/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { addMeal } from "@/app/service/meal";
import { getAllCategories } from "@/app/service/admin";
// import { getAllCategories } from "@/app/service/category"; // Import service

export default function AddMealPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();

  // Database theke categories load kora
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();
      if (res.success) {
        setCategories(res.data);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const mealData = {
        ...data,
        price: Number(data.price),
        isAvailable: true,
        image: data.image || undefined,
      };

      const res = await addMeal(mealData);
      if (res.success) {
        toast.success("Meal added successfully!");
        router.push("/provider-dashboard");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to add meal");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl border shadow-sm mt-10">
      <h2 className="text-2xl font-bold mb-6 text-orange-600">
        Post New Cuisine 🍲
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title & Description skipped for brevity, same as before */}
        <div>
          <label className="text-sm font-medium">Meal Title</label>
          <input
            {...register("title")}
            className="w-full p-2 border rounded-md mt-1 outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded-md mt-1 h-24 outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Image URL (Optional)</label>
          <input
            {...register("image")}
            className="w-full p-2 border rounded-md mt-1 outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Price (৳)</label>
            <input
              {...register("price")}
              type="number"
              className="w-full p-2 border rounded-md mt-1 outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Dynamic Cuisine Dropdown */}
          <div>
            <label className="text-sm font-medium">Cuisine Type</label>
            <select
              {...register("categoryId")}
              className="w-full p-2 border rounded-md mt-1 outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              required
            >
              <option value="">Select Cuisine</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}{" "}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
          >
            {isSubmitting ? "Posting..." : "Post Meal"}
          </Button>
        </div>
      </form>
    </div>
  );
}
