/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createCategory } from "@/app/service/admin";
import { useRouter } from "next/navigation";

export function CreateCategoryModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await createCategory(data);
      if (res.success) {
        toast.success("Category created!");
        setOpen(false);
        reset();
        router.refresh(); 
      } else {
        toast.error(res.message || "Error occurred");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <Input
            {...register("name", { required: true })}
            placeholder="Category Name (e.g. Fast Food)"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}