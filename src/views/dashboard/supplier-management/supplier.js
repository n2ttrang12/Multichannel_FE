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
import ImageUploading from "react-images-uploading";
import Card from "../../../components/Card";
import { Product as ProductModel } from "../../../models/product";
import { useNavigate } from "react-router-dom";

const SuccessModel = ({ handleCloseModal }) => {
  return (
    <Modal show={true} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{`Thêm sản phẩm mới thành công`}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleCloseModal}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Supplier = () => {
  //form validation
  const [isInvalidName, setInvalidName] = useState(false);
  const [isInvalidBarcode, setInvalidBarcode] = useState(false);
  const [isInvalidDescription, setInvalidDescription] = useState(false);
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [images, setImages] = useState([]);
  const maxNumber = 5;
  const [variants, setVariants] = useState([]);
  const [units, setUnits] = useState([]);
  useEffect(() => {
    ProductModel.getUnits().then(({ data: { data: units } }) => {
      setUnits(units);
      dispatchProduct({
        type: "SET_UNIT",
        payload: units[0].id,
      });
    });
  }, []);

  const [product, dispatchProduct] = useReducer(
    (state, action) => {
      console.log(action);
      switch (action.type) {
        case "SET_NAME":
          return {
            ...state,
            name: action.payload,
          };
        case "SET_STATUS":
          return {
            ...state,
            status: action.payload,
          };
        case "SET_CODE":
          return {
            ...state,
            code: action.payload,
          };
        case "SET_BARCODE":
          return {
            ...state,
            barcode: action.payload,
          };
        case "SET_DESCRIPTION":
          return {
            ...state,
            description: action.payload,
          };

        case "SET_PHOTOS":
          return {
            ...state,
            photoList: action.payload,
          };

        case "SET_PRICES":
          return {
            ...state,
            priceList: action.payload,
          };

        case "SET_CATEGORY":
          return {
            ...state,
            categoryId: action.payload,
          };

        case "SET_UNIT":
          return {
            ...state,
            unitId: action.payload,
          };

        default:
          return state;
      }
    },
    {
      name: "",
      status: "SALE",
      code: "",
      barcode: "",
      description: "",
      photoList: [],
      priceList: [
        {
          price: "",
          quantity: "",
          sku: "",
        },
      ],
      //Thời Trang Nữ | Quần nữ | Quần jean nữ
      categoryId: 6268,
      unitId: 0,
    }
  );

  const {
    name,
    status,
    code,
    barcode,
    description,
    photoList,
    priceList,
    categoryId,
    unitId,
  } = product;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const validateName = () => {
    if (!name || name.trim().length < 10) {
      setInvalidName(true);
      return false;
    } else {
      setInvalidName(false);
      return true;
    }
  };
  const validateBarcode = () => {
    if (!barcode || barcode.trim().length <= 0) {
      setInvalidBarcode(true);
      return false;
    } else {
      setInvalidBarcode(false);
      return true;
    }
  };

  const validateDescription = () => {
    if (!description || description.trim().length <= 100) {
      setInvalidDescription(true);
      return false;
    } else {
      setInvalidDescription(false);
      return true;
    }
  };

  return (
    <>
      {modal}
      <div className="product">
        <Row>
          <Col sm="12" lg="8">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h5 className="card-title"> Thông tin chung</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group className="form-group">
                      <Form.Label md="6" htmlFor="validationDefault01">
                        Tên khách hàng
                        <span className="text-danger"> {" *"}</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={name}
                        isInvalid={isInvalidName}
                        id="validationDefault01"
                        onChange={(e) =>
                          dispatchProduct({
                            type: "SET_NAME",
                            payload: e.target.value,
                          })
                        }
                        onBlur={() => validateName()}
                      />
                      <Form.Control.Feedback
                        type={"invalid"}
                        className="invalid"
                      >
                        Vui lòng nhập ít nhất 10 ký tự.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group className="form-group">
                      <Form.Label md="6" htmlFor="validationDefault01">
                        Số điện thoại
                        <span className="text-danger"> {" *"}</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={code}
                        id="validationDefault01"
                        onChange={(e) =>
                          dispatchProduct({
                            type: "SET_CODE",
                            payload: e.target.value,
                          })
                        }
                      />
                      <Form.Control.Feedback
                        type={"invalid"}
                        className="invalid"
                      >
                        Vui lòng nhập sdt.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="form-group">
                      <Form.Label md="6" htmlFor="validationDefault01">
                        Email
                        <span className="text-danger"> {" *"}</span>
                      </Form.Label>
                      <Form.Control
                        isInvalid={isInvalidBarcode}
                        onChange={(e) =>
                          dispatchProduct({
                            type: "SET_BARCODE",
                            payload: e.target.value,
                          })
                        }
                        value={barcode}
                        type="text"
                        id="validationDefault01"
                        onBlur={() => validateBarcode()}
                      />
                      <Form.Control.Feedback
                        type={"invalid"}
                        className="invalid"
                      >
                        Vui lòng nhập email.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md="4">
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="validationDefault02">
                        Tỉnh/TP
                      </Form.Label>
                      <Form.Select
                        value={unitId}
                        onChange={(e) =>
                          dispatchProduct({
                            type: "SET_UNIT",
                            payload: e.target.value,
                          })
                        }
                        id="validationDefault04"
                        required
                      >
                        {units.map(({ id, name }) => {
                          return <option value={id}>{name}</option>;
                        })}
                        <Form.Control.Feedback
                          type={"invalid"}
                          className="invalid"
                        >
                          Vui lòng chọn tỉnh/TP.
                        </Form.Control.Feedback>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="form-group">
                      <Form.Label md="6" htmlFor="validationDefault01">
                        Quận/Huyện
                        <span className="text-danger"> {" *"}</span>
                      </Form.Label>
                      <Form.Select
                        value={unitId}
                        onChange={(e) =>
                          dispatchProduct({
                            type: "SET_UNIT",
                            payload: e.target.value,
                          })
                        }
                        id="validationDefault04"
                        required
                      >
                        {units.map(({ id, name }) => {
                          return <option value={id}>{name}</option>;
                        })}
                        <Form.Control.Feedback
                          type={"invalid"}
                          className="invalid"
                        >
                          Vui lòng chọn Quận/huyện.
                        </Form.Control.Feedback>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="form-group">
                      <Form.Label md="6" htmlFor="validationDefault01">
                        Phường/Xã
                        <span className="text-danger"> {" *"}</span>
                      </Form.Label>
                      <Form.Select
                        value={unitId}
                        onChange={(e) =>
                          dispatchProduct({
                            type: "SET_UNIT",
                            payload: e.target.value,
                          })
                        }
                        id="validationDefault04"
                        required
                      >
                        {units.map(({ id, name }) => {
                          return <option value={id}>{name}</option>;
                        })}
                        <Form.Control.Feedback
                          type={"invalid"}
                          className="invalid"
                        >
                          Vui lòng chọn phường/xã.
                        </Form.Control.Feedback>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="form-group">
                  <Form.Label md="6" htmlFor="validationDefault01">
                    Địa chỉ cụ thể
                    <span className="text-danger"> {" *"}</span>
                  </Form.Label>
                  <Form.Control
                    isInvalid={isInvalidBarcode}
                    onChange={(e) =>
                      dispatchProduct({
                        type: "SET_BARCODE",
                        payload: e.target.value,
                      })
                    }
                    value={barcode}
                    type="text"
                    id="validationDefault01"
                    onBlur={() => validateBarcode()}
                  />
                  <Form.Control.Feedback type={"invalid"} className="invalid">
                    Vui lòng nhập địa chỉ cụ thể.
                  </Form.Control.Feedback>
                </Form.Group>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h5 className="card-title"> Thông tin bổ sung</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <Form.Group className="form-group">
                      <Form.Label md="6" htmlFor="validationDefault01">
                        Ngày sinh
                      </Form.Label>
                      <Form.Control
                        type="date"
                        id="exampleInputdate"
                        defaultValue="2019-12-18"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="form-group">
                      <Form.Label md="6" htmlFor="validationDefault01">
                        Giới tính
                        <span className="text-danger"> {" *"}</span>
                      </Form.Label>
                      <Form.Select
                        value={unitId}
                        onChange={(e) =>
                          dispatchProduct({
                            type: "SET_UNIT",
                            payload: e.target.value,
                          })
                        }
                        id="validationDefault04"
                      >
                        {units.map(({ id, name }) => {
                          return <option value={id}>{name}</option>;
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group className="form-group">
                      <Form.Label md="6" htmlFor="validationDefault01">
                        Số fax
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={name}
                        isInvalid={isInvalidName}
                        id="validationDefault01"
                        onChange={(e) =>
                          dispatchProduct({
                            type: "SET_NAME",
                            payload: e.target.value,
                          })
                        }
                        onBlur={() => validateName()}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="12" lg="4">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h5 className="card-title"> Thông tin khác</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Form.Group className="form-group">
                  <Form.Label md="6" htmlFor="validationDefault01">
                    Nhân viên tạo
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    isInvalid={isInvalidName}
                    id="validationDefault01"
                    onChange={(e) =>
                      dispatchProduct({
                        type: "SET_NAME",
                        payload: e.target.value,
                      })
                    }
                    onBlur={() => validateName()}
                  />
                </Form.Group>
                <Form.Group className="mb-3 form-group">
                  <Form.Label htmlFor="exampleFormControlTextarea1">
                    Mô tả
                  </Form.Label>
                  <Form.Control
                    isInvalid={isInvalidDescription}
                    onChange={(e) => {
                      dispatchProduct({
                        type: "SET_DESCRIPTION",
                        payload: e.target.value,
                      });
                    }}
                    value={description}
                    as="textarea"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    onBlur={() => validateDescription()}
                  />
                </Form.Group>
                <Form.Group className="mb-3 form-group">
                  <Form.Label htmlFor="exampleFormControlTextarea1">
                    Ghi chú
                  </Form.Label>
                  <Form.Control
                    isInvalid={isInvalidDescription}
                    onChange={(e) => {
                      dispatchProduct({
                        type: "SET_DESCRIPTION",
                        payload: e.target.value,
                      });
                    }}
                    value={description}
                    as="textarea"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    onBlur={() => validateDescription()}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div>
          <Button
            onClick={() => {
              const isValidName = validateName();
              const isValidBarcode = validateBarcode();
              const isValidDescription = validateDescription();

              if (!isValidName || !isValidBarcode || !isValidDescription) {
                return;
              }

              const _product = {
                ...product,
                priceList: product.priceList
                  .filter((price) => {
                    return price.price;
                  })
                  .map((price) => {
                    const _price = {
                      exportPrice: parseInt(price.price),
                      quantity: parseInt(price.quantity),
                    };

                    if (price[variants[0]?.name] !== undefined) {
                      _price.variantName = variants[0].name;
                      _price.variantValue = price[variants[0].name];
                    }
                    if (price[variants[1]?.name] !== undefined) {
                      _price.variantName2 = variants[1].name;
                      _price.variantValue2 = price[variants[1].name];
                    }
                    return _price;
                  }),
              };

              ProductModel.addProduct(_product)
                .then(() => {
                  setModal(
                    <SuccessModel
                      handleCloseModal={() => {
                        setModal(null);
                        navigate("/dashboard/product-management/product-list");
                      }}
                    ></SuccessModel>
                  );
                })
                .catch((e) => console.log(e));
            }}
            variant="btn btn-primary"
            type="submit"
          >
            Submit form
          </Button>
        </div>
      </div>
    </>
  );
};

export default Supplier;
