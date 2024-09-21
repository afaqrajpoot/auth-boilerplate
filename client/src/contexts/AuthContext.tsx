"use client";

import { localStorageClient } from "@/config/localstorage-client";
import { postLoginReqType, postLoginResType } from "@/schemas/auth";
import { apiRouter } from "@/utils/api-router";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  isLoggedIn: boolean;
  userInfo?: postLoginResType["data"];
  login: (payload: postLoginReqType) => Promise<boolean>;
  // register: (payload: postRegisterReqType) => Promise<boolean>;
  logout: VoidFunction;
}>({
  isLoggedIn: false,
  login: async () => false,
  // register: async () => false,
  logout: () => {},
});

// Auth provider component
const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const lsClient = localStorageClient();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<
    postLoginResType["data"] | undefined
  >();

  const login = async (payload: postLoginReqType) => {
    // express login
    const response = await apiRouter(
      "LOGIN",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      {
        skipAuthorization: true,
      }
    );

    if (!response.ok) {
      return false;
    }

    const responsePayload = await response.json();
    console.log(responsePayload.data);

    if (!responsePayload.success) {
      return false;
    }

    setIsLoggedIn(true);

    setUserInfo(responsePayload.data);

    lsClient.setItem("IS_LOGGED_IN", true);
    lsClient.setItem("USER_INFO", responsePayload.data);

    return true;
  };

  // const register = async (payload: postRegisterReqType) => {
  //   // express login
  //   const response = await apiRouter(
  //     "REGISTER",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(payload),
  //     },
  //     {
  //       skipAuthorization: true,
  //     }
  //   );

  //   if (!response.ok) {
  //     return false;
  //   }

  //   const responsePayload = await response.json();
  //   if (!responsePayload.success) {
  //     return false;
  //   }

  //   setIsLoggedIn(true);
  //   setUserInfo(responsePayload.data.result);

  //   lsClient.setItem("IS_LOGGED_IN", true);
  //   lsClient.setItem("USER_INFO", responsePayload.data.result);

  //   return true;
  // };

  const logout = async () => {
    lsClient.cleanStorage();
    setIsLoggedIn(false);
    setUserInfo(undefined);
  };

  // restore state from local storage
  useEffect(() => {
    const userInfo = lsClient.getItem("USER_INFO");
    const isLoggedIn = lsClient.getItem("IS_LOGGED_IN");

    if (!!isLoggedIn && !!userInfo) {
      setIsLoggedIn(true);
      setUserInfo(userInfo);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within a FirebaseProvider");
  }

  return context;
};

export { useAuthContext, AuthProvider };
