import React from "react";
import { LuComputer } from "react-icons/lu";
import { LuChartColumn } from "react-icons/lu";
import { LuPackage } from "react-icons/lu";
import { LuReceipt } from "react-icons/lu";
import { RiFileTextLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { TbUsersPlus } from "react-icons/tb";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { Link } from "react-router-dom";

function StatsCard() {
  return (
    // <div className="w-full max-w-full grid grid-cols-3 gap-3 pb-2">
    //   {/* الصف الأول */}
    //   <div className="box bg-white p-5 py-6 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center flex-col">
    //     <LuComputer className="text-[40px] text-[#10b981] mb-4" />
    //     <h3 className="text-[16px]">بدأ البيع</h3>
    //   </div>
    //   <div className="box bg-white p-5 py-6 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center flex-col">
    //     <PiListPlusFill className="text-[40px] text-primary mb-4" />
    //     <h3 className="text-[16px]">إنشاء فاتورة </h3>
    //   </div>

    //   <div className="box bg-white p-5 py-6 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center flex-col">
    //     <MdPointOfSale className="text-[40px] text-[#6f42c1] mb-4" />
    //     <h3 className="text-[16px]">الجلسات </h3>
    //   </div>

    //   {/* الصف الثاني */}
    //   <div className="box bg-white p-5 py-6 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center flex-col">
    //     <RiFileCopy2Line className="text-[40px] text-[#17a2b8] mb-4" />
    //     <h3 className="text-[16px]">الفواتير </h3>
    //   </div>
    //   <div className="box bg-white p-5 py-6 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center flex-col">
    //     <HiUsers className="text-[40px] text-[#10b981] mb-4" />
    //     <h3 className="text-[16px]">العملاء </h3>
    //   </div>
    //   <div className="box bg-white p-5 py-6 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center flex-col">
    //     <HiUserAdd className="text-[40px] text-[#598cb3] mb-4" />
    //     <h3 className="text-[16px]">عميل جديد </h3>
    //   </div>
    // </div>

    <>
      <div className="w-full max-w-full p-2 mb-3 bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] rounded-md grid grid-cols-5 gap-4">
        {/* العناصر */}
        <Link to="/pos_shifts">
          <div className="box cursor-pointer flex items-center flex-col text-[rgb(100,116,139)] hover:bg-[rgba(100,116,139,0.1)] p-2 rounded-md">
            <LuComputer className="text-[25px] mb-2 text-[#13b272]" />
            <h3 className="text-[14px] font-[500]">بدأ البيع</h3>
          </div>
        </Link>

        <Link to="/product">
          <div className="box cursor-pointer flex items-center flex-col text-[rgb(100,116,139)] hover:bg-[rgba(100,116,139,0.1)] p-2 rounded-md">
            <RiFileTextLine className="text-[25px] mb-2 text-[#d87a7f]" />
            <h3 className="text-[14px] font-[500]">فواتير الشراء</h3>
          </div>
        </Link>

        <Link to="/product">
          <div className="box cursor-pointer flex items-center flex-col text-[rgb(100,116,139)] hover:bg-[rgba(100,116,139,0.1)] p-2 rounded-md">
            <LuReceipt className="text-[25px] mb-2 text-[#6f42c1]" />
            <h3 className="text-[14px] font-[500]">فواتير المبيعات</h3>
          </div>
        </Link>

        <Link to="/product">
          <div className="box cursor-pointer flex items-center flex-col text-[rgb(100,116,139)] hover:bg-[rgba(100,116,139,0.1)] p-2 rounded-md">
            <LuPackage className="text-[25px] mb-2 text-primary" />
            <h3 className="text-[14px] font-[500]">المنتجات</h3>
          </div>
        </Link>

        <Link to="/product">
          <div className="box cursor-pointer flex items-center flex-col text-[rgb(100,116,139)] hover:bg-[rgba(100,116,139,0.1)] p-2 rounded-md">
            <LuUsers className="text-[25px] mb-2 text-[#27c24c]" />
            <h3 className="text-[14px] font-[500]">العملاء</h3>
          </div>
        </Link>
      </div>

      <div className="w-full max-w-full p-2 bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] rounded-md grid grid-cols-5 gap-4">
        {/* العناصر */}
        <Link to="/product">
          <div className="box cursor-pointer flex items-center flex-col text-[rgb(100,116,139)] hover:bg-[rgba(100,116,139,0.1)] p-2 rounded-md">
            <TbUsersPlus className="text-[25px] mb-2 text-[#17a2b8]" />
            <h3 className="text-[14px] font-[500]">إضافة مورد</h3>
          </div>
        </Link>

        <Link to="/product">
          <div className="box cursor-pointer flex items-center flex-col text-[rgb(100,116,139)] hover:bg-[rgba(100,116,139,0.1)] p-2 rounded-md">
            <HiOutlineReceiptRefund className="text-[25px] mb-2 text-[#7d8fe9]" />
            <h3 className="text-[14px] font-[500]">المرتجعات</h3>
          </div>
        </Link>

        <Link to="/product">
          <div className="box cursor-pointer flex items-center flex-col text-[rgb(100,116,139)] hover:bg-[rgba(100,116,139,0.1)] p-2 rounded-md">
            <LuChartColumn className="text-[25px] mb-2 text-[#17a2b8]" />
            <h3 className="text-[14px] font-[500]">التقارير</h3>
          </div>
        </Link>
      </div>
    </>
  );
}

export default StatsCard;
