import React from "react";
import StatsCard from "../../components/StatsCard/StatsCard";
import RechartsCard from "../../components/RechartsCard/RechartsCard";

const today = new Date().toLocaleDateString("ar-EG", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

function Dashboard() {
  return (
    <>
      {/* العنوان والترحيب */}
      <div className="w-full py-4 px-5 bg-white/80 border border-blue-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 rounded-md">
        <div>
          <h1 className="text-[18px] sm:text-[20px] font-bold">
            مرحبا
            <span className="text-primary capitalize px-2">Eslam Amaar</span>
          </h1>
          <p className="text-gray-600 mt-1 text-[14px] sm:text-[15px]">{today}</p>
        </div>
        <p className="text-primary text-[14px] sm:text-[15px] mt-2 sm:mt-0">
          {"جلاكسي فون MGAPH05002"}
        </p>
      </div>

      <StatsCard />
      <RechartsCard />
    </>
  );
}

export default Dashboard;
