import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { IoClose } from "react-icons/io5";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function AddClient({ open, onClose, onSave }) {
  const firstInputRef = useRef(null);

  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    clientAddress: "",
  });

  useEffect(() => {
    if (open && firstInputRef.current) {
      firstInputRef.current.focus({ preventScroll: true });
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientName) {
      alert("⚠️ الرجاء إدخال اسم العميل");
      return;
    }

    onSave({
      value: Date.now(),
      label: formData.clientName,
      phone: formData.clientPhone,
      address: formData.clientAddress,
      email: formData.clientEmail,
    });

    onClose();
    setFormData({
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      clientAddress: "",
    });
  };

  return (
    <BootstrapDialog
      onClose={onClose}
      open={open}
      aria-labelledby="add-client-dialog"
      fullWidth
      maxWidth="sm" // يجعل الحجم متوسطًا على الشاشات الكبيرة
      PaperProps={{
        sx: {
          borderRadius: 3,
          width: "100%",
          mx: 2, // مسافة جانبية على الموبايل
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1.2rem",
        }}
        id="add-client-dialog"
      >
        عميل جديد
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          left: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <IoClose />
      </IconButton>

      <DialogContent dividers>
        <form
          className="w-full flex flex-col gap-3 sm:gap-4"
          onSubmit={handleSubmit}
        >
          {/* اسم العميل */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm sm:text-base" htmlFor="client-name">
              اسم العميل
            </label>
            <input
              ref={firstInputRef}
              type="text"
              id="client-name"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ادخل اسم العميل"
              required
              autoComplete="name"
            />
          </div>

          {/* رقم الهاتف */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm sm:text-base" htmlFor="client-phone">
              رقم الهاتف
            </label>
            <input
              type="tel"
              id="client-phone"
              name="clientPhone"
              value={formData.clientPhone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ادخل رقم الهاتف"
              required
              autoComplete="tel"
            />
          </div>

          {/* البريد الإلكتروني */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm sm:text-base" htmlFor="client-email">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="client-email"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ادخل البريد الإلكتروني"
              autoComplete="email"
            />
          </div>

          {/* العنوان */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm sm:text-base" htmlFor="client-address">
              العنوان
            </label>
            <input
              type="text"
              id="client-address"
              name="clientAddress"
              value={formData.clientAddress}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ادخل العنوان"
            />
          </div>
        </form>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          gap: 1.5,
          p: 2,
        }}
      >
        <Button
          type="button"
          onClick={handleSubmit}
          fullWidth
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
        >
          حفظ
        </Button>
        <Button
          onClick={onClose}
          fullWidth
          sx={{
            backgroundColor: "#bdbdbd",
            color: "#000000b3",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#9e9e9e" },
          }}
        >
          إلغاء
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default AddClient;
