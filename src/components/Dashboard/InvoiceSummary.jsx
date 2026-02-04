import React from "react";

function InvoiceSummary({ invoiceData }) {
  return (
    <>
      {/* بيانات الفاتوره  */}
      <div className="bg-[#eff6ff] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-4 py-4 rounded-md mb-4 text-center sm:text-right">
        <div>
          <span className="text-sm text-[rgba(0,0,0,0.7)] block">
            رقم الفاتورة
          </span>
          <p className="font-semibold">{invoiceData.invoiceNumber}</p>
        </div>

        <div>
          <span className="text-sm text-[rgba(0,0,0,0.7)] block">التاريخ</span>
          <p className="font-semibold">{invoiceData.date}</p>
        </div>

        <div>
          <span className="text-sm text-[rgba(0,0,0,0.7)] block">الوقت</span>
          <p className="font-semibold">14:30</p>
        </div>

        <div>
          <span className="text-sm text-[rgba(0,0,0,0.7)] block">
            طريقة الدفع
          </span>
          <p className="font-semibold">{invoiceData.paymentMethod}</p>
        </div>

        <div>
          <span className="text-sm text-[rgba(0,0,0,0.7)] block">البائع</span>
          <p className="font-semibold">
            {invoiceData.employee?.label || "البائع الرئيسي"}
          </p>
        </div>
        <div>
          <span className="text-sm text-[rgba(0,0,0,0.7)] block">العميل</span>
          <p className="font-semibold">
            {invoiceData.customer?.label || "الإفتراضي"}
          </p>
        </div>
      </div>

      {/* بيانات التقسيط  */}
      {invoiceData.paymentMethod === "آجل" && (
        <div className="bg-[#eff6ff] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-4 py-4 rounded-md mb-4 text-center sm:text-right">
          <div>
            <span className="text-sm text-[rgba(0,0,0,0.7)] block">
              المبلغ المقسط
            </span>
            <p className="font-semibold">
              {invoiceData.installmentDetails.remainingAmount} ج.م
            </p>
          </div>
          <div>
            <span className="text-sm text-[rgba(0,0,0,0.7)] block">
              مدة التقسيط
            </span>
            <p className="font-semibold">
              {invoiceData.installmentDetails.monthsCount} أشهر
            </p>
          </div>

          <div>
            <span className="text-sm text-[rgba(0,0,0,0.7)] block">
              قيمة القسط الشهري
            </span>
            <p className="font-semibold">
              {invoiceData.installmentDetails.installmentValue} ج.م
            </p>
          </div>

          <div>
            <span className="text-sm text-[rgba(0,0,0,0.7)] block">
              عدد الأقساط المدفوعة
            </span>
            <p className="font-semibold">
              {invoiceData.installmentDetails.installmentPayments.length}
            </p>
          </div>

          <div>
            <span className="text-sm text-[rgba(0,0,0,0.7)] block">
              المتبقي من الأقساط
            </span>
            <p className="font-semibold">
              {invoiceData.installmentDetails.remainingInstallments}
            </p>
          </div>
          <div>
            <span className="text-sm text-[rgba(0,0,0,0.7)] block">
              المبلغ المتبقي
            </span>
            <p className="font-semibold">
              {invoiceData.installmentDetails.totalRemainingForInstallments} ج.م
            </p>
          </div>
          <div>
            <span className="text-sm text-[rgba(0,0,0,0.7)] block">
              تاريخ دفع قسط
            </span>
            {invoiceData.installmentPayments?.length > 0 ? (
              <div className="space-y-1 mt-1">
                {invoiceData.installmentPayments.map((pay, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded-md text-sm"
                  >
                    <p>{pay.month}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-semibold text-gray-500">-</p>
            )}
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
                {invoiceData?.items &&
                  invoiceData.items.length > 0 &&
                  invoiceData.items.map((item, index) => (
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
                        {item.total} ج.م
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* إجماليات الفاتورة */}
            <div className="mt-4 border-t divide-y">
              <div className="flex flex-col sm:flex-row items-center justify-between bg-[#eff6ff] font-bold text-[18px] sm:text-[20px] px-2 sm:px-4 md:px-6 py-3">
                <span>المبلغ الإجمالي:</span>
                <span className="text-primary">{invoiceData.subtotal} ج.م</span>
              </div>
              {invoiceData.generalDiscountValue !== 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between font-bold text-[18px] sm:text-[20px] px-2 sm:px-4 md:px-6 py-3">
                  <span>الخصم :</span>
                  <span className="text-primary">
                    {invoiceData.generalDiscountValue} ج.م
                  </span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row items-center justify-between bg-[#eff6ff] font-bold text-[18px] sm:text-[20px] px-2 sm:px-4 md:px-6 py-3">
                <span>الصافي :</span>
                <span className="text-primary">{invoiceData.netTotal} ج.م</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between font-bold text-[18px] sm:text-[20px] px-2 sm:px-4 md:px-6 py-3">
                <span>المدفوع:</span>
                <span className="text-primary">{invoiceData.paidNow} ج.م</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between font-bold text-[18px] sm:text-[20px] px-2 sm:px-4 md:px-6 py-3">
                <span>المستحق:</span>
                <span className="text-primary">
                  {invoiceData.remaining} ج.م
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InvoiceSummary;
