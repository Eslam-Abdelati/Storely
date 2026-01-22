import { useContext, useState } from "react";
import { MyContext } from "../../context/MyContext";
import { NavLink, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import logo2 from "../../assets/icon.svg";
import { Collapse } from "react-collapse";
import { RxDashboard } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { LuPackage } from "react-icons/lu";
import { TbReportMoney } from "react-icons/tb";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const { isOpenSidbar, setIsOpenSidbar } = useContext(MyContext);
  const location = useLocation();
  
  const userType = Cookies.get("userType");

  const toggleSubmenu = (index) => {
    setSubmenuIndex(submenuIndex === index ? null : index);
  };

  // class for active link
  const activeClass = "!bg-primary/10 !text-primary !font-bold !rounded-lg";

  return (
    <>
      {/* خلفية شفافة عند فتح القائمة في الموبايل */}
      {isOpenSidbar && (
        <div
          className="fixed inset-0 bg-black/40 z-[51] lg:hidden"
          onClick={() => setIsOpenSidbar(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 z-[52]  backdrop-blur-md h-full border-l border-[#f0f2f4] dark:border-gray-800 bg-white dark:bg-[#1f2327] py-3 px-4 
        w-[75%] sm:w-[55%] md:w-[35%] lg:w-[20%] xl:w-[15%] 
        transform transition-transform duration-300 
        ${isOpenSidbar ? "translate-x-0" : "translate-x-full"} 
        lg:translate-x-0`}
      >
        {/* الشعار */}
        <div className="w-full flex">
          <NavLink to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary rounded-md flex items-center justify-center">
              <img
                src={logo2}
                alt="Storely logo"
                className="w-6 h-6 sm:w-6 sm:h-6 object-contain"
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <h1 className="text-[14px] sm:text-[16px] font-bold text-primary">
                Storely
              </h1>
              <p className="font-medium text-[8px] sm:text-[10px] -mt-1 text-gray-500">
                نظام إدارة متكامل
              </p>
            </div>
          </NavLink>
        </div>

        {/* عناصر القائمة */}
        <ul className="mt-4 max-h-[80vh] overflow-y-auto space-y-1">
          {/* لوحة التحكم */}
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `w-full !flex !items-center !justify-between !py-2 sm:!py-2.5 !px-2 sm:!px-3 !font-medium !text-gray-700 hover:!bg-gray-50 rounded-lg ${
                  isActive ? activeClass : ""
                }`
              }
            >
              <div className="flex items-center gap-2">
                <RxDashboard className="text-[18px] sm:text-[20px] xl:text-[18px]" />
                <span className="text-[14px] sm:text-[15px] xl:text-[18px]">
                  لوحة التحكم
                </span>
              </div>
            </NavLink>
          </li>

          {/* المبيعات */}
          <li>
            <Button
              className="!w-full !flex !items-center !justify-between !py-2 sm:!py-2.5 !px-2 sm:!px-3 !text-gray-700 !font-medium hover:!bg-gray-50 rounded-lg"
              onClick={() => toggleSubmenu(1)}
            >
              <div className="flex items-center gap-2">
                <TbReportMoney className="text-[17px] xl:text-[18px]" />
                <span className="text-[14px] sm:text-[15px] xl:text-[18px]">
                  المبيعات
                </span>
              </div>
              <FaAngleDown
                className={`transition-transform duration-300 ${
                  submenuIndex === 1 ? "rotate-180" : ""
                }`}
              />
            </Button>

            <Collapse isOpened={submenuIndex === 1}>
              <ul className="pl-6 mt-1 space-y-1">
                <li>
                  <NavLink
                    to="/sales_invoice"
                    className={({ isActive }) =>
                      `!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2 ${
                        isActive ? activeClass : ""
                      }`
                    }
                  >
                    <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                    إداره الفواتير
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/add-salesinvoice"
                    className={({ isActive }) =>
                      `!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2 ${
                        isActive ? activeClass : ""
                      }`
                    }
                  >
                    <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                    إنشاء فاتورة
                  </NavLink>
                </li>
              </ul>
            </Collapse>
          </li>

          {/* المنتجات */}
          <li>
            <Button
              className="!w-full !flex !items-center !justify-between !py-2 sm:!py-2.5 !px-2 sm:!px-3 !text-gray-700 !font-medium hover:!bg-gray-50 rounded-lg"
              onClick={() => toggleSubmenu(2)}
            >
              <div className="flex items-center gap-2">
                <LuPackage className="text-[17px] xl:text-[18px]" />
                <span className="text-[14px] sm:text-[15px] xl:text-[18px]">
                  المنتجات
                </span>
              </div>
              <FaAngleDown
                className={`transition-transform duration-300 ${
                  submenuIndex === 2 ? "rotate-180" : ""
                }`}
              />
            </Button>

            <Collapse isOpened={submenuIndex === 2}>
              <ul className="pl-6 mt-1 space-y-1">
                <li>
                  <NavLink
                    to="/product"
                    className={({ isActive }) =>
                      `!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2 ${
                        isActive ? activeClass : ""
                      }`
                    }
                  >
                    <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                    الكميات المتاحة
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/add-product"
                    className={({ isActive }) =>
                      `!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2 ${
                        isActive ? activeClass : ""
                      }`
                    }
                  >
                    <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                    إضافة صنف
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/category"
                    className={({ isActive }) =>
                      `!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2 ${
                        isActive ? activeClass : ""
                      }`
                    }
                  >
                    <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                    الفئات
                  </NavLink>
                </li>
              </ul>
            </Collapse>
          </li>

          {/* المشتريات */}
          <li>
            <Button
              className="!w-full !flex !items-center !justify-between !py-2 sm:!py-2.5 !px-2 sm:!px-3 !text-gray-700 !font-medium hover:!bg-gray-50 rounded-lg"
              onClick={() => toggleSubmenu(3)}
            >
              <div className="flex items-center gap-2">
                <LuPackage className="text-[17px] xl:text-[18px]" />
                <span className="text-[14px] sm:text-[15px] xl:text-[18px]">
                  المشتريات
                </span>
              </div>
              <FaAngleDown
                className={`transition-transform duration-300 ${
                  submenuIndex === 3 ? "rotate-180" : ""
                }`}
              />
            </Button>

            <Collapse isOpened={submenuIndex === 3}>
              <ul className="pl-6 mt-1 space-y-1">
                <li>
                  <NavLink
                    to="/purchases"
                    className={({ isActive }) =>
                      `!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2 ${
                        isActive ? activeClass : ""
                      }`
                    }
                  >
                    <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                    فواتير الشراء
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/supliers"
                    className={({ isActive }) =>
                      `!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2 ${
                        isActive ? activeClass : ""
                      }`
                    }
                  >
                    <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                    إدارة الموردين
                  </NavLink>
                </li>
              </ul>
            </Collapse>
          </li>

          {/* تسجيل الخروج */}
          <li>
            <Button className="!w-full !flex !items-center !justify-between !py-2 sm:!py-2.5 !px-2 sm:!px-3 !text-gray-700 !font-medium hover:!bg-gray-100 rounded-lg">
              <div className="flex items-center gap-2">
                <IoMdLogOut className="text-[18px] xl:text-[18px]" />
                <span className="text-[14px] sm:text-[15px] xl:text-[18px]">
                  تسجيل الخروج
                </span>
              </div>
              <FaAngleDown className="opacity-0" />
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
