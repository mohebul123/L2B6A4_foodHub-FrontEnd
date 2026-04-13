/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProviderOrders } from "@/app/service/meal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderRow from "./OrderRow"; // default import (No curly braces)

export default async function ProviderOrdersPage() {
  const result = await getProviderOrders();
  const orders = result?.data || [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Incoming Orders 🛒</h2>
        <p className="text-muted-foreground text-sm">Manage and track your customer orders.</p>
      </div>

      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Meal Details</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order: any) => (
                <OrderRow key={order.id} order={order} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-20 text-muted-foreground italic">
                  No orders found for your kitchen.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}