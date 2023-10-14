import React, { useEffect } from "react";
import UserContext from "./userContext";
import { useReducer } from "react";

const getUserFromLocalStorage = () => {
  const storedUserJSON = localStorage.getItem("user");
  const storedUser = JSON.parse(storedUserJSON);
  console.log("parseUser", storedUser);
  console.log("accessToken", localStorage.getItem("accessToken"));
  return storedUser;
};

const initialState = {
  user: getUserFromLocalStorage(),
  accessToken: localStorage.getItem("accessToken"),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        accessToken: null,
      };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, accessToken } = state;

  //   const fetchUserDetails = async () => {
  //     const accessToken = localStorage.getItem("accessToken");
  //     if (!accessToken) {
  //       return;
  //     }
  //     try {
  //       const response = await fetch(
  //         "http://localhost:8001/api/v1/multi-chanel/app-user/my-infor",
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );

  //       if (response.ok) {
  //         const userData = await response.json();
  //         setUser(userData);
  //       }
  //     } catch (error) {
  //       // Handle network errors or other issues
  //       console.error("Error fetching user details:", error);
  //     }
  //   };

  useEffect(() => {
    if (!user) {
      //todo: fetch user from backend
    }
  }, []);

  const login = ({ user, accessToken }) => {
    console.log("user", accessToken);
    localStorage.setItem("accessToken", accessToken);

    const userJSON = JSON.stringify(user);
    localStorage.setItem("user", userJSON);
    dispatch({
      type: "LOGIN",
      payload: {
        user: user,
        accessToken: accessToken,
      },
    });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    dispatch({
      type: "LOGOUT",
      payload: {},
    });
  };

  const value = {
    isLoggedIn: !!user,
    user,
    accessToken,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
