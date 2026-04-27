/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateMeal } from "@/app/service/providers";
// import { updateMeal } from "@/app/service/meal";

export default function EditMealModal({
  meal,
  onUpdate,
}: {
  meal: any;
  onUpdate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // State-e shobgulo optional field initialized thakbe
  const [formData, setFormData] = useState({
    title: meal?.title || "",
    description: meal?.description || "",
    price: meal?.price ? Number(meal.price) : "",
    image: meal?.image || "",
    isAvailable: meal?.isAvailable ?? true,
    categoryId: meal?.categoryId || "",
  });

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // Backend e pathanor age data-ke format kora
      const payload = {
        ...formData,
        price: formData.price ? Number(formData.price) : undefined,
      };

      const res = await updateMeal(meal.id || meal._id, payload);

      if (res.success) {
        toast.success("Meal updated successfully!");
        setOpen(false);
        onUpdate(); // UI refresh korar jonno
      } else {
        toast.error(res.message || "Failed to update");
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-orange-500 text-orange-600 hover:bg-orange-50"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Meal Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="title">Meal Name</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Price */}
          <div className="grid gap-2">
            <Label htmlFor="price">Price (৳)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          {/* Availability Status */}
          <div className="grid gap-2">
            <Label>Availability</Label>
            <Select
              value={formData.isAvailable ? "true" : "false"}
              onValueChange={(val) =>
                setFormData({ ...formData, isAvailable: val === "true" })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">✅ Available</SelectItem>
                <SelectItem value="false">❌ Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image URL (Optional) */}
          <div className="grid gap-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </div>
        </div>

        <Button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700"
        >
          {loading ? "Updating..." : "Save Changes"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
