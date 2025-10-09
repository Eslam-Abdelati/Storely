import React from "react";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import StatsCard from "../../components/StatsCard/StatsCard";
import OrderCart from "../../components/OrderCart/OrderCart";
import ProductCart2 from "../../components/ProductCart2/ProductCart2";
import RechartsCard from "../../components/RechartsCard/RechartsCard";

const today = new Date().toLocaleDateString("ar-EG", {
  weekday: "long", // يوم الأسبوع
  year: "numeric",
  month: "long",
  day: "numeric",
});
function Dashboard() {
  return (
    <>
      <div className="w-full py-4 px-5 bg-[rgba(255,255,255,0.8)] border border-[rgb(219,234,254)] shadow-sm flex items-center mb-5 justify-between rounded-md">
        <div className="info w-full">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-[18px] lg:text-[20px] font-bold leading-8 lg:leading-10">
              مرحبا
              <span className="text-primary capitalize px-2">Eslam Amaar</span>
            </h1>
            <p className="text-primary">{"جلاكسي فون MGAPH05002"}</p>
          </div>
          <p className="text-[rgb(75,85,99)] mt-2">{today}</p>
        </div>
      </div>

      <StatsCard />

      {/* <ProductCart2 /> */}
      {/* <OrderCart /> */}
      <RechartsCard />
    </>
  );
}

export default Dashboard;
