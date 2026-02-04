import React from "react";

export default function Reborts() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-right">
      {/* Header */}

      {/* Main */}
      <main className="max-w-[1400px] mx-auto p-6 md:p-10">
        {/* Breadcrumb */}

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-col">
            <h1 className="text-[#121417] dark:text-white text-3xl font-extrabold tracking-tight">
              إنشاء فاتورة
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              إنشاء مستند مبيعات جديد وإدارة شروط الدفع
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-5 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 font-bold text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-all">
              حفظ كمسودة
            </button>
            <button className="px-5 py-2.5 rounded-lg bg-primary text-white font-bold text-sm shadow-sm hover:bg-blue-600 flex items-center gap-2 transition-all">
              <span className="material-symbols-outlined text-lg">print</span>
              حفظ وطباعة
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Customer */}
            <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-50 dark:border-gray-800 pb-4">
                <span className="material-symbols-outlined text-primary">
                  person_search
                </span>
                <h3 className="text-lg font-bold text-[#121417] dark:text-white">
                  بيانات العميل واللوجستيات
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    اختر العميل
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                      search
                    </span>
                    <select className="w-full h-12 pr-10 pl-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-1 focus:ring-primary appearance-none">
                      <option value="1">شركة تكنولوجيا الحلول العالمية</option>
                      <option value="2">مجموعة قمة اللوجستيات</option>
                      <option value="3">شركاء نوفا للتجزئة</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    مستودع المصدر
                  </label>
                  <select className="w-full h-12 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-1 focus:ring-primary">
                    <option value="w1">مركز التوزيع المركزي (أ1)</option>
                    <option value="w2">محور الساحل الغربي</option>
                    <option value="w3">مكتب الامتثال الأوروبي</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Invoice Items */}
            <div className="bg-white dark:bg-background-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    list_alt
                  </span>
                  <h3 className="text-lg font-bold text-[#121417] dark:text-white">
                    عناصر الفاتورة
                  </h3>
                </div>
                <button className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
                  <span className="material-symbols-outlined text-lg">
                    add_circle
                  </span>
                  إضافة سريعة
                </button>
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50">
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        المنتج / الخدمة
                      </th>
                      <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest w-24 text-center">
                        الكمية
                      </th>
                      <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest w-32">
                        سعر الوحدة
                      </th>
                      <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest w-24 text-center">
                        الضريبة %
                      </th>
                      <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest w-32 text-left">
                        الإجمالي
                      </th>
                      <th className="px-6 py-4 w-12"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {/* Row 1 */}
                    <tr>
                      <td className="px-6 py-4">
                        <input
                          className="w-full border-none focus:ring-0 bg-transparent text-sm p-0 placeholder:text-gray-400 font-medium"
                          type="text"
                          defaultValue="شاشة سامسونج 27 بوصة"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          className="w-full border-gray-100 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm text-center py-1.5 px-2 focus:ring-primary"
                          type="number"
                          defaultValue="2"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                            SAR
                          </span>
                          <input
                            className="w-full border-gray-100 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm pl-10 pr-2 py-1.5 focus:ring-primary font-medium"
                            type="number"
                            defaultValue="800"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <input
                          className="w-full border-gray-100 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm text-center py-1.5 px-2 focus:ring-primary"
                          type="number"
                          defaultValue="15"
                        />
                      </td>
                      <td className="px-4 py-4 text-left">
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                          1,840.00 ر.س
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-gray-300 hover:text-red-500 transition-colors">
                          <span className="material-symbols-outlined text-lg">
                            delete_outline
                          </span>
                        </button>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr>
                      <td className="px-6 py-4">
                        <input
                          className="w-full border-none focus:ring-0 bg-transparent text-sm p-0 placeholder:text-gray-400 font-medium"
                          type="text"
                          defaultValue="لوحة مفاتيح ميكانيكية"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          className="w-full border-gray-100 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm text-center py-1.5 px-2 focus:ring-primary"
                          type="number"
                          defaultValue="5"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                            SAR
                          </span>
                          <input
                            className="w-full border-gray-100 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm pl-10 pr-2 py-1.5 focus:ring-primary font-medium"
                            type="number"
                            defaultValue="150"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <input
                          className="w-full border-gray-100 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm text-center py-1.5 px-2 focus:ring-primary"
                          type="number"
                          defaultValue="15"
                        />
                      </td>
                      <td className="px-4 py-4 text-left">
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                          862.50 ر.س
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-gray-300 hover:text-red-500 transition-colors">
                          <span className="material-symbols-outlined text-lg">
                            delete_outline
                          </span>
                        </button>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr>
                      <td className="px-6 py-4">
                        <input
                          className="w-full border-none focus:ring-0 bg-transparent text-sm p-0 placeholder:text-gray-400 font-medium"
                          type="text"
                          defaultValue="ماوس لاسلكي"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          className="w-full border-gray-100 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm text-center py-1.5 px-2 focus:ring-primary"
                          type="number"
                          defaultValue="3"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                            SAR
                          </span>
                          <input
                            className="w-full border-gray-100 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm pl-10 pr-2 py-1.5 focus:ring-primary font-medium"
                            type="number"
                            defaultValue="90"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <input
                          className="w-full border-gray-100 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm text-center py-1.5 px-2 focus:ring-primary"
                          type="number"
                          defaultValue="15"
                        />
                      </td>
                      <td className="px-4 py-4 text-left">
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                          310.50 ر.س
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-gray-300 hover:text-red-500 transition-colors">
                          <span className="material-symbols-outlined text-lg">
                            delete_outline
                          </span>
                        </button>
                      </td>
                    </tr>

                    <tr className="bg-blue-50/20 dark:bg-blue-900/10">
                      <td className="px-6 py-3" colSpan="6">
                        <button className="flex items-center gap-2 text-primary text-sm font-bold hover:opacity-80">
                          <span className="material-symbols-outlined text-lg">
                            add
                          </span>
                          إضافة عنصر آخر
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2 block">
                ملاحظات داخلية / الشروط
              </label>
              <textarea
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-1 focus:ring-primary placeholder:text-gray-400"
                placeholder="حدد تعليمات شحن خاصة أو شروط دفع..."
                rows="3"
              />
            </div>
          </div>

          {/* Right */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* General */}
            <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg font-bold text-[#121417] dark:text-white mb-6">
                معلومات عامة
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    رقم الفاتورة
                  </label>
                  <input
                    className="w-full h-11 px-4 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm font-semibold text-left"
                    dir="ltr"
                    readOnly
                    type="text"
                    value="INV-2024-0892"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    تاريخ الإصدار
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                      calendar_today
                    </span>
                    <input
                      className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-right"
                      type="date"
                      defaultValue="2024-05-20"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    تاريخ الاستحقاق
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                      event_repeat
                    </span>
                    <select className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm appearance-none">
                      <option>صافي 30 يوم</option>
                      <option>صافي 60 يوم</option>
                      <option>الدفع عند الاستلام</option>
                      <option>تاريخ مخصص</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white dark:bg-background-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-bold text-[#121417] dark:text-white">
                  الملخص المالي
                </h3>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">المجموع الفرعي</span>
                  <span className="font-semibold text-[#121417] dark:text-white">
                    2,620.00 ر.س
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">الضريبة (15%)</span>
                  <span className="font-semibold text-[#121417] dark:text-white">
                    393.00 ر.س
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">الشحن</span>
                  <span className="font-semibold text-primary">+0.00 ر.س</span>
                </div>
                <div className="pt-4 mt-4 border-t border-dashed border-gray-200 dark:border-gray-700 flex justify-between items-end">
                  <span className="text-base font-bold text-[#121417] dark:text-white uppercase">
                    الإجمالي النهائي
                  </span>
                  <span className="text-3xl font-black text-primary tracking-tighter">
                    3,013.00 ر.س
                  </span>
                </div>
              </div>
            </div>

            {/* Payment status */}
            <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <label className="text-xs font-bold text-gray-500 uppercase mb-4 block">
                حالة الدفع الأولية
              </label>
              <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg">
                <button className="py-2 text-xs font-bold rounded-md bg-white dark:bg-gray-800 shadow-sm text-primary">
                  غير مدفوع
                </button>
                <button className="py-2 text-xs font-bold rounded-md text-gray-500 hover:text-gray-700">
                  جزئي
                </button>
                <button className="py-2 text-xs font-bold rounded-md text-gray-500 hover:text-gray-700">
                  مدفوع
                </button>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    defaultChecked
                    className="w-4 h-4 rounded text-primary border-gray-300 focus:ring-primary"
                    id="send-email"
                    type="checkbox"
                  />
                  <label
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="send-email"
                  >
                    إرسال نسخة لبريد العميل
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    defaultChecked
                    className="w-4 h-4 rounded text-primary border-gray-300 focus:ring-primary"
                    id="inventory-sync"
                    type="checkbox"
                  />
                  <label
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="inventory-sync"
                  >
                    تحديث مستويات المخزون فوراً
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 lg:hidden">
        <button className="px-8 py-4 rounded-full bg-primary text-white font-bold shadow-xl flex items-center gap-3 transform hover:scale-105 transition-all">
          <span className="material-symbols-outlined">save</span>
          معالجة الفاتورة
        </button>
      </div>
    </div>
  );
}
