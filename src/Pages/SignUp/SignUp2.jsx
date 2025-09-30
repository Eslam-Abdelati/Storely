import React, { useState } from "react";
import bgImage from "../../assets/patern.webp";
import logo from "../../assets/logo.jpg";
import logo2 from "../../assets/icon.svg";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { MuiTelInput } from "mui-tel-input";
import { GrFormNext } from "react-icons/gr";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

function SignUp2() {
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

  // تحديث أي input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // تحديث التليفون من مكتبة MuiTelInput
  const handlePhoneChange = (newValue) => {
    setFormData((prev) => ({
      ...prev,
      phone: newValue,
    }));
  };

  // عند عمل submit
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
    }, 2000);
  };

  return (
    <section className="bg-white w-full">
      <header className="w-full static lg:fixed top-0 left-0 px-4 py-3 flex items-center justify-center sm:justify-between z-50">
        <Link to="/">
          <img src={logo} alt="logo" className="w-[200px]" />
        </Link>

        <div className="flex items-center gap-0">
          <Link to="/sign-up">
            <Button className="!uppercase !rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1">
              <GrFormNext className="text-[20px]" />
              العودة
            </Button>
          </Link>
        </div>
      </header>

      <img
        src={bgImage}
        alt="background pattern"
        className="w-full fixed top-0 left-0 opacity-5"
      />

      <div className="loginBox card w-full md:w-[600px] h-auto pb-20 mx-auto pt-5 lg:pt-20 relative z-50">
        <div className="text-center">
          <img src={logo2} alt="logo2" className="m-auto" />
          <h1 className="text-center text-[18px] sm:text-[35px] font-[600] mt-4">
            معلومات
          </h1>
          <span>من فضلك اكمل البيانات التالية لبدء استخدام النظام:</span>
          <form className="w-full px-8 mt-10" onSubmit={handleSubmit}>
            <div className="form-group w-full flex items-center justify-between gap-4">
              <div className="form-group mb-4 w-[50%]">
                <label
                  htmlFor="FirstName"
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
                >
                  الإسم الأول
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3"
                  id="FirstName"
                  name="FirstName"
                  aria-label="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                />
              </div>

              <div className="form-group mb-4 w-[50%]">
                <label
                  htmlFor="LastName"
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
                >
                  الإسم الأخير
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="LastName"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  required
                  className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md px-3 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="form-group mb-4 w-full">
              <label
                htmlFor="email"
                className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
              >
                البريد الالكتروني
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md px-3 focus:border-primary focus:outline-none"
              />
            </div>

            <div className="form-group mb-4 w-full ">
              <label
                htmlFor="phone"
                className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
              >
                رقم الهاتف
                <span className="text-red-500">*</span>
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

            <div className="form-group mb-4 w-full relative">
              <label
                htmlFor="password"
                className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
              >
                كلمة السر
                <span className="text-red-500">*</span>
              </label>
              <input
                type={isShowPass ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md px-3 focus:border-primary focus:outline-none"
              />
              <Button
                className="!absolute top-[50%] left-[5px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
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
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md px-3 focus:border-primary focus:outline-none"
              />
              <Button
                className="!absolute top-[50%] left-[5px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
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
                className="btn-blue btn-lg w-full"
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
