import React, { useState } from "react";
import bgImage from "../../assets/patern.webp";
import logo2 from "../../assets/icon.svg";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MuiTelInput } from "mui-tel-input";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

function SignUp2() {
  const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (newValue) => {
    setFormData((prev) => ({
      ...prev,
      phone: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.phone) {
      toast.error("من فضلك أدخل رقم الهاتف");
      return;
    }

    setLoading(true);
    console.log("Form Submitted: ", formData);

    setTimeout(() => {
      toast.success("تم التسجيل بنجاح");
      setLoading(false);
      navigate("/login");
    }, 2000);
  };

  return (
    <section className="w-full min-h-screen">
      {/* خلفية */}
      <img
        src={bgImage}
        alt="background pattern"
        className="w-full fixed top-0 left-0 opacity-5 pointer-events-none"
      />

      {/* الصندوق الرئيسي */}
      <div className="loginBox card w-[95%] sm:w-[90%] md:w-[600px] h-auto pb-10 sm:pb-16 mx-auto mt-5 mb-10 sm:mt-10 pt-6 sm:pt-10 relative bg-white rounded-2xl shadow-lg">
        <div className="text-center px-3">
          <img
            src={logo2}
            alt="logo2"
            className="m-auto w-[70px] sm:w-[90px]"
          />

          <h1 className="text-center text-[20px] sm:text-[28px] md:text-[35px] font-semibold mt-4 leading-tight">
            معلومات
          </h1>
          <span className="text-sm sm:text-base">
            من فضلك اكمل البيانات التالية لبدء استخدام النظام:
          </span>

          <form className="w-full px-4 sm:px-8 mt-10" onSubmit={handleSubmit}>
            {/* الاسم الأول والأخير */}
            <div className="form-group w-full flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="form-group mb-4 w-full sm:w-[50%]">
                <label
                  htmlFor="FirstName"
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1 text-sm sm:text-base"
                >
                  الإسم الأول <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3 text-sm sm:text-base"
                  id="FirstName"
                  name="FirstName"
                  aria-label="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                />
              </div>

              <div className="form-group mb-4 w-full sm:w-[50%]">
                <label
                  htmlFor="LastName"
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1 text-sm sm:text-base"
                >
                  الإسم الأخير <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="LastName"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  required
                  className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md px-3 focus:border-primary focus:outline-none text-sm sm:text-base"
                />
              </div>
            </div>

            {/* البريد الإلكتروني */}
            <div className="form-group mb-4 w-full">
              <label
                htmlFor="email"
                className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1 text-sm sm:text-base"
              >
                البريد الالكتروني <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md px-3 focus:border-primary focus:outline-none text-sm sm:text-base"
              />
            </div>

            {/* رقم الهاتف */}
            <div className="form-group mb-4 w-full">
              <label
                htmlFor="phone"
                className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1 text-sm sm:text-base"
              >
                رقم الهاتف <span className="text-red-500">*</span>
              </label>
              <MuiTelInput
                id="phone"
                name="phone"
                required
                inputProps={{ required: true }}
                value={formData.phone}
                onChange={handlePhoneChange}
                defaultCountry="EG"
                fullWidth
                autoComplete="tel"
              />
            </div>

            {/* كلمة المرور */}
            <div className="form-group mb-4 w-full relative">
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
                className="!absolute top-[50%] left-[5px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                onClick={() => setIsShowPass(!isShowPass)}
              >
                {isShowPass ? (
                  <IoMdEyeOff className="text-[20px] opacity-75" />
                ) : (
                  <IoMdEye className="text-[20px] opacity-75" />
                )}
              </Button>
            </div>

            {/* تأكيد كلمة المرور */}
            <div className="form-group mb-4 w-full relative">
              <label
                htmlFor="confirmPassword"
                className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1 text-sm sm:text-base"
              >
                تأكيد كلمة السر <span className="text-red-500">*</span>
              </label>
              <input
                type={isShowConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md px-3 focus:border-primary focus:outline-none text-sm sm:text-base"
              />
              <Button
                className="!absolute top-[50%] left-[5px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                onClick={() =>
                  setIsShowConfirmPassword(!isShowConfirmPassword)
                }
              >
                {isShowConfirmPassword ? (
                  <IoMdEyeOff className="text-[20px] opacity-75" />
                ) : (
                  <IoMdEye className="text-[20px] opacity-75" />
                )}
              </Button>
            </div>

            {/* زر التسجيل */}
            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                disabled={loading}
                className="btn-blue btn-lg w-full text-[16px] sm:text-[18px] h-[50px] sm:h-[55px]"
              >
                {loading ? (
                  <CircularProgress size={28} color="inherit" />
                ) : (
                  "تسجيل"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp2;
