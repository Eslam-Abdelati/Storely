// AddPaymentPage.jsx
import React from "react";
import { useParams } from "react-router-dom";

function AddPaymentPage() {
  const { invoiceNumber } = useParams();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        إضافة عملية دفع للفاتورة رقم: {invoiceNumber}
      </h2>

      {/* نموذج الدفع */}
      <form className="space-y-3">
        <div>
          <label className="block text-sm font-medium">المبلغ المدفوع</label>
          <input
            type="number"
            className="border border-gray-300 rounded-md w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">تاريخ الدفع</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md w-full p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          حفظ الدفع
        </button>
      </form>
    </div>
  );
}

export default AddPaymentPage;
