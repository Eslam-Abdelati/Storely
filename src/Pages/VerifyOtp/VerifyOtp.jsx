import React, { useEffect, useState } from "react";
import verifyImg from "../../assets/shield.png";
import OtpBox from "../../components/OtpBox/OtpBox";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import bgImage from "../../assets/patern.webp";
// import toast from "react-hot-toast";
import axios from "axios";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

function VerifyOTP() {
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    type: "", // "success" أو "error"
    message: "",
  });
  // جاي من Register.jsx
  const email = location.state?.email;
  const type = location.state?.type;
  const AR_MESSAGES = {
    "code must be a number conforming to the specified constraints":
      "الكود غير صحيح ادخل الكود المرسل لك عبر البريد الالكتروني",
    "This account is already verified": "الحساب مفعل بالفعل، قم بتسجيل الدخول",
    "Invalid verification code": "كود التحقق غير صحيح",
    "Invalid access": "الدخول غير صحيح",
    "Confirm Verify Successfully": "تم التحقق بنجاح",
  };

  const getArabicMessage = (msg) => {
    return AR_MESSAGES[msg] || msg || "حدث خطأ ما، حاول مرة أخرى";
  };

  useEffect(() => {
    if (!email || !type) {
      setAlert({
        type: "error",
        message: "الدخول غير صحيح، قم بالتسجيل مرة أخرى",
      });
      navigate("/");
    }

    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ type: "", message: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [email, type, navigate, alert.message]);

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!otp) {
      setAlert({ type: "error", message: "من فضلك ادخل الكود" });
      setLoading(false);
      return;
    }

    try {
      if (type === "register") {
        const res = await axios.post(
          "https://48af6b89dc4d.ngrok-free.app/auth/verify-email",
          { email, code: Number(otp) },
          { withCredentials: true },
        );

        console.log(res);
        
        if (res.data.status === true) {
          setAlert({
            type: "success",
            message: "تم التحقق من البريد بنجاح ",
          });
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          setAlert({
            type: "error",
            message: getArabicMessage(res.data.message),
          });
        }
       
      } else if (type === "login") {
        const res = await axios.post(
          "https://48af6b89dc4d.ngrok-free.app/auth/verify-login-otp",
          { email, code: Number(otp) },
          { withCredentials: true },
        );

        if (res.data.status === true) {
          setAlert({
            type: "success",
            message: "تم التحقق من البريد بنجاح ",
          });
          setTimeout(() => {
            navigate("/app");
          }, 1000);
        } else {
          setAlert({
            type: "error",
            message: getArabicMessage(res.data.message),
          });
        }
       
        
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: getArabicMessage(error.response?.data?.message),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center relative">
      {/* Background pattern */}
      <img
        src={bgImage}
        alt="background pattern"
        className="fixed inset-0 w-full h-full object-cover opacity-5 pointer-events-none"
      />
      <div className="w-[95%] sm:w-[90%] md:w-[450px] lg:w-[400px] bg-white rounded-md shadow-md p-5 sm:p-8">
        {/* صورة الدرع */}
        <div className="text-center flex items-center justify-center">
          <img
            src={verifyImg}
            alt="verify-shield"
            className="w-[60px] sm:w-[70px]"
          />
        </div>

        {/* العنوان */}
        <h3 className="text-center text-[18px] sm:text-[20px] text-black font-[600] mt-2 mb-1">
          Verify OTP
        </h3>
        <p className="text-center mt-0 text-[14px] sm:text-[15px]">
          OTP send to
          <span className="text-primary font-[500]"> {email} </span>
        </p>

        {/* النموذج */}
        <form onSubmit={handleSubmit} className="mt-6 sm:mt-8">
          <OtpBox length={4} onChange={handleOtpChange} />

          <div className="flex flex-col items-center justify-center mt-6 sm:mt-8">
            <a className="cursor-pointer text-[13px] sm:text-[14px] font-[600] mb-3 sm:mb-2 !text-blue-600 !hover:text-blue-800 transition">
              ? Resend OTP
            </a>

            {/* زر Verify */}
            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                disabled={loading}
                className="btn-blue btn-lg w-full px-4 py-2 text-[14px] sm:text-[16px]"
              >
                {loading ? (
                  <CircularProgress size={28} color="inherit" />
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </div>
          </div>
          {alert.message && (
            <div>
              <Alert severity={alert.type}>{alert.message}</Alert>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default VerifyOTP;
