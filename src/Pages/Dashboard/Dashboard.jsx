import React from "react";
import RechartsCard from "../../components/Dashboard/RechartsCard";
import ReportBoxes from "../../components/Dashboard/ReportBoxes";
import QuickAccess from "../../components/Dashboard/QuickAccess";
import FinancialSpreadsheet from "../../components/Dashboard/FinancialSpreadsheet";
import Cookies from "js-cookie";

const today = new Date().toLocaleDateString("ar-EG", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

function Dashboard() {
  const userType = Cookies.get("userType");
  return (
    <>
      {/* العنوان والترحيب */}
      <div className="flex items-start justify-between">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-text-main mb-2">
            مرحبا بك مجدداَ
          </h2>
          <p className="text-text-muted">
            إليك نظرة عامة على أداء متجرك اليوم.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-text-main mb-2">
            جلاكسي فون MGAPH05002
          </h2>
          <p className="text-gray-600 mt-1 text-[14px] sm:text-[15px]">
            {today}
          </p>
        </div>
      </div>

      {/* صناديق التقارير */}
      {userType === "owner" && <ReportBoxes />}
      {/* وصول سريع */}
      <QuickAccess />
      {/* بطاقة الرسوم البيانية */}
 
      {userType === "owner" && <FinancialSpreadsheet />}
    </>
  );
}

export default Dashboard;
