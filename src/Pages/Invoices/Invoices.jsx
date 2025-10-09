import React, { useState } from "react";
import Button from "@mui/material/Button";
import Badge from "../../components/Badge/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Select from "react-select";

import { TbFileInvoice } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";
import { IoMdCloudUpload } from "react-icons/io";
import { FaChartPie } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillFilePdf } from "react-icons/ai";
import { FaPrint } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";

// ✅ قائمة حالات الدفع
const paymentStatusList = [
  { value: "all", label: "الكل" },
  { value: "paid", label: "مدفوع" },
  { value: "unpaid", label: "غير مدفوع" },
  { value: "partial", label: "مدفوع جزئياً" },
  { value: "returned", label: "مرتجع" },
  { value: "partial_returned", label: "مرتجع جزئي" },
];

// ✅ بيانات تجريبية للفواتير
const invoicesData = [
  {
    id: 1,
    code: "INV-2025109-001",
    customer: "أحمد محمد",
    total: 1200,
    date: "2024-10-07 03:45 م",
    status: "مدفوع",
    items: 2,
  },
  {
    id: 2,
    code: "INV-2025109-002",
    customer: "أحمد محمد",
    total: 1200,
    returned: 500,
    date: "2024-10-07 03:45 م",
    status: "غير مدفوع",
    extraStatus: ["مرتجع جزئي", "تحت التسليم"],
    items: 2,
  },
  {
    id: 3,
    code: "INV-2025109-003",
    customer: "أحمد محمد",
    total: 1200,
    date: "2024-10-07 03:45 م",
    status: "غير مدفوع",
    items: 2,
  },
];

