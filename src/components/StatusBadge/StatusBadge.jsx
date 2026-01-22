// import React from "react";

// function Badge(props) {
//   return (
//     <span
//       className={`inline-flex items-center justify-center gap-1 px-2 rounded-full text-[11px] capitalize 
//     ${
//       (props.status === "مخزون فارغ" || props.status === "غير مدفوعة") &&
//       "bg-[rgb(239,68,68)] text-white"
//     }
//     ${
//       (props.status === "مخزون منخفض" || props.status === "تحت التسليم") &&
//       "bg-[rgb(245,158,11)] text-white "
//     }
//     ${
//       (props.status === "في المخزون" || props.status === "مدفوعة") &&
//       "bg-[rgb(16,185,129)] text-white"
//     }
//     ${
//       (props.status === "مرتجع" || props.status === "مرتجع جزئي") &&
//       "bg-[#555] text-white"
//     }
//     ${props.status === "مدفوعة جزئياََ" && "bg-[#ff7f00] text-white"}
//     `}
//     >
//       {props.status}
//     </span>
//   );
// }

// export default Badge;


import React from "react";

function StatusBadge({ status }) {
  const base =
    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold";

  switch (status) {
    case "paid":
      return (
        <span
          className={`${base} bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          مدفوع
        </span>
      );

    case "partial":
      return (
        <span
          className={`${base} bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
          مدفوع جزئي
        </span>
      );

    case "late":
      return (
        <span
          className={`${base} bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          متأخرة
        </span>
      );

    case "pending":
      return (
        <span
          className={`${base} bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
          معلقة
        </span>
      );

    case "returned":
      return (
        <span
          className={`${base} bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
          مرتجع
        </span>
      );

    default:
      return (
        <span
          className={`${base} bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300`}
        >
          غير معروف
        </span>
      );
  }
}

export default StatusBadge;

