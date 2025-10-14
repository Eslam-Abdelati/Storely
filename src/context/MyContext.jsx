import { createContext, useState, useEffect } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [isOpenSidbar, setIsOpenSidbar] = useState(() => {
    return window.innerWidth >= 1024; // مفتوح على الشاشات الكبيرة فقط
  });

  const [isLogin, setIsLogin] = useState(false);
  // ✅ البيانات المؤقتة الخاصة بالتسجيل (صفحتين)
  const [signUpData, setSignUpData] = useState({
    // صفحة FirstSignUp
    store_name: "",
    businessType: "",
    otherBusinessType: "",
    country: "",
    city: "",
    address: "",
    commercialRegistrationNumber: "",
    taxID: "",
    subscriptionType: "Free",
    subscriptionPlan: "Monthly",
    postalCode: "",
    governorate_id: 1,
    logo: null,

    // صفحة SignUp2
    owner: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "male",
      userType: "owner",
      start_date: "2023-04-09T00:00:00.000Z",
    },
  });

  // دالة لتحديث أي جزء من البيانات
  const updateSignUpData = (newData) => {
    setSignUpData((prev) => {
      // لو فيه بيانات تخص الـ owner
      if (newData.owner) {
        return {
          ...prev,
          owner: {
            ...prev.owner,
            ...newData.owner,
          },
        };
      }
      // غير كده، ندمج بشكل طبيعي
      return { ...prev, ...newData };
    });
  };

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
    // ✅ بيانات التسجيل
    signUpData,
    updateSignUpData,
  };

  return <MyContext.Provider value={values}>{children}</MyContext.Provider>;
};

export { MyContext, MyProvider };
