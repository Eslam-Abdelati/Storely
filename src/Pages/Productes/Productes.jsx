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
import Badge from "../../components/Badge/Badge";

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
      {/* Header */}
      <div className="flex items-center justify-between py-0">
        <h2 className="text-[22px] font-[600] text-[rgb(30,64,175)]">
          إدارة المنتجات
        </h2>

        <div className="flex items-center gap-3">
          <Link to={"category"}>
            <Button className="btn-blue !text-white btn-sm flex items-center gap-2">
              الفئات
            </Button>
          </Link>
          <Link to={"add-product"}>
            <Button className="btn-green !text-white btn-sm flex items-center gap-2">
              <FaPlus className="text-[16px]" />
              إضافة صنف
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <div className="flex items-center bg-white p-2 text-[rgb(30,64,175)] gap-1 shadow-sm ">
          <h4 className="text-[16px] font-[600] mb-2 lg:mb-0">بحث</h4>
          <IoSearch />
        </div>
        <div className="flex items-center  px-5 py-4">
          <form className="w-full" onSubmit={handleSearch}>
            <div className="w-full flex items-center justify-between gap-3 mb-4">
              {/* البحث بالاسم */}
              <div className="form-group w-full flex flex-col gap-2">
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
              <div className="form-group w-full flex flex-col gap-2">
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
              <div className="form-group w-full flex flex-col gap-2">
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

            <div className="w-full flex items-center justify-between gap-3 mb-4">
              {/* SKU */}
              <div className="form-group w-full flex flex-col gap-2">
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
              <div className="form-group w-full flex flex-col gap-2">
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
              <div className="form-group w-full flex flex-col gap-2">
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
                  placeholder="اختر المورد"
                  isSearchable
                  autoComplete="off"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="btn-blue !text-white btn-sm flex items-center gap-2"
            >
              بحث
            </Button>
          </form>
        </div>
      </div>

      {/* جدول عرض النتائج */}
      <div className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <div className="relative overflow-x-auto mt-5">
          {filteredProducts.length > 0 ? (
            <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
                <tr className="">
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    رقم الصنف
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    اسم الصنف
                  </th>

                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    الكمية
                  </th>

                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    السعر
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    سعر الشراء
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    الفئة
                  </th>

                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    المورد
                  </th>

                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    الإجراء
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((Producte, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 "
                  >
                    <td className="px-6 py-2 whitespace-nowrap">
                      <Link
                        to={"/app/product/1"}
                        className=" hover:!text-primary"
                      >
                        {Producte.code}
                      </Link>
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap">
                      <Link
                        to={"/app/product/1"}
                        className=" hover:!text-primary"
                      >
                        {Producte.name}
                      </Link>
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="flex flex-col items-center">
                        <Badge status="في المخزون" />
                        {Producte.quantity}
                      </div>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      {Producte.salePrice} ج.م
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      {Producte.purchasePrice} ج.م
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      {Producte.category}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      {Producte.supplier}
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Link to="product/1">
                          <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                            <FaRegEye className="text-[#10b981] text-[20px] " />
                          </Button>
                        </Link>
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
                <tr>
                  <td
                    colSpan="2"
                    className="font-semibold px-6 py-2 whitespace-nowrap text-[rgb(30,64,175)]"
                  >
                    إجمالي المنتجات
                  </td>
                  <td className="text-center font-semibold px-6 py-2 whitespace-nowrap">
                    {filteredProducts.length}
                  </td>
                  <td
                    colSpan="1"
                    className="font-semibold px-6 py-2 whitespace-nowrap text-[rgb(30,64,175)]"
                  >
                    إجمالي الشراء
                  </td>
                  <td className="font-semibold px-6 py-2 whitespace-nowrap">
                    {filteredProducts
                      .reduce(
                        (acc, product) =>
                          acc + product.purchasePrice * product.quantity,
                        0
                      )
                      .toFixed(2)}{" "}
                    ج.م
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p className="text-red-500">لا يوجد منتجات مطابقة للبحث</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Productes;
