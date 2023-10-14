export const Category = {
  getList({ page, perPage }) {
    //lấy data api
    const baseUrl = "http://localhost:8001/api/v1/multi-chanel/category";
    const url = new URL(baseUrl);
    url.searchParams.append("page", page); // nososi vào url để khai báo page
    url.searchParams.append("perPage", perPage); // nối để lấy perpage

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
};
