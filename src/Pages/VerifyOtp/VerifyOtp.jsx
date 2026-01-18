import React, { useEffect, useState } from "react";
import verifyImg from "../../assets/shield.png";
import OtpBox from "../../components/OtpBox/OtpBox";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import bgImage from "../../assets/patern.webp";
import toast from "react-hot-toast";
import axios from "axios";

function VerifyOTP() {
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // جاي من Register.jsx
  const email = location.state?.email;
  const type = location.state?.type;

  useEffect(() => {
    if (!email || !type) {
      toast.error("Invalid access, please register again");
      navigate("/");
    }
  }, [email, type, navigate]);

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP");
    }

    try {
      if (type === "register") {
        const res = await axios.post(
          "https://storely-system.onrender.com/auth/verify-email",
          { email, otp },
          { withCredentials: true }
        );
        if (res.data.success) {
          toast.success("Email verified successfully 🎉");
          navigate("/login"); // ✅ يروح للوجين بعد الفيريفاي
        } else {
          toast.error(res.data.message || "OTP verification failed");
        }
      } else if (type === "login") {
        const res = await axios.post(
          "https://storely-system.onrender.com/auth/verify-login-otp",
          { email, otp },
          { withCredentials: true }
        );
        if (res.data.success) {
          toast.success("Email verified successfully 🎉");
          navigate("/app"); // ✅ يروح للوجين بعد الفيريفاي
        } else {
          toast.error(res.data.message || "OTP verification failed");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
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
            <a className="cursor-pointer text-[13px] sm:text-[14px] font-[600] mb-3 sm:mb-2 text-blue-600 hover:text-blue-800 transition">
              ? Resend OTP
            </a>

            <Button
              type="submit"
              className="btn-blue btn-lg w-full !text-[15px] sm:!text-[16px]"
            >
              Verify OTP
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default VerifyOTP;
