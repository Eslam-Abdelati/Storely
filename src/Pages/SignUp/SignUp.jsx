import React, { useState } from "react";
import bgImage from "../../assets/patern.webp";
import logo from "../../assets/logo.jpg";
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

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // state للفورم كله
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

  // function لتحديث الصورة
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
    <section className="bg-white w-full">
      <header className="w-full static lg:fixed top-0 left-0 px-4 py-3 flex items-center justify-center sm:justify-between z-50">
        <Link to="/">
          <img src={logo} alt="logo" className="w-[200px]" />
        </Link>

        <div className="flex items-center gap-0">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <Button className="!uppercase !rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1">
              <MdLogin className="text-[18px]" />
              تسجيل الدخول
            </Button>
          </NavLink>

          <NavLink
            to="/sign-up"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <Button className="!uppercase !rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1">
              <FaRegUser className="text-[15px]" />
              ابدأالاستخدام مجانا
            </Button>
          </NavLink>
        </div>
      </header>

      <img
        src={bgImage}
        alt="background pattern"
        className="w-full fixed top-0 left-0 opacity-5"
      />

      <div className="loginBox card w-full md:w-[600px] h-auto pb-20 mx-auto pt-5 lg:pt-20 relative z-50">
        <div className="text-center">
          <img src={logo2} alt="logo2" className="m-auto" />
          <h1 className="text-center text-[18px] sm:text-[35px] font-[600] mt-4">
            مرحبا بك في <br />
            <span className="text-primary">
              النسخه التجريبي لبرنامج فوتر للمبيعات
            </span>
          </h1>

          <form className="w-full px-8 mt-10" onSubmit={handleSubmit}>
            <div className="form-group mb-4 w-full">
              <label
                htmlFor="companyName"
                className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
              >
                اسم الشركة
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3"
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
                className="w-full h-[50px] border-2 border-gray-200 rounded-md focus:border-primary px-3"
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
                <option value="Mobile & Accessories"> موبايلات واكسسوار</option>
                <option value="Electronics">الكترونيات</option>
                <option value="Home Appliances">أجهزة منزلية</option>
                <option value="Furniture">أثاث</option>
                <option value="Stationery">أدوات مكتبية</option>
                <option value="Other">اخري</option>
              </select>
            </div>

            {/* إذا اختار "آخر" */}
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
                  className="w-full h-[50px] border-2 border-gray-200 rounded-md focus:border-primary px-3"
                  value={formData.customBusinessActivity}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="form-group mb-4 w-full">
              <label
                htmlFor="country"
                className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
              >
                الدولة
                <span className="text-red-500">*</span>
              </label>
              <select
                id="country"
                name="country"
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3"
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

            <div className="form-group mb-4 w-full flex items-center justify-between gap-4">
              <div className="form-group mb-4">
                <label
                  htmlFor="city"
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
                >
                  المدينة
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3"
                  id="city"
                  name="city"
                  aria-label="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  autoComplete="address-level1"
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="region"
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
                >
                  المنطقة
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3"
                  id="region"
                  name="region"
                  aria-label="region"
                  value={formData.region}
                  onChange={handleChange}
                  required
                  autoComplete="address-level1"
                />
              </div>
              <div className="form-group mb-4 ">
                <label
                  htmlFor="zipcode"
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
                >
                  الرمز البريدي
                </label>
                <input
                  type="text"
                  className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3"
                  id="zipcode"
                  name="zipcode"
                  aria-label="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  autoComplete="postal-code"
                />
              </div>
            </div>

            <div className="form-group mb-4 w-full flex items-center justify-between gap-4">
              <div className="form-group mb-4 w-[50%]">
                <label
                  htmlFor="tradeRecord"
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
                >
                  سجل تجاري (اختياري)
                </label>
                <input
                  type="text"
                  className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3"
                  id="tradeRecord"
                  name="tradeRecord"
                  aria-label="tradeRecord"
                  value={formData.tradeRecord}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="form-group mb-4 w-[50%]">
                <label
                  htmlFor="taxCard"
                  className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
                >
                  بطاقة ضريبية (اختياري)
                </label>
                <input
                  type="text"
                  className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-primary focus:outline-none px-3"
                  id="taxCard"
                  name="taxCard"
                  aria-label="taxCard"
                  value={formData.taxCard}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group mb-4 w-full">
              <label
                htmlFor="logo"
                className="mb-2 font-medium text-[rgb(75,85,99)] flex items-center gap-1"
              >
                لوجو الشركه
              </label>
              <UploadBox
                id="logo"
                onFileSelect={handleFileChange}
                value={formData.logo}
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-[14px]"> هل لديك حساب بالفعل ؟</span>
              <Link
                className="!text-primary font-[700] text-[15px] hover:underline hover:!text-gray-700 cursor-pointer"
                to="/login"
              >
                تسجيل الدخول
              </Link>
            </div>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                disabled={loading}
                className="btn-blue btn-lg w-full"
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

export default SignUp;
