import axios from "axios";
import axiosInstance from "./axios";

export const Supplier = {
  async getList({ page, perPage, search = undefined }) {
    //lấy data api
    // console.log("fetch list");

    const url = new URL(axiosInstance.defaults.baseURL + "product");
    url.searchParams.append("page", page); // nososi vào url để khai báo page
    url.searchParams.append("perPage", perPage); // nối để lấy perpage
    if (search) url.searchParams.append("fullTextSearch", search); // nối để lấy perpage

    return axiosInstance.get(url.toString());
  },
  async addSupplier(upplier) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + "upplier/create",
      {
        ...upplier,
      }
    );
  },
  async updateSupplier(upplier) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + `upplier/${upplier.id}`,
      {
        ...upplier,
      }
    );
  },
  async deleteSupplier(id) {
    return axiosInstance.delete(
      axiosInstance.defaults.baseURL + `upplier/${id}`
    );
  },
  async getUnits() {
    return axiosInstance.get(
      axiosInstance.defaults.baseURL + "upplier/mt/unit"
    );
  },
};
