/** @type {import("tailwindcss").Config} */
const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        horizon: "#1E3A5F",
        ocean: "#2A7B8C",
        sunset: "#D4A84B",
        coral: "#E07B5D",
        charcoal: "#2D2D2D",
        cloud: "#F8F9FA",
        mist: "#E9ECEF",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};

export default config;
