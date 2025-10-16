import React from "react";

function Badge(props) {
  return (
    <span
      className={`inline-flex items-center justify-center gap-1 px-2 rounded-full text-[11px] capitalize 
    ${
      (props.status === "مخزون فارغ" || props.status === "غير مدفوعة") &&
      "bg-[rgb(239,68,68)] text-white"
    }
    ${
      (props.status === "مخزون منخفض" || props.status === "تحت التسليم") &&
      "bg-[rgb(245,158,11)] text-white "
    }
    ${
      (props.status === "في المخزون" || props.status === "مدفوعة") &&
      "bg-[rgb(16,185,129)] text-white"
    }
    ${
      (props.status === "مرتجع" || props.status === "مرتجع جزئي") &&
      "bg-[#555] text-white"
    }
    ${props.status === "مدفوعة جزئياََ" && "bg-[#ff7f00] text-white"}
    `}
    >
      {props.status}
    </span>
  );
}

export default Badge;
