import axios from "axios";
import axiosInstance from "./axios";

export const Chart = {
  async getByYear(year = null) {
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
