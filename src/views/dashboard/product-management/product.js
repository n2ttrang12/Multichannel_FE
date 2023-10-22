import React, { useEffect, useReducer, useState } from "react";
import { Row, Col, Image, Modal, Form, Button, Table } from "react-bootstrap";
import ImageUploading from "react-images-uploading";
import Card from "../../../components/Card";
import { Product as ProductModel } from "../../../models/product";
import { useNavigate } from "react-router-dom";

const Product = () => {
  //form validation
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
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
          price: 0,
          quantity: 0,
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

  console.log(product);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  const [validated1, setValidated1] = useState(false);
  const handleSubmit1 = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated1(true);
  };
  return (
    <>
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
                <Form>
                  <Row>
                    <Col md="6" className="mb-3">
                      <Form.Label md="6" htmlFor="validationDefault01">
                        Tên sản phẩm
                        <span className="text-danger"> {" *"}</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={name}
                        id="validationDefault01"
                        onChange={(e) =>
                          dispatchProduct({
                            type: "SET_NAME",
                            payload: e.target.value,
                          })
                        }
                        required
                      />
                    </Col>
                    <Col md="6" className="mb-3">
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
                    </Col>
                    <Col md="6" className="mb-3">
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
                    </Col>
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
                    <Col md="6" className="mb-3">
                      <Form.Label md="6" htmlFor="validationDefault01">
                        Mã vạch (Barcode)
                        {/* <span className="text-danger"> {" *"}</span> */}
                      </Form.Label>
                      <Form.Control
                        onChange={(e) =>
                          dispatchProduct({
                            type: "SET_BARCODE",
                            payload: e.target.value,
                          })
                        }
                        value={barcode}
                        type="text"
                        id="validationDefault01"
                        required
                      />
                    </Col>
                    <Col md="6" className="mb-3">
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
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h5 className="card-title"> Hình ảnh</h5>
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
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item">
                            <img
                              src={image["data_url"]}
                              style={{ borderRadius: "8px" }}
                              alt=""
                              width="100"
                            />
                            <div className="image-item__btn-wrapper">
                              <button onClick={() => onImageUpdate(index)}>
                                Update
                              </button>
                              <button onClick={() => onImageRemove(index)}>
                                Remove
                              </button>
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
                {/* <Form className="was-validated" validated> */}
                {/* <Form.Group>
                    <Form.Label htmlFor="validationDefault02">
                      Loại sản phẩm
                    </Form.Label>
                    <Form.Select id="validationDefault04" required>
                      <option defaultValue>Choose...</option>
                      <option>...</option>
                    </Form.Select>
                  </Form.Group> */}
                <Form.Group className="form-group">
                  <Form.Label htmlFor="exampleFormControlSelect1">
                    Loại sản phẩm
                  </Form.Label>
                  <select
                    value={6268}
                    className="form-select"
                    id="exampleFormControlSelect1"
                  >
                    <option>Chọn loại sản phẩm</option>
                    <option value={6268}>
                      Thời Trang Nữ | Quần nữ | Quần jean nữ
                    </option>
                    <option>18-26</option>
                    <option>26-46</option>
                    <option>46-60</option>
                    <option>Above 60</option>
                  </select>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="exampleFormControlSelect1">
                    Nhã hiệu
                  </Form.Label>
                  <select
                    className="form-select"
                    id="exampleFormControlSelect1"
                  >
                    <option>Chọn nhãn hiệu</option>
                    <option>0-18</option>
                    <option>18-26</option>
                    <option>26-46</option>
                    <option>46-60</option>
                    <option>Above 60</option>
                  </select>
                </Form.Group>
                <Form.Group className="mb-3 form-group">
                  <Form.Label htmlFor="exampleFormControlTextarea1">
                    Mô tả
                  </Form.Label>
                  <Form.Control
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
                  />
                </Form.Group>
                {/* </Form> */}
              </Card.Body>
            </Card>
          </Col>
          <div>
            <Button
              onClick={() => {
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
                    navigate("/dashboard/product-management/product-list");
                  })
                  .catch((e) => console.log(e));
              }}
              variant="btn btn-primary"
              type="submit"
            >
              Submit form
            </Button>
          </div>
        </Row>
      </div>
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
        {_variants.map(({ name, values }, index) => {
          const _values = [...values, ""];
          return (
            <div
              style={{
                border: "1px solid blue",
                padding: "24px",
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
          );
        })}
      </div>

      <div className="mt-3">
        <h5>Giá bán</h5>
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
                    type="text"
                    onChange={(e) => {
                      defaultPrice.price = e.target.value;
                      onChangePrices(handleBeforeSavingPrices([...prices]));
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    value={defaultPrice.quantity}
                    type="text"
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
                        type="text"
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
                        type="text"
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
