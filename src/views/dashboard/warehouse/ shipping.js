import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
const Data_table = [
  {
    shippingId: "PKH098111",
    shipBranch: "Cửa hàng 1",
    receiveBranch: "Cửa hàng 2",
    shippingDate: "27/03/2023 14:38",
    creator: "Nguyễn Anh Thư",
    total: "1000",
    receiver: "Nguyễn Mai Anh",
    sender: "Nguyễn Oanh",
    note: "---",
    canceller: "Nguyễn Minh",
    cancelDate: "27/04/2023 14:38",
  },
  {
    shippingId: "PKH098112",
    shipBranch: "Cửa hàng 1",
    receiveBranch: "Cửa hàng 2",
    shippingDate: "27/03/2023 14:38",
    creator: "Nguyễn Anh Thư",
    total: "1000",
    receiver: "Nguyễn Mai Anh",
    sender: "Nguyễn Oanh",
    note: "---",
    canceller: "Nguyễn Minh",
    cancelDate: "27/04/2023 14:38",
  },
];
const Shipping = () => {
  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Danh sách chuyển hàng</h4>
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
                  <th>Mã phiếu chuyển</th>
                  <th>Chi nhánh chuyển</th>
                  <th>Chi nhánh nhận</th>
                  <th>Ngày chuyển</th>
                  <th>Người tạo</th>
                  <th>Số lượng</th>
                  <th>Người nhận</th>
                  <th>Người chuyển</th>
                  <th>Ghi chú</th>
                  <th>Người hủy</th>
                  <th>Ngày hủy</th>
                </tr>
              </thead>
              <tbody>
                {Data_table.map((item) => (
                  <tr key={item.shippingId}>
                    <td>{item.shippingId}</td>
                    <td>{item.shipBranch}</td>
                    <td>{item.receiveBranch}</td>
                    <td>{item.shippingDate}</td>
                    <td>{item.creator}</td>
                    <td>{item.total}</td>
                    <td>{item.receiver}</td>
                    <td>{item.sender}</td>
                    <td>{item.note}</td>
                    <td>{item.canceller}</td>
                    <td>{item.cancelDate}</td>
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

export default Shipping;
