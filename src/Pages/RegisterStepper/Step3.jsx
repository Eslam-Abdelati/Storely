import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdSecurity } from "react-icons/md";
import { MyContext } from "../../context/MyContext";
import Alert from "@mui/material/Alert";
import PageLoader from "../../components/PageLoader/PageLoader";

const Step3 = () => {
  const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const { signUpData, saveSignUpData } = useContext(MyContext);
  const [formData, setFormData] = useState(signUpData);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    type: "", // "success" أو "error"
    message: "",
  });

  const AR_MESSAGES = {
    "Password Not Match": "كلمة المرور غير متطابقة",
    "Weak Password! Please make sure it contains at least one letter":
      "كلمة المرور ضعيفة! يرجى التأكد من أنها تحتوي على حرف واحد على الأقل",
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

  /* ===============================
      Submit Step 2
  ================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // تحقق من تطابق كلمة المرور
      if (formData.owner.password !== formData.owner.confirmPassword) {
        showAlert("error", getArabicMessage("Password Not Match"));
        return;
      }

      saveSignUpData(formData); // حفظ البيانات محليًا
      setTimeout(() => {
        navigate("/register/step4");
      }, 2500);
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
      <Box className="max-w-5xl mx-auto px-4">
        {/* Content */}
        <Box className="bg-white rounded-lg shadow border p-6">
          <div className=" border-b border-slate-100 pb-2">
            <h3 className="font-bold text-primary flex items-center gap-2">
              <span className="material-icons-round">
                <MdSecurity />
              </span>
              إعدادت الأمان والوصول
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              قم بضبط بيانات الدخول لمستخدم النظام وتحديد الصلاحيات الأساسية
            </p>
          </div>
          {/* الرسائل */}
          {alert.message && (
            <div className="mt-4">
              <Alert severity={alert.type}>{alert.message}</Alert>
            </div>
          )}
          <div className="mt-4">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    اسم المستخدم <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      // name="userType"
                      // value={formData.owner.userType}
                      className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                      placeholder="admin_user_2024"
                      required=""
                      type="text"
                      disabled
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    الدور الوظيفي (الصلاحية)
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="userType"
                      value={formData.owner.userType}
                      onChange={handleChange}
                      className="w-full px-2 py-2 bg-slate-50  border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    >
                      <option value="owner">المالك (Owner)</option>
                      <option value="owner">مدير نظام (Admin)</option>
                      <option value="supervisor">مشرف تقني (Supervisor)</option>
                      <option value="officer">
                        مسؤول إدخال بيانات (Data Entry)
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <hr className="border-slate-100 dark:border-slate-800" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      كلمة المرور <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={isShowPass ? "text" : "password"}
                        name="password"
                        value={formData.owner.password}
                        onChange={handleChange}
                        className="w-full px-2 py-2 bg-slate-50  border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        placeholder="••••••••••••"
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
                  {/* <div class="space-y-2">
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-xs font-semibold text-slate-500">
                      قوة كلمة المرور
                    </span>
                    <span class="text-xs font-bold text-primary">متوسطة</span>
                  </div>
                  <div class="h-2 flex gap-1">
                    <div class="h-full w-1/4 bg-primary rounded-full"></div>
                    <div class="h-full w-1/4 bg-primary rounded-full"></div>
                    <div class="h-full w-1/4 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                    <div class="h-full w-1/4 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                  </div>
                  <ul class="grid grid-cols-2 gap-y-1 text-[10px] text-slate-400 mt-2">
                    <li class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-primary text-[14px]">
                        <FaCircleCheck />
                      </span>{" "}
                      8 أحرف على الأقل
                    </li>
                    <li class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-primary text-[14px]">
                        <FaCircleCheck />
                      </span>{" "}
                      حرف كبير وحرف صغير
                    </li>
                    <li class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-slate-300 text-[14px]">
                        radio_button_unchecked
                      </span>{" "}
                      أرقام (0-9)
                    </li>
                    <li class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-slate-300 text-[14px]">
                        radio_button_unchecked
                      </span>{" "}
                      رموز خاصة (!@#)
                    </li>
                  </ul>
                </div> */}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    تأكيد كلمة المرور <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={isShowConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.owner.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-2 py-2 bg-slate-50  border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                      placeholder="••••••••••••"
                      required
                    />
                    <Button
                      className="!absolute left-3 top-1/2 -translate-y-1/2 z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                      onClick={() =>
                        setIsShowConfirmPassword(!isShowConfirmPassword)
                      }
                    >
                      {isShowPass ? (
                        <IoMdEyeOff className="text-[20px] opacity-75" />
                      ) : (
                        <IoMdEye className="text-[20px] opacity-75" />
                      )}
                    </Button>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    يجب أن تتطابق مع كلمة المرور المدخلة أعلاه
                  </p>
                </div>
              </div>
              <div></div>

              <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="contained"
                  className="!bg-gray-400 !text-white hover:!bg-gray-500 !flex items-center gap-2"
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      navigate("/register/step2");
                    }, 2500);
                  }}
                >
                  <span className="material-icons-round">
                    <IoArrowForward />
                  </span>
                  السابق
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  className="!flex items-center gap-2"
                >
                  حفظ ومراجعة الطلب
                  <span className="material-icons-round">
                    <IoArrowBack />
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Step3;
