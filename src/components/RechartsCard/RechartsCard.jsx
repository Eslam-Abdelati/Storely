import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
    <div className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.8)] border border-[rgb(219,234,254)]">
      <div className="flex items-center px-5 py-5 gap-2">
        <GrLineChart className="text-[25px] text-[rgb(30,64,175)]" />
        <h2 className="text-[18px] text-[rgb(30,64,175)] font-[600] mb-2 lg:mb-0">
          المبيعات
        </h2>
      </div>
      
      <div className="flex items-center gap-5 px-5 py-5 pt-1">
        <span className="flex items-center gap-1 text-[15px] cursor-pointer">
          <span className="block w-[8px] h-[8px] rounded-full bg-green-600  "></span>
          Total Sales
        </span>
      </div>

      {/* هنا اديته ارتفاع */}
      <div className="w-full px-5">
        <LineChart
          data={data}
          width={850}
          height={300}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="none" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="TotalSales"
            stroke="#82ca9d"
            strokeWidth={3}
          />
        </LineChart>
      </div>
    </div>
  );
}

export default RechartsCard;
