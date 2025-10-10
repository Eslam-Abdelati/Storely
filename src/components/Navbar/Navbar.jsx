import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { RiMenu2Line } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { MyContext } from "../../context/MyContext";
import { LiaUserCircle } from "react-icons/lia";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Navbar = () => {
  const { isOpenSidbar, setIsOpenSidbar } = useContext(MyContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const user = {
    name: "Eslam",
    email: "eslam_abdelati@yahoo.com",
  };

  return (
    <header className="w-full bg-white shadow-md flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3 z-[50]">
      {/* زر القائمة الجانبية */}
      <div className="flex items-center gap-2">
        <Button
          className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[rgba(0,0,0,0.8)]"
          onClick={() => setIsOpenSidbar(!isOpenSidbar)}
        >
          <RiMenu2Line className="text-[20px]" />
        </Button>
      </div>

      {/* الجزء الأيمن */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* إشعار الجرس */}
        <IconButton aria-label="notifications" className="hidden sm:flex">
          <StyledBadge badgeContent={4} color="secondary">
            <FaRegBell className="!text-[22px]" />
          </StyledBadge>
        </IconButton>

        {/* المستخدم */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          onClick={handleClick}
        >
          <LiaUserCircle className="text-[32px] text-gray-600" />
          {/* الاسم والبريد في الشاشات الكبيرة فقط */}
          <div className="hidden sm:flex flex-col text-end">
            <h3 className="text-[14px] sm:text-[15px] text-gray-700 font-medium">
              {user.name}
            </h3>
            <p className="text-[11px] sm:text-[12px] text-gray-500">
              {user.email}
            </p>
          </div>
        </div>

        {/* القائمة المنسدلة */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {/* ✅ يظهر فقط في الموبايل */}
          <div className="sm:hidden px-4 py-3 border-b border-gray-200">
            <h3 className="text-[15px] font-medium text-gray-800">
              {user.name}
            </h3>
            <p className="text-[13px] text-gray-500">{user.email}</p>
          </div>

          <Link to={"/"}>
            <MenuItem className="flex items-center gap-3">
              <MdEmail className="text-[18px]" />
              <span className="text-[15px]">تغيير البريد الإلكتروني</span>
            </MenuItem>
          </Link>

          <Link to={"/"}>
            <MenuItem className="flex items-center gap-3">
              <FaLock className="text-[18px]" />
              <span className="text-[15px]">تغيير كلمة المرور</span>
            </MenuItem>
          </Link>

          <MenuItem className="flex items-center gap-3">
            <IoMdLogOut className="text-[18px]" />
            <span className="text-[15px]">تسجيل الخروج</span>
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Navbar;
