import React from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";
import { MdOutlineAssessment } from "react-icons/md";
import { MdOutlinePersonAddAlt } from "react-icons/md";

function QuickAccess() {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-text-main">الوصول السريع</h3>
        <button className="text-primary text-sm font-medium hover:underline">
          تخصيص الاختصارات
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
        <button className="group flex flex-col items-center gap-4 p-8 bg-card-bg rounded-xl border border-border-color shadow-soft hover:border-primary transition-all hover:-translate-y-1">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">
              <MdAddShoppingCart />
            </span>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg mb-1 text-text-main">
              إضافة فاتورة
            </p>
            <p className="text-xs text-text-muted">إنشاء عملية بيع جديدة</p>
          </div>
        </button>

        <button className="group flex flex-col items-center gap-4 p-8 bg-card-bg rounded-xl border border-border-color shadow-soft hover:border-primary transition-all hover:-translate-y-1">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">
              <MdOutlineAddBox />
            </span>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg mb-1 text-text-main">إضافة صنف</p>
            <p className="text-xs text-text-muted">تسجيل منتج في المخازن</p>
          </div>
        </button>

        <button className="group flex flex-col items-center gap-4 p-8 bg-card-bg rounded-xl border border-border-color shadow-soft hover:border-primary transition-all hover:-translate-y-1">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">
              <MdOutlineAssessment />
            </span>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg mb-1 text-text-main">
              عرض التقارير
            </p>
            <p className="text-xs text-text-muted">تحليل الأداء المالي</p>
          </div>
        </button>

        <button className="group flex flex-col items-center gap-4 p-8 bg-card-bg rounded-xl border border-border-color shadow-soft hover:border-primary transition-all hover:-translate-y-1">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">
              <MdOutlinePersonAddAlt />
            </span>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg mb-1 text-text-main">
              إدارة العملاء
            </p>
            <p className="text-xs text-text-muted">إضافة وتعديل العملاء</p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default QuickAccess;
