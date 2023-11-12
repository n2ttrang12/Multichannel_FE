import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
import { Search } from "../../../components/common/search";
import { Customer } from "../../../models/customer";
import { createArrayFrom1ToN } from "../../../helper";

const Data_table = [
  {
    customerId: "KH00001",
    name: "Nguyễn Thu Trang",
    phone: "0987654322",
    debt: "1.000.000",
    totalSpend: "10.000.000",
    totalProducts: "20",
    status: "Đã phát hành",
    color: "bg-success",
  },
  {
    customerId: "KH00001",
    name: "Nguyễn Thu Trang",
    phone: "0987654322",
    debt: "1.000.000",
    totalSpend: "10.000.000",
    totalProducts: "20",
    status: "Ngừng phát hành",
    color: "bg-danger",
  },
  {
    customerId: "KH00001",
    name: "Nguyễn Thu Trang",
    phone: "0987654322",
    debt: "1.000.000",
    totalSpend: "10.000.000",
    totalProducts: "20",
    status: "Ngừng phát hành",
    color: "bg-danger",
  },
  {
    customerId: "KH00001",
    name: "Nguyễn Thu Trang",
    phone: "0987654322",
    debt: "1.000.000",
    totalSpend: "10.000.000",
    totalProducts: "20",
    status: "Đã phát hành",
    color: "bg-success",
  },
  {
    customerId: "KH00001",
    name: "Nguyễn Thu Trang",
    phone: "0987654322",
    debt: "1.000.000",
    totalSpend: "10.000.000",
    totalProducts: "20",
    status: "Ngừng phát hành",
    color: "bg-danger",
  },
  {
    customerId: "KH00001",
    name: "Nguyễn Thu Trang",
    phone: "0987654322",
    debt: "1.000.000",
    totalSpend: "10.000.000",
    totalProducts: "20",
    status: "Đã phát hành",
    color: "bg-success",
  },
  {
    customerId: "KH00001",
    name: "Nguyễn Thu Trang",
    phone: "0987654322",
    debt: "1.000.000",
    totalSpend: "10.000.000",
    totalProducts: "20",
    status: "Ngừng phát hành",
    color: "bg-danger",
  },
  {
    customerId: "KH00001",
    name: "Nguyễn Thu Trang",
    phone: "0987654322",
    debt: "1.000.000",
    totalSpend: "10.000.000",
    totalProducts: "20",
    status: "Đã phát hành",
    color: "bg-success",
  },
  {
    customerId: "KH00001",
    name: "Nguyễn Thu Trang",
    phone: "0987654322",
    debt: "1.000.000",
    totalSpend: "10.000.000",
    totalProducts: "20",
    status: "Đã phát hành",
    color: "bg-success",
  },
  {
    customerId: "KH00001",
    name: "Nguyễn Thu Trang",
    phone: "0987654322",
    debt: "1.000.000",
    totalSpend: "10.000.000",
    totalProducts: "20",
    status: "Ngừng phát hành",
    color: "bg-danger",
  },
];
const CustomerList = () => {
  const [response, setResponse] = useState({}); // state đầu tiên -> rỗng
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(5);
  const { data: customer, pagination } = response;
  const total = pagination?.total ?? 0;

  const totalPage = Math.ceil(total / perPage); // dư 1 sp vân là 1 page
  const fetchList = (page, perPage, search = undefined) => {
    // lấy từ API
    // console.log("aaaa", customer);
    setIsLoading(true);
    Customer.getList({
      page, // Offset
      perPage, // limit,
      search,
    })
      .then(({ data }) => {
        if (!data) {
          return;
        }
        setResponse(data); // set data cho state respone
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    //chạy khi page change khi set page/ text change/ filter
    fetchList(page, perPage, searchText);
  }, [page]);
  useEffect(() => {
    //chạy khi page change khi set page/ text change/ filter
    setPage(1);
    fetchList(1, perPage, searchText);
  }, [searchText]);
  return (
    <>
      <Card>
        {/* {modal} */}

        <Card.Header className="d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Danh sách khách hàng</h4>
          </div>
          <Button className="btn-link text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3">
            <Link to="/dashboard/customer-list/customer">
              <i className="btn-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </i>
              <span>Thêm khách hàng</span>
            </Link>
          </Button>
        </Card.Header>
        <Card.Body>
          <div>
            <Search onEnter={(value) => setSearchText(value)}></Search>
          </div>
          <div className="border-bottom my-3">
            <Table
              responsive
              striped
              id="datatable"
              className=""
              data-toggle="data-table"
            >
              <thead>
                <tr>
                  <th>Mã KH</th>
                  <th>Tên khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Tổng số lượng hàng đã mua</th>
                  <th>Tổng số đơn hàng đã hủy</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {customer?.map((item) => {
                  // console.log("qqqq", item.orders.length);
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.phonenumber}</td>
                      <td>{item.address}</td>
                      <td>{item.orders.length}</td>
                      <td>
                        {
                          item.orders.filter(
                            (order) => order.status === "CANCELLED"
                          ).length
                        }
                      </td>
                      {/* <td>
                      <span className={`badge ${item.color}`}>
                        {item.status}
                      </span>
                    </td> */}
                      <td>
                        <div style={{ float: "right" }}>
                          <Link
                            className="btn btn-sm btn-icon text-primary flex-end"
                            data-bs-toggle="tooltip"
                            title="Edit User"
                            to="#"
                            onClick={() => {
                              "";
                            }}
                          >
                            <span className="btn-inner">
                              <svg
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                fill="blue"
                              >
                                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                              </svg>
                            </span>
                          </Link>
                          <Link
                            className="btn btn-sm btn-icon text-danger"
                            data-bs-toggle="tooltip"
                            title="Delete User"
                            to="#"
                          >
                            <span className="btn-inner">
                              <svg
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                fill="green"
                              >
                                <path
                                  d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 
                          64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
                                />
                              </svg>
                            </span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Row className="align-items-center">
              <Col md="6">
                <div
                  className="dataTables_info"
                  id="datatable_info"
                  role="status"
                  aria-live="polite"
                >
                  {total !== 0
                    ? `Showing ${(page - 1) * perPage + 1} to ${
                        page * perPage <= total ? page * perPage : total
                      } of ${pagination?.total ?? 0} entries`
                    : null}
                </div>
              </Col>
              <Col md="6" style={{ paddingTop: 16 }}>
                <div
                  className="dataTables_paginate paging_simple_numbers"
                  id="datatable_paginate"
                >
                  <ul style={{ justifyContent: "end" }} className="pagination">
                    {createArrayFrom1ToN(totalPage).map((pageIndex) => {
                      return (
                        <li
                          className={
                            "paginate_button page-item " +
                            (page === pageIndex ? "active" : "")
                          }
                          id={pageIndex}
                          onClick={() => setPage(pageIndex)}
                        >
                          <Link
                            to="#"
                            aria-controls="datatable"
                            aria-disabled="true"
                            data-dt-idx="previous"
                            tabIndex="0"
                            className="page-link"
                          >
                            {pageIndex}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default CustomerList;
