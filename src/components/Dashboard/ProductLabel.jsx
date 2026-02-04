import React from "react";

function ProductLabel() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="card my-4 p-5 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] ">
      <div
        id="printable-label"
        className="bg-white border border-gray-300 p-6 text-center w-64"
      >
        <h2 className="text-lg font-bold">سامسونج A52</h2>

        <p className="text-2xl font-semibold text-blue-600 mt-2">12000 ج.م</p>

        {/* <div className="mt-4">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=SAMS-A52"
            alt="QR Code"
            className="mx-auto"
          />
        </div> */}
      </div>

      <button
        onClick={handlePrint}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 no-print"
      >
        طباعة
      </button>
    </div>
  );
}

export default ProductLabel;
