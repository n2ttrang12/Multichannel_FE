import axios from "axios";
import axiosInstance from "./axios";

export const VoucherModel = {
  async getList({ page, perPage, search = undefined }) {
    //lấy data api
    // console.log("fetch list");

    const url = new URL(axiosInstance.defaults.baseURL + "voucher");
    url.searchParams.append("page", page); // nososi vào url để khai báo page
    url.searchParams.append("perPage", perPage); // nối để lấy perpage
    if (search) url.searchParams.append("fullTextSearch", search); // nối để lấy perpage

    return axiosInstance.get(url.toString());
  },
  async addVoucher(voucher) {
    return axiosInstance.post(axiosInstance.defaults.baseURL + "voucher", {
      ...voucher,
    });
  },
  async updateVoucher(id, voucher) {
    return axiosInstance.post(
      axiosInstance.defaults.baseURL + `voucher/${id}`,
      {
        ...voucher,
      }
    );
  },
  async deleteVoucher(id) {
    return axiosInstance.delete(
      axiosInstance.defaults.baseURL + `voucher/${id}`
    );
  },

  async get(id) {
    return axiosInstance.get(axiosInstance.defaults.baseURL + "voucher/" + id);
  },

  async getByCode(code) {
    return axiosInstance.get(
      axiosInstance.defaults.baseURL + "voucher/code/" + code
    );
  },
};
