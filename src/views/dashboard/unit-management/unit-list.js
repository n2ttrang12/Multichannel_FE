import React, { useEffect, useReducer, useState } from "react";
import { Form, Row, Col, Table, Button, Modal } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../../../components/common/search";
import { createArrayFrom1ToN } from "../../../helper";
import { Loading } from "../../../components/common/loading";
import { VoucherModel } from "../../../models/voucher";
import * as moment from "moment";
import "moment/locale/vi";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { UnitModel } from "../../../models/unit";

const UnitList = () => {
  const navigate = useNavigate();

  const [response, setResponse] = useState({}); // state đầu tiên -> rỗng
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const { data: unit, pagination } = response;
  const total = pagination?.total ?? 0;
  const [modal, setModal] = useState(null);
  const totalPage = Math.ceil(total / perPage); // dư 1 sp vân là 1 page
  const fetchList = (page, perPage, search = undefined) => {
    // lấy từ API
    setIsLoading(true);
    UnitModel.getList({
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
  const handleCloseModal = () => setModal(null);

  moment.locale("vi");
  const AddUnitModel = ({ id }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isInvalidName, setInvalidName] = useState(false);
    const [unit, dispatch] = useReducer(
      (state, action) => {
        switch (action.type) {
          case "SET_NAME":
            return {
              ...state,
              name: action.payload,
            };
          case "SET_UNIT":
            return {
              ...action.payload,
            };
        }
      },
      {
        name: "",
      }
    );

    const { name } = unit;

    useEffect(() => {
      if (id) {
        //mode edit => fetch sản phẩm về
        setIsLoading(true);
        UnitModel.get(id)
          .then((res) => {
            const unit = res?.data?.data;

            dispatch({
              type: "SET_UNIT",
              payload: unit,
            });
          })
          .finally(() => setIsLoading(false));
      }
    }, []);
    const validateName = () => {
      if (!name || name.trim().length <= 0) {
        setInvalidName(true);
        return false;
      } else {
        setInvalidName(false);
        return true;
      }
    };

    return (
      <Modal show={true} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {id ? "Chỉnh sửa đơn vị" : "Tạo mới đơn vị"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <Loading></Loading>
          ) : (
            <>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Tên đơn vị</Form.Label>
                  <Form.Control
                    isInvalid={isInvalidName}
                    type="text"
                    value={name}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_NAME",
                        payload: e.target.value,
                      })
                    }
                  />
                  <Form.Control.Feedback type={"invalid"} className="invalid">
                    Vui lòng tên đơn vị
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Hủy bỏ
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const isValidName = validateName();

              if (!isValidName) {
                return;
              }
              let promise = null;
              if (id) {
                promise = UnitModel.updateUnit(id, unit);
              } else {
                promise = UnitModel.addUnit(unit);
              }

              promise
                .then((response) => fetchList(page, perPage))
                .catch((error) => {
                  alert(error);
                })
                .finally(() => setModal(null));
            }}
          >
            Lưu
          </Button>{" "}
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
            <h4 className="card-title">Danh sách đơn vị tính</h4>
          </div>
          <Button
            className="btn-link text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3"
            onClick={() => setModal(<AddUnitModel />)}
          >
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
            <span>Tạo đơn vị tính</span>
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
                    <th>Mã đơn vị tính</th>
                    <th>Tên đơn vị tính</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {unit?.map((item) => {
                    // console.log(item.address);
                    return (
                      <tr key={item.id}>
                        <td
                          onClick={() => {
                            setModal(
                              <AddUnitModel
                                id={item.id}
                                handleCloseModal={() => setModal(null)}
                              />
                            );
                          }}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          {item.id}
                        </td>
                        <td
                          onClick={() => {
                            setModal(
                              <AddUnitModel
                                id={item.id}
                                handleCloseModal={() => setModal(null)}
                              />
                            );
                          }}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          {item.name}
                        </td>

                        <td>
                          <div>
                            <Link
                              className="btn btn-sm btn-icon text-primary flex-end"
                              data-bs-toggle="tooltip"
                              title="Edit Voucher"
                              to="#"
                              onClick={() => {
                                setModal(
                                  <AddUnitModel
                                    id={item.id}
                                    handleCloseModal={() => setModal(null)}
                                  />
                                );
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

export default UnitList;
