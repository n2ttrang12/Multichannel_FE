import React, { useState, useEffect, useContext } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Category } from "../../../models/category";

import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import "./theme.css";
import { createArrayFrom1ToN } from "../../../helper";
import { Search } from "../../../components/common/search";
import { Loading } from "../../../components/common/loading";
import UserContext from "../../../contexts/userContext";

const CategoryManagement = () => {
  const [response, setResponse] = useState({}); // state đầu tiên -> rỗng
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const { isStore } = useContext(UserContext);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1); // lưu current page, set thì render lại
  const [perPage, setPerpage] = useState(10); // Lưu perpage, đnag set cứng alf 5

  const actionTemplate = (data) => {
    const currentCategory = data?.data;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        {currentCategory?.depth < 3 ? (
          <Link
            className="btn btn-sm btn-icon text-success flex-end"
            data-bs-toggle="tooltip"
            title="Add new"
            to="#"
            onClick={() =>
              setModal(<AddCategoryModel parentCategory={currentCategory} />)
            }
          >
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
                  d="M12.0001 8.32739V15.6537"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M15.6668 11.9904H8.3335"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.6857 2H7.31429C4.04762 2 2 4.31208 2 7.58516V16.4148C2 19.6879 4.0381 22 7.31429 22H16.6857C19.9619 22 22 19.6879 22 16.4148V7.58516C22 4.31208 19.9619 2 16.6857 2Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </svg>
            </span>
          </Link>
        ) : null}
        <Link
          className="btn btn-sm btn-icon text-primary flex-end"
          data-bs-toggle="tooltip"
          title="Edit category"
          to="#"
          onClick={() =>
            setModal(<UpdateCategoryModel category={currentCategory} />)
          }
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
          className="btn btn-sm btn-icon text-danger flex-end"
          data-bs-toggle="tooltip"
          title="Delete"
          to="#"
          onClick={() =>
            setModal(<DeleteCategoryModel category={currentCategory} />)
          }
        >
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
        </Link>
      </div>
    );
  };
  const parseCategory = (category, depth, i = null) => {
    const hasChildren = category.child?.length > 0;
    return {
      key: i !== null ? i : category.id,
      data: {
        key: i !== null ? i + 1 + (page - 1) * perPage : undefined,
        ...category,
        hasChildren,
        depth,
      },
      children: hasChildren
        ? category.child.map((c) => parseCategory(c, depth + 1))
        : [],
    };
  };

  const buildTree = (categories) => {
    return categories.map((category, i) => parseCategory(category, 1, i));
  };

  const fetchList = (page, perPage, search = undefined) => {
    // lấy từ API
    setIsLoading(true);
    Category.getList({
      page, // Offset
      perPage, // limit,
      search,
    })
      .then(({ data }) => {
        //console.log("getRootCategories", nodes);
        if (!data) {
          return;
        }
        console.log(data);
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

  const handleCloseModal = () => setModal(null);

  const UpdateCategoryModel = ({ category }) => {
    const [name, setName] = useState(category.name ?? "");

    return (
      <Modal show={true} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{"Chỉnh sửa"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Tên danh mục</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              Category.updateCategory(category.id, name)
                .then((response) => fetchList(page, perPage))
                .catch((error) => {
                  alert(error);
                })
                .finally(() => setModal(null));
            }}
          >
            Lưu
          </Button>{" "}
          <Button variant="danger" onClick={handleCloseModal}>
            Hủy bỏ
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const AddCategoryModel = ({ parentCategory }) => {
    const [name, setName] = useState("");

    return (
      <Modal show={true} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {"Tạo mới" +
              (parentCategory
                ? " danh mục con của (" + parentCategory.name + ")"
                : "")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Tên danh mục</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              console.log("add Category");
              Category.addCategory(name, parentCategory?.id)
                .then((response) => fetchList(page, perPage))
                .catch((error) => {
                  alert(error);
                })
                .finally(() => setModal(null));
            }}
          >
            Lưu
          </Button>{" "}
          <Button variant="danger" onClick={handleCloseModal}>
            Hủy bỏ
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const DeleteCategoryModel = ({ category }) => {
    return (
      <Modal show={true} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {`Bạn có chắc là muốn xóa danh mục (${category.name}) hay không?`}
          </p>
          {category?.hasChildren
            ? "Nếu xóa danh mục cha thì toàn bộ danh mục con sẽ bị vô hiệu hóa"
            : null}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              //handle send api
              Category.deleteCategory(category.id)
                .then((response) => fetchList(page, perPage)) // load lại page
                .catch((error) => {
                  alert(error);
                })
                .finally(() => setModal(null)); // đóng modal
            }}
          >
            Xác nhận
          </Button>{" "}
          <Button variant="danger" onClick={handleCloseModal}>
            Hủy bỏ
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

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
        {!isStore ? (
          <Button
            className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3"
            onClick={() => setModal(<AddCategoryModel />)}
          >
            <i className="btn-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </i>
            <span>Thêm danh mục</span>
          </Button>
        ) : (
          ""
        )}
      </Card.Header>
      <Card.Body>
        <div>
          <Search onEnter={(value) => setSearchText(value)}></Search>
        </div>

        <div className="border-bottom my-3">
          {isLoading ? (
            <Loading />
          ) : (
            <TreeTable value={nodes} tableStyle={{ minWidth: "50rem" }}>
              <Column
                style={{
                  width: "120px",
                }}
                field="key"
                header="Số thứ tự"
              ></Column>
              <Column field="name" header="Tên danh mục" expander></Column>
              {/* <Column field="code" header="Code"></Column> */}
              {!isStore ? (
                <Column
                  body={actionTemplate}
                  headerClassName="w-10rem"
                  header="Thao tác"
                  headerStyle={{
                    padding: "24px",
                    display: "flex",
                    justifyContent: "end",
                  }}
                ></Column>
              ) : (
                ""
              )}
            </TreeTable>
          )}

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
      </Card.Body>
      {modal}
    </Card>
  );
};

export default CategoryManagement;
