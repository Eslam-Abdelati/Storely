import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { GrLineChart } from "react-icons/gr";

const data = [
  { name: "Jan", TotalSales: 4000 },
  { name: "Feb", TotalSales: 3000 },
  { name: "Mar", TotalSales: 2000 },
  { name: "Apr", TotalSales: 2780 },
  { name: "May", TotalSales: 1890 },
  { name: "Jun", TotalSales: 2390 },
  { name: "Jul", TotalSales: 3490 },
  { name: "Aug", TotalSales: 3100 },
  { name: "Sep", TotalSales: 4200 },
  { name: "Oct", TotalSales: 3700 },
  { name: "Nov", TotalSales: 4500 },
  { name: "Dec", TotalSales: 5000 },
];

function RechartsCard() {
  return (
    <div className="card my-4 shadow-sm rounded-md bg-white/80 border border-blue-100">
      <div className="flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-5">
        <GrLineChart className="text-[22px] sm:text-[25px] text-blue-800" />
        <h2 className="text-[16px] sm:text-[18px] text-blue-800 font-[600]">المبيعات</h2>
      </div>

      <div className="flex items-center gap-3 sm:gap-5 px-4 sm:px-5 pb-3">
        <span className="flex items-center gap-1 text-[13px] sm:text-[15px] cursor-pointer">
          <span className="block w-[8px] h-[8px] rounded-full bg-green-600"></span>
          إجمالي المبيعات
        </span>
      </div>

      {/* ✅ الرسم البياني الريسبونسيف */}
      <div className="w-full h-[250px] sm:h-[320px] px-3 sm:px-5 pb-5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="TotalSales"
              stroke="#82ca9d"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RechartsCard;
