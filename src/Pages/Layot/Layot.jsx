import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MyContext } from "../../context/MyContext";
import Loading from "../../components/Loading/Loading";

function Layot() {
  const { isOpenSidbar, isLoading, setIsLoading } = useContext(MyContext);
  const location = useLocation();

  useEffect(() => {
    // عند تغيير الصفحة
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          isOpenSidbar ? "w-1/5 xl:w-[15%] opacity-100" : "w-0 opacity-0"
        } h-full transition-all duration-300 overflow-hidden`}
      >
        <Sidebar />
      </div>

      <div
        className={`${
          isOpenSidbar ? "w-4/5 xl:w-[85%]" : "w-full"
        } flex flex-col h-full transition-all duration-300`}
      >
        <Navbar />
        <main className="flex-1 overflow-y-auto py-4 px-5">
          {isLoading ? (
            <div className="absolute inset-0 z-50 bg-black/40 flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
}

export default Layot;
