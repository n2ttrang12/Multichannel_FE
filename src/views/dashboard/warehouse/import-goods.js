import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button, Modal } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../../../components/common/search";
import { createArrayFrom1ToN } from "../../../helper";
import { Loading } from "../../../components/common/loading";
import { WarehouseModal } from "../../../models/warehouse";
import * as moment from "moment";
import "moment/locale/vi";
const ImportGoods = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState({}); // state đầu tiên -> rỗng
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const { data: supplier, pagination } = response;
  const total = pagination?.total ?? 0;
  const [modal, setModal] = useState(null);
  const totalPage = Math.ceil(total / perPage); // dư 1 sp vân là 1 page
  const fetchList = (page, perPage, search = undefined) => {
    // lấy từ API
    setIsLoading(true);
    WarehouseModal.getImportList({
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
        {modal}
        <Card.Header className="d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Danh sách nhập kho</h4>
          </div>
          <Button className="btn-link text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3">
            <Link to="/dashboard/warehouse/import-goods/new">
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
              <span>Nhập hàng</span>
            </Link>
          </Button>
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
                    <th>Ngày tạo</th>
                    <th>Nhân viên tạo</th>
                    <th>Tên nhà cung cấp</th>
                    <th>Người đại diện</th>
                    <th>Số lượng sản phẩm</th>
                    {/* <th>Trạng thái</th> */}
                  </tr>
                </thead>
                <tbody>
                  {supplier?.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td
                          onClick={() => {
                            navigate(
                              "/dashboard/warehouse/import-goods/" + item.id
                            );
                          }}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          {item.createdAt
                            ? moment(item.createdAt).format(
                                "DD/MM/YYYY HH:mm:ss"
                              )
                            : null}
                        </td>
                        <td>{item.creater?.name}</td>
                        <td>{item.supplier?.name}</td>
                        <td>{item.supplier?.personalContactName}</td>
                        <td>{item.warehouseHistory?.length}</td>

                        {/* <td>
                          {item.status}
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

export default ImportGoods;
