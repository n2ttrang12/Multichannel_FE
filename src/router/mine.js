import React from "react";
import Horizontal from "../layouts/dashboard/horizontal";
import Boxed from "../layouts/dashboard/boxed";
import DualHorizontal from "../layouts/dashboard/dual-horizontal";
import DualCompact from "../layouts/dashboard/dual-compact";
import BoxedFancy from "../layouts/dashboard/boxed-fancy";
import List from "../views/dashboard/order-management/list";
import Default from "../layouts/dashboard/default";
import Bill from "../views/dashboard/order-management/bill";
import OrderManagement from "../layouts/dashboard/order-management";

export const MineRouters = [
  {
    path: "/",
    //element: <OrderManagement />,
    element: <Default />,
    children: [
      {
        path: "dashboard/order-management/list",
        element: <List />,
      },
      {
        path: "dashboard/order-management/bills",
        element: <Bill />,
      },
    ],
  },
];
