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

import { Link, useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../../components/common/success-modal";
import { WarehouseModal } from "../../../models/warehouse";
import SearchableDropdown from "../../../components/common/search-dropdown/search-dropdown";

const ImportGoodsDetails = () => {
  let { id } = useParams();

  const isNewMode = id === "new";
  //form validation
  const [isInvalidWard, setInvalidWard] = useState(false);
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [images, setImages] = useState([]);
  const maxNumber = 5;
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [importGoods, setImportGoods] = useState([]);
  const [selectedProductVariants, setSelectedProductVariants] = useState([]);
  const [supplierDetail, setSupplierDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidSupplier, setInvalidSupplier] = useState(false);
  const [isInvalidProduct, setInvalidProduct] = useState(false);

  useEffect(() => {
    SupplierModel.getAll().then(({ data: { data: suppliers } }) => {
      setSuppliers(suppliers);
    });
    if (!isNewMode) {
      WarehouseModal.getImport(id)
        .then(({ data: { data: importGood } }) => {
          setImportGoods(importGood);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const {
    id: importId,
    type: importType,
    supplierId,
    updatedAt,
    createdAt: importCreateAt,
    supplier: {
      id: supplierImportId,
      name,
      phonenumber,
      email,
      addressId,
      personalContactName,
      personalContactEmail,
      personalContactPhone,
      status,
      createdAt: customerCreatedAt,
    } = {},
    warehouseHistory,
    dicounts,
    type,
    createdAt,
    orderItems,
  } = importGoods;

  console.log("importG", importGoods);

  useEffect(() => {
    if (!selectedSupplierId) return;
    SupplierModel.get(selectedSupplierId).then(
      ({ data: { data: supplier } }) => {
        const productVariants = [];
        supplier?.products?.map((product) => {
          product?.productPrices?.map((price) => {
            const productVariant = {
              productId: product.id,
              productBarcode: product.barcode,
              productName: getProductVariantName(product, price),
              productPriceId: price.id,
              productPhoto: product.productPhotos,
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

        supplier.productVariants = productVariants;
        setSupplierDetail(supplier);
      }
    );
  }, [selectedSupplierId]);

  useEffect(() => {
    setSelectedProductVariants([]);
  }, [selectedSupplierId]);

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
  // console.log(supplierDetail);
  const validateSupplier = () => {
    if (!selectedSupplierId) {
      setInvalidSupplier(true);
      return false;
    } else {
      setInvalidSupplier(false);
      return true;
    }
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
  return (
    <>
      {modal}
      <div className="product">
        <Row>
          <Col sm="12" lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h5 className="card-title"> Thông tin nnhà cung cấp</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="validationDefault02">
                    Nhà cung cấp
                    <span className="text-danger"> {" *"}</span>
                  </Form.Label>
                  <Form.Select
                    value={selectedSupplierId}
                    onChange={(event) => {
                      setSelectedSupplierId(event.target.value);
                    }}
                    id="validationDefault04"
                    required
                    disabled={!isNewMode}
                  >
                    {isNewMode ? (
                      <>
                        <option value={""}>Chọn nhà cung cấp</option>

                        {suppliers.map(({ id, name }) => {
                          return <option value={id}>{name}</option>;
                        })}
                      </>
                    ) : (
                      <option value={supplierImportId}>{name}</option>
                    )}
                    {/* <Form.Control.Feedback
                          type={"invalid"}
                          className="invalid"
                        >
                          Vui lòng chọn tỉnh/TP.
                        </Form.Control.Feedback> */}
                  </Form.Select>
                  {isInvalidSupplier ? (
                    <p
                      style={{ display: "block" }}
                      className="invalid-feedback"
                    >
                      Vui lòng chọn nhà cung cấp
                    </p>
                  ) : null}
                </Form.Group>
                {supplierDetail ? (
                  <div
                    style={{
                      background: "#f1f1f1",
                      padding: "16px",
                      borderRadius: "8px",
                      border: "1px solid #f1f1f1",
                    }}
                  >
                    {" "}
                    <Row>
                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <p>Tên nhà cung cấp </p>
                          </Col>
                          <Col>
                            <p> {": " + supplierDetail?.name}</p>
                          </Col>
                        </Row>
                      </Col>
                      <Col md="6">
                        <Row>
                          <Col md="6">
                            <p>Số điện thoại </p>
                          </Col>
                          <Col>
                            <p> {": " + supplierDetail?.phoneNumber}</p>
                          </Col>
                        </Row>
                      </Col>
                      <Col md="6">
                        <Row>
                          <Col md="6">
                            <p>Email</p>
                          </Col>
                          <Col>
                            <p> {": " + supplierDetail?.email}</p>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <p>Địa chỉ</p>
                          </Col>
                          <Col>
                            <p>
                              {" "}
                              {": " +
                                supplierDetail?.address.detail +
                                ", " +
                                supplierDetail?.address.mtWard.name +
                                ", " +
                                supplierDetail?.address.mtDistrict.name +
                                ", " +
                                supplierDetail?.address.mtProvince.name}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                      {personalContactName ? (
                        <Col md="12">
                          <Row>
                            <Col md="3">
                              <p>Người đại diện</p>
                            </Col>
                            <Col>
                              <p>
                                {" "}
                                {": " + supplierDetail?.personalContactName}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        ""
                      )}

                      {personalContactPhone ? (
                        <Col md="6">
                          <Row>
                            <Col md="6">
                              <p>Số điện thoại</p>
                            </Col>
                            <Col>
                              <p>
                                {" "}
                                {": " + supplierDetail?.personalContactPhone}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        ""
                      )}
                      {personalContactEmail ? (
                        <Col md="6">
                          <Row>
                            <Col md="6">
                              <p>Email đại diện</p>
                            </Col>
                            <Col>
                              <p>
                                {" "}
                                {": " + supplierDetail?.personalContactEmail}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        ""
                      )}
                    </Row>
                  </div>
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h5 className="card-title">Danh sách sản phẩm</h5>
                </div>

                {/* <Button className="btn-link text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3">
                  <Link to="/dashboard/supplier/new">
                    <i className="btn-inner">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </i>
                    <span>Thêm sản phẩm</span>
                  </Link>
                </Button> */}
              </Card.Header>
              <Card.Body>
                {supplierDetail?.products?.length >= 0 ? (
                  <Row>
                    <Col>
                      <Form.Group className="form-group">
                        <SearchableDropdown
                          options={supplierDetail.productVariants}
                          label="productName"
                          id="productPriceId"
                          handleChange={(productPriceId) => {
                            if (productPriceId === null) {
                              return;
                            }
                            const selectedProductVariant =
                              supplierDetail.productVariants.find(
                                (productVariant) =>
                                  productVariant.productPriceId ==
                                  productPriceId
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
                ) : (
                  ""
                )}
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
                      <th>Mã vạch(Barcode)</th>
                      <th>Số lượng</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  {isNewMode ? (
                    <tbody>
                      {selectedProductVariants.map(
                        ({
                          productId,
                          productPhoto,
                          productBarcode,
                          productName,
                          productPriceId,
                          quantity = 0,
                        }) => {
                          return (
                            <tr key={productId + productPriceId}>
                              <td>
                                {productPhoto?.slice(0, 1).map((photo) => {
                                  return (
                                    <img
                                      style={{
                                        width: "80px",
                                        borderRadius: "16px",
                                        objectFit: "cover",
                                      }}
                                      src={photo.url}
                                    ></img>
                                  );
                                })}
                                <span>{productName}</span>
                              </td>
                              <td>{productBarcode}</td>
                              <td>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicPassword"
                                >
                                  {/* <Form.Label>Số lượng</Form.Label> */}
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
                                      console.log(productPriceId, variants);
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
                    <tbody>
                      {warehouseHistory?.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>
                              <a>
                                {getProductVariantName(
                                  item.warehouse?.productPrices?.product,
                                  item.warehouse?.productPrices
                                )}
                              </a>
                            </td>
                            <td>{item.quantity}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {isNewMode ? (
          <div>
            <Button
              onClick={() => {
                const isValidSupplier = validateSupplier();
                const isValidProduct = validateProduct();
                if (!isValidSupplier || !isValidProduct) {
                  return;
                }
                const importProduct = {
                  supplierId: selectedSupplierId,
                  productDto: selectedProductVariants.map((variant) => {
                    return {
                      productId: variant.productId,
                      productPriceId: variant.productPriceId,
                      quantity: parseInt(variant.quantity),
                    };
                  }),
                };

                WarehouseModal.addImport(importProduct)
                  .then(() => {
                    setModal(
                      <SuccessModal
                        handleCloseModal={() => {
                          setModal(null);
                          navigate("/dashboard/warehouse/import-goods");
                        }}
                        message={"Nhập hàng thành công"}
                      ></SuccessModal>
                    );
                  })
                  .catch((e) => console.log(e));
              }}
              variant="btn btn-primary"
              type="submit"
            >
              Submit
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ImportGoodsDetails;
