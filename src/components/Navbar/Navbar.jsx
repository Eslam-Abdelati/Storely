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
import { FaRegUser } from "react-icons/fa6";
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="w-full h-[auto] py-2 pl-[20px] false shadow-md pr-7 bg-[#fff]  flex items-center justify-between transition-all z-[50]">
      <div className="part1 flex items-center gap-4">
        <Button
          className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[rgba(0,0,0,0.8)]"
          onClick={() => setIsOpenSidbar(!isOpenSidbar)}
        >
          <RiMenu2Line className="text-[18px] text-[rgba(0,0,0,0.8)]" />
        </Button>
      </div>

      <div className="part2 flex items-center justify-end gap-3">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="secondary">
            <FaRegBell className="!text-[23px]" />
          </StyledBadge>
        </IconButton>

        <div className="relative flex items-center gap-4">
          <LiaUserCircle
            className="text-[30px] text-[rgb(75,85,99)] cursor-pointer"
            onClick={handleClick}
          />
          <div className="cursor-pointer" onClick={handleClick}>
            <h3 className="name-user text-[15px] text-[rgb(75,85,99)]">
              Eslam
            </h3>
            <p className="text-[12px] text-[rgb(75,85,99)]">
              eslam_abdelati@yahoo.com
            </p>
          </div>

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
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
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
            <Link to={"/"}>
              <MenuItem
                onClick={handleClose}
                className="flex items-center gap-3"
              >
                <MdEmail className="text-[18px]" />
                <span className="text-[16px]">تغيير البريد الإلكتروني</span>
              </MenuItem>
            </Link>

            <Link to={"/"}>
              <MenuItem
                onClick={handleClose}
                className="flex items-center gap-3"
              >
                <FaLock className="text-[18px]" />
                <span className="text-[16px]">تغيير كلمة المرور</span>
              </MenuItem>
            </Link>

            <MenuItem onClick={handleClose} className="flex items-center gap-3">
              <IoMdLogOut className="text-[18px]" />
              <span className="text-[16px]">تسجيل الخروج</span>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
