import React, { useContext, useEffect, useReducer, useState } from "react";
import { Form, Row, Col, Table, Button, Modal } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../../../components/common/search";
import { createArrayFrom1ToN, currencyFormatter } from "../../../helper";
import { Loading } from "../../../components/common/loading";
import { VoucherModel } from "../../../models/voucher";
import * as moment from "moment";
import "moment/locale/vi";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import UserContext from "../../../contexts/userContext";
import "../../../components/common/datepicker.css";
const VoucherList = () => {
  const navigate = useNavigate();
  const { isStore } = useContext(UserContext);
  const [response, setResponse] = useState({}); // state đầu tiên -> rỗng
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const { data: voucher, pagination } = response;
  const total = pagination?.total ?? 0;
  const [modal, setModal] = useState(null);
  const totalPage = Math.ceil(total / perPage); // dư 1 sp vân là 1 page
  const fetchList = (page, perPage, search = undefined) => {
    // lấy từ API
    setIsLoading(true);
    VoucherModel.getList({
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
  const AddVoucherModel = ({ id }) => {
    const [isPercentage, setIsPercentage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isInvalidCode, setInvalidCode] = useState(false);
    const [isInvalidToDate, setInvalidToDate] = useState(false);
    const [isInvalidDateRage, setInvalidDateRage] = useState(false);
    const [isInvalidFromDate, setInvalidFromDate] = useState(false);
    const [isInvalidAvailable, setInvalidAvailable] = useState(false);
    const [isInvalidDiscount, setInvalidDiscount] = useState(false);
    const [isInvalidPercent, setInvalidPercent] = useState(false);

    const [voucher, dispatch] = useReducer(
      (state, action) => {
        switch (action.type) {
          case "SET_CODE":
            return {
              ...state,
              code: action.payload,
            };
          case "SET_AVAILABLE":
            return {
              ...state,
              available: action.payload,
            };
          case "SET_FROM_DATE":
            return {
              ...state,
              fromDate: action.payload,
            };
          case "SET_TO_DATE":
            return {
              ...state,
              toDate: action.payload,
            };
          case "SET_DISCOUNT":
            return {
              ...state,
              discount: action.payload,
            };
          case "SET_PERCENT":
            return {
              ...state,
              percent: action.payload,
            };
          case "SET_VOUCHER":
            return {
              ...action.payload,
            };
        }
      },
      {
        code: "",
        available: 0,
        fromDate: new Date().toISOString(),
        toDate: new Date().toISOString(),
        percent: 0,
        discount: 0,
      }
    );

    const { code, available, fromDate, toDate, percent, discount } = voucher;
    useEffect(() => {
      if (isPercentage) {
        validateDiscount();
        dispatch({
          type: "SET_DISCOUNT",
          payload: 0,
        });
      } else {
        validatePercent();
        dispatch({
          type: "SET_PERCENT",
          payload: 0,
        });
      }
    }, [isPercentage]);

    useEffect(() => {
      console.log("rerender");
      if (id) {
        //mode edit => fetch sản phẩm về
        setIsLoading(true);
        VoucherModel.get(id)
          .then((res) => {
            const voucher = res?.data?.data;

            setIsPercentage(voucher?.percent ? true : false);
            dispatch({
              type: "SET_VOUCHER",
              payload: voucher,
            });
          })
          .finally(() => setIsLoading(false));
      }
    }, []);
    const validateCode = () => {
      if (!code || code.trim().length <= 0) {
        setInvalidCode(true);
        return false;
      } else {
        setInvalidCode(false);
        return true;
      }
    };
    const validateFromDate = () => {
      console.log(fromDate);
      if (!fromDate || fromDate.trim().length <= 0) {
        setInvalidFromDate(true);
        return false;
      } else {
        setInvalidFromDate(false);
        return true;
      }
    };
    const validateToDate = () => {
      console.log(toDate);
      if (!toDate || toDate.trim().length <= 0) {
        setInvalidToDate(true);
        return false;
      } else {
        if (fromDate >= toDate) {
          setInvalidDateRage(true);
          return false;
        }

        setInvalidDateRage(false);
        setInvalidToDate(false);
        return true;
      }
    };
    const validateAvailable = () => {
      if (!available || available <= 0) {
        setInvalidAvailable(true);
        return false;
      } else {
        setInvalidAvailable(false);
        return true;
      }
    };
    const validateDiscount = () => {
      if (!isPercentage && (!discount || discount <= 0)) {
        setInvalidDiscount(true);
        return false;
      } else {
        setInvalidDiscount(false);
        return true;
      }
    };
    const validatePercent = () => {
      if (isPercentage && (!percent || percent <= 0)) {
        setInvalidPercent(true);
        return false;
      } else {
        setInvalidPercent(false);
        return true;
      }
    };

    return (
      <Modal size="lg" show={true} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {id ? "Chỉnh sửa Voucher" : "Tạo mới voucher"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <Loading></Loading>
          ) : (
            <>
              <Row>
                <Col md="6">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mã voucher</Form.Label>
                    <Form.Control
                      disabled={!isStore}
                      isInvalid={isInvalidCode}
                      type="text"
                      value={code}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_CODE",
                          payload: e.target.value,
                        })
                      }
                    />
                    <Form.Control.Feedback type={"invalid"} className="invalid">
                      Vui lòng nhập mã voucher
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Số lượng</Form.Label>
                    <Form.Control
                      disabled={!isStore}
                      isInvalid={isInvalidAvailable}
                      type="number"
                      value={available}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_AVAILABLE",
                          payload: e.target.value,
                        })
                      }
                    />
                    <Form.Control.Feedback type={"invalid"} className="invalid">
                      Số lượng voucher phải lớn hơn 0
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Form.Group controlId="startDate">
                    <Form.Label>
                      <span style={{ marginRight: "24px" }}>Bắt đầu</span>{" "}
                    </Form.Label>
                    <DateTimePicker
                      disabled={!isStore}
                      disableClock
                      format="dd/MM/y h:mm:ss a"
                      value={fromDate}
                      onChange={(date) => {
                        dispatch({
                          type: "SET_FROM_DATE",
                          payload: date?.toISOString() ?? "",
                        });
                      }}
                    />
                    {isInvalidFromDate ? (
                      <p
                        style={{ display: "block" }}
                        className="invalid-feedback"
                      >
                        Vui lòng chọn ngày bắt đầu.
                      </p>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group controlId="endDate">
                    <Form.Label>
                      <span style={{ marginRight: "24px" }}>Kết thúc</span>
                    </Form.Label>
                    <DateTimePicker
                      disabled={!isStore}
                      disableClock
                      format="dd/MM/y h:mm:ss a"
                      value={toDate}
                      onChange={(date) => {
                        dispatch({
                          type: "SET_TO_DATE",
                          payload: date?.toISOString() ?? "",
                        });
                      }}
                    />
                    {isInvalidToDate ? (
                      <p
                        style={{ display: "block" }}
                        className="invalid-feedback"
                      >
                        Vui lòng chọn ngày kết thúc.
                      </p>
                    ) : isInvalidDateRage ? (
                      <p
                        style={{ display: "block" }}
                        className="invalid-feedback"
                      >
                        Ngày kết thúc lớn hơn ngày bắt đầu
                      </p>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Form.Check>
                    <Form.Check.Input
                      disabled={!isStore}
                      isInvalid={isInvalidDiscount}
                      type="radio"
                      name="customRadio0"
                      id="automatically"
                      onChange={() => setIsPercentage(false)}
                      checked={!isPercentage}
                    />{" "}
                    <Form.Check.Label htmlFor="automatically" className="pl-2">
                      Giảm tiền
                    </Form.Check.Label>
                  </Form.Check>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    {/* <Form.Label>Giảm tiền</Form.Label> */}
                    <Form.Control
                      isInvalid={isInvalidDiscount}
                      disabled={isPercentage || !isStore}
                      type="number"
                      value={discount}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_DISCOUNT",
                          payload: e.target.value,
                        })
                      }
                    />
                    <Form.Control.Feedback type={"invalid"} className="invalid">
                      Số tiền giảm giá phải lớn hơn 0
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Check>
                    <Form.Check.Input
                      disabled={!isStore}
                      type="radio"
                      name="customRadio0"
                      id="automatically"
                      checked={isPercentage}
                      onChange={() => setIsPercentage(true)}
                    />{" "}
                    <Form.Check.Label htmlFor="automatically" className="pl-2">
                      Giảm phần trăm
                    </Form.Check.Label>
                  </Form.Check>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    {/* <Form.Label>Giảm phần trăm</Form.Label> */}
                    <Form.Control
                      isInvalid={isInvalidPercent}
                      disabled={!isPercentage || !isStore}
                      type="number"
                      value={percent}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_PERCENT",
                          payload: e.target.value,
                        })
                      }
                    />
                    <Form.Control.Feedback type={"invalid"} className="invalid">
                      Phần trăm giảm phải lớn hơn 0
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isStore ? (
            <Button
              variant="primary"
              onClick={() => {
                const isValidCode = validateCode();
                const isValidToDate = validateToDate();
                const isValidFromDate = validateFromDate();
                const isValidAvailable = validateAvailable();
                const isValidDiscount = validateDiscount();
                const isValidPercent = validatePercent();
                if (
                  !isValidCode ||
                  !isValidFromDate ||
                  !isValidToDate ||
                  !isValidAvailable ||
                  !isValidDiscount ||
                  !isValidPercent
                ) {
                  return;
                }
                let promise = null;
                if (id) {
                  promise = VoucherModel.updateVoucher(id, voucher);
                } else {
                  promise = VoucherModel.addVoucher(voucher);
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
            </Button>
          ) : (
            ""
          )}
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
            <h4 className="card-title">Danh sách Voucher</h4>
          </div>
          {isStore ? (
            <Button
              className="btn-link text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3"
              onClick={() => setModal(<AddVoucherModel />)}
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
              <span>Tạo voucher</span>
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
                    <th>Mã Voucher</th>
                    <th>Số lượng voucher</th>
                    <th>Giảm tiền </th>
                    <th>Giảm phần trăm</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Ngày tạo</th>
                    {isStore ? <th>Thao tác</th> : ""}
                  </tr>
                </thead>
                <tbody>
                  {voucher?.map((item) => {
                    // console.log(item.address);
                    return (
                      <tr key={item.code}>
                        <td
                          onClick={() => {
                            setModal(
                              <AddVoucherModel
                                id={item.id}
                                handleCloseModal={() => setModal(null)}
                              />
                            );
                          }}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          {item.code}
                        </td>
                        <td>{item.available}</td>
                        <td>
                          {item.discount > 0
                            ? currencyFormatter.format(item.discount)
                            : "--"}
                        </td>
                        <td>{item.percent > 0 ? item.percent : "--"}</td>
                        <td>
                          {item.fromDate
                            ? moment(item.fromDate).format(
                                "DD/MM/YYYY HH:mm:ss"
                              )
                            : null}
                        </td>
                        <td>
                          {item.toDate
                            ? moment(item.toDate).format("DD/MM/YYYY HH:mm:ss")
                            : null}
                        </td>
                        <td>
                          {item.createdAt
                            ? moment(item.createdAt).format(
                                "DD/MM/YYYY HH:mm:ss"
                              )
                            : null}
                        </td>

                        {isStore ? (
                          <td>
                            <div style={{ float: "right" }}>
                              <Link
                                className="btn btn-sm btn-icon text-primary flex-end"
                                data-bs-toggle="tooltip"
                                title="Edit Voucher"
                                to="#"
                                onClick={() => {
                                  setModal(
                                    <AddVoucherModel
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
                              <Link
                                className="btn btn-sm btn-icon text-danger"
                                data-bs-toggle="tooltip"
                                title="Delete User"
                                to="#"
                                onClick={() =>
                                  setModal(
                                    <AddVoucherModel
                                      supplier={item.id}
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
                          </td>
                        ) : (
                          ""
                        )}
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

export default VoucherList;
