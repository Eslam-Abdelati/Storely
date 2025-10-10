import React, { useState } from "react";
import bgImage from "../../assets/patern.webp";
import logo2 from "../../assets/icon.svg";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";

function ForgotPassword() {
  const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
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
      toast.success(" تم تغيير كلمة السر بنجاح سجل الدخول الان");
      setLoading(false);
      navigate("/login");
    }, 2000);
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center relative">
      {/* Background pattern */}
      <img
        src={bgImage}
        alt="background pattern"
        className="fixed inset-0 w-full h-full object-cover opacity-5 pointer-events-none"
      />

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
        {/* Main form box */}
        <div className="loginBox card w-[95%] sm:w-[90%] md:w-[600px] h-auto pb-10 sm:pb-16 mx-auto mt-1 mb-10 sm:mt-5 pt-6 sm:pt-10 relative bg-white rounded-2xl shadow-lg">
          <div className="text-center px-3">
            <h2 className="text-center text-[18px] sm:text-[25px] md:text-[32px] lg:text-[36px] font-semibold mt-4 leading-relaxed">
              نسيت كلمة السر
            </h2>

            <form
              className="w-full px-4 sm:px-6 md:px-8 mt-8 sm:mt-10"
              onSubmit={handleSubmit}
            >
              {/* اسم الشركة */}
              <div className="form-group mb-4 w-full relative">
                <label
                  htmlFor="password"
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
                >
                  كلمة السر الجديدة<span className="text-red-500">*</span>
                </label>
                <input
                  type={isShowPass ? "text" : "password"}
                  className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3 text-[14px] sm:text-[15px]"
                  id="password"
                  name="password"
                  aria-label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <Button
                  className="!absolute top-1/2 end-3 transform -translate-1/2  z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                  onClick={() => {
                    setIsShowPass(!isShowPass);
                  }}
                >
                  {isShowPass ? (
                    <IoMdEyeOff className="text-[20px] opacity-75" />
                  ) : (
                    <IoMdEye className="text-[20px] opacity-75" />
                  )}
                </Button>
              </div>

              <div className="form-group mb-4 w-full relative">
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
                >
                  تأكيد كلمة السر
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type={isShowConfirmPassword ? "text" : "password"}
                  className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3 text-[14px] sm:text-[15px]"
                  id="confirmPassword"
                  name="confirmPassword"
                  aria-label="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <Button
                  className="!absolute top-1/2 end-3 transform -translate-1/2  z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                  onClick={() => {
                    setIsShowConfirmPassword(!isShowConfirmPassword);
                  }}
                >
                  {isShowConfirmPassword ? (
                    <IoMdEyeOff className="text-[20px] opacity-75" />
                  ) : (
                    <IoMdEye className="text-[20px] opacity-75" />
                  )}
                </Button>
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
                    "تغيير كلمة السر"
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

export default ForgotPassword;
