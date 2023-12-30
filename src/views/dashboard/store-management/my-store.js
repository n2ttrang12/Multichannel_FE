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

import { StoreModel } from "../../../models/store";

const MyStoreDetail = () => {
  let { id: paramId } = useParams();

  const navigate = useNavigate();
  const [store, setCustomer] = useState({});
  const [order, setOrder] = useState({});
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [modal, setModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    StoreModel.getMystore()
      .then(({ data: { data: store } }) => {
        setCustomer(store);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const { id, name, phoneNumber, address, email, storeOwner, connect3party } =
    store;

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
                  <h5 className="card-title"> Thông tin cửa hàng</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <label style={{ fontSize: "14px", paddingBottom: "8px" }}>
                      Mã cửa hàng
                    </label>
                    <p style={{ fontWeight: "500" }}>{id}</p>
                  </Col>
                  <Col md="6">
                    <label style={{ fontSize: "14px", paddingBottom: "8px" }}>
                      Tên cửa hàng{" "}
                    </label>
                    <p style={{ fontWeight: "500" }}>{name}</p>
                  </Col>
                  <Col md="6">
                    <label style={{ fontSize: "14px", paddingBottom: "8px" }}>
                      Số điện thoại{" "}
                    </label>

                    <p style={{ fontWeight: "500" }}> {phoneNumber}</p>
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
                </Row>
                <Row>
                  <Col md="12">
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
                  <h5 className="card-title"> Thông tin chủ cửa hàng</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <label style={{ fontSize: "14px", paddingBottom: "8px" }}>
                      Tên chủ cửa hàng{" "}
                    </label>
                    <p style={{ fontWeight: "500" }}>{storeOwner?.name}</p>
                  </Col>
                  <Col md="6">
                    <label style={{ fontSize: "14px", paddingBottom: "8px" }}>
                      Số điện thoại{" "}
                    </label>
                    <p style={{ fontWeight: "500" }}>
                      {storeOwner?.phonenumber}
                    </p>
                  </Col>
                  {email ? (
                    <Col md="6">
                      <label style={{ fontSize: "14px", paddingBottom: "8px" }}>
                        Email{" "}
                      </label>
                      <p style={{ fontWeight: "500" }}>{storeOwner?.email}</p>
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
                  <h5 className="card-title"> Thông tin kênh bán hàng</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <label style={{ fontSize: "14px", paddingBottom: "8px" }}>
                      Tên kênh bán hàng
                    </label>
                    <p style={{ fontWeight: "500" }}>{connect3party?.type}</p>
                  </Col>
                  <Col md="6">
                    <label style={{ fontSize: "14px", paddingBottom: "8px" }}>
                      Shop key
                    </label>
                    <p style={{ fontWeight: "500" }}>
                      {connect3party?.shopKey}
                    </p>
                  </Col>

                  <Col md="6">
                    <label style={{ fontSize: "14px", paddingBottom: "8px" }}>
                      Secret key{" "}
                    </label>
                    <p style={{ fontWeight: "500" }}>
                      {connect3party?.secretKey}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MyStoreDetail;
