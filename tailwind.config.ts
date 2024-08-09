import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        jacaranda: "rgb(136, 143, 199)",
        primary: "rgb(19, 17, 54)",
        yellow: "rgb(242, 191, 67)",
        yellowOpacity: "rgb(242 191 67 / 85%)",
      },
      height: {
        "custom-height-desktop": "calc(100dvh - 64px)",
        "custom-height-mobile": "calc(100dvh - 100px)",
      },
    },
  },
  plugins: [],
};
export default config;
