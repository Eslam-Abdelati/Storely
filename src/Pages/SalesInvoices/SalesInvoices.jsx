import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import { IoIosAdd } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { MdMoreVert } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdLocalPrintshop } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import StatusBadge from "../../components/StatusBadge/StatusBadge";


const customersList = [
  { value: "all", label: "الكل" },
  { value: "c1", label: "شركة الأمل التجارية" },
  { value: "c2", label: "مؤسسة النجاح" },
  { value: "c3", label: "مركز التقنية الحديثة" },
  { value: "c4", label: "سليمان العلي" },
];

const staffList = [
  { value: "all", label: "الكل" },
  { value: "emp1", label: "سامي محمد" },
  { value: "emp2", label: "محمود علي" },
  { value: "emp3", label: "أحمد سامي" },
  { value: "emp4", label: "محمد عبد الله" },
];

// ✅ قائمة حالات الدفع
const paymentStatusList = [
  { value: "all", label: "الكل" },
  { value: "paid", label: "مدفوع" },
  { value: "partial", label: "مدفوع جزئي" },
  { value: "unpaid", label: "متأخرة" },
  { value: "partial_returned", label: "معلقة" },
  { value: "returned", label: "مرتجع" },
];

function SalesInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  // ✅ داتا داخل نفس الصفحة
  const salesInvoicesData = [
    {
      id: "INV-2024-001",
      invoiceNumber: "INV-2024-001",
      customer: "شركة الأمل التجارية",
      customerId: "CUST-001",
      releaseDate: "2024-10-15",
      employee: { value: "emp1", label: "سامي محمد" },
      items: [
        { name: "هاتف سامسونج A54", qty: 2, price: 6500 },
        { name: "شاحن سريع", qty: 1, price: 300 },
      ],
      netTotal: 13300,
      paymentStatus: "paid",
      returned: 0,
    },
    {
      id: "INV-2024-002",
      invoiceNumber: "INV-2024-002",
      customer: "مؤسسة النجاح",
      customerId: "CUST-002",
      releaseDate: "2024-10-14",
      employee: { value: "emp2", label: "محمود علي" },
      items: [
        { name: "ايفون 14", qty: 1, price: 22000 },
        { name: "جراب حماية", qty: 2, price: 150 },
      ],
      netTotal: 22300,
      paymentStatus: "late",
      returned: 0,
    },
    {
      id: "INV-2024-003",
      invoiceNumber: "INV-2024-003",
      customer: "مركز التقنية الحديثة",
      customerId: "CUST-003",
      releaseDate: "2024-10-14",
      employee: { value: "emp3", label: "أحمد سامي" },
      items: [
        { name: "لابتوب Dell", qty: 1, price: 18000 },
        { name: "ماوس لاسلكي", qty: 1, price: 350 },
      ],
      netTotal: 18350,
      paymentStatus: "partial",
      returned: 0,
    },
    {
      id: "INV-2024-004",
      invoiceNumber: "INV-2024-004",
      customer: "سليمان العلي",
      customerId: "CUST-004",
      releaseDate: "2024-10-13",
      employee: { value: "emp4", label: "محمد عبد الله" },
      items: [
        { name: "هاتف شاومي 13", qty: 1, price: 9500 },
        { name: "سماعة بلوتوث", qty: 1, price: 600 },
      ],
      netTotal: 10100,
      paymentStatus: "returned",
      returned: 300,
    },
    {
      id: "INV-2024-005",
      invoiceNumber: "INV-2024-005",
      customer: "شركة الأمل التجارية",
      customerId: "CUST-005",
      releaseDate: "2024-10-12",
      employee: { value: "emp1", label: "سامي محمد" },
      items: [
        { name: "تابلت سامسونج", qty: 1, price: 12000 },
        { name: "قلم S-Pen", qty: 1, price: 900 },
      ],
      netTotal: 12900,
      paymentStatus: "pending",
      returned: 500,
    },
  ];

  // ✅ حالة النموذج
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    date: "",
    customer: customersList[0],
    employee: staffList[0],
    paymentStatus: paymentStatusList[0],
  });
  const initialFormState = {
    invoiceNumber: "",
    date: "",
    customer: customersList[0],
    employee: staffList[0],
    paymentStatus: paymentStatusList[0],
  };

  // ✅ القائمة المنسدلة (Menu)
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => setAnchorEl(event.currentTarget);
  // const handleClose = () => setAnchorEl(null);

  // ✅ لتحديث حقول الإدخال العادية
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ لتحديث Select (react-select)
  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prev) => ({ ...prev, [name]: selectedOption }));
  };
  // ✅ تحميل بيانات الفواتير عند التحميل الأولي للصفحة
  useEffect(() => {
    // في حالة جلب البيانات من API، يمكن استبدال هذا الجزء بعملية الجلب الحقيقية
    setInvoices(salesInvoicesData);
  }, []);
  // ✅ تطبيق الفلاتر على قائمة الفواتير
  const filteredInvoices = appliedFilters
    ? invoices.filter((inv) => {
        if (
          appliedFilters.invoiceNumber &&
          !inv.invoiceNumber.includes(appliedFilters.invoiceNumber)
        )
          return false;

        if (
          appliedFilters.customer.value !== "all" &&
          inv.customer !== appliedFilters.customer.label
        )
          return false;

        if (
          appliedFilters.employee.value !== "all" &&
          inv.employee?.value !== appliedFilters.employee.value
        )
          return false;

        if (
          appliedFilters.paymentStatus.value !== "all" &&
          inv.paymentStatus !== appliedFilters.paymentStatus.value
        )
          return false;

        // ✅ فلترة التاريخ
        if (appliedFilters.date && inv.releaseDate !== appliedFilters.date)
          return false;

        return true;
      })
    : invoices;

  return (
    <>
      {/* عنوان الصفحة */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4 lg:gap-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">قائمة الفواتير</h1>
          <p className="text-sm text-[#657286] mt-1">
            إدارة وتتبع فواتير المبيعات الخاصة بالمؤسسة
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 text-sm text-[#657286] font-semibold bg-[#f0f2f4] hover:bg-[#dbdddf] transition-all px-3 py-1.5 rounded-lg w-full sm:w-auto">
            <span className="material-symbols-outlined text-[18px]">
              <FiDownload className="text-[22px]" />
            </span>
            تصدير التقرير
          </button>

          <button className="flex items-center justify-center gap-2 text-sm text-white font-semibold bg-primary hover:bg-blue-700 transition-all px-4 py-1.5 rounded-lg w-full sm:w-auto">
            <span className="material-symbols-outlined text-[18px]">
              <IoIosAdd className="text-[22px]" />
            </span>
            فاتورة جديدة
          </button>
        </div>
      </div>

      {/* الفلاتر */}
      <div className="bg-white  card-shadow rounded-xl border border-border-light dark:border-border-dark p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
          {/* رقم الفاتورة */}
          <div className="lg:col-span-1">
            <label className="block text-xs font-bold text-[#657286] mb-2 uppercase tracking-wide">
              رقم الفاتورة
            </label>
            <div className="relative">
              <TextField
                type="text"
                id="invoiceNumber"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleInputChange}
                autoComplete="off"
                variant="outlined"
                size="small"
                className="w-full  border-gray-300 rounded-lg py-2 pr-3 pl-3 text-sm 
                         focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                placeholder="رقم الفاتورة..."
              />
            </div>
          </div>

          {/* التاريخ */}
          <div>
            <label className="block text-xs font-bold text-[#657286] mb-2 uppercase tracking-wide">
              التاريخ
            </label>

            <div className="relative">
              <TextField
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                size="small"
                fullWidth
                sx={{
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#e5e7eb",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3b82f6",
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* العميل */}
          <div>
            <label className="block text-xs font-bold text-[#657286] mb-2 uppercase tracking-wide">
              العميل
            </label>
            <div className="relative">
              <Select
                name="customer"
                options={customersList}
                value={formData.customer}
                onChange={handleSelectChange}
                className="!bg-[#f9fafb] w-full"
                isSearchable
                autoComplete="off"
              />
            </div>
          </div>

          {/* الموظف */}
          <div>
            <label className="block text-xs font-bold text-[#657286] mb-2 uppercase tracking-wide">
              الموظف
            </label>
            <div className="relative">
              <Select
                name="employee"
                options={staffList}
                value={formData.employee}
                onChange={handleSelectChange}
                isSearchable
                autoComplete="off"
                className="!bg-[#f9fafb] w-full"
              />
            </div>
          </div>

          {/* حالة الدفع */}
          <div>
            <label className="block text-xs font-bold text-[#657286] mb-2 uppercase tracking-wide">
              حالة الدفع
            </label>
            <Select
              name="paymentStatus"
              options={paymentStatusList}
              value={formData.paymentStatus}
              onChange={handleSelectChange}
              isSearchable
              autoComplete="off"
              className="!bg-[#f9fafb] w-full"
            />
          </div>
          {/* الأزرار */}
          <div className="flex gap-2">
            <button
              onClick={() => setAppliedFilters(formData)}
              className="flex-1 bg-primary text-white text-sm font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              تطبيق
            </button>

            <button
              onClick={() => {
                setFormData(initialFormState);
                setAppliedFilters(null);
              }}
              className="bg-gray-100 text-[#657286] p-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <IoMdRefresh />
            </button>
          </div>
        </div>
      </div>

      {/* قائمة الفواتير */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12">
          <div className="bg-white card-shadow rounded-xl border border-[#f0f2f4 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#f0f2f4] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h4 className="text-lg font-bold">قائمة الفواتير</h4>
                <span className="bg-[#f0f2f4] text-[#657286] text-[10px] font-bold px-2 py-0.5 rounded">
                  {filteredInvoices.length} نتيجة
                </span>
              </div>
            </div>

            {/* Table with scroll */}
            <div className="overflow-auto max-h-[420px]">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-[#f9fafb]  border-b border-border-light">
                    <th className="px-6 py-4 text-[11px] font-bold text-[#657286] uppercase tracking-wider whitespace-nowrap">
                      رقم الفاتورة
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#657286] uppercase tracking-wider whitespace-nowrap">
                      العميل
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#657286] uppercase tracking-wider whitespace-nowrap">
                      الموظف
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#657286] uppercase tracking-wider text-center whitespace-nowrap">
                      عدد المنتجات
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#657286] uppercase tracking-wider whitespace-nowrap">
                      التاريخ
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#657286] uppercase tracking-wider whitespace-nowrap">
                      الإجمالي
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#657286] uppercase tracking-wider whitespace-nowrap">
                      حالة الدفع
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#657286] uppercase tracking-wider text-left">
                      الإجراءات
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {filteredInvoices.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-6 text-center text-sm text-[#657286]"
                      >
                        لا يوجد بيانات
                      </td>
                    </tr>
                  ) : (
                    filteredInvoices.map((inv, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 transition-colors group relative overflow-visible"
                      >
                        <td className="px-6 py-4 text-sm font-bold text-primary whitespace-nowrap">
                          #{inv.invoiceNumber}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold">
                              {inv.customer}
                            </span>
                            <span className="text-[10px] text-[#657286]">
                              {inv.customerId}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          {inv.employee.label}
                        </td>

                        <td className="px-6 py-4 text-sm text-center whitespace-nowrap">
                          {inv.items.length}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                          {inv.releaseDate}
                        </td>

                        <td className="px-6 py-4 text-sm font-bold whitespace-nowrap ">
                          {inv.netTotal.toLocaleString()} ج.م
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={inv.paymentStatus} />
                        </td>

                        <td className="px-6 py-4 text-left relative overflow-visible ">
                          <div className="flex items-center justify-end relative">
                            <button
                              onClick={() =>
                                setOpenDropdown(
                                  openDropdown === idx ? null : idx,
                                )
                              }
                              className="p-1.5 text-primary bg-blue-50 rounded-lg transition-colors ring-2 ring-primary/20"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                <MdMoreVert />
                              </span>
                            </button>

                            {openDropdown === idx && (
                              <div className="absolute left-0 top-full mt-2 w-48 bg-white dropdown-shadow rounded-xl border border-border-light z-[9999] py-1.5">
                                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                  <span className="material-symbols-outlined text-[20px] text-primary">
                                    <MdVisibility />
                                  </span>
                                  عرض التفاصيل
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50transition-colors">
                                  <span className="material-symbols-outlined text-[20px] text-[#657286]">
                                    <MdEdit />
                                  </span>
                                  تعديل
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                  <span className="material-symbols-outlined text-[20px] text-[#657286]">
                                    <MdLocalPrintshop />
                                  </span>
                                  طباعة
                                </button>
                                <div className="my-1 border-t border-border-light mx-2"></div>
                                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                  <span className="material-symbols-outlined text-[20px]">
                                    <RiDeleteBin6Fill />
                                  </span>
                                  <span className="font-bold">حذف</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SalesInvoices;
