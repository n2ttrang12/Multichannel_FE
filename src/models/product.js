import axiosInstance from "./axios";

export const Product = {
  async getList({ page, perPage, search = undefined }) {
    //lấy data api
    // console.log("fetch list");

    const url = new URL(axiosInstance.defaults.baseURL + "product");
    url.searchParams.append("page", page); // nososi vào url để khai báo page
    url.searchParams.append("perPage", perPage); // nối để lấy perpage
    if (search) url.searchParams.append("fullTextSearch", search); // nối để lấy perpage

    return axiosInstance.get(url.toString());
  },
  async addProduct(product) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + "product/create",
      {
        ...product,
      }
    );
  },
  async update(product) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + `product/${product.id}`,
      {
        ...product,
      }
    );
  },
  async deleteProduct(id) {
    return axiosInstance.delete(
      axiosInstance.defaults.baseURL + `product/${id}`
    );
  },
  async getUnits() {
    return axiosInstance.get(
      axiosInstance.defaults.baseURL + "product/mt/unit"
    );
  },
  async getSupplier() {
    return axiosInstance.get(axiosInstance.defaults.baseURL + "supplier");
  },
  async get(id) {
    return axiosInstance.get(axiosInstance.defaults.baseURL + "product/" + id);
  },
  async getAll() {
    return Product.getList({
      page: 0, // Offset
      perPage: 0, // limit,
      search: "",
    });
  },
};
