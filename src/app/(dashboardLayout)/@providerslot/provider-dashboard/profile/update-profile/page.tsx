/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateProviderProfile } from "@/app/service/providers";
import { useRouter } from "next/navigation";

// Tomar deya schema onujayi
const updateProviderProfileSchema = z.object({
  restaurantName: z.string().optional(),
  description: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
});

type UpdateProfileValues = z.infer<typeof updateProviderProfileSchema>;

export default function UpdateProviderProfilePage({
  initialData,
}: {
  initialData?: any;
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProviderProfileSchema),
    defaultValues: {
      restaurantName: initialData?.restaurantName || "",
      description: initialData?.description || "",
      address: initialData?.address || "",
      phone: initialData?.phone || "",
    },
  });

  const onSubmit = async (data: UpdateProfileValues) => {
    try {
      const res = await updateProviderProfile(data);
      if (res.success) {
        toast.success("Profile updated successfully!");
        router.push("/provider-dashboard/profile");
        router.refresh();
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10">
      <Card className="shadow-lg border-orange-100">
        <CardHeader className="bg-orange-50/50">
          <CardTitle className="text-2xl text-orange-800">
            Update Business Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Restaurant Name</label>
              <Input
                {...register("restaurantName")}
                placeholder="Enter restaurant name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Phone Number</label>
              <Input {...register("phone")} placeholder="e.g. 017XXXXXXXX" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Address</label>
              <Input
                {...register("address")}
                placeholder="Full business address"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Description</label>
              <Textarea
                {...register("description")}
                placeholder="Tell customers about your kitchen..."
                className="h-32"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
