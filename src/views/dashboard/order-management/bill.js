import React from "react";
import { Row, Col, Image, Form, Button, Table } from "react-bootstrap";
import Card from "../../../components/Card";

import { Link } from "react-router-dom";
// img
import avatars1 from "../../../assets/images/avatars/01.png";
import avatars2 from "../../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../assets/images/avatars/avtar_5.png";

const Data_table = [
  {
    billId: "HD00001",
    orderId: "HH00001",
    status: "Đã phát hành",
    billNumber: "",
    symbol: "",
    entity: "",
    searchId: "",
    branch: "Cửa hàng",
    customer: "Nguyễn Hải",
    totals: "120.000",
    date: "12/12/2023",
    paymentMethod: "Tiền mặt",
  },
  {
    billId: "HD00001",
    orderId: "HH00001",
    status: "Đã phát hành",
    billNumber: "",
    symbol: "",
    entity: "",
    searchId: "",
    branch: "Cửa hàng",
    customer: "Nguyễn Hải",
    totals: "120.000",
    date: "12/12/2023",
    paymentMethod: "Tiền mặt",
  },
  {
    billId: "HD00001",
    orderId: "HH00001",
    status: "Đã phát hành",
    billNumber: "",
    symbol: "",
    entity: "",
    searchId: "",
    branch: "Cửa hàng",
    customer: "Nguyễn Hải",
    totals: "120.000",
    date: "12/12/2023",
    paymentMethod: "Tiền mặt",
  },
  {
    billId: "HD00001",
    orderId: "HH00001",
    status: "Đã phát hành",
    billNumber: "",
    symbol: "",
    entity: "",
    searchId: "",
    branch: "Cửa hàng",
    customer: "Nguyễn Hải",
    totals: "120.000",
    date: "12/12/2023",
    paymentMethod: "Tiền mặt",
  },
  {
    billId: "HD00001",
    orderId: "HH00001",
    status: "Đã phát hành",
    billNumber: "",
    symbol: "",
    entity: "",
    searchId: "",
    branch: "Cửa hàng",
    customer: "Nguyễn Hải",
    totals: "120.000",
    date: "12/12/2023",
    paymentMethod: "Tiền mặt",
  },
  {
    billId: "HD00001",
    orderId: "HH00001",
    status: "Đã phát hành",
    billNumber: "",
    symbol: "",
    entity: "",
    searchId: "",
    branch: "Cửa hàng",
    customer: "Nguyễn Hải",
    totals: "120.000",
    date: "12/12/2023",
    paymentMethod: "Tiền mặt",
  },
  {
    billId: "HD00001",
    orderId: "HH00001",
    status: "Đã phát hành",
    billNumber: "",
    symbol: "",
    entity: "",
    searchId: "",
    branch: "Cửa hàng",
    customer: "Nguyễn Hải",
    totals: "120.000",
    date: "12/12/2023",
    paymentMethod: "Tiền mặt",
  },
  {
    billId: "HD00001",
    orderId: "HH00001",
    status: "Đã phát hành",
    billNumber: "",
    symbol: "",
    entity: "",
    searchId: "",
    branch: "Cửa hàng",
    customer: "Nguyễn Hải",
    totals: "120.000",
    date: "12/12/2023",
    paymentMethod: "Tiền mặt",
  },
  {
    billId: "HD00001",
    orderId: "HH00001",
    status: "Đã phát hành",
    billNumber: "",
    symbol: "",
    entity: "",
    searchId: "",
    branch: "Cửa hàng",
    customer: "Nguyễn Hải",
    totals: "120.000",
    date: "12/12/2023",
    paymentMethod: "Tiền mặt",
  },
  {
    billId: "HD00001",
    orderId: "HH00001",
    status: "Đã phát hành",
    billNumber: "",
    symbol: "",
    entity: "",
    searchId: "",
    branch: "Cửa hàng",
    customer: "Nguyễn Hải",
    totals: "120.000",
    date: "12/12/2023",
    paymentMethod: "Tiền mặt",
  },
];
function ColorfulText({ status }) {
  return <span style={{ color: "green" }}>{status}</span>;
}
const Bill = () => {
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between">
        <div className="header-title">
          <h4 className="card-title">Danh sách đơn hàng</h4>
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
                <th>Mã Hóa đơn</th>
                <th>Mã đơn hàng</th>
                <th>Trạng thái đơn hàng</th>
                <th>Số hóa đơn</th>
                <th>Ký hiệu</th>
                <th>Đơn vị phát hành</th>
                <th>Mã tra cứu</th>
                <th>Chi nhánh</th>
                <th>Khách hàng</th>
                <th>Tổng tiền</th>
                <th>Ngày tạo</th>
                <th>Phương thức thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {Data_table.map((item) => (
                <tr key={item.billId}>
                  <td>{item.billId}</td>
                  <td>{item.orderId}</td>
                  <td>{item.status}</td>
                  <td>{item.billNumber}</td>
                  <td>{item.symbol}</td>
                  <td>{item.entity}</td>
                  <td>{item.searchId}</td>
                  <td>{item.branch}</td>
                  <td>{item.customer}</td>
                  <td>{item.totals}</td>
                  <td>{item.date}</td>
                  <td>{item.paymentMethod}</td>
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
  );
};

export default Bill;
