import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdDomain } from "react-icons/md";
import React, { useContext, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";
import { MyContext } from "../../context/MyContext";
import { MuiTelInput } from "mui-tel-input";
import Alert from "@mui/material/Alert";
import PageLoader from "../../components/PageLoader/PageLoader";

const Step2 = () => {
  const navigate = useNavigate();
  const { signUpData, saveSignUpData } = useContext(MyContext);
  const [formData, setFormData] = useState(signUpData);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    type: "", // "success" أو "error"
    message: "",
  });

  const AR_MESSAGES = {
    "Email already exists": "هذا البريد الإلكتروني مستخدم بالفعل",
    "Phone number already exists": "رقم الهاتف مستخدم بالفعل ادخل رقم اخر",
  };

  const getArabicMessage = (msg) => {
    return AR_MESSAGES[msg] || "حدث خطأ ما، حاول مرة أخرى";
  };

  const showAlert = (type, message, duration = 4000) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), duration);
  };

  /* ===============================
     Handlers
  ================================ */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      owner: {
        ...prev.owner,
        [name]: value,
      },
    }));
  };

  // ✅ تعديل رقم الهاتف
  const handlePhoneChange = (newValue) => {
    setFormData((prev) => ({
      ...prev,
      owner: {
        ...prev.owner,
        phoneNumber: newValue,
      },
    }));
  };

  /* ===============================
      Submit Step 2
  ================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      saveSignUpData(formData); // حفظ البيانات

      setTimeout(() => {
        navigate("/register/step3");
      }, 2500);
    } catch (error) {
      console.log(error.response);
      const msg = error.response?.data?.message;
      showAlert("error", getArabicMessage(msg));
      setLoading(false); // هنا فقط
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
              <MdDomain />
              بيانات المستخدم
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              يرجي إدخال تفاصيل المستخدم الأساسية لإنشاء حسابك في النظام
            </p>
          </div>

          <div className="mt-4">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* First and Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    الإسم الأول <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.owner.firstName}
                    onChange={handleChange}
                    className="w-full px-2 py-2 bg-slate-50  border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    placeholder="أدخل الإسم.."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 ">
                    الإسم الأخير <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.owner.lastName}
                    onChange={handleChange}
                    className="w-full px-2 py-2 bg-slate-50  border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    placeholder="أدخل اللقب.."
                    required
                  />
                </div>
              </div>

              <hr className="border-slate-100 " />

              {/* Phone Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    رقم الهاتف <span className="text-red-500">*</span>
                  </label>

                  <MuiTelInput
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.owner.phoneNumber}
                    onChange={handlePhoneChange}
                    defaultCountry="EG"
                    required
                    inputProps={{ required: true, "aria-required": true }}
                    forceCallingCode
                    fullWidth
                    size="small"
                    autoComplete="tel"
                    variant="outlined"
                    placeholder="012XXXXXXXX "
                    sx={{
                      backgroundColor: "#f8fafc", // نفس bg-slate-50
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e2e8f0", // border-slate-200
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e2e8f0",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#3b82f6", // primary
                      },
                    }}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 ">
                    البريد الإلكتروني <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.owner.email}
                    onChange={handleChange}
                    className="w-full px-2 py-2 bg-slate-50  border border-slate-200  rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    placeholder="email@company.com"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800">
                {/* Back Button */}
                <Button
                  variant="contained"
                  className="!bg-gray-400 !text-white hover:!bg-gray-500 !flex items-center gap-2"
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      navigate("/register/step1");
                    }, 2500);
                  }}
                >
                  <IoArrowForward />
                  السابق
                </Button>

                {/* Save and Continue Button */}
                <Button
                  type="submit"
                  variant="contained"
                  className="!flex items-center gap-2"
                >
                  حفظ واستكمال الطلب
                  <IoArrowBack />
                </Button>
              </div>
            </form>
            {alert.message && (
              <div className="mt-4">
                <Alert severity={alert.type}>{alert.message}</Alert>
              </div>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Step2;
