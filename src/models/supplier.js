import axios from "axios";
import axiosInstance from "./axios";

export const SupplierModel = {
  async getList({ page, perPage, search = undefined }) {
    //lấy data api
    // console.log("fetch list");

    const url = new URL(axiosInstance.defaults.baseURL + "supplier");
    url.searchParams.append("page", page); // nososi vào url để khai báo page
    url.searchParams.append("perPage", perPage); // nối để lấy perpage
    if (search) url.searchParams.append("fullTextSearch", search); // nối để lấy perpage

    return axiosInstance.get(url.toString());
  },
  async addSupplier(supplier) {
    return axiosInstance.post(axiosInstance.defaults.baseURL + "supplier", {
      ...supplier,
    });
  },
  async updateSupplier(supplier) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + `supplier/${supplier.id}`,
      {
        ...supplier,
      }
    );
  },
  async deleteSupplier(id) {
    return axiosInstance.delete(
      axiosInstance.defaults.baseURL + `supplier/${id}`
    );
  },
  async getProvince() {
    return axiosInstance.get(
      axiosInstance.defaults.baseURL + "supplier/mt-province"
    );
  },
  async get(id) {
    return axiosInstance.get(axiosInstance.defaults.baseURL + "supplier/" + id);
  },
  async getAll() {
    return SupplierModel.getList({
      page: 0, // Offset
      perPage: 0, // limit,
      search: "",
    });
  },
};
