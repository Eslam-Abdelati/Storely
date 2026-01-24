import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-end gap-[14px]">
        {/* bar 1 */}
        <div
          className="w-[20px] h-[48px] rounded-[20px] bg-[#2f2f2f] opacity-80 animate-bar"
          style={{ animationDelay: "0s" }}
        />

        {/* bar 2 */}
        <div
          className="w-[20px] h-[62px] rounded-[20px] bg-[#2f2f2f] animate-bar"
          style={{ animationDelay: "0.15s" }}
        />

        {/* dot */}
        <div
          className="w-[16px] h-[16px] rounded-full bg-[#9aa9bb] mb-[6px] animate-dot"
          style={{ animationDelay: "0.3s" }}
        />
      </div>
    </div>
  );
}

export default Loading;
