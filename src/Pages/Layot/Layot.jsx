import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MyContext } from "../../context/MyContext";

function Layot() {
  const { isOpenSidbar } = useContext(MyContext);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          isOpenSidbar ? "w-1/5 opacity-100" : "w-0 opacity-0"
        } h-full transition-all duration-300 overflow-hidden`}
      >
        <Sidebar />
      </div>

      <div
        className={`${
          isOpenSidbar ? "w-4/5" : "w-full"
        } flex flex-col h-full transition-all duration-300`}
      >
        <Navbar />
        <main className="flex-1 overflow-y-auto py-4 px-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layot;
