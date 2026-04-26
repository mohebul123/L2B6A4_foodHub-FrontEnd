/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateCustomerProfile } from "@/app/service/customer";
import { User, Phone, MapPin } from "lucide-react";

const updateCustomerSchema = z.object({
  name: z.string().min(2, "Name is too short").optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type UpdateProfileValues = z.infer<typeof updateCustomerSchema>;

export default function UpdateCustomerProfilePage({
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
    resolver: zodResolver(updateCustomerSchema),
    defaultValues: {
      name: initialData?.name || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
    },
  });

  const onSubmit = async (data: UpdateProfileValues) => {
    try {
      const res = await updateCustomerProfile(data);
      if (res.success) {
        toast.success("Profile updated successfully!");
        router.push("/customer-dashboard/profile");
        router.refresh();
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10">
      <Card className="shadow-lg border-blue-100">
        <CardHeader className="bg-blue-50/30 border-b">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Edit Personal Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-gray-600">
                <User size={16} /> Full Name
              </label>
              <Input
                {...register("name")}
                placeholder="Your full name"
                className="focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-gray-600">
                <Phone size={16} /> Phone Number
              </label>
              <Input {...register("phone")} placeholder="01XXXXXXXXX" />
            </div>

            {/* Address Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-gray-600">
                <MapPin size={16} /> Delivery Address
              </label>
              <Input
                {...register("address")}
                placeholder="House, Road, Area, City"
              />
            </div>

            <div className="pt-4 flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
