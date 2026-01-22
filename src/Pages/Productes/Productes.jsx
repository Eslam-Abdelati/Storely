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
// import Badge from "../../components/Badge/Badge";

// الفئات
const categoryOptions = [
  { value: "", label: "الإفتراضي" },
  { value: "mobiles", label: "موبايلات" },
  { value: "laptops", label: "لابتوبات" },
  { value: "accessories", label: "اكسسوارات" },
];

// الفئات الفرعية
const subCategoryOptions = [
  { value: "", label: "الإفتراضي" },
  { value: "iphone", label: "آيفون" },
  { value: "android", label: "أندرويد" },
  { value: "gaming", label: "Gaming" },
];

// الموردين
const supplierOptions = [
  { value: "", label: "الإفتراضي" },
  { value: "eslam", label: "إسلام" },
  { value: "ahmed", label: "أحمد" },
  { value: "mohamed", label: "محمد" },
  { value: "khaled", label: "خالد" },
  { value: "yousef", label: "يوسف" },
];

// الموردين
const stores = [
  { value: "", label: "الكل" },
  { value: "MGAPH05002", label: "MGAPH05002" },
  { value: "MGAPH06001", label: "MGAPH06001" },
];

// بيانات المنتجات (لازم تتطابق القيم مع الـ value في الـ options)
const allProducts = [
  {
    id: 1,
    code: 11070100094,
    name: "iPhone 15",
    SKU: "123",
    category: "mobiles",
    subcategory: "iphone",
    supplier: "أحمد عمار",
    purchasePrice: 1500, // سعر الشراء
    salePrice: 1900, // سعر البيع
    description: "iPhone 15 بشاشة 6.1 بوصة وذاكرة 128 جيجا",
    quantity: 50, // الكمية المتوفرة
    minQuantity: 5, // أقل كمية قبل التنبيه
  },
  {
    id: 2,
    code: 11070100090,
    name: "Samsung S24",
    SKU: "456",
    category: "mobiles",
    subcategory: "android",
    supplier: "إسلام عمار",
    purchasePrice: 2200,
    salePrice: 2700,
    description: "Samsung S24 بشاشة Dynamic AMOLED وذاكرة 256 جيجا",
    quantity: 35,
    minQuantity: 3,
  },
  {
    id: 3,
    code: 13030200477,
    name: "Dell G15",
    SKU: "789",
    category: "laptops",
    subcategory: "gaming",
    supplier: "محمد حمدي",
    purchasePrice: 2350,
    salePrice: 2900,
    description: "لاب توب Dell G15 للألعاب بمعالج i7 وكارت RTX 3060",
    quantity: 20,
    minQuantity: 2,
  },
  {
    id: 4,
    code: 13030200477,
    name: "Dell G15",
    SKU: "789",
    category: "laptops",
    subcategory: "gaming",
    supplier: "محمد حمدي",
    purchasePrice: 2350,
    salePrice: 2900,
    description: "لاب توب Dell G15 للألعاب بمعالج i7 وكارت RTX 3060",
    quantity: 20,
    minQuantity: 2,
  },
];

