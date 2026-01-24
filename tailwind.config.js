/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#137fec",
        "background-main": "#f8fafc",
        "sidebar-bg": "#ffffff",
        "card-bg": "#ffffff",
        "text-main": "#1e293b",
        "text-muted": "#64748b",
        "border-color": "#e2e8f0",
      },
      fontFamily: {
        display: ["Noto Sans Arabic", "Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      keyframes: {
        barMove: {
          "0%, 100%": {
            transform: "translateY(0) rotate(-25deg)",
            opacity: "0.6",
          },
          "50%": {
            transform: "translateY(-12px) rotate(-25deg)",
            opacity: "1",
          },
        },
        dotPulse: {
          "0%, 100%": {
            transform: "scale(0.6)",
            opacity: "0.5",
          },
          "50%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
      },
      animation: {
        bar: "barMove 1.3s ease-in-out infinite",
        dot: "dotPulse 1.3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
