import React, { useState } from "react";
import bgImage from "../../assets/patern.webp";
import logo2 from "../../assets/icon.svg";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import UploadBox from "../../components/UploadBox/UploadBox";
import { toast } from "react-toastify";

const countries = [
  { code: "EG", name: "مصر" },
  { code: "SA", name: "السعودية" },
  { code: "AE", name: "الإمارات" },
  { code: "KW", name: "الكويت" },
  { code: "QA", name: "قطر" },
  { code: "OM", name: "عُمان" },
  { code: "JO", name: "الأردن" },
  { code: "LB", name: "لبنان" },
  { code: "MA", name: "المغرب" },
  { code: "DZ", name: "الجزائر" },
  { code: "TN", name: "تونس" },
  { code: "LY", name: "ليبيا" },
  { code: "SD", name: "السودان" },
  { code: "IQ", name: "العراق" },
  { code: "SY", name: "سوريا" },
  { code: "YE", name: "اليمن" },
];

function FirstSignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    businessActivity: "",
    customBusinessActivity: "",
    country: "",
    city: "",
    region: "",
    zipcode: "",
    tradeRecord: "",
    taxCard: "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);

    setTimeout(() => {
      setLoading(false);
      toast.success("أكمل باقي البيانات");
      navigate("/first_settings");
    }, 2000);
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center relative py-10 sm:py-16">
      {/* خلفية باهتة */}
      <img
        src={bgImage}
        alt="background pattern"
        className="fixed inset-0 w-full h-full object-cover opacity-5 pointer-events-none"
      />

      <div className="w-[95%] sm:w-[90%] md:w-[600px] mx-auto">
        {/* ✅ الهيدر */}
        <header className="flex items-center gap-3 mb-6 sm:mb-10 justify-center">
          <img
            src={logo2}
            alt="Storely logo"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            ستورلي
          </h1>
        </header>

        {/* ✅ الصندوق الرئيسي */}
        <div className="loginBox card w-full h-auto pb-10 sm:pb-16 bg-white rounded-2xl shadow-lg pt-6 sm:pt-10">
          <div className="text-center px-3">
            <h2 className="text-center text-[18px] sm:text-[25px] md:text-[32px] lg:text-[36px] font-semibold mt-4 leading-relaxed">
              مرحبا بك في <br />
              <span className="text-primary">
                النسخة التجريبية لبرنامج ستورلي للمبيعات
              </span>
            </h2>

            <form
              className="w-full px-4 sm:px-6 md:px-8 mt-8 sm:mt-10"
              onSubmit={handleSubmit}
            >
              {/* اسم الشركة */}
              <div className="form-group mb-4 w-full">
                <label
                  htmlFor="companyName"
                  className="mb-2 font-medium text-gray-700 flex items-center gap-1"
                >
                  اسم الشركة <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full h-[45px] sm:h-[50px] border-2 border-gray-200 rounded-md focus:border-primary focus:outline-none px-3 text-[14px] sm:text-[15px]"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  autoComplete="organization"
                />
              </div>

              {/* النشاط التجاري */}
              <div className="form-group mb-4">
                <label
                  htmlFor="businessActivity"
                  className="mb-2 font-medium text-gray-700 flex items-center gap-1"
                >
                  النشاط التجاري <span className="text-red-500">*</span>
                </label>
                <select
                  id="businessActivity"
                  name="businessActivity"
                  className="w-full h-[45px] sm:h-[50px] border-2 border-gray-200 rounded-md focus:border-primary px-3 text-[14px] sm:text-[15px]"
                  value={formData.businessActivity}
                  onChange={handleChange}
                  required
                >
                  <option value="">اختر النشاط</option>
                  <option value="Supermarket">سوبر ماركت</option>
                  <option value="Restaurant">مطعم</option>
                  <option value="Cafe">كافيه</option>
                  <option value="Clothing">ملابس</option>
                  <option value="Shoes & Bags">شنط وأحذية</option>
                  <option value="Mobile & Accessories">موبايلات واكسسوار</option>
                  <option value="Electronics">الكترونيات</option>
                  <option value="Home Appliances">أجهزة منزلية</option>
                  <option value="Furniture">أثاث</option>
                  <option value="Stationery">أدوات مكتبية</option>
                  <option value="Other">أخرى</option>
                </select>
              </div>

              {formData.businessActivity === "Other" && (
                <div className="form-group mb-4">
                  <label
                    htmlFor="customBusinessActivity"
                    className="mb-2 font-medium text-gray-700 flex items-center gap-1"
                  >
                    أدخل النشاط التجاري
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="customBusinessActivity"
                    name="customBusinessActivity"
                    className="w-full h-[45px] sm:h-[50px] border-2 border-gray-200 rounded-md focus:border-primary px-3 text-[14px] sm:text-[15px]"
                    value={formData.customBusinessActivity}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {/* الدولة */}
              <div className="form-group mb-4 w-full">
                <label
                  htmlFor="country"
                  className="mb-2 font-medium text-gray-700 flex items-center gap-1"
                >
                  الدولة <span className="text-red-500">*</span>
                </label>
                <select
                  id="country"
                  name="country"
                  className="w-full h-[45px] sm:h-[50px] border-2 border-gray-200 rounded-md focus:border-primary focus:outline-none px-3 text-[14px] sm:text-[15px]"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">اختر الدولة</option>
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* المدينة والمنطقة والرمز */}
              <div className="form-group mb-4 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="form-group w-full sm:w-1/3">
                  <label
                    htmlFor="city"
                    className="mb-2 font-medium text-gray-700 flex items-center gap-1"
                  >
                    المدينة <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full h-[45px] sm:h-[50px] border-2 border-gray-200 rounded-md focus:border-primary focus:outline-none px-3 text-[14px] sm:text-[15px]"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group w-full sm:w-1/3">
                  <label
                    htmlFor="region"
                    className="mb-2 font-medium text-gray-700 flex items-center gap-1"
                  >
                    المنطقة <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full h-[45px] sm:h-[50px] border-2 border-gray-200 rounded-md focus:border-primary focus:outline-none px-3 text-[14px] sm:text-[15px]"
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group w-full sm:w-1/3">
                  <label
                    htmlFor="zipcode"
                    className="mb-2 font-medium text-gray-700 flex items-center gap-1"
                  >
                    الرمز البريدي
                  </label>
                  <input
                    type="text"
                    className="w-full h-[45px] sm:h-[50px] border-2 border-gray-200 rounded-md focus:border-primary focus:outline-none px-3 text-[14px] sm:text-[15px]"
                    id="zipcode"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* السجل التجاري والبطاقة */}
              <div className="form-group mb-4 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="form-group w-full sm:w-1/2">
                  <label
                    htmlFor="tradeRecord"
                    className="mb-2 font-medium text-gray-700 flex items-center gap-1"
                  >
                    سجل تجاري (اختياري)
                  </label>
                  <input
                    type="text"
                    className="w-full h-[45px] sm:h-[50px] border-2 border-gray-200 rounded-md focus:border-primary focus:outline-none px-3 text-[14px] sm:text-[15px]"
                    id="tradeRecord"
                    name="tradeRecord"
                    value={formData.tradeRecord}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group w-full sm:w-1/2">
                  <label
                    htmlFor="taxCard"
                    className="mb-2 font-medium text-gray-700 flex items-center gap-1"
                  >
                    بطاقة ضريبية (اختياري)
                  </label>
                  <input
                    type="text"
                    className="w-full h-[45px] sm:h-[50px] border-2 border-gray-200 rounded-md focus:border-primary focus:outline-none px-3 text-[14px] sm:text-[15px]"
                    id="taxCard"
                    name="taxCard"
                    value={formData.taxCard}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* اللوجو */}
              <div className="form-group mb-4 w-full">
                <label
                  htmlFor="logo"
                  className="mb-2 font-medium text-gray-700 flex items-center gap-1"
                >
                  لوجو الشركة
                </label>
                <UploadBox
                  id="logo"
                  onFileSelect={handleFileChange}
                  value={formData.logo}
                />
              </div>

              {/* تسجيل الدخول */}
              <div className="flex items-center justify-between mb-4 text-sm sm:text-base">
                <span>هل لديك حساب بالفعل؟</span>
                <Link
                  className="!text-primary font-[700] text-[15px] hover:underline hover:!text-gray-700 cursor-pointer"
                  to="/login"
                >
                  تسجيل الدخول
                </Link>
              </div>

              {/* زر التالي */}
              <div className="flex items-center w-full mt-3 mb-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="btn-blue btn-lg w-full h-[48px] sm:h-[52px] md:h-[55px] text-[14px] sm:text-[16px]"
                >
                  {loading ? (
                    <CircularProgress size={28} color="inherit" />
                  ) : (
                    "التالي"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FirstSignUp;
