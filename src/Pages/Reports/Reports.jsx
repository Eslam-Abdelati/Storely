import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import {
  DataGrid,
  Toolbar,
  ToolbarButton,
  ColumnsPanelTrigger,
  FilterPanelTrigger,
  ExportCsv,
  ExportPrint,
  QuickFilter,
  QuickFilterControl,
  QuickFilterClear,
  QuickFilterTrigger,
} from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FilterListIcon from "@mui/icons-material/FilterList";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import {
  MdMoreVert,
  MdVisibility,
  MdEdit,
  MdLocalPrintshop,
} from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

// 1) Button Hover Style
const MyToolbarButton = styled(ToolbarButton)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "6px 10px",
  borderRadius: 10,
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: "#f0f0f0",
    transform: "translateY(-1px)",
  },

  "& .MuiSvgIcon-root": {
    fontSize: 18,
  },
}));

const StyledQuickFilter = styled(QuickFilter)({
  display: "grid",
  alignItems: "center",
});

const StyledToolbarButton = styled(ToolbarButton)(({ theme, ownerState }) => ({
  gridArea: "1 / 1",
  width: "min-content",
  height: "min-content",
  zIndex: 1,
  opacity: ownerState.expanded ? 0 : 1,
  pointerEvents: ownerState.expanded ? "none" : "auto",
  transition: theme.transitions.create(["opacity"]),
}));

const StyledTextField = styled(TextField)(({ theme, ownerState }) => ({
  gridArea: "1 / 1",
  overflowX: "clip",
  width: ownerState.expanded ? 260 : "var(--trigger-width)",
  opacity: ownerState.expanded ? 1 : 0,
  transition: theme.transitions.create(["width", "opacity"]),
}));

function CustomToolbar() {
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const exportMenuTriggerRef = useRef(null);

  return (
    <Toolbar>
      <Typography fontWeight="medium" sx={{ flex: 1, mx: 0.5 }}>
        لوحة التحكم
      </Typography>

      {/* Columns */}
      <ColumnsPanelTrigger render={<MyToolbarButton />}>
        <ViewColumnIcon />
        <span className="text-sm">الأعمدة</span>
      </ColumnsPanelTrigger>

      {/* Filters */}
      <FilterPanelTrigger
        render={(props, state) => (
          <MyToolbarButton {...props} color="default">
            <Badge
              badgeContent={state.filterCount}
              color="primary"
              variant="dot"
            >
              <FilterListIcon />
              <span className="text-sm">تصفية</span>
            </Badge>
          </MyToolbarButton>
        )}
      />

      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ mx: 0.5 }}
      />

      {/* Export */}
      <MyToolbarButton
        ref={exportMenuTriggerRef}
        id="export-menu-trigger"
        aria-controls="export-menu"
        aria-haspopup="true"
        aria-expanded={exportMenuOpen ? "true" : undefined}
        onClick={() => setExportMenuOpen(true)}
      >
        <FileDownloadIcon />
        <span className="text-sm">تصدير</span>
      </MyToolbarButton>

      <Menu
        id="export-menu"
        anchorEl={exportMenuTriggerRef.current}
        open={exportMenuOpen}
        onClose={() => setExportMenuOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          list: {
            "aria-labelledby": "export-menu-trigger",
          },
        }}
      >
        <ExportPrint
          render={<MenuItem />}
          onClick={() => setExportMenuOpen(false)}
        >
          طباعة
        </ExportPrint>
        <ExportCsv
          render={<MenuItem />}
          onClick={() => setExportMenuOpen(false)}
        >
          تحميل CSV
        </ExportCsv>
      </Menu>
    </Toolbar>
  );
}

