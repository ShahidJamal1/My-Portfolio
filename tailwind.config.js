/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
        hand: ["Caveat", "cursive"],
      },
      colors: {
        accent: {
          50: "#fdf1f2",
          100: "#fce4e6",
          200: "#f9cbd0",
          300: "#f4a4ab",
          400: "#ee707c",
          500: "#e63946",
          600: "#d62839",
          700: "#b41c2c",
          800: "#951b28",
          900: "#7d1c26",
          950: "#450a10",
        },
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        gradientShift: { "0%,100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
        spinSlow: { to: { transform: "rotate(360deg)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        pulseRing: { "0%": { transform: "scale(1)", opacity: "0.6" }, "100%": { transform: "scale(1.6)", opacity: "0" } },
      },
      animation: {
        blink: "blink 1s step-start infinite",
        float: "float 5s ease-in-out infinite",
        "float-slow": "float 7s ease-in-out infinite",
        gradient: "gradientShift 6s ease infinite",
        "spin-slow": "spinSlow 28s linear infinite",
        marquee: "marquee 30s linear infinite",
        "pulse-ring": "pulseRing 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};
