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
                S_background_primary: "#9fa3f9",
                S_background_secondary: "#2e2e3a",
                S_background_tertiary: "#45444f",
                S_background_default: "#191925",
                S_text_primary: "#b3b5fa",
                S_text_secondary: "#8f8f96",
                S_text_default: "#ffffff",
                S_text_inverse: "#000000",
                C_Input_outline: "#162f5b",
            },
        },
    },
    plugins: [],
};
export default config;
