import { createContext, useState } from "react";

// 1. إنشاء الكونتكست
const MyContext = createContext();

// 2. إنشاء Provider
const MyProvider = ({ children }) => {
  const [isOpenSidbar, setIsOpenSidbar] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const values = {
    isOpenSidbar,
    setIsOpenSidbar,
    isLogin,
    setIsLogin,
  };

  return <MyContext.Provider value={values}>{children}</MyContext.Provider>;
};

export { MyContext, MyProvider };
