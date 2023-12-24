import axiosInstance from "./axios";

export const Province = {
  async getAll() {
    return axiosInstance.get(axiosInstance.defaults.baseURL + "mt-province");
  },
  async getDistricts(provinceCode) {
    return axiosInstance.get(
      axiosInstance.defaults.baseURL + "mt-district/" + provinceCode
    );
  },
  async getWards(districtCode) {
    return axiosInstance.get(
      axiosInstance.defaults.baseURL + "mt-ward/" + districtCode
    );
  },
};
