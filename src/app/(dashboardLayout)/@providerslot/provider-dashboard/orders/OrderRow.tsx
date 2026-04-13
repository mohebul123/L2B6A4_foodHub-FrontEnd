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
// import { updateOrderstatus } from "@/app/service/meal";

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
    <TableRow>
      {/* 1. Order ID */}
      <TableCell className="font-mono text-xs">
        #{order.id?.slice(-6).toUpperCase()}
      </TableCell>

      {/* 2. Customer Info */}
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{order.customer?.name || "N/A"}</span>
          <span className="text-xs text-muted-foreground">{order.customer?.email}</span>
        </div>
      </TableCell>

      {/* 3. Meal Details */}
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {order.orderItems?.map((item: any) => (
            <Badge key={item.id} variant="outline" className="text-[10px] bg-slate-50">
              {item.meal?.title} <span className="ml-1 font-bold text-orange-600">x{item.quantity}</span>
            </Badge>
          ))}
        </div>
      </TableCell>

      {/* 4. Price */}
      <TableCell className="font-semibold text-sm text-slate-700">
        ৳{order.totalAmount}
      </TableCell>

      {/* 5. Status */}
      <TableCell>
        <Badge 
          className={
            order.status === "PLACED" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
            order.status === "DELIVERED" ? "bg-green-100 text-green-700 hover:bg-green-100" :
            "bg-orange-100 text-orange-700 hover:bg-orange-100"
          }
        >
          {order.status}
        </Badge>
      </TableCell>

      {/* 6. Action Button */}
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-orange-600 border-orange-200">
              Update
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {["PLACED", "PREPARING", "READY", "DELIVERED", "CANCELLED"].map((s) => (
              <DropdownMenuItem key={s} onClick={() => handleUpdateStatus(s)}>
                {s}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}