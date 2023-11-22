import React, { useContext, useEffect, useReducer, useState } from "react";
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
import { Image as ImageModel } from "../../../models/image";
import { Link, useNavigate, useParams } from "react-router-dom";
import HTMLEditor from "../../../components/common/html-editor";
import { CategorySelector } from "./category-selector";
import CategoryProvider, {
  CategoryContext,
  getBreadcrumb,
} from "../../../contexts/categoryProvider";
import "./theme.css";
import { Loading } from "../../../components/common/loading";
import Supplier from "../supplier-management/supplier";
import { SupplierModel } from "../../../models/supplier";
import { SuccessModal } from "../../../components/common/success-modal";
import { ErrorModal } from "../../../components/common/fail-modal";
import { LoadingModal } from "../../../components/common/loading-modal";

const CategoryModal = ({
  handleCategoryChange,
  handleCloseModal,
  hideCategoryModel,
  categoryId,
}) => {
  const categoryContext = useContext(CategoryContext);
  const { setSelected, setSelectedLabel, categories, setL1, setL2, setL3 } =
    categoryContext;
  const [category, setCategory] = useState(null);

  useEffect(() => {
    setSelected(categoryId);
    for (let i = 0; i < categories?.length; i++) {
      let layer1 = categories[i];
      if (categoryId === layer1.id) {
        setL1(layer1.id);
        handleCategoryChange({
          id: categoryId,
          name: layer1?.name,
        });
        break;
      }

      if (layer1.child?.length > 0) {
        for (let j = 0; j < layer1.child?.length; j++) {
          let layer2 = layer1.child[j];
          if (categoryId === layer2.id) {
            setL1(layer1.id);
            setL2(layer2.id);
            handleCategoryChange({
              id: categoryId,
              name: layer1.name + " > " + layer2.name,
            });
            break;
          }
          if (layer2.child?.length > 0) {
            for (let k = 0; k < layer2.child?.length; k++) {
              let layer3 = layer2.child[k];
              if (categoryId === layer3.id) {
                setL1(layer1.id);
                setL2(layer2.id);
                setL3(layer3.id);
                handleCategoryChange({
                  id: categoryId,
                  name:
                    layer1?.name + " > " + layer2.name + " > " + layer3.name,
                });
                break;
              }
            }
          }
        }
      }
    }
  }, [categoryId]);

  return (
    <Modal size="xl" show={!hideCategoryModel} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Chọn danh mục</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CategorySelector onChange={(category) => setCategory(category)} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleCloseModal}>
          Đóng
        </Button>
        <Button
          variant="primary"
          disabled={!category?.id}
          onClick={() => {
            handleCategoryChange(category);
          }}
        >
          Chọn
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Product = () => {
  let { id } = useParams();

  const isNewMode = id === "new";
  //form validation
  const [isInvalidName, setInvalidName] = useState(false);
  const [isInvalidBarcode, setInvalidBarcode] = useState(false);
  const [isInvalidDescription, setInvalidDescription] = useState(false);
  const [isInvalidCategory, setInvalidCategory] = useState(false);
  const [isInvalidPhoto, setInvalidPhoto] = useState(false);
  const [isInvalidPrice, setInvalidPrice] = useState(false);
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [hideCategoryModel, setHideCategoryModel] = useState(true);
  const [images, setImages] = useState([]);
  const maxNumber = 5;
  const [variants, setVariants] = useState([]);
  const [units, setUnits] = useState([]);
  const [suppliers, setSupplier] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const convertProductResponse = (resProduct) => {
    return {
      id: resProduct.id,
      name: resProduct.name,
      status: resProduct.status,
      code: resProduct.status,
      barcode: resProduct.barcode,
      description: resProduct.description,
      photoList: resProduct.productPhotos,
      priceList: resProduct.productPrices.map((price) => {
        const basicPriceInfo = {
          price: price.exportPrice,
          quantity: price.quantity,
          sku: "",
        };

        if (price.variant) {
          basicPriceInfo[price.variant.variant?.name] = price.variant.value;
        }

        if (price.variant2) {
          basicPriceInfo[price.variant2.variant?.name] = price.variant2.value;
        }

        return basicPriceInfo;
      }),
      //Thời Trang Nữ | Quần nữ | Quần jean nữ
      categoryId: resProduct.category?.id,
      categoryName: resProduct.category?.name,
      unitId: resProduct.unit?.id,
    };
  };

  useEffect(() => {
    ProductModel.getUnits().then(({ data: { data: units } }) => {
      setUnits(units);
      if (isNewMode) {
        dispatchProduct({
          type: "SET_UNIT",
          payload: units[0].id,
        });
      }
    });
    SupplierModel.getList({
      page: 1, // Offset
      perPage: 100, // limit,
    }).then(({ data: { data: suppliers } }) => {
      setSupplier(suppliers);
    });

    if (!isNewMode) {
      //mode edit => fetch sản phẩm về
      setIsLoading(true);
      ProductModel.get(id)
        .then((res) => {
          const prices = res?.data?.data?.productPrices;

          if (prices) {
            const variants = [];
            const handleVariant = (variant, variants) => {
              const currentV = variants.find((v) => v.name === variant.name);
              if (!currentV) {
                variants.push({
                  name: variant.name,
                  values: [variant.value],
                });
              } else {
                if (currentV.values.indexOf(variant.value) === -1) {
                  currentV.values.push(variant.value);
                }
              }
            };
            prices.forEach((price) => {
              handleVariant(
                {
                  name: price?.variant?.variant?.name,
                  value: price?.variant?.value,
                },
                variants
              );
              handleVariant(
                {
                  name: price?.variant2?.variant?.name,
                  value: price?.variant2?.value,
                },
                variants
              );
            });
            // console.log("variants", variants);
            setVariants(variants);
          }

          dispatchProduct({
            type: "SET_PRODUCT",
            payload: convertProductResponse(res?.data?.data),
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const [product, dispatchProduct] = useReducer(
    (state, action) => {
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
            categoryId: action.payload.id,
            categoryName: action.payload.name,
          };

        case "SET_UNIT":
          return {
            ...state,
            unitId: action.payload,
          };
        case "SET_SUPPLIER":
          return {
            ...state,
            supplierId: action.payload,
          };
        case "SET_PRODUCT":
          return {
            ...action.payload,
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
      categoryId: null,
      categoryName: "",
      unitId: 0,
      supplierId: 0,
    }
  );

  // console.log(variants);
  console.log(product);

  const {
    name,
    status,
    code,
    barcode,
    description,
    photoList = [],
    priceList = [],
    categoryId,
    categoryName,
    unitId,
    supplierId,
  } = product;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
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

  const validateCategory = () => {
    if (!categoryId) {
      setInvalidCategory(true);
      return false;
    } else {
      setInvalidCategory(false);
      return true;
    }
  };
  const validatePrice = () => {
    const listHasPrice = priceList.filter((price) => {
      return price.price && price.price > 0;
    });
    if (listHasPrice.length == 0) {
      setInvalidPrice(true);
      return false;
    } else {
      setInvalidPrice(false);
      return true;
    }
  };

  const validatePhoto = () => {
    const allImages = [...images, ...photoList];
    if (allImages.length === 0) {
      setInvalidPhoto(true);
      return false;
    } else {
      setInvalidPhoto(false);
      return true;
    }
  };

  return (
    <>
      {modal}
      <div
        style={{
          marginBottom: "16px",
        }}
      >
        {isLoading && <Loading></Loading>}
      </div>
      <div className="product">
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title">
              <h5 className="card-title"> Thông tin chung</h5>
            </div>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md="6">
                <Form.Group className="form-group">
                  <Form.Label md="6" htmlFor="validationDefault01">
                    Tên sản phẩm
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
                  <Form.Control.Feedback type={"invalid"} className="invalid">
                    Vui lòng nhập ít nhất 10 ký tự.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="validationDefault02">
                    Trạng thái
                  </Form.Label>
                  <Form.Select
                    value={status}
                    onChange={(e) =>
                      dispatchProduct({
                        type: "SET_STATUS",
                        payload: e.target.value,
                      })
                    }
                    id="validationDefault04"
                    required
                  >
                    <option value={"SALE"}>Đang bán</option>
                    <option value={"STOP"}>Dừng bán</option>
                  </Form.Select>
                </Form.Group>{" "}
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Form.Group className="form-group">
                  <Form.Label md="6" htmlFor="validationDefault01">
                    Mã sản phẩm
                    {/* <span className="text-danger"> {" *"}</span> */}
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
                    required
                  />
                  {/* <Col md="6" className="mb-3">
                      <Form.Label htmlFor="validationDefault02">
                        Khối lượng
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="validationDefault02"
                        required
                      />
                    </Col> */}
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group className="form-group">
                  <Form.Label md="6" htmlFor="validationDefault01">
                    Mã vạch (Barcode)
                    {/* <span className="text-danger"> {" *"}</span> */}
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
                    Vui lòng nhập Barcode.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="validationDefault02">
                    Đơn vị tính
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
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group className="form-group">
                  <div>
                    <Form.Label htmlFor="exampleFormControlSelect1">
                      Loại sản phẩm
                      <span className="text-danger"> {" *"}</span>
                    </Form.Label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {categoryId ? (
                      <span
                        className="text-primary"
                        style={{ paddingRight: "8px" }}
                      >
                        {categoryName}
                      </span>
                    ) : null}
                    <Link
                      className="btn btn-sm btn-icon text-primary flex-end"
                      data-bs-toggle="tooltip"
                      title="Edit "
                      to="#"
                      onClick={() => {
                        setHideCategoryModel(false);
                      }}
                    >
                      <span>
                        <svg
                          class="icon-32"
                          width="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7476 20.4428H21.0002"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                          <path
                            d="M11.021 6.00098L16.4732 10.1881"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </svg>
                      </span>
                    </Link>
                    {/* <Button
                      
                    >
                      Chọn loại sản phẩm
                    </Button> */}
                  </div>
                  {isInvalidCategory ? (
                    <p
                      style={{ display: "block" }}
                      className="invalid-feedback"
                    >
                      Vui lòng loại sản phẩm
                    </p>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="validationDefault02">
                    Nhà cung cấp
                  </Form.Label>
                  <Form.Select
                    value={supplierId}
                    onChange={(e) =>
                      dispatchProduct({
                        type: "SET_SUPPLIER",
                        payload: e.target.value,
                      })
                    }
                    id="validationDefault04"
                    required
                  >
                    <option value={""}>{"Vui lòng chọn nhà cung cấp"}</option>;
                    {suppliers.map(({ id, name }) => {
                      return <option value={id}>{name}</option>;
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <div>
                Mô tả
                <span className="text-danger"> {" *"}</span>
                <HTMLEditor
                  isInvalid={isInvalidDescription}
                  onChange={(data) => {
                    dispatchProduct({
                      type: "SET_DESCRIPTION",
                      payload: data,
                    });
                  }}
                  data={description}
                  onBlur={() => validateDescription()}
                />
                {isInvalidDescription ? (
                  <p style={{ display: "block" }} className="invalid-feedback">
                    Vui lòng nhập tối thiểu 100 ký tự.
                  </p>
                ) : null}
              </div>
              {/* </Col> */}
            </Row>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title">
              <h5 className="card-title">
                {" "}
                Hình ảnh <span className="text-danger"> {" *"}</span>{" "}
              </h5>
            </div>
          </Card.Header>
          <Card.Body>
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <div>
                    <Button
                      className="button-upload"
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Click or Drop here
                    </Button>
                  </div>
                  <div className="mt-3">
                    {
                      //this is from edit
                      photoList?.map((photo, index) => {
                        return (
                          <div
                            key={index}
                            className="image-item"
                            style={{
                              position: "relative",
                            }}
                          >
                            <img
                              src={photo.url}
                              style={{ borderRadius: "8px" }}
                              alt="Not found"
                              width="200"
                            />
                            <div
                              className="image-item__btn-wrapper"
                              style={{
                                position: "absolute",
                                top: "8px",
                                right: "4px",
                              }}
                            >
                              <Link
                                className="btn btn-sm btn-icon btn-danger"
                                data-bs-toggle="tooltip"
                                title="Delete User"
                                to="#"
                                style={{
                                  borderRadius: "50%",
                                  alignItems: "center",
                                }}
                                onClick={() => {
                                  photoList.splice(photoList.indexOf(photo), 1);
                                  dispatchProduct({
                                    type: "SET_PHOTOS",
                                    payload: photoList,
                                  });
                                }}
                              >
                                <svg
                                  class="icon-32"
                                  width="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  {" "}
                                  <path
                                    d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>{" "}
                                  <path
                                    d="M20.708 6.23975H3.75"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>{" "}
                                  <path
                                    d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>{" "}
                                </svg>
                              </Link>
                            </div>
                          </div>
                        );
                      })
                    }
                    {imageList.map((image, index) => (
                      <div
                        key={index}
                        className="image-item"
                        style={{
                          position: "relative",
                        }}
                      >
                        <img
                          src={image["data_url"]}
                          style={{ borderRadius: "8px" }}
                          alt="Not found"
                          width="200"
                        />
                        <div
                          className="image-item__btn-wrapper"
                          style={{
                            position: "absolute",
                            top: "8px",
                            right: "4px",
                          }}
                        >
                          <Link
                            className="btn btn-sm btn-icon btn-primary"
                            data-bs-toggle="tooltip"
                            title="Edit "
                            to="#"
                            onClick={() => onImageUpdate(index)}
                            style={{
                              borderRadius: "70%",
                              alignItems: "center",
                              marginRight: "8px",
                            }}
                          >
                            <svg
                              class="icon-32"
                              width="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.7476 20.4428H21.0002"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                              <path
                                d="M11.021 6.00098L16.4732 10.1881"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                            </svg>
                          </Link>
                          <Link
                            className="btn btn-sm btn-icon btn-danger"
                            data-bs-toggle="tooltip"
                            title="Delete User"
                            to="#"
                            style={{
                              borderRadius: "50%",
                              alignItems: "center",
                            }}
                            onClick={() => onImageRemove(index)}
                          >
                            <svg
                              class="icon-32"
                              width="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {" "}
                              <path
                                d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                              <path
                                d="M20.708 6.23975H3.75"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                              <path
                                d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                            </svg>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  {!!imageList.length && (
                    <div className="mt-3">
                      <Button
                        style={{
                          background: "white",
                          color: "black",
                        }}
                        onClick={onImageRemoveAll}
                      >
                        Remove all images
                      </Button>
                    </div>
                  )}

                  {isInvalidPhoto && images.length == 0 ? (
                    <p
                      style={{ display: "block" }}
                      className="invalid-feedback"
                    >
                      Vui lòng thêm ít nhất 1 hình
                    </p>
                  ) : null}
                </div>
              )}
            </ImageUploading>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title">
              <h5 className="card-title"> Thuộc tính</h5>
            </div>
          </Card.Header>
          <Card.Body>
            <Variants
              variants={variants}
              prices={priceList}
              onChangePrices={(prices) =>
                dispatchProduct({
                  type: "SET_PRICES",
                  payload: prices,
                })
              }
              onChange={(variants) => setVariants(variants)}
            ></Variants>
            {isInvalidPrice &&
            priceList.filter((price) => {
              return price.price && price.price > 0;
            }).length === 0 ? (
              <p style={{ display: "block" }} className="invalid-feedback">
                Vui lòng thêm giá bán
              </p>
            ) : null}
          </Card.Body>
        </Card>

        <div>
          <Button
            onClick={() => {
              const isValidName = validateName();
              const isValidBarcode = validateBarcode();
              const isValidDescription = validateDescription();
              const isValidCategory = validateCategory();
              const isValidPhoto = validatePhoto();
              const isInvalidPrice = validatePrice();

              if (
                !isValidName ||
                !isValidBarcode ||
                !isValidDescription ||
                !isValidCategory ||
                !isValidPhoto ||
                !isInvalidPrice
              ) {
                return;
              }

              const _product = {
                ...product,
                priceList: product.priceList
                  .filter((price) => {
                    return price.price && price.price > 0;
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
              setModal(<LoadingModal></LoadingModal>);
              //push images
              ImageModel.upload(images).then((res) => {
                const { data } = res;

                data.forEach((url, i) => {
                  _product.photoList.push({
                    url,
                    isMain: i === 0,
                  });
                });

                setImages([]);

                const promise = isNewMode
                  ? ProductModel.addProduct(_product)
                  : ProductModel.update(_product);

                promise
                  .then(() => {
                    setModal(
                      <SuccessModal
                        handleCloseModal={() => {
                          setModal(null);
                          navigate(
                            "/dashboard/product-management/product-list"
                          );
                        }}
                        message={
                          isNewMode
                            ? "Thêm mới sản phẩm thành công"
                            : "Chỉnh sửa sản phẩm thành công"
                        }
                      ></SuccessModal>
                    );
                  })
                  .catch((e) => {
                    // setModal(null);
                    setModal(
                      <ErrorModal
                        handleCloseModal={() => {
                          setModal(null);
                        }}
                        errorMessage={"Thao tác không thành công"}
                      ></ErrorModal>
                    );
                  })
                  .finally(() => setIsLoading(false));
              });
            }}
            variant="btn btn-primary"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </div>
      <CategoryProvider>
        <CategoryModal
          categoryId={categoryId}
          hideCategoryModel={hideCategoryModel}
          handleCategoryChange={(category) => {
            setInvalidCategory(false);
            console.log("dispatchProduct, category", category);
            dispatchProduct({
              type: "SET_CATEGORY",
              payload: category,
            });

            setHideCategoryModel(true);
          }}
          handleCloseModal={() => setHideCategoryModel(true)}
        ></CategoryModal>
      </CategoryProvider>
    </>
  );
};

/**
 * e.g price = {color: 'blue', size: 'M', price: 1000, quantity: 12, sku: "123"}
 * e.g variant = {name: 'color', values: ['blue', 'red']}
 */
const Variants = ({ variants, onChange, prices, onChangePrices }) => {
  const [fails, setFailed] = useState([]);

  //remote unvalid values
  const handleBeforeSavingVariants = (variants) => {
    const filteredVariants = variants.map((variant) => ({
      ...variant,
      values: variant.values.filter((value) => value && value.trim() !== ""),
    }));

    const filteredPrices = handleBeforeSavingPrices(prices);
    if (!filteredPrices.length != prices.length) {
      onChangePrices(filteredPrices);
    }

    return filteredVariants.filter(
      (variant) => variant.name || variant.values.length
    );
  };

  let _variants = [...variants];
  if (_variants.length < 2) {
    _variants = [...variants, { name: "", values: [] }];
  }

  let rows = [];

  const variantsHaveValues = variants.filter(
    (variant) => variant.values.length
  );

  if (variantsHaveValues.length === 1) {
    rows = variants[0].values.map((value) => [value]);
  } else if (variantsHaveValues.length === 2) {
    variants[0].values.forEach((value1) => {
      variants[1].values.forEach((value2) => {
        rows.push([value1, value2]);
      });
    });
  }

  const variantNames = variantsHaveValues.map(({ name }) => name);

  let defaultPrice = prices.find((price) => {
    for (let i = 0; i < variantNames.length; i++) {
      if (price[variantNames[i]] !== undefined) {
        return false;
      }
    }
    return true;
  });

  if (!defaultPrice) {
    defaultPrice = {
      price: "",
      quantity: "",
      sku: "",
    };
    prices.push(defaultPrice);
  }

  const handleBeforeSavingPrices = (prices) => {
    return prices.filter((price) => {
      if (variantNames.length === 0) {
        if (Object.keys(price).length === 3) {
          return true;
        }
      } else if (variantNames.length === 1) {
        if (
          Object.keys(price).length === 4 &&
          variantsHaveValues[0].values.indexOf(price[variantNames[0]]) !== -1
        ) {
          return true;
        }
      } else {
        if (
          Object.keys(price).length === 5 &&
          variantsHaveValues[0].values.indexOf(price[variantNames[0]]) !== -1 &&
          variantsHaveValues[1].values.indexOf(price[variantNames[1]]) !== -1
        ) {
          return true;
        }
      }
    });
  };

  return (
    <div>
      <div>
        <Row style={{ display: "flex" }}>
          {_variants.map(({ name, values }, index) => {
            const _values = [...values, ""];
            return (
              <Col md="6">
                <div
                  style={{
                    marginBottom: "16px",
                    border: "1px solid lightgrey",
                    borderRadius: "8px",
                    padding: "16px",
                  }}
                >
                  <div>
                    <Form.Label htmlFor={index}>
                      Nhóm phân loại {index + 1}
                    </Form.Label>

                    <Form.Control
                      id={index}
                      key={index}
                      value={name}
                      type="text"
                      onChange={(e) => {
                        _variants[index]["name"] = e.target.value;
                        onChange(handleBeforeSavingVariants(_variants));
                      }}
                    />
                  </div>
                  <div>
                    {_values.map((value, indexValue) => {
                      return (
                        <div
                          className="mt-3"
                          style={{ display: "flex", verticalAlign: "center" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginRight: "16px",
                            }}
                          >
                            <div>Phân loại {indexValue + 1}</div>
                          </div>
                          <div>
                            <Form.Control
                              key={indexValue}
                              value={value}
                              type="text"
                              onChange={(e) => {
                                _variants[index]["values"][indexValue] =
                                  e.target.value;
                                onChange(handleBeforeSavingVariants(_variants));
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>

      <div className="mt-3">
        <h5>
          Giá bán
          <span className="text-danger"> {" *"}</span>
        </h5>
        <Table
          responsive
          striped
          id="datatable"
          className="mt-3"
          data-toggle="data-table"
        >
          <thead>
            <tr>
              {variantsHaveValues.map(({ name }) => (
                <th>{name}</th>
              ))}
              <th>Giá</th>
              <th>Kho</th>
              <th>SKU</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td>
                  <Form.Control
                    value={defaultPrice.price}
                    type="number"
                    onChange={(e) => {
                      defaultPrice.price = e.target.value;
                      onChangePrices(handleBeforeSavingPrices([...prices]));
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    value={defaultPrice.quantity}
                    type="number"
                    onChange={(e) => {
                      defaultPrice.quantity = e.target.value;
                      onChangePrices(handleBeforeSavingPrices([...prices]));
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    value={defaultPrice.sku}
                    type="text"
                    onChange={(e) => {
                      defaultPrice.sku = e.target.value;
                      onChangePrices(handleBeforeSavingPrices([...prices]));
                    }}
                  />
                </td>
              </tr>
            ) : (
              rows.map(([value1, value2], index) => {
                let priceObject = prices.find((price) => {
                  if (
                    price[variantNames[0]] === value1 &&
                    (!value2 || value2 == price[variantNames[1]])
                  ) {
                    return true;
                  }

                  return false;
                });

                if (!priceObject) {
                  priceObject = {
                    [variantNames[0]]: value1,
                    price: "",
                    quantity: "",
                    sku: "",
                  };

                  if (value2) {
                    priceObject[variantNames[1]] = value2;
                  }

                  prices.push(priceObject);
                }

                return (
                  <tr key={index}>
                    <td>{value1}</td>
                    {value2 && <td>{value2}</td>}
                    <td>
                      <Form.Control
                        key={index}
                        value={priceObject.price}
                        type="number"
                        onChange={(e) => {
                          priceObject.price = e.target.value;
                          onChangePrices(handleBeforeSavingPrices([...prices]));
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        key={index}
                        value={priceObject.quantity}
                        type="number"
                        onChange={(e) => {
                          priceObject.quantity = e.target.value;
                          onChangePrices(handleBeforeSavingPrices([...prices]));
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        key={index}
                        value={priceObject.sku}
                        type="text"
                        onChange={(e) => {
                          priceObject.sku = e.target.value;
                          onChangePrices(handleBeforeSavingPrices([...prices]));
                        }}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Product;
