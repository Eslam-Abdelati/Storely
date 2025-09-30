import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import logo from "../../assets/logo.jpg";
import { Collapse } from "react-collapse";
import { RxDashboard } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { RiProductHuntLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoLayersSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { SiBloglovin } from "react-icons/si";

const Sidebar = () => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const isOpenSubMenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };
  return (
    <div className="sidebar fixed top-0 right-0 z-[52] bg-[rgba(255,255,255,0.8)] h-full border-l border-[rgb(219,234,254)] py-2 px-4 w-[20%]">
      <div className="py-2 w-full mb-6">
        <Link>
          <img src={logo} alt="logo" className="w-[150px] md:min-w-[170px]" />
        </Link>
      </div>

      <ul className="mt-4 max-h-[80vh]">
        {/* لوحة التحكم */}
        <li>
          <Link to="/">
            <Button className="w-full !capitalize !justify-start flex gap-3 !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[rgba(229,233,236,0.5)] ">
              <RxDashboard className="text-[18px]" />
              <span className="text-[15px]">لوحة التحكم</span>
            </Button>
          </Link>
        </li>

        {/* المبيعات */}
        <li>
          <Button
            className="w-full !capitalize !justify-start flex gap-3  !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[rgba(229,233,236,0.5)]"
            onClick={() => isOpenSubMenu(1)}
          >
            <FaRegImage className="text-[16px]" />
            <span className="text-[15px]">المبيعات</span>
            <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
              <FaAngleDown className={`transition-all `} />
            </span>
          </Button>

          <Collapse isOpened={submenuIndex === 1 ? true : false}>
            <ul className="w-full">
              <li className="w-full">
                <Link to={"/"}>
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[14px] !font-[500] !pl-9 flex gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    إداره الفواتير
                  </Button>
                </Link>
              </li>

              <li className="w-full">
                <Link to={"/"}>
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[14px] !font-[500] !pl-9 flex gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    إنشاء فاتورة
                  </Button>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>

        {/* نقاط البيع */}
        <li>
          <Button
            className="w-full !capitalize !justify-start flex gap-3  !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[rgba(229,233,236,0.5)]"
            onClick={() => isOpenSubMenu(2)}
          >
            <FaRegImage className="text-[16px]" />
            <span className="text-[15px]">نقاط البيع</span>
            <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
              <FaAngleDown className={`transition-all `} />
            </span>
          </Button>

          <Collapse isOpened={submenuIndex === 2 ? true : false}>
            <ul className="w-full">
              <li className="w-full">
                <Link to={"/pos_shifts"}>
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[14px] !font-[500] !pl-9 flex gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    بدأ البيع
                  </Button>
                </Link>
              </li>

              <li className="w-full">
                <Link to={"/"}>
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[14px] !font-[500] !pl-9 flex gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    الجلسات
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Link to={"/"}>
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[14px] !font-[500] !pl-9 flex gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    تقرير نقاط البيع
                  </Button>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>

        {/*  ادارة المخزون */}
        <li>
          <Button
            className="w-full !capitalize !justify-start flex gap-3  !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[rgba(229,233,236,0.5)]"
            onClick={() => isOpenSubMenu(3)}
          >
            <FaRegImage className="text-[16px]" />
            <span className="text-[15px]">إدارة المنتجات</span>
            <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
              <FaAngleDown className={`transition-all `} />
            </span>
          </Button>

          <Collapse isOpened={submenuIndex === 3 ? true : false}>
            <ul className="w-full">
              <li className="w-full">
                <Link to={"/product"}>
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[14px] !font-[500] !pl-9 flex gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    الكميات المتاحة
                  </Button>
                </Link>
              </li>

              <li className="w-full">
                <Link to={"/add-product"}>
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[14px] !font-[500] !pl-9 flex gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    اضافة صنف
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Link to={"/category"}>
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[14px] !font-[500] !pl-9 flex gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    الفئات
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Link to={"/"}>
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[14px] !font-[500] !pl-9 flex gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    طباعة تكت
                  </Button>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>

        {/*  المخازن */}
        <li>
          <Button
            className="w-full !capitalize !justify-start flex gap-3  !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[rgba(229,233,236,0.5)]"
            onClick={() => isOpenSubMenu(4)}
          >
            <FaRegImage className="text-[16px]" />
            <span className="text-[15px]">المخازن</span>
            <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
              <FaAngleDown className={`transition-all `} />
            </span>
          </Button>

          <Collapse isOpened={submenuIndex === 4 ? true : false}>
            <ul className="w-full">
              <li className="w-full">
                <Link to={"/"}>
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[14px] !font-[500] !pl-9 flex gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    المخازن
                  </Button>
                </Link>
              </li>

              <li className="w-full">
                <Link to={"/"}>
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[14px] !font-[500] !pl-9 flex gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    اذن صرف
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Link to={"/"}>
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[14px] !font-[500] !pl-9 flex gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    اذن إضافة
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Link to={"/"}>
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[14px] !font-[500] !pl-9 flex gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    عرض اوامر التحويل
                  </Button>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>

        {/* تسجيل الخروج */}
        <li>
          <Button className="w-full !capitalize !justify-start flex gap-3 !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1] ">
            <IoMdLogOut className="text-[18px]" />
            <span className="text-[15px]">تسجيل الخروج</span>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
