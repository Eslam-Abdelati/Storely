import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Badge from "../../components/Badge/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MdOutlinePayment } from "react-icons/md";

import TextField from "@mui/material/TextField";
import Select from "react-select";

import { TbFileInvoice } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";
import { IoMdCloudUpload } from "react-icons/io";
import { FaChartPie } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillFilePdf } from "react-icons/ai";
import { FaPrint } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { RiArrowGoBackFill } from "react-icons/ri";

function InvoicePayments({ invoiceData }) {
  // ✅ القائمة المنسدلة (Menu)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  return (
    <>
      <div className="w-full ">
        <div className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] px-2">
          <div className="flex items-center p-2 text-[rgb(30,64,175)] gap-1 border-b border-[rgba(0,0,0,0.1)] mb-4">
            <h4 className="text-[16px] font-[600] mb-1 sm:mb-0">
              {" "}
              عمليات الدفع على الفاتورة {invoiceData.invoiceNumber}
            </h4>
          </div>

          <div
            className="w-full mb-2 py-3 px-3 sm:px-4 bg-white border border-[rgb(219,234,254)] shadow-sm hover:shadow-md 
                          flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-5 rounded-md transition-all duration-300"
          >
            {/* بيانات العميل والفاتورة */}
            <Link
              to={`/app/sales_invoice/${invoiceData.id}`}
              className="w-full sm:w-auto flex-1"
            >
              <div className="col1 flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-primary border border-primary rounded-2xl py-1 px-2 text-[12px] sm:text-[13px] font-semibold">
                    {invoiceData.invoiceNumber}
                  </span>
                  <span className="text-[rgba(0,0,0,0.7)] text-[13px] sm:text-[14px]">
                    {invoiceData.items.length} منتج
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[12px] sm:text-[14px]">
                  <span className="text-[rgba(0,0,0,0.7)] flex items-center gap-1">
                    <FiUser className="text-[16px]" />
                    {invoiceData.employee?.label || "البائع الرئيسي"}
                  </span>
                  <span className="text-[rgba(0,0,0,0.7)] flex items-center gap-1">
                    <CiCalendar className="text-[16px]" />
                    {invoiceData.releaseDate} 03:45 م
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[12px] sm:text-[14px]">
                  <span className="text-[rgba(0,0,0,0.7)] flex items-center gap-1">
                    <FiUser className="text-[16px]" />
                    {invoiceData.customer?.label || "عميل"}
                  </span>
                  <span className="text-[rgba(0,0,0,0.7)] flex items-center gap-1">
                    <MdOutlinePayment className="text-[16px]" />
                    نقدي
                  </span>
                </div>
              </div>
            </Link>

            {/* الإجراءات */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start">
              {/* زر عرض */}
              <Button
                className="!px-1 !py-1 !text-[12px] flex items-center gap-1 transition-all duration-300"
                // onClick={() => handleView(invoice.id)}
              >
                <FaRegEye className="text-[12px]" />
                عرض
              </Button>

              {/* زر طباعة */}
              <Button
                className="!px-1 !py-1 !text-[12px] flex items-center gap-1 transition-all duration-300"
                // onClick={() => handlePrint(invoice.id)}
              >
                <FaPrint className="text-[12px]" />
                طباعة
              </Button>

              {/* زر تعديل */}
              <Button
                className="!px-1 !py-1 !text-[12px] flex items-center gap-1 transition-all duration-300"
                // onClick={() => handleEdit(invoice.id)}
              >
                <AiOutlineEdit className="text-[12px]" />
                تعديل
              </Button>

              {/* زر حذف */}
              <Button
                className="!px-1 !py-1 !text-[12px] flex items-center gap-1 transition-all duration-300"
                // onClick={() => handleDelete(invoice.id)}
              >
                <HiOutlineTrash className="text-[12px]" />
                حذف
              </Button>
            </div>

            {/* السعر والحالة + الإجراءات */}
            <div className="col2 flex flex-col sm:flex-row sm:items-center justify-between sm:justify-end gap-3 sm:gap-5 w-full sm:w-auto">
              {/* السعر + الحالة */}
              <div className="flex flex-col items-start sm:items-end gap-1">
                <p className="text-[16px] sm:text-[18px] font-bold text-[#1e40af]">
                  {invoiceData.installmentDetails?.installmentValue.toLocaleString()}{" "}
                  ج.م
                </p>
              </div>

              {/* زر الإجراءات */}
              <div className="flex justify-end">
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
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
                      icon: <FaPrint className="text-[#17a2b8]" />,
                      text: "طباعة",
                    },

                    {
                      icon: <HiOutlineTrash className="text-[#f22c61]" />,
                      text: "حذف",
                    },
                  ].map((item, index) => (
                    <MenuItem
                      key={index}
                      // onClick={handleClose}
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
        </div>

        <div className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
          <div className="flex items-center p-2 text-[rgb(30,64,175)] gap-1 border-b border-[rgba(0,0,0,0.1)] ">
            <h4 className="text-[16px] font-[600] mb-1 sm:mb-0">ملخص الدفع</h4>
          </div>
          <div className="w-full px-2 sm:px-3 md:px-4">
            <div className="relative overflow-x-auto mt-4 mb-4">
              <table className="w-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-left rtl:text-right text-gray-600 border">
                <thead className="text-[11px] sm:text-[12px] md:text-[13px] uppercase bg-[#eef2f7] border-b border-[#c7c7c7] text-gray-700">
                  <tr>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      رقم الفاتورة
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      العملة
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      إجمالي الفاتورة
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      مرتجع
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      المدفوع
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      الباقي
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 transition-colors">
                    <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      {invoiceData.invoiceNumber}
                    </td>
                    <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      EGP
                    </td>
                    <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      10000
                    </td>
                    <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      0.00
                    </td>
                    <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      6000
                    </td>
                    <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      4000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InvoicePayments;
