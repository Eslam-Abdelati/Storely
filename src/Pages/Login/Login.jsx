import React, { useEffect, useState } from "react";
import bgImage from "../../assets/patern.webp";
import logo2 from "../../assets/icon.svg";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Alert from "@mui/material/Alert";

function Login() {
  const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    type: "", // "success" أو "error"
    message: "",
  });

  const AR_MESSAGES = {
    "Invalid email or password":"البريد الالكتروني أو كلمة السر غير صحيحة",
    "Code Sent Successfully": "تم ارسال الكود بنجاح",
    "Invalid verification code": "كود التحقق غير صحيح",
    "Invalid access": "الدخول غير صحيح",
    "Confirm Verify Successfully": "تم التحقق بنجاح",
  };

  const getArabicMessage = (msg) => {
    return AR_MESSAGES[msg] || msg || "حدث خطأ ما، حاول مرة أخرى";
  };

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ type: "", message: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [alert.message]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // عند عمل submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://48af6b89dc4d.ngrok-free.app/auth/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      console.log(res);
      if (res.data.status === true) {
        setAlert({
          type: "success", 
          message: "تم ارسال الكود بنجاح",
        });
           setTimeout(() => {
        setLoading(false);
        navigate("/verify", {
          state: { email: formData.email, type: "login" },
        });
      }, 2000);
      }
   
    } catch (error) {
      console.log(error.response);
      const msg = error.response?.data?.message;
      setAlert({
        type: "error",
        message: getArabicMessage(msg),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-blue-100 py-10 sm:py-16">
      {/* خلفية */}
      <img
        src={bgImage}
        alt="background pattern"
        className="fixed inset-0 w-full h-full object-cover opacity-5 pointer-events-none"
      />
      <div className="w-[95%] sm:w-[90%] md:w-[500px] bg-white rounded-2xl shadow-lg px-4 sm:px-6 md:px-8 py-6 sm:py-10">
        {/* الهيدر */}
        <header className="flex flex-col items-center text-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          {/* اللوجو */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl flex items-center justify-center">
            <img
              src={logo2}
              alt="Storely logo"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
            />
          </div>

          {/* العنوان */}
          <h1 className="text-xl sm:text-2xl font-bold text-blue-500">
            Storely ERP
          </h1>

          {/* الوصف */}
          <p className="text-[12px] sm:text-[14px] md:text-[16px] text-gray-700 font-medium leading-relaxed max-w-[420px]">
            تسجيل الدخول
          </p>
        </header>

        {/* المحتوى */}
        <div className="text-center">
          <form className="w-full px-4 sm:px-8 mt-10" onSubmit={handleSubmit}>
            <div className="form-group mb-5 w-full">
              <label
                htmlFor="email"
                className="mb-2 font-medium text-[10px] sm:text-[12px] md:text-[14px] text-gray-700 flex items-center gap-1"
              >
                البريد الالكتروني
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                aria-label="Email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md px-3 focus:border-primary focus:outline-none text-sm sm:text-base"
              />
            </div>

            <div className="form-group mb-5 w-full relative">
              <label
                htmlFor="password"
                className="mb-2 font-medium text-[10px] sm:text-[12px] md:text-[14px] text-gray-700 flex items-center gap-1"
              >
                كلمة السر <span className="text-red-500">*</span>
              </label>
              <input
                type={isShowPass ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md px-3 focus:border-primary focus:outline-none text-sm sm:text-base"
              />
              <Button
                className="!absolute top-1/2 end-3 transform -translate-1/2  z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                onClick={() => setIsShowPass(!isShowPass)}
              >
                {isShowPass ? (
                  <IoMdEyeOff className="text-[20px] opacity-75" />
                ) : (
                  <IoMdEye className="text-[20px] opacity-75" />
                )}
              </Button>
            </div>

            <div className="form-group mb-4 w-full flex items-center justify-between">
              <Link
                to="/verify"
                className="!text-primary font-medium text-[10px] sm:text-[12px] md:text-[14px] hover:underline hover:!text-gray-700 cursor-pointer"
              >
                هل نسيت كلمة السر؟
              </Link>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[14px]">ليس لديك حساب؟</span>
              <Link
                className="!text-primary font-medium text-[10px] sm:text-[12px] md:text-[14px] hover:underline hover:!text-gray-700 cursor-pointer"
                to="/sign-up"
              >
                إنشاء حساب جديد
              </Link>
            </div>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                disabled={loading}
                className="btn-blue btn-lg w-full px-4 py-2 text-[14px] sm:text-[16px]"
              >
                {loading ? (
                  <CircularProgress size={28} color="inherit" />
                ) : (
                  "تسجيل الدخول"
                )}
              </Button>
            </div>
            {alert.message && (
              <div>
                <Alert severity={alert.type}>{alert.message}</Alert>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
