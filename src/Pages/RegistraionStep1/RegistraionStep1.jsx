import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { MdDomain } from "react-icons/md";
import registerBg from "../../assets/register bg.png";
import { FaLocationDot } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/MyContext";
import UploadBox from "../../components/UploadBox/UploadBox";

const countries = [
  { code: "EG", name: "مصر" },
  // { code: "SA", name: "السعودية" },
  // { code: "AE", name: "الإمارات" },
  // { code: "KW", name: "الكويت" },
  // { code: "QA", name: "قطر" },
  // { code: "OM", name: "عُمان" },
  // { code: "JO", name: "الأردن" },
  // { code: "LB", name: "لبنان" },
  // { code: "MA", name: "المغرب" },
  // { code: "DZ", name: "الجزائر" },
  // { code: "TN", name: "تونس" },
  // { code: "LY", name: "ليبيا" },
  // { code: "SD", name: "السودان" },
  // { code: "IQ", name: "العراق" },
  // { code: "SY", name: "سوريا" },
  // { code: "YE", name: "اليمن" },
];

function RegistraionStep1() {
  const { signUpData, updateSignUpData } = useContext(MyContext);
  const navigate = useNavigate();
  const isCountryLocked = countries.length === 1;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSignUpData({ [name]: value });
  };

  const handleFileChange = (file) => {
    updateSignUpData({ logo: file });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     setAlert({
  //       type: "success",
  //       message: "اكمل البيانات التاليه للتسجيل",
  //     });
  //   }, 2000);
  // };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 transition-colors duration-200 min-h-screen">
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
            <a className="text-primary border-b-2 border-primary pb-1" href="#">
              الرئيسية
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              عن المنصة
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              الخدمات
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              اتصل بنا
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="!bg-slate-100 text-gray-600 px-4 py-2 !rounded-lg font-medium hover:!bg-slate-200 transition-colors">
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </header>

      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
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

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-12">
          {/* Title */}
          <div className="text-center mb-10">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              مراحل تسجيل مؤسسة جديدة
            </h2>
          </div>

          {/* Steps */}
          <div className="relative max-w-4xl mx-auto">
            {/* Line */}
            <div className="absolute top-4 left-0 right-0 h-[2px] bg-slate-200"></div>

            <div className="relative z-10 flex justify-between">
              {/* Step 1 - Active */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm ring-2 ring-white dark:ring-slate-900">
                  1
                </div>
                <span className="mt-2 text-xs font-semibold text-primary">
                  تفاصيل الشركة
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <span className="mt-2 text-xs text-slate-500">
                  بيانات المستخدم
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <span className="mt-2 text-xs text-slate-500">
                  التحكم في الوصول
                </span>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <span className="mt-2 text-xs text-slate-500">
                  المراجعة والإرسال
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-icons-round text-primary">
                <MdDomain />
              </span>
              بيانات المؤسسة
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              يرجي إدخال تفاصيل الشركة أو المؤسسة
            </p>
          </div>
          <div className="p-8">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    اسم الشركة / المنشأة <span className="text-red-500">*</span>
                  </label>

                  <input
                    className="w-full px-2 py-2 bg-slate-50  border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    placeholder="أدخل اسم الشركة "
                    type="text"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 ">
                    السجل التجاري (اختياري)
                  </label>
                  <input
                    className="w-full px-2 py-2 bg-slate-50  border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    placeholder="1010XXXXXX"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    البطاقة الضريبية (اختياري)
                  </label>

                  <input
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200  rounded-lg focus:ring-2 focus:ring-primary outline-none ltr text-right"
                    placeholder="1010XXXXXX"
                    type="text"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 ">
                  النشاط التجاري الرئيسي <span className="text-red-500">*</span>
                </label>

                <select className="w-full px-2 py-2 bg-slate-50 border border-slate-200  rounded-lg focus:ring-2 focus:ring-primary outline-none ltr text-right">
                  <option value="">اختر النشاط</option>
                  <option value="Supermarket">سوبر ماركت</option>
                  <option value="Restaurant">مطعم</option>
                  <option value="Cafe">كافيه</option>
                  <option value="Clothing">ملابس</option>
                  <option value="Shoes & Bags">شنط وأحذية</option>
                  <option value="Mobile & Accessories">
                    موبايلات واكسسوار
                  </option>
                  <option value="Electronics">الكترونيات</option>
                  <option value="Home Appliances">أجهزة منزلية</option>
                  <option value="Furniture">أثاث</option>
                  <option value="Stationery">أدوات مكتبية</option>
                  <option value="Other">أخرى</option>
                </select>
              </div>

              <hr className="border-slate-100 " />
              <div className="space-y-6">
                <h4 className="font-bold text-slate-800  flex items-center gap-2">
                  <span className="material-icons-round text-primary text-xl">
                    <FaLocationDot />
                  </span>
                  موقع وعنوان المقر الرئيسي
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* الدولة */}
                  <div className="form-group mb-4 w-full">
                    <label
                      htmlFor="country"
                      className="mb-2 font-medium text-[10px] sm:text-[12px] md:text-[14px] text-gray-700 flex items-center gap-1"
                    >
                      الدولة <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      className="w-full h-[45px] sm:h-[50px] border-2 border-gray-200 rounded-md focus:border-primary focus:outline-none px-3 text-[14px] sm:text-[15px]"
                      value={signUpData.country}
                      onChange={handleChange}
                      required
                      autoComplete="country"
                      disabled={isCountryLocked}
                    >
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      المحافظة
                    </label>
                    <div className="relative">
                      <select className="w-full px-2 py-2 bg-slate-50 border border-slate-200  rounded-lg focus:ring-2 focus:ring-primary outline-none ltr text-right">
                        <option>اختر المحافظة...</option>
                        <option>القاهرة</option>
                        <option>الإسكندرية</option>
                        <option>الجيزة</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 ">
                      المركز / المدينة
                    </label>

                    <input
                      className="w-full px-2 py-2 bg-slate-50 border border-slate-200  rounded-lg focus:ring-2 focus:ring-primary outline-none ltr text-right"
                      placeholder="ادخل المدينة..."
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      الحي / المنطقة
                    </label>
                    <input
                      className="w-full px-2 py-2 bg-slate-50 border border-slate-200  rounded-lg focus:ring-2 focus:ring-primary outline-none ltr text-right"
                      placeholder="ادخل الحي..."
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      الرمز البريدي
                    </label>
                    <input
                      className="w-full px-2 py-2 bg-slate-50 border border-slate-200  rounded-lg focus:ring-2 focus:ring-primary outline-none ltr text-right"
                      placeholder="ادخل الرمز البريدي..."
                      type="text"
                    />
                  </div>
                </div>

                {/* اللوجو */}
                 <div className="space-y-2">
                   <label className="block text-sm font-semibold text-slate-700">
                     لوجو الشركة / المؤسسة
                    </label>
                  <UploadBox
                    id="logo"
                    onFileSelect={handleFileChange}
                    value={signUpData.logo}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800">
                <button
                  className="px-8 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2"
                  type="button"
                >
                  <span className="material-icons-round">
                    <IoArrowForward />
                  </span>
                  السابق
                </button>
                <button
                  className="bg-primary hover:bg-blue-500 text-white px-10 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
                  type="submit"
                >
                  حفظ واستكمال الطلب
                  <span className="material-icons-round">
                    <IoArrowBack />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegistraionStep1;

