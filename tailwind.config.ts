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
        background: "var(--background)",
        foreground: "var(--foreground)",
        offwhite: "#E9D8A6",
        dark: "#001219",
        mint: "#94D2BD",
      },
      fontFamily: {
        code: ["IBM Plex Mono", "system-ui"],
        sans: ["system-ui"],
      }
    },
  },
  plugins: [],
};
export default config;
