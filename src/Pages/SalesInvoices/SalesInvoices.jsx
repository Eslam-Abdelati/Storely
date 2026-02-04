import React, { useRef, useState } from "react";
import { arSD } from "@mui/x-data-grid/locales";

import { useNavigate } from "react-router-dom";

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
  useGridApiContext,
  useGridSelector,
  gridFilteredSortedRowIdsSelector,
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
import StatusBadge from "../../components/Dashboard/StatusBadge";
import {
  MdMoreVert,
  MdVisibility,
  MdEdit,
  MdLocalPrintshop,
} from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Cairo, Arial",
  },
});

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

const CustomToolbar = () => {
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const exportMenuTriggerRef = useRef(null);
  const apiRef = useGridApiContext();

  // 👈 عدد الصفوف بعد الفلترة + البحث + الترتيب
  const filteredRowsCount = useGridSelector(
    apiRef,
    gridFilteredSortedRowIdsSelector,
  ).length;

  return (
    <Toolbar>
      <Typography component="div" fontWeight="medium" sx={{ flex: 1, mx: 0.5 }}>
        <div className="flex items-center gap-3">
          <h4>قائمة الفواتير</h4>
          <span className="bg-[#f0f2f4] text-[#657286] text-[10px] font-bold px-2 py-0.5 rounded">
            {filteredRowsCount} نتيجة
          </span>
        </div>
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
};

const salesInvoices = () => {
  const navigate = useNavigate();

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
    {
      id: "INV-2024-006",
      invoiceNumber: "INV-2024-006",
      customer: "شركة سراج التجارية",
      customerId: "CUST-006",
      releaseDate: "2024-10-25",
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

    // ✅ نحول التاريخ لـ Date
    releaseDate: new Date(inv.releaseDate),

    // ✅ نخزن اسم الموظف مباشرة
    employee: inv.employee?.label || "غير محدد",

    itemsCount: inv.items.reduce((sum, item) => sum + item.qty, 0),
    netTotal: inv.netTotal,
    paymentStatus: inv.paymentStatus,
  }));

  const columns = [
    {
      field: "invoiceNumber",
      headerName: "رقم الفاتورة",
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <span
          onClick={() => navigate(`/invoices/${params.row.id}`)}
          className="text-blue-600 font-medium cursor-pointer hover:underline"
        >
          {params.value}
        </span>
      ),
    },

    {
      field: "customer",
      headerName: "العميل",
      width: 180,
      type: "string",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "releaseDate",
      headerName: "التاريخ",
      width: 130,
      type: "date",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "employee",
      headerName: "الموظف",
      width: 150,
      type: "string",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "itemsCount",
      headerName: "الأصناف",
      type: "number",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "netTotal",
      headerName: "الإجمالي",
      type: "number",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "paymentStatus",
      headerName: "حالة الدفع",
      width: 160,
      type: "singleSelect",
      valueOptions: [
        { value: "paid", label: "مدفوع" },
        { value: "partial", label: "مدفوع جزئي" },
        { value: "late", label: "متأخرة" },
        { value: "pending", label: "معلقة" },
        { value: "returned", label: "مرتجع" },
      ],
      align: "center",
      headerAlign: "center",
      renderCell: (params) => <StatusBadge status={params.value} />,
    },
  ];

  const data = { rows, columns };
  const loading = false;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="bg-white card-shadow rounded-xl border border-border-light p-2 mb-3">
        <div className="flex items-center gap-2">
          {/* 2) زر جديد */}
          <Button
            className="gap-2 w-fit"
            onClick={() => navigate("/add-salesinvoice")}
          >
            <IoMdAdd size={20} />
            <span className="!text-[#000000DE]">جديد</span>
          </Button>

          {/* 3) زر تعديل */}
          <Button
            className="gap-2 w-fit"
            // onClick={() => navigate("/invoices/new")}
          >
            <MdEdit size={20} className="text-purple-400" />
            <span className="!text-[#000000DE]">تعديل</span>
          </Button>

          {/* 4) زر حذف */}
          <Button
            className="gap-2 w-fit"
            // onClick={() => navigate("/invoices/new")}
          >
            <RiDeleteBin6Fill size={20} className="text-red-400" />
            <span className="!text-[#000000DE]">حذف</span>
          </Button>

          {/* 5) زر عرض */}
          <Button
            className="gap-2 w-fit"
            // onClick={() => navigate("/invoices/new")}
          >
            <MdVisibility size={20} className="text-gray-400" />
            <span className="!text-[#000000DE]">عرض</span>
          </Button>

          <Button
            className="gap-2 w-fit"
            // onClick={() => navigate("/invoices/new")}
          >
            <span className="!text-[#000000DE]">إدارة</span>
          </Button>
          <Button
            className="gap-2 w-fit"
            // onClick={() => navigate("/invoices/new")}
          >
            <span className="!text-[#000000DE]">خيارات</span>
          </Button>
        </div>
      </div>
      {/* عنوان الصفحة */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4 lg:gap-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {" "}
            فواتير المبيعات
          </h1>
          <p className="text-sm text-[#657286] mt-1">
            إدارة وتتبع فواتير المبيعات الخاصة بالمؤسسة
          </p>
        </div>
      </div>

      <Box
        dir="rtl"
        sx={{
          height: "100%",
          width: "100%",
          direction: "rtl",
        }}
      >
        <DataGrid
          {...data}
          localeText={{
            ...arSD.components.MuiDataGrid.defaultProps.localeText,
            columnMenuFilter: "تصفية",
          }}
          loading={loading}
          slots={{ toolbar: CustomToolbar }}
          showToolbar
          hideFooterPagination
          checkboxSelection
          sx={{
            direction: "rtl",

            "& .MuiDataGrid-columnHeaders": {
              direction: "rtl",
              textAlign: "center",
            },

            "& .MuiDataGrid-cell": {
              textAlign: "center",
            },

            "& .MuiDataGrid-toolbarContainer": {
              direction: "rtl",
            },
          }}
        />
      </Box>
    </ThemeProvider>
  );
};
export default salesInvoices;
