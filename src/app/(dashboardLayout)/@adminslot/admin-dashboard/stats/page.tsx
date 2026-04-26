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
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Providers",
      value: stats?.totalProviders || 0,
      icon: Utensils,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Active Kitchens",
      value: stats?.activeRestaurants || 0,
      icon: Store,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, idx) => (
        <Card
          key={idx}
          className="shadow-sm border-none bg-white hover:shadow-md transition-shadow"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${card.bg}`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 tracking-tight">
              {card.value.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
