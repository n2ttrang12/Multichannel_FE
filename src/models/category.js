import axios from "axios";
import axiosInstance from "./axios";

export const Category = {
  async getList({ page, perPage, search = undefined }) {
    //lấy data api
    // console.log("fetch list");
    const url = new URL(axiosInstance.defaults.baseURL + "category");
    url.searchParams.append("page", page); // nososi vào url để khai báo page
    url.searchParams.append("perPage", perPage); // nối để lấy perpage
    if (search) url.searchParams.append("fullTextSearch", search); // nối để lấy perpage

    console.log("getList category", url.toString());
    return axiosInstance.get(url.toString());
  },

  async addCategory(name, parentId = null) {
    const baseUrl = "category/create";
    const url = new URL(baseUrl);

    return axiosInstance.post(url, {
      name,
      parentId,
    });
  },
  async updateCategory(id, name) {
    const baseUrl = `http://localhost:8001/api/v1/multi-chanel/category/update/${id}`;
    const url = new URL(baseUrl);

    return axios.post(
      url,
      {
        name,
      },
      {
        headers: {
          //todo get from state or somewhere else
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
  },
  async deleteCategory(id) {
    const baseUrl = `category/${id}`;
    const url = new URL(baseUrl);
    return axiosInstance.delete(url);
  },
};
