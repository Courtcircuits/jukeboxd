/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    colors: {
      warn: "#ff0707",
      lightwarn: "#F9F1F1",
      green: "#24ee76",
      lightgreen: "#DAFFE2",
      tint900: "#0f172a",
      tint800: "#1e293b",
      tint700: "#334155",
      tint600: "#475569",
      tint500: "#64748b",
      tint400: "#94a3b8",
      tint300: "#cbd5e1",
      tint200: "#e2e8f0",
      tint100: "#f1f5f9",
      tint50: "#f8fafc",
      tint0: "#fff",
      tintOpac0: "rgba(255, 255, 255, 0.3)",
      primary: "#FC7753",
      secondary: "rgb(255 238 233)",
      transparent: "transparent",
    },
    extend: {
      borderRadius: {
        sm: "5px",
      },
      borderWidth: {
        1: "0.5px",
      },
    },
  },
  plugins: [],
};
