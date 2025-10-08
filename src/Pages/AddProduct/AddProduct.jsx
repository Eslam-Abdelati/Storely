import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { FaRegImage, FaBarcode } from "react-icons/fa";
import { MdOutlineCloudUpload, MdDelete, MdEdit } from "react-icons/md";

import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";




const supplier = [
  { value: "1", label: "المورد الاول" },
  { value: "2", label: "المورد التاني" },
  { value: "3", label: "المورد التالت" },
];
const unity = [
  { value: "kg", label: "كيلو" },
  { value: "l", label: "لتر" },
  { value: "pcs", label: "قطعة" },
];
const typeDiscount = [
  { value: "%", label: "%" },
  { value: "EGP", label: "EGP" },
];
function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    SKU: "",
    description: "",
    category: null,
    subcategory: null,
    supplier: null,
    unity: null,
    categoryNumber: "",
    purchasePrice: "",
    sellingPrice: "",
    LowestPrice: "",
    discount: "",
    typeDiscount: null,
    quantity: "",
    alertQuantity: "",
    barcode: "",
    images: [],
  });
 const [categories, setCategories] = useState([
    { value: "electronics", label: "الكترونيات" },
    { value: "clothes", label: "ملابس" },
  ]);
  const [subcategories, setSubcategories] = useState([
    { value: "phones", label: "موبايلات" },
    { value: "laptops", label: "لابتوبات" },
  ]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 📌 لتحديث الـ Select
  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta; // name جاي من select
    setFormData((prev) => ({ ...prev, [name]: selectedOption }));
  };
  // رفع الصور
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // توليد باركود من 11 رقم
  const generateBarcode = () => {
    let code = "";
    for (let i = 0; i < 11; i++) {
      code += Math.floor(Math.random() * 10);
    }
    setFormData((prev) => ({
      ...prev,
      barcode: code,
      categoryNumber: code,
    }));
  };

  // 📌 إضافة عنصر جديد
  const handleCreateCategory = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setCategories((prev) => [...prev, newOption]);
    setFormData((prev) => ({ ...prev, category: newOption }));
  };

  const handleCreateSubCategory = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setSubcategories((prev) => [...prev, newOption]);
    setFormData((prev) => ({ ...prev, subcategory: newOption }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form submitted", formData);
    toast.success("تم إضافة المنتج بنجاح");
  };

  return (
    <div>
      <h2 className="text-[22px] font-[600] text-[rgb(30,64,175)] mb-4">
        المنتجات / إضافة
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-4">
          {/* العمود الأول */}
          <div className="col1 w-[50%]">
            <div className="card p-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
              <h4 className="text-[16px] text-[rgb(30,64,175)] font-[600] mb-2">
                تفاصيل الصنف
              </h4>
              <hr />

              {/* الاسم و SKU */}
              <div className="w-full flex items-center justify-between gap-3 mb-4 pt-3">
                <div className="form-group w-full flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                  >
                    الإسم
                    <span className="text-red-500">*</span>
                  </label>
                  <TextField
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="off"
                    variant="outlined"
                    size="small"
                    value={formData.name}
                    className="bg-white"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group w-full flex flex-col gap-2">
                  <label
                    htmlFor="SKU"
                    className="text-sm font-semibold text-gray-700"
                  >
                    الباركود SKU
                  </label>
                  <TextField
                    type="text"
                    id="SKU"
                    name="SKU"
                    autoComplete="off"
                    variant="outlined"
                    size="small"
                    value={formData.SKU}
                    className="bg-white"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* الوصف */}
              <div className="form-group w-full flex flex-col gap-2">
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-gray-700"
                >
                  الوصف
                </label>
                <TextField
                  id="description"
                  name="description"
                  autoComplete="off"
                  variant="outlined"
                  value={formData.description}
                  className="bg-white"
                  onChange={handleChange}
                />
              </div>

              {/* الصور */}
              <div className="form-group w-full flex flex-col gap-2 mt-4">
                <label
                  htmlFor="images"
                  className="text-sm font-semibold text-gray-700"
                >
                  الصور
                </label>
                <div className="uploadBox relative cursor-pointer p-3 rounded-md border-2 border-dashed border-gray-300 bg-white hover:border-gray-500 flex items-center gap-4">
                  <FaRegImage className="text-[30px] opacity-15 pointer-events-none" />
                  <MdOutlineCloudUpload className="text-[30px] mr-7 text-primary pointer-events-none" />
                  <h4 className="text-gray-500 pointer-events-none">
                    اختر من جهازك
                  </h4>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    autoComplete="off"
                    multiple
                    className="absolute top-0 left-0 w-full h-full z-50 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                </div>

                {/* عرض الصور */}
                <div className="flex flex-col gap-3 mt-4">
                  {formData.images.map((img, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 border p-2 rounded-md shadow-sm bg-white"
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-[50px] h-[50px] object-cover rounded border"
                      />
                      <span className="flex-1 text-sm text-gray-700 truncate">
                        {img.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="p-1 rounded-full hover:bg-blue-100 text-blue-600"
                        >
                          <MdEdit size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemove(index)}
                          className="p-1 rounded-full hover:bg-red-100 text-red-600"
                        >
                          <MdDelete size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* الفئة - الفئة الفرعية */}
              <div className="w-full flex items-center justify-between gap-3 mt-4">
                <div className="form-group w-full flex flex-col gap-2">
                  <label
                    htmlFor="category"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                  >
                    الفئه
                    <span className="text-red-500">*</span>
                  </label>

                  <CreatableSelect
                    inputId="category"
                    name="category"
                    options={categories}
                    value={formData.category}
                    onChange={handleSelectChange}
                    onCreateOption={handleCreateCategory}
                    placeholder="الإفتراضي"
                    isSearchable
                    autoComplete="off"
                  />
                </div>

                <div className="form-group w-full flex flex-col gap-2">
                  <label
                    htmlFor="subcategory"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                  >
                    الفئة الفرعية
                    <span className="text-red-500">*</span>
                  </label>
                  <CreatableSelect
                    inputId="subcategory"
                    name="subcategory"
                    options={subcategories}
                    value={formData.subcategory}
                    onChange={handleSelectChange}
                    onCreateOption={handleCreateSubCategory}
                    placeholder="الإفتراضي"
                    isSearchable
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* المورد - الوحدة */}
              <div className="w-full flex items-center justify-between gap-3 mt-4">
                <div className="form-group w-full flex flex-col gap-2">
                  <label
                    htmlFor="supplier"
                    className="text-sm font-semibold text-gray-700"
                  >
                    المورد
                  </label>
                  <Select
                    inputId="supplier"
                    name="supplier"
                    options={supplier}
                    value={formData.supplier}
                    onChange={handleSelectChange}
                    placeholder="الموردين"
                    isSearchable
                    autoComplete="off"
                  />
                </div>

                <div className="form-group w-full flex flex-col gap-2">
                  <label
                    htmlFor="unity"
                    className="text-sm font-semibold text-gray-700"
                  >
                    الوحدة
                  </label>
                  <Select
                    inputId="unity"
                    name="unity"
                    options={unity}
                    value={formData.unity}
                    onChange={handleSelectChange}
                    placeholder="الوحدة"
                    autoComplete="off"
                    isSearchable={false}
                  />
                </div>
              </div>

              {/* رقم الصنف */}
              <div className="form-group w-full flex flex-col gap-2 mt-4">
                <label
                  htmlFor="categoryNumber"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                >
                  رقم الصنف
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <TextField
                    id="categoryNumber"
                    name="categoryNumber"
                    autoComplete="off"
                    value={formData.categoryNumber}
                    variant="outlined"
                    size="small"
                    className="flex-1 bg-white"
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="outlined"
                    className="!text-gray-700"
                    onClick={generateBarcode}
                  >
                    <FaBarcode className="text-[28px]" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* العمود الثاني */}
          <div className="col2 w-[50%]">
            {/* تفاصيل التسعير */}
            <div className="card mb-4 p-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
              <h4 className="text-[16px] text-[rgb(30,64,175)] font-[600] mb-2">
                تفاصيل التسعير
              </h4>
              <hr />

              <div className="w-full flex items-center justify-between gap-3 mb-4 pt-3">
                <div className="form-group w-full flex flex-col gap-2">
                  <label
                    htmlFor="purchasePrice"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                  >
                    سعر الشراء
                    <span className="text-red-500">*</span>
                  </label>
                  <TextField
                    id="purchasePrice"
                    name="purchasePrice"
                    autoComplete="off"
                    variant="outlined"
                    size="small"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    className="bg-white"
                    required
                  />
                </div>

                <div className="form-group w-full flex flex-col gap-2">
                  <label
                    htmlFor="sellingPrice"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                  >
                    سعر البيع
                    <span className="text-red-500">*</span>
                  </label>
                  <TextField
                    type="text"
                    id="sellingPrice"
                    name="sellingPrice"
                    autoComplete="off"
                    variant="outlined"
                    size="small"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    className="bg-white"
                    required
                  />
                </div>
              </div>

              <div className="w-full flex items-center justify-between gap-3">
                <div className="form-group w-[40%] flex flex-col gap-2">
                  <label
                    htmlFor="LowestPrice"
                    className="text-sm font-semibold text-gray-700"
                  >
                    أقل سعر بيع
                  </label>
                  <TextField
                    type="text"
                    id="LowestPrice"
                    name="LowestPrice"
                    autoComplete="off"
                    variant="outlined"
                    size="small"
                    value={formData.LowestPrice}
                    onChange={handleChange}
                    className="bg-white"
                  />
                </div>

                <div className="form-group w-[20%] flex flex-col gap-2">
                  <label
                    htmlFor="discount"
                    className="text-sm font-semibold text-gray-700"
                  >
                    الخصم
                  </label>
                  <TextField
                    type="text"
                    id="discount"
                    name="discount"
                    autoComplete="off"
                    variant="outlined"
                    size="small"
                    value={formData.discount}
                    onChange={handleChange}
                    className="bg-white"
                  />
                </div>

                <div className="form-group w-[40%] flex flex-col gap-2">
                  <label
                    htmlFor="typeDiscount"
                    className="text-sm font-semibold text-gray-700"
                  >
                    نوع الخصم
                  </label>
                  <Select
                    inputId="typeDiscount"
                    name="typeDiscount"
                    options={typeDiscount}
                    value={formData.typeDiscount}
                    onChange={handleSelectChange}
                    placeholder="%"
                    autoComplete="off"
                    isSearchable={false}
                  />
                </div>
              </div>
            </div>

            {/* إدارة المخزون */}
            <div className="card p-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
              <h4 className="text-[16px] text-[rgb(30,64,175)] font-[600] mb-2">
                إدارة المخزون
              </h4>
              <hr />
              <div className="w-full flex items-center justify-between gap-3 pt-3">
                <div className="form-group w-full flex flex-col gap-2">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                  >
                    الكمية
                    <span className="text-red-500">*</span>
                  </label>
                  <TextField
                    id="quantity"
                    name="quantity"
                    autoComplete="off"
                    variant="outlined"
                    size="small"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="bg-white"
                    required
                  />
                </div>

                <div className="form-group w-full flex flex-col gap-2">
                  <label
                    htmlFor="alertQuantity"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                  >
                    تنبيه الوصول لاقل كمية
                    <span className="text-red-500">*</span>
                  </label>
                  <TextField
                    id="alertQuantity"
                    name="alertQuantity"
                    autoComplete="off"
                    variant="outlined"
                    size="small"
                    value={formData.alertQuantity}
                    onChange={handleChange}
                    className="bg-white"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full mt-3 mb-3">
          {/* زر الحفظ */}
          <Button
            type="submit"
            disabled={loading}
            className="btn-green !text-white btn-sm flex items-center gap-2"
          >
            {loading ? <CircularProgress size={28} color="inherit" /> : "حفظ"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
