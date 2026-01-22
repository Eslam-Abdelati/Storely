import React from "react";

function FinancialSpreadsheet() {
  return (
    <div className="bg-card-bg rounded-xl shadow-soft border border-border-color overflow-hidden">
      <div className="p-6 border-b border-border-color flex items-center justify-between">
        <h3 className="text-lg font-bold text-text-main">
          آخر الحركات المالية
        </h3>
        <button className="px-4 py-2 text-[#1d6f42] border rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors text-text-main">
          تصدير Excel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead className="bg-slate-50 text-text-muted text-sm">
            <tr>
              <th className="px-6 py-4 font-medium">رقم العملية</th>
              <th className="px-6 py-4 font-medium">العميل</th>
              <th className="px-6 py-4 font-medium">التاريخ</th>
              <th className="px-6 py-4 font-medium">المبلغ</th>
              <th className="px-6 py-4 font-medium">الحالة</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-primary">
                #INV-2024-001
              </td>
              <td className="px-6 py-4 text-text-main">شركة الأمل التجارية</td>
              <td className="px-6 py-4 text-text-muted">15/1/2024</td>
              <td className="px-6 py-4 font-bold text-text-main">
                1,250.00 ج.م
              </td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                  مكتملة
                </span>
              </td>
            </tr>

            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-primary">
                #INV-2024-002
              </td>
              <td className="px-6 py-4 text-text-main">مؤسسة النجاح</td>
              <td className="px-6 py-4 text-text-muted">14/1/2024</td>
              <td className="px-6 py-4 font-bold text-text-main">
                4,800.00 ج.م
              </td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                  قيد الانتظار
                </span>
              </td>
            </tr>

            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-primary">
                #INV-2024-003
              </td>
              <td className="px-6 py-4 text-text-main">مركز التقنية الحديثة</td>
              <td className="px-6 py-4 text-text-muted">14/1/2024</td>
              <td className="px-6 py-4 font-bold text-text-main">950.00 ج.م</td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                  ملغية
                </span>
              </td>
            </tr>

            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-primary">
                #INV-2024-004
              </td>
              <td className="px-6 py-4 text-text-main">سليمان العلي</td>
              <td className="px-6 py-4 text-text-muted">13/1/2024</td>
              <td className="px-6 py-4 font-bold text-text-main">
                2,100.00 ج.م
              </td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                  مكتملة
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-border-color flex justify-center">
        <button className="text-primary font-medium text-sm hover:underline">
          عرض جميع المعاملات
        </button>
      </div>
    </div>
  );
}

export default FinancialSpreadsheet;
