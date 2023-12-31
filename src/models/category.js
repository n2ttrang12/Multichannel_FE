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

    // console.log("getList category", url.toString());
    return axiosInstance.get(url.toString());
  },
  async addCategory(name, parentId = null) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + "category/create",
      {
        name,
        parentId,
      }
    );
  },
  async updateCategory(id, name) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + `category/update/${id}`,
      {
        id,
        name,
      }
    );
  },
  async deleteCategory(id) {
    return axiosInstance.delete(
      axiosInstance.defaults.baseURL + `category/${id}`
    );
  },
  async getAll() {
    const data = sessionStorage.getItem("category.all");
    if (data) {
      return JSON.parse(data);
    } else {
      //TODO: backend support get all and cached
      const result = await Category.getList({
        page: 1, // Offset
        perPage: 100, // limit,
        search: "",
      });

      sessionStorage.setItem("category.all", JSON.stringify(result));
      return result;
    }
  },
};
