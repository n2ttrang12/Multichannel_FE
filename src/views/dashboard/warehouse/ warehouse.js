import React, { useEffect, useState } from "react";
import { Row, Col, Image, Modal, Form, Button, Table } from "react-bootstrap";
import Card from "../../../components/Card";

import { Link, useNavigate } from "react-router-dom";
import { createArrayFrom1ToN } from "../../../helper";
import { Search } from "../../../components/common/search";
import { Loading } from "../../../components/common/loading";

import { WarehouseModal } from "../../../models/warehouse";

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

  const { data: productInWarehouses, pagination } = response; // products từ response
  const total = pagination?.total ?? 0;

  const totalPage = Math.ceil(total / perPage); // dư 1 sp vân là 1 page
  const fetchList = (page, perPage, search = undefined) => {
    // lấy từ API
    setIsLoading(true);
    WarehouseModal.getList({
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
                  <th>Ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Barcode</th>
                  <th>Giá bán</th>
                  <th>Tồn kho</th>
                  <th>Trong đơn hàng</th>
                  <th>Sẵn có</th>
                </tr>
              </thead>
              <tbody>
                {productInWarehouses?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        {item.productPrices?.product?.productPhotos
                          ?.slice(0, 1)
                          .map((productPhotos) => {
                            return (
                              <img
                                height="80px"
                                width="80px"
                                src={productPhotos.url}
                              ></img>
                            );
                          })}
                      </td>
                      <td
                        onClick={() => {
                          navigate(
                            "/dashboard/warehouse/list-products/details/" +
                              item.id
                          );
                        }}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <div>{item.productPrices?.product?.name}</div>
                        <div>
                          {item.productPrices?.variant
                            ? item.productPrices?.variant?.variant?.name +
                              ": " +
                              item.productPrices?.variant?.value
                            : ""}
                        </div>
                        <p>
                          {item.productPrices?.variant2
                            ? item.productPrices?.variant2?.variant?.name +
                              ": " +
                              item.productPrices?.variant2?.value
                            : ""}
                        </p>
                      </td>
                      <td>{item.productPrices?.product?.barcode}</td>
                      <td>{item.productPrices?.exportPrice}</td>

                      <td>{item.quantityInStock}</td>
                      <td>{item.quantityInOrder}</td>
                      <td>{item.quantityInStock - item.quantityInOrder}</td>
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
