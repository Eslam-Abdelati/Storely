import React, { useState } from "react";
import bgImage from "../../assets/patern.webp";
// import logo from "../../assets/logo.jpg";
import logo2 from "../../assets/icon.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { MdLogin } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
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
    <section className=" w-full min-h-screen ">
     

      {/* Background pattern */}
      <img
        src={bgImage}
        alt="background pattern"
        className="w-full fixed top-0 left-0 opacity-5 pointer-events-none"
      />

      {/* Main form box */}
      <div className="loginBox card w-[95%] sm:w-[90%] md:w-[600px] h-auto pb-10 sm:pb-16 mx-auto mt-5 mb-10 sm:mt-10 pt-6 sm:pt-10 relative bg-white rounded-2xl shadow-lg">
        <div className="text-center px-3">
          <img
            src={logo2}
            alt="logo2"
            className="m-auto w-[70px] sm:w-[90px]"
          />
          <h1 className="text-center text-[20px] sm:text-[28px] md:text-[35px] font-semibold mt-4 leading-relaxed">
            مرحبا بك في <br />
            <span className="text-primary">
              النسخة التجريبية لبرنامج ستورلي للمبيعات
            </span>
          </h1>

          <form
            className="w-full px-4 sm:px-6 md:px-8 mt-8 sm:mt-10"
            onSubmit={handleSubmit}
          >
            {/* اسم الشركة */}
            <div className="form-group mb-4 w-full">
              <label
                htmlFor="companyName"
                className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
              >
                اسم الشركة <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3 text-[14px] sm:text-[15px]"
                id="companyName"
                name="companyName"
                aria-label="companyName"
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
                className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
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
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
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
                className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
              >
                الدولة <span className="text-red-500">*</span>
              </label>
              <select
                id="country"
                name="country"
                className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3 text-[14px] sm:text-[15px]"
                value={formData.country}
                onChange={handleChange}
                required
                autoComplete="country"
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
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
                >
                  المدينة <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3 text-[14px] sm:text-[15px]"
                  id="city"
                  name="city"
                  aria-label="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  autoComplete="address-level1"
                />
              </div>

              <div className="form-group w-full sm:w-1/3">
                <label
                  htmlFor="region"
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
                >
                  المنطقة <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3 text-[14px] sm:text-[15px]"
                  id="region"
                  name="region"
                  aria-label="region"
                  value={formData.region}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group w-full sm:w-1/3">
                <label
                  htmlFor="zipcode"
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
                >
                  الرمز البريدي
                </label>
                <input
                  type="text"
                  className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3 text-[14px] sm:text-[15px]"
                  id="zipcode"
                  name="zipcode"
                  aria-label="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  autoComplete="postal-code"
                />
              </div>
            </div>

            {/* السجل التجاري والبطاقة */}
            <div className="form-group mb-4 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="form-group w-full sm:w-1/2">
                <label
                  htmlFor="tradeRecord"
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
                >
                  سجل تجاري (اختياري)
                </label>
                <input
                  type="text"
                  className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3 text-[14px] sm:text-[15px]"
                  id="tradeRecord"
                  name="tradeRecord"
                  value={formData.tradeRecord}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group w-full sm:w-1/2">
                <label
                  htmlFor="taxCard"
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
                >
                  بطاقة ضريبية (اختياري)
                </label>
                <input
                  type="text"
                  className="w-full h-[45px] sm:h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3 text-[14px] sm:text-[15px]"
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
                className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
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
                className="!text-primary font-[700] hover:underline hover:text-gray-700 cursor-pointer"
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
                className="btn-blue btn-lg w-full h-[45px] sm:h-[50px] text-[14px] sm:text-[16px]"
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
    </section>
  );
}

export default FirstSignUp;
