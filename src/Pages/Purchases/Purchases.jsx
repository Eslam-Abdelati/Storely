import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
// import Badge from "../../components/Badge/Badge";
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
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillFilePdf } from "react-icons/ai";
import { FaPrint } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { RiArrowGoBackFill } from "react-icons/ri";

// ✅ قائمة حالات الدفع
const paymentStatusList = [
  { value: "all", label: "الكل" },
  { value: "paid", label: "مدفوع" },
  { value: "unpaid", label: "غير مدفوع" },
  { value: "partial", label: "مدفوع جزئياً" },
  { value: "returned", label: "مرتجع" },
  { value: "partial_returned", label: "مرتجع جزئي" },
];

function Purchases() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  // ✅ حالة النموذج
  const [formData, setFormData] = useState({
    supplier: "",
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

  // ✅ قراءة الفواتير من localStorage عند التحميل
  useEffect(() => {
    const storedInvoices =
      JSON.parse(localStorage.getItem("salesInvoices")) || [];
    setInvoices(storedInvoices);
  }, []);

  const handleInvoiceClick = (id) => {
    navigate(`/app/sales_invoice/${id}`);
  };

  return (
    <>
      {/* عنوان الصفحة وازرار */}
      <div className="card shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        {/* رأس الصفحة */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* العنوان والمعلومات */}
          <div className="w-full sm:w-auto sm:text-start">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-[24px] font-semibold text-[#1e40af] flex items-center  sm:justify-start gap-2">
              <TbFileInvoice className="text-[20px] sm:text-[22px] lg:text-[26px]" />
              فواتير الشراء
            </h2>
            <span className="block text-[rgba(0,0,0,.7)] text-sm sm:text-base mt-1">
              إجمالي الفواتير:
              <span className="font-medium">{invoices.length} فاتورة</span>
            </span>
          </div>

          {/* الأزرار */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
            {/* زر فاتورة جديدة */}
            <Link
              to={"/app/sales_invoice/add-salesinvoice"}
              className="w-full sm:w-auto"
            >
              <Button
                className="btn-green w-full sm:w-auto !text-white btn-sm !flex !items-center !justify-center !gap-2 
                           !text-sm md:!text-base xl:!text-lg !px-3 !py-2 transition-all duration-300"
              >
                <FiPlus className="text-[16px] sm:text-[18px] lg:text-[20px]" />
                فاتورة شراء جديدة
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* الفلاتر */}
      <div className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <div className="flex items-center p-2 text-[rgb(30,64,175)] gap-1 border-b border-[rgba(0,0,0,0.1)]">
          <IoSearch />
          <h4 className="text-[16px] font-[600] mb-1 sm:mb-0">بحث</h4>
        </div>

        {/* النموذج */}
        <div className="px-5 py-4">
          <form className="w-full" onSubmit={handleSubmit}>
            {/* صف الحقول */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {/* حقل العميل */}
              <div className="form-group flex flex-col gap-1.5">
                <label
                  htmlFor="supplier"
                  className="text-sm font-semibold text-gray-700"
                >
                  المورد
                </label>
                <TextField
                  type="text"
                  id="supplier"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  className="bg-white w-full"
                />
              </div>

              {/* رقم الفاتورة */}
              <div className="form-group flex flex-col gap-1.5">
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
                  className="bg-white w-full"
                />
              </div>

              {/* حالة الدفع */}
              <div className="form-group flex flex-col gap-1.5">
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
                  className="bg-white w-full"
                />
              </div>
            </div>

            {/* زر البحث */}
            <div className="mt-4 flex justify-center sm:justify-start">
              <Button
                type="submit"
                className="btn-blue w-full sm:w-auto !text-white !flex !items-center !gap-1 sm:!gap-2 !text-xs sm:!text-sm md:!text-base xl:!text-lg !px-2 sm:!px-3 !py-1 sm:!py-2"
              >
                بحث
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* قائمة الفواتير */}
      <div className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <div className="flex items-center p-2 text-[rgb(30,64,175)] gap-1 border-b border-[rgba(0,0,0,0.1)]">
          <TbFileInvoice />
          <h4 className="text-[16px] font-[600] mb-1 sm:mb-0">
            قائمة الفواتير ({invoices.length})
          </h4>
        </div>

        {/* بطاقة الفاتورة */}
        <div className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4">
          {invoices.map((invoice, index) => (
            <div
              key={index}
              onClick={() => handleInvoiceClick(invoice.id)}
              className="w-full mb-2 py-3 px-3 sm:px-4 bg-white border border-[rgb(219,234,254)] shadow-sm hover:shadow-md 
                    flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-2 rounded-md transition-all duration-300 cursor-pointer"
            >
              {/* بيانات العميل والفاتورة */}

              <div className="col1 flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-primary border border-primary rounded-2xl py-1 px-2 text-[12px] sm:text-[13px] font-semibold">
                    {invoice.invoiceNumber}
                  </span>
                  <span className="text-[rgba(0,0,0,0.7)] text-[13px] sm:text-[14px]">
                    {invoice.items.length} منتج
                  </span>
                </div>

                {/* المورد */}
                <div className="flex flex-wrap items-center gap-2 text-[12px] sm:text-[14px]">
                  <span className="text-[rgba(0,0,0,0.7)] flex items-center gap-1">
                    <CiCalendar className="text-[16px]" />
                    {invoice.releaseDate} 03:45 م
                  </span>
                  <span className="text-[rgba(0,0,0,0.7)] flex items-center gap-1">
                    المورد:
                    <Link
                      to={`/app/supplier/${invoice.supplierId}`}
                      onClick={(e) => e.stopPropagation()} // لمنع فتح صفحة الفاتورة عند الضغط على المورد
                      className="hover:!text-primary hover:underline"
                    >
                      {invoice.supplierName || "كوجي"}
                    </Link>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[12px] sm:text-[14px]">
                  <span className="text-[rgba(0,0,0,0.7)] flex items-center gap-1">
                    <FiUser className="text-[16px]" />
                    بواسطة : {invoice.employee?.label || "البائع الرئيسي"}
                  </span>
                </div>
              </div>

              {/* السعر والحالة + الإجراءات */}
              <div className="col2 flex flex-col sm:flex-row sm:items-center justify-between sm:justify-end gap-3 sm:gap-5 w-full sm:w-auto">
                {/* السعر + الحالة */}
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <p className="text-[16px] sm:text-[18px] font-bold text-[#1e40af]">
                    {invoice.netTotal?.toLocaleString()} ج.م
                  </p>
                  {/* عرض المرتجع إذا موجود */}
                  {invoice.returned > 0 && (
                    <p className="text-[12px] sm:text-[13px] text-red-500 font-medium">
                      مرتجع: {invoice.returned.toLocaleString()} ج.م
                    </p>
                  )}
                  <div className="flex flex-wrap items-center justify-start sm:justify-end gap-1">
                    {/* <Badge status={invoice.paymentStatus} /> */}
                    {/* {invoice.returned !== "none" && (
                      <Badge status="مرتجع جزئي" />
                    )} */}
                  </div>
                </div>

                {/* زر الإجراءات */}
                <div className="flex justify-end">
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(e) => {
                      e.stopPropagation(); // يمنع فتح صفحة الفاتورة لما نضغط على الزر
                      handleClick(e);
                    }}
                    className="!w-[40px] !min-w-[40px] !h-[40px] !rounded-full !p-1 sm:!p-2 transition-all duration-300"
                  >
                    <CiMenuKebab className="text-[24px] sm:text-[28px] text-[rgba(0,0,0,0.7)] cursor-pointer" />
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
                    {[
                      {
                        icon: <FaRegEye className="text-[#10b981]" />,
                        text: "عرض",
                      },
                      {
                        icon: <AiOutlineEdit className="text-primary" />,
                        text: "تعديل",
                      },
                      {
                        icon: <AiFillFilePdf className="text-[#f22c61]" />,
                        text: "PDF",
                      },
                      {
                        icon: <FaPrint className="text-[#17a2b8]" />,
                        text: "طباعة",
                      },
                      {
                        icon: <RiArrowGoBackFill className="text-[#7d17b8]" />,
                        text: "مرتجع",
                      },
                      {
                        icon: <HiOutlineTrash className="text-[#f22c61]" />,
                        text: "حذف",
                      },
                    ].map((item, index) => (
                      <MenuItem
                        key={index}
                        onClick={handleClose}
                        className="flex items-center gap-3 !pl-10 !py-2 sm:!py-3 !text-[14px] sm:!text-[16px]"
                      >
                        {item.icon}
                        {item.text}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Purchases;
