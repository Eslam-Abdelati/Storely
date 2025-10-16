import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Select from "react-select";
import { TbFileInvoice } from "react-icons/tb";
import PrintInvoice from "../../components/PrintInvoice/PrintInvoice";
import AddClient from "../../components/AddClient/AddClient";
import "../../components/PrintInvoice/invoice-print.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  customersList, // العميل
  productsList, // المنتجات
  employeesList, // الموظفين
  invoicesList, // الفواتير
} from "../../data/data";

const discountOptions = [
  { value: "ج.م", label: "EGP" },
  { value: "percent", label: "%" },
];
// 🧮 دالة توليد رقم الفاتورة
const generateInvoiceNumber = () => {
  const today = new Date();
  const datePart = today.toISOString().split("T")[0].replace(/-/g, ""); // 20251016
  const todayInvoices = invoicesList.filter((inv) =>
    inv.invoiceNumber.includes(datePart)
  );

  const nextNumber = todayInvoices.length + 1;
  const formattedNumber = String(nextNumber).padStart(3, "0");
  return `INV-${datePart}-${formattedNumber}`;
};

function AddSalesInvoice() {
  const [formData, setFormData] = useState({
    invoiceNumber: generateInvoiceNumber(),
    selectedCustomer: null,
    salesman: null,
    date: new Date().toISOString().split("T")[0],
    releaseDate: new Date().toISOString().split("T")[0],
    paymentMethod: "نقدي",
  });
  const [cartItems, setCartItems] = useState([
    {
      barcode: "",
      name: "",
      qty: 0,
      price: 0,
      discount: 0,
      discountType: "value",
    },
  ]);
  const [barcodeInput, setBarcodeInput] = useState("");
  const barcodeInputRef = useRef(null);
  const [openClientModal, setOpenClientModal] = useState(false);

  const handleClickOpen = () => {
    setOpenClientModal(true);
  };
  const handleClose = () => {
    setOpenClientModal(false);
  };
  // التعامل مع تغييرات  الحقول
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // التعامل مع تغييرات حقل السيليكت
  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption,
    }));
  };

  const handleSelectProduct = (selected, index) => {
    if (!selected) return;
    const product = productsList.find((p) => p.barcode === selected.value);
    if (!product) return;
    // ✅ تحقق أولًا خارج setState لتجنب التحديث الخاطئ
    const isExist = cartItems.some(
      (item, i) => item.barcode === product.barcode && i !== index
    );
    if (isExist) {
      alert("⚠️ هذا المنتج موجود بالفعل في الفاتورة!");
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...product,
        qty: 1,
        discount: 0,
        discountType: "value",
      };

      // ✅ لو آخر صف تم تعبئته، أضف صف جديد تلقائي
      if (index === prev.length - 1) {
        updated.push({
          barcode: "",
          name: "",
          qty: 0,
          price: 0,
          discount: 0,
          discountType: "value",
        });
      }
      return updated;
    });
  };

  // ✅ عند تمرير باركود (Enter)
  const handleBarcodeKeyUp = (e) => {
    if (e.key === "Enter") {
      const code = barcodeInput.trim();
      if (!code) return;
      const product = productsList.find((p) => p.barcode === code);
      if (!product) {
        alert("❌ المنتج غير موجود");
        setBarcodeInput("");
        return;
      }
      setCartItems((prev) => {
        const isExist = prev.find((item) => item.barcode === product.barcode);
        if (isExist) {
          // ✅ لو المنتج موجود، زوّد الكمية فقط
          return prev.map((item) =>
            item.barcode === product.barcode
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        }
        // ✅ لو المنتج غير موجود، ابحث عن أول صف فارغ لتعبئته
        const emptyIndex = prev.findIndex((item) => !item.barcode);
        const updated = [...prev];
        if (emptyIndex !== -1) {
          updated[emptyIndex] = {
            ...product,
            qty: 1,
            discount: 0,
            discountType: "value",
          };
        } else {
          updated.push({ ...product, qty: 1, discount: 0 });
        }
        // لو آخر صف ممتلئ أضف صف جديد فارغ
        if (updated[updated.length - 1].barcode) {
          updated.push({
            barcode: "",
            name: "",
            qty: 0,
            price: 0,
            discount: 0,
            discountType: "value",
          });
        }
        return updated;
      });
      setBarcodeInput("");
      barcodeInputRef.current.focus();
    }
  };

  // التعامل مع تغييرات حقل الباركود
  const handleBarcodeChange = (e) => {
    setBarcodeInput(e.target.value);
  };

  // حذف منتج من الفاتورة
  const handleDeleteItem = (barcode) => {
    setCartItems((prev) => prev.filter((item) => item.barcode !== barcode));
  };

  // تغيير الكمية أو الخصم أو الضريبة
  const handleItemChange = (barcode, field, value) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.barcode === barcode
          ? {
              ...item,
              [field]: field === "discountType" ? value : Number(value), // 👈 التعديل هنا
            }
          : item
      )
    );
  };

  // const handleCancel = () => {
  //   if (
  //     window.confirm(
  //       "هل أنت متأكد من إلغاء الفاتورة؟ سيتم فقدان جميع البيانات."
  //     )
  //   ) {
  //     // إعادة تعيين جميع الحقول إلى القيم الافتراضية
  //     setFormData({
  //       invoiceNumber: "INV-2025107-001",
  //       selectedCustomer: null,
  //       salesman: null,
  //       date: new Date().toISOString().split("T")[0],
  //       invoiceDate: new Date().toISOString().split("T")[0],
  //       releaseDate: new Date().toISOString().split("T")[0],
  //       paymentMethod: "نقدي",
  //     });
  //     setCartItems([
  //       {
  //         barcode: "",
  //         name: "",
  //         price: 0,
  //         qty: 0,
  //         discount: 0,
  //         discountType: "value",
  //       },
  //     ]);
  //     setBarcodeInput("");
  //     barcodeInputRef.current.focus();
  //   }
  // };

  const handlePrint = () => {
    window.print();
  };

  // =================== دالة إضافة عميل جديد ===================
  const handleAddClient = (newClient) => {
    // أضف العميل الجديد إلى قائمة العملاء
    customersList.push(newClient);
    // حدده مباشرة
    setFormData((prev) => ({
      ...prev,
      selectedCustomer: newClient,
    }));
  };

   // حسابات الفاتورة

  const validItems = cartItems.filter((i) => i.barcode);
  const totalItems = validItems.length;
  const subtotal = validItems.reduce((sum, i) => sum + i.qty * i.price, 0);
  const totalDiscount = validItems.reduce((sum, i) => {
    const itemDiscount =
      i.discountType === "percent"
        ? (i.price * i.qty * (i.discount || 0)) / 100
        : i.discount || 0;
    return sum + itemDiscount;
  }, 0);

  const generalDiscountValue =
    formData.generalDiscountType === "percent"
      ? (subtotal - totalDiscount) * ((formData.generalDiscount || 0) / 100)
      : formData.generalDiscount || 0;

  const netTotal = subtotal - totalDiscount - generalDiscountValue;

  const paidNow =
    formData.paymentMethod === "آجل" ? formData.paidAmount || 0 : netTotal;

  const remaining = formData.paymentMethod === "آجل" ? netTotal - paidNow : 0;
  // =================== دالة الحفظ والطباعة ===================
  const handleSubmit = () => {
    const validItems = cartItems.filter((item) => item.barcode);

    // 🧮 حساب الإجماليات
    const subtotal = validItems.reduce((sum, i) => sum + i.qty * i.price, 0);
    const totalDiscount = validItems.reduce((sum, i) => {
      const itemDiscount =
        i.discountType === "percent"
          ? (i.price * i.qty * (i.discount || 0)) / 100
          : i.discount || 0;
      return sum + itemDiscount;
    }, 0);

    const generalDiscountValue =
      formData.generalDiscountType === "percent"
        ? (subtotal - totalDiscount) * ((formData.generalDiscount || 0) / 100)
        : formData.generalDiscount || 0;

    const netTotal = subtotal - totalDiscount - generalDiscountValue;

    const invoiceData = {
      ...formData,
      items: validItems.map((i) => ({
        barcode: i.barcode,
        name: i.name,
        qty: i.qty,
        price: i.price,
        discount: i.discount,
        discountType: i.discountType,
        total:
          i.qty * i.price -
          (i.discountType === "percent"
            ? (i.price * i.qty * i.discount) / 100
            : i.discount),
      })),
      totals: {
        subtotal,
        totalDiscount,
        generalDiscountValue,
        netTotal,
        paidNow,
        remaining,
      },
    };

    console.log("🚀 بيانات الفاتورة:", invoiceData);

    // ✅ رسالة نجاح
    toast.success(`تم حفظ الفاتورة بنجاح`);
    // استدعاء الطباعة
    // handlePrint();

    // إعادة التعيين بعد الحفظ
    setFormData({
      invoiceNumber: generateInvoiceNumber(),
      selectedCustomer: null,
      salesman: null,
      date: new Date().toISOString().split("T")[0],
      releaseDate: new Date().toISOString().split("T")[0],
      paymentMethod: "نقدي",
    });
    setCartItems([
      {
        barcode: "",
        name: "",
        price: 0,
        qty: 0,
        discount: 0,
        discountType: "value",
      },
    ]);
  };

 
  const invoiceData = {
    customer: formData.selectedCustomer,
    invoiceNumber: formData.invoiceNumber,
    date: formData.date,
    salesman: formData.salesman,
    items: cartItems
      .filter((i) => i.barcode)
      .map((i) => ({
        name: i.name,
        qty: i.qty,
        price: i.price,
        discount: i.discount,
        discountType: i.discountType,
      })),
    totals: {
      subtotal,
      totalDiscount,
      generalDiscountValue,
      netTotal,
      paidNow,
      remaining,
      generalDiscountType: formData.generalDiscountType,
    },
    paymentMethod: formData.paymentMethod,
  };

  return (
    <>
      <div className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        {/* رأس الصفحة */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* العنوان والمعلومات */}
          <div className="w-full sm:w-auto sm:text-start">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-[24px] font-semibold text-[#1e40af] flex items-center  sm:justify-start gap-2">
              <TbFileInvoice className="text-[20px] sm:text-[22px] lg:text-[26px]" />
              فاتورة مبيعات جديدة
            </h2>
          </div>

          {/* الأزرار */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
            <Link to={"/app/add-product"} className="w-full sm:w-auto">
              <Button
                className="btn-green w-full sm:w-auto !text-white btn-sm !flex !items-center !justify-center !gap-2 
                           !text-sm md:!text-base xl:!text-lg !px-3 !py-2 transition-all duration-300"
              >
                حفظ كمسودة
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* رقم الفاتوره وتاريخ اليوم */}
      <div
        className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] 
                px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        {/* رقم الفاتورة */}
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm sm:text-base font-semibold text-gray-700">
            رقم الفاتورة :
          </h3>
          <span className="text-primary text-sm sm:text-base break-words">
            {formData.invoiceNumber}
          </span>
        </div>

        {/* التاريخ */}
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <h3 className="text-sm sm:text-base font-semibold text-gray-700">
            التاريخ :
          </h3>
          <span className="text-primary text-sm sm:text-base break-words">
            {formData.date}
          </span>
        </div>
      </div>

      {/* اختيار العميل ومسؤول المبيعات */}
      <div className="w-full flex flex-col lg:flex-row gap-4">
        {/* اختيار العميل */}
        <div className="w-full lg:w-1/2 bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] p-3 sm:p-4 rounded-md">
          <h3 className="font-semibold text-[rgba(0,0,0,0.7)] mb-2 text-sm sm:text-base md:text-lg">
            العميل <span className="text-red-500">*</span>
          </h3>

          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-3 items-stretch sm:items-center">
            <Select
              inputId="customer"
              name="selectedCustomer"
              options={customersList.map((c) => ({
                value: c.id,
                label: c.name,
                phone: c.phone,
                address: c.address,
              }))}
              value={formData.selectedCustomer}
              onChange={handleSelectChange}
              placeholder="اختر عميل أو ابحث بالاسم / الهاتف"
              isSearchable
              autoComplete="off"
              className="w-full sm:w-[75%]"
              menuPortalTarget={document.body}
              menuPosition="fixed"
              menuShouldScrollIntoView={false}
              // 🔍 البحث بالاسم أو رقم الهاتف دون عرض الرقم
              filterOption={(option, inputValue) => {
                const searchValue = inputValue.toLowerCase();
                return (
                  option.label.toLowerCase().includes(searchValue) ||
                  option.data.phone.includes(searchValue)
                );
              }}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                control: (base) => ({
                  ...base,
                  borderColor: "#d1d5db",
                  boxShadow: "none",
                  "&:hover": { borderColor: "#60a5fa" },
                }),
              }}
            />
            <Button
              type="button"
              onClick={handleClickOpen}
              className="btn-blue btn-sm !flex !items-center !gap-1 sm:!gap-2 !text-xs sm:!text-sm md:!text-base xl:!text-lg !px-2 sm:!px-3 !py-1 sm:!py-2"
            >
              جديد
            </Button>
          </div>

          {formData.selectedCustomer && (
            <div className="mt-4 bg-white border p-3 rounded-md">
              <p>
                <strong>الإسم:</strong> {formData.selectedCustomer.label}
              </p>
              <p>
                <strong>الهاتف:</strong> {formData.selectedCustomer.phone}
              </p>
              <p>
                <strong>العنوان:</strong> {formData.selectedCustomer.address}
              </p>
            </div>
          )}
        </div>

        {/* اختيار مسؤول المبيعات والتاريخ */}
        <div className="w-full lg:w-1/2 bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] p-3 sm:p-4 rounded-md">
          <div className="form-group w-full flex flex-col gap-2 mb-4">
            <label
              htmlFor="salesman"
              className="text-sm font-semibold text-gray-700"
            >
              مسؤول المبيعات
            </label>
            <Select
              inputId="salesman"
              name="salesman"
              options={employeesList.map((e) => ({
                value: e.id,
                label: e.name,
                role: e.role,
              }))}
              value={formData.salesman}
              onChange={handleSelectChange}
              placeholder="اختر"
              isSearchable
              autoComplete="off"
              className="w-full"
            />
          </div>

          <div className="form-group w-full flex flex-col gap-2">
            <label
              htmlFor="releaseDate"
              className="text-sm font-semibold text-gray-700"
            >
              تاريخ الإصدار
            </label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              autoComplete="off"
              variant="outlined"
              value={formData.releaseDate}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400 outline-none text-[rgba(0,0,0,0.7)] text-sm sm:text-base"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Barcode Scanner Input */}
      <div className="w-full flex flex-col lg:flex-row gap-4 mt-5 mb-5">
        <div className="form-group w-full flex flex-col gap-1">
          <label
            htmlFor="barcode"
            className="text-sm sm:text-base font-semibold text-[#1e40af] flex items-center gap-2"
          >
            <span className="inline-block text-[16px] sm:text-[18px]">📦</span>
            مسح الباركود
          </label>

          <input
            ref={barcodeInputRef}
            type="text"
            id="barcode"
            name="barcode"
            value={barcodeInput}
            onChange={handleBarcodeChange}
            onKeyUp={handleBarcodeKeyUp}
            autoComplete="off"
            className="border border-[rgb(219,234,254)] bg-[rgba(255,255,255,0.6)] p-2 sm:p-3 mt-1 rounded-md w-full
                 focus:ring-2 focus:ring-blue-400 outline-none text-[rgba(0,0,0,0.8)] text-sm sm:text-base transition duration-200"
            placeholder="مرر الباركود هنا..."
            autoFocus
          />

          <p className="text-gray-500 text-xs sm:text-sm">
            استخدم الماسح الضوئي أو اكتب الباركود يدويًا
          </p>
        </div>
      </div>

      {/* جدول الأصناف */}
      <div className="bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] p-4 mb-4 rounded-md">
        {/* ✅ تغليف الجدول ليكون ريسبونسيف مع السماح بعرض القوائم المنسدلة بالكامل */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-[#eff6ff] border border-[rgb(219,234,254)]">
            <thead>
              <tr className="bg-[rgb(243,244,246)]">
                <th className="py-2 px-4 border-b text-right text-sm font-semibold text-gray-700">
                  الصنف
                </th>
                <th className="py-2 px-4 border-b text-right text-sm font-semibold text-gray-700">
                  الكمية
                </th>
                <th className="py-2 px-4 border-b text-right text-sm font-semibold text-gray-700">
                  سعر الوحدة
                </th>
                <th className="py-2 px-4 border-b text-right text-sm font-semibold text-gray-700">
                  الخصم
                </th>
                <th className="py-2 px-4 border-b text-right text-sm font-semibold text-gray-700">
                  الإجمالي
                </th>
                <th className="py-2 px-4 border-b text-right text-sm font-semibold text-gray-700">
                  إجراء
                </th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item, index) => {
                const itemDiscount =
                  item.discountType === "percent"
                    ? (item.price * item.qty * (item.discount || 0)) / 100
                    : item.discount || 0;

                const total = item.qty * item.price - itemDiscount;
                return (
                  <tr key={index}>
                    {/* خانة الصنف */}
                    <td className="p-2 border min-w-[220px]">
                      <div className="relative z-[1000]">
                        {" "}
                        {/* ✅ هذا السطر يحل المشكلة */}
                        <Select
                          options={productsList.map((p) => ({
                            value: p.barcode,
                            label: p.name,
                            price: p.price,
                          }))}
                          value={
                            item.barcode
                              ? { value: item.barcode, label: item.name }
                              : null
                          }
                          onChange={(selected) =>
                            handleSelectProduct(selected, index)
                          }
                          placeholder="اختر منتج..."
                          className="w-full"
                          menuPortalTarget={document.body} // ✅ يعرض القائمة خارج الجدول
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          }}
                        />
                      </div>
                    </td>

                    {/* الكمية */}
                    <td className="p-2 border">
                      <input
                        type="number"
                        id={`qty-${index}`}
                        min="1"
                        value={item.qty || ""}
                        onChange={(e) =>
                          handleItemChange(
                            item.barcode,
                            "qty",
                            e.target.value || 1
                          )
                        }
                        className="border rounded px-2 py-1 w-full sm:w-16 text-center focus:ring-2 focus:ring-blue-300 outline-none"
                      />
                    </td>

                    {/* السعر */}
                    <td className="p-2 border">
                      <input
                        type="number"
                        id={`price-${index}`}
                        min="1"
                        value={item.price || ""}
                        onChange={(e) =>
                          handleItemChange(
                            item.barcode,
                            "price",
                            e.target.value || 0
                          )
                        }
                        className="border rounded px-2 py-1 w-full sm:w-16 text-center focus:ring-2 focus:ring-blue-300 outline-none"
                      />
                    </td>

                    {/* الخصم + نوع الخصم */}
                    <td className="p-2 border">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        {/* حقل الخصم */}
                        <input
                          type="number"
                          id={`discount-${index}`}
                          min="0"
                          value={item.discount || ""}
                          onChange={(e) =>
                            handleItemChange(
                              item.barcode,
                              "discount",
                              e.target.value || 0
                            )
                          }
                          className="border rounded px-2 py-1 w-full sm:w-24 text-center focus:ring-2 focus:ring-blue-300 outline-none"
                          placeholder="الخصم"
                        />

                        {/* نوع الخصم */}
                        <Select
                          id={`discountType-${index}`}
                          options={discountOptions}
                          value={discountOptions.find(
                            (opt) => opt.value === item.discountType
                          )}
                          onChange={(selectedOption) =>
                            handleItemChange(
                              item.barcode,
                              "discountType",
                              selectedOption.value
                            )
                          }
                          className="w-full sm:w-24"
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          }}
                        />
                      </div>
                    </td>

                    {/* الإجمالي */}
                    <td className="p-2 border font-semibold text-blue-700">
                      {total > 0 ? total.toFixed(2) : ""}
                    </td>

                    {/* إجراء */}
                    <td className="p-2 border text-center">
                      <Button
                        type="button"
                        onClick={() => handleDeleteItem(item.barcode)}
                        className="!w-[30px] !h-[30px] !rounded-full !min-w-[30px] !text-[rgba(0,0,0,0.8)] btn-red"
                      >
                        x
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* زر لإضافة صف جديد يدويًا */}
        <div className="mt-3">
          <Button
            type="button"
            onClick={() =>
              setCartItems((prev) => [
                ...prev,
                { barcode: "", name: "", price: 0, qty: 0, discount: 0 },
              ])
            }
            className="btn-blue text-white btn-sm !flex !items-center !gap-1 sm:!gap-2 !text-xs sm:!text-sm md:!text-base xl:!text-lg !px-2 sm:!px-3 !py-1 sm:!py-2"
          >
            إضافة صنف جديد
          </Button>
        </div>
      </div>

      {/* إجمالي الفاتورة */}
      <div className="bg-[rgba(255,255,255,0.8)] border border-[rgb(219,234,254)] p-3 sm:p-4 rounded-md mt-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* العمود الأول */}
          <div className="space-y-2 text-sm sm:text-base">
            <p>
              <strong>عدد الأصناف:</strong> {totalItems}
            </p>
            <p>
              <strong>إجمالي المبلغ قبل الخصم:</strong> {subtotal.toFixed(2)}{" "}
              ج.م
            </p>
            <p>
              <strong>إجمالي الخصومات (لكل منتج):</strong>{" "}
              {totalDiscount.toFixed(2)} ج.م
            </p>
          </div>

          {/* العمود الثاني (الخصم العام) */}
          <div className="bg-white border rounded-md p-3 flex flex-col gap-3">
            {/* الخصم العام */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label
                htmlFor="generalDiscount"
                className="font-semibold whitespace-nowrap"
              >
                الخصم العام:
              </label>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="number"
                  name="generalDiscount"
                  id="generalDiscount"
                  value={formData.generalDiscount || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      generalDiscount: Number(e.target.value),
                    }))
                  }
                  className="border rounded px-2 py-1 w-full sm:w-24 text-center focus:ring-2 focus:ring-blue-300 outline-none"
                />
                <Select
                  inputId="generalDiscountType"
                  options={discountOptions}
                  value={discountOptions.find(
                    (opt) =>
                      opt.value === (formData.generalDiscountType || "value")
                  )}
                  onChange={(selectedOption) =>
                    setFormData((prev) => ({
                      ...prev,
                      generalDiscountType: selectedOption.value,
                    }))
                  }
                  className="w-full sm:w-24"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                />
              </div>
            </div>

            {/* سبب الخصم */}
            <div className="flex flex-col gap-1">
              <label htmlFor="discountReason" className="font-semibold">
                سبب الخصم:
              </label>
              <input
                type="text"
                name="discountReason"
                id="discountReason"
                value={formData.discountReason || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    discountReason: e.target.value,
                  }))
                }
                className="border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-300 outline-none"
                placeholder="اكتب سبب الخصم..."
              />
            </div>
          </div>
        </div>

        {/* الصافي */}
        <div className="mt-4 bg-blue-50 border border-blue-200 p-3 rounded-md text-center sm:text-right">
          <p className="font-bold text-blue-800 text-base sm:text-lg">
            الصافي المستحق للدفع: {netTotal.toFixed(2)} ج.م
          </p>
        </div>

        {/* طريقة الدفع */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
            <h2 className="font-semibold whitespace-nowrap">طريقة الدفع:</h2>
            <div className="w-full sm:w-auto flex-1">
              <Select
                id="paymentMethod"
                value={
                  formData.paymentMethod
                    ? {
                        value: formData.paymentMethod,
                        label: formData.paymentMethod,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentMethod: selectedOption?.value || "",
                  }))
                }
                options={[
                  { value: "نقدي", label: "نقدي" },
                  { value: "فيزا", label: "فيزا" },
                  { value: "آجل", label: "آجل" },
                ]}
                placeholder="اختر طريقة الدفع..."
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderRadius: "0.375rem",
                    borderColor: state.isFocused ? "#60A5FA" : "#d1d5db",
                    boxShadow: state.isFocused
                      ? "0 0 0 2px rgba(59,130,246,0.3)"
                      : "none",
                    "&:hover": { borderColor: "#60A5FA" },
                    minHeight: "38px",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 1000,
                  }),
                }}
              />
            </div>
          </div>
        </div>
        {formData.paymentMethod === "آجل" && (
          <div className="flex items-center gap-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-4">
              <h2 className="font-semibold whitespace-nowrap">
                المبلغ المدفوع الآن:
              </h2>
              <input
                type="number"
                name="paidAmount"
                value={formData.paidAmount || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    paidAmount: Number(e.target.value),
                  }))
                }
                className="border rounded px-2 py-1 w-full sm:w-32 text-center focus:ring-2 focus:ring-blue-300 outline-none"
              />
              <span className="text-gray-600 text-sm sm:text-base">
                المتبقي: {remaining.toFixed(2)} ج.م
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-4">
              <h2 className="font-semibold whitespace-nowrap">عدد الأشهر</h2>
              <input
                type="number"
                name="paidMonth"
                className="border rounded px-2 py-1 w-full sm:w-32 text-center focus:ring-2 focus:ring-blue-300 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* ✅ أزرار الحفظ والطباعة */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 mt-5">
        <Button
          type="button"
          onClick={handleSubmit}
          className="!bg-green-600 hover:!bg-green-700 !text-white btn-sm !flex !items-center !gap-1 sm:!gap-2 !text-xs sm:!text-sm md:!text-base xl:!text-lg !px-2 sm:!px-3 !py-1 sm:!py-2"
        >
          حفظ وطباعة
        </Button>
        {/* <Button
          type="button"
          onClick={handleCancel}
          className="!bg-gray-300 hover:!bg-gray-400 !text-gray-800 btn-sm !flex !items-center !gap-1 sm:!gap-2 !text-xs sm:!text-sm md:!text-base xl:!text-lg !px-2 sm:!px-3 !py-1 sm:!py-2"
        >
          إلغاء
        </Button> */}
      </div>

      {/* نسخة الطباعة الحرارية  */}

      {invoiceData.items.length > 0 && (
        <PrintInvoice invoiceData={invoiceData} />
      )}

      {/* نموذج إضافة عميل جديد */}
      <AddClient
        open={openClientModal}
        onClose={handleClose}
        onSave={handleAddClient}
      />
    </>
  );
}

export default AddSalesInvoice;
