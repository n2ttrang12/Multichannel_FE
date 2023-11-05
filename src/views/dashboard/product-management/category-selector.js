import React, { useContext, useEffect, useState } from "react";

import "./theme.css";
import { CategoryContext } from "../../../contexts/categoryProvider";
import { Search } from "../../../components/common/search";
import { Col, Row } from "react-bootstrap";

export const CategorySelector = ({ onChange }) => {
  const categoryContext = useContext(CategoryContext);
  const {
    list1,
    list2,
    list3,
    selected,
    selectedLabel,
    textFilter,
    setTextFilter,
  } = categoryContext;

  useEffect(() => {
    onChange({ id: selected, name: selectedLabel });
  }, [selected, selectedLabel]);

  return (
    <div>
      <div>
        <Search onEnter={(value) => setTextFilter(value)}></Search>
      </div>
      <div>
        <Row
          className="category"
          style={{ display: "flex", marginTop: "16px", marginBottom: "16px" }}
        >
          <Col
            className="category-col "
            md="4"
            style={{
              borderRight: "1px solid",
              height: "400px",
              overflowY: "auto",
            }}
          >
            {list1}
          </Col>
          <Col
            className="category-col "
            md="4"
            style={{
              borderRight: "1px solid",
              height: "400px",
              overflowY: "auto",
            }}
          >
            {list2}
          </Col>
          <Col
            className="category-col "
            md="4"
            style={{
              borderRight: "1px solid",
              height: "400px",
              overflowY: "auto",
            }}
          >
            {list3}
          </Col>
        </Row>
      </div>
      {selected && <p>Đã chọn: {selectedLabel} </p>}
    </div>
  );
};
