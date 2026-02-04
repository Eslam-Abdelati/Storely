import Button from "@mui/material/Button";
import { MdCorporateFare } from "react-icons/md";
import { MdCloudDone } from "react-icons/md";
import { MdSavings } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { MdLocalShipping } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";

import { IoMail } from "react-icons/io5";
import Navbar from "../../components/Landing/Navbar";
import registerBg from "../../assets/photo-1497366216548-37526070297c.avif";
import Footer from "../../components/Landing/Footer";
import { useState } from "react";
import PageLoader from "../../components/PageLoader/PageLoader";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setLoading(true);

    // هنا ممكن تحط عملية فعلية زي API call
    setTimeout(() => {
      setLoading(false);
      navigate("/register");
    }, 2500); // 1 ثانية للعرض
  };
  return (
    <>
      {loading && <PageLoader/>}

      <div className="bg-background-light  text-[#111418] transition-colors duration-300">
        {/* Navigation Bar */}

        <Navbar />

        {/* Background */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          {/* Overlay داكن */}
          <div className="absolute inset-0 bg-black/70 z-10"></div>

          {/* Background image */}
          <img
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
            src={registerBg}
          />

          {/* Content فوق الصورة */}
          <div className="relative z-20 w-full lg:w-1/2 flex flex-col gap-6 text-right px-4 md:px-0">
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              إدارة أعمالك بكل <span className="text-primary">سهولة وذكاء</span>
            </h1>

            <p className="text-[#cbd5e1] text-lg max-w-[550px]">
              تحكّم في المبيعات، المخازن، الفواتير، والموظفين من مكان واحد —
              بسرعة، أمان، ومرونة عالية.
            </p>

            {/* Buttons */}
            <div className="flex justify-center flex-wrap gap-4 mt-4">
              <Button
                className="!bg-primary hover:!bg-blue-600 !text-white !px-8 !py-4 !rounded-lg !font-bold !text-lg !transition-all !shadow-lg"
                onClick={handleStart}
                disabled={loading}
              >
                ابدأ الإستخدام مجانا
              </Button>
              <Button
                disabled
                className="!bg-white/10  !backdrop-blur-sm !border !border-white/30 !px-8 !py-4 !rounded-lg !font-bold !text-lg !transition-all"
              >
                الفديوهات التعليمية
              </Button>
            </div>
          </div>
        </section>

        <main className="max-w-[1200px] mx-auto px-4 ">
          {/* <!-- Stats Section --> */}
          <section className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-3 rounded-2xl p-8 border border-[#dbe0e6] dark:border-[#2a343e] bg-white dark:bg-[#1a2530] shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-[#617589] dark:text-[#a1b0be] text-base font-medium">
                    شركات واثقة بنا
                  </p>
                  <span className="material-symbols-outlined text-primary">
                    <MdCorporateFare className="text-[22px]" />
                  </span>
                </div>
                <p className="text-[#111418] dark:text-white tracking-tight text-3xl font-black">
                  10k+
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[#078838] text-sm font-bold bg-[#078838]/10 px-2 py-0.5 rounded">
                    +15%
                  </span>
                  <span className="text-xs text-[#617589]">نمو سنوي</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl p-8 border border-[#dbe0e6] dark:border-[#2a343e] bg-white dark:bg-[#1a2530] shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-[#617589] dark:text-[#a1b0be] text-base font-medium">
                    نسبة التشغيل
                  </p>
                  <span className="material-symbols-outlined text-primary">
                    <MdCloudDone className="text-[22px]" />
                  </span>
                </div>
                <p className="text-[#111418] dark:text-white tracking-tight text-3xl font-black">
                  99.9%
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[#078838] text-sm font-bold bg-[#078838]/10 px-2 py-0.5 rounded">
                    +0.1%
                  </span>
                  <span className="text-xs text-[#617589]">موثوقية النظام</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl p-8 border border-[#dbe0e6] dark:border-[#2a343e] bg-white dark:bg-[#1a2530] shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-[#617589] dark:text-[#a1b0be] text-base font-medium">
                    توفير التكاليف
                  </p>
                  <span className="material-symbols-outlined text-primary">
                    <MdSavings className="text-[22px]" />
                  </span>
                </div>
                <p className="text-[#111418] dark:text-white tracking-tight text-3xl font-black">
                  30%
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[#e73908] text-sm font-bold bg-[#e73908]/10 px-2 py-0.5 rounded">
                    -10%
                  </span>
                  <span className="text-xs text-[#617589]">مصاريف إدارية</span>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Feature Section --> */}
          <section className="py-20">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4 text-center items-center">
                <h2 className="text-[#111418] dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight max-w-[800px]">
                  وحدات النظام المتكاملة لإدارة مؤسستك
                </h2>
                <p className="text-[#617589] dark:text-[#a1b0be] text-lg max-w-[700px]">
                  اختر الوحدات التي تناسب حجم وطبيعة عملك لتحقيق أقصى قدر من
                  الكفاءة والنمو المتسارع.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* <!-- Finance Card --> */}
                <div className="group flex flex-col gap-6 rounded-2xl border border-[#dbe0e6] dark:border-[#2a343e] bg-white dark:bg-[#1a2530] p-8 hover:border-primary/50 hover:shadow-xl transition-all">
                  <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-3xl">
                      <MdAccountBalanceWallet />
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[#111418] dark:text-white text-xl font-bold">
                      الإدارة المالية
                    </h3>
                    <p className="text-[#617589] dark:text-[#a1b0be] text-base leading-relaxed">
                      إدارة المحاسبة، الفواتير الإلكترونية، والتقارير المالية
                      والضريبية بدقة متناهية مع امتثال كامل للمعايير المحلية.
                    </p>
                  </div>
                  <Link
                    className="!text-primary font-bold text-sm flex items-center gap-2 mt-auto"
                    to="#"
                  >
                    اقرأ المزيد{" "}
                    <span className="material-symbols-outlined text-sm">
                      <IoMdArrowRoundBack />
                    </span>
                  </Link>
                </div>
                {/* <!-- HR Card --> */}
                <div className="group flex flex-col gap-6 rounded-2xl border border-[#dbe0e6] dark:border-[#2a343e] bg-white dark:bg-[#1a2530] p-8 hover:border-primary/50 hover:shadow-xl transition-all">
                  <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-3xl">
                      <FaUserGroup />
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[#111418] dark:text-white text-xl font-bold">
                      الموارد البشرية
                    </h3>
                    <p className="text-[#617589] dark:text-[#a1b0be] text-base leading-relaxed">
                      تنظيم ملفات الموظفين، كشوف الرواتب، وإدارة الحضور
                      والانصراف والطلبات بشكل آلي وسلس تماماً.
                    </p>
                  </div>
                  <Link
                    className="!text-primary font-bold text-sm flex items-center gap-2 mt-auto"
                    to="#"
                  >
                    اقرأ المزيد
                    <span className="material-symbols-outlined text-sm">
                      <IoMdArrowRoundBack />
                    </span>
                  </Link>
                </div>
                {/* <!-- SCM Card --> */}
                <div className="group flex flex-col gap-6 rounded-2xl border border-[#dbe0e6] dark:border-[#2a343e] bg-white dark:bg-[#1a2530] p-8 hover:border-primary/50 hover:shadow-xl transition-all">
                  <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-3xl">
                      <MdLocalShipping />
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[#111418] dark:text-white text-xl font-bold">
                      سلاسل الإمداد
                    </h3>
                    <p className="text-[#617589] dark:text-[#a1b0be] text-base leading-relaxed">
                      تتبع المخزون، المشتريات، والموردين والخدمات اللوجستية في
                      الوقت الفعلي لتحسين كفاءة العمليات.
                    </p>
                  </div>
                  <Link
                    className="!text-primary font-bold text-sm flex items-center gap-2 mt-auto"
                    to="#"
                  >
                    اقرأ المزيد{" "}
                    <span className="material-symbols-outlined text-sm">
                      <IoMdArrowRoundBack />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- CTA Banner --> */}
          <section className="py-12">
            <div className="rounded-3xl bg-primary p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>
              <div className="flex flex-col gap-4 text-white text-right relative z-10">
                <h2 className="text-3xl md:text-4xl font-black">
                  هل أنت مستعد لتطوير أعمالك؟
                </h2>
                <p className="text-lg text-white/80 max-w-[500px]">
                  انضم إلى آلاف الشركات التي حققت طفرة في كفاءتها التشغيلية
                  باستخدام نظامنا المتطور.
                </p>
              </div>
              <div className="flex gap-4 relative z-10">
                <Button
                  className="!px-10 !py-4 !bg-white !text-primary !rounded-xl hover:!bg-opacity-90 !transition-all !text-lg !shadow-md"
                  onClick={handleStart}
                >
                  ابدأ الآن مجاناً
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;
