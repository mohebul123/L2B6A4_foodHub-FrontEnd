// export const adninRoutes = [
//   {
//     title: "Dashboard",
//     items: [
//       {
//         title: "Orders",
//         url: "#",
//       },
//       {
//         title: "Customers",
//         url: "#",
//       },
//       {
//         title: "Providers",
//         url: "#",
//       },
//     ],
//   },
// ];

export interface Route {
  title: string;
  items: {
    title: string;
    url: string;
  }[];
}
