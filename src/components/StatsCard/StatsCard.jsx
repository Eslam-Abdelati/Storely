import React from "react";
import { LuComputer, LuChartColumn, LuPackage, LuReceipt, LuUsers } from "react-icons/lu";
import { RiFileTextLine } from "react-icons/ri";
import { TbUsersPlus } from "react-icons/tb";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { Link } from "react-router-dom";

function StatsCard() {
  const cardsTop = [
    { to: "pos_shifts", icon: <LuComputer />, label: "بدأ البيع", color: "#13b272" },
    { to: "product", icon: <RiFileTextLine />, label: "فواتير الشراء", color: "#d87a7f" },
    { to: "product", icon: <LuReceipt />, label: "فواتير المبيعات", color: "#6f42c1" },
    { to: "product", icon: <LuPackage />, label: "المنتجات", color: "#2563eb" },
    { to: "product", icon: <LuUsers />, label: "العملاء", color: "#27c24c" },
  ];

  const cardsBottom = [
    { to: "product", icon: <TbUsersPlus />, label: "إضافة مورد", color: "#17a2b8" },
    { to: "product", icon: <HiOutlineReceiptRefund />, label: "المرتجعات", color: "#7d8fe9" },
    { to: "product", icon: <LuChartColumn />, label: "التقارير", color: "#17a2b8" },
  ];

  const renderCards = (cards) =>
    cards.map((card, index) => (
      <Link to={card.to} key={index}>
        <div className="box cursor-pointer flex items-center flex-col text-slate-600 hover:bg-slate-100/60 p-3 sm:p-4 rounded-md transition-all">
          {React.cloneElement(card.icon, {
            className: "text-[24px] sm:text-[28px] mb-2",
            style: { color: card.color },
          })}
          <h3 className="text-[13px] sm:text-[14px] xl:text-[18px] font-[500] text-center">
            {card.label}
          </h3>
        </div>
      </Link>
    ));

  return (
    <>
      <div className="w-full p-3 mb-3 bg-white/70 border border-blue-100 rounded-md grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {renderCards(cardsTop)}
      </div>

      <div className="w-full p-3 bg-white/70 border border-blue-100 rounded-md grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {renderCards(cardsBottom)}
      </div>
    </>
  );
}

export default StatsCard;
