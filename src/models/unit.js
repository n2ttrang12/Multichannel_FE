import axios from "axios";
import axiosInstance from "./axios";

export const UnitModel = {
  async getList({ page, perPage, search = undefined }) {
    //lấy data api
    // console.log("fetch list");

    const url = new URL(axiosInstance.defaults.baseURL + "mt-unit");
    url.searchParams.append("page", page); // nososi vào url để khai báo page
    url.searchParams.append("perPage", perPage); // nối để lấy perpage
    if (search) url.searchParams.append("fullTextSearch", search); // nối để lấy perpage

    return axiosInstance.get(url.toString());
  },
  async addUnit(ultil) {
    return axiosInstance.post(axiosInstance.defaults.baseURL + "mt-unit", {
      ...ultil,
    });
  },
  async updateUnit(id, ultil) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + `mt-unit/${id}`,
      {
        ...ultil,
      }
    );
  },
  async deleteUnit(id) {
    return axiosInstance.delete(
      axiosInstance.defaults.baseURL + `mt-unit/${id}`
    );
  },

  async get(id) {
    return axiosInstance.get(axiosInstance.defaults.baseURL + "mt-unit/" + id);
  },
};
