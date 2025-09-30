import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const formattedDate = `${year}/${month}/${day}`;

const deviceOptions = [
  { value: "Main POS Device", label: "Main POS Device" },
  { value: "Main ", label: " Device" },
];

function PosShifts() {
  const navigat = useNavigate();
  const [formData, setFormData] = useState({
    shiftNumber: 1,
    employee: "عثمان",
    device: deviceOptions[0],
    amount: "",
    date: formattedDate,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 📌 لتحديث الـ Select
  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFormData((prev) => ({ ...prev, [name]: selectedOption }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // هنا تقدر تبعتها للباك إند باستخدام Axios أو Fetch
    console.log("Form Data:", formData);
    navigat("/pos");
    // مثال Axios
    // axios.post("/api/shifts", formData).then(res => console.log(res.data));
  };

  return (
    <section>
      <div className="w-full pt-1 pb-2 px-5 bg-[rgba(255,255,255,0.8)] border border-[rgb(219,234,254)] flex items-center mb-5 justify-between rounded-md">
        <div className="info w-full">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-[18px] lg:text-[20px] font-bold leading-8 lg:leading-10">
              وردية #
              <span className="text-primary capitalize px-2">
                {formData.shiftNumber}
              </span>
            </h3>
            <p className="text-primary">{"جلاكسي فون MGAPH05002"}</p>
          </div>
          <p className="text-[rgb(75,85,99)]">{formData.date}</p>
          <p className="text-[rgb(75,85,99)]">
            {formData.device ? formData.device.label : "اختر الجهاز"}
          </p>
          <p className="text-[rgb(75,85,99)]">
            موظف الخزينة: {formData.employee}
          </p>
        </div>
      </div>

      <div className="card my-4 shadow-sm rounded-md bg-[rgba(255,255,255,0.6)] border border-[rgb(219,234,254)]">
        <div className="flex items-center p-4 text-[rgb(30,64,175)] gap-1 ">
          <h4 className="text-[16px] font-[600] mb-2 lg:mb-0 flex items-center gap-2">
            تفاصيل الوردية
          </h4>
        </div>

        <div className="flex items-center  px-5 py-4">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full flex items-center justify-between gap-3 mb-4">
              {/* مبلغ البدء */}
              <div className="form-group w-full flex flex-col gap-2">
                <label
                  htmlFor="amount"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                >
                  مبلغ البدء
                  <span className="text-red-500">*</span>
                </label>
                <TextField
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  className="bg-white"
                  required
                />
              </div>

              {/* الجهاز */}
              <div className="form-group w-full flex flex-col gap-2">
                <label
                  htmlFor="device"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                >
                  جهاز
                  <span className="text-red-500">*</span>
                </label>
                <Select
                  inputId="device"
                  name="device"
                  options={deviceOptions}
                  value={formData.device}
                  onChange={handleSelectChange}
                  placeholder="اختر الجهاز"
                  isSearchable={false}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button type="submit" className="btn-green w-[50%]">
                تأكيد
              </Button>
              <Button type="button" className="btn-red w-[50%]">
                الغاء
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PosShifts;
