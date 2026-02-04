import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

import { FiCalendar } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

// بيانات تجريبية
const data = [
  {
    id: 1,
    date: "2025-09-20T10:30:00",
    type: "شراء",
    quantity: 50,
    price: 1200,
    employee: "أحمد علي",
    reference: "INV-202415-1234",
    note: "شراء من المورد",
  },
  {
    id: 2,
    date: "2025-09-22T14:45:00",
    type: "بيع",
    quantity: -20,
    price: 800,
    employee: "منى حسن",
    reference: "INV-202415-1235",
    note: "للعميل خالد",
  },
  {
    id: 3,
    date: "2025-09-25T09:15:00",
    type: "مرتجع",
    quantity: 10,
    price: 400,
    employee: "إسلام عمار",
    reference: "INV-202415-1236",
    note: "مرتجع بسبب عيب تصنيع",
  },
  {
    id: 4,
    date: "2025-09-28T18:20:00",
    type: "شراء",
    quantity: 30,
    price: 900,
    employee: "سارة محمد",
    reference: "INV-202415-1237",
    note: " دفع آجل",
  },
];

function ProductMovement() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  // فلترة البيانات
  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date);
    if (fromDate && itemDate < fromDate) return false;
    if (toDate && itemDate > toDate) return false;
    return true;
  });

  return (
    <>
      <div className="card mb-3 p-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        {/* الاسم و SKU */}
        <div className="w-full flex items-center gap-3 mb-4 pt-3">
          <div className="form-group w-full flex flex-col gap-2">
            <label
              htmlFor="date1"
              className="text-sm font-semibold text-gray-700 flex items-center gap-1"
            >
              من تاريخ
            </label>
            <DatePicker
            id="date1"
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="اختر التاريخ"
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="form-group w-full flex flex-col gap-2">
            <label
              htmlFor="date2"
              className="text-sm font-semibold text-gray-700 flex items-center gap-1"
            >
              الي تاريخ
            </label>
            <DatePicker
            id="date2"
              selected={toDate}
              onChange={(date) => setToDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="اختر التاريخ"
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        </div>
        {/* جدول الحركات */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-2 whitespace-nowrap">
                  العملية
                </th>

                <th scope="col" className="px-2 py-2 whitespace-nowrap">
                  التاريخ
                </th>
                <th scope="col" className="px-2 py-2 whitespace-nowrap">
                  الحركة
                </th>

                <th scope="col" className="px-2 py-2 whitespace-nowrap">
                  الكمية
                </th>

                <th scope="col" className="px-2 py-2 whitespace-nowrap">
                  السعر
                </th>
                <th scope="col" className="px-2 py-2 whitespace-nowrap">
                  ملاحظات
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 "
                  >
                    <td className="px-2 py-2 whitespace-nowrap ">
                      <div className="flex flex-col gap-1">
                        <div className="px-2 w-fit border border-primary rounded-xl text-primary">
                          <Link to="/">{item.reference}</Link>
                        </div>

                        <span className="flex items-center gap-1 text-[rgb(75,85,99)]">
                          <FiUser className="text-[18px]" />
                          {item.employee}
                        </span>
                      </div>
                    </td>

                    <td className="px-2 py-2 whitespace-nowrap">
                      <div className="flex items-center mt-1 gap-5 text-[rgb(75,85,99)]">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="text-[16px]" />
                          {format(new Date(item.date), "HH:mm")}
                          &nbsp;
                          {format(new Date(item.date), "yyyy-MM-dd")}
                        </span>
                      </div>
                    </td>

                    <td className="px-2 py-2 text-[16px] text-[rgb(75,85,99)]">
                      {item.type}
                    </td>

                    <td
                      className={`px-2 py-2 font-medium text-[16px] ${
                        item.quantity < 0 ? "text-red-500" : "text-green-600"
                      }`}
                    >
                      {item.quantity}
                    </td>

                    <td className="px-2 py-2 text-[16px] text-[rgb(75,85,99)]">
                      {item.price.toLocaleString()} ج.م
                    </td>

                    <td className="px-2 py-2 text-[16px] text-[rgb(75,85,99)]">
                      {item.note}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    لا توجد بيانات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ProductMovement;
