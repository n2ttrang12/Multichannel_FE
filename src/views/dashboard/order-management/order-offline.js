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
import { Order, SupplierModel } from "../../../models/order";
import { Province as ProvinceModel } from "../../../models/province";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Order as OrderModel } from "../../../models/order";
import { Product as ProductModel } from "../../../models/product";
import { SuccessModal } from "../../../components/common/success-modal";
import { VoucherModel } from "../../../models/voucher";
import { isValidDate } from "@fullcalendar/react";
import * as moment from "moment";
import { currencyFormatter } from "../../../helper";
import SearchableDropdown from "../../../components/common/search-dropdown/search-dropdown";

const OrderOffline = () => {
  let { id } = useParams();

  const isNewMode = id === "new";
  //form validation
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [images, setImages] = useState([]);
  const maxNumber = 5;
  const [selectedProductVariants, setSelectedProductVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidProduct, setInvalidProduct] = useState(false);
  const [isInvalidName, setInvalidName] = useState(false);
  const [isInvalidEmail, setInvalidEmail] = useState(false);
  const [isInvalidPhone, setInvalidPhone] = useState(false);
  const [isInvalidAddress, setInvalidAddress] = useState(false);
  const [isInvalidProvince, setInvalidProvince] = useState(false);
  const [isInvalidDistrict, setInvalidDistrict] = useState(false);
  const [isInvalidWard, setInvalidWard] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    ProvinceModel.getAll().then(({ data: { data: provinces } }) => {
      setProvinces(provinces);
      // dispatchOrder({
      //   type: "SET_PROVINCE",
      //   payload: provinces,
      // });
    });
    if (!isNewMode) {
      //mode edit => fetch sản phẩm về
      setIsLoading(true);
      OrderModel.get(id)
        .then((res) => {
          const order = res?.data?.buyerDto;
          if (order) {
            if (order.address?.mtProvince) {
              ProvinceModel.getDistricts(
                order.addressDto?.mtProvince?.code
              ).then(({ data: { data: districts } }) => {
                setDistricts(districts);
              });
            }
            if (order.address?.mtDistrict) {
              ProvinceModel.getWards(order.address?.mtDistrict?.code).then(
                ({ data: { data: wards } }) => {
                  setWards(wards);
                }
              );
            }

            dispatchOrder({
              type: "SET_ORDER",
              payload: {
                id: order?.id,
                name: order?.name,
                phoneNumber: order?.phoneNumber,
                email: order?.email,
                address: {
                  detail: order?.address?.detail,
                  provinceId: order.address?.mtProvinceId
                    ? order.address?.mtProvinceId + ""
                    : "",
                  districtId: order.address?.mtDistrictId
                    ? order.address?.mtDistrictId + ""
                    : "",
                  wardId: order.address?.mtWardId
                    ? order.address?.mtWardId + ""
                    : "",
                },
                productDto: order?.products,
              },
            });
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, []);
  useEffect(() => {
    ProductModel.getAll().then(({ data: { data: products } }) => {
      const productVariants = [];
      products?.map((product) => {
        product?.productPrices?.map((price) => {
          const productVariant = {
            productId: product.id,
            productName: getProductVariantName(product, price),
            productBarcode: product.barcode,
            productPriceId: price.id,
            price: price.exportPrice,
            quantity: 1,
          };

          if (
            productVariants.find(
              (productVariant) =>
                productVariant.productId == product.id &&
                productVariant.productName ==
                  getProductVariantName(product, price)
            )
          ) {
            return;
          }
          productVariants.push(productVariant);
        });
      });
      setProductVariants(productVariants);
    });
    // if (!isNewMode) {
    //   OrderModel.getImport(id)
    //     .then(({ data: { data: importGood } }) => {
    //       setImportGoods(importGood);
    //     })
    //     .finally(() => setIsLoading(false));
    // }
  }, []);

  const [order, dispatchOrder] = useReducer(
    (state, action) => {
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
            addressDto: {
              ...state.addressDto,
              detail: action.payload,
            },
          };
        case "SET_PROVINCE":
          return {
            ...state,
            addressDto: {
              ...state.addressDto,
              provinceId: action.payload,
            },
          };

        case "SET_DISTRICT":
          return {
            ...state,
            addressDto: {
              ...state.addressDto,
              districtId: action.payload,
            },
          };
        case "SET_WARD":
          return {
            ...state,
            addressDto: {
              ...state.addressDto,
              wardId: action.payload,
            },
          };

        case "SET_PRODUCT":
          return {
            ...state,
            productDto: action.payload,
          };
        case "SET_VOUCHER_ID":
          return {
            ...state,
            voucherId: action.payload,
          };
        case "SET_ORDER":
          return action.payload;

        default:
          return state;
      }
    },
    {
      name: "",
      phoneNumber: "",
      email: "",
      addressDto: {
        id: "",
        detail: "",
        provinceId: "",
        districtId: "",
        wardId: "",
      },
      productDto: {
        productId: "",
        quantity: 0,
        shopProgramPercent: 0,
        productPriceId: "",
      },
    }
  );

  const {
    name,
    phoneNumber,
    email,
    addressDto: { detail = "", provinceId = "", districtId = "", wardId = "" },
    productDto: { productId, quantity, shopProgramPercent, productPriceId },
  } = order;

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
  const getProductVariantName = (product, price) => {
    let name = product.name;

    if (price.variant) {
      name = name + " - " + price.variant.value;
    }

    if (price.variant2) {
      name = name + " - " + price.variant2.value;
    }

    return name;
  };
  const validateProduct = () => {
    if (selectedProductVariants.length <= 0) {
      setInvalidProduct(true);
      return false;
    } else {
      setInvalidProduct(false);
      return true;
    }
  };
  // console.log(supplierDetail);
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

  const subTotal = selectedProductVariants
    .map(({ quantity, price }) => quantity * price)
    .reduce((total, price) => total + price, 0);
  const total = !discount
    ? subTotal
    : subTotal - discount.discount - (discount.percent * subTotal) / 100;

  const discountMessage = discount
    ? discount.discount
      ? `  - ${currencyFormatter.format(discount.discount)}`
      : `  - ${discount.percent}% ( ${currencyFormatter.format(
          (discount.percent * subTotal) / 100
        )} )`
    : "";

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
                          dispatchOrder({
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
                        Vui lòng nhập tên khách hàng
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
                          dispatchOrder({
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
                          dispatchOrder({
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
                          dispatchOrder({
                            type: "SET_PROVINCE",
                            payload: e.target.value,
                          });
                          dispatchOrder({
                            type: "SET_WARD",
                            payload: "",
                          });

                          dispatchOrder({
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
                          dispatchOrder({
                            type: "SET_DISTRICT",
                            payload: e.target.value,
                          });
                          dispatchOrder({
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
                          dispatchOrder({
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
                      dispatchOrder({
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
                  <h5 className="card-title">Danh sách sản phẩm</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group className="form-group">
                      <SearchableDropdown
                        options={productVariants}
                        label="productName"
                        id="productPriceId"
                        searchLabel={"productBarcode"}
                        handleChange={(productPriceId) => {
                          if (productPriceId === null) {
                            return;
                          }
                          const selectedProductVariant = productVariants.find(
                            (productVariant) =>
                              productVariant.productPriceId == productPriceId
                          );
                          if (
                            selectedProductVariants.find(
                              (product) =>
                                selectedProductVariant.productPriceId ==
                                product.productPriceId
                            )
                          )
                            return;

                          setSelectedProductVariants([
                            ...selectedProductVariants,
                            selectedProductVariant,
                          ]);
                        }}
                      />
                      {/* <Form.Select
                        value={-1}
                        onChange={(e) => {
                          const selectedProductVariant = productVariants.find(
                            (productVariant) =>
                              productVariant.productId +
                                "-" +
                                productVariant.productPriceId ==
                              e.target.value
                          );
                          if (
                            selectedProductVariants.find(
                              (product) =>
                                selectedProductVariant.productPriceId ==
                                  product.productPriceId &&
                                selectedProductVariant.productId ==
                                  product.productId
                            )
                          )
                            return;

                          setSelectedProductVariants([
                            ...selectedProductVariants,
                            selectedProductVariant,
                          ]);
                        }}
                        id="validationDefault04"
                        required
                      >
                        <option value={""}>Chọn sản phẩm</option>
                        {productVariants.map(
                          ({ productId, productName, productPriceId }) => {
                            return (
                              <option value={productId + "-" + productPriceId}>
                                {productName}
                              </option>
                            );
                          }
                        )}
                      </Form.Select> */}
                      {isInvalidProduct ? (
                        <p
                          style={{ display: "block" }}
                          className="invalid-feedback"
                        >
                          Vui lòng thêm sản phẩm
                        </p>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>

                <Table
                  responsive
                  striped
                  id="datatable"
                  className=""
                  data-toggle="data-table"
                >
                  <thead>
                    <tr>
                      <th>Tên sản phẩm</th>
                      <th>Đơn giá</th>
                      <th>Số lượng</th>
                      <th>Thành tiền</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  {
                    isNewMode ? (
                      <tbody>
                        {selectedProductVariants.map(
                          ({
                            productId,
                            productName,
                            productPriceId,
                            quantity = 0,
                            price,
                          }) => {
                            return (
                              <tr key={productId + productPriceId}>
                                <td>{productName}</td>
                                <td>{currencyFormatter.format(price)}</td>
                                <td>
                                  <Form.Group
                                    className="mb-3"
                                    controlId="formBasicPassword"
                                  >
                                    <Form.Control
                                      type="number"
                                      value={quantity}
                                      onChange={(e) => {
                                        const variant =
                                          selectedProductVariants.find(
                                            (productVariant) =>
                                              productPriceId ==
                                                productVariant.productPriceId &&
                                              productId ==
                                                productVariant.productId
                                          );
                                        variant.quantity = e.target.value;
                                        setSelectedProductVariants([
                                          ...selectedProductVariants,
                                        ]);
                                      }}
                                    />
                                  </Form.Group>
                                </td>
                                <td>
                                  {currencyFormatter.format(price * quantity)}
                                </td>
                                <td>
                                  <div style={{ float: "right" }}>
                                    <Link
                                      className="btn btn-sm btn-icon text-danger"
                                      data-bs-toggle="tooltip"
                                      title="Xóa"
                                      to="#"
                                      onClick={() => {
                                        const variants =
                                          selectedProductVariants.filter(
                                            (productVariant) =>
                                              productPriceId !=
                                                productVariant.productPriceId ||
                                              productId !=
                                                productVariant.productId
                                          );

                                        setSelectedProductVariants(variants);
                                      }}
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
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    ) : (
                      ""
                    )
                    //   (
                    //     <tbody>
                    //       {warehouseHistory?.map((item) => {
                    //         return (
                    //           <tr key={item.id}>
                    //             <td>
                    //               <a>
                    //                 {getProductVariantName(
                    //                   item.warehouse?.productPrices?.product,
                    //                   item.warehouse?.productPrices
                    //                 )}
                    //               </a>
                    //             </td>
                    //             <td>{item.quantity}</td>
                    //           </tr>
                    //         );
                    //       })}
                    //     </tbody>
                    //   )}
                  }
                </Table>

                {selectedProductVariants.length ? (
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
                            {" "}
                            {": " + currencyFormatter.format(subTotal)}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          md="6"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <p style={{ fontWeight: "500" }}>Mã giảm giá </p>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Control
                              type="text"
                              onChange={(e) => {
                                VoucherModel.getByCode(e.target.value)
                                  .then(({ data: { data: voucher } }) => {
                                    const isVoucherValid = () => {
                                      const startTime = moment(
                                        voucher.fromDate
                                      );
                                      const endTime = moment(voucher.toDate);

                                      if (voucher.available <= 0) {
                                        return false;
                                      }
                                      if (voucher.isDisable) {
                                        return false;
                                      }
                                      if (
                                        !moment().isBetween(startTime, endTime)
                                      ) {
                                        return false;
                                      }
                                      return true;
                                    };

                                    if (isVoucherValid(voucher)) {
                                      setDiscount({
                                        discount: voucher.discount ?? 0,
                                        percent: voucher.percent ?? 0,
                                      });
                                      dispatchOrder({
                                        type: "SET_VOUCHER_ID",
                                        payload: voucher.id,
                                      });
                                    } else {
                                      setDiscount(null);
                                      dispatchOrder({
                                        type: "SET_VOUCHER_ID",
                                        payload: null,
                                      });
                                    }
                                  })
                                  .catch((e) => {
                                    setDiscount(null);
                                    dispatchOrder({
                                      type: "SET_VOUCHER_ID",
                                      payload: null,
                                    });
                                  });
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          md="6"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <p style={{ fontWeight: "500" }}>Giảm giá </p>
                        </Col>
                        <Col>
                          {discountMessage ? (
                            <div style={{ fontWeight: "700" }}>
                              :{" "}
                              <span style={{ color: "red" }}>
                                {discountMessage}
                              </span>
                            </div>
                          ) : (
                            <div style={{ fontWeight: "700" }}>
                              : <span style={{ color: "red" }}> 0</span>
                            </div>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          md="6"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <p style={{ fontWeight: "500" }}>Tổng tiền </p>
                        </Col>
                        <Col>
                          <p style={{ fontWeight: "700" }}>
                            {" "}
                            {": " + currencyFormatter.format(total)}
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {isNewMode ? (
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
                const isValidProduct = validateProduct();
                if (
                  !isValidName ||
                  !isValidEmail ||
                  !isValidAddress ||
                  !isValidPhone ||
                  !isValidProvince ||
                  !isValidDistrict ||
                  !isValidWard ||
                  !isValidProduct
                ) {
                  return;
                }
                const orderOfflineDto = {
                  buyerDto: {
                    name: order.name,
                    phonenumber: order.phoneNumber,
                    email: order.email,
                    addressDto: {
                      ...order.addressDto,
                      isDefault: true,
                    },
                  },
                  productDto: selectedProductVariants.map((variant) => {
                    return {
                      productId: variant.productId,
                      productPriceId: variant.productPriceId,
                      quantity: parseInt(variant.quantity),
                    };
                  }),
                  voucherId: order.voucherId,
                };

                Order.addOrderOffline(orderOfflineDto)
                  .then(() => {
                    setModal(
                      <SuccessModal
                        handleCloseModal={() => {
                          setModal(null);
                          navigate("/dashboard/order-management/list");
                        }}
                        message={"Tạo đơn hàng trực tiếp thành công"}
                      ></SuccessModal>
                    );
                  })
                  .catch((e) => console.log(e));
              }}
              variant="btn btn-primary"
              type="submit"
            >
              Lưu thông tin
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default OrderOffline;
