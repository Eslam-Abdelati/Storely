import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
// import Badge from "../../components/Badge/Badge";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { TbFileInvoice } from "react-icons/tb";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaPrint } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";
import PrintInvoice from "../../components/PrintInvoice/PrintInvoice";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import InvoiceSummary from "../../components/InvoiceSummary/InvoiceSummary";
import InvoicePayments from "../../components/InvoicePayments/InvoicePayments";

function SalesInvoiceDetails() {
  const { id } = useParams(); // بدل invoiceNumber
  const [value, setValue] = useState("1");

  const [invoiceData, setInvoiceData] = useState({});
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const invoices = JSON.parse(localStorage.getItem("salesInvoices")) || [];
    const invoice = invoices.find((inv) => inv.id.toString() === id);

    if (invoice) {
      setInvoiceData(invoice); // ✅ تعيين البيانات داخل الستيت
    } else {
      toast.error("لا توجد بيانات لهذه الفاتورة");
    }
  }, [id]);

  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  return (
    <>
      {/* رأس الصفحة */}
      <div className="card w-full shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row lg:flex-row lg:items-center sm:justify-between lg:justify-between gap-3 w-full">
          {/* 🧾 عنوان الفاتورة + الحالة */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-[#1e40af] flex items-center gap-2">
                <TbFileInvoice className="text-[18px] sm:text-[20px] lg:text-[24px]" />
                الفاتورة {invoiceData?.invoiceNumber}
              </h2>

              {/* الشارات */}
              <div className="flex flex-wrap items-center gap-1">
                <StatusBadge status={invoiceData?.paymentStatus} />
                {invoiceData?.returned !== "none" && (
                  <StatusBadge status="مرتجع" />
                )}
              </div>
            </div>
          </div>

          {/* 🎛️ أزرار التحكم */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center sm:justify-end gap-2 sm:gap-3 lg:w-auto">
            <Link
              to={`/app/sales_invoice/${id}/payments/add`}
              className="w-full sm:w-auto"
            >
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
        <Link to={`/app/sales_invoice/${id}/payments/add`}>
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
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            {/* التابات */}
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                overflowX: "auto", // ✅ يسمح بالتمرير الأفقي على الموبايل
              }}
            >
              <TabList
                onChange={handleTabChange}
                aria-label="tabs"
                variant="scrollable" // ✅ يجعل التابات قابلة للتمرير على الشاشات الصغيرة
                scrollButtons="auto" // ✅ يظهر أزرار التمرير فقط عند الحاجة
              >
                <Tab
                  label="فاتورة"
                  value="1"
                  sx={{
                    fontSize: { xs: "12px", sm: "14px", md: "15px" },
                    minWidth: { xs: 100, sm: 120 },
                  }}
                />
                <Tab
                  label="المدفوعات"
                  value="2"
                  sx={{
                    fontSize: { xs: "12px", sm: "14px", md: "15px" },
                    minWidth: { xs: 100, sm: 120 },
                  }}
                />
              </TabList>
            </Box>

            {/* المحتوى */}
            <TabPanel value="1" sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
              <InvoiceSummary invoiceData={invoiceData} />
            </TabPanel>
            <TabPanel value="2" sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
              <InvoicePayments invoiceData={invoiceData} />
            </TabPanel>
          </TabContext>
        </Box>
      </div>

      {/* 🧾 مكون الطباعة */}
      <PrintInvoice invoiceData={invoiceData} />
    </>
  );
}

export default SalesInvoiceDetails;
