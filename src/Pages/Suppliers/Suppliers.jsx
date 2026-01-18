import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import Select from "react-select";

import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";

const allSupliers = [
  {
    id: 1,
    value: "el-nour",
    label: "شركة النور للتوريدات",
    tradeName: "النور",
    supplierNumber: "SUP001",
    supplierName: "أحمد علي",
    supplierEmail: "ahmed.elnour@example.com",
    supplierPhone: "01012345678",
    supplierAddress: "القاهرة - مدينة نصر",
  },
  {
    id: 2,
    value: "el-tamayoz",
    label: "مؤسسة التميز التجارية",
    tradeName: "التميز",
    supplierNumber: "SUP002",
    supplierName: "محمود عبد الرحمن",
    supplierEmail: "mahmoud.tamayoz@example.com",
    supplierPhone: "01098765432",
    supplierAddress: "الجيزة - الهرم",
  },
  {
    id: 3,
    value: "el-fajr",
    label: "شركة الفجر الحديثة",
    tradeName: "الفجر",
    supplierNumber: "SUP003",
    supplierName: "إسلام عمار",
    supplierEmail: "eslam.fajr@example.com",
    supplierPhone: "01234567890",
    supplierAddress: "الإسكندرية - سيدي بشر",
  },
  {
    id: 4,
    value: "techno",
    label: "تكنو تريد للاستيراد",
    tradeName: "تكنو تريد",
    supplierNumber: "SUP004",
    supplierName: "كريم محمد",
    supplierEmail: "karim.techno@example.com",
    supplierPhone: "01111122334",
    supplierAddress: "المنصورة - شارع الجيش",
  },
  {
    id: 5,
    value: "smart",
    label: "سمارت سيستم",
    tradeName: "سمارت",
    supplierNumber: "SUP005",
    supplierName: "محمد حسن",
    supplierEmail: "mohamed.smart@example.com",
    supplierPhone: "01055667788",
    supplierAddress: "طنطا - شارع البحر",
  },
  {
    id: 6,
    value: "el-hoda",
    label: "الهدى للتوريدات العامة",
    tradeName: "الهدى",
    supplierNumber: "SUP006",
    supplierName: "خالد يوسف",
    supplierEmail: "khaled.hoda@example.com",
    supplierPhone: "01099887766",
    supplierAddress: "السويس - حي الأربعين",
  },
  {
    id: 7,
    value: "future",
    label: "فيوتشر تريد",
    tradeName: "فيوتشر",
    supplierNumber: "SUP007",
    supplierName: "مصطفى طارق",
    supplierEmail: "mostafa.future@example.com",
    supplierPhone: "01144556677",
    supplierAddress: "أسيوط - شارع الجمهورية",
  },
  {
    id: 8,
    value: "al-safa",
    label: "الصفا جروب",
    tradeName: "الصفا",
    supplierNumber: "SUP008",
    supplierName: "ياسر عبد الله",
    supplierEmail: "yasser.safa@example.com",
    supplierPhone: "01299887755",
    supplierAddress: "دمياط - رأس البر",
  },
  {
    id: 9,
    value: "golden",
    label: "جولدن تريد",
    tradeName: "جولدن",
    supplierNumber: "SUP009",
    supplierName: "إيهاب سمير",
    supplierEmail: "ehab.golden@example.com",
    supplierPhone: "01033445566",
    supplierAddress: "بني سويف - شارع صلاح سالم",
  },
  {
    id: 10,
    value: "el-masria",
    label: "الشركة المصرية للاستيراد",
    tradeName: "المصرية",
    supplierNumber: "SUP010",
    supplierName: "حسام إبراهيم",
    supplierEmail: "hesham.masria@example.com",
    supplierPhone: "01166778899",
    supplierAddress: "الشرقية - الزقازيق",
  },
];

