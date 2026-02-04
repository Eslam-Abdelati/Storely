import React from "react";
import { GrLanguage } from "react-icons/gr";
import { IoMail } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import Button from "@mui/material/Button";
import { MdDomain } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary p-2 rounded-lg">
                <span className="material-icons-round text-white">
                  <MdDomain />
                </span>
              </div>
              <h2 className="text-white text-xl font-bold">
                نظام إدارة الموارد المتكامل
              </h2>
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              نحن نقدم حلولاً تقنية متقدمة لإدارة الشركات والمؤسسات بكفاءة
              عالية، مما يساعدك على التركيز على نمو أعمالك بينما نتولى نحن
              التفاصيل التقنية.
            </p>
            <div className="flex gap-4 mt-8">
              <Link className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                <span className="material-icons-round text-lg">
                  <FaFacebook />
                </span>
              </Link>
              <Link className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                <span className="material-icons-round text-lg">
                  <GrLanguage />
                </span>
              </Link>
              <Link className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                <span className="material-icons-round text-lg">
                  <IoMail />
                </span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6">روابط سريعة</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  دليل الاستخدام
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  شروط الخدمة
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs">
          <p>
            جميع الحقوق محفوظة © 2024 نظام إدارة الموارد المتكامل - منصة الأعمال
            الذكية
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
