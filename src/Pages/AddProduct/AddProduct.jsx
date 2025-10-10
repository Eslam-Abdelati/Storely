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

  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFormData((prev) => ({ ...prev, [name]: selectedOption }));
  };

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

  const generateBarcode = () => {
    let code = "";
    for (let i = 0; i < 11; i++) code += Math.floor(Math.random() * 10);
    setFormData((prev) => ({
      ...prev,
      barcode: code,
      categoryNumber: code,
    }));
  };

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
    <div className="pb-8">
      <h2 className="text-[22px] font-[600] text-[rgb(30,64,175)] mb-4">
        المنتجات / إضافة
      </h2>

      <form onSubmit={handleSubmit}>
        {/* ✅ تقسيم مرن - عمودين على الشاشات الكبيرة وعمود واحد على الموبايل */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* العمود الأول */}
          <div className="w-full lg:w-1/2">
            <div className="card p-4 shadow-sm rounded-md bg-white/60 border border-[rgb(219,234,254)]">
              <h4 className="text-[16px] text-[rgb(30,64,175)] font-[600] mb-2">
                تفاصيل الصنف
              </h4>
              <hr className="mb-3" />

              {/* الاسم و SKU */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="w-full flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-700"
                  >
                    الإسم <span className="text-red-500">*</span>
                  </label>
                  <TextField
                    type="text"
                    id="name"
                    name="name"
                    variant="outlined"
                    size="small"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white"
                    required
                  />
                </div>

                <div className="w-full flex flex-col gap-2">
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
                    variant="outlined"
                    size="small"
                    value={formData.SKU}
                    onChange={handleChange}
                    className="bg-white"
                  />
                </div>
              </div>

              {/* الوصف */}
              <div className="flex flex-col gap-2 mb-4">
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-gray-700"
                >
                  الوصف
                </label>
                <TextField
                  id="description"
                  name="description"
                  variant="outlined"
                  size="small"
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-white"
                />
              </div>

              {/* الصور */}
              <div className="flex flex-col gap-2 mb-4">
                <label
                  htmlFor="images"
                  className="text-sm font-semibold text-gray-700"
                >
                  الصور
                </label>
                <div className="relative p-3 rounded-md border-2 border-dashed border-gray-300 bg-white hover:border-gray-500 flex items-center justify-center gap-4">
                  <MdOutlineCloudUpload className="text-[28px] text-blue-600" />
                  <h4 className="text-gray-500">اختر من جهازك</h4>
                  <input
                    type="file"
                    id="images"
                    multiple
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                </div>

                {/* عرض الصور */}
                <div className="flex flex-col gap-3 mt-2">
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

              {/* الفئة والفئة الفرعية */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    الفئة <span className="text-red-500">*</span>
                  </label>
                  <CreatableSelect
                    name="category"
                    options={categories}
                    value={formData.category}
                    onChange={handleSelectChange}
                    onCreateOption={handleCreateCategory}
                    placeholder="الإفتراضي"
                  />
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    الفئة الفرعية <span className="text-red-500">*</span>
                  </label>
                  <CreatableSelect
                    name="subcategory"
                    options={subcategories}
                    value={formData.subcategory}
                    onChange={handleSelectChange}
                    onCreateOption={handleCreateSubCategory}
                    placeholder="الإفتراضي"
                  />
                </div>
              </div>

              {/* المورد - الوحدة */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    المورد
                  </label>
                  <Select
                    name="supplier"
                    options={supplier}
                    value={formData.supplier}
                    onChange={handleSelectChange}
                    placeholder="الموردين"
                  />
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    الوحدة
                  </label>
                  <Select
                    name="unity"
                    options={unity}
                    value={formData.unity}
                    onChange={handleSelectChange}
                    placeholder="الوحدة"
                    isSearchable={false}
                  />
                </div>
              </div>

              {/* رقم الصنف */}
              <div className="flex flex-col gap-2 mt-4">
                <label className="text-sm font-semibold text-gray-700">
                  رقم الصنف <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <TextField
                    name="categoryNumber"
                    value={formData.categoryNumber}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    className="flex-1 bg-white"
                    required
                  />
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={generateBarcode}
                  >
                    <FaBarcode className="text-[24px]" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* العمود الثاني */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* تفاصيل التسعير */}
            <div className="card p-4 shadow-sm rounded-md bg-white/60 border border-[rgb(219,234,254)]">
              <h4 className="text-[16px] text-[rgb(30,64,175)] font-[600] mb-2">
                تفاصيل التسعير
              </h4>
              <hr className="mb-3" />

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    سعر الشراء <span className="text-red-500">*</span>
                  </label>
                  <TextField
                    name="purchasePrice"
                    variant="outlined"
                    size="small"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    className="bg-white"
                    required
                  />
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    سعر البيع <span className="text-red-500">*</span>
                  </label>
                  <TextField
                    name="sellingPrice"
                    variant="outlined"
                    size="small"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    className="bg-white"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-1/3 flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    أقل سعر بيع
                  </label>
                  <TextField
                    name="LowestPrice"
                    variant="outlined"
                    size="small"
                    value={formData.LowestPrice}
                    onChange={handleChange}
                    className="bg-white"
                  />
                </div>

                <div className="w-full sm:w-1/3 flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    الخصم
                  </label>
                  <TextField
                    name="discount"
                    variant="outlined"
                    size="small"
                    value={formData.discount}
                    onChange={handleChange}
                    className="bg-white"
                  />
                </div>

                <div className="w-full sm:w-1/3 flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    نوع الخصم
                  </label>
                  <Select
                    name="typeDiscount"
                    options={typeDiscount}
                    value={formData.typeDiscount}
                    onChange={handleSelectChange}
                    placeholder="%"
                    isSearchable={false}
                  />
                </div>
              </div>
            </div>

            {/* إدارة المخزون */}
            <div className="card p-4 shadow-sm rounded-md bg-white/60 border border-[rgb(219,234,254)]">
              <h4 className="text-[16px] text-[rgb(30,64,175)] font-[600] mb-2">
                إدارة المخزون
              </h4>
              <hr className="mb-3" />

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    الكمية <span className="text-red-500">*</span>
                  </label>
                  <TextField
                    name="quantity"
                    variant="outlined"
                    size="small"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="bg-white"
                    required
                  />
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    تنبيه الوصول لأقل كمية{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <TextField
                    name="alertQuantity"
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

        {/* أزرار الحفظ والإلغاء */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 mt-4">
          {/* زر الحفظ */}
          <Button
            type="submit"
            disabled={loading}
            className="!bg-green-600 hover:!bg-green-700 !text-white px-6 py-2 rounded-md transition-all duration-200 w-full sm:w-auto"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "حفظ"}
          </Button>

          {/* زر الإلغاء */}
          <Button
            type="button"
            // onClick={handleCancel} // ← ضع هنا الدالة التي تُعيد المستخدم أو تُفرغ النموذج
            className="!bg-gray-300 hover:!bg-gray-400 !text-gray-800 px-6 py-2 rounded-md transition-all duration-200 w-full sm:w-auto"
          >
            إلغاء
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
