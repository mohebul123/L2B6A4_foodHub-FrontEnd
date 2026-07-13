/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateOrderstatus } from "@/app/service/order";

export default function OrderRow({ order }: { order: any }) {
  const router = useRouter();

  const handleUpdateStatus = async (status: string) => {
    const res = await updateOrderstatus(order.id, { status });
    if (res.success) {
      toast.success(`Status updated to ${status}`);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <TableRow className="border-b border-border/60 text-foreground">
      <TableCell className="font-mono text-xs text-muted-foreground">
        #{order.id?.slice(-6).toUpperCase()}
      </TableCell>

      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium text-sm text-foreground">
            {order.customer?.name || "N/A"}
          </span>
          <span className="text-xs text-muted-foreground">
            {order.customer?.email}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex flex-wrap gap-1">
          {order.orderItems?.map((item: any) => (
            <Badge
              key={item.id}
              variant="outline"
              className="text-[10px] bg-muted/40 text-foreground border-border"
            >
              {item.meal?.title}{" "}
              <span className="ml-1 font-bold text-orange-600 dark:text-orange-500">
                x{item.quantity}
              </span>
            </Badge>
          ))}
        </div>
      </TableCell>

      {/* 4. Price */}

      <TableCell className="font-semibold text-sm text-foreground">
        ৳{order.totalAmount}
      </TableCell>

      {/* 5. Status */}
      <TableCell>
        <Badge
          variant="outline"
          className={
            order.status === "PLACED"
              ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30"
              : order.status === "DELIVERED"
                ? "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30"
                : "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30"
          }
        >
          {order.status}
        </Badge>
      </TableCell>

      {/* 6. Action Button */}
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-orange-600 border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-600 dark:text-orange-400 dark:border-orange-500/20"
            >
              Update
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-card text-foreground border-border"
          >
            {["PLACED", "PREPARING", "READY", "DELIVERED", "CANCELLED"].map(
              (s) => (
                <DropdownMenuItem
                  key={s}
                  onClick={() => handleUpdateStatus(s)}
                  className="focus:bg-muted focus:text-foreground cursor-pointer"
                >
                  {s}
                </DropdownMenuItem>
              ),
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
