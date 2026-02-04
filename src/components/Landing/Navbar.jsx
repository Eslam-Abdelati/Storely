import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDomain } from "react-icons/md";
import PageLoader from "../PageLoader/PageLoader";

function Navbar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setLoading(true);

    // هنا ممكن تحط عملية فعلية زي API call
    setTimeout(() => {
      navigate("/login2");
      setLoading(false);
    }, 2500); // 1 ثانية للعرض
  };
  return (
    <>
      {" "}
      {loading && <PageLoader />}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <span className="material-icons-round text-white text-xl">
                <MdDomain />
              </span>
            </div>
            <div>
              <h1 className="text-l font-bold text-slate-900 leading-tight">
                ERP Solution
              </h1>
              <p className="text-xs text-slate-500 ">ERP Solution</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <span
              className="text-primary border-b-2 border-primary pb-1 cursor-pointer"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  navigate("/");
                  setLoading(false);
                }, 2500);
              }}
            >
              الرئيسية
            </span>

            <span
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  navigate("/about");
                  setLoading(false);
                }, 800);
              }}
            >
              عن المنصة
            </span>

            <span
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  navigate("/services");
                  setLoading(false);
                }, 800);
              }}
            >
              الخدمات
            </span>

            <span
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  navigate("/contact");
                  setLoading(false);
                }, 800);
              }}
            >
              اتصل بنا
            </span>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              className="!bg-slate-100 text-gray-600 px-4 py-2 !rounded-lg font-medium hover:!bg-slate-200 transition-colors"
              onClick={handleStart}
            >
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
