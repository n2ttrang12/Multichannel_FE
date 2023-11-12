import axios from "axios";
import axiosInstance from "./axios";

export const Customer = {
  async getList({ page, perPage, search = undefined }) {
    //lấy data api
    // console.log("fetch list");

    const url = new URL(axiosInstance.defaults.baseURL + "customer");
    url.searchParams.append("page", page); // nososi vào url để khai báo page
    url.searchParams.append("perPage", perPage); // nối để lấy perpage
    if (search) url.searchParams.append("fullTextSearch", search); // nối để lấy perpage

    return axiosInstance.get(url.toString());
  },
  async addCustomer(customer) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + "customer/create",
      {
        ...customer,
      }
    );
  },
  async updateCustomer(customer) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + `customer/${customer.id}`,
      {
        ...customer,
      }
    );
  },
  async deleteCustomer(id) {
    return axiosInstance.delete(
      axiosInstance.defaults.baseURL + `customer/${id}`
    );
  },
  async getUnits() {
    return axiosInstance.get(
      axiosInstance.defaults.baseURL + "customer/mt/unit"
    );
  },
};
