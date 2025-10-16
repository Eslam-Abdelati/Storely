import React, { useMemo } from "react";
import Button from "@mui/material/Button";
import Badge from "../../components/Badge/Badge";
import { TbFileInvoice } from "react-icons/tb";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaPrint } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";

import PrintInvoice from "../../components/PrintInvoice/PrintInvoice";
import { Link } from "react-router-dom";

function SalesInvoiceDetails() {
  // بيانات الفاتورة (ممكن تكون من API لاحقاً)
  const invoiceData = {
    customer: { label: "أحمد محمد" },
    invoiceNumber: "INV-20241202-1234",
    date: "2024-12-02",
    salesman: { label: "البائع الرئيسي" },
    items: [
      { name: "موبايل سامسونج A52", qty: 1, price: 5000, discount: 0 },
      { name: "موبايل شاومي Note 12", qty: 2, price: 4500, discount: 0 },
    ],
    totals: {
      netTotal: 14000,
      paidNow: 5000,
      remaining: 9000,
      generalDiscountValue: 0,
      generalDiscountType: "value",
    },
    paymentMethod: "آجل",
  };

  // 🧮 حساب الإجمالي الكلي والمستحق
  const totals = useMemo(() => {
    // المجموع الكلي للأصناف
    const netTotal = invoiceData.items.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    // المبلغ المستحق بعد الدفع
    const remaining = netTotal - invoiceData.totals.paidNow;

    return {
      ...invoiceData.totals,
      netTotal,
      remaining,
    };
  }, [invoiceData]);

  // دالة الطباعة
  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      {/* رأس الصفحة */}
      <div className="card w-full my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="w-full flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div className="flex items-end gap-2">
            <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-[#1e40af] flex items-center gap-2">
              <TbFileInvoice className="text-[18px] sm:text-[20px] lg:text-[24px]" />
              الفاتورة {invoiceData.invoiceNumber}
            </h2>
            <div className="flex flex-wrap items-center gap-1">
              <Badge status="مدفوعة جزئياََ" />
              <Badge status="تحت التسليم" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/app/payments/add/${invoiceData.invoiceNumber}`}>
            <Button
              className="btn-green w-full sm:w-auto !text-white btn-sm !flex !items-center !justify-center !gap-2 
                           !text-sm md:!text-base xl:!text-lg !px-3 !py-2 transition-all duration-300"
            >
              <MdOutlinePayment className="text-[16px] sm:text-[18px] lg:text-[20px]" />
              اضافة عملية دفع
            </Button>
            </Link>
            
            <Button
              onClick={handlePrint}
              className="btn-blue w-full sm:w-auto !text-white btn-sm !flex !items-center !justify-center !gap-2 
                           !text-sm md:!text-base xl:!text-lg !px-3 !py-2 transition-all duration-300"
            >
              <FaPrint className="text-[16px] sm:text-[18px] lg:text-[20px]" />
              طباعة
            </Button>
          </div>
        </div>
      </div>

      {/* action */}
      <div className="action-btn flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-1 mt-3">
        <Button className="btn-border !rounded-md flex items-center justify-center gap-1 text-sm sm:text-base w-full sm:w-auto px-3 py-2">
          <MdOutlineEdit className="text-[18px] sm:text-[20px]" />
          تعديل
        </Button>

        <Button
          onClick={handlePrint}
          className="btn-border !rounded-md flex items-center justify-center gap-1 text-sm sm:text-base w-full sm:w-auto px-3 py-2"
        >
          <FaPrint className="text-[18px] sm:text-[20px]" />
          طباعة
        </Button>
        <Button className="btn-border !rounded-md flex items-center justify-center gap-1 text-sm sm:text-base w-full sm:w-auto px-3 py-2">
          <FaRegFilePdf className="text-[18px] sm:text-[20px]" />
          PDF
        </Button>
        <Link to={`/app/payments/add/${invoiceData.invoiceNumber}`}>
        <Button className="btn-border !rounded-md flex items-center justify-center gap-1 text-sm sm:text-base w-full sm:w-auto px-3 py-2">
          <MdOutlinePayment className="text-[18px] sm:text-[20px]" />
          إضافة عملية دفع
        </Button>
        </Link>
        <Button className="btn-border !rounded-md flex items-center justify-center gap-1 text-sm sm:text-base w-full sm:w-auto px-3 py-2">
          <RiArrowGoBackFill className="text-[18px] sm:text-[20px]" />
          مرتجع
        </Button>
      </div>

      {/* تفاصيل الفاتورة */}
      <div className="card w-full shadow-sm rounded-md bg-white border border-[rgb(219,234,254)] px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        {/* بيانات الفاتوره  */}
        <div className="bg-[#eff6ff] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-4 py-4 rounded-md mb-4 text-center sm:text-right">
          <div>
            <span className="text-sm text-[rgba(0,0,0,0.7)] block">
              رقم الفاتورة
            </span>
            <p className="font-semibold">INV-20241202-1234</p>
          </div>

          <div>
            <span className="text-sm text-[rgba(0,0,0,0.7)] block">
              التاريخ
            </span>
            <p className="font-semibold">2024-12-02</p>
          </div>

          <div>
            <span className="text-sm text-[rgba(0,0,0,0.7)] block">الوقت</span>
            <p className="font-semibold">14:30</p>
          </div>

          <div>
            <span className="text-sm text-[rgba(0,0,0,0.7)] block">
              طريقة الدفع
            </span>
            <p className="font-semibold">آجل</p>
          </div>

          <div>
            <span className="text-sm text-[rgba(0,0,0,0.7)] block">البائع</span>
            <p className="font-semibold">البائع الرئيسي</p>
          </div>
          <div>
            <span className="text-sm text-[rgba(0,0,0,0.7)] block">العميل</span>
            <p className="font-semibold">سليم إسلام عمار</p>
          </div>
        </div>

        {/* بيانات التقسيط  */}
        {invoiceData.paymentMethod === "آجل" && (
          <div className="bg-[#eff6ff] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-4 py-4 rounded-md mb-4 text-center sm:text-right">
            <div>
              <span className="text-sm text-[rgba(0,0,0,0.7)] block">
                المبلغ المقسط
              </span>
              <p className="font-semibold">9000 ج.م</p>
            </div>
            <div>
              <span className="text-sm text-[rgba(0,0,0,0.7)] block">
                مدة التقسيط
              </span>
              <p className="font-semibold">6 أشهر</p>
            </div>

            <div>
              <span className="text-sm text-[rgba(0,0,0,0.7)] block">
                قيمة القسط الشهري
              </span>
              <p className="font-semibold">1500.00 ج.م</p>
            </div>

            <div>
              <span className="text-sm text-[rgba(0,0,0,0.7)] block">
                عدد الأقساط المدفوعة
              </span>
              <p className="font-semibold">1</p>
            </div>

            <div>
              <span className="text-sm text-[rgba(0,0,0,0.7)] block">
                المتبقي من الأقساط
              </span>
              <p className="font-semibold">5</p>
            </div>
            <div>
              <span className="text-sm text-[rgba(0,0,0,0.7)] block">
                المبلغ المتبقي
              </span>
              <p className="font-semibold">7500 ج.م</p>
            </div>
            <div>
              <span className="text-sm text-[rgba(0,0,0,0.7)] block">
                تاريخ دفع قسط
              </span>
              <p className="font-semibold">2024-12-02</p>
            </div>
          </div>
        )}

        <h3 className="text-lg font-semibold mb-4 text-[#1e40af]">التفاصيل</h3>

        {/* جدول عرض المنتجات */}
        <div className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
          <div className="w-full px-2 sm:px-3 md:px-4">
            <div className="relative overflow-x-auto mt-4">
              <table className="min-w-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-gray-600">
                <thead className="text-[11px] sm:text-[12px] md:text-[13px] uppercase  text-gray-700">
                  <tr>
                    <th className="px-2 sm:px-4 md:px-6 py-3 whitespace-nowrap text-right">
                      الصنف
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-3 whitespace-nowrap text-right">
                      السعر
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-3 whitespace-nowrap text-right">
                      الكمية
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-3 whitespace-nowrap text-right">
                      الإجمالي
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-50 border-t hover:bg-gray-100 transition-colors"
                    >
                      <td className="px-2 sm:px-4 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-4 text-gray-900 whitespace-nowrap">
                        {item.price} ج.م
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-4 text-gray-900 whitespace-nowrap">
                        {item.qty}
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {item.price * item.qty} ج.م
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* إجماليات الفاتورة */}
              <div className="mt-4 border-t divide-y">
                <div className="flex flex-col sm:flex-row items-center justify-between bg-[#eff6ff] font-bold text-[18px] sm:text-[20px] px-2 sm:px-4 md:px-6 py-3">
                  <span>المبلغ الإجمالي:</span>
                  <span className="text-primary">{totals.netTotal} ج.م</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between font-bold text-[18px] sm:text-[20px] px-2 sm:px-4 md:px-6 py-3">
                  <span>المدفوع:</span>
                  <span className="text-primary">{totals.paidNow} ج.م</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between font-bold text-[18px] sm:text-[20px] px-2 sm:px-4 md:px-6 py-3">
                  <span>المستحق:</span>
                  <span className="text-primary">{totals.remaining} ج.م</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🧾 مكون الطباعة */}
      <PrintInvoice invoiceData={{ ...invoiceData, totals }} />
    </>
  );
}

export default SalesInvoiceDetails;
