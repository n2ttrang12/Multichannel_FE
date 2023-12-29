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
import { WarehouseModal } from "../../../models/warehouse";

const HistoryImportPerProduct = () => {
  let { id: paramId } = useParams();

  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [order, setOrder] = useState({});
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [modal, setModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    WarehouseModal.get(paramId)
      .then(({ data: { data: product } }) => {
        setProduct(product);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const {
    id,
    productPrices,
    quantityInStock,
    quantityInOrder,
    warehouseHistory,
  } = product;

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
                  <h5 className="card-title"> Thông tin sản phẩm</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="3">
                    {productPrices?.product?.productPhotos
                      ?.slice(0, 1)
                      .map((productPhotos) => {
                        return (
                          <img height="200px" src={productPhotos.url}></img>
                        );
                      })}
                  </Col>
                  <Col>
                    <Row>
                      <Col md="6">
                        <Row>
                          <Col md="6">
                            <p>Mã sản phẩm </p>
                          </Col>
                          <Col>
                            <p>{": " + id} </p>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="6">
                        <Row>
                          <Col md="6">
                            <p>Mã barcode </p>
                          </Col>
                          <Col>
                            <p> {": " + productPrices?.product.barcode}</p>
                          </Col>
                        </Row>
                      </Col>
                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <p>Tên sản phẩm </p>
                          </Col>
                          <Col>
                            <p> {": " + productPrices?.product.name}</p>
                          </Col>
                        </Row>
                      </Col>
                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <p>Phân loại</p>
                          </Col>
                          <Col>
                            <p>
                              {" "}
                              {productPrices?.variant &&
                              !productPrices?.variant2
                                ? ": " + productPrices?.variant?.value
                                : !productPrices?.variant &&
                                  productPrices?.variant2
                                ? ": " + productPrices?.variant2?.value
                                : productPrices?.variant &&
                                  productPrices?.variant2
                                ? ": " +
                                  productPrices?.variant?.value +
                                  " / " +
                                  productPrices?.variant2?.value
                                : ""}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <p>Tồn kho </p>
                          </Col>
                          <Col>
                            <p>{": " + quantityInStock}</p>
                          </Col>
                        </Row>
                      </Col>
                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <p>Trong đơn hàng </p>
                          </Col>
                          <Col>
                            <p>{": " + quantityInOrder}</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h5 className="card-title">Lịch sử nhập kho</h5>
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
                      <th>Ngày ghi nhận</th>
                      <th>Kiểu thao tác </th>
                      <th>Số lượng thay đổi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {warehouseHistory?.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>
                            {item.createdAt
                              ? moment(item.createdAt).format(
                                  "DD/MM/YYYY HH:mm:ss"
                                )
                              : null}
                          </td>
                          <td>
                            {item.type == "CREATE_PRODUCT"
                              ? "Tạo sản phẩm"
                              : item.type == "IMPORT_PRODUCT_SUPPLIER"
                              ? "Nhập hàng từ nhà cung cấp"
                              : item.type == "OFFLINE"
                              ? "Bán tại cửa hàng"
                              : item.type == "ONLINE"
                              ? "Bán tại website"
                              : item.type == "CHECK_PRODUCT_IN_STOCK"
                              ? "Cân bằng kho"
                              : "Bán tại website"}
                          </td>
                          <td>{item.quantity}</td>
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

export default HistoryImportPerProduct;
