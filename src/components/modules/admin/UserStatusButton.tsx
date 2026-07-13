"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateUserStatus } from "@/app/service/admin";
import { Loader2, Power, PowerOff } from "lucide-react";

interface UserStatusButtonProps {
  userId: string;
  status: "ACTIVE" | "SUSPENDED";
}

export function UserStatusButton({ userId, status }: UserStatusButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await updateUserStatus(userId, status);

      if (res.success) {
        toast.success(
          `User is now ${status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"}`,
        );
        router.refresh();
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={status === "ACTIVE" ? "destructive" : "default"}
      size="sm"
      className="w-[100px]"
      disabled={loading}
      onClick={handleToggle}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : status === "ACTIVE" ? (
        <>
          <PowerOff className="mr-2 h-4 w-4" /> Suspend
        </>
      ) : (
        <>
          <Power className="mr-2 h-4 w-4" /> Activate
        </>
      )}
    </Button>
  );
}
