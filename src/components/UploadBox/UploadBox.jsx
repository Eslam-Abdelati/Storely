import React, { useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { MdOutlineCloudUpload, MdDelete } from "react-icons/md";

export default function UploadBox(props) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      if (props.onFileSelect) {
        props.onFileSelect(file); // نبعته للأب
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (props.onFileSelect) {
    props.onFileSelect(null); // نفضي الفورم كمان
  }
  };

  return (
    <div className="w-full">
      {preview ? (
        // صورة مرفوعة
        <div className="relative w-[200px] h-[200px] border-2 border-dashed border-[rgba(0,0,0,0.2)] rounded-md overflow-hidden">
          {/* زر الحذف فوق الديف ككل */}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full shadow-md hover:bg-red-700 transition z-50"
          >
            <MdDelete size={20} />
          </button>

          {/* معاينة الصورة */}
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-contain"
          />

          {/* لتغيير الصورة */}
          <input
            type="file"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        // شكل البوكس الأصلي
        <div className="uploadBox relative cursor-pointer p-3 rounded-md overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.1)] bg-white hover:border-[rgba(0,0,0,0.5)] flex items-center gap-4 transition-all">
          <FaRegImage className="text-[30px] opacity-15 pointer-events-none" />
          <MdOutlineCloudUpload className="text-[30px] mr-7 text-primary pointer-events-none" />
          <h4 className="text-[rgba(0,0,0,0.5)] pointer-events-none">
            اختر من جهازك
          </h4>
          <input
            type="file"
            id={props.id}
            className="absolute top-0 left-0 w-full h-full z-50 opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
}
