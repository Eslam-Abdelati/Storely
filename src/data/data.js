// src/data/appData.js

export const customersList = [
  {
    id: 1,
    name: "أحمد عمار",
    phone: "01012345678",
    address: "الوادي الجديد - بلاط",
  },
  {
    id: 2,
    name: "إسلام عمار",
    phone: "01098765432",
    address: "الوادي الجديد - الداخلة",
  },
  {
    id: 3,
    name: "محمد حمدي",
    phone: "01122223333",
    address: "الوادي الجديد - الخارجة",
  },
];

export const productsList = [
  { id: 1, barcode: "111", name: "موبايل سامسونج", price: 5000, stock: 20 },
  { id: 2, barcode: "222", name: "شاحن اصلي", price: 250, stock: 50 },
  { id: 3, barcode: "333", name: "كابل USB", price: 100, stock: 100 },
  { id: 4, barcode: "444", name: "oppo reno 5", price: 5000, stock: 15 },
  { id: 5, barcode: "555", name: "سماعة ايربود", price: 250, stock: 40 },
];

export const suppliersList = [
  {
    id: 1,
    name: "شركة الهواتف المتحدة",
    phone: "01000000000",
    address: "القاهرة",
  },
  { id: 2, name: "Tech Store", phone: "01011111111", address: "الإسكندرية" },
];

export const employeesList = [
  { id: 1, name: "محمد أحمد", role: "محاسب" },
  { id: 2, name: "إسلام عمار", role: "مدير مبيعات" },
  { id: 3, name: "علي محمود", role: "بائع" },
];

export const invoicesList = []; // ← هنا ستُضاف الفواتير عند الحفظ
