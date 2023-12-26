import axios from "axios";
import axiosInstance from "./axios";

export const StoreModel = {
  async getList({ page, perPage, search = undefined }) {
    //lấy data api
    // console.log("fetch list");

    const url = new URL(axiosInstance.defaults.baseURL + "store");
    url.searchParams.append("page", page); // nososi vào url để khai báo page
    url.searchParams.append("perPage", perPage); // nối để lấy perpage
    if (search) url.searchParams.append("fullTextSearch", search); // nối để lấy perpage

    return axiosInstance.get(url.toString());
  },

  async get(id) {
    return axiosInstance.get(axiosInstance.defaults.baseURL + "store/" + id);
  },
  async getMystore() {
    return axiosInstance.get(axiosInstance.defaults.baseURL + "store/by-user");
  },
};
