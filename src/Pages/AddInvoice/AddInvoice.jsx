// InvoicePage.jsx
import React, { useState, useMemo } from "react";
import Select from "react-select";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import Typography from "@mui/material/Typography";
import { IoClose } from "react-icons/io5";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const customersList = [
  { value: 1, label: "أحمد محمد" },
  { value: 2, label: "إسلام عمار" },
  { value: 3, label: "يوسف خالد" },
];
const salesmanList = [
  { value: 1, label: "أحمد محمد" },
  { value: 2, label: "إسلام عمار" },
  { value: 3, label: "يوسف خالد" },
];

// قائمة المنتجات للتجربة
const productsList = [
  { barcode: "6223008330717", name: " دراجون مزيل العرق ", price: 5000 },
  { barcode: "6956611053192", name: "مج بورسلين ", price: 250 },
  { barcode: "333", name: "كابل USB", price: 100 },
  { barcode: "6223008330717", name: " دراجون مزيل العرق ", price: 5000 },
  { barcode: "6956611053192", name: "مج بورسلين ", price: 250 },
  { barcode: "333", name: "كابل USB", price: 100 },
  { barcode: "6223008330717", name: " دراجون مزيل العرق ", price: 5000 },
  { barcode: "6956611053192", name: "مج بورسلين ", price: 250 },
  { barcode: "333", name: "كابل USB", price: 100 },
];

function formatCurrency(n) {
  return n?.toLocaleString("ar-EG") + " ج.م";
}

