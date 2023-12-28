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
import { WarehouseModal } from "../../../models/warehouse";

const ExamineGoodsDetail = () => {
  let { id } = useParams();

  const isNewMode = id === "new";
  //form validation
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [selectedProductVariants, setSelectedProductVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidProduct, setInvalidProduct] = useState(false);

  const [productVariants, setProductVariants] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!isNewMode) {
      //mode edit => fetch sản phẩm về
      setIsLoading(true);
      WarehouseModal.getImport(id)
        .then(({ data }) => {
          const selectedProductVariants = [];
          setStatus(data?.data?.status);
          data.data?.warehouseHistory?.map((warehouseHistory) => {
            const productVariant = {
              warehouseId: warehouseHistory?.warehouse.id,
              productName: getProductVariantName(
                warehouseHistory?.warehouse?.productPrices?.product,
                warehouseHistory?.warehouse?.productPrices
              ),
              quantity:
                warehouseHistory?.warehouse?.quantityInStock +
                warehouseHistory?.quantity,
              quantityInStock: warehouseHistory?.warehouse?.quantityInStock,
            };
            selectedProductVariants.push(productVariant);
          });
          console.log(selectedProductVariants);
          setSelectedProductVariants(selectedProductVariants);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);
  useEffect(() => {
    WarehouseModal.getAll().then(({ data: { data: warehouses } }) => {
      const productVariants = [];
      warehouses?.map((warehouse) => {
        const productVariant = {
          warehouseId: warehouse.id,
          productName: getProductVariantName(
            warehouse.productPrices?.product,
            warehouse.productPrices
          ),
          quantity: 0,
          quantityInStock: warehouse.quantityInStock,
        };
        productVariants.push(productVariant);
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

  const [checkList, dispatchCheckList] = useReducer(
    (state, action) => {
      console.log(action);
      switch (action.type) {
        case "SET_PRODUCT":
          return {
            ...state,
            productDto: action.payload,
          };

        default:
          return state;
      }
    },
    {
      productDto: {
        productId: "",
        quantity: 0,
        shopProgramPercent: 0,
        productPriceId: "",
      },
    }
  );

  const {
    productDto: { productId, quantity, shopProgramPercent, productPriceId },
  } = checkList;

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

  return (
    <>
      {modal}
      <div className="product">
        <Row>
          <Col sm="12" lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h5 className="card-title">Danh sách kiểm kho</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group className="form-group">
                      <SearchableDropdown
                        options={productVariants}
                        label="productName"
                        id="warehouseId"
                        handleChange={(warehouseId) => {
                          if (warehouseId === null) {
                            return;
                          }
                          const selectedProductVariant = productVariants.find(
                            (productVariant) =>
                              productVariant.warehouseId == warehouseId
                          );
                          if (
                            selectedProductVariants.find(
                              (product) =>
                                selectedProductVariant.warehouseId ==
                                product.warehouseId
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
                      <th>Tồn kho</th>
                      <th>Tồn kho thực tế</th>
                      <th>Chênh lệch</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  {
                    <tbody>
                      {selectedProductVariants.map(
                        ({
                          warehouseId,
                          productName,
                          quantity = 0,
                          quantityInStock,
                        }) => {
                          return (
                            <tr key={warehouseId}>
                              <td>{productName}</td>
                              <td>{quantityInStock}</td>
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
                                            warehouseId ==
                                            productVariant.warehouseId
                                        );
                                      variant.quantity = e.target.value;
                                      setSelectedProductVariants([
                                        ...selectedProductVariants,
                                      ]);
                                    }}
                                  />
                                </Form.Group>
                              </td>
                              <td>{quantityInStock - quantity}</td>
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
                                            warehouseId !=
                                            productVariant.warehouseId
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
                  }
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div>
          <Button
            onClick={() => {
              // const isValidProduct = validateProduct();
              if (!isNewMode) {
                return;
              }
              const warehouseDto = {
                warehouseProduct: selectedProductVariants.map((variant) => {
                  return {
                    warehouseId: variant.warehouseId,
                    quantityReality: variant.quantity,
                    quantityDifference:
                      variant.quantity - variant.quantityInStock,
                  };
                }),
              };

              WarehouseModal.addCheck(warehouseDto)
                .then(() => {
                  setModal(
                    <SuccessModal
                      handleCloseModal={() => {
                        setModal(null);
                        navigate("/dashboard/warehouse/check-goods");
                      }}
                      message={"Tạo kiểm hàng thành công"}
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
          {status === "INPROCCESS" ? (
            <Button
              onClick={() => {
                WarehouseModal.changeStatusInStock(id)
                  .then(() => {
                    setModal(
                      <SuccessModal
                        handleCloseModal={() => {
                          setModal(null);
                          navigate("/dashboard/warehouse/check-goods");
                        }}
                        message={"Cân bằng thành công"}
                      ></SuccessModal>
                    );
                  })
                  .catch((e) => console.log(e));
              }}
              variant="btn btn-outline-primary"
              type="submit"
            >
              Cân bằng
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ExamineGoodsDetail;
