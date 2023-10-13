import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "var(--inter-font)",
        montserrat: "var(--montserrat-font)",
      },
      padding: {
        // viewport
        "vw-sm": "3vw",
        "vw-md": "6vw",
        "vw-lg": "9vw",

        // header
        "header": "4.5rem",
        "header-offset": "5rem",
      },
      height: {
        header: "4.5rem",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
export default config;
