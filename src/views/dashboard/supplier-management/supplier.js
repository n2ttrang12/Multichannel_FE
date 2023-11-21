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
import { SupplierModel } from "../../../models/supplier";
import { Province as ProvinceModel } from "../../../models/province";

import { useNavigate, useParams } from "react-router-dom";

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
  let { id } = useParams();

  const isNewMode = id === "new";
  //form validation
  const [isInvalidName, setInvalidName] = useState(false);
  const [isInvalidEmail, setInvalidEmail] = useState(false);
  const [isInvalidPhone, setInvalidPhone] = useState(false);
  const [isInvalidAddress, setInvalidAddress] = useState(false);
  const [isInvalidDescription, setInvalidDescription] = useState(false);
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [images, setImages] = useState([]);
  const maxNumber = 5;
  const [variants, setVariants] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    ProvinceModel.getAll().then(({ data: { data: provinces } }) => {
      setProvinces(provinces);
      dispatchSupplier({
        type: "SET_PROVINCE",
        payload: provinces,
      });
    });
    if (!isNewMode) {
      //mode edit => fetch sản phẩm về
      setIsLoading(true);
      SupplierModel.get(id)
        .then((res) => {
          const supplier = res?.data?.data;

          if (supplier) {
            if (supplier.address?.mtProvince) {
              ProvinceModel.getDistricts(
                supplier.address?.mtProvince?.code
              ).then(({ data: { data: districts } }) => {
                setDistricts(districts);
              });
            }
            if (supplier.address?.mtDistrict) {
              ProvinceModel.getWards(supplier.address?.mtDistrict?.code).then(
                ({ data: { data: wards } }) => {
                  setWards(wards);
                }
              );
            }

            dispatchSupplier({
              type: "SET_SUPPLIER",
              payload: {
                id: supplier?.id,
                name: supplier?.name,
                phoneNumber: supplier?.phoneNumber,
                email: supplier?.email,
                address: {
                  id: supplier?.address?.id,
                  detail: supplier?.address?.detail,
                  provinceId: supplier.address?.mtProvinceId
                    ? supplier.address?.mtProvinceId + ""
                    : "",
                  districtId: supplier.address?.mtDistrictId
                    ? supplier.address?.mtDistrictId + ""
                    : "",
                  wardId: supplier.address?.mtWardId
                    ? supplier.address?.mtWardId + ""
                    : "",
                },
                personalContactName: supplier?.personalContactName,
                personalContactEmail: supplier?.personalContactEmail,
                personalContactPhone: supplier?.personalContactPhone,
              },
            });
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const [supplier, dispatchSupplier] = useReducer(
    (state, action) => {
      console.log(action);
      switch (action.type) {
        case "SET_NAME":
          return {
            ...state,
            name: action.payload,
          };
        case "SET_EMAIL":
          return {
            ...state,
            email: action.payload,
          };
        case "SET_PHONE_NUMBER":
          return {
            ...state,
            phoneNumber: action.payload,
          };
        case "SET_ADDRESS":
          return {
            ...state,
            address: {
              ...state.address,
              detail: action.payload,
            },
          };
        case "SET_PROVINCE":
          return {
            ...state,
            address: {
              ...state.address,
              provinceId: action.payload,
            },
          };

        case "SET_DISTRICT":
          return {
            ...state,
            address: {
              ...state.address,
              districtId: action.payload,
            },
          };
        case "SET_WARD":
          return {
            ...state,
            address: {
              ...state.address,
              wardId: action.payload,
            },
          };
        case "SET_PERSONAL_CONTACT_NAME":
          return {
            ...state,
            personalContactName: action.payload,
          };

        case "SET_PERSONAL_CONTACT_EMAIL":
          return {
            ...state,
            personalContactEmail: action.payload,
          };

        case "SET_PERSONAL_CONTACT_PHONE":
          return {
            ...state,
            personalContactPhone: action.payload,
          };
        case "SET_SUPPLIER":
          return action.payload;
        // case "SET_FAX":
        //   return {
        //     ...state,
        //     fax: action.payload,
        //   };

        // case "SET_CREATOR":
        //   return {
        //     ...state,
        //     creator: action.payload,
        //   };

        default:
          return state;
      }
    },
    {
      name: "",
      phoneNumber: "",
      email: "",
      address: {
        id: "",
        detail: "",
        provinceId: "",
        districtId: "",
        wardId: "",
      },
      personalContactName: "",
      personalContactEmail: "",
      personalContactPhone: "",
    }
  );

  const {
    name,
    phoneNumber,
    email,
    address: { detail = "", provinceId = "", districtId = "", wardId = "" },
    personalContactName,
    personalContactEmail,
    personalContactPhone,
  } = supplier;
  console.log(supplier);
  useEffect(() => {
    if (!provinceId) {
      return;
    }

    const provinceCode = provinces?.find(({ id }) => id == provinceId)?.code;
    // console.log("pppp", provinces, provinceId, provinceCode);

    if (!provinceCode) {
      return;
    }

    ProvinceModel.getDistricts(provinceCode).then(
      ({ data: { data: districts } }) => {
        setDistricts(districts);
      }
    );
  }, [provinceId]);

  useEffect(() => {
    if (!districtId) {
      return;
    }

    const districtCode = districts?.find(({ id }) => id == districtId)?.code;

    if (!districtCode) {
      return;
    }

    ProvinceModel.getWards(districtCode).then(({ data: { data: wards } }) => {
      setWards(wards);
    });
  }, [districtId]);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const validateName = () => {
    if (!name || name.trim().length < 0) {
      setInvalidName(true);
      return false;
    } else {
      setInvalidName(false);
      return true;
    }
  };
  const validateEmail = () => {
    if (!email || email.trim().length <= 0) {
      setInvalidEmail(true);
      return false;
    } else {
      setInvalidEmail(false);
      return true;
    }
  };
  const validatePhone = () => {
    if (!phoneNumber || phoneNumber.trim().length <= 0) {
      setInvalidPhone(true);
      return false;
    } else {
      setInvalidPhone(false);
      return true;
    }
  };

  const validateAddress = () => {
    if (!detail || detail.trim().length <= 0) {
      setInvalidAddress(true);
      return false;
    } else {
      setInvalidAddress(false);
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
                        Tên nhà cung cấp
                        <span className="text-danger"> {" *"}</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={name}
                        isInvalid={isInvalidName}
                        id="validationDefault01"
                        onChange={(e) =>
                          dispatchSupplier({
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
                        Vui lòng nhập tên nhà cung cấp
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
                        isInvalid={isInvalidPhone}
                        type="text"
                        value={phoneNumber}
                        id="validationDefault01"
                        onChange={(e) =>
                          dispatchSupplier({
                            type: "SET_PHONE_NUMBER",
                            payload: e.target.value,
                          })
                        }
                        onBlur={() => validatePhone()}
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
                        isInvalid={isInvalidEmail}
                        onChange={(e) =>
                          dispatchSupplier({
                            type: "SET_EMAIL",
                            payload: e.target.value,
                          })
                        }
                        value={email}
                        type="text"
                        id="validationDefault01"
                        onBlur={() => validateEmail()}
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
                        <span className="text-danger"> {" *"}</span>
                      </Form.Label>
                      <Form.Select
                        value={provinceId}
                        onChange={(e) => {
                          dispatchSupplier({
                            type: "SET_PROVINCE",
                            payload: e.target.value,
                          });
                          dispatchSupplier({
                            type: "SET_WARD",
                            payload: "",
                          });

                          dispatchSupplier({
                            type: "SET_DISTRICT",
                            payload: "",
                          });
                        }}
                        id="validationDefault04"
                        required
                      >
                        <option value={""}>Chọn tỉnh</option>
                        {provinces.map(({ id, name, code }) => {
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
                        value={districtId}
                        onChange={(e) => {
                          dispatchSupplier({
                            type: "SET_DISTRICT",
                            payload: e.target.value,
                          });
                          dispatchSupplier({
                            type: "SET_WARD",
                            payload: "",
                          });
                        }}
                        id="validationDefault04"
                        required
                      >
                        <option value={""}>Chọn Quận/huyện</option>
                        {districts.map(({ id, name, code }) => {
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
                        value={wardId}
                        onChange={(e) =>
                          dispatchSupplier({
                            type: "SET_WARD",
                            payload: e.target.value,
                          })
                        }
                        id="validationDefault04"
                        required
                      >
                        <option value={""}>Chon xa</option>
                        {wards.map(({ id, name, code }) => {
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
                    isInvalid={isInvalidAddress}
                    onChange={(e) =>
                      dispatchSupplier({
                        type: "SET_ADDRESS",
                        payload: e.target.value,
                      })
                    }
                    value={detail}
                    type="text"
                    id="validationDefault01"
                    onBlur={() => validateAddress()}
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
                        Người đại diện
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={personalContactName}
                        isInvalid={isInvalidName}
                        id="validationDefault01"
                        onChange={(e) =>
                          dispatchSupplier({
                            type: "SET_PERSONAL_CONTACT_NAME",
                            payload: e.target.value,
                          })
                        }
                        onBlur={() => validateName()}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="form-group">
                      <Form.Label md="6" htmlFor="validationDefault01">
                        Số điện thoại
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={personalContactPhone}
                        isInvalid={isInvalidName}
                        id="validationDefault01"
                        onChange={(e) =>
                          dispatchSupplier({
                            type: "SET_PERSONAL_CONTACT_PHONE",
                            payload: e.target.value,
                          })
                        }
                        onBlur={() => validateName()}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group className="form-group">
                      <Form.Label md="6" htmlFor="validationDefault01">
                        Email
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={personalContactEmail}
                        isInvalid={isInvalidName}
                        id="validationDefault01"
                        onChange={(e) =>
                          dispatchSupplier({
                            type: "SET_PERSONAL_CONTACT_EMAIL",
                            payload: e.target.value,
                          })
                        }
                        onBlur={() => validateName()}
                      />
                    </Form.Group>
                  </Col>
                  {/* <Col md="6">
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
                          dispatchSupplier({
                            type: "SET_NAME",
                            payload: e.target.value,
                          })
                        }
                        onBlur={() => validateName()}
                      />
                    </Form.Group>
                  </Col> */}
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
                {/* <Form.Group className="form-group">
                  <Form.Label md="6" htmlFor="validationDefault01">
                    Nhân viên tạo
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    isInvalid={isInvalidName}
                    id="validationDefault01"
                    onChange={(e) =>
                      dispatchSupplier({
                        type: "SET_NAME",
                        payload: e.target.value,
                      })
                    }
                    onBlur={() => validateName()}
                  />
                </Form.Group> */}
                {/* <Form.Group className="mb-3 form-group">
                  <Form.Label htmlFor="exampleFormControlTextarea1">
                    Mô tả
                  </Form.Label>
                  <Form.Control
                    isInvalid={isInvalidDescription}
                    onChange={(e) => {
                      dispatchSupplier({
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
                      dispatchSupplier({
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
                </Form.Group> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div>
          <Button
            onClick={() => {
              const isValidName = validateName();
              const isValidEmail = validateEmail();
              const isValidPhone = validatePhone();
              const isValidAddress = validateAddress();
              if (
                !isValidName ||
                !isValidEmail ||
                !isValidAddress ||
                !isValidPhone
              ) {
                return;
              }
              const promise = isNewMode
                ? SupplierModel.addSupplier(supplier)
                : SupplierModel.updateSupplier(supplier);

              promise
                .then(() => {
                  setModal(
                    <SuccessModel
                      handleCloseModal={() => {
                        setModal(null);
                        navigate("/dashboard/supplier-list");
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