const InvoicePage = () => {
  const [open, setOpen] = useState(false);
  const [invoiceNumber] = useState(() => `INV-${Date.now()}`);
  const [date] = useState(() => new Date().toLocaleDateString("ar-EG"));
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const [paidAmount, setPaidAmount] = useState(0);
  // خصم على الإجمالي
  const [globalDiscountType, setGlobalDiscountType] = useState("amount");
  const [globalDiscountValue, setGlobalDiscountValue] = useState(0);
  const [globalDiscountReason, setGlobalDiscountReason] = useState("");

  const [items, setItems] = useState([
    { name: "", barcode: "", qty: 0, price: 0, discount: 0, total: 0 },
  ]);
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [salesman, setSalesman] = useState("");
  const [discountType, setDiscountType] = useState({}); // نوع الخصم لكل صف
  const [paymentMethod, setPaymentMethod] = useState("cash"); // طريقة الدفع

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // تحديث صف في الجدول
  const updateItem = (index, field, value) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index][field] = value;

      const price = Number(copy[index].price) || 0;
      const qty = Number(copy[index].qty) || 0;
      let discount = Number(copy[index].discount) || 0;

      // تطبيق نسبة أو مبلغ
      if (discountType[index] === "percent") {
        discount = (price * qty * discount) / 100;
      }

      copy[index].total = Math.max(0, qty * price - discount);
      return copy;
    });
  };

  // إضافة صف جديد
  const addRow = () => {
    setItems((prev) => [
      ...prev,
      { name: "", barcode: "", qty: 0, price: 0, discount: 0, total: 0 },
    ]);
  };

  // حذف صف
  const removeRow = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // حساب الإجمالي
  const totals = useMemo(() => {
    const subtotal = items.reduce((s, it) => s + it.qty * it.price, 0);
    let discounts = 0;
    items.forEach((it, idx) => {
      if (discountType[idx] === "percent") {
        discounts += (it.price * it.qty * (Number(it.discount) || 0)) / 100;
      } else {
        discounts += Number(it.discount) || 0;
      }
    });
    const grandTotal = subtotal - discounts;
    return { subtotal, discounts, grandTotal };
  }, [items, discountType]);

  const handleSave = () => {
    // 🛑 تحقق من وجود منتج أول
    const hasProduct = items.some((it) => it.name && it.price > 0);
    if (!hasProduct) {
      alert("⚠️ يجب اختيار منتج أولًا قبل حفظ الفاتورة.");
      return;
    }
    if (!customer?.name) {
      alert(" ⚠️ يجب اختيار عميل قبل حفظ الفاتورة.");
      return;
    }
    if (!salesman?.label) {
      alert(" ⚠️ يجب اختيار مسؤول المبيعات قبل حفظ الفاتورة.");
      return;
    }

    // 🧹 تجاهل الصفوف الفارغة
    const validItems = items.filter(
      (it) => it.name && it.price > 0 && it.qty > 0
    );

    // 💰 حساب الإجمالي بعد الخصم
    const netTotal =
      globalDiscountType === "percent"
        ? totals.grandTotal -
          (totals.grandTotal * (globalDiscountValue || 0)) / 100
        : totals.grandTotal - (globalDiscountValue || 0);

    // 📦 بناء بيانات الفاتورة
    const invoiceData = {
      invoiceNumber,
      invoiceDate,
      date,
      salesman: salesman?.label || "",
      customer,
      items: validItems,
      totals: {
        ...totals,
        globalDiscountType,
        globalDiscountValue,
        globalDiscountReason,
        netTotal,
      },
      paymentMethod,
      paidAmount,
    };

    // 💾 حفظ الفواتير السابقة + الحالية
    const existingInvoices =
      JSON.parse(localStorage.getItem("invoices") || "[]") || [];
    const updatedInvoices = [...existingInvoices, invoiceData];
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

    alert("✅ تم حفظ الفاتورة بنجاح!");

    // 🔄 إعادة التصفير بعد الحفظ
    setCustomer({ name: "", phone: "" });
    setItems([
      { name: "", barcode: "", qty: 1, price: 0, discount: 0, total: 0 },
    ]);
    setDiscountType({});
    setPaymentMethod("cash");
    setPaidAmount(0);
    setSalesman("");
    setInvoiceDate(new Date().toISOString().split("T")[0]);
    setGlobalDiscountType("amount");
    setGlobalDiscountValue(0);
    setGlobalDiscountReason("");
  };

  return (
    <>
      {/* Header */}
      <div className="w-full py-4 px-5 bg-[rgba(255,255,255,0.8)] border border-[rgb(219,234,254)] flex mb-5 justify-between rounded-md">
        <h1 className="text-[18px] lg:text-[20px] font-bold text-[rgb(30,64,175)]">
          فاتورة بيع
        </h1>
        <div className="text-right">
          <p>
            رقم الفاتورة : <span className="text-primary">{invoiceNumber}</span>
          </p>
          <p>
            التاريخ: <span className="text-primary">{date}</span>
          </p>
        </div>
      </div>

      {/* Customer info */}
      <div className="w-full flex gap-4">
        {/* اختيار العميل */}
        <div className="w-[50%] bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] p-4 rounded-md">
          <h3 className="font-semibold text-[rgba(0,0,0,0.7)] mb-2">
            العميل <span className="text-red-500">*</span>
          </h3>
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <Select
                inputId="customerSelect"
                value={
                  customer?.id
                    ? { value: customer.id, label: customer.name }
                    : null
                }
                onChange={(selected) =>
                  setCustomer({
                    id: selected?.value,
                    name: selected?.label,
                  })
                }
                options={customersList}
                placeholder="اختر العميل"
                isSearchable
                required
                className="bg-white"
              />
            </div>
            <Button
              type="button"
              onClick={handleClickOpen}
              className="btn-blue"
            >
              + جديد
            </Button>

            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                <div className="flex items-center justify-between">
                  <h2> بيانات العميل</h2>
                  <Button
                    aria-label="close"
                    onClick={handleClose}
                    className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] text-[rgba(0,0,0,0.7)] hover:bg-[rgba(0,0,0,0.1)] "
                  >
                    <IoClose className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                  </Button>
                </div>
              </DialogTitle>

              <DialogContent dividers>
                <Typography gutterBottom>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo
                  odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                  risus, porta ac consectetur ac, vestibulum at eros.
                </Typography>
                <Typography gutterBottom>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur et. Vivamus sagittis lacus vel augue laoreet
                  rutrum faucibus dolor auctor.
                </Typography>
                <Typography gutterBottom>
                  Aenean lacinia bibendum nulla sed consectetur. Praesent
                  commodo cursus magna, vel scelerisque nisl consectetur et.
                  Donec sed odio dui. Donec ullamcorper nulla non metus auctor
                  fringilla.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={handleClose}
                  className="btn-green !ml-2"
                >
                  حفظ العميل
                </Button>
                <Button
                  autoFocus
                  onClick={handleClose}
                  className="!bg-gray-400 !text-[rgba(0,0,0,0.7)] hover:!bg-gray-500"
                >
                  الغاء
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </div>

          <div className="mt-4 bg-white border border-gray-200 p-3 rounded-md text-sm">
            <p>
              <strong>الاسم:</strong> إسلام عمار
            </p>
            <p>
              <strong>الهاتف:</strong> 01203702198
            </p>
            <p>
              <strong>العنوان:</strong> بلاط الوادي الجديد
            </p>
          </div>
        </div>

        {/* تفاصيل الفاتورة */}
        <div className="w-[50%] bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] p-4 rounded-md">
          <div>
            <label className="font-semibold text-[14px] text-[rgba(0,0,0,0.7)]">
              تاريخ الفاتورة
            </label>
            <input
              type="date"
              className="border p-1 mt-2 w-full rounded focus:ring-2 focus:ring-blue-400 outline-none text-[rgba(0,0,0,0.7)]"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </div>

          {/* موظف المبيعات */}
          <div className="mt-2">
            <label className="font-semibold text-[14px] text-[rgba(0,0,0,0.7)]">
              مسؤول المبيعات
            </label>
            <Select
              inputId="salesmanSelect"
              value={salesman}
              onChange={(selected) => setSalesman(selected)}
              options={salesmanList}
              placeholder="اختر الموظف"
              isSearchable
              className="mt-2"
            />
          </div>

          <div className="mt-2">
            <label className="font-semibold text-[14px] text-[rgba(0,0,0,0.7)]">
              تاريخ الإصدار
            </label>
            <input
              type="date"
              className="border p-1 mt-2 w-full rounded focus:ring-2 focus:ring-blue-400 outline-none text-[rgba(0,0,0,0.7)]"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Barcode Scanner Input */}
      <div className="my-6">
        <label className="block text-sm font-semibold text-primary">
          مسح الباركود
        </label>
        <input
          type="text"
          className="border p-2 mt-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="مرر الباركود هنا..."
          autoFocus
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const code = e.target.value.trim();
              if (!code) return;
              e.target.value = "";

              const product = productsList.find((p) => p.barcode === code);

              if (product) {
                setItems((prev) => {
                  const copy = [...prev];

                  // 🔹 تحقق إن كان المنتج موجود بالفعل
                  const existingIndex = copy.findIndex(
                    (it) => it.barcode === product.barcode
                  );
                  if (existingIndex !== -1) {
                    copy[existingIndex] = {
                      ...copy[existingIndex],
                      qty: copy[existingIndex].qty + 1,
                      total:
                        (copy[existingIndex].qty + 1) *
                          copy[existingIndex].price -
                        copy[existingIndex].discount,
                    };
                    return copy;
                  }

                  // 🔹 ابحث عن أول صف فاضي
                  const emptyIndex = copy.findIndex(
                    (it) => !it.name && it.qty === 0
                  );

                  // 🔹 لو فيه صف فاضي → عبّيه بالمنتج
                  if (emptyIndex !== -1) {
                    copy[emptyIndex] = {
                      barcode: product.barcode,
                      name: product.name,
                      qty: 1,
                      price: product.price,
                      discount: 0,
                      total: product.price,
                    };
                    return copy;
                  }

                  // 🔹 لو مفيش صف فاضي → أضف صف جديد
                  return [
                    ...copy,
                    {
                      barcode: product.barcode,
                      name: product.name,
                      qty: 1,
                      price: product.price,
                      discount: 0,
                      total: product.price,
                    },
                  ];
                });
              } else {
                alert("المنتج غير موجود في القائمة ❌");
              }
            }
          }}
        />
      </div>

      {/* Items table */}
      <section className="bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] p-4 mb-4 rounded-md">
        <table className="w-full bg-[rgb(239,246,255)] text-sm text-left rtl:text-right dark:text-gray-400 mb-3 border border-[#e2e8f0]">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">#</th>
              <th className="p-2">المنتج</th>
              <th className="p-2">الكمية</th>
              <th className="p-2">السعر</th>
              <th className="p-2">الخصم</th>
              <th className="p-2">الإجمالي</th>
              <th className="p-2">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2">{idx + 1}</td>
                <td className="p-2">
                  <Select
                    value={
                      it.name ? { value: it.barcode, label: it.name } : null
                    }
                    onChange={(selected) => {
                      if (selected) {
                        const product = productsList.find(
                          (p) => p.barcode === selected.value
                        );

                        setItems((prev) => {
                          const copy = [...prev];

                          // ✅ تحقق إن كان المنتج موجود بالفعل في أي صف آخر
                          const existingIndex = copy.findIndex(
                            (it, i) =>
                              it.barcode === product.barcode && i !== idx
                          );

                          if (existingIndex !== -1) {
                            alert("⚠️ هذا المنتج موجود بالفعل في الفاتورة!");
                            return copy;
                          }

                          // 🔹 حدّث بيانات الصف الحالي
                          copy[idx] = {
                            ...copy[idx],
                            barcode: product.barcode,
                            name: product.name,
                            price: product.price,
                            qty: copy[idx].qty > 0 ? copy[idx].qty : 1,
                            discount: copy[idx].discount || 0,
                            total:
                              (copy[idx].qty > 0 ? copy[idx].qty : 1) *
                                product.price -
                              (copy[idx].discount || 0),
                          };

                          // 🔹 أضف صف جديد لو كنا في آخر صف
                          if (idx === copy.length - 1) {
                            copy.push({
                              name: "",
                              barcode: "",
                              qty: 0,
                              price: 0,
                              discount: 0,
                              total: 0,
                            });
                          }

                          return copy;
                        });
                      } else {
                        updateItem(idx, "name", "");
                        updateItem(idx, "price", 0);
                      }
                    }}
                    options={productsList.map((p) => ({
                      value: p.barcode,
                      label: p.name,
                    }))}
                    placeholder="اختر المنتج"
                    isSearchable
                    // 👇👇 هنا الجزء المهم
  menuPortalTarget={document.body}
  styles={{
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menuList: (base) => ({
      ...base,
      maxHeight: "180px", 
      overflowY: "auto",   
    }),
  }}
                  />
                </td>

                <td className="p-2">
                  <input
                    type="number"
                    min="1"
                    value={it.qty}
                    onChange={(e) =>
                      updateItem(idx, "qty", Number(e.target.value))
                    }
                    className="border p-1 w-[70px]"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={it.price}
                    onChange={(e) =>
                      updateItem(idx, "price", Number(e.target.value))
                    }
                    className="border p-1 w-[70px]"
                  />
                </td>

                {/* الخصم + نوع الخصم */}
                <td className="p-2 flex gap-1 items-center">
                  <input
                    type="number"
                    value={it.discount}
                    onChange={(e) =>
                      updateItem(idx, "discount", Number(e.target.value))
                    }
                    className="border p-1 w-[70px]"
                  />
                  <select
                    value={discountType[idx] || "amount"}
                    onChange={(e) =>
                      setDiscountType((prev) => ({
                        ...prev,
                        [idx]: e.target.value,
                      }))
                    }
                    className="border p-1 rounded"
                  >
                    <option value="amount">ج.م</option>
                    <option value="percent">%</option>
                  </select>
                </td>

                <td className="p-2">{formatCurrency(it.total)}</td>
                <td className="p-2">
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => removeRow(idx)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Button className="btn-blue " onClick={addRow}>
          + إضافة صنف
        </Button>
      </section>

      {/* Totals + Payment method */}
      <section className="bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)] p-4 mb-4 rounded-md">
        <p>
          الإجمالي : <strong>{formatCurrency(totals.subtotal)}</strong>
        </p>
        <p>
          الخصم على الأصناف :{" "}
          <strong>{formatCurrency(totals.discounts)}</strong>
        </p>

        {/* 🔹 خصم على الإجمالي */}
        <div className="space-y-2">
          <label className="font-semibold">خصم :</label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="number"
              min="0"
              value={globalDiscountValue}
              onChange={(e) => setGlobalDiscountValue(Number(e.target.value))}
              className="border p-2 w-[100px] rounded"
              placeholder="القيمة"
            />
            <select
              value={globalDiscountType}
              onChange={(e) => setGlobalDiscountType(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="amount">ج.م</option>
              <option value="percent">%</option>
            </select>
            {/* 🔸 سبب الخصم */}
            <input
              type="text"
              value={globalDiscountReason}
              onChange={(e) => setGlobalDiscountReason(e.target.value)}
              className="border p-2 flex-1 min-w-[200px] rounded"
              placeholder="سبب الخصم (اختياري)"
            />
          </div>
        </div>

        {/* حساب الصافي بعد الخصم */}
        <p className="text-primary text-[18px]">
          الصافي :
          <strong>
            {formatCurrency(
              globalDiscountType === "percent"
                ? totals.grandTotal -
                    (totals.grandTotal * (globalDiscountValue || 0)) / 100
                : totals.grandTotal - (globalDiscountValue || 0)
            )}
          </strong>
        </p>

        {/* طريقة الدفع */}
        <div className="mt-3 space-y-3">
          <div>
            <label className="font-semibold">طريقة الدفع :</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border p-2 ml-2 rounded"
            >
              <option value="cash">نقدي</option>
              <option value="visa">فيزا</option>
              <option value="credit">آجل</option>
            </select>
          </div>

          {/* المبلغ المدفوع */}
          {paymentMethod === "credit" ? (
            <div>
              <label className="font-semibold">المبلغ المدفوع :</label>
              <input
                type="number"
                min="0"
                className="border p-2 ml-2 rounded w-[150px]"
                value={paidAmount}
                onChange={(e) => setPaidAmount(Number(e.target.value))}
              />
              <p className="mt-2">
                المتبقي :
                <strong>
                  {formatCurrency(
                    Math.max(
                      0,
                      (globalDiscountType === "percent"
                        ? totals.grandTotal -
                          (totals.grandTotal * (globalDiscountValue || 0)) / 100
                        : totals.grandTotal - (globalDiscountValue || 0)) -
                        paidAmount
                    )
                  )}
                </strong>
              </p>
            </div>
          ) : (
            <div>
              <p
                className={`mt-2 flex gap-2 items-center ${
                  paymentMethod === "cash" ? "text-green-600 font-bold" : ""
                }`}
              >
                المبلغ المدفوع :
                <strong>
                  {formatCurrency(
                    globalDiscountType === "percent"
                      ? totals.grandTotal -
                          (totals.grandTotal * (globalDiscountValue || 0)) / 100
                      : totals.grandTotal - (globalDiscountValue || 0)
                  )}
                </strong>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          حفظ الفاتورة
        </button>
        <button
          onClick={() => window.print()}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          طباعة
        </button>
      </div>
    </>
  );
};

export default InvoicePage;
