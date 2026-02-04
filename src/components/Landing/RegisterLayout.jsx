import React from "react";
import { Outlet } from "react-router-dom";
import registerBg from "../../assets/photo-1497366216548-37526070297c.avif";
import RegisterStepper from "./RegisterStepper";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { MyContext } from "../../context/MyContext";
import PageLoader from "../PageLoader/PageLoader";

const RegisterLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 relative">
      {/* header */}
      <Navbar />
      {/* Background */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <img
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          src={registerBg}
        />
        <div className="relative z-20 text-center">
          <h2 className="text-white text-4xl font-bold mb-4">
            تسجيل مؤسسة جديدة
          </h2>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 pb-12">
        {/* Title */}
        <div className="text-center py-10">
          <h2 className="text-lg font-bold text-primary">
            مراحل تسجيل مؤسسة جديدة
          </h2>
        </div>
        {/* Stepper */}
        <div className="">
          <RegisterStepper />
        </div>

        {/* Steps Content */}
        <div className="max-w-4xl mx-auto px-4">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterLayout;
