/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { addMeal } from "@/app/service/meal";


export default function AddMealPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      // Data format backend onujayi check koro (price kintu number hote hobe)
      const mealData = {
        ...data,
        price: Number(data.price),
        isAvailable: true,
      };

      const res = await addMeal(mealData);
      if (res.success) {
        toast.success("Meal added successfully!");
        router.push("/provider-dashboard"); // Success hole list page-e niye jabe
        router.refresh(); // Data refresh korar jonno
      } else {
        toast.error(res.message || "Failed to add meal");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl border shadow-sm mt-10">
      <h2 className="text-2xl font-bold mb-6 text-orange-600">Add New Meal 🍲</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Meal Title</label>
          <input 
            {...register("title")} 
            className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-orange-500 outline-none" 
            placeholder="e.g. Special Beef Tehari"
            required 
          />
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea 
            {...register("description")} 
            className="w-full p-2 border rounded-md mt-1 h-32 outline-none focus:ring-2 focus:ring-orange-500" 
            placeholder="Tell us about the ingredients..."
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
          <div>
            <label className="text-sm font-medium">Category</label>
            <select {...register("category")} className="w-full p-2 border rounded-md mt-1 outline-none">
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="breakfast">Breakfast</option>
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