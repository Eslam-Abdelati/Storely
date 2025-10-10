import React, { useState } from "react";
import bgImage from "../../assets/patern.webp";
import logo2 from "../../assets/icon.svg";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

function Login() {
  const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // عند عمل submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    console.log("Form Submitted: ", formData);

    setTimeout(() => {
      toast.success("تم الدخول بنجاح");
      setLoading(false);
      navigate("/app");
    }, 2000);
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center relative py-10 sm:py-16">
      {/* خلفية */}
      <img
        src={bgImage}
        alt="background pattern"
        className="fixed inset-0 w-full h-full object-cover opacity-5 pointer-events-none"
      />
      {/* ✅ الهيدر */}
      <div className="w-[95%] sm:w-[90%] md:w-[600px] mx-auto">
        {/* ✅ الهيدر */}
        <header className="flex items-center gap-3 mb-6 sm:mb-10 justify-center">
          <img
            src={logo2}
            alt="Storely logo"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            ستورلي
          </h1>
        </header>

        {/* الصندوق الرئيسي */}
        <div className="loginBox card w-[95%] sm:w-[90%] md:w-[600px] h-auto pb-10 sm:pb-16 mx-auto mt-1 mb-10 sm:mt-5 pt-6 sm:pt-10 relative bg-white rounded-2xl shadow-lg">
          <div className="text-center px-3">
            <h2 className="text-center text-[18px] sm:text-[35px] font-[600] my-4">
              تسجيل الدخول
            </h2>

            <form className="w-full px-4 sm:px-8 mt-10" onSubmit={handleSubmit}>
              <div className="form-group mb-5 w-full">
                <label
                  htmlFor="email"
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1 text-sm sm:text-base"
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
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1 text-sm sm:text-base"
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
                  className="!text-primary font-[700] text-[15px] hover:underline hover:!text-gray-700 cursor-pointer"
                >
                  هل نسيت كلمة السر؟
                </Link>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[14px]">ليس لديك حساب؟</span>
                <Link
                  className="!text-primary font-[700] text-[15px] hover:underline hover:!text-gray-700 cursor-pointer"
                  to="/sign-up"
                >
                  إنشاء حساب جديد
                </Link>
              </div>

              <div className="flex items-center w-full mt-3 mb-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="btn-blue btn-lg w-full h-[48px] sm:h-[52px] md:h-[55px] text-[14px] sm:text-[16px]"
                >
                  {loading ? (
                    <CircularProgress size={28} color="inherit" />
                  ) : (
                    "تسجيل الدخول"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