export default function GridToolbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const salesInvoicesData = [
    {
      id: "INV-2024-001",
      invoiceNumber: "INV-2024-001",
      customer: "شركة الأمل التجارية",
      customerId: "CUST-001",
      releaseDate: "2024-10-15",
      employee: { value: "emp1", label: "سامي محمد" },
      items: [
        { name: "هاتف سامسونج A54", qty: 2, price: 6500 },
        { name: "شاحن سريع", qty: 1, price: 300 },
      ],
      netTotal: 13300,
      paymentStatus: "paid",
      returned: 0,
    },
    {
      id: "INV-2024-002",
      invoiceNumber: "INV-2024-002",
      customer: "مؤسسة النجاح",
      customerId: "CUST-002",
      releaseDate: "2024-10-14",
      employee: { value: "emp2", label: "محمود علي" },
      items: [
        { name: "ايفون 14", qty: 1, price: 22000 },
        { name: "جراب حماية", qty: 2, price: 150 },
      ],
      netTotal: 22300,
      paymentStatus: "late",
      returned: 0,
    },
    {
      id: "INV-2024-003",
      invoiceNumber: "INV-2024-003",
      customer: "مركز التقنية الحديثة",
      customerId: "CUST-003",
      releaseDate: "2024-10-14",
      employee: { value: "emp3", label: "أحمد سامي" },
      items: [
        { name: "لابتوب Dell", qty: 1, price: 18000 },
        { name: "ماوس لاسلكي", qty: 1, price: 350 },
      ],
      netTotal: 18350,
      paymentStatus: "partial",
      returned: 0,
    },
    {
      id: "INV-2024-004",
      invoiceNumber: "INV-2024-004",
      customer: "سليمان العلي",
      customerId: "CUST-004",
      releaseDate: "2024-10-13",
      employee: { value: "emp4", label: "محمد عبد الله" },
      items: [
        { name: "هاتف شاومي 13", qty: 1, price: 9500 },
        { name: "سماعة بلوتوث", qty: 1, price: 600 },
      ],
      netTotal: 10100,
      paymentStatus: "returned",
      returned: 300,
    },
    {
      id: "INV-2024-005",
      invoiceNumber: "INV-2024-005",
      customer: "شركة الأمل التجارية",
      customerId: "CUST-005",
      releaseDate: "2024-10-12",
      employee: { value: "emp1", label: "سامي محمد" },
      items: [
        { name: "تابلت سامسونج", qty: 1, price: 12000 },
        { name: "قلم S-Pen", qty: 1, price: 900 },
      ],
      netTotal: 12900,
      paymentStatus: "pending",
      returned: 500,
    },
  ];

  // هنا نعمل حقل customerInfo داخل كل row
  const rows = salesInvoicesData.map((inv) => ({
    id: inv.id,
    invoiceNumber: inv.invoiceNumber,
    customer: inv.customer,
    releaseDate: inv.releaseDate,
    employee: inv.employee,
    itemsCount: inv.items.reduce((sum, item) => sum + item.qty, 0),
    netTotal: inv.netTotal,
    paymentStatus: inv.paymentStatus,
  }));

  const columns = [
    {
      field: "invoiceNumber",
      headerName: "رقم الفاتورة",
      width: 120,
      align: "center",
      headerAlign: "center",
       renderCell: (params) => (
    <span className="text-blue-600 font-medium cursor-pointer hover:underline">
      {params.value}
    </span>
  ),
    },
    {
      field: "customer",
      headerName: "العميل",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "releaseDate",
      headerName: "التاريخ",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "employee",
      headerName: "الموظف",
      width: 120,
      renderCell: (params) => params.value?.label || "غير محدد",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "itemsCount",
      headerName: "عدد المنتجات",
      type: "number",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "netTotal",
      headerName: "الإجمالي",
      type: "number",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "paymentStatus",
      headerName: "حالة الدفع",
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box>
            <StatusBadge status={params.value} />
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "الإجراءات",
      width: 160,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,

      renderCell: () => {
        const open = Boolean(anchorEl);

        const handleOpen = (event) => {
          setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
          setAnchorEl(null);
        };

        return (
          <div className="flex items-center justify-center">
            <button
              onClick={handleOpen}
              className="p-1.5 text-primary bg-blue-50 rounded-lg transition-colors ring-2 ring-primary/20"
            >
              <MdMoreVert />
            </button>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleClose}>
                <MdVisibility className="ml-2" /> عرض التفاصيل
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <MdEdit className="ml-2" /> تعديل
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <MdLocalPrintshop className="ml-2" /> طباعة
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose} sx={{ color: "red" }}>
                <RiDeleteBin6Fill className="ml-2" /> حذف
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];
  const data = { rows, columns };
  const loading = false;

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        {...data}
        loading={loading}
        slots={{ toolbar: CustomToolbar }}
        showToolbar
        pageSizeOptions={[10, 25, 50, 100]}
        checkboxSelection
        localeText={{
          toolbarDensity: "حجم الصفوف",
          toolbarDensityLabel: "حجم الصفوف",
          toolbarDensityCompact: "صغير",
          toolbarDensityStandard: "عادي",
          toolbarDensityComfortable: "مريح",

          toolbarColumns: "الأعمدة",
          toolbarColumnsLabel: "اختر الأعمدة",

          toolbarFilters: "الفلتر",
          toolbarFiltersLabel: "إظهار الفلتر",
          toolbarFiltersTooltipHide: "إخفاء الفلتر",
          toolbarFiltersTooltipShow: "إظهار الفلتر",

          toolbarExport: "تصدير",
          toolbarExportLabel: "تصدير",
          toolbarExportCSV: "تحميل CSV",
          toolbarExportPrint: "طباعة",

          columnMenuLabel: "القائمة",
          columnMenuShowColumns: "إظهار الأعمدة",
          columnMenuFilter: "تصفية",
          columnMenuHideColumn: "إخفاء العمود",
          columnMenuUnsort: "إلغاء الترتيب",
          columnMenuSortAsc: "ترتيب تصاعدي",
          columnMenuSortDesc: "ترتيب تنازلي",
          columnMenuManageColumns: "إدارة الأعمدة",

          filterPanelAddFilter: "إضافة فلتر",
          filterPanelDeleteIconLabel: "حذف",
          filterPanelOperators: "المقارنة",
          filterPanelOperatorAnd: "و",
          filterPanelOperatorOr: "أو",
          filterPanelColumns: "العمود",
          filterPanelInputLabel: "القيمة",
          filterPanelInputPlaceholder: "قيمة الفلتر",

          filterOperatorContains: "يحتوي على",
          filterOperatorNotContains: "لا يحتوي على",
          filterOperatorEquals: "يساوي",
          filterOperatorNotEquals: "لا يساوي",
          filterOperatorStartsWith: "يبدأ بـ",
          filterOperatorEndsWith: "ينتهي بـ",
          filterOperatorIsEmpty: "فارغ",
          filterOperatorIsNotEmpty: "غير فارغ",
          filterOperatorIsAnyOf: "أي من",

          toolbarQuickFilterPlaceholder: "ابحث...",
        }}
      />
    </div>
  );
}
