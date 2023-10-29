import React from "react";
import Index from "../views/dashboard/index";
// import { Switch, Route } from 'react-router-dom'
// user
import UserProfile from "../views/dashboard/app/user-profile";
import UserAdd from "../views/dashboard/app/user-add";
import UserList from "../views/dashboard/app/user-list";
// import userProfileEdit from '../views/dashboard/app/user-privacy-setting';
// widget
import Widgetbasic from "../views/dashboard/widget/widgetbasic";
import Widgetcard from "../views/dashboard/widget/widgetcard";
import Widgetchart from "../views/dashboard/widget/widgetchart";
// icon
import Solid from "../views/dashboard/icons/solid";
import Outline from "../views/dashboard/icons/outline";
import DualTone from "../views/dashboard/icons/dual-tone";
// Form
import FormElement from "../views/dashboard/from/form-element";
import FormValidation from "../views/dashboard/from/form-validation";
import FormWizard from "../views/dashboard/from/form-wizard";
// table
import BootstrapTable from "../views/dashboard/table/bootstrap-table";
import TableData from "../views/dashboard/table/table-data";

// map
import Vector from "../views/dashboard/maps/vector";
import Google from "../views/dashboard/maps/google";

//extra
// import PrivacyPolicy from '../views/dashboard/extra/privacy-policy';
// import TermsofService from '../views/dashboard/extra/terms-of-service';

//TransitionGroup
// import { TransitionGroup, CSSTransition } from "react-transition-group";
//Special Pages
import Kanban from "../views/dashboard/special-pages/kanban";
import Pricing from "../views/dashboard/special-pages/pricing";
import Timeline from "../views/dashboard/special-pages/timeline";
import Calender from "../views/dashboard/special-pages/calender";
import RtlSupport from "../views/dashboard/special-pages/RtlSupport";

//admin
import Admin from "../views/dashboard/admin/admin";
import Default from "../layouts/dashboard/default";
import List from "../views/dashboard/order-management/list";
import Bill from "../views/dashboard/order-management/bill";
import CustomerList from "../views/dashboard/customer-management/customer-list";
import Inventory from "../views/dashboard/warehouse/inventory";
import Inventoryreceiving from "../views/dashboard/warehouse/inventory-receiving";
import ImportGoods from "../views/dashboard/warehouse/import-goods";
import Shipping from "../views/dashboard/warehouse/ shipping";
import InventoryCheck from "../views/dashboard/warehouse/inventory-check";
import ProductDestruction from "../views/dashboard/warehouse/product-destruction";
import ProductReturn from "../views/dashboard/warehouse/product-return";
import Receipt from "../views/dashboard/debt-management/receipt";
import Payment from "../views/dashboard/debt-management/payment";
import SignUp from "../views/dashboard/auth/sign-up";
import SignIn from "../views/dashboard/auth/sign-in";
import ProtectedRoute from "./protected-route";
import CategoryManagement from "../views/dashboard/product-management/category";
import ProductList from "../views/dashboard/product-management/product-list";
import Product from "../views/dashboard/product-management/product";
import Customer from "../views/dashboard/customer-management/customer";
import SupplierList from "../views/dashboard/supplier-management/supplier-list";
import Supplier from "../views/dashboard/supplier-management/supplier";

export const DefaultRouter = [
  {
    path: "/dashboard",
    element: <Default />,
    children: [
      {
        path: "/dashboard",
        element: <Index />,
      },
      // Order management
      {
        path: "/dashboard/order-management/list",
        element: <List />,
      },
      {
        path: "/dashboard/order-management/bills",
        element: <Bill />,
      },
      // Customer management
      {
        path: "/dashboard/customer-list",
        element: <CustomerList />,
      },
      {
        path: "/dashboard/customer-list/customer",
        element: <Customer />,
      },
      //NCC
      {
        path: "/dashboard/supplier-list",
        element: <SupplierList />,
      },
      {
        path: "/dashboard/supplier-list",
        element: <Supplier />,
      },
      // Warehouse
      {
        path: "/dashboard/warehouse/inventory",
        element: <Inventory />,
      },
      {
        path: "/dashboard/warehouse/inventory-receiving",
        element: <Inventoryreceiving />,
      },
      {
        path: "/dashboard/dashboard/warehouse/import-goods",
        element: <ImportGoods />,
      },
      {
        path: "/dashboard/dashboard/warehouse/shipping",
        element: <Shipping />,
      },
      {
        path: "/dashboard/warehouse/inventory-check",
        element: <InventoryCheck />,
      },
      {
        path: "/dashboard/warehouse/product-destruction",
        element: <ProductDestruction />,
      },
      {
        path: "/dashboard/warehouse/product-return",
        element: <ProductReturn />,
      },
      //Debt management
      {
        path: "/dashboard/debt-management/receipt",
        element: <Receipt />,
      },
      {
        path: "/dashboard/debt-management/payment",
        element: <Payment />,
      },
      //Products management
      {
        path: "/dashboard/product-management/category-management",
        element: <CategoryManagement />,
      },
      {
        path: "/dashboard/product-management/product-list",
        element: <ProductList />,
      },
      {
        path: "/dashboard/product-management/product-list/product",
        element: <Product />,
      },
      // {
      //   path: "dashboard/special-pages/pricing",
      //   element: <Pricing />,
      // },
      // {
      //   path: "dashboard/special-pages/timeline",
      //   element: <Timeline />,
      // },
      // {
      //   path: "dashboard/special-pages/rtl-support",
      //   element: <RtlSupport />,
      // },
      // {
      //   path: "dashboard/app/user-profile",
      //   element: <UserProfile />,
      // },
      // {
      //   path: "dashboard/app/user-add",
      //   element: <UserAdd />,
      // },
      // {
      //   path: "dashboard/app/user-list",
      //   element: <UserList />,
      // },
      // {
      //   path: "dashboard/admin/admin",
      //   element: <Admin />,
      // },
      // // Widget
      // {
      //   path: "dashboard/widget/widgetbasic",
      //   element: <Widgetbasic />,
      // },
      // {
      //   path: "dashboard/widget/widgetchart",
      //   element: <Widgetchart />,
      // },
      // {
      //   path: "dashboard/widget/widgetcard",
      //   element: <Widgetcard />,
      // },
      // // Map
      // {
      //   path: "dashboard/map/google",
      //   element: <Google />,
      // },
      // {
      //   path: "dashboard/map/vector",
      //   element: <Vector />,
      // },
      // // Form
      // {
      //   path: "dashboard/form/form-element",
      //   element: <FormElement />,
      // },
      // {
      //   path: "dashboard/form/form-wizard",
      //   element: <FormWizard />,
      // },
      // {
      //   path: "dashboard/form/form-validation",
      //   element: <FormValidation />,
      // },
      // // Table
      // {
      //   path: "dashboard/table/bootstrap-table",
      //   element: <BootstrapTable />,
      // },
      // {
      //   path: "dashboard/table/table-data",
      //   element: <TableData />,
      // },
      // // Icon
      // {
      //   path: "dashboard/icon/solid",
      //   element: <Solid />,
      // },
      // {
      //   path: "dashboard/icon/outline",
      //   element: <Outline />,
      // },
      // {
      //   path: "dashboard/icon/dual-tone",
      //   element: <DualTone />,
      // },
    ],
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
];
