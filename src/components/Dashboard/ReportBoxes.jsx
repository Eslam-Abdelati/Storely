import React from "react";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import { MdOutlineGroupAdd } from "react-icons/md";

function ReportBoxes() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div className="bg-card-bg p-6 rounded-xl shadow-soft border border-border-color">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <span className="material-symbols-outlined">
              <IoTrendingUpSharp className="text-[22px]" />
            </span>
          </div>
          <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
            +12%
          </span>
        </div>
        <p className="text-text-muted text-sm mb-1">إجمالي المبيعات (الشهر)</p>
        <h3 className="text-xl font-bold text-text-main">45,230 ج.م</h3>
      </div>
      <div className="bg-card-bg p-6 rounded-xl shadow-soft border border-border-color">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-orange-500/10 rounded-lg text-orange-600">
            <span className="material-symbols-outlined">
              <MdOutlineDescription className="text-[22px]" />
            </span>
          </div>
          <span className="text-text-muted text-xs font-bold">يومي</span>
        </div>
        <p className="text-text-muted text-sm mb-1">الفواتير المعلقة</p>
        <h3 className="text-xl font-bold text-text-main">14 فاتورة</h3>
      </div>
      <div className="bg-card-bg p-6 rounded-xl shadow-soft border border-border-color">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-purple-500/10 rounded-lg text-purple-600">
            <span className="material-symbols-outlined">
              <MdOutlineInventory className="text-[22px]" />
            </span>
          </div>
          <span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded-full">
            -3 أصناف
          </span>
        </div>
        <p className="text-text-muted text-sm mb-1">أصناف منخفضة المخزون</p>
        <h3 className="text-xl font-bold text-text-main">8 منتجات</h3>
      </div>
      <div className="bg-card-bg p-6 rounded-xl shadow-soft border border-border-color">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
            <span className="material-symbols-outlined">
              <MdOutlineGroupAdd className="text-[22px]" />
            </span>
          </div>
          <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
            +5 جدد
          </span>
        </div>
        <p className="text-text-muted text-sm mb-1">العملاء النشطون</p>
        <h3 className="text-xl font-bold text-text-main">1,240 عميل</h3>
      </div>
    </div>
  );
}

export default ReportBoxes;
