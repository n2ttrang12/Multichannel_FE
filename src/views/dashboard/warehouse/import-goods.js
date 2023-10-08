import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";

const Data_table = [
  {
    receivingId: "DHN00001",
    importTime: "01/01/2023 21:05",
    branch: "Outerity",
    supplier: "Cửa hàng quần áo Outerity",
    employee: "Nguyễn Anh Thư",
    quantity: "1000",
    total: "10.000.000",
    status: "Hoàn thành",
    importStatus: "Đã nhập",
    paymentStatus: "Đã thanh toán",
    colorStatus: "bg-success",
    colorImportStatus: "bg-success",
    colorPaymentStatus: "bg-success",
  },
  {
    receivingId: "DHN00002",
    importTime: "01/01/2023 21:05",
    branch: "Outerity",
    supplier: "Cửa hàng quần áo Outerity",
    employee: "Nguyễn Anh Thư",
    quantity: "1000",
    total: "10.000.000",
    status: "Đang giao dịch",
    importStatus: "Đã nhập",
    paymentStatus: "chưa thanh toán",
    colorStatus: "bg-primary",
    colorImportStatus: "bg-success",
    colorPaymentStatus: "bg-warning",
  },
];
const ImportGoods = () => {
  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Danh sách nhập hàng</h4>
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
                  <th>Mã đơn</th>
                  <th>Ngày nhập</th>
                  <th>Chi nhánh tạo</th>
                  <th>Nhà cung cấp</th>
                  <th>Nhân viên tạo</th>
                  <th>Số lượng đặt</th>
                  <th>Giá trị đơn</th>
                  <th>Trạng thái</th>
                  <th>Trạng thái nhập</th>
                  <th>Trạng thái thanh toán</th>
                </tr>
              </thead>
              <tbody>
                {Data_table.map((item) => (
                  <tr key={item.receivingId}>
                    <td>{item.receivingId}</td>
                    <td>{item.importTime}</td>
                    <td>{item.branch}</td>
                    <td>{item.supplier}</td>
                    <td>{item.employee}</td>
                    <td>{item.quantity}</td>
                    <td>{item.total}</td>
                    <td>
                      <span className={`badge ${item.colorStatus}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${item.colorImportStatus}`}>
                        {item.importStatus}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${item.colorPaymentStatus}`}>
                        {item.paymentStatus}
                      </span>
                    </td>
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

export default ImportGoods;
