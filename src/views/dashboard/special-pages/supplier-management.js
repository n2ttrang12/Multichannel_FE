import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
const Data_table = [
  {
    supplierId: "KH00001",
    name: "Công ty CP MSC",
    phone: "0987654322",
    email: "msccompany@gmail.com",
    address: "216 Chu Văn An, phường 12, Q.Bình Thạnh, TP.HCM",
    totalDebt: "10.000.000",
    status: "Đã phát hành",
    color: "bg-success",
  },
  {
    supplierId: "KH00001",
    name: "Công ty CP MSC",
    phone: "0987654322",
    email: "msccompany@gmail.com",
    address: "216 Chu Văn An, phường 12, Q.Bình Thạnh, TP.HCM",
    totalDebt: "10.000.000",
    status: "Ngưng hợp tác",
    color: "bg-danger",
  },
  {
    supplierId: "KH00001",
    name: "Công ty CP MSC",
    phone: "0987654322",
    email: "msccompany@gmail.com",
    address: "216 Chu Văn An, phường 12, Q.Bình Thạnh, TP.HCM",
    totalDebt: "10.000.000",
    status: "Đã phát hành",
    color: "bg-success",
  },
  {
    supplierId: "KH00001",
    name: "Công ty CP MSC",
    phone: "0987654322",
    email: "msccompany@gmail.com",
    address: "216 Chu Văn An, phường 12, Q.Bình Thạnh, TP.HCM",
    totalDebt: "10.000.000",
    status: "Ngưng hợp tác",
    color: "bg-danger",
  },
  {
    supplierId: "KH00001",
    name: "Công ty CP MSC",
    phone: "0987654322",
    email: "msccompany@gmail.com",
    address: "216 Chu Văn An, phường 12, Q.Bình Thạnh, TP.HCM",
    totalDebt: "10.000.000",
    status: "Đã phát hành",
    color: "bg-success",
  },
  {
    supplierId: "KH00001",
    name: "Công ty CP MSC",
    phone: "0987654322",
    email: "msccompany@gmail.com",
    address: "216 Chu Văn An, phường 12, Q.Bình Thạnh, TP.HCM",
    totalDebt: "10.000.000",
    status: "Đã phát hành",
    color: "bg-success",
  },
  {
    supplierId: "KH00001",
    name: "Công ty CP MSC",
    phone: "0987654322",
    email: "msccompany@gmail.com",
    address: "216 Chu Văn An, phường 12, Q.Bình Thạnh, TP.HCM",
    totalDebt: "10.000.000",
    status: "Đã phát hành",
    color: "bg-success",
  },
  {
    supplierId: "KH00001",
    name: "Công ty CP MSC",
    phone: "0987654322",
    email: "msccompany@gmail.com",
    address: "216 Chu Văn An, phường 12, Q.Bình Thạnh, TP.HCM",
    totalDebt: "10.000.000",
    status: "Đã phát hành",
    color: "bg-success",
  },
  {
    supplierId: "KH00001",
    name: "Công ty CP MSC",
    phone: "0987654322",
    email: "msccompany@gmail.com",
    address: "216 Chu Văn An, phường 12, Q.Bình Thạnh, TP.HCM",
    totalDebt: "10.000.000",
    status: "Đã phát hành",
    color: "bg-success",
  },
  {
    supplierId: "KH00001",
    name: "Công ty CP MSC",
    phone: "0987654322",
    email: "msccompany@gmail.com",
    address: "216 Chu Văn An, phường 12, Q.Bình Thạnh, TP.HCM",
    totalDebt: "10.000.000",
    status: "Đã phát hành",
    color: "bg-success",
  },
];
const SupplierManagement = () => {
  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Danh sách NCC</h4>
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
                  <th>Mã NCC</th>
                  <th>Tên nhà cung cấp</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Địa chỉ</th>
                  <th>Công nợ hiện tại</th>
                  <th>Trạng thái ĐH</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {Data_table.map((item) => (
                  <tr key={item.supplierId}>
                    <td>{item.supplierId}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{item.totalDebt}</td>
                    <td>
                      <span className={`badge ${item.color}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ float: "right" }}>
                        <Link
                          className="btn btn-sm btn-icon text-primary flex-end"
                          data-bs-toggle="tooltip"
                          title="Edit User"
                          to="#"
                          onClick={() => {
                            "";
                          }}
                        >
                          <span className="btn-inner">
                            <svg
                              width="20"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              fill="blue"
                            >
                              <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                            </svg>
                          </span>
                        </Link>
                        <Link
                          className="btn btn-sm btn-icon text-danger"
                          data-bs-toggle="tooltip"
                          title="Delete User"
                          to="#"
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

export default SupplierManagement;