function Invoices() {
  // ✅ حالة النموذج
  const [formData, setFormData] = useState({
    clint: "",
    invoiceNumber: "",
    paymentStatus: paymentStatusList[0],
  });

  // ✅ القائمة المنسدلة (Menu)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // ✅ لتحديث حقول الإدخال العادية
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ لتحديث Select (react-select)
  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prev) => ({ ...prev, [name]: selectedOption }));
  };

  // ✅ عند الضغط على زر البحث
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🔍 بيانات البحث:", formData);
  };

  return (
    <>
      {/* عنوان الصفحة وازرار */}
      <div className="w-full py-4 px-5 bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] shadow-sm flex items-center mb-5 justify-between rounded-md">
        <div className=" flex items-center justify-between w-full">
          <div className="info">
            <h1 className="text-[18px] lg:text-[20px] font-bold text-[#1e40af]">
              فواتير المبيعات
              <TbFileInvoice className="inline-block mr-2 text-[22px] lg:text-[26px]" />
            </h1>
            <span className="text-[rgba(0,0,0,.7)]">
              إجمالي الفواتير: 2 فاتورة
            </span>
          </div>
          <div className="flex gap-2">
            <Button className="btn-blue flex items-center gap-1">
              <IoMdCloudUpload className="text-[18px] lg:text-[20px]" />
              استيراد
            </Button>
            <Button className="!bg-gray-300 hover:!bg-gray-400 !text-[rgba(0,0,0,0.7)] flex items-center gap-1">
              <FaChartPie className="text-[18px] lg:text-[20px]" />
              تقارير الفواتير
            </Button>
            <Button className="btn-green flex items-center gap-1">
              <FiPlus className="text-[18px] lg:text-[20px]" />
              فاتوره جديدة
            </Button>
          </div>
        </div>
      </div>

      {/*  الفلاتر */}
      <div className="w-full py-4 px-5 bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] shadow-sm rounded-md mb-5">
        <div className="flex items-center gap-2 w-full text-[#1e40af] mb-4">
          <h2 className="text-[18px] lg:text-[20px] font-bold ">بحث</h2>
          <IoSearch />
        </div>

        <div className="w-full">
          <form action="" className="w-full" onSubmit={handleSubmit}>
            <div className="w-full flex items-center gap-2">
              <div className="form-group flex flex-col gap-2 w-full">
                <label
                  htmlFor="clint"
                  className="text-sm font-semibold text-gray-700"
                >
                  العميل
                </label>
                <TextField
                  type="text"
                  id="clint"
                  name="clint"
                  value={formData.clint}
                  onChange={handleChange}
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  className="bg-white"
                />
              </div>

              <div className="form-group flex flex-col gap-2 w-full">
                <label
                  htmlFor="invoiceNumber"
                  className="text-sm font-semibold text-gray-700"
                >
                  رقم الفاتورة
                </label>
                <TextField
                  type="text"
                  id="invoiceNumber"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleChange}
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  className="bg-white"
                />
              </div>

              <div className="form-group flex flex-col gap-2 w-full">
                <label
                  htmlFor="paymentStatus"
                  className="text-sm font-semibold text-gray-700"
                >
                  حالة الدفع
                </label>

                <Select
                  inputId="paymentStatus"
                  name="paymentStatus"
                  options={paymentStatusList}
                  value={formData.selectedPaymentStatus}
                  onChange={handleSelectChange}
                  isSearchable
                  autoComplete="off"
                  className="bg-white"
                />
              </div>
            </div>

            <div className="mt-2">
              <Button type="submit" className="btn-blue">
                بحث
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* قائمة الفواتير */}
      <div className="w-full py-4 px-5  bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] shadow-sm mb-5 rounded-md">
        <div className=" flex flex-col w-full gap-5">
          <div>
            <h2 className="text-[18px] lg:text-[20px] font-bold text-[#1e40af]">
              قائمة الفواتير (2)
              <TbFileInvoice className="inline-block mr-2 text-[22px] lg:text-[26px]" />
            </h2>
          </div>

          {/* بيانات الفاتورة */}
          <div className="w-full py-3 px-4 bg-white border border-[rgb(219,234,254)] shadow-sm hover:shadow-md flex  justify-between rounded-md">
            <Link to={"/app"}>
              <div className="col1">
                <div className="flex items-center gap-2">
                  <span className="text-primary border border-primary rounded-2xl py-1 px-2 text-[12px] font-semibold">
                    INV-2025109-001
                  </span>
                  <span className="text-[rgba(0,0,0,0.7)]">2 منتج</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[rgba(0,0,0,0.7)] flex items-center gap-1">
                    <CiCalendar className="text-[16px]" />
                    2024-10-07 03:45 م
                  </span>
                  <span className="text-[rgba(0,0,0,0.7)] flex items-center gap-1">
                    <FiUser className="text-[16px]" />
                    أحمد محمد
                  </span>
                </div>
              </div>
            </Link>

            <div className="col2 flex items-center gap-5">
              <div>
                <p className="text-[18px] font-bold text-[#1e40af] mr-2">
                  1,200.00 ج.م
                </p>
                <p className="flex justify-end">
                  <Badge status="مدفوعة" />
                </p>
              </div>

              {/*الاجراء*/}
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-gray-300 hover:!bg-gray-400 !rounded-2xl !p-0"
                >
                  <CiMenuKebab className="text-[30px] text-[rgba(0,0,0,0.7)] cursor-pointer rotate-90" />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center gap-3 !pl-10 !py-3 !text-[16px]"
                  >
                    <FaRegEye className="text-[#10b981] text-[20px]" />
                    عرض
                  </MenuItem>

                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center gap-3 !pl-10 !py-3 !text-[16px]"
                  >
                    <AiOutlineEdit className="text-primary text-[20px] " />
                    تعديل
                  </MenuItem>

                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center gap-3 !pl-10 !py-3 !text-[16px]"
                  >
                    <AiFillFilePdf className="text-[#f22c61] text-[20px] " />
                    PDF
                  </MenuItem>

                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center gap-3 !pl-10 !py-3 !text-[16px]"
                  >
                    <FaPrint className="text-[#17a2b8] text-[20px] " />
                    طباعة
                  </MenuItem>

                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center gap-3 !pl-10 !py-3 !text-[16px]"
                  >
                    <HiOutlineTrash className="text-[#f22c61] text-[20px] " />
                    حذف
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>

          {/* بيانات الفاتورة */}
          <div className="w-full py-3 px-4 bg-white border border-[rgb(219,234,254)] shadow-sm hover:shadow-md flex  justify-between rounded-md">
            <Link to={"/app"}>
              <div className="col1">
                <div className="flex items-center gap-2">
                  <span className="text-primary border border-primary rounded-2xl py-1 px-2 text-[12px] font-semibold">
                    INV-2025109-001
                  </span>
                  <span className="text-[rgba(0,0,0,0.7)]">2 منتج</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[rgba(0,0,0,0.7)] flex items-center gap-1">
                    <CiCalendar className="text-[16px]" />
                    2024-10-07 03:45 م
                  </span>
                  <span className="text-[rgba(0,0,0,0.7)] flex items-center gap-1">
                    <FiUser className="text-[16px]" />
                    أحمد محمد
                  </span>
                </div>
              </div>
            </Link>

            <div className="col2 flex items-center gap-5">
              <div>
                <p className="text-[18px] font-bold text-[#1e40af] ">
                  1,200.00 ج.م
                </p>
                <p className="text-[red] text-[12px] font-medium">
                  مرتجع : 500.00 ج.م
                </p>
                <div className="flex flex-col items-end">
                  <span>
                    <Badge status="غير مدفوعة" />
                  </span>
                  <span>
                    <Badge status="مرتجع جزئي" />
                  </span>
                  <span>
                    <Badge status="تحت التسليم" />
                  </span>
                </div>
              </div>

              {/*الاجراء*/}
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-gray-300 hover:!bg-gray-400 !rounded-2xl !p-0"
                >
                  <CiMenuKebab className="text-[30px] text-[rgba(0,0,0,0.7)] cursor-pointer rotate-90" />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center gap-3 !pl-10 !py-3 !text-[16px]"
                  >
                    <FaRegEye className="text-[#10b981] text-[20px]" />
                    عرض
                  </MenuItem>

                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center gap-3 !pl-10 !py-3 !text-[16px]"
                  >
                    <AiOutlineEdit className="text-primary text-[20px] " />
                    تعديل
                  </MenuItem>

                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center gap-3 !pl-10 !py-3 !text-[16px]"
                  >
                    <AiFillFilePdf className="text-[#f22c61] text-[20px] " />
                    PDF
                  </MenuItem>

                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center gap-3 !pl-10 !py-3 !text-[16px]"
                  >
                    <FaPrint className="text-[#17a2b8] text-[20px] " />
                    طباعة
                  </MenuItem>

                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center gap-3 !pl-10 !py-3 !text-[16px]"
                  >
                    <HiOutlineTrash className="text-[#f22c61] text-[20px] " />
                    حذف
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>

          {/* بيانات الفاتورة */}
          <div className="w-full py-3 px-4 bg-white border border-[rgb(219,234,254)] shadow-sm hover:shadow-md flex  justify-between rounded-md">
            <Link to={"/app"}>
              <div className="col1">
                <div className="flex items-center gap-2">
                  <span className="text-primary border border-primary rounded-2xl py-1 px-2 text-[12px] font-semibold">
                    INV-2025109-001
                  </span>
                  <span className="text-[rgba(0,0,0,0.7)]">2 منتج</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[rgba(0,0,0,0.7)] flex items-center gap-1">
                    <CiCalendar className="text-[16px]" />
                    2024-10-07 03:45 م
                  </span>
                  <span className="text-[rgba(0,0,0,0.7)] flex items-center gap-1">
                    <FiUser className="text-[16px]" />
                    أحمد محمد
                  </span>
                </div>
              </div>
            </Link>

            <div className="col2 flex items-center gap-5">
              <div>
                <p className="text-[18px] font-bold text-[#1e40af] mr-2">
                  1,200.00 ج.م
                </p>
                <p className="flex justify-end">
                  <Badge status="غير مدفوعة" />
                </p>
              </div>

              {/*الاجراء*/}
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-gray-300 hover:!bg-gray-400 !rounded-2xl !p-0"
                >
                  <CiMenuKebab className="text-[30px] text-[rgba(0,0,0,0.7)] cursor-pointer rotate-90" />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center gap-3 !pl-10 !py-3 !text-[16px]"
                  >
                    <FaRegEye className="text-[#10b981] text-[20px]" />
                    عرض
                  </MenuItem>

                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center gap-3 !pl-10 !py-3 !text-[16px]"
                  >
                    <AiOutlineEdit className="text-primary text-[20px] " />
                    تعديل
                  </MenuItem>

                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center gap-3 !pl-10 !py-3 !text-[16px]"
                  >
                    <AiFillFilePdf className="text-[#f22c61] text-[20px] " />
                    PDF
                  </MenuItem>

                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center gap-3 !pl-10 !py-3 !text-[16px]"
                  >
                    <FaPrint className="text-[#17a2b8] text-[20px] " />
                    طباعة
                  </MenuItem>

                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center gap-3 !pl-10 !py-3 !text-[16px]"
                  >
                    <HiOutlineTrash className="text-[#f22c61] text-[20px] " />
                    حذف
                  </MenuItem>
                </Menu>
              </div>
            </div>
            {/* more invoices */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Invoices;
