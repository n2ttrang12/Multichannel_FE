import React, { useEffect, useReducer, useState } from "react";
import {
  Row,
  Col,
  Image,
  Modal,
  Form,
  Button,
  Table,
  FormGroup,
} from "react-bootstrap";
import Card from "../../../components/Card";
import * as moment from "moment";
import "moment/locale/vi";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../../components/common/success-modal";
import { Order as OrderModel } from "../../../models/order";
import { ErrorModal } from "../../../components/common/fail-modal";
import { Customer as CustomerModal } from "../../../models/customer";

const CustomerDetail = () => {
  let { id: paramId } = useParams();

  const navigate = useNavigate();
  const [customer, setCustomer] = useState({});
  const [order, setOrder] = useState({});
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [modal, setModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    CustomerModal.get(paramId)
      .then(({ data: { data: customer } }) => {
        setCustomer(customer);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const { id, name, phonenumber, address, email, createdAt, orders } = customer;

  const onChange = () => {};

  return (
    <>
      {modal}
      <div className="product">
        <Row>
          <Col sm="12" lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h5 className="card-title"> Thông tin khách hàng</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <label style={{ fontSize: "14px", paddingBottom: "8px" }}>
                      Mã khách hàng{" "}
                    </label>
                    <p style={{ fontWeight: "500" }}>{id} </p>
                  </Col>
                  <Col md="6">
                    <label style={{ fontSize: "14px", paddingBottom: "8px" }}>
                      Tên khách hàng{" "}
                    </label>
                    <p style={{ fontWeight: "500" }}> {name}</p>
                  </Col>
                  <Col md="6">
                    <label style={{ fontSize: "14px", paddingBottom: "8px" }}>
                      Số điện thoại{" "}
                    </label>
                    <p style={{ fontWeight: "500" }}>{phonenumber}</p>
                  </Col>
                  {email ? (
                    <Col md="6">
                      <label style={{ fontSize: "14px", paddingBottom: "8px" }}>
                        Email{" "}
                      </label>
                      <p style={{ fontWeight: "500" }}> {email}</p>
                    </Col>
                  ) : (
                    ""
                  )}
                  <Col md="6">
                    <label style={{ fontSize: "14px", paddingBottom: "8px" }}>
                      Địa chỉ{" "}
                    </label>
                    <p style={{ fontWeight: "500" }}>
                      {address?.detail +
                        ", " +
                        address?.mtDistrict?.name +
                        ", " +
                        address?.mtProvince?.name +
                        ", " +
                        address?.mtWard?.name}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h5 className="card-title">Danh sách đơn hàng</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Table
                  responsive
                  striped
                  id="datatable"
                  className=""
                  data-toggle="data-table"
                >
                  <thead>
                    <tr>
                      <th>Mã ĐH</th>
                      <th>Ngày tạo đơn</th>
                      <th>Kênh</th>
                      {/* <th>Tổng tiền</th> */}
                      <th>Trạng thái ĐH</th>
                      <th>Trạng thái vận chuyển</th>
                      <th>Trạng thái thanh toán</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((item) => {
                      const statusColor =
                        item.status === "NEW"
                          ? "primary"
                          : item.status === "COMPLETED"
                          ? "success"
                          : item.status === "SHIPPING"
                          ? "warning"
                          : item.status === "PROCESSING"
                          ? "info"
                          : item.status === "CANCELLED"
                          ? "danger"
                          : "dark";
                      moment.locale("vi");
                      return (
                        <tr key={item.id}>
                          <td
                            onClick={() => {
                              navigate(
                                "/dashboard/order-management/list/order-detail/" +
                                  item.id
                              );
                            }}
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            {"DH" + item.id}
                          </td>
                          <td>
                            {item.createdAt
                              ? moment(item.createdAt).format(
                                  "DD/MM/YYYY HH:mm:ss"
                                )
                              : null}
                          </td>
                          <td>{item.type}</td>
                          {/* <td>{item.subTotal}</td> */}
                          <td>
                            <span className={`badge bg-${statusColor}`}>
                              {item.status}
                            </span>
                          </td>
                          <td>{item.deliveryStatus}</td>
                          <td>{item.paymentStatus}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CustomerDetail;
