import React from "react";
import { Row, Col, Table, Image } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
//img
import shap1 from "../../../assets/images/products/ao thun.jpg";
import shap2 from "../../../assets/images/products/áo thun thêu.jpg";
const Data_table = [
  {
    img: `${shap1}`,
    productId: "SP00001",
    productName: "Áo thun cotton thêu hoa",
    label: "Quần áo",
    inventory: "1000",
    canSell: "500",
    price: "2.000.000",
    importPrice: "1.000.000",
    delivery: "200",
  },
  {
    img: `${shap2}`,
    productId: "SP00002",
    productName: "Áo thun cotton",
    label: "Quần áo",
    inventory: "1000",
    canSell: "500",
    price: "3.400.000",
    importPrice: "1.500.000",
    delivery: "200",
  },
  {
    img: `${shap1}`,
    productId: "SP00003",
    productName: "Áo thun cotton thêu hoa",
    label: "Quần áo",
    inventory: "1000",
    canSell: "500",
    price: "2.000.000",
    importPrice: "1.000.000",
    delivery: "200",
  },
];
const ProductDestruction = () => {
  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Danh sách đơn nhập hàng</h4>
          </div>
        </Card.Header>
        <Card.Body>
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
                  <th>Mã SP</th>
                  <th>Nhãn hiệu</th>
                  <th>Tồn kho</th>
                  <th>Có thể bán</th>
                  <th>Giá bán lẻ</th>
                  <th>Giá nhập</th>
                  <th>Đang giao</th>
                </tr>
              </thead>
              <tbody>
                {Data_table.map((item) => (
                  <tr key={item.supplierId}>
                    <td className="text-center">
                      <Image
                        className="bg-soft-primary rounded img-fluid avatar-40 me-3"
                        src={item.img}
                        alt="profile"
                      />
                    </td>
                    <td>{item.productName}</td>
                    <td>{item.productId}</td>
                    <td>{item.label}</td>
                    <td>{item.inventory}</td>
                    <td>{item.canSell}</td>
                    <td>{item.price}</td>
                    <td>{item.importPrice}</td>
                    <td>{item.delivery}</td>
                  </tr>
                ))}
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
                  Showing 1 to 10 of 57 entries
                </div>
              </Col>
              <Col md="6">
                <div
                  className="dataTables_paginate paging_simple_numbers"
                  id="datatable_paginate"
                >
                  <ul className="pagination">
                    <li
                      className="paginate_button page-item previous disabled"
                      id="datatable_previous"
                    >
                      <Link
                        to="#"
                        aria-controls="datatable"
                        aria-disabled="true"
                        data-dt-idx="previous"
                        tabIndex="0"
                        className="page-link"
                      >
                        Previous
                      </Link>
                    </li>
                    <li className="paginate_button page-item active">
                      <Link
                        to="#"
                        aria-controls="datatable"
                        aria-current="page"
                        data-dt-idx="0"
                        tabIndex="0"
                        className="page-link"
                      >
                        1
                      </Link>
                    </li>
                    <li className="paginate_button page-item ">
                      <Link
                        to="#"
                        aria-controls="datatable"
                        data-dt-idx="1"
                        tabIndex="0"
                        className="page-link"
                      >
                        2
                      </Link>
                    </li>
                    <li className="paginate_button page-item ">
                      <Link
                        to="#"
                        aria-controls="datatable"
                        data-dt-idx="2"
                        tabIndex="0"
                        className="page-link"
                      >
                        3
                      </Link>
                    </li>
                    <li className="paginate_button page-item ">
                      <Link
                        to="#"
                        aria-controls="datatable"
                        data-dt-idx="3"
                        tabIndex="0"
                        className="page-link"
                      >
                        4
                      </Link>
                    </li>
                    <li className="paginate_button page-item ">
                      <Link
                        to="#"
                        aria-controls="datatable"
                        data-dt-idx="4"
                        tabIndex="0"
                        className="page-link"
                      >
                        5
                      </Link>
                    </li>
                    <li className="paginate_button page-item ">
                      <Link
                        to="#"
                        aria-controls="datatable"
                        data-dt-idx="5"
                        tabIndex="0"
                        className="page-link"
                      >
                        6
                      </Link>
                    </li>
                    <li
                      className="paginate_button page-item next"
                      id="datatable_next"
                    >
                      <Link
                        to="#"
                        aria-controls="datatable"
                        data-dt-idx="next"
                        tabIndex="0"
                        className="page-link"
                      >
                        Next
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductDestruction;
