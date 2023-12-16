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
import { SuccessModal } from "../../../components/common/success-modal";

const Supplier = () => {
  let { id } = useParams();

  const isNewMode = id === "new";
  //form validation
  const [isInvalidName, setInvalidName] = useState(false);
  const [isInvalidEmail, setInvalidEmail] = useState(false);
  const [isInvalidPhone, setInvalidPhone] = useState(false);
  const [isInvalidAddress, setInvalidAddress] = useState(false);
  const [isInvalidProvince, setInvalidProvince] = useState(false);
  const [isInvalidDistrict, setInvalidDistrict] = useState(false);
  const [isInvalidWard, setInvalidWard] = useState(false);
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
                products: supplier?.products,
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
    products,
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
  const validateProvince = () => {
    if (!provinceId) {
      setInvalidProvince(true);
      return false;
    } else {
      setInvalidProvince(false);
      return true;
    }
  };
  const validateDistrict = () => {
    if (!districtId) {
      setInvalidDistrict(true);
      return false;
    } else {
      setInvalidDistrict(false);
      return true;
    }
  };
  const validateWard = () => {
    if (!wardId) {
      setInvalidWard(true);
      return false;
    } else {
      setInvalidWard(false);
      return true;
    }
  };
  return (
    <>
      {modal}
      <div className="product">
        <Row>
          <Col sm="12" lg="12">
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
                        {/* <Form.Control.Feedback
                          type={"invalid"}
                          className="invalid"
                        >
                          Vui lòng chọn tỉnh/TP.
                        </Form.Control.Feedback> */}
                      </Form.Select>
                      {isInvalidProvince ? (
                        <p
                          style={{ display: "block" }}
                          className="invalid-feedback"
                        >
                          Vui lòng chọn Tỉnh/TP
                        </p>
                      ) : null}
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
                        {/* <Form.Control.Feedback
                          type={"invalid"}
                          className="invalid"
                        >
                          Vui lòng chọn Quận/huyện.
                        </Form.Control.Feedback> */}
                      </Form.Select>
                      {isInvalidDistrict ? (
                        <p
                          style={{ display: "block" }}
                          className="invalid-feedback"
                        >
                          Vui lòng chọn Quận/huyện
                        </p>
                      ) : null}
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
                        <option value={""}>Chọn xã</option>
                        {wards.map(({ id, name, code }) => {
                          return <option value={id}>{name}</option>;
                        })}

                        {/* <Form.Control.Feedback
                          type={"invalid"}
                          className="invalid"
                        >
                          Vui lòng chọn phường/xã.
                        </Form.Control.Feedback> */}
                      </Form.Select>
                      {isInvalidWard ? (
                        <p
                          style={{ display: "block" }}
                          className="invalid-feedback"
                        >
                          Vui lòng chọn Phường/Xã
                        </p>
                      ) : null}
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
                        // isInvalid={isInvalidName}
                        id="validationDefault01"
                        onChange={(e) =>
                          dispatchSupplier({
                            type: "SET_PERSONAL_CONTACT_NAME",
                            payload: e.target.value,
                          })
                        }
                        // onBlur={() => validateName()}
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
                        // isInvalid={isInvalidName}
                        id="validationDefault01"
                        onChange={(e) =>
                          dispatchSupplier({
                            type: "SET_PERSONAL_CONTACT_PHONE",
                            payload: e.target.value,
                          })
                        }
                        // onBlur={() => validateName()}
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
                        // isInvalid={isInvalidName}
                        id="validationDefault01"
                        onChange={(e) =>
                          dispatchSupplier({
                            type: "SET_PERSONAL_CONTACT_EMAIL",
                            payload: e.target.value,
                          })
                        }
                        // onBlur={() => validateName()}
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
            {!isNewMode ? (
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

                        {/* <th>Nhà cung cấp</th> */}
                        {/* <th>Giá bán</th> */}
                        {/* <th>Tồn kho</th> */}
                        {/* <th>Ngày tạo</th> */}
                        {/* <th>Trạng thái</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {products?.map((item) => {
                        // const item = orderItem.product;
                        // const listPrices =
                        //   item.productPrices?.map((price) =>
                        //     parseInt(price.exportPrice)
                        //   ) ?? [];

                        // const minPrice = Math.min(...listPrices);
                        // const maxPrice = Math.max(...listPrices);

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
                              {/* {item.productPhotos
                              ?.slice(0, 1)
                              .map((productPhoto) => {
                                return (
                                  <img
                                    style={{
                                      width: "80px",
                                    }}
                                    src={productPhoto.url}
                                  ></img>
                                );
                              })} */}
                              <a>{item.name}</a>
                            </td>
                            <td>{item.barcode}</td>
                            <td>{item.category?.name}</td>
                            {/* <td>{item.label}</td> */}
                            {/* <td
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></td> */}
                            {/* <td>
                            
                            {minPrice && maxPrice ? (
                              minPrice === maxPrice ? (
                                <span>{maxPrice}</span>
                              ) : (
                                <span>
                                  {minPrice} - {maxPrice}
                                </span>
                              )
                            ) : null}
                          </td> */}
                            {/* <td>{item.stock}</td> */}
                            {/* <td>{item.status}</td> */}
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
            ) : (
              ""
            )}
          </Col>
        </Row>
        <div>
          <Button
            onClick={() => {
              const isValidName = validateName();
              const isValidEmail = validateEmail();
              const isValidPhone = validatePhone();
              const isValidAddress = validateAddress();
              const isValidProvince = validateProvince();
              const isValidDistrict = validateDistrict();
              const isValidWard = validateWard();
              if (
                !isValidName ||
                !isValidEmail ||
                !isValidAddress ||
                !isValidPhone ||
                !isValidProvince ||
                !isValidDistrict ||
                !isValidWard
              ) {
                return;
              }
              const _supplier = { ...supplier, products: undefined };
              const promise = isNewMode
                ? SupplierModel.addSupplier(_supplier)
                : SupplierModel.updateSupplier(_supplier);

              promise
                .then(() => {
                  setModal(
                    <SuccessModal
                      handleCloseModal={() => {
                        setModal(null);
                        navigate("/dashboard/supplier-list");
                      }}
                      message={
                        isNewMode
                          ? "Thêm mới nhà cung cấp thành công"
                          : "Chỉnh sửa nhà cung cấp thành công"
                      }
                    ></SuccessModal>
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
