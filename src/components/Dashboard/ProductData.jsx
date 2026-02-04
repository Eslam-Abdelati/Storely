import React from "react";
import im from "../../assets/samsung-galaxy-a16-black-4g-2_1.jpg";

function ProductData() {
  return (
    <>
      {/* البيانات الاساسية */}
      <div className="card mb-3 p-3 sm:p-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <h2 className="text-lg sm:text-xl text-[rgb(30,64,175)] font-semibold mb-4">
          تفاصيل
        </h2>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 py-2 md:py-4">
          {/* الصورة */}
          <div className="w-full md:w-[30%] lg:w-[20%]">
            <img
              src={im}
              alt="صورة المنتج"
              className="w-full rounded-md object-cover shadow-sm"
            />
          </div>

          {/* البيانات */}
          <div className="w-full md:w-[70%] lg:w-[80%] flex flex-col gap-3">
            {[
              { label: "اسم الصنف :", value: "سامسونج جلاكسي A16" },
              { label: "الباركود SKU :", value: "66211070100" },
              { label: "رقم الصنف :", value: "11070100094" },
              { label: "الفئة :", value: "موبايل" },
              { label: "الفئة الفرعية :", value: "سامسونج" },
              { label: "المورد :", value: "أحمد عمار" },
              {
                label: "الوصف :",
                value: "موبايل سامسونج أسود اللون بطارية ليثيوم",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <span className="text-sm sm:text-base font-[500] text-primary">
                  {item.label}
                </span>
                <span className="text-base sm:text-[16px] font-[500] text-[rgb(75,85,99)]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* المخزون */}
      <div className="card mb-3 p-3 sm:p-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <h2 className="text-lg sm:text-xl text-[rgb(30,64,175)] font-semibold mb-4">
          المخزون
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Info label="الكمية المتاحة :" value="20" />
            <Info label="الوحدة :" value="قطعة" />
          </div>
          <div className="flex flex-col gap-2">
            <Info label="الحد الأدني للتنبيه :" value="5" />
            <Info label="إجمالي القطع المباعه :" value="2" />
          </div>
        </div>
      </div>

      {/* التسعير */}
      <div className="card mb-3 p-3 sm:p-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <h2 className="text-lg sm:text-xl text-[rgb(30,64,175)] font-semibold mb-4">
          التسعير
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Info label="سعر الشراء :" value="8500 ج.م" />
            <Info label="سعر البيع :" value="10200 ج.م" />
            <Info label="أقل سعر بيع :" value="9700 ج.م" />
          </div>
          <div className="flex flex-col gap-2">
            <Info label="نوع الخصم :" value="(% / EGP)" />
            <Info label="الخصم (قيمة أو نسبة) :" value="لا يوجد" />
          </div>
        </div>
      </div>

      {/* معلومات إضافية */}
      <div className="card mb-3 p-3 sm:p-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <h2 className="text-lg sm:text-xl text-[rgb(30,64,175)] font-semibold mb-4">
          معلومات إضافية
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Info label="تاريخ الإضافة :" value="25/9/2025" />
            <Info label="المستخدم الذي أضاف المنتج :" value="إسلام عمار" />
          </div>
          <div className="flex flex-col gap-2">
            <Info label="آخر تحديث :" value="25/9/2025" />
          </div>
        </div>
      </div>
    </>
  );
}

/* مكون فرعي لتوحيد عرض المعلومات */
const Info = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
    <span className="text-sm sm:text-base font-[500] text-primary">
      {label}
    </span>
    <span className="text-base sm:text-[16px] font-[500] text-[rgb(75,85,99)]">
      {value}
    </span>
  </div>
);

export default ProductData;
