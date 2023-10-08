import React, { useState, useEffect } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Category } from "../../../models/category";

import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../../../components/Card";

const CategoryManagement = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    Category.getTreeTableNodes().then((data) => setNodes(data));
  }, []);

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between">
        <div className="header-title">
          <h4 className="card-title">Danh sách đơn hàng</h4>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="border-bottom my-3">
          <TreeTable value={nodes} tableStyle={{ minWidth: "50rem" }}>
            <Column field="name" header="Name" expander></Column>
            <Column field="size" header="Size"></Column>
            <Column field="type" header="Type"></Column>
          </TreeTable>
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

export default CategoryManagement;
