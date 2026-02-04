import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Alert, Button, CircularProgress } from "@mui/material";

import axios from "axios";
import PageLoader from "../../components/PageLoader/PageLoader";

function Login2() {
  const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    type: "", // "success" أو "error"
    message: "",
  });

  const AR_MESSAGES = {
    "Invalid email or password": "البريد الالكتروني أو كلمة السر غير صحيحة",
    "Code Sent Successfully": "تم ارسال الكود بنجاح",
    "Please verify your email first": "يرجى تفعيل بريدك الالكتروني أولاً",
    "Invalid access": "الدخول غير صحيح",
  };

  const getArabicMessage = (msg) => {
    return AR_MESSAGES[msg] || msg || "حدث خطأ ما، حاول مرة أخرى";
  };
  const showAlert = (type, message, duration = 4000) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), duration);
  };
  // تحقق إذا كان الفورم جاهز للتفعيل
  const isFormValid =
    formData.email.trim() !== "" || formData.password.trim() !== "";
  /* ===============================
     Handle Input Change
  ================================ */
  const handleChange = (e) => {
    const { name, value } = e.target; // نأخذ الاسم والقيمة من الـ input
    setFormData((prev) => ({
      ...prev,
      [name]: value, // نحدث الحقل المطابق للاسم
    }));
  };

  /* ===============================
     Submit Registration
  ================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);
    try {
      const res = await axios.post(
        "https://4a5aa2d8cec2.ngrok-free.app/auth/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (res.data.status === true) {
        setAlert({
          type: "success",
          message: "تم ارسال الكود بنجاح",
        });
        setTimeout(() => {
          setLoading(false);
          navigate("/verify", {
            state: { email: formData.email, type: "login" },
          });
        }, 2000);
      }
    } catch (error) {
      console.log(error.response);
      const msg = error.response?.data?.message;
      showAlert("error", getArabicMessage(msg));
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <PageLoader />}
      <div>
        <div className="flex min-h-screen w-full flex-col lg:flex-row-reverse overflow-x-hidden">
          <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
            <div
              className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-80"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBchSfXGnNFb437E4sCk1CKs0r5EZA7pDaGixILwmy1mNuxEkTqL4leUzWDDPGzLnJy2po1UqX0YDCkHkVqQrLgM7Kz7LVNPIUrPG-BdSgCp_JYOWYaJefKJoDeM6-qYvOuBQCDsQ_H5gRNl12vnSmYvCqeyy8rW7fzkpdDId0qaBTtfoEiYSwXQ9Vy_IV0RiB0JTHv4QDlmrWlaoyNP2RKyelbvB_LGTVLPgLSs047dJqHaHskfEmZScloCn0uyox0z9JiGBhrh6U")',
              }}
            ></div>

            <div className="relative z-10 flex flex-col justify-end p-16 text-white bg-gradient-to-t from-primary/60 to-transparent w-full h-full text-right">
              <h1 className="text-2xl font-bold leading-tight tracking-tight mb-4">
                ارتقِ بمستوى <br />
                عملك اليوم.
              </h1>
              <p className="text-sm font-normal text-white/80 max-w-md mr-0 ml-auto">
                انضم إلى آلاف المحترفين الذين يديرون مشاريعهم بكل سهولة ودقة.
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center bg-white dark:bg-background-dark p-6 sm:p-12 lg:p-20">
            <div className="w-full max-w-[440px] flex flex-col">
              <div className="mb-10 flex items-center gap-2">
                <div className="h-8 w-8 bg-primary rounded flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-xl">
                    layers
                  </span>
                </div>
                <span className="text-xl font-bold text-primary">
                  ستورلي ERP
                </span>
              </div>
              <div className="mb-8">
                <h2 className="text-[#141414] text-xl font-bold leading-tight tracking-tight">
                  تسجيل الدخول
                </h2>
              </div>
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-2 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      type={isShowPass ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-2 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                      placeholder="Ae@12345678"
                      required
                    />
                    <Button
                      className="!absolute left-3 top-1/2 -translate-y-1/2 z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                      onClick={() => setIsShowPass(!isShowPass)}
                    >
                      {isShowPass ? (
                        <IoMdEyeOff className="text-[20px] opacity-75" />
                      ) : (
                        <IoMdEye className="text-[20px] opacity-75" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <Link
                    className="!text-sm !font-semibold !text-primary hover:underline"
                    to="#"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!isFormValid || btnLoading}
                >
                  {btnLoading ? (
                    <CircularProgress size={28} color="inherit" />
                  ) : (
                    "تسجيل الدخول"
                  )}
                </Button>

                {alert.message && (
                  <div>
                    <Alert severity={alert.type}>{alert.message}</Alert>
                  </div>
                )}
              </form>

              <p className="mt-10 text-center text-sm text-[#757575]">
                ليس لديك حساب؟
                <Button
                  className="!font-bold !text-primary hover:!bg-transparent hover:!underline mr-1"
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      navigate("/register");
                      setLoading(false);
                    }, 2500); // 1 ثانية للعرض
                  }}
                >
                  إنشاء حساب جديد
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login2;
