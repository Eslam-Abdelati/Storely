import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./Pages/Login/Login";
import Layot from "./Pages/Layot/Layot";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SignUp2 from "./Pages/SignUp/SignUp2";
import SignUp from "./Pages/SignUp/SignUp";
import ForgotPassword from "./Pages/ForgotPassword/Forgotpassword";
import VerifyOTP from "./Pages/VerifyOtp/VerifyOtp";
import Productes from "./Pages/Productes/Productes";
import AddProduct from "./Pages/AddProduct/AddProduct";
import Category from "./Pages/Category/Category";
import PosShifts from "./Pages/PosShifts/PosShifts";
import POS from "./Pages/POS/POS";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import ProductLabel from "./components/ProductLabel/ProductLabel";

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
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/first_settings" element={<SignUp2 />} />
            <Route path="/verify" element={<VerifyOTP />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* صفحة أب فيها children */}
            <Route path="/" element={<Layot />}>
              <Route index element={<Dashboard />} />
              <Route path="/product" element={<Productes />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/product/label" element={<ProductLabel />} />
              <Route path="/category" element={<Category />} />
              <Route path="/pos_shifts" element={<PosShifts />} />
              <Route path="/pos" element={<POS />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
      </ThemeProvider>
    </>
  );
}

export default App;
