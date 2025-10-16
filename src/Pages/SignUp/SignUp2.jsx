import React, { useContext, useState } from "react";
import { MyContext } from "../../context/MyContext";
import axios from "axios";
import bgImage from "../../assets/patern.webp";
import logo2 from "../../assets/icon.svg";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MuiTelInput } from "mui-tel-input";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

function SignUp2() {
  const { signUpData, updateSignUpData } = useContext(MyContext);
  const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ تعديل التغيير ليحدث داخل signUpData.owner
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSignUpData({
      owner: {
        ...signUpData.owner,
        [name]: value,
      },
    });
  };

  // ✅ تعديل رقم الهاتف
  const handlePhoneChange = (newValue) => {
    updateSignUpData({
      owner: {
        ...signUpData.owner,
        phoneNumber: newValue,
      },
    });
  };

  // ✅ إرسال البيانات للـ API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://storely-system.onrender.com/auth/register",
        signUpData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success("تم التسجيل بنجاح ");
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const owner = signUpData.owner || {};

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
        <div className="loginBox card w-full h-auto pb-10 sm:pb-16 bg-white rounded-2xl shadow-lg pt-6 sm:pt-10">
          <div className="text-center px-3">
            <h2 className="text-center text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-semibold mt-4 leading-relaxed">
              من فضلك اكمل البيانات التالية لبدء استخدام النظام
            </h2>

            <form className="w-full px-4 sm:px-8 mt-10" onSubmit={handleSubmit}>
              {/* الاسم الأول والأخير */}
              <div className="form-group w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="form-group mb-4 w-full sm:w-[50%]">
                  <label
                    htmlFor="firstName"
                    className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1 text-sm sm:text-base"
                  >
                    الإسم الأول <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3 text-sm sm:text-base"
                    id="firstName"
                    name="firstName"
                    aria-label="firstName"
                    value={owner.firstName}
                    onChange={handleChange}
                    required
                    autoComplete="given-name"
                  />
                </div>

                <div className="form-group mb-4 w-full sm:w-[50%]">
                  <label
                    htmlFor="lastName"
                    className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1 text-sm sm:text-base"
                  >
                    الإسم الأخير <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={owner.lastName}
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
                  value={owner.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md px-3 focus:border-primary focus:outline-none text-sm sm:text-base"
                />
              </div>

              {/* رقم الهاتف */}
              <div className="form-group mb-4 w-full">
                <label
                  htmlFor="phoneNumber"
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1 text-sm sm:text-base"
                >
                  رقم الهاتف <span className="text-red-500">*</span>
                </label>
                <MuiTelInput
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  inputProps={{ required: true }}
                  value={owner.phoneNumber}
                  onChange={handlePhoneChange}
                  defaultCountry="EG"
                  fullWidth
                  autoComplete="tel"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      height: "50px",
                      fontSize: "15px",
                      backgroundColor: "white",
                      "& fieldset": {
                        borderColor: "rgba(0,0,0,0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#1976d2", // نفس لون primary
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1976d2",
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      paddingLeft: "70px", // مسافة لترك مكان للعلم والكود
                    },
                    "& .MuiTelInput-Flag": {
                      marginLeft: "10px",
                    },
                    "& .MuiTelInput-Country": {
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    },
                  }}
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
                  value={owner.password}
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
                  value={owner.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md px-3 focus:border-primary focus:outline-none text-sm sm:text-base"
                />
                <Button
                  className="!absolute top-1/2 end-3 transform -translate-1/2  z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
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
                  className="btn-blue btn-lg w-full h-[48px] sm:h-[52px] md:h-[55px] text-[14px] sm:text-[16px]"
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
      </div>
    </section>
  );
}

export default SignUp2;
