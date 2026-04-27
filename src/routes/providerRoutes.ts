import { Route } from "@/types";

export const providerRoutes: Route[] = [
  {
    title: "Provider Dashboard",

    items: [
      {
        title: "Edit-Profile",
        url: "/provider-dashboard/profile/update-profile",
      },
      {
        title: "Profile",
        url: "/provider-dashboard/profile",
      },
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
