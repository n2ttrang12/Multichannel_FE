import React, { useState, useEffect } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Category } from "../../../models/category";

import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import "./theme.css";
import { createArrayFrom1ToN } from "../../../helper";

const CategoryManagement = () => {
  const [response, setResponse] = useState({}); // state đầu tiên -> rỗng

  const [page, setPage] = useState(1); // lưu current page, set thì render lại
  const [perPage, setPerpage] = useState(3); // Lưu perpage, đnag set cứng alf 3

  const buildTree = (categories) => {
    // build tree từ category
    return categories.map((category, i) => {
      return {
        key: i,
        data: {
          key: i + 1 + (page - 1) * perPage,
          ...category,
        },
        children: [
          {
            key: "faker",
            data: { name: "fake name", code: "fake code" },
            children: [
              {
                key: "faker 2",
                data: { name: "fake name 2", code: "fake code 2" },
                children: [],
              },
            ],
          },
        ],
      };
    });
  };

  const fetchList = (page, perPage) => {
    // lấy từ API
    Category.getList({
      page, // Offset
      perPage, // limit
    }).then((data) => {
      //console.log("getRootCategories", nodes);
      if (!data) {
        return;
      }
      setResponse(data); // set data cho state respone
    });
  };

  useEffect(() => {
    //chạy khi page change khi set page
    fetchList(page, perPage);
  }, [page]);

  const { data: categories, pagination } = response; // category từ response
  const nodes = buildTree(categories ?? []); // lây data mới cho tree từ cate
  const total = pagination?.total ?? 0;

  const totalPage = Math.ceil(total / perPage); // dư 1 sp vân là 1 page
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between">
        <div className="header-title">
          <h4 className="card-title">Danh mục sản phẩm</h4>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="border-bottom my-3">
          <TreeTable value={nodes} tableStyle={{ minWidth: "50rem" }}>
            <Column field="key" header="No"></Column>
            <Column field="name" header="Name" expander></Column>
            <Column field="code" header="Code"></Column>
          </TreeTable>

          <Row className="align-items-center">
            <Col md="6">
              <div
                className="dataTables_info"
                id="datatable_info"
                role="status"
                aria-live="polite"
              >
                {`Showing ${(page - 1) * perPage + 1} to ${
                  page * perPage <= total ? page * perPage : total
                } of ${pagination?.total ?? 0} entries`}
              </div>
            </Col>
            <Col md="6">
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
      </Card.Body>
    </Card>
  );
};

export default CategoryManagement;
