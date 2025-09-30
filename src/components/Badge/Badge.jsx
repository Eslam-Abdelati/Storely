import React from "react";

function Badge(props) {
  return (
    <span
      className={`inline-flex items-center justify-center gap-1 px-4 rounded-full text-[11px] capitalize 
    ${props.status === "مخزون فارغ" && "bg-[rgb(239,68,68)] text-white"}
    ${props.status === "مخزون منخفض" && "bg-[rgb(245,158,11)] text-white "}
    ${props.status === "في المخزون" && "bg-[rgb(16,185,129)] text-white"}
    `}
    >
      {props.status}
    </span>
  );
}

export default Badge;
