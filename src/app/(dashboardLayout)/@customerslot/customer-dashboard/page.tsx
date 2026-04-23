/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMyOrders } from "@/app/service/order";
import { createReview } from "@/app/service/review";
import { ReviewModal } from "@/components/modules/reviews/ReviewModal";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { ReviewModal } from "@/components/modules/review/ReviewModal"; 

export default async function CustomerDashboard() {
  const result = await getMyOrders();
  const orders = result?.data || [];

  console.log(orders);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Dashboard</h1>
      
      {/* Top Stats */}
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

      {/* Order History Section */}
      <div className="rounded-xl border p-6 bg-slate-50/30">
        <h3 className="font-semibold mb-4 text-slate-800">Order History</h3>
        
        {orders.length > 0 ? (
          <div className="flex flex-col">
            {orders.map((order: any, index: number) => {
              const safeKey = order._id || order.id || `order-${index}`;
              const displayId = (order._id || order.id)?.toString() || "";

             
              return (
                <div 
                  key={safeKey} 
                  className="flex flex-col gap-3 p-4 border rounded-lg hover:shadow-md transition-all bg-white mb-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-slate-900">
                        Order #{displayId ? displayId.slice(-6).toUpperCase() : "N/A"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Date N/A"}
                      </p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <p className="font-bold text-sm text-primary">৳{order.totalAmount}</p>
                      <Badge 
                        className={
                          order.status === "DELIVERED" 
                            ? "bg-green-600 hover:bg-green-700" 
                            : order.status === "CANCELLED" 
                            ? "bg-red-500" 
                            : "bg-orange-500"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>

                  {/* ✅ Review Section (Only for DELIVERED) */}
                  {order.status === "DELIVERED" && (
                    <div className="mt-2 pt-3 border-t border-slate-100">
                      <p className="text-[10px] font-bold uppercase text-slate-400 mb-2 tracking-wider">Rate Items</p>
                      <div className="space-y-2">
                        {order.orderItems?.map((item: any) => (
                          <div key={item.id} className="flex items-center justify-between bg-slate-50 p-2 rounded-md border border-slate-100">
                            <span className="text-xs font-medium text-slate-700">{item.meal?.title}</span>
                            <ReviewModal mealId={item.mealId} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
              // ✅ END OF YOUR CODE
            })}
          </div>
        ) : (
          <p className="text-center py-10 text-muted-foreground">No orders found.</p>
        )}
      </div>
    </div>
  );
}