import axios from "axios";
import axiosInstance from "./axios";

export const Order = {
  async getList({ page, perPage, search = undefined }) {
    //lấy data api
    // console.log("fetch list");

    const url = new URL(axiosInstance.defaults.baseURL + "order");
    url.searchParams.append("page", page); // nososi vào url để khai báo page
    url.searchParams.append("perPage", perPage); // nối để lấy perpage
    if (search) url.searchParams.append("fullTextSearch", search); // nối để lấy perpage

    return axiosInstance.get(url.toString());
  },
  async getVendorOrders() {
    return axiosInstance.post(axiosInstance.defaults.baseURL + "sendo/orders");
  },
  async getUnits() {
    return axiosInstance.get(axiosInstance.defaults.baseURL + "order/mt/unit");
  },
  async get(id) {
    return axiosInstance.get(axiosInstance.defaults.baseURL + "order/" + id);
  },
  async getAllOrderStatus(id) {
    return axiosInstance.get(
      axiosInstance.defaults.baseURL + "order/allstatus"
    );
  },
  async updateStatusOrder(id, status) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + "order/status/" + id,
      { status }
    );
  },
};