function Suppliers() {
  const [formData, setFormData] = useState({
    supplierNumber: "",
    supplierName: "",
    supplierEmail: "",
    supplierPhone: "",
  });

  const [filteredSupliers, setFilteredSupliers] = useState(allSupliers);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (selected, action) => {
    setFormData({
      ...formData,
      [action.name]: selected ? selected.value : "",
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const searchLower = {
      supplierNumber: formData.supplierNumber.toLowerCase(),
      supplierName: formData.supplierName.toLowerCase(),
      supplierEmail: formData.supplierEmail.toLowerCase(),
      supplierPhone: formData.supplierPhone.toLowerCase(),
    };

    const results = allSupliers.filter((s) => {
      return (
        (searchLower.supplierNumber === "" ||
          s.supplierNumber
            .toLowerCase()
            .includes(searchLower.supplierNumber)) &&
        (searchLower.supplierName === "" || // ✅ هنا "الكل" ترجع فارغة فلا تؤثر
          s.supplierName.toLowerCase().includes(searchLower.supplierName) ||
          s.label.toLowerCase().includes(searchLower.supplierName)) &&
        (searchLower.supplierEmail === "" ||
          s.supplierEmail.toLowerCase().includes(searchLower.supplierEmail)) &&
        (searchLower.supplierPhone === "" ||
          s.supplierPhone.toLowerCase().includes(searchLower.supplierPhone))
      );
    });

    setFilteredSupliers(results);
  };

  return (
    <>
      {/* 🔹 Header */}
      <div className="card shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="w-full sm:w-auto sm:text-start">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-[24px] font-semibold text-[#1e40af] flex items-center  sm:justify-start gap-2">
              {/* <TbFileInvoice className="text-[20px] sm:text-[22px] lg:text-[26px]" /> */}
              الموردين
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
            <Button className="btn-blue !text-white btn-sm !flex !items-center !gap-1 sm:!gap-2 !text-xs sm:!text-sm md:!text-base xl:!text-lg !px-2 sm:!px-3 !py-1 sm:!py-2">
              إستيراد
            </Button>
            <Link to={"/app/add-suplier"}>
              <Button className="btn-green !text-white btn-sm !flex !items-center !gap-1 sm:!gap-2 !text-xs sm:!text-sm md:!text-base xl:!text-lg !px-2 sm:!px-3 !py-1 sm:!py-2">
                <FaPlus className="text-[14px] sm:text-[16px]" />
                أضف مورد
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <div className="flex items-center p-2 text-[rgb(30,64,175)] gap-1 border-b border-[rgba(0,0,0,0.1)]">
          <h4 className="text-[16px] font-[600] mb-1 sm:mb-0">بحث</h4>
          <IoSearch />
        </div>

        {/* Form */}
        <div className="px-5 py-4">
          <form className="w-full" onSubmit={handleSearch}>
            {/* الصف الأول */}
            <div className="w-full flex flex-col sm:flex-row flex-wrap items-stretch justify-between gap-4 mb-4">
              {/* البحث بالاسم */}
              <div className="form-group flex-1 min-w-[250px] flex flex-col gap-2">
                <label
                  htmlFor="supplierNumber"
                  className="text-sm font-semibold text-gray-700"
                >
                  رقم المورد
                </label>
                <TextField
                  type="text"
                  id="supplierNumber"
                  name="supplierNumber"
                  value={formData.supplierNumber}
                  onChange={handleInputChange}
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  className="bg-white"
                />
              </div>
              <div className="form-group flex-1 min-w-[250px] flex flex-col gap-2">
                <label
                  htmlFor="supplierName"
                  className="text-sm font-semibold text-gray-700"
                >
                  الموردين
                </label>
                <Select
                  inputId="supplierName"
                  name="supplierName"
                  value={
                    formData.supplierName
                      ? {
                          label: formData.supplierName,
                          value: formData.supplierName,
                        }
                      : { label: "الكل", value: "" }
                  }
                  onChange={handleSelectChange}
                  options={[
                    { label: "الكل", value: "" },
                    ...allSupliers.map((s) => ({
                      label: s.label,
                      value: s.label,
                    })),
                  ]}
                  placeholder="اختر المورد"
                  isSearchable
                />
              </div>

              {/* <div className="form-group flex-1 min-w-[250px] flex flex-col gap-2">
                <label
                  htmlFor="supplierName"
                  className="text-sm font-semibold text-gray-700"
                >
                  المورد
                </label>
                <TextField
                  type="text"
                  id="supplierName"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleInputChange}
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  className="bg-white"
                />
              </div> */}

              <div className="form-group flex-1 min-w-[250px] flex flex-col gap-2">
                <label
                  htmlFor="supplierEmail"
                  className="text-sm font-semibold text-gray-700"
                >
                  البريد الإلكتروني
                </label>
                <TextField
                  type="text"
                  id="supplierEmail"
                  name="supplierEmail"
                  value={formData.supplierEmail}
                  onChange={handleInputChange}
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  className="bg-white"
                />
              </div>
            </div>

            {/* الصف الثاني */}
            <div className="w-full flex flex-col sm:flex-row flex-wrap items-stretch justify-between gap-4 mb-4">
              <div className="form-group  min-w-[250px] flex flex-col gap-2">
                <label
                  htmlFor="supplierPhone"
                  className="text-sm font-semibold text-gray-700"
                >
                  الهاتف
                </label>
                <TextField
                  type="text"
                  id="supplierPhone"
                  name="supplierPhone"
                  value={formData.supplierPhone}
                  onChange={handleInputChange}
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  className="bg-white"
                />
              </div>
            </div>

            {/* زر البحث */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="btn-blue !text-white btn-sm !flex !items-center !gap-1 sm:!gap-2 !text-xs sm:!text-sm md:!text-base xl:!text-lg !px-2 sm:!px-3 !py-1 sm:!py-2"
              >
                بحث
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* جدول عرض النتائج */}
      <div className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <div className="flex items-center p-2 text-[rgb(30,64,175)] gap-1 border-b border-[rgba(0,0,0,0.1)] ">
          <h4 className="text-[16px] font-[600] mb-1 sm:mb-0">قائمةالمنتجات</h4>
        </div>
        <div className="w-full px-2 sm:px-3 md:px-4">
          <div className="relative overflow-x-auto mt-4">
            {filteredSupliers.length > 0 ? (
              <table className="w-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-left rtl:text-right text-gray-600">
                <thead className="text-[11px] sm:text-[12px] md:text-[13px] uppercase bg-[#eef2f7] border-b border-[#c7c7c7] text-gray-700">
                  <tr>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      الإسم التجاري
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      كود المورد
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      اسم المورد
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      العنوان
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      الهاتف
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      الإجراء
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSupliers.map((supliers, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 transition-colors"
                    >
                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        <Link
                          to={`/app/product/${supliers.id}`}
                          className="text-gray-700 hover:!text-[#1e40af] transition-colors duration-200"
                        >
                          {supliers.label}
                        </Link>
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        {supliers.supplierNumber}
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        {supliers.supplierName}
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        {supliers.supplierAddress}
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        {supliers.supplierPhone}
                      </td>

                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Link to={`/app/product/${supliers.id}`}>
                            <Button className="!w-[30px] sm:!w-[35px] !h-[30px] sm:!h-[35px]  bg-[#f1f1f1] !border !border-gray-400 !rounded-full hover:!bg-gray-200 !min-w-[30px] sm:!min-w-[35px]">
                              <FaRegEye className="text-[#10b981] text-[16px] sm:text-[20px]" />
                            </Button>
                          </Link>
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
              <p className="text-red-500 text-sm sm:text-base mt-3">
                لا يوجد موردين مطابقة للبحث
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Suppliers;
