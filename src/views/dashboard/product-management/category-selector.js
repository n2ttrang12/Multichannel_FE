import React, { useContext, useEffect, useState } from "react";

import "./theme.css";
import { CategoryContext } from "../../../contexts/categoryProvider";

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
        <input
          value={textFilter}
          onChange={(e) => setTextFilter(e.target.value)}
        ></input>
      </div>
      <div style={{ display: "flex" }}>
        <ul
          style={{
            height: "400px",
            overflowY: "auto",
          }}
        >
          {list1}
        </ul>
        <ul
          style={{
            height: "400px",
            overflowY: "auto",
          }}
        >
          {list2}
        </ul>
        <ul
          style={{
            height: "400px",
            overflowY: "auto",
          }}
        >
          {list3}
        </ul>
      </div>
      {selected && <p>Đã chọn: {selectedLabel} </p>}
    </div>
  );
};