function Productes() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    supplier: "",
    SKU: "",
  });

  const [filteredProducts, setFilteredProducts] = useState(allProducts);

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

    let results = allProducts.filter((p) => {
      return (
        (formData.name === "" ||
          p.name.toLowerCase().includes(formData.name.toLowerCase()) ||
          String(p.code).toLowerCase().includes(formData.name.toLowerCase())) &&
        (formData.category === "" || p.category === formData.category) &&
        (formData.subcategory === "" ||
          p.subcategory === formData.subcategory) &&
        (formData.supplier === "" || p.supplier === formData.supplier) &&
        (formData.SKU === "" || p.SKU.includes(formData.SKU))
      );
    });

    setFilteredProducts(results);
  };

  return (
    <>
      {/* 🔹 Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 py-2 sm:py-3 md:py-4">
        <h2 className="text-lg sm:text-lg md:text-xl lg:text-[24px] font-semibold text-[#1e40af]">
          إدارة المنتجات
        </h2>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link to={"/app/category"}>
            <Button className="btn-blue !text-white btn-sm !flex !items-center !gap-1 sm:!gap-2 !text-xs sm:!text-sm md:!text-base xl:!text-lg !px-2 sm:!px-3 !py-1 sm:!py-2">
              الفئات
            </Button>
          </Link>
          <Link to={"/app/add-product"}>
            <Button className="btn-green !text-white btn-sm !flex !items-center !gap-1 sm:!gap-2 !text-xs sm:!text-sm md:!text-base xl:!text-lg !px-2 sm:!px-3 !py-1 sm:!py-2">
              <FaPlus className="text-[14px] sm:text-[16px]" />
              إضافة صنف
            </Button>
          </Link>
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
                  htmlFor="searchByName"
                  className="text-sm font-semibold text-gray-700"
                >
                  البحث بالإسم / كود الصنف
                </label>
                <TextField
                  type="text"
                  id="searchByName"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  className="bg-white"
                />
              </div>

              {/* الفئة */}
              <div className="form-group flex-1 min-w-[250px] flex flex-col gap-2">
                <label
                  htmlFor="selectCategory"
                  className="text-sm font-semibold text-gray-700"
                >
                  الفئة
                </label>
                <Select
                  inputId="selectCategory"
                  name="category"
                  value={
                    categoryOptions.find(
                      (o) => o.value === formData.category
                    ) || categoryOptions[0]
                  }
                  onChange={handleSelectChange}
                  options={categoryOptions}
                  placeholder="الفئات"
                  isSearchable
                  autoComplete="off"
                />
              </div>

              {/* الفئة الفرعية */}
              <div className="form-group flex-1 min-w-[250px] flex flex-col gap-2">
                <label
                  htmlFor="selectSubCategory"
                  className="text-sm font-semibold text-gray-700"
                >
                  الفئة الفرعية
                </label>
                <Select
                  inputId="selectSubCategory"
                  name="subcategory"
                  value={
                    subCategoryOptions.find(
                      (o) => o.value === formData.subcategory
                    ) || subCategoryOptions[0]
                  }
                  onChange={handleSelectChange}
                  options={subCategoryOptions}
                  placeholder="جميع الفئات الفرعية"
                  isSearchable
                  autoComplete="off"
                />
              </div>
            </div>

            {/* الصف الثاني */}
            <div className="w-full flex flex-col sm:flex-row flex-wrap items-stretch justify-between gap-4 mb-4">
              {/* SKU */}
              <div className="form-group flex-1 min-w-[250px] flex flex-col gap-2">
                <label
                  htmlFor="searchBySKU"
                  className="text-sm font-semibold text-gray-700"
                >
                  الباركود SKU
                </label>
                <TextField
                  type="text"
                  id="searchBySKU"
                  name="SKU"
                  value={formData.SKU}
                  onChange={handleInputChange}
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  className="bg-white"
                />
              </div>

              {/* الموردين */}
              <div className="form-group flex-1 min-w-[250px] flex flex-col gap-2">
                <label
                  htmlFor="selectSupplier"
                  className="text-sm font-semibold text-gray-700"
                >
                  الموردين
                </label>
                <Select
                  inputId="selectSupplier"
                  name="supplier"
                  value={
                    supplierOptions.find(
                      (o) => o.value === formData.supplier
                    ) || supplierOptions[0]
                  }
                  onChange={handleSelectChange}
                  options={supplierOptions}
                  placeholder="اختر المورد"
                  isSearchable
                  autoComplete="off"
                />
              </div>

              {/* المستودع */}
              <div className="form-group flex-1 min-w-[250px] flex flex-col gap-2">
                <label
                  htmlFor="selectStore"
                  className="text-sm font-semibold text-gray-700"
                >
                  المستودع
                </label>
                <Select
                  inputId="selectStore"
                  name="stores"
                  value={
                    stores.find((o) => o.value === formData.stores) || stores[0]
                  }
                  onChange={handleSelectChange}
                  options={stores}
                  placeholder="اختر المستودع"
                  isSearchable
                  autoComplete="off"
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
            {filteredProducts.length > 0 ? (
              <table className="w-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-left rtl:text-right text-gray-600">
                <thead className="text-[11px] sm:text-[12px] md:text-[13px] uppercase bg-[#eef2f7] border-b border-[#c7c7c7] text-gray-700">
                  <tr>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      رقم الصنف
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      اسم الصنف
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      الكمية
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      السعر
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      سعر الشراء
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      الفئة
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      المورد
                    </th>
                    <th className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                      الإجراء
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 transition-colors"
                    >
                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        <Link
                          to={`/app/product/${product.id}`}
                          className="text-gray-700 hover:!text-[#1e40af] transition-colors duration-200"
                        >
                          {product.code}
                        </Link>
                      </td>

                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        <Link
                          to={`/app/product/${product.id}`}
                          className="text-gray-700 hover:!text-[#1e40af] transition-colors duration-200"
                        >
                          {product.name}
                        </Link>
                      </td>

                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap text-start">
                        <div className="flex flex-col items-center gap-1">
                          {product.quantity}
                          {/* <Badge status="في المخزون" /> */}
                        </div>
                      </td>

                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        {product.salePrice} ج.م
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        {product.purchasePrice} ج.م
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        {product.category}
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        {product.supplier}
                      </td>

                      <td className="px-2 sm:px-4 md:px-6 py-2 whitespace-nowrap">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Link to={`/app/product/${product.id}`}>
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

                  <tr>
                    <td
                      colSpan="2"
                      className="font-semibold px-2 sm:px-4 md:px-6 py-2 text-[#1e40af]"
                    >
                      إجمالي المنتجات
                    </td>
                    <td className="text-center font-semibold px-2 sm:px-4 md:px-6 py-2">
                      {filteredProducts.length}
                    </td>
                    <td
                      colSpan="2"
                      className="font-semibold px-2 sm:px-4 md:px-6 py-2 text-[#1e40af]"
                    >
                      إجمالي الشراء
                    </td>
                    <td
                      colSpan="2"
                      className="font-semibold px-2 sm:px-4 md:px-6 py-2"
                    >
                      {filteredProducts
                        .reduce(
                          (acc, p) => acc + p.purchasePrice * p.quantity,
                          0
                        )
                        .toFixed(2)}{" "}
                      ج.م
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p className="text-red-500 text-sm sm:text-base mt-3">
                لا يوجد منتجات مطابقة للبحث
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Productes;
