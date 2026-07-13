/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMyOrders } from "@/app/service/order";
import { ReviewModal } from "@/components/modules/reviews/ReviewModal";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
export const dynamic = "force-dynamic";

export default async function CustomerDashboard() {
  const result = await getMyOrders();
  const orders = result?.data || [];

  return (
    <div className="space-y-6 text-foreground bg-background transition-colors duration-300">
      <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card text-card-foreground border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {orders.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-border p-6 bg-muted/30">
        <h3 className="font-semibold mb-4 text-foreground">Order History</h3>

        {orders.length > 0 ? (
          <div className="flex flex-col">
            {orders.map((order: any, index: number) => {
              const safeKey = order._id || order.id || `order-${index}`;
              const displayId = (order._id || order.id)?.toString() || "";

              return (
                <div
                  key={safeKey}
                  className="flex flex-col gap-3 p-4 border border-border/60 rounded-lg hover:shadow-md transition-all bg-card mb-3 text-foreground"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-foreground">
                        Order #
                        {displayId ? displayId.slice(-6).toUpperCase() : "N/A"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "Date N/A"}
                      </p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <p className="font-bold text-sm text-orange-600 dark:text-orange-500">
                        ৳{order.totalAmount}
                      </p>

                      <Badge
                        variant="outline"
                        className={
                          order.status === "DELIVERED"
                            ? "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30 hover:bg-green-500/20"
                            : order.status === "CANCELLED"
                              ? "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30 hover:bg-red-500/20"
                              : "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30 hover:bg-orange-500/20"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>

                  {order.status === "DELIVERED" && (
                    <div className="mt-2 pt-3 border-t border-border/60">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground mb-2 tracking-wider">
                        Rate Items
                      </p>
                      <div className="space-y-2">
                        {order.orderItems?.map((item: any) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between bg-muted/50 p-2 rounded-md border border-border/40"
                          >
                            <span className="text-xs font-medium text-foreground">
                              {item.meal?.title}
                            </span>
                            <ReviewModal mealId={item.mealId} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center py-10 text-muted-foreground">
            No orders found.
          </p>
        )}
      </div>
    </div>
  );
}
