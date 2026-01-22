import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030014",
        primary: "#a78bfa",
        secondary: "#3b82f6",
      },
      backdropBlur: {
        md: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
