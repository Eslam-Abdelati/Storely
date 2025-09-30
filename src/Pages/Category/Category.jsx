import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FaPlus } from "react-icons/fa6";
import Select from "react-select";
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { FaRegEye } from "react-icons/fa";

const status = [
  {
    value: "مفعل",
    label: "مفعل",
  },
  {
    value: "غير مفعل",
    label: "غير مفعل",
  },
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
  const [formData, setFormData] = React.useState([
    {
      name: "",
      decription: "",
      status: null,
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 📌 لتحديث الـ Select
  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta; // name جاي من select
    setFormData((prev) => ({ ...prev, [name]: selectedOption }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data:", formData);
  };
  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between py-0">
        <h2 className="text-[22px] font-[600] text-[rgb(30,64,175)]">
          إدارة الفئات
        </h2>
      </div>

      {/* Add New Category */}
      <div className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <div className="flex items-center p-4 text-[rgb(30,64,175)] gap-1 ">
          <h4 className="text-[16px] font-[600] mb-2 lg:mb-0 flex items-center gap-2">
            <FaPlus />
            إضافة فئة جديدة
          </h4>
        </div>
        <div className="flex items-center  px-5 py-4">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full flex items-center justify-between gap-3 mb-4">
              {/* البحث بالاسم */}
              <div className="form-group w-full flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                >
                  اسم الفئة
                  <span className="text-red-500">*</span>
                </label>
                <TextField
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  className="bg-white"
                />
              </div>
              <div className="form-group w-full flex flex-col gap-2">
                <label
                  htmlFor="decription"
                  className="text-sm font-semibold text-gray-700"
                >
                  الوصف
                </label>
                <TextField
                  type="text"
                  id="decription"
                  name="decription"
                  value={formData.decription}
                  onChange={handleInputChange}
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  className="bg-white"
                />
              </div>

              {/* الفئة */}
              <div className="form-group w-full flex flex-col gap-2">
                <label
                  htmlFor="status"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                >
                  الحالة
                  <span className="text-red-500">*</span>
                </label>
                <Select
                  inputId="status"
                  name="status"
                  options={status}
                  value={formData.status}
                  onChange={handleSelectChange}
                  placeholder="مفعل"
                  isSearchable={false}
                  autoComplete="off"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="btn-green !text-white btn-sm flex items-center gap-2"
            >
              حفظ
            </Button>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <div className="flex items-center p-4 text-[rgb(30,64,175)] gap-1 ">
          <h4 className="text-[16px] font-[600] mb-2 lg:mb-0 flex items-center gap-2">
            قائمة الفئات
          </h4>
        </div>

        <div className="relative overflow-x-auto">
          {categories.length > 0 ? (
            <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
                <tr className="">
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    اسم الفئة
                  </th>

                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    الوصف
                  </th>

                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    الحالة
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    عدد المنتجات
                  </th>

                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    الإجراء
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((categorie, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 "
                  >
                    <td className="px-6 py-2 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      {categorie.name}
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap">
                      {categorie.description}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      {categorie.status}
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap">
                      {categorie.productCount}
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                          <AiOutlineEdit className="text-primary text-[20px] " />
                        </Button>
                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                          <HiOutlineTrash className="text-[#f22c61] text-[20px] " />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-red-500">لا يوجد منتجات مطابقة للبحث</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Category;
