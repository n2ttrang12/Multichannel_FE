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
  async addorder(order) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + "order/create-cart",
      {
        ...order,
      }
    );
  },
  async updateorder(order) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + `order/${order.id}`,
      {
        ...order,
      }
    );
  },
  async deleteorder(id) {
    return axiosInstance.delete(axiosInstance.defaults.baseURL + `order/${id}`);
  },
  async getUnits() {
    return axiosInstance.get(axiosInstance.defaults.baseURL + "order/mt/unit");
  },
};
