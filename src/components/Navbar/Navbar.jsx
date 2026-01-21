import { useContext, useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { RiMenu2Line } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { MyContext } from "../../context/MyContext";
import { LiaUserCircle } from "react-icons/lia";
import { IoSearch } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineTune } from "react-icons/md";
import { FaPalette } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Navbar = () => {
  const { isOpenSidbar, setIsOpenSidbar } = useContext(MyContext);

  const [openNotifications, setOpenNotifications] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const notificationRef = useRef(null);
  const settingRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setOpenNotifications(false);
      }

      if (settingRef.current && !settingRef.current.contains(event.target)) {
        setOpenSetting(false);
      }

      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setOpenUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="h-16 bg-white border-b border-border-color px-2 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2 w-full max-w-xl">
        {/* زر القائمة */}
        <Button
          className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[rgba(0,0,0,0.8)]"
          onClick={() => setIsOpenSidbar(!isOpenSidbar)}
        >
          <RiMenu2Line className="text-[20px]" />
        </Button>

        {/* مربع البحث */}
        <div className="relative w-2/3">
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <IoSearch />
          </span>
          <input
            type="text"
            placeholder="بحث في النظام، الفواتير، العملاء..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pr-10 pl-4 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* 🔔 الإشعارات */}
        <div className="relative hidden sm:block" ref={notificationRef}>
          <IconButton
            aria-label="notifications"
            onClick={() => {
              setOpenNotifications((prev) => !prev);
              setOpenSetting(false);
              setOpenUserMenu(false);
            }}
          >
            <StyledBadge badgeContent={2} color="secondary">
              <FaRegBell className="!text-[22px]" />
            </StyledBadge>
          </IconButton>

          {/* مربع الإشعارات */}
          {openNotifications && (
            <div className="absolute top-full left-0 mt-3 w-80 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden">
              {/* الهيدر */}
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-sm">الإشعارات</h3>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                  2 جديدة
                </span>
              </div>

              {/* القائمة */}
              <div className="max-h-[300px] overflow-y-auto">
                <div className="p-4 flex gap-3 items-start border-b hover:bg-slate-50 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">
                      <FaRegBell className="!text-[22px]" />
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold mb-0.5">
                      تمت إضافة فاتورة جديدة
                    </p>
                    <p className="text-[11px] text-gray-500">#INV-2024-089</p>
                    <p className="text-[10px] text-primary mt-1">منذ 5 دقائق</p>
                  </div>
                </div>

                <div className="p-4 flex gap-3 items-start border-b hover:bg-slate-50 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">
                      <FaRegBell className="!text-[22px]" />
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold mb-0.5">تنبيه مخزون</p>
                    <p className="text-[11px] text-gray-500">
                      منتج أوشك على النفاد
                    </p>
                    <p className="text-[10px] text-primary mt-1">منذ ساعة</p>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 text-center text-xs font-bold text-primary hover:bg-slate-50 border-t">
                عرض جميع الإشعارات
              </button>
            </div>
          )}
        </div>

        {/* ⚙️ الإعدادات */}
        <div className="relative hidden sm:block" ref={settingRef}>
          <IconButton
            aria-label="settings"
            onClick={() => {
              setOpenSetting((prev) => !prev);
              setOpenNotifications(false);
              setOpenUserMenu(false);
            }}
          >
            <IoSettingsOutline className="!text-[22px]" />
          </IconButton>

          {openSetting && (
            <div className="absolute left-0 top-full mt-3 w-64 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-2xl z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-50 dark:border-gray-800">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  إعدادات النظام
                </h3>
              </div>

              <div className="py-2">
                <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-right group">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    تفضيلات النظام
                  </span>
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                    <MdOutlineTune className="text-[22px]" />
                  </span>
                </button>

                <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-right group">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    اللغة والمظهر
                  </span>
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                    <FaPalette className="text-[22px]" />
                  </span>
                </button>

                <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-right group">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    إعدادات العملة
                  </span>
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                    <MdOutlinePayments className="text-[22px]" />
                  </span>
                </button>

                <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-right group">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    إدارة المستخدمين
                  </span>
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                    <MdManageAccounts className="text-[22px]" />
                  </span>
                </button>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
                <button className="w-full py-2 bg-white dark:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                  إظهار كافة الإعدادات
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

        {/* 👤 المستخدم */}
        <div className="relative" ref={userMenuRef}>
          <div
            onClick={() => {
              setOpenUserMenu((prev) => !prev);
              setOpenNotifications(false);
              setOpenSetting(false);
            }}
            className="cursor-pointer"
          >
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center border-2"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2DS_8ai4nyU9pVyD3k--tkVFQm6k082a5LeYkOnm-v8lLZWRXVQHlOIoR4ibn52-Owey12Sf-dm_vT3P2wf59jJUyQaw-QpReJSbazF-NsQIFCA9Tkcqco55MXmwg9HtkSADUGwFKybDc06FIkviQ3xib1S5FMoa_puWBQvg7OtFX2JPImwMyEXcBpKSRlfV-MwVAhliUmimsPj4gkExORcNL0qpahl02AmO1LiwQFnFNXBhD2J6H7CE1W7lJPvFU8mtGd1cZgOo')",
              }}
            />
          </div>

          {/* Dropdown */}
          {openUserMenu && (
            <div className="absolute top-full left-0 mt-3 w-60 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b bg-slate-50">
                <p className="text-sm font-bold text-gray-800">إسلام عمار</p>
                <p className="text-xs text-gray-500">
                  eslam_abdelati@yahoo.com
                </p>
              </div>

              {/* Links */}
              <div className="py-1">
                <Link to={"/"}>
                  <MenuItem className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50">
                    <LiaUserCircle className="text-lg text-gray-400" />
                    <span className="text-[15px]"> الملف الشخصي</span>
                  </MenuItem>
                </Link>

                <Link to={"/"}>
                  <MenuItem className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50">
                    <FaLock className="text-lg text-gray-400" />
                    <span className="text-[15px] "> إعدادات الحساب </span>
                  </MenuItem>
                </Link>
              </div>

              {/* Logout */}
              <div className="border-t p-2">
                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-bold">
                  <IoMdLogOut />
                  تسجيل الخروج
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
