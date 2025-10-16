import React from "react";
// import "./invoice-print.css";
function PrintInvoice({ invoiceData }) {
  if (!invoiceData) return null;

  const {
    customer,
    invoiceNumber,
    date,
    salesman,
    items,
    totals,
    paymentMethod,
  } = invoiceData;

  return (
    <div id="print-area" className="hidden print:block bg-white">
      <div className="text-black text-[13px] p-3 font-sans print:block">
        {/* ===== رأس الفاتورة ===== */}
        <div className="text-center border-b border-dashed border-gray-400 pb-2 mb-2">
          <h2 className="text-lg font-bold">فاتورة مبيعات</h2>
          <p>اسم المتجر</p>
          <p>بلاط - الوادي الجديد</p>
          <p>01000000000</p>
        </div>

        {/* ===== بيانات العميل ===== */}
        <div className="mt-2 text-[14px]">
          <p>
            <strong>العميل:</strong> {customer?.label || "-"}
          </p>
        </div>

        {/* ===== معلومات الفاتورة ===== */}
        <div className="mb-3 leading-tight">
          <p>
            <strong>رقم الفاتورة:</strong> {invoiceNumber}
          </p>
          <p>
            <strong>التاريخ:</strong> {date}
          </p>
          <p>
            <strong> موظف:</strong> {salesman?.label || "-"}
          </p>
        </div>

        {/* ===== جدول المنتجات ===== */}
        <table className="w-full bg-white text-sm text-right">
          <thead className="bg-[#e5e5e5]">
            <tr>
              <th className="py-2 px-2 w-[40%] text-right">الصنف</th>
              <th className="py-2 px-1 w-[10%] text-center">كمية</th>
              <th className="py-2 px-1 w-[25%] text-center">سعر</th>
              {items.some((i) => i.discount > 0) && (
                <th className="py-2 px-1 text-center">خصم</th>
              )}
              <th className="py-2 px-1 w-[15%] text-center">الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              const itemDiscount =
                item.discountType === "percent"
                  ? (item.price * item.qty * (item.discount || 0)) / 100
                  : item.discount || 0;
              const total = item.qty * item.price - itemDiscount;

              return (
                <tr key={i} className="text-[14px]">
                  <td className="py-2 px-2 text-right">{item.name}</td>
                  <td className="text-center">{item.qty}</td>
                  <td className="text-center ">{item.price.toFixed(2)}</td>
                  {items.some((i) => i.discount > 0) && (
                    <td className="text-center ">
                      {itemDiscount > 0 ? itemDiscount.toFixed(2) : ""}
                    </td>
                  )}
                  <td className="text-center">{total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* ===== الإجماليات ===== */}
        <div className="text-[13px]">
          {totals.generalDiscountValue > 0 && (
            <div className="border-b border-gray-950 py-1 px-2 flex justify-between">
              <span className="font-semibold text-[14px]">خصم عام</span>
              <span className="pl-5">
                {totals.generalDiscountValue.toFixed(2)} ج.م{" "}
                {totals.generalDiscountType === "percent" ? "(%)" : ""}
              </span>
            </div>
          )}

          <div className="bg-[#e5e5e5] border-b border-gray-950 py-1 flex justify-between font-semibold text-[14px] px-2">
            <span>الإجمالي</span>
            <span className="pl-5">{totals.netTotal.toFixed(2)} ج.م</span>
          </div>

          <div className="border-b border-gray-950 py-1 flex justify-between px-2">
            <span className="font-semibold text-[14px]">المدفوع</span>
            <span className="pl-5">{totals.paidNow.toFixed(2)} ج.م</span>
          </div>

          {paymentMethod === "آجل" && (
            <>
              <div className="flex justify-between border-b border-gray-950 py-1 px-2">
                <span className="font-semibold text-[14px]">المستحق</span>
                <span className="pl-5">{totals.remaining.toFixed(2)} ج.م</span>
              </div>
            </>
          )}
        </div>

        {/* ===== ختام الفاتورة ===== */}
        <div className="text-center mt-3 pt-2 text-[13px]">
          <p>شكرًا لتعاملكم معنا ❤️</p>
          <p>زورونا مرة أخرى</p>
        </div>
      </div>
    </div>
  );
}

export default PrintInvoice;
