import React, { useState } from "react";
import verifyImg from "../../assets/shield.png";
import OtpBox from "../../components/OtpBox/OtpBox";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/patern.webp";
import toast from "react-hot-toast";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("ok");
    navigate("/forgot-password");
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
          <span className="text-primary font-[500]"> eslam@yhoo.com</span>
        </p>

        {/* النموذج */}
        <form onSubmit={handleSubmit} className="mt-6 sm:mt-8">
          <OtpBox length={6} onChange={handleOtpChange} />

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
