import { useContext, useState } from "react";
import { MyContext } from "../../context/MyContext";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import logo from "../../assets/logo.jpg";
import { Collapse } from "react-collapse";
import { RxDashboard } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { LuPackage } from "react-icons/lu";
import { TbReportMoney } from "react-icons/tb";
import { PiCashRegisterBold } from "react-icons/pi";

const Sidebar = () => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const { isOpenSidbar, setIsOpenSidbar } = useContext(MyContext);

  const toggleSubmenu = (index) => {
    setSubmenuIndex(submenuIndex === index ? null : index);
  };

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
        className={`fixed top-0 right-0 z-[52] bg-white/95 backdrop-blur-md h-full border-l border-blue-100 py-3 px-4 
        w-[75%] sm:w-[55%] md:w-[35%] lg:w-[20%] xl:w-[15%] 
        transform transition-transform duration-300 
        ${isOpenSidbar ? "translate-x-0" : "translate-x-full"} 
        lg:translate-x-0`}
      >
        {/* الشعار */}
        <div className="py-3 w-full mb-6 flex justify-center">
          <Link to="/app">
            <img
              src={logo}
              alt="logo"
              className="w-[120px] sm:w-[140px] md:w-[160px] object-contain"
            />
          </Link>
        </div>

        {/* عناصر القائمة */}
        <ul className="mt-4 max-h-[80vh] overflow-y-auto space-y-1">
          {/* لوحة التحكم */}
          <li>
            <Link to={"/app"}>
              <Button className="w-full !flex !items-center !justify-between !py-2 sm:!py-3 !px-2 sm:!px-3 !text-gray-700 !font-medium hover:!bg-gray-100 rounded-lg">
                {/* الأيقونة + النص */}
                <div className="flex items-center gap-2">
                  <RxDashboard className="text-[18px] sm:text-[20px] xl:text-[18px]" />
                  <span className="text-[14px] sm:text-[15px] xl:text-[18px]">
                    لوحة التحكم
                  </span>
                </div>
                {/* السهم */}
                <FaAngleDown className="opacity-0" />{" "}
                {/* لإبقاء الترتيب ثابت */}
              </Button>
            </Link>
          </li>

          {/* المبيعات */}
          <li>
            <Button
              className="!w-full !flex !items-center !justify-between !py-2 sm:!py-3 !px-2 sm:!px-3 !text-gray-700 !font-medium hover:!bg-gray-100 rounded-lg"
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
                  <Link to={"/app/sales_invoice"}>
                    <Button className="!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2">
                      <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                      إداره الفواتير
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to={"/app/sales_invoice/add-salesinvoice"}>
                    <Button className="!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2">
                      <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                      إنشاء فاتورة
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          {/* المنتجات */}
          <li>
            <Button
              className="!w-full !flex !items-center !justify-between !py-2 sm:!py-3 !px-2 sm:!px-3 !text-gray-700 !font-medium hover:!bg-gray-100 rounded-lg"
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
                  <Link to={"/app/product"}>
                    <Button className="!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2">
                      <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                      الكميات المتاحة
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to={"/app/add-product"}>
                    <Button className="!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2">
                      <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                      إضافة صنف
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to={"/app/category"}>
                    <Button className="!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2">
                      <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                      الفئات
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to={"/app/category"}>
                    <Button className="!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2">
                      <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                      طباعة تكت
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          {/* المشتريات */}
          <li>
            <Button
              className="!w-full !flex !items-center !justify-between !py-2 sm:!py-3 !px-2 sm:!px-3 !text-gray-700 !font-medium hover:!bg-gray-100 rounded-lg"
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
                  <Link to={"/app/product"}>
                    <Button className="!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2">
                      <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                      فواتير الشراء
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to={"/app/add-product"}>
                    <Button className="!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2">
                      <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                      الموردين
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to={"/app/category"}>
                    <Button className="!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2">
                      <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                      إضافة مورد
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          {/* نقاط البيع */}
          {/* <li>
            <Button
              className="!w-full !flex !items-center !justify-between !py-2 sm:!py-3 !px-2 sm:!px-3 !text-gray-700 !font-medium hover:!bg-gray-100 rounded-lg"
              onClick={() => toggleSubmenu(3)}
            >
              <div className="flex items-center gap-2">
                <PiCashRegisterBold className="text-[17px] xl:text-[18px]" />
                <span className="text-[14px] sm:text-[15px] xl:text-[18px]">
                  نقاط البيع
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
                  <Link to={"/app/pos_shifts"}>
                    <Button className="!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2">
                      <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                      بدأ البيع
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to={"/app/pos"}>
                    <Button className="!justify-start w-full !py-1.5 sm:!py-2 !text-gray-600 hover:!bg-gray-50 !text-[13px] sm:!text-[14px] xl:!text-[18px] !pl-4 flex gap-2">
                      <span className="w-[5px] h-[5px] rounded-full bg-gray-400"></span>
                      الجلسات
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li> */}

          {/* تسجيل الخروج */}
          <li>
            <Button className="!w-full !flex !items-center !justify-between !py-2 sm:!py-3 !px-2 sm:!px-3 !text-gray-700 !font-medium hover:!bg-gray-100 rounded-lg">
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
