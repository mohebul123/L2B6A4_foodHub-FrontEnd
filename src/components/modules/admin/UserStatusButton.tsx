"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateUserStatus } from "@/app/service/admin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function UserStatusButton({
  userId,
  status,
}: {
  userId: string;
  status: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      const res = await updateUserStatus(userId, status);
      if (res.success) {
        toast.success(
          `User ${status === "ACTIVE" ? "suspended" : "activated"} successfully!`,
        );
        router.refresh(); // Data reload korar jonno
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleToggleStatus}
      disabled={loading}
      variant={status === "ACTIVE" ? "destructive" : "default"}
      size="sm"
      className="w-24"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : status === "ACTIVE" ? (
        "Suspend"
      ) : (
        "Activate"
      )}
    </Button>
  );
}
