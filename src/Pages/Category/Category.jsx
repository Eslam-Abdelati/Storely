import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";

const status = [
  { value: "مفعل", label: "مفعل" },
  { value: "غير مفعل", label: "غير مفعل" },
];

const categories = [
  {
    id: 1,
    name: "موبايلات",
    description: "قسم خاص بجميع أنواع الموبايلات",
    status: "مفعل",
    productCount: 120,
  },
  {
    id: 2,
    name: "إكسسوارات",
    description: "كفرات، سماعات، شواحن ...",
    status: "مفعل",
    productCount: 85,
  },
  {
    id: 3,
    name: "أجهزة لوحية",
    description: "تابلت بأنواعه المختلفة",
    status: "غير مفعل",
    productCount: 45,
  },
  {
    id: 4,
    name: "ساعات ذكية",
    description: "أحدث الساعات الذكية",
    status: "مفعل",
    productCount: 32,
  },
];

function Category() {
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    status: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prev) => ({ ...prev, [name]: selectedOption }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <section>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-xl md:text-2xl font-semibold text-[rgb(30,64,175)]">
          إدارة الفئات
        </h2>
      </div>

      {/* Form */}
      <div className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <div className="flex items-center p-2 text-[rgb(30,64,175)] gap-1 border-b border-[rgba(0,0,0,0.1)]">
          <FaPlus />
          <h4 className="text-[16px] font-[600] mb-1 sm:mb-0">
            إضافة فئة جديدة
          </h4>
        </div>

        <div className="p-4">
          <form className="w-full" onSubmit={handleSubmit}>
            {/* الحقول */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* اسم الفئة */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                >
                  اسم الفئة <span className="text-red-500">*</span>
                </label>
                <TextField
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  className="bg-white"
                />
              </div>

              {/* الوصف */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-gray-700"
                >
                  الوصف
                </label>
                <TextField
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  className="bg-white"
                />
              </div>

              {/* الحالة */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="status"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                >
                  الحالة <span className="text-red-500">*</span>
                </label>
                <Select
                  inputId="status"
                  name="status"
                  options={status}
                  value={formData.status}
                  onChange={handleSelectChange}
                  placeholder="اختر الحالة"
                  isSearchable={false}
                />
              </div>
            </div>

            {/* الأزرار */}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 mt-5">
              <Button
                type="submit"
                className="!bg-green-600 hover:!bg-green-700 !text-white px-6 py-2 rounded-md w-full sm:w-auto"
              >
                حفظ
              </Button>
              <Button
                type="button"
                onClick={() =>
                  setFormData({ name: "", description: "", status: null })
                }
                className="!bg-gray-300 hover:!bg-gray-400 !text-gray-800 px-6 py-2 rounded-md w-full sm:w-auto"
              >
                إلغاء
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <div className="flex items-center p-2 text-[rgb(30,64,175)] gap-1 border-b border-[rgba(0,0,0,0.1)]">
          <h4 className="text-[16px] font-[600] mb-1 sm:mb-0">قائمة الفئات</h4>
        </div>
        {/* جدول عرض النتائج */}
        <div className="w-full px-2 sm:px-3 md:px-4">
          <div className="relative overflow-x-auto mt-4">
            {categories.length > 0 ? (
              <table className="w-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-left rtl:text-right text-gray-600">
                <thead className="text-[11px] sm:text-[12px] md:text-[13px] uppercase bg-[#eef2f7] border-b border-[#c7c7c7] text-gray-700">
                  <tr>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      #
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      اسم الفئة
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      الوصف
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      الحالة
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      عدد المنتجات
                    </th>

                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      الإجراء
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((categorie, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 transition-colors"
                    >
                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        {categorie.name}
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        {categorie.description}
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        {categorie.status}
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        {categorie.productCount}
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Button className="!w-[30px] sm:!w-[35px] !h-[30px] sm:!h-[35px] bg-[#f1f1f1] !border !border-gray-400 !rounded-full hover:!bg-gray-200 !min-w-[30px] sm:!min-w-[35px]">
                            <AiOutlineEdit className="text-primary text-[16px] sm:text-[20px]" />
                          </Button>
                          <Button className="!w-[30px] sm:!w-[35px] !h-[30px] sm:!h-[35px] bg-[#f1f1f1] !border !border-gray-400 !rounded-full hover:!bg-gray-200 !min-w-[30px] sm:!min-w-[35px]">
                            <HiOutlineTrash className="text-[#f22c61] text-[16px] sm:text-[20px]" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-red-500 py-4">
                لا توجد فئات مسجلة حاليًا
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Category;
