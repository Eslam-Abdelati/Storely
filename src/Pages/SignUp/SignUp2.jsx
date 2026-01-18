import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/MyContext";
import axios from "axios";
import logo2 from "../../assets/icon.svg";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MuiTelInput } from "mui-tel-input";
import CircularProgress from "@mui/material/CircularProgress";
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

    const AR_MESSAGES = {
      "Email already exists": "هذا البريد الإلكتروني مستخدم بالفعل",
      "Password Not Match": "كلمة المرور غير متطابقة",
      "Weak Password! Please make sure it contains at least one letter":
        "كلمة المرور ضعيفة! يرجى التأكد من أنها تحتوي على حرف واحد على الأقل",
        "Phone number already exists": "رقم الهاتف مستخدم بالفعل ادخل رقم اخر", 
    };

    const getArabicMessage = (msg) => {
      return AR_MESSAGES[msg] || "حدث خطأ ما، حاول مرة أخرى";
    };
    try {
      const response = await axios.post(
        "https://storely-system.fly.dev/auth/register",
        signUpData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      setAlert({
        type: "success",
        message: "تم التسجيل بنجاح",
      });
      // toast.success("تم التسجيل بنجاح ");
      console.log(response);
      navigate("/verify", {
        state: { email: signUpData.owner.email, type: "register" },
      });
    } catch (error) {
      console.log(error.response);
      const msg = error.response?.data?.message;
      // toast.error(getArabicMessage(msg));
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
      <div className="w-[95%] sm:w-[90%] md:w-[600px] bg-white rounded-2xl shadow-lg px-4 sm:px-6 md:px-8 py-6 sm:py-10">
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
