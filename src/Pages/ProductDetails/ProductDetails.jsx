import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Badge from "../../components/Badge/Badge";
import Button from "@mui/material/Button";
import { MdOutlineEdit } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi2";
import ProductData from "../../components/ProductData/ProductData";
import ProductMovement from "../../components/ProductMovement/ProductMovement";
import { FaAngleDown } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

function ProductDetails() {
  const navigate = useNavigate();

  const [value, setValue] = useState("1");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      {/* Header */}
      <div className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <div className="flex items-center justify-between p-4 text-[rgb(30,64,175)] gap-1">
          <h4 className="text-[16px] font-[600] mb-2 lg:mb-0 flex items-center gap-2">
            سامسونج A52
            <Badge status="في المخزون" />
          </h4>
          <Button className="btn-blue !text-white btn-sm flex items-center gap-2">
            <MdOutlineEdit className="text-[20px]" />
            تعديل
          </Button>
        </div>
      </div>

      {/* Product Details */}
      <div className="action-btn flex items-center">
        <Button className="btn-border !rounded-none flex items-center gap-1">
          <MdOutlineEdit className="text-[20px]" />
          تعديل
        </Button>
        <Button className="btn-border !rounded-none flex items-center gap-1">
          <HiOutlineTrash className="text-[20px]" />
          حذف
        </Button>
        <Button
          className="btn-border !rounded-none flex items-center gap-1"
          onClick={handleClick}
        >
          طباعة
          <FaAngleDown />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/app/product/label");
            }}
          >
            ملصق
          </MenuItem>
          <MenuItem onClick={handleClose}>بيانات الصنف</MenuItem>
          <MenuItem onClick={handleClose}>حركات الصنف</MenuItem>
        </Menu>
        <Button className="btn-border !rounded-none">تصدير الحركات Exel</Button>
      </div>
      <div className="card p-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="بيانات أساسية" value="1" />
                <Tab label="حركات الصنف" value="2" />
                <Tab label="الجدول الزمني" value="3" />
                <Tab label="سجل النشاطات" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ProductData />
            </TabPanel>
            <TabPanel value="2">
              <ProductMovement />
            </TabPanel>
            <TabPanel value="3">aa</TabPanel>
            <TabPanel value="4">aa</TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}

export default ProductDetails;
