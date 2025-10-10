import { createContext, useState, useEffect } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [isOpenSidbar, setIsOpenSidbar] = useState(() => {
    return window.innerWidth >= 1024; // مفتوح على الشاشات الكبيرة فقط
  });

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpenSidbar(true);
      } else {
        setIsOpenSidbar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const values = {
    isOpenSidbar,
    setIsOpenSidbar,
    isLogin,
    setIsLogin,
  };

  return <MyContext.Provider value={values}>{children}</MyContext.Provider>;
};

export { MyContext, MyProvider };
