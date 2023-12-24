import { useContext, useState } from "react";
import UserContext from "../../contexts/userContext";
export const StoreComponent = ({ children }) => {
  const { isStore } = useContext(UserContext);
  if (!isStore) {
    return <p>Bạn không có quyền truy cập</p>;
  }
  return children;
};
