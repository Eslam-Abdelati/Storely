import React, { useState } from "react";
import verifyImg from "../../assets/shield.png";
import OtpBox from "../../components/OtpBox/OtpBox";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
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
    <section className="section py-10">
      <div className="container mx-auto">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <div className="text-center flex items-center justify-center ">
            <img src={verifyImg} alt="verify-shield" width="70" />
          </div>
          <h3 className="text-center text-[18px] text-black font-[600] mt-4 mb-1">
            Verify OTP
          </h3>
          <p className="text-center mt-0 ">
            OTP send to
            <span className="text-primary font-[500]"> eslam@yhoo.com</span>
          </p>

          <form action="" onSubmit={handleSubmit} className="mt-4">
            <OtpBox length={6} onChange={handleOtpChange} />

            <div className="flex flex-col items-center justify-center mt-4">
              <a className="cursor-pointer text-[14px] font-[600] mb-2">
                Resend OTP?
              </a>
              <Button type="submit" className="btn-blue btn-lg w-full">
                Verify OTP
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default VerifyOTP;
