import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/MyContext";
import axios from "axios";
import logo2 from "../../assets/icon.svg";
import bgImage from "../../assets/patern.webp";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MuiTelInput } from "mui-tel-input";
import CircularProgress from "@mui/material/CircularProgress";
import { IoReturnDownBack } from "react-icons/io5";

// import toast from "react-hot-toast";
import Alert from "@mui/material/Alert";

function SignUp2() {
  const { signUpData, updateSignUpData } = useContext(MyContext);
  const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    type: "", // "success" أو "error"
    message: "",
  });

  const AR_MESSAGES = {
    "Email already exists": "هذا البريد الإلكتروني مستخدم بالفعل",
    "Password Not Match": "كلمة المرور غير متطابقة",
    "Weak Password! Please make sure it contains at least one letter":
      "كلمة المرور ضعيفة! يرجى التأكد من أنها تحتوي على حرف واحد على الأقل",
    "Phone number already exists": "رقم الهاتف مستخدم بالفعل ادخل رقم اخر",
    "OTP code has expired": "انتهت صلاحية كود التحقق",
  };

  const getArabicMessage = (msg) => {
    return AR_MESSAGES[msg] || "حدث خطأ ما، حاول مرة أخرى";
  };
  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ type: "", message: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [alert.message]);

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
        "https://48af6b89dc4d.ngrok-free.app/auth/register",
        signUpData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      setAlert({
        type: "success",
        message: "تم التسجيل بنجاح",
      });
      console.log(response);
      navigate("/verify", {
        state: { email: signUpData.owner.email, type: "register" },
      });
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

  const owner = signUpData.owner || {};

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-blue-100 py-10 sm:py-16">
      {/* خلفية */}
      <img
        src={bgImage}
        alt="background pattern"
        className="fixed inset-0 w-full h-full object-cover opacity-5 pointer-events-none"
      />

      <div className="w-[95%] sm:w-[90%] md:w-[500px] bg-white rounded-2xl shadow-lg px-4 sm:px-6 md:px-8 py-6 sm:py-10 relative z-10">
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
            اكمل التسجيل لإنشاء حسابك
          </p>
        </header>

        {/* المحتوى */}
        <div className="text-center">
          <form
            className="w-full mt-8 sm:mt-10 text-start"
            onSubmit={handleSubmit}
          >
            {/* الاسم الأول والأخير */}
            <div className="form-group w-full flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="form-group mb-4 w-full sm:w-[50%]">
                <label
                  htmlFor="firstName"
                  className="mb-2 font-medium text-[10px] sm:text-[12px] md:text-[14px] text-gray-700 flex items-center gap-1"
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
                  className="mb-2 font-medium text-[10px] sm:text-[12px] md:text-[14px] text-gray-700 flex items-center gap-1"
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
                className="mb-2 font-medium text-[10px] sm:text-[12px] md:text-[14px] text-gray-700 flex items-center gap-1"
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
                className="mb-2 font-medium text-[12px] sm:text-[13px] md:text-[14px] text-gray-700 flex items-center gap-1"
              >
                رقم الهاتف <span className="text-red-500">*</span>
              </label>

              <MuiTelInput
                id="phoneNumber"
                name="phoneNumber"
                value={owner.phoneNumber}
                onChange={handlePhoneChange}
                defaultCountry="EG"
                required
                inputProps={{ required: true, "aria-required": true }}
                fullWidth
                autoComplete="tel"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    height: "50px",
                    fontSize: "15px",
                    backgroundColor: "#fff",
                    "& fieldset": {
                      borderColor: "rgba(0,0,0,0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1976d2",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1976d2",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    paddingLeft: "4.2rem",
                  },
                }}
              />
            </div>

            {/* كلمة المرور */}
            <div className="form-group mb-4 w-full relative">
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
                className="mb-2 font-medium text-[10px] sm:text-[12px] md:text-[14px] text-gray-700 flex items-center gap-1"
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
                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              >
                {isShowConfirmPassword ? (
                  <IoMdEyeOff className="text-[20px] opacity-75" />
                ) : (
                  <IoMdEye className="text-[20px] opacity-75" />
                )}
              </Button>
            </div>

            {/* زر التسجيل */}
            <div className="flex items-center w-full mt-3 mb-3 gap-2">
              <Button
                type="submit"
                disabled={loading}
                className="btn-blue btn-lg w-1/2 px-4 py2 text-[14px] sm:text-[16px]"
              >
                {loading ? (
                  <CircularProgress size={28} color="inherit" />
                ) : (
                  "تسجيل"
                )}
              </Button>
              <Link
                to={-1}
                className="w-1/2flex bg-blue-50gap-2border border-gray-600 px-4 py-2 rounded-md font-medium !text-gray-700 hover:bg-blue-100 transition"
              >
                <IoReturnDownBack className="text-[26px]" />
                <span>رجوع للخلف</span>
              </Link>
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

export default SignUp2;
