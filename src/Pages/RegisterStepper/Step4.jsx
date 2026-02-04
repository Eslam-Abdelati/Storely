import { Button, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdDomain } from "react-icons/md";
import React, { useContext, useState } from "react";
import { MdTaskAlt } from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";
import { MyContext } from "../../context/MyContext";
import { MdFactCheck } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdSecurity } from "react-icons/md";
import PageLoader from "../../components/PageLoader/PageLoader";

const Step4 = () => {
  const navigate = useNavigate();
  const { signUpData, submitRegister } = useContext(MyContext);
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
  const showAlert = (type, message, duration = 4000) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), duration);
  };
  /* ===============================
     Display Value or Default
  ================================ */
  const displayValue = (value) =>
    value && value.toString().trim() ? value : "غير معرف";

  /* ===============================
     Submit Registration
  ================================ */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await submitRegister(); // الآن إذا فشل سيذهب إلى catch
      showAlert("success", "تم إتمام التسجيل بنجاح");
      navigate("/verify", {
        replace: true,
        state: {
          email: signUpData.owner.email,
          type: "register",
        },
      });
    } catch (error) {
      const msg = error.response?.data?.message;
      showAlert("error", getArabicMessage(msg));
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <Box className="max-w-5xl mx-auto px-4">
        {/* Content */}
        <Box className="bg-white rounded-lg shadow border p-6">
          <div className=" border-b border-slate-100 pb-2">
            <h3 className="font-bold text-primary flex items-center gap-2">
              <span className="material-icons-round">
                <MdFactCheck />
              </span>
              مراجعة البيانات النهائية
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              يرجى التأكد من صحة جميع البيانات المدخلة قبل إتمام عملية التسجيل.
            </p>
          </div>

          <div className="py-4 space-y-10">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg text-slate-900  flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    <IoMdPerson />
                  </span>
                  بيانات المستخدم
                </h4>
                <Button
                  onClick={() => navigate("/register/step2")}
                  className="flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">
                    <MdEdit />
                  </span>
                  تعديل
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="col-span-1 lg:col-span-2">
                  <span className="block text-xs text-slate-500 mb-1">
                    الاسم بالكامل
                  </span>
                  <span className="font-semibold text-slate-800">
                    {signUpData?.owner?.firstName} {signUpData?.owner?.lastName}
                  </span>
                </div>

                <div className="col-span-1 lg:col-span-2">
                  <span className="block text-xs text-slate-500 mb-1">
                    رقم الهاتف
                  </span>
                  <span
                    className="font-semibold text-slate-800 inline-block"
                    dir="ltr"
                  >
                    {signUpData?.owner?.phoneNumber}
                  </span>
                </div>
                <div className="col-span-1 lg:col-span-2">
                  <span className="block text-xs text-slate-500 mb-1">
                    البريد الإلكتروني
                  </span>
                  <span className="font-semibold text-slate-800">
                    {signUpData?.owner?.email}
                  </span>
                </div>
              </div>
            </section>
            <section>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    <MdDomain />
                  </span>
                  بيانات المنشأة / الشركة
                </h4>
                <Button
                  onClick={() => navigate("/register/step1")}
                  className="flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">
                    <MdEdit />
                  </span>
                  تعديل
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div>
                  <span className="block text-xs text-slate-500  mb-1">
                    اسم الشركة
                  </span>
                  <span className="font-semibold text-slate-800 ">
                    {signUpData?.store_name}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500 mb-1">
                    نوع النشاط
                  </span>
                  <span className="font-semibold text-slate-800 ">
                    {signUpData?.businessType}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500 mb-1">
                    العنوان الرئيسي
                  </span>
                  <span className="font-semibold text-slate-800 ">
                    {signUpData?.address}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500  mb-1">
                    السجل التجاري
                  </span>
                  <span className="font-semibold text-slate-800 ">
                    {displayValue(signUpData.commercialRegistrationNumber)}
                  </span>
                </div>

                <div>
                  <span className="block text-xs text-slate-500 mb-1">
                    الرقم الضريبي
                  </span>
                  <span className="font-semibold text-slate-800 ">
                    {displayValue(signUpData.taxID)}
                  </span>
                </div>
              </div>
            </section>
            <section>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    <MdSecurity />
                  </span>
                  التحكم في الوصول والأمان
                </h4>
                <Button
                  onClick={() => navigate("/register/step3")}
                  className="flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">
                    <MdEdit />
                  </span>
                  تعديل
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50  p-6 rounded-xl border border-slate-100 ">
                <div>
                  <span className="block text-xs text-slate-500  mb-1">
                    دور المستخدم
                  </span>
                  <span className="font-semibold text-slate-800 ">
                    {signUpData?.owner?.userType}
                  </span>
                </div>
              </div>
            </section>
            {/* الرسائل */}
            {alert.message && (
              <div className="mt-4">
                <Alert severity={alert.type}>{alert.message}</Alert>
              </div>
            )}

            <div className="flex items-center justify-between pt-8 border-t border-slate-100">
              <Button
                variant="contained"
                className="!bg-gray-400 !text-white hover:!bg-gray-500 !flex items-center gap-2"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    navigate("/register/step3");
                  }, 2500);
                }}
              >
                <span className="material-icons-round">
                  <IoArrowForward />
                </span>
                السابق
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                className="!flex items-center gap-2"
              >
                إتمام عملية التسجيل
                <span className="material-icons-round">
                  <MdTaskAlt className="text-[18px]" />
                </span>
              </Button>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Step4;
