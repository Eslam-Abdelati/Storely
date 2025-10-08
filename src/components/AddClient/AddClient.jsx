import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
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

  // نقل التركيز إلى أول حقل عند فتح المودال
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

    // إرسال بيانات العميل إلى AddInv
    onSave({
      value: Date.now(), // معرف فريد مؤقت
      label: formData.clientName,
      phone: formData.clientPhone,
      address: formData.clientAddress,
      email: formData.clientEmail,
    });

    // إغلاق المودال
    onClose();
    // إعادة تعيين النموذج
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
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="add-client-dialog">
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
      <DialogContent dividers className="!w-[600px]">
        <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="font-medium" htmlFor="client-name">
              اسم العميل
            </label>
            <input
              ref={firstInputRef}
              type="text"
              id="client-name"
              name="clientName"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ادخل اسم العميل"
              required
              autoComplete="name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium" htmlFor="client-phone">
              رقم الهاتف
            </label>

            <input
              type="tel"
              id="client-phone"
              name="clientPhone"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ادخل رقم الهاتف"
              required
              autoComplete="tel"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium" htmlFor="client-email">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="client-email"
              name="clientEmail"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ادخل البريد الإلكتروني"
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium" htmlFor="client-address">
              العنوان
            </label>
            <input
              type="text"
              id="client-address"
              name="clientAddress"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ادخل العنوان"
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={handleSubmit} className="btn-blue !ml-2">
          حفظ
        </Button>
        <Button
          onClick={onClose}
          className="!bg-[#b1b1b1] hover:!bg-[#9e9e9e] !text-[rgb(0,0,0,0.7)]"
        >
          الغاء
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default AddClient;
