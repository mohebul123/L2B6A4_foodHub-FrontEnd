/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboardLayout)/@customerslot/customer-dashboard/page.tsx
// import { getMyOrders } from "@/services"; // Tomar service folder path onujayi
import { getMyOrders } from "@/app/service/order";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function CustomerDashboard() {
  const result = await getMyOrders();
  const orders = result?.data || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border p-6">
        <h3 className="font-semibold mb-4">Order History</h3>
       {orders.length > 0 ? (
  orders.map((order: any, index: number) => {
    // ID extract korar safe way
    const safeKey = order._id || order.id || `order-${index}`;
    const displayId = (order._id || order.id)?.toString() || "";

    return (
      <div 
        key={safeKey} // Eikhane oboshoy unique key thakte hobe
        className="flex items-center justify-between p-4 border rounded-lg"
      >
        <div>
          <p className="font-medium text-sm">
            Order #{displayId ? displayId.slice(-6) : "N/A"}
          </p>
          <p className="text-xs text-muted-foreground">
            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Date N/A"}
          </p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-sm">৳{order.totalPrice}</p>
          <Badge>{order.status}</Badge>
        </div>
      </div>
    );
  })
) : (
  <p className="text-center py-10 text-muted-foreground">No orders found.</p>
)}
      </div>
    </div>
  );
}