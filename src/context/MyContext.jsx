import axios from "axios";
import { createContext, useState, useEffect } from "react";

const MyContext = createContext();

/* ===============================
   Initial Data (API Shape)
================================ */
const initialSignUpData = {
  store_name: "",
  businessType: "",
  otherBusinessType: "",
  country: "EG",
  city: "",
  address: "",
  commercialRegistrationNumber: "",
  taxID: "",
  governorate_id: 1,
  postalCode: "",
  logo: null,
  subscriptionType: "Free",
  subscriptionPlan: "Monthly",

  owner: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    address: "",
    userType: "owner",
    start_date: "2023-04-09T00:00:00.000Z",
    details: "",
  },
};
const MyProvider = ({ children }) => {
  /* ===============================
    UI States
  ================================ */
  const [isOpenSidbar, setIsOpenSidbar] = useState(window.innerWidth >= 1024);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* ===============================
     Register Data (Context + LS)
  ================================ */
  const [signUpData, setSignUpData] = useState(() => {
    const saved = localStorage.getItem("register_company_data");
    return saved ? JSON.parse(saved) : initialSignUpData;
  });

  /* ===============================
     Save Register Data
  ================================ */
  const saveSignUpData = (data) => {
    setSignUpData(data);
    localStorage.setItem("register_company_data", JSON.stringify(data));
  };

  /* ===============================
     Submit Register
  ================================ */
  const submitRegister = async (onSuccess) => {
    try {
      setIsLoading(true);

      console.log("FINAL PAYLOAD 👉", signUpData);

      await axios.post(
        "https://4a5aa2d8cec2.ngrok-free.app/auth/register",
        signUpData,
      );

      // بعد النجاح
      localStorage.removeItem("register_company_data");
      setSignUpData(initialSignUpData);

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Register Error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /* ===============================
     Sidebar Responsive
  ================================ */
  useEffect(() => {
    const handleResize = () => {
      setIsOpenSidbar(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ===============================
     Context Values
  ================================ */
  const values = {
    // UI
    isOpenSidbar,
    setIsOpenSidbar,
    isLogin,
    setIsLogin,
    isLoading,
    setIsLoading,

    // Register
    signUpData,
    saveSignUpData,
    submitRegister,
  };

  return <MyContext.Provider value={values}>{children}</MyContext.Provider>;
};

export { MyContext, MyProvider };
