import React from "react";

function PageLoader() {
  return (
    <div className="absolute inset-0 z-10 bg-white flex items-start justify-center">
      <div className="mt-20 animate-slideDown bg-transparent border border-primary rounded-md px-12 py-5 flex items-center gap-4">
        {/* spinner */}
        {/* <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin" /> */}

        {/* text */}
        <span className=" text-slate-700">
          الرجاء الانتظار، نقوم حاليا بمعالجة طلبك...
        </span>
      </div>
    </div>
  );
}

export default PageLoader;
