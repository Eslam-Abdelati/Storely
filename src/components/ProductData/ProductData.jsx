import React from "react";
import im from "../../assets/samsung-galaxy-a16-black-4g-2_1.jpg";

function ProductData() {
  return (
    <>
      {/* البيانات الاساسية */}
      <div className="card mb-3 p-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <h2 className="text-[18px] text-[rgb(30,64,175)] font-[600] mb-4 lg:mb-4">
          تفاصيل
        </h2>
        <div className="flex gap-20 py-4">
          <div className="w-[20%]">
            <img src={im} alt="" className="w-full" />
          </div>

          <div className="w-[80%] flex flex-col gap-2">
            <div className="flex gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                اسم الصنف :
              </span>
              <span className="text-[16px] font-[500]">سامسونج جلاكسي A16</span>
            </div>

            <div className="flex gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                الباركود SKU :
              </span>
              <span className="text-[16px] font-[500]">66211070100</span>
            </div>

            <div className="flex  gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                {" "}
                رقم الصنف :
              </span>
              <span className="text-[16px] font-[500]">11070100094</span>
            </div>

            <div className="flex  gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                {" "}
                الفئة :
              </span>
              <span className="text-[16px] font-[500]">موبايل</span>
            </div>

            <div className="flex  gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                الفئة الفرعية :
              </span>
              <span className="text-[16px] font-[500]">سامسونج</span>
            </div>

            <div className="flex  gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                المورد :
              </span>
              <span className="text-[16px] font-[500]">أحمد عمار</span>
            </div>

            <div className="flex  gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                {" "}
                الوصف :
              </span>
              <span className="text-[16px] font-[500]">
                موبايل سامسونج اسود اللون بطارية ليثيوم{" "}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* المخزون */}
      <div className="card mb-3 p-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <h2 className="text-[18px] text-[rgb(30,64,175)] font-[600] mb-4 lg:mb-4">
          المخزون
        </h2>

        <div className="flex items-center justify-around gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                الكمية المتاحة :
              </span>
              <span className="text-[16px] font-[500]">20</span>
            </div>
            <div className="flex gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                الوحدة :
              </span>
              <span className="text-[16px] font-[500]">قطعة</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                الحد الأدني للتنبيه :
              </span>
              <span className="text-[16px] font-[500]">5</span>
            </div>
            <div className="flex gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                إجمالي القطع المباعه :
              </span>
              <span className="text-[16px] font-[500]">2</span>
            </div>
          </div>
        </div>
      </div>

      {/* التسعير */}
      <div className="card mb-3 p-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <h2 className="text-[18px] text-[rgb(30,64,175)] font-[600] mb-4 lg:mb-4">
          التسعير
        </h2>

        <div className="flex items-center justify-around gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                سعر الشراء :
              </span>
              <span className="text-[16px] font-[500]">8500 ج.م</span>
            </div>
            <div className="flex gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                سعر البيع :
              </span>
              <span className="text-[16px] font-[500]">10200 ج.م</span>
            </div>
            <div className="flex gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                أقل سعر بيع :
              </span>
              <span className="text-[16px] font-[500]">9700 ج.م</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                نوع الخصم :
              </span>
              <span className="text-[16px] font-[500]"> ( % / EGP ) </span>
            </div>
            <div className="flex gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                الخصم (قيمة أو نسبة) :
              </span>
              <span className="text-[16px] font-[500]">لا يوجد</span>
            </div>
          </div>
        </div>
      </div>

      {/* معلومات إضافية */}
      <div className="card mb-3 p-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <h2 className="text-[18px] text-[rgb(30,64,175)] font-[600] mb-4 lg:mb-4">
          معلومات إضافية
        </h2>

        <div className="flex items-center justify-around gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                تاريخ الإضافة :
              </span>
              <span className="text-[16px] font-[500]">25/9/2025</span>
            </div>

            <div className="flex gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                المستخدم الذي اضاف المنتج :
              </span>
              <span className="text-[16px] font-[500]">إسلام عمار</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 text-[rgb(75,85,99)]">
              <span className="text-[14px] font-[500] text-primary">
                اخر تحديث :
              </span>
              <span className="text-[16px] font-[500]">25/9/2025</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductData;
