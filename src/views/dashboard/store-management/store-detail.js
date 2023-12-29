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

const StoreDetail = () => {
  let { id: paramId } = useParams();

  const navigate = useNavigate();
  const [store, setCustomer] = useState({});
  const [order, setOrder] = useState({});
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [modal, setModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    StoreModel.get(paramId)
      .then(({ data: { data: store } }) => {
        setCustomer(store);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const { id, name, phoneNumber, address, email, storeOwner } = store;

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
                    <Row>
                      <Col md="6">
                        <p>Mã cửa hàng </p>
                      </Col>
                      <Col>
                        <p>{": " + id} </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <Row>
                      <Col md="6">
                        <p>Tên cửa hàng </p>
                      </Col>
                      <Col>
                        <p> {": " + name}</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <Row>
                      <Col md="6">
                        <p>Số điện thoại </p>
                      </Col>
                      <Col>
                        <p> {": " + phoneNumber}</p>
                      </Col>
                    </Row>
                  </Col>
                  {email ? (
                    <Col md="6">
                      <Row>
                        <Col md="6">
                          <p>Email </p>
                        </Col>
                        <Col>
                          <p> {": " + email}</p>
                        </Col>
                      </Row>
                    </Col>
                  ) : (
                    ""
                  )}
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
                            address?.mtDistrict?.name +
                            ", " +
                            address?.mtProvince?.name +
                            ", " +
                            address?.mtWard?.name}
                        </p>
                      </Col>
                    </Row>
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
                    <Row>
                      <Col md="6">
                        <p>Tên chủ cửa hàng </p>
                      </Col>
                      <Col>
                        <p> {": " + storeOwner?.name}</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <Row>
                      <Col md="6">
                        <p>Số điện thoại </p>
                      </Col>
                      <Col>
                        <p> {": " + storeOwner?.phonenumber}</p>
                      </Col>
                    </Row>
                  </Col>
                  {email ? (
                    <Col md="6">
                      <Row>
                        <Col md="6">
                          <p>Email </p>
                        </Col>
                        <Col>
                          <p> {": " + storeOwner?.email}</p>
                        </Col>
                      </Row>
                    </Col>
                  ) : (
                    ""
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default StoreDetail;
