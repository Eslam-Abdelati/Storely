import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = Cookies.get("token");
  const userType = Cookies.get("userType");

  // لو مفيش توكن او مش مسجل دخول مش هيدخل علي اي راوت يرجع علي صفحة اللوجن
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // لو الرول غير مسموح
  if (allowedRoles && !allowedRoles.includes(userType)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
