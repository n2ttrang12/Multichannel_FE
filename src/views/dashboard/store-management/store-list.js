import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../../../components/common/search";
import { createArrayFrom1ToN } from "../../../helper";
import { Loading } from "../../../components/common/loading";
import { StoreModel } from "../../../models/store";

const StoreList = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState({}); // state đầu tiên -> rỗng
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const { data: store, pagination } = response;
  const total = pagination?.total ?? 0;

  const totalPage = Math.ceil(total / perPage); // dư 1 sp vân là 1 page
  const fetchList = (page, perPage, search = undefined) => {
    // lấy từ API
    // console.log("aaaa", customer);
    setIsLoading(true);
    StoreModel.getList({
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
            <h4 className="card-title">Danh sách cửa hàng</h4>
          </div>
        </Card.Header>
        <Card.Body>
          <div>
            <Search onEnter={(value) => setSearchText(value)}></Search>
          </div>
          {isLoading ? (
            <Loading></Loading>
          ) : (
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
                    <th>Mã CH</th>
                    <th>Tên cửa hàng</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th>Tên chủ cửa hàng</th>
                    <th>Email chủ cửa hàng</th>
                  </tr>
                </thead>
                <tbody>
                  {store?.map((item) => {
                    // console.log("qqqq", item.orders.length);
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td
                          onClick={() => {
                            navigate("/dashboard/store/" + item.id);
                          }}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          {item.name}
                        </td>
                        <td>{item.phoneNumber}</td>
                        <td>
                          {item.address?.detail +
                            ", " +
                            item.address?.mtWard?.name +
                            ", " +
                            item.address?.mtWard?.name +
                            ", " +
                            item.address?.mtDistrict?.name}
                        </td>
                        <td>{item.storeOwner?.name}</td>
                        <td>{item.storeOwner?.email}</td>
                        {/* <td>
                      <span className={`badge ${item.color}`}>
                        {item.status}
                      </span>
                    </td> */}
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
                    <ul
                      style={{ justifyContent: "end" }}
                      className="pagination"
                    >
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
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default StoreList;
