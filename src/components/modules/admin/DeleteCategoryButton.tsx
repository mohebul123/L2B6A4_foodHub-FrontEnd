"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { deleteCategory } from "@/app/service/admin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/app/service/admin";

export function DeleteCategoryButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const isConfirmed = confirm("Are you sure?");

    if (isConfirmed) {
      try {
        const res = await deleteCategory(id);

        console.log("Response from server:", res);

        if (res && res.success === true) {
          toast.success(res.message || "Category deleted successfully!");
          router.refresh();
        } else {
          toast.error(res?.message || "Cannot delete category with meals!");
        }
      } catch (error) {
        toast.error("Network or Server error");
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      className="text-red-500 hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
