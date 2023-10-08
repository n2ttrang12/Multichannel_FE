import React, { useEffect } from "react";
import UserContext from "./userContext";

const getUserFromLocalStorage = () => {
  const storedUserJSON = localStorage.getItem("user");
  const storedUser = JSON.parse(storedUserJSON);
  console.log("parseUser", storedUser);
  console.log("accessToken", localStorage.getItem("accessToken"));
  return storedUser;
};

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(() => getUserFromLocalStorage());

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
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    isLoggedIn: !!user,
    user,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;