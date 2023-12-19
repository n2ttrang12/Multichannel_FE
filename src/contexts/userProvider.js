import React, { useEffect, useState } from "react";
import UserContext from "./userContext";
import { useReducer } from "react";
import axiosInstance from "../models/axios";
import { Loading } from "../components/common/loading";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});
  const { user } = state;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      //try to get current infor
      .get("app-user/my-infor")
      .then(({ data }) => {
        dispatch({
          type: "SET_CURRENT_USER",
          payload: {
            user: data.data,
          },
        });
      })
      .catch((e) => {
        // redirect to login after not exist or expired both access and refresh token
        if (!window.location.href.includes("sign-in")) {
          window.location.href = "/sign-in";
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = ({ user, accessToken, refreshToken }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    const userJSON = JSON.stringify(user);
    localStorage.setItem("user", userJSON);
    dispatch({
      type: "SET_CURRENT_USER",
      payload: {
        user: user,
      },
    });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/sign-in";
  };

  const value = {
    isLoggedIn: !!user,
    user,
    login,
    logout,
    isStore: user?.role?.code === "STORE_OWNER",
  };

  if (isLoading) {
    return <Loading />;
  }
  console.log(value);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
