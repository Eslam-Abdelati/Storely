import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Select from "react-select";
import { TbFileInvoice } from "react-icons/tb";
import PrintInvoice from "../../components/PrintInvoice/PrintInvoice";
import AddClient from "../../components/AddClient/AddClient";
import "../../components/PrintInvoice/invoice-print.css";

const customersList = [
  {
    value: 0,
    label: "client",
    phone: "بدون رقم",
    address: "بدون عنوان",
  },
  {
    value: 1,
    label: "أحمد عمار",
    phone: "01012345678",
    address: "الوادي الجديد - بلاط",
  },
  {
    value: 2,
    label: "إسلام عمار",
    phone: "01098765432",
    address: "الوادي الجديد - الداخلة",
  },
  {
    value: 3,
    label: "محمد حمدي",
    phone: "01122223333",
    address: "الوادي الجديد - الخارجة",
  },
];

const salesmanList = [
  { value: 1, label: "أحمد محمد" },
  { value: 2, label: "إسلام عمار" },
  { value: 3, label: "يوسف خالد" },
];

// قائمة المنتجات للتجربة
const productsList = [
  { barcode: "111", name: "موبايل سامسونج", price: 5000 },
  { barcode: "222", name: "شاحن اصلي", price: 250 },
  { barcode: "333", name: "كابل USB", price: 100 },
  { barcode: "444", name: "opoo reno 5", price: 5000 },
  { barcode: "555", name: "سماعه ايربود ", price: 250 },
  { barcode: "6956611053192", name: "شاحن  USB", price: 100 },
];

