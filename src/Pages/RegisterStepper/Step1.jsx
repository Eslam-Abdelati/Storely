import React, { useContext, useState } from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdDomain } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";
import UploadBox from "../../components/Dashboard/UploadBox";
import { MyContext } from "../../context/MyContext";
import PageLoader from "../../components/PageLoader/PageLoader";
// import axios from "axios";

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

const Step1 = () => {
  const navigate = useNavigate();
  const { signUpData, saveSignUpData } = useContext(MyContext);
  const [formData, setFormData] = useState(signUpData);
  const [loading, setLoading] = useState(false);

  // const [loading, setLoading] = useState(true);
  const isCountryLocked = countries.length === 1;

  /* ===============================
     Handlers
  ================================ */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "governorate_id" && value !== "" ? Number(value) : value,
    }));
  };

  /* ===============================
    Convert Image to Base64
  ================================ */
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = async (file) => {
    const base64 = await convertToBase64(file);
    setFormData((prev) => ({
      ...prev,
      logo: base64,
    }));
  };

  /* ===============================
      Submit Step 1
  ================================ */
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    saveSignUpData(formData);
    setTimeout(() => {
      navigate("/register/step2");
    }, 2500);
    
  };

  return (
    <>
      {loading && <PageLoader />}
      <Box className="max-w-5xl mx-auto px-4">
        <Box className="bg-white rounded-lg shadow border p-6">
          {/* Header */}
          <div className="border-b border-slate-100 pb-2">
            <h3 className="font-bold text-primary flex items-center gap-2">
              <MdDomain />
              بيانات المؤسسة
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              يرجي إدخال تفاصيل الشركة أو المؤسسة
            </p>
          </div>

          <div className="mt-4">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Store Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  اسم الشركة / المنشأة <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="store_name"
                  value={formData.store_name}
                  onChange={handleChange}
                  placeholder="أدخل اسم الشركة"
                  className="w-1/2 px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                  required
                />
              </div>

              {/* Commercial & Tax */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    السجل التجاري
                  </label>
                  <input
                    type="text"
                    name="commercialRegistrationNumber"
                    value={formData.commercialRegistrationNumber}
                    onChange={handleChange}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    البطاقة الضريبية
                  </label>
                  <input
                    type="text"
                    name="taxID"
                    value={formData.taxID}
                    onChange={handleChange}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              {/* Business Type */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  النشاط التجاري <span className="text-red-500">*</span>
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                  required
                >
                  <option value="">اختر النشاط</option>
                  <option value="Supermarket">سوبر ماركت</option>
                  <option value="Restaurant">مطعم</option>
                  <option value="Other">أخرى</option>
                </select>
              </div>

              {formData.businessType === "Other" && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    نشاط آخر <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="otherBusinessType"
                    value={formData.otherBusinessType}
                    onChange={handleChange}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    required
                  />
                </div>
              )}

              <hr className="border-slate-100" />

              {/* Location */}
              <h4 className="font-bold text-primary flex items-center gap-2">
                <FaLocationDot />
                موقع وعنوان المقر الرئيسي
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Country */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    الدولة <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    disabled={isCountryLocked}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Governorate */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    المحافظة <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="governorate_id"
                    value={formData.governorate_id}
                    onChange={handleChange}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    required
                  >
                    <option value="">اختر المحافظة</option>
                    <option value={1}>القاهرة</option>
                    <option value={2}>الجيزة</option>
                    <option value={3}>الإسكندرية</option>
                  </select>
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    المدينة <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    required
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    الرمز البريدي
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    required
                  />
                </div>
              </div>

              {/* Logo */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  لوجو الشركة
                </label>
                <UploadBox
                  id="logo"
                  value={formData.logo}
                  onFileSelect={handleFileChange}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="contained"
                className="!flex items-center gap-2"
              >
                حفظ واستكمال الطلب
                <IoArrowBack />
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Step1;
