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
import Shipping from "../views/dashboard/warehouse/ warehouse";
import InventoryCheck from "../views/dashboard/warehouse/import-goods-details";
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
import OrderDetail from "../views/dashboard/order-management/order-detail";
import CustomerDetail from "../views/dashboard/customer-management/customer-detail";
import VoucherList from "../views/dashboard/voucher-management/voucher-list";
import Warehouse from "../views/dashboard/warehouse/ warehouse";
import HistoryImportPerProduct from "../views/dashboard/warehouse/history-import-per-product";
import ImportGoodsDetails from "../views/dashboard/warehouse/import-goods-details";
import UnitList from "../views/dashboard/unit-management/unit-list";
import OrderOffline from "../views/dashboard/order-management/order-offline";
import { AdminComponent } from "../components/common/admin-component";
import StoreList from "../views/dashboard/store-management/store-list";

import MyStore from "../views/dashboard/store-management/my-store";
import StoreDetail from "../views/dashboard/store-management/store-detail";
import ExamineGoods from "../views/dashboard/warehouse/examine-goods-list";
import ExamineGoodsDetail from "../views/dashboard/warehouse/examine-goods-detail";

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
      {
        path: "/dashboard/order-management/list/order-detail/:id",
        element: <OrderDetail />,
      },
      {
        path: "/dashboard/order-management/list/order-offline/:id",
        element: <OrderOffline />,
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
      {
        path: "/dashboard/customer-list/customer-detail/:id",
        element: <CustomerDetail />,
      },
      //NCC
      {
        path: "/dashboard/supplier-list",
        element: <SupplierList />,
      },
      {
        path: "/dashboard/supplier/:id",
        element: <Supplier />,
      },
      //cửa hàng
      {
        path: "/dashboard/story-list",
        element: <StoreList />,
      },
      {
        path: "/dashboard/store/:id",
        element: <StoreDetail />,
      },
      {
        path: "/dashboard/my-store",
        element: <MyStore />,
      },
      // Warehouse
      {
        path: "/dashboard/warehouse/list-products",
        element: <Warehouse />,
      },
      {
        path: "/dashboard/warehouse/list-products/details/:id",
        element: <HistoryImportPerProduct />,
      },
      {
        path: "/dashboard/warehouse/import-goods",
        element: <ImportGoods />,
      },
      {
        path: "/dashboard/warehouse/import-goods/:id",
        element: <ImportGoodsDetails />,
      },
      {
        path: "/dashboard/warehouse/check-goods",
        element: <ExamineGoods />,
      },
      {
        path: "/dashboard/warehouse/check-goods/:id",
        element: <ExamineGoodsDetail />,
      },
      // Voucher
      {
        path: "/dashboard/voucher-list",
        element: <VoucherList />,
      },
      // Unit
      {
        path: "/dashboard/unit-management",
        element: (
          // <AdminComponent>
          <UnitList />
          // </AdminComponent>
        ),
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
        path: "/dashboard/product-management/product-list/product/:id",
        element: <Product />,
      },
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
