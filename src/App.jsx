import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

import "react-toastify/dist/ReactToastify.css";

import Login from "./Pages/Login/Login";
import Layot from "./Pages/Layot/Layot";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SignUp2 from "./Pages/SignUp/SignUp2";
import ForgotPassword from "./Pages/ForgotPassword/Forgotpassword";
import VerifyOTP from "./Pages/VerifyOtp/VerifyOtp";
import Productes from "./Pages/Productes/Productes";
import AddProduct from "./Pages/AddProduct/AddProduct";
import Category from "./Pages/Category/Category";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import ProductLabel from "./components/ProductLabel/ProductLabel";
import FirstSignUp from "./Pages/SignUp/FirstSignUp";
import SalesInvoiceDetails from "./Pages/SalesInvoiceDetails/SalesInvoiceDetails";
import SalesInvoices from "./Pages/SalesInvoices/SalesInvoices";
import AddSalesInvoice from "./Pages/AddSalesInvoice/AddSalesInvoice";
import AddPaymentPage from "./Pages/AddPaymentPage/AddPaymentPage";
import Purchases from "./Pages/Purchases/Purchases";
import Suppliers from "./Pages/Suppliers/Suppliers";
import AddSupplier from "./Pages/AddSupplier/AddSupplier";

import PublicRoute from "./components/PublicRoute/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const theme = createTheme({
  typography: {
    fontFamily: [
      "ui-sans-serif",
      "system-ui",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Noto Color Emoji",
    ].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>

          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<FirstSignUp />} />
            <Route path="/sign-up2" element={<SignUp2 />} />
            <Route path="/verify" element={<VerifyOTP />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<Layot />}>
              <Route index element={<Dashboard />} />
              <Route path="product" element={<Productes />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="product/label" element={<ProductLabel />} />
              <Route path="category" element={<Category />} />
              <Route path="sales_invoice" element={<SalesInvoices />} />
              <Route
                path="sales_invoice/add-salesinvoice"
                element={<AddSalesInvoice />}
              />
              <Route path="sales_invoice/:id" element={<SalesInvoiceDetails />} />
              <Route
                path="sales_invoice/:id/payments/add"
                element={<AddPaymentPage />}
              />
              <Route path="purchases" element={<Purchases />} />
              <Route path="supliers" element={<Suppliers />} />
              <Route path="add-suplier" element={<AddSupplier />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  );
}

export default App;