function AddInvoice() {
  const [formData, setFormData] = useState({
    invoiceNumber: "INV-2025107-001",
    selectedCustomer: customersList[0],
    salesman: null,
    date: new Date().toISOString().split("T")[0],
    releaseDate: new Date().toISOString().split("T")[0],
    paymentMethod: "نقدي",
  });
  const [cartItems, setCartItems] = useState([
    {
      barcode: "",
      name: "",
      price: 0,
      qty: 0,
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
          price: 0,
          qty: 0,
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
            price: 0,
            qty: 0,
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

  const handleCancel = () => {
    if (
      window.confirm(
        "هل أنت متأكد من إلغاء الفاتورة؟ سيتم فقدان جميع البيانات."
      )
    ) {
      // إعادة تعيين جميع الحقول إلى القيم الافتراضية
      setFormData({
        invoiceNumber: "INV-2025107-001",
        selectedCustomer: null,
        salesman: null,
        date: new Date().toISOString().split("T")[0],
        invoiceDate: new Date().toISOString().split("T")[0],
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
      setBarcodeInput("");
      barcodeInputRef.current.focus();
    }
  };

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
  // =================== دالة الحفظ والطباعة ===================
  const handleSubmit = () => {
    const validItems = cartItems.filter((item) => item.barcode);

    if (!formData.selectedCustomer) {
      alert("⚠️ يرجى اختيار العميل أولاً");
      return;
    }
    if (validItems.length === 0) {
      alert("⚠️ يجب إدخال صنف واحد على الأقل في الفاتورة");
      return;
    }

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
    alert("✅ تم حفظ الفاتورة بنجاح!");

    // استدعاء الطباعة
    handlePrint();

    // إعادة التعيين بعد الحفظ
    setFormData({
      invoiceNumber: "INV-2025107-001",
      selectedCustomer: null,
      salesman: null,
      today: new Date().toISOString().split("T")[0],
      invoiceDate: new Date().toISOString().split("T")[0],
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
      {/* عنوان وازرار */}
      <div className="w-full py-4 px-5 bg-[rgba(255,255,255,0.8)] border border-[rgb(219,234,254)] flex items-center mb-5 justify-between rounded-md">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-[18px] text-[rgb(30,64,175)] lg:text-[20px] font-bold leading-8 lg:leading-10">
            فاتورة مبيعات جديدة
            <TbFileInvoice className="inline-block mr-2 text-[22px] lg:text-[26px]" />
          </h1>
          <Button
            type="submit"
            className="btn-green !text-white btn-sm flex items-center gap-2"
          >
            حفظ كمسودة
          </Button>
        </div>
      </div>

      {/* رقم الفاتوره وتاريخ اليوم */}
      <div className="w-full py-4 px-5 bg-[rgba(255,255,255,0.8)] border border-[rgb(219,234,254)] flex items-center mb-5 justify-between rounded-md">
        <div className="flex items-center w-full gap-2">
          <h3 className="text-sm font-semibold text-gray-700">
            رقم الفاتورة :
          </h3>
          <span className="text-primary">{formData.invoiceNumber}</span>
        </div>

        <div className="flex items-center justify-end w-full gap-2">
          <h3 className="text-sm font-semibold text-gray-700">التاريخ :</h3>
          <span className="text-primary">{formData.date}</span>
        </div>
      </div>

      {/* اختيار العميل */}
      <div className="w-full flex gap-4 flex-col lg:flex-row">
        <div className="w-[50%] bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] p-4 rounded-md">
          <h3 className="font-semibold text-[rgba(0,0,0,0.7)] mb-2">
            العميل <span className="text-red-500">*</span>
          </h3>
          <div className="flex justify-between gap-2 items-center">
            <Select
              inputId="customer"
              name="selectedCustomer"
              options={customersList}
              value={formData.selectedCustomer}
              onChange={handleSelectChange}
              placeholder="اختر عميل"
              isSearchable
              autoComplete="off"
              className="w-[75%]"
            />

            <Button
              type="button"
              onClick={handleClickOpen}
              className="btn-blue"
            >
              جديد
            </Button>
          </div>

          {formData.selectedCustomer && (
            <div className="mt-5  bg-white border border-[rgb(219,234,254)] p-3 rounded-md">
              <p>
                <strong>الإسم : </strong> {formData.selectedCustomer.label}
              </p>
              <p>
                <strong> الهاتف : </strong> {formData.selectedCustomer.phone}
              </p>
              <p>
                <strong>العنوان :</strong> {formData.selectedCustomer.address}
              </p>
            </div>
          )}
        </div>
        {/* اختيار مسؤل المبيعات والتاريخ */}
        <div className="w-[50%] bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] p-4 rounded-md">
          <div className="form-group w-full flex flex-col gap-2 mb-4">
            <label
              htmlFor="invoiceDate"
              className="text-sm font-semibold text-gray-700"
            >
              تاريخ الفاتورة
            </label>
            <input
              type="date"
              id="invoiceDate"
              name="date"
              autoComplete="off"
              variant="outlined"
              value={formData.date}
              className="border p-1  w-full rounded focus:ring-2 focus:ring-blue-400 outline-none text-[rgba(0,0,0,0.7)]"
              onChange={handleChange}
            />
          </div>

          <div className="form-group w-full flex flex-col gap-2 mb-4">
            <label
              htmlFor="salesman"
              className="text-sm font-semibold text-gray-700"
            >
              مسؤل المبيعات
            </label>
            <Select
              inputId="salesman"
              name="salesman"
              options={salesmanList}
              value={formData.salesman}
              onChange={handleSelectChange}
              placeholder="اختر"
              isSearchable
              autoComplete="off"
            />
          </div>

          <div className="form-group w-full flex flex-col gap-2 mb-4">
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
              className="border p-1  w-full rounded focus:ring-2 focus:ring-blue-400 outline-none text-[rgba(0,0,0,0.7)]"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Barcode Scanner Input */}
      <div className="w-full flex gap-4 flex-col lg:flex-row mt-5">
        <div className="form-group w-full flex flex-col gap-2 mb-4">
          <label
            htmlFor="barcode"
            className="text-sm font-semibold text-primary"
          >
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
            className="border p-2 mt-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="مرر الباركود هنا..."
            autoFocus
          />
        </div>
      </div>

      {/* جدول الأصناف */}
      <div className="bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] p-4 mb-4 rounded-md">
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
              // ✅ حساب الخصم بناءً على نوعه
              const itemDiscount =
                item.discountType === "percent"
                  ? (item.price * item.qty * (item.discount || 0)) / 100
                  : item.discount || 0;

              const total = item.qty * item.price - itemDiscount;
              return (
                <tr key={index}>
                  {/* خانة الصنف */}
                  <td className="p-2 border">
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
                      className="min-w-[200px]"
                    />
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
                      className="w-16 border rounded text-center"
                    />
                  </td>

                  {/* السعر */}
                  <td className="p-2 border">
                    <input
                      type="number"
                      id={`price-${index}`}
                      min="1"
                      value={item.price || 0}
                      onChange={(e) =>
                        handleItemChange(
                          item.barcode,
                          "price",
                          e.target.value || 0
                        )
                      }
                      className="w-16 border rounded text-center"
                    />
                  </td>

                  {/* الخصم + نوع الخصم */}
                  <td className="p-2 border flex items-center gap-1">
                    <input
                      type="number"
                      id={`discount-${index}`}
                      min="0"
                      value={item.discount || 0}
                      onChange={(e) =>
                        handleItemChange(
                          item.barcode,
                          "discount",
                          e.target.value || 0
                        )
                      }
                      className="w-16 border rounded text-center"
                    />
                    <select
                      id={`discountType-${index}`}
                      value={item.discountType || "value"}
                      onChange={(e) =>
                        handleItemChange(
                          item.barcode,
                          "discountType",
                          e.target.value
                        )
                      }
                      className="border rounded px-1 py-0.5 text-sm"
                    >
                      <option value="value">ج.م</option>
                      <option value="percent">%</option>
                    </select>
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
            className="btn-blue text-white"
          >
            إضافة صنف جديد
          </Button>
        </div>
      </div>

      {/* إجمالي الفاتورة */}
      <div className="bg-[rgba(255,255,255,0.8)] border border-[rgb(219,234,254)] p-4 rounded-md mt-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* العمود الأول */}
          <div>
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
          <div className="bg-white border rounded-md p-3">
            <div className="flex items-center gap-2 mb-2">
              <label htmlFor="generalDiscount" className="font-semibold">
                الخصم العام:
              </label>
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
                className="border rounded px-2 py-1 w-24 text-center"
              />
              <select
                id="generalDiscountType"
                value={formData.generalDiscountType || "value"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    generalDiscountType: e.target.value,
                  }))
                }
                className="border rounded px-2 py-1"
              >
                <option value="value">مبلغ</option>
                <option value="percent">نسبة %</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
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
                className="border rounded px-2 py-1 w-full"
                placeholder="اكتب سبب الخصم..."
              />
            </div>
          </div>
        </div>

        {/* الصافي */}
        <div className="mt-4 bg-blue-50 border border-blue-200 p-3 rounded-md">
          <p className="font-bold text-blue-800 text-lg">
            الصافي المستحق للدفع: {netTotal.toFixed(2)} ج.م
          </p>
        </div>

        {/* طريقة الدفع */}
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">طريقة الدفع:</h2>
            <select
              id="paymentMethod"
              value={formData.paymentMethod || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  paymentMethod: e.target.value,
                }))
              }
              className="border rounded px-2 py-1"
            >
              <option value="نقدي">نقدي</option>
              <option value="فيزا">فيزا</option>
              <option value="آجل">آجل</option>
            </select>
          </div>

          {formData.paymentMethod === "آجل" && (
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">المبلغ المدفوع الآن:</h2>
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
                className="border rounded px-2 py-1 w-32 text-center"
              />
              <span className="text-gray-600">
                المتبقي: {remaining.toFixed(2)} ج.م
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ✅ أزرار الحفظ والطباعة */}
      <div className="flex justify-end gap-3 mt-6 print:hidden mb-5">
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          className="!bg-green-600 !text-white !px-5"
        >
          حفظ وطباعة الفاتورة
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={handleCancel}
          className="!border-red-500 !text-red-500 !px-5"
        >
          إلغاء
        </Button>
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

export default AddInvoice;
