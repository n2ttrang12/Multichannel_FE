import axios from "axios";
import axiosInstance from "./axios";

export const StatisticModel = {
  async getRevenue({ page, perPage, revenueFilter, search = undefined }) {
    //lấy data api
    // console.log("fetch list");

    const url = new URL(axiosInstance.defaults.baseURL + "revenue/order");
    url.searchParams.append("page", page); // nososi vào url để khai báo page
    url.searchParams.append("perPage", perPage);
    url.searchParams.append("filter", JSON.stringify(revenueFilter)); // nối để lấy perpage
    if (search) url.searchParams.append("fullTextSearch", search); // nối để lấy perpage
    return axiosInstance.get(url.toString());
  },
  async getTotal() {
    return axiosInstance.get(
      axiosInstance.defaults.baseURL + "revenue/count-order"
    );
  },
  async getByFilter(filter) {
    const url = new URL(axiosInstance.defaults.baseURL + "revenue/count-order");
    url.searchParams.append("filter", JSON.stringify(filter));
    return axiosInstance.get(url.toString());
  },
  async getRevenueByYear(year = null) {
    //lấy data api
    // console.log("fetch list");
    if (!year) {
      year = new Date().getFullYear();
    }
    return axiosInstance.get(
      axiosInstance.defaults.baseURL + "revenue/month/" + year
    );
  },
};
