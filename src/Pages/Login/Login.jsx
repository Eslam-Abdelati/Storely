import React, { useState } from "react";
import bgImage from "../../assets/patern.webp";
import logo from "../../assets/logo.jpg";
import logo2 from "../../assets/icon.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { MdLogin } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
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
      navigate("/");
    }, 2000);
  };

  return (
    <section className="bg-white w-full">
      <header className="w-full static lg:fixed top-0 left-0 px-4 py-3 flex items-center justify-center sm:justify-between z-50">
        <Link to="/">
          <img src={logo} alt="logo" className="w-[200px]" />
        </Link>

        <div className="flex items-center gap-0">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <Button className="!uppercase !rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1">
              <MdLogin className="text-[18px]" />
              تسجيل الدخول
            </Button>
          </NavLink>

          <NavLink
            to="/sign-up"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <Button className="!uppercase !rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1">
              <FaRegUser className="text-[15px]" />
              ابدأالاستخدام مجانا
            </Button>
          </NavLink>
        </div>
      </header>

      <img
        src={bgImage}
        alt="background pattern"
        className="w-full fixed top-0 left-0 opacity-5"
      />

      <div className="loginBox card w-full md:w-[600px] h-auto pb-20 mx-auto  lg:pt-20 relative z-50">
        <div className="text-center">
          <img src={logo2} alt="logo2" className="m-auto" />
          <h1 className="text-center text-[18px] sm:text-[35px] font-[600] my-4">
            مرحبًا بعودتك!
            <br />
            تسجيل الدخول.
          </h1>

          <form className="w-full px-8 mt-10 mb-20" onSubmit={handleSubmit}>
            <div className="form-group mb-5 w-full">
              <label
                htmlFor="email"
                className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
              >
                البريد الالكتروني
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                id="email"
                name="email"
                aria-label="Email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group mb-5 w-full relative">
              <label
                htmlFor="password"
                className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
              >
                كلمة السر
                <span className="text-red-500">*</span>
              </label>
              <input
                type={isShowPass ? "text" : "password"}
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                id="password"
                name="password"
                aria-label="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
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
                className="btn-blue btn-lg w-full"
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
    </section>
  );
}

export default Login;
