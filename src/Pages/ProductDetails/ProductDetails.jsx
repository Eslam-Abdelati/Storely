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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 text-[rgb(30,64,175)] gap-3">
          <h4 className="text-base sm:text-lg md:text-xl font-semibold flex items-center flex-wrap gap-2 text-center sm:text-start">
            سامسونج A52
            <Badge status="في المخزون" />
          </h4>

          <div className="flex justify-center sm:justify-end w-full sm:w-auto">
            <Button className="btn-blue !text-white btn-sm flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2">
              <MdOutlineEdit className="text-[18px] sm:text-[20px]" />
              تعديل
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="action-btn flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 my-3">
        <Button className="btn-border !rounded-md flex items-center justify-center gap-1 text-sm sm:text-base w-full sm:w-auto px-4 py-2">
          <MdOutlineEdit className="text-[18px] sm:text-[20px]" />
          تعديل
        </Button>

        <Button className="btn-border !rounded-md flex items-center justify-center gap-1 text-sm sm:text-base w-full sm:w-auto px-4 py-2">
          <HiOutlineTrash className="text-[18px] sm:text-[20px]" />
          حذف
        </Button>

        <div className="relative w-full sm:w-auto">
          <Button
            className="btn-border !rounded-md flex items-center justify-center gap-1 text-sm sm:text-base w-full sm:w-auto px-4 py-2"
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
        </div>

        <Button className="btn-border !rounded-md flex items-center justify-center gap-1 text-sm sm:text-base w-full sm:w-auto px-4 py-2">
          تصدير  Excel
        </Button>
      </div>

      <div className="card p-3 sm:p-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
  <Box sx={{ width: "100%", typography: "body1" }}>
    <TabContext value={value}>
      {/* التابات */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          overflowX: "auto", // ✅ يسمح بالتمرير الأفقي على الموبايل
        }}
      >
        <TabList
          onChange={handleTabChange}
          aria-label="tabs"
          variant="scrollable" // ✅ يجعل التابات قابلة للتمرير على الشاشات الصغيرة
          scrollButtons="auto" // ✅ يظهر أزرار التمرير فقط عند الحاجة
        >
          <Tab
            label="بيانات أساسية"
            value="1"
            sx={{
              fontSize: { xs: "12px", sm: "14px", md: "15px" },
              minWidth: { xs: 100, sm: 120 },
            }}
          />
          <Tab
            label="حركات الصنف"
            value="2"
            sx={{
              fontSize: { xs: "12px", sm: "14px", md: "15px" },
              minWidth: { xs: 100, sm: 120 },
            }}
          />
          <Tab
            label="الجدول الزمني"
            value="3"
            sx={{
              fontSize: { xs: "12px", sm: "14px", md: "15px" },
              minWidth: { xs: 100, sm: 120 },
            }}
          />
          <Tab
            label="سجل النشاطات"
            value="4"
            sx={{
              fontSize: { xs: "12px", sm: "14px", md: "15px" },
              minWidth: { xs: 100, sm: 120 },
            }}
          />
        </TabList>
      </Box>

      {/* المحتوى */}
      <TabPanel value="1" sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        <ProductData />
      </TabPanel>
      <TabPanel value="2" sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        <ProductMovement />
      </TabPanel>
      <TabPanel value="3" sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        aa
      </TabPanel>
      <TabPanel value="4" sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        aa
      </TabPanel>
    </TabContext>
  </Box>
</div>

    </div>
  );
}

export default ProductDetails;
