import React, { useContext, useEffect, useReducer, useState } from "react";
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
import { SupplierModel } from "../../../models/supplier";
import * as moment from "moment";
import "moment/locale/vi";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../../components/common/success-modal";
import { Order as OrderModel } from "../../../models/order";
import { ErrorModal } from "../../../components/common/fail-modal";
import { ConfirmModal } from "../../../components/common/confirm-modal";
import { Loading } from "../../../components/common/loading";
import { currencyFormatter, formatter } from "../../../helper";
import UserContext from "../../../contexts/userContext";

const OrderDetail = () => {
  let { id: paramId } = useParams();

  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [modal, setModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isStore } = useContext(UserContext);
  useEffect(() => {
    setIsLoading(true);
    OrderModel.get(paramId)
      .then(({ data: { data: order } }) => {
        setOrder(order);
      })
      .finally(() => setIsLoading(false));

    OrderModel.getAllOrderStatus().then(({ data: statuses }) => {
      setOrderStatuses(statuses);
    });
  }, []);

  const {
    id,
    sendoId,
    voucher,
    status,
    deliveryStatus,
    paymentStatus,
    customer: {
      id: customerId,
      name: customerName,
      phonenumber,
      address,
      createdAt: customerCreatedAt,
    } = {},
    dicounts,
    type,
    createdAt,
    orderItems,
  } = order;

  const onChange = () => {};
  const getProductVariantName = (product, price) => {
    let name = product?.name;

    if (price.variant) {
      name = name + " - " + price.variant.value;
    }

    if (price.variant2) {
      name = name + " - " + price.variant2.value;
    }

    return name;
  };

  const subTotal = orderItems
    ?.map(
      (orderItem) => orderItem.quantity * orderItem.productPrice.exportPrice
    )
    .reduce((total, price) => total + price, 0);
  const discount = voucher
    ? voucher?.discount + (voucher?.percent * subTotal) / 100
    : 0;
  const total = !discount ? subTotal : subTotal - discount;

  return (
    <>
      {modal}
      <div className="product">
        <Row>
          <Col sm="12" lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h5 className="card-title"> Thông tin đơn hàng</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <Row>
                      <Col md="6">
                        <p>Mã đơn hàng </p>
                      </Col>
                      <Col md="6">
                        <p>{": " + id} </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <Row>
                      <Col md="6">
                        <p>Kênh bán hàng </p>
                      </Col>
                      <Col md="6">
                        <p> {": " + type}</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Row>
                      <Col md="6">
                        <p>Trạng thái thanh toán </p>
                      </Col>
                      <Col md="6">
                        <p>
                          {paymentStatus == "NOT_PAID"
                            ? ": Chưa thanh toán"
                            : ": Đã thanh toán"}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <Row>
                      <Col md="6">
                        <p>Ngày tạo</p>
                      </Col>
                      <Col md="6">
                        <p>{": " + moment(createdAt).format("L")}</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Col md="6">
                    <Row>
                      <Col
                        md="6"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <p>Trạng thái đơn hàng</p>
                      </Col>
                      <Col md="6">
                        {isLoading ? (
                          <Loading></Loading>
                        ) : (
                          <Form.Group className="form-group">
                            {/* <Form.Label htmlFor="validationDefault02">
                        Trạng thái
                      </Form.Label> */}
                            <Form.Select
                              disabled={type != "WEBSITE" || !isStore}
                              value={status}
                              onChange={(e) => {
                                const newStatus = e.target.value;

                                setModal(
                                  <ConfirmModal
                                    onConfirm={() => {
                                      setModal(null);
                                      setIsLoading(true);
                                      OrderModel.updateStatusOrder(
                                        id,
                                        newStatus
                                      )
                                        .then(() => {
                                          setOrder({
                                            ...order,
                                            status: newStatus,
                                          });
                                          setModal(
                                            <SuccessModal
                                              handleCloseModal={() => {
                                                setModal(null);
                                                // navigate(
                                                //   "/dashboard/order-management/list"
                                                // );
                                              }}
                                              message={`Đã chuyển trạng thái từ ${status} sang ${newStatus}`}
                                            ></SuccessModal>
                                          );
                                        })
                                        .catch((e) => {
                                          setModal(
                                            <ErrorModal
                                              handleCloseModal={() =>
                                                setModal(null)
                                              }
                                              errorMessage={`Chuyển trạng thái không thành công`}
                                            ></ErrorModal>
                                          );
                                        })
                                        .finally(() => setIsLoading(false));
                                    }}
                                    handleCloseModal={() => {
                                      setModal(null);
                                      // navigate(
                                      //   "/dashboard/order-management/list"
                                      // );
                                    }}
                                    message={`Bán có chắc muốn chuyển trạng thái từ ${status} sang ${newStatus}. Thao tác này sẽ không hoàn lại được`}
                                  ></ConfirmModal>
                                );
                              }}
                              id="validationDefault04"
                              required
                            >
                              {orderStatuses?.map((orderStatus) => {
                                const statuses = orderStatuses?.map(
                                  (s) => Object.values(s)[0]
                                );
                                const _status = Object.values(orderStatus)[0];
                                return _status == "NEW" ||
                                  _status == "PROCESSING" ||
                                  _status == "SHIPPING" ||
                                  _status == "COMPLETED" ||
                                  _status == "CANCELLED" ? (
                                  <option
                                    disabled={
                                      statuses.indexOf(_status) <
                                      statuses.indexOf()
                                    }
                                    value={_status}
                                  >
                                    {_status}
                                  </option>
                                ) : (
                                  ""
                                );
                              })}
                            </Form.Select>
                          </Form.Group>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  {status == "SHIPPING" ? (
                    <Col md="6">
                      <Row>
                        <Col
                          md="6"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <p>Trạng thái giao hàng</p>
                        </Col>
                        <Col md="6">
                          <p>{": " + deliveryStatus}</p>
                        </Col>
                      </Row>
                    </Col>
                  ) : (
                    ""
                  )}
                </Row>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h5 className="card-title"> Thông tin khách hàng</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  {/* <Col md="4">
                    <Row>
                      <Col md="6">
                        <p>Mã khách hàng </p>
                      </Col>
                      <Col md="6">
                        <p>{": " + customerId} </p>
                      </Col>
                    </Row>
                  </Col> */}
                  <Col md="6">
                    <Row>
                      <Col md="6">
                        <p>Tên khách hàng </p>
                      </Col>
                      <Col md="6">
                        <p> {": " + customerName}</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <Row>
                      <Col md="6">
                        <p>Số điện thoại </p>
                      </Col>
                      <Col md="6">
                        <p> {": " + phonenumber}</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <p>Địa chỉ </p>
                      </Col>
                      <Col>
                        <p>
                          {" "}
                          {": " +
                            address?.detail +
                            ", " +
                            address?.mtWard?.name +
                            ", " +
                            address?.mtDistrict?.name +
                            ", " +
                            address?.mtProvince?.name}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col md="12"></Col>
                </Row>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h5 className="card-title">Danh sách sản phẩm</h5>
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
                      {/* <th>Ảnh</th> */}
                      <th>Tên sản phẩm</th>
                      <th>Mã vạch</th>
                      <th>Loại sản phẩm</th>

                      <th>Đơn vị</th>
                      <th>Giá bán</th>
                      <th>Số lượng</th>
                      <th>Thành tiền</th>
                      {/* <th>Trạng thái</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems?.map((orderItem) => {
                      const item = orderItem.product;
                      const listPrices =
                        item.productPrices?.map((price) =>
                          parseInt(price.exportPrice)
                        ) ?? [];

                      const minPrice = Math.min(...listPrices);
                      const maxPrice = Math.max(...listPrices);

                      return (
                        <tr key={item.id}>
                          <td
                            onClick={() => {
                              navigate(
                                "/dashboard/product-management/product-list/product/" +
                                  item.id
                              );
                            }}
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            {item.productPhotos
                              ?.slice(0, 1)
                              .map((productPhoto) => {
                                return (
                                  <img
                                    style={{
                                      width: "80px",
                                      objectFit: "cover",
                                    }}
                                    src={productPhoto.url}
                                  ></img>
                                );
                              })}
                            <a>
                              {getProductVariantName(
                                item,
                                orderItem.productPrice
                              )}
                            </a>
                          </td>
                          <td>{item.barcode}</td>
                          <td>{item.category?.name}</td>
                          <td>{item.unit?.name}</td>
                          {/* <td
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></td> */}
                          <td>
                            {/* {item.productPrices?.map((productPrices) => {
                        return productPrices.exportPrice;
                      })} */}
                            {currencyFormatter.format(
                              orderItem.productPrice.exportPrice
                            )}
                          </td>
                          <td>{orderItem.quantity}</td>
                          <td>
                            {currencyFormatter.format(
                              orderItem.productPrice.exportPrice *
                                orderItem.quantity
                            )}
                          </td>
                          {/* <td>
                  <span className={`badge ${item.color}`}>{item.status}</span>
                </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
              <Row
                style={{
                  margin: "0 24px 24px 24px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Col md="6">
                  <Row>
                    <Col md="6">
                      <p style={{ fontWeight: "500" }}>Thành tiền </p>
                    </Col>
                    <Col>
                      <p style={{ fontWeight: "700" }}>
                        {": " + currencyFormatter.format(subTotal)}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <p style={{ fontWeight: "500" }}>Tổng giảm giá </p>
                    </Col>
                    <Col>
                      {/* <p style={{ fontWeight: "700" }}> {""}</p> */}
                      <p style={{ fontWeight: "700" }}>
                        {" "}
                        :
                        <span style={{ color: "red" }}>
                          {" "}
                          {" - " + currencyFormatter.format(discount)}
                        </span>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <p style={{ fontWeight: "500" }}>Tổng tiền </p>
                    </Col>
                    <Col>
                      <p style={{ fontWeight: "700" }}>
                        {" "}
                        {": " + currencyFormatter.format(total)}
                      </p>
                      {/* <p style={{ fontWeight: "700" }}> {": " + total}</p> */}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderDetail;
