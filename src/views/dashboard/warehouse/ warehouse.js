import React, { useEffect, useState } from "react";
import { Row, Col, Image, Modal, Form, Button, Table } from "react-bootstrap";
import Card from "../../../components/Card";

import { Link, useNavigate } from "react-router-dom";
import { createArrayFrom1ToN } from "../../../helper";
import { Search } from "../../../components/common/search";
import { Loading } from "../../../components/common/loading";

import { Product } from "../../../models/product";

function ColorfulText({ status }) {
  return <span style={{ color: "green" }}>{status}</span>;
}

const Warehouse = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState({}); // state đầu tiên -> rỗng
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1); // lưu current page, set thì render lại
  const [perPage, setPerpage] = useState(10); // Lưu perpage, đnag set cứng alf 5

  const { data: products, pagination } = response; // products từ response
  const total = pagination?.total ?? 0;

  const totalPage = Math.ceil(total / perPage); // dư 1 sp vân là 1 page
  const fetchList = (page, perPage, search = undefined) => {
    // lấy từ API
    setIsLoading(true);
    Product.getList({
      page, // Offset
      perPage, // limit,
      search,
    })
      .then(({ data }) => {
        if (!data) {
          return;
        }
        setResponse(data); // set data cho state respone
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    //chạy khi page change khi set page/ text change/ filter
    fetchList(page, perPage, searchText);
  }, [page]);
  useEffect(() => {
    //chạy khi page change khi set page/ text change/ filter
    setPage(1);
    fetchList(1, perPage, searchText);
  }, [searchText]);

  return (
    <Card>
      {modal}
      <Card.Header className="d-flex justify-content-between">
        <div className="header-title">
          <h4 className="card-title">Danh sách kho</h4>
        </div>
      </Card.Header>
      <Card.Body>
        <div>
          <Search onEnter={(value) => setSearchText(value)}></Search>
        </div>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="border-bottom my-3">
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
                  <th>Thuộc tính</th>

                  <th>Nhà cung cấp</th>
                  <th>Giá bán</th>
                  {/* <th>Tồn kho</th> */}
                  {/* <th>Ngày tạo</th> */}
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((item) => {
                  const listPrices = item.productPrices.map((price) =>
                    parseInt(price.exportPrice)
                  );

                  const minPrice = Math.min(...listPrices);
                  const maxPrice = Math.max(...listPrices);

                  return (
                    <tr key={item.id}>
                      <td>
                        {item.productPhotos?.slice(0, 1).map((productPhoto) => {
                          return (
                            <img
                              height="80px"
                              width="80px"
                              src={productPhoto.url}
                            ></img>
                          );
                        })}
                      </td>
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
                        <a>{item.name}</a>
                      </td>
                      <td>{item.barcode}</td>
                      <td>{item.category.name}</td>
                      {/* <td>{item.label}</td> */}
                      {/* <td
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></td> */}
                      <td>
                        {/* {item.productPrices?.map((productPrices) => {
                        return productPrices.exportPrice;
                      })} */}
                        {minPrice && maxPrice ? (
                          minPrice === maxPrice ? (
                            <span>{maxPrice}</span>
                          ) : (
                            <span>
                              {minPrice} - {maxPrice}
                            </span>
                          )
                        ) : null}
                      </td>
                      {/* <td>{item.stock}</td> */}
                      <td>{item.status}</td>
                      {/* <td>
                  <span className={`badge ${item.color}`}>{item.status}</span>
                </td> */}
                      <td>
                        <div style={{ float: "right" }}>
                          <Link
                            className="btn btn-sm btn-icon text-primary flex-end"
                            data-bs-toggle="tooltip"
                            title="Edit product"
                            to="#"
                            onClick={() => {
                              navigate(
                                "/dashboard/product-management/product-list/product/" +
                                  item.id
                              );
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
                          <Link
                            className="btn btn-sm btn-icon text-danger"
                            data-bs-toggle="tooltip"
                            title="Delete Product"
                            to="#"
                            onClick={() =>
                              setModal(
                                <DeleteProductModal
                                  product={item}
                                  handleCloseModal={() => setModal(null)}
                                />
                              )
                            }
                          >
                            <span>
                              <span>
                                <svg
                                  class="icon-32"
                                  width="24"
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
                              </span>
                            </span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Row className="align-items-center">
              <Col md="6">
                <div
                  className="dataTables_info"
                  id="datatable_info"
                  role="status"
                  aria-live="polite"
                >
                  {total !== 0
                    ? `Showing ${(page - 1) * perPage + 1} to ${
                        page * perPage <= total ? page * perPage : total
                      } of ${pagination?.total ?? 0} entries`
                    : null}
                </div>
              </Col>
              <Col md="6" style={{ paddingTop: 16 }}>
                <div
                  className="dataTables_paginate paging_simple_numbers"
                  id="datatable_paginate"
                >
                  <ul style={{ justifyContent: "end" }} className="pagination">
                    {createArrayFrom1ToN(totalPage).map((pageIndex) => {
                      return (
                        <li
                          className={
                            "paginate_button page-item " +
                            (page === pageIndex ? "active" : "")
                          }
                          id={pageIndex}
                          onClick={() => setPage(pageIndex)}
                        >
                          <Link
                            to="#"
                            aria-controls="datatable"
                            aria-disabled="true"
                            data-dt-idx="previous"
                            tabIndex="0"
                            className="page-link"
                          >
                            {pageIndex}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Warehouse;
