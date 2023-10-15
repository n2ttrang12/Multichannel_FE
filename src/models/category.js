import axios from "axios";

export const Category = {
  async getList({ page, perPage, search = undefined }) {
    //lấy data api
    console.log("fetch list");
    const baseUrl = "http://localhost:8001/api/v1/multi-chanel/category";
    const url = new URL(baseUrl);
    url.searchParams.append("page", page); // nososi vào url để khai báo page
    url.searchParams.append("perPage", perPage); // nối để lấy perpage
    if (search) url.searchParams.append("fullTextSearch", search); // nối để lấy perpage

    return fetch(url.toString(), {
      // get api
      method: "GET",
      headers: {
        //todo get from state or somewhere else
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // nếu oke thì parse object
      })
      .then((data) => {
        return data; // then trả về data
      })
      .catch((error) => {
        console.error("Error:", error); // báo lõi
      });
  },
  async addCategory(name, parentId = null) {
    const baseUrl = "http://localhost:8001/api/v1/multi-chanel/category/create";
    const url = new URL(baseUrl);

    return axios.post(
      url,
      {
        name,
        parentId,
      },
      {
        headers: {
          //todo get from state or somewhere else
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
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
    const baseUrl = `http://localhost:8001/api/v1/multi-chanel/category/delete/${id}`;
    const url = new URL(baseUrl);

    return axios.post(
      url,
      {},
      {
        headers: {
          //todo get from state or somewhere else
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
  },
};
