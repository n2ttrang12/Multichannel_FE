import axiosInstance from "./axios";

export const WarehouseModal = {
  async getList({ page, perPage, search = undefined }) {
    //lấy data api
    // console.log("fetch list");

    const url = new URL(axiosInstance.defaults.baseURL + "warehouse");
    url.searchParams.append("page", page); // nososi vào url để khai báo page
    url.searchParams.append("perPage", perPage); // nối để lấy perpage
    if (search) url.searchParams.append("fullTextSearch", search); // nối để lấy perpage

    return axiosInstance.get(url.toString());
  },
  async getImportList({ page, perPage, search = undefined }) {
    //lấy data api
    // console.log("fetch list");

    const url = new URL(
      axiosInstance.defaults.baseURL + "warehouse/import-product-list"
    );
    url.searchParams.append("page", page); // nososi vào url để khai báo page
    url.searchParams.append("perPage", perPage); // nối để lấy perpage
    if (search) url.searchParams.append("fullTextSearch", search); // nối để lấy perpage

    return axiosInstance.get(url.toString());
  },
  async addWarehouse(warehouse) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + "warehouse/create",
      {
        ...warehouse,
      }
    );
  },
  async update(warehouse) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + `warehouse/${warehouse.id}`,
      {
        ...warehouse,
      }
    );
  },
  async deleteWarehouse(id) {
    return axiosInstance.delete(
      axiosInstance.defaults.baseURL + `warehouse/${id}`
    );
  },

  async get(id) {
    return axiosInstance.get(
      axiosInstance.defaults.baseURL + "warehouse/" + id
    );
  },
};