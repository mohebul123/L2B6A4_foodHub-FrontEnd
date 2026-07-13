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
import OrderRow from "./OrderRow";

export default async function ProviderOrdersPage() {
  const result = await getProviderOrders();
  const orders = result?.data || [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Incoming Orders 🛒
        </h2>
        <p className="text-muted-foreground text-sm">
          Manage and track your customer orders.
        </p>
      </div>

      <div className="border border-border rounded-lg bg-card shadow-sm overflow-hidden transition-colors duration-300">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border bg-muted/30 hover:bg-muted/30">
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
                <TableCell
                  colSpan={6}
                  className="text-center py-20 text-muted-foreground italic"
                >
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
