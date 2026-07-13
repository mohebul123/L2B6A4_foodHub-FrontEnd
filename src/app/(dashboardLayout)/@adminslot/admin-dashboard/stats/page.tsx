import { Users, Utensils, ShoppingBag, Store } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminStatistics } from "@/app/service/admin";

export default async function AdminStatsGrid() {
  const response = await getAdminStatistics();
  const stats = response?.data;

  const cards = [
    {
      title: "Total Customers",
      value: stats?.totalUsers || 0,
      icon: Users,

      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/40",
    },
    {
      title: "Total Providers",
      value: stats?.totalProviders || 0,
      icon: Utensils,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-950/40",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950/40",
    },
    {
      title: "Active Kitchens",
      value: stats?.activeRestaurants || 0,
      icon: Store,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, idx) => (
        <Card
          key={idx}
          className="shadow-sm border bg-card text-card-foreground hover:shadow-md transition-all duration-200 rounded-xl"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {card.title}
            </CardTitle>
            <div className={`p-2.5 rounded-xl ${card.bg} transition-colors`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-3xl font-extrabold tracking-tight text-foreground">
              {card.value.toLocaleString()}
            </div>

            <p className="text-xs text-muted-foreground mt-1">
              Platform aggregate sync
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
