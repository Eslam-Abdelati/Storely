// AddPaymentPage.jsx
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { MdOutlinePayment } from "react-icons/md";

function AddPaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
    date: new Date().toISOString().split("T")[0],
    method: "",
    employee: "",
    notes: "",
    paymentDetails: "",
  });

  useEffect(() => {
    const invoices = JSON.parse(localStorage.getItem("salesInvoices")) || [];
    const foundInvoice = invoices.find((inv) => inv.id.toString() === id);
    if (foundInvoice) {
      setInvoiceData(foundInvoice);
      // ✅ حدّث المبلغ هنا من الفاتورة
      setFormData((prev) => ({
        ...prev,
        amount:
          foundInvoice?.installmentDetails?.installmentValue ||
          foundInvoice?.total ||
          "",
      }));
    } else {
      toast.error("لم يتم العثور على الفاتورة المحددة");
    }
  }, [id]);

  // تحديث القيم عند الكتابة
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // عند الضغط على زر الحفظ
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.method) {
      toast.error("الرجاء إدخال طريقة الدفع");
      return;
    }
    console.log(formData);
  };

  // ✅ التحقق مما إذا كانت هناك عملية دفع متاحة
  const canPay =
    invoiceData &&
    (invoiceData.installmentDetails?.installmentValue > 0 ||
      invoiceData.remainingAmount > 0 ||
      (invoiceData.total && invoiceData.paidAmount < invoiceData.total));

  return (
    <>
      <div className="card w-full shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="w-full flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div className="flex items-end gap-2">
            <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-[#1e40af] flex items-center gap-2">
              الفاتورة {invoiceData?.invoiceNumber}
            </h2>
          </div>
          {canPay && (
            <div className="flex items-center gap-2">
              <Button
                onClick={handleSubmit}
                className="btn-green w-full sm:w-auto !text-white btn-sm !flex !items-center !justify-center !gap-2 
                                   !text-sm md:!text-base xl:!text-lg !px-3 !py-2 transition-all duration-300"
              >
                <MdOutlinePayment className="text-[16px] sm:text-[18px] lg:text-[20px]" />
                اضافة عملية دفع
              </Button>

              <Button
                onClick={() => navigate(-1)}
                className="btn-blue w-full sm:w-auto !text-white btn-sm !flex !items-center !justify-center !gap-2 
                                   !text-sm md:!text-base xl:!text-lg !px-3 !py-2 transition-all duration-300"
              >
                الغاء
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* نموذج الدفع */}
      {canPay ? (
        <div className="card my-4 w-full shadow-sm rounded-md bg-white border border-[rgb(219,234,254)] px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="px-5 py-4">
            <form className="w-full space-y-4">
              {/* صف الحقول */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* المبلغ */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="amount"
                    className="text-sm font-semibold text-gray-700"
                  >
                    المبلغ
                  </label>
                  <TextField
                    type="number"
                    id="amount"
                    name="amount"
                    variant="outlined"
                    value={formData.amount}
                    onChange={handleChange}
                    size="small"
                    autoComplete="off"
                    className="bg-white w-full"
                  />
                </div>

                {/* التاريخ */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="date"
                    className="text-sm font-semibold text-gray-700"
                  >
                    التاريخ
                  </label>
                  <TextField
                    type="date"
                    id="date"
                    name="date"
                    variant="outlined"
                    value={formData.date}
                    onChange={handleChange}
                    size="small"
                    autoComplete="off"
                    className="bg-white w-full"
                  />
                </div>
              </div>

              {/* صف آخر (طريقة الدفع + التحصيل بواسطة) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* طريقة الدفع */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="method"
                    className="text-sm font-semibold text-gray-700"
                  >
                    وسيلة الدفع
                  </label>
                  <TextField
                    select
                    id="method"
                    name="method"
                    variant="outlined"
                    value={formData.method}
                    onChange={handleChange}
                    size="small"
                    className="bg-white w-full"
                    SelectProps={{ native: true }}
                  >
                    <option value="">اختر طريقة الدفع</option>
                    <option value="cash">نقدًا</option>
                    <option value="card">بطاقة</option>
                  </TextField>
                </div>

                {/* تم التحصيل بواسطة */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="employee"
                    className="text-sm font-semibold text-gray-700"
                  >
                    تم التحصيل بواسطة
                  </label>
                  <TextField
                    select
                    id="employee"
                    name="employee"
                    variant="outlined"
                    size="small"
                    value={formData.employee}
                    onChange={handleChange}
                    className="bg-white w-full"
                    SelectProps={{ native: true }}
                  >
                    <option value="">اختر موظف</option>
                    <option value="owner">المالك</option>
                    <option value="eslam">إسلام عمار</option>
                  </TextField>
                </div>
              </div>

              {/* صف الملاحظات وبيانات الدفع */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* الملاحظات */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="notes"
                    className="text-sm font-semibold text-gray-700"
                  >
                    ملاحظات إيصال الاستلام
                  </label>
                  <TextField
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    variant="outlined"
                    className="bg-white w-full"
                  />
                </div>

                {/* بيانات الدفع */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="paymentDetails"
                    className="text-sm font-semibold text-gray-700"
                  >
                    بيانات الدفع
                  </label>
                  <TextField
                    id="paymentDetails"
                    name="paymentDetails"
                    value={formData.paymentDetails}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    variant="outlined"
                    className="bg-white w-full"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        // ❌ لا يوجد مبلغ متبقي أو قسط
        <div className="text-center py-10 text-gray-600 text-lg font-medium">
          لا يوجد عملية دفع لهذه الفاتورة ✅
        </div>
      )}
    </>
  );
}

export default AddPaymentPage;
