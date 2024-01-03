import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Table, Button, Modal } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../../../components/common/search";
import { createArrayFrom1ToN } from "../../../helper";
import { Loading } from "../../../components/common/loading";
import { WarehouseModal } from "../../../models/warehouse";
import * as moment from "moment";
import "moment/locale/vi";
import UserContext from "../../../contexts/userContext";
const ExamineGoods = () => {
  const { isStore } = useContext(UserContext);
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
    WarehouseModal.getCheckList({
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

  const DeleteCheckGoodsModel = ({ checkGoodId, handleCloseModal }) => {
    return (
      <Modal show={true} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa nhà kiểm kho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{`Bạn có chắc là muốn xóa kiểm kho hay không?`}</p>
          {/* <p>Nếu xóa nhà cung cấp thì sản phẩm của nhà cung cấp đó cũng sẽ bị xóa</p> */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              //handle send api
              WarehouseModal.deleteCheckGoods(checkGoodId)
                .then((response) => fetchList(page, perPage)) // load lại page
                .catch((error) => {
                  alert(error);
                })
                .finally(() => setModal(null)); // đóng modal
            }}
          >
            Xác nhận
          </Button>{" "}
          <Button variant="danger" onClick={handleCloseModal}>
            Hủy bỏ
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <Card>
        {modal}
        <Card.Header className="d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Danh sách kiểm kho</h4>
          </div>
          {isStore ? (
            <Button className="btn-link text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3">
              <Link to="/dashboard/warehouse/check-goods/new">
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
                <span>Kiểm hàng</span>
              </Link>
            </Button>
          ) : (
            ""
          )}
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
                    <th>Mã kiểm kho</th>
                    <th>Ngày tạo</th>
                    <th>SL sản phẩm</th>
                    <th>Nhân viên tạo</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {supplier?.map((item) => {
                    const statusColor =
                      item.status === "INPROCCESS" ? "warning" : "success";
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td
                          onClick={() => {
                            navigate(
                              "/dashboard/warehouse/check-goods/" + item.id
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

                        <td>{item.warehouseHistory?.length}</td>
                        <td>{item.creater?.name}</td>
                        <td>
                          <span className={`badge bg-${statusColor}`}>
                            {item.status === "INPROCCESS"
                              ? "Đang kiểm hàng"
                              : "Hoàn thành"}
                          </span>
                        </td>

                        <td>
                          {isStore && item.status === "INPROCCESS" ? (
                            <div>
                              <Link
                                className="btn btn-sm btn-icon text-danger"
                                data-bs-toggle="tooltip"
                                title="Delete Check Goods"
                                to="#"
                                onClick={() =>
                                  setModal(
                                    <DeleteCheckGoodsModel
                                      checkGoodId={item.id}
                                      handleCloseModal={() => setModal(null)}
                                    />
                                  )
                                }
                              >
                                <span className="btn-inner ">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    fill="red"
                                    viewBox="0 0 448 512"
                                  >
                                    <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                                  </svg>
                                </span>
                              </Link>
                            </div>
                          ) : (
                            ""
                          )}
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

export default ExamineGoods;
