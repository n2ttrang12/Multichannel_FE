import React, { useEffect, useState } from "react";
import { Loading } from "../components/common/loading";
import { Category } from "../models/category";

export const CategoryContext = React.createContext();
function removeVietnameseDiacritics(str) {
  // Chuyển đổi các ký tự tiếng Việt có dấu thành ký tự không dấu
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Loại bỏ khoảng trắng ở đầu và cuối chuỗi (nếu có)
  str = str.trim().toLowerCase();

  return str;
}

const CategoryProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [textFilter, setTextFilter] = useState("");

  const [l1, setL1] = useState(null);
  const [l2, setL2] = useState(null);
  const [l3, setL3] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    Category.getAll()
      .then(({ data }) => {
        if (!data) {
          return;
        }
        const { data: categories, pagination } = data;
        setCategories(categories);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const breadcrumb = getBreadcrumb();
    if (!breadcrumb) {
      return;
    }
    setSelectedLabel(breadcrumb);
  }, [selected]);

  const isCategoryValidSearch = (category) => {
    if (!textFilter.trim()) {
      return true;
    }
    if (
      removeVietnameseDiacritics(category.name).includes(
        removeVietnameseDiacritics(textFilter.trim())
      )
    ) {
      return true;
    }

    return category.child?.some((category) => isCategoryValidSearch(category));
  };

  const filter = categories.map(
    (category) => (category.isHidden = !isCategoryValidSearch(category))
  );

  const getItem = ({ id, name, child, isHidden }, setL, selected) => {
    if (isHidden) {
      return null;
    }

    const isLeaf = !child || child.length === 0;
    return (
      <li
        className={"item-name" + (selected === id ? " selected-item" : "")}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px",
          fontSize: "14px",
        }}
        onClick={() => {
          if (isLeaf) {
            setSelected(id);
          }
          setL(id);
        }}
        id={id}
      >
        <div>{name}</div>
        <div>
          {!isLeaf && (
            <svg
              class="icon-32"
              width="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 5L15.5 12L8.5 19"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </svg>
          )}
        </div>
      </li>
    );
  };

  const list1 = categories.map((data) => getItem(data, setL1, l1));

  let list2 = null;
  let node1 = null;
  if (l1) {
    node1 = categories.find((e) => !e.isHidden && e.id === l1);
    list2 = node1?.child?.map((data) => getItem(data, setL2, l2));
  }

  let list3 = null;
  let node2 = null;
  if (node1 && l2) {
    node2 = node1?.child?.find((e) => e.id === l2);
    list3 = node2?.child?.map((data) => getItem(data, setL3, l3));
  }

  const getBreadcrumb = () => {
    if (!selected) {
      return null;
    }

    switch (selected) {
      case l1:
        return node1?.name;
      case l2:
        return node1?.name + " > " + node2?.name;
      case l3:
        return (
          node1?.name +
          " > " +
          node2?.name +
          " > " +
          node2?.child?.find((e) => e.id === l3)?.name
        );
    }

    return "";
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        l1,
        l2,
        l3,
        setL1,
        setL2,
        setL3,
        setSelected,
        setSelectedLabel,
        selected,
        selectedLabel,
        list1,
        list2,
        list3,
        textFilter,
        setTextFilter,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
