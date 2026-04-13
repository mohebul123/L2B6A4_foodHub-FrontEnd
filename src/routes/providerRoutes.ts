import { Route } from "@/types";

export const providerRoutes: Route[] = [
  {
    title: "Provider Dashboard",

    items: [
      {
        title: "Meals",
        url: "/provider-dashboard",
      },
      {
        title: "Create A Meal",
        url: "/provider-dashboard/add-meal",
      },
      {
        title: "Orders",
        url: "/provider-dashboard/orders",
      },
    ],
  },
];
