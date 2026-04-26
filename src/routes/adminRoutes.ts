import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Statistics",
        url: "/admin-dashboard/stats",
      },
      {
        title: "Users",
        url: "/admin-dashboard/users",
      },
      {
        title: "Orders",
        url: "/admin-dashboard/orders",
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
      },
    ],
  },
];
