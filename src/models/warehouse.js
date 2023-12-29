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
  async getCheckList({ page, perPage, search = undefined }) {
    //lấy data api
    // console.log("fetch list");

    const url = new URL(
      axiosInstance.defaults.baseURL + "warehouse/check-stock-list"
    );
    url.searchParams.append("page", page); // nososi vào url để khai báo page
    url.searchParams.append("perPage", perPage); // nối để lấy perpage
    if (search) url.searchParams.append("fullTextSearch", search); // nối để lấy perpage

    return axiosInstance.get(url.toString());
  },
  async getSupplierList({ page, perPage, search = undefined }) {
    //lấy data api
    // console.log("fetch list");

    const url = new URL(axiosInstance.defaults.baseURL + "supplier");
    url.searchParams.append("page", page); // nososi vào url để khai báo page
    url.searchParams.append("perPage", perPage); // nối để lấy perpage
    if (search) url.searchParams.append("fullTextSearch", search); // nối để lấy perpage

    return axiosInstance.get(url.toString());
  },
  async addImport(importProduct) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + "warehouse/import-product",
      {
        ...importProduct,
      }
    );
  },
  async addCheck(importProduct) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + "warehouse/check-product-in-stock",
      {
        ...importProduct,
      }
    );
  },

  async deleteCheckGoods(id) {
    return axiosInstance.delete(
      axiosInstance.defaults.baseURL + `cancel-product-in-stock/${id}`
    );
  },
  async changeStatusInStock(id) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + "warehouse/change-status-in-stock/" + id
    );
  },

  async updateImport(warehouse) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + `warehouse/${warehouse.id}`,
      {
        ...warehouse,
      }
    );
  },

  async get(id) {
    return axiosInstance.get(
      axiosInstance.defaults.baseURL + "warehouse/" + id
    );
  },

  async getImport(id) {
    return axiosInstance.get(
      axiosInstance.defaults.baseURL + "warehouse/import-product/" + id
    );
  },
  async getAll() {
    return WarehouseModal.getList({
      page: 0, // Offset
      perPage: 0, // limit,
      search: "",
    });
  },
};
