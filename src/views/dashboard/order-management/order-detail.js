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
import { SupplierModel } from "../../../models/supplier";

import { useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../../components/common/success-modal";
import { Order as OrderModel } from "../../../models/order";
import { ErrorModal } from "../../../components/common/fail-modal";

const OrderDetail = () => {
  let { id: paramId } = useParams();

  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [modal, setModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    subTotal,
    status,
    deliveryStatus,
    paymentStatus,
    customer: {
      customerId,
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
                  <Col>
                    <p>Mã đơn hàng: {id}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="validationDefault02">
                        Trạng thái
                      </Form.Label>
                      <Form.Select
                        value={status}
                        onChange={(e) => {
                          const newStatus = e.target.value;

                          OrderModel.updateStatusOrder(id, newStatus)
                            .then(() => {
                              setOrder({
                                ...order,
                                status: newStatus,
                              });
                              setModal(
                                <SuccessModal
                                  handleCloseModal={() => setModal(null)}
                                  message={`Đã chuyển trạn thái từ ${status} sang ${newStatus}`}
                                ></SuccessModal>
                              );
                            })
                            .catch((e) => {
                              setModal(
                                <ErrorModal
                                  handleCloseModal={() => setModal(null)}
                                  errorMessage={`Chuyển trạng thái không thành công`}
                                ></ErrorModal>
                              );
                            });
                        }}
                        id="validationDefault04"
                        required
                      >
                        {orderStatuses.map((orderStatus) => {
                          console.log("orderStatus", orderStatus);
                          const _status = Object.values(orderStatus)[0];
                          return <option value={_status}>{_status}</option>;
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md="6"></Col>
                </Row>

                <Row>
                  <Col md="4"></Col>
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
                      <th>Ảnh</th>
                      <th>Tên sản phẩm</th>
                      <th>Mã vạch</th>
                      <th>Loại sản phẩm</th>

                      {/* <th>Nhà cung cấp</th> */}
                      <th>Giá bán</th>
                      {/* <th>Tồn kho</th> */}
                      {/* <th>Ngày tạo</th> */}
                      <th>Trạng thái</th>
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
                          <td>
                            {item.productPhotos
                              ?.slice(0, 1)
                              .map((productPhoto) => {
                                return (
                                  <img
                                    height="80px"
                                    width="80px"
                                    src={productPhoto.url}
                                  ></img>
                                );
                              })}
                          </td>
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
                            <a>{item.name}</a>
                          </td>
                          <td>{item.barcode}</td>
                          <td>{item.category?.name}</td>
                          {/* <td>{item.label}</td> */}
                          {/* <td
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></td> */}
                          <td>
                            {/* {item.productPrices?.map((productPrices) => {
                        return productPrices.exportPrice;
                      })} */}
                            {minPrice && maxPrice ? (
                              minPrice === maxPrice ? (
                                <span>{maxPrice}</span>
                              ) : (
                                <span>
                                  {minPrice} - {maxPrice}
                                </span>
                              )
                            ) : null}
                          </td>
                          {/* <td>{item.stock}</td> */}
                          <td>{item.status}</td>
                          {/* <td>
                  <span className={`badge ${item.color}`}>{item.status}</span>
                </td> */}
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

export default OrderDetail;
