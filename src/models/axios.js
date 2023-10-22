import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8001/api/v1/multi-chanel/",
  headers: {
    "Content-Type": "application/json",
  },
});

//them access token trước khi gửi request
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

//xu ly truoc khi xu ly response
axiosInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // Access Token was expired
      const refreshToken = localStorage.getItem("refreshToken");
      if (
        refreshToken &&
        err.response.status === 401 &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;

        try {
          const rs = await getAccessToken(refreshToken);
          const { data: accessToken } = rs.data;
          console.log("acc", accessToken);
          window.localStorage.setItem("accessToken", accessToken);
          axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;

          return axiosInstance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

function getAccessToken(refreshToken) {
  return axiosInstance.post("app-user/refresh-token", {
    refreshToken,
  });
}

export default axiosInstance;
