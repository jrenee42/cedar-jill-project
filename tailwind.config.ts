import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          100: '#f2f8ff',
          400: '#8ca7f2',
          500: '#3667E9',
          600: '#0f308a',
          800: '#13126C',
        },
        gray: {
          500: '#65657B',
        },
        dark: {
          700: '#171731',
        },
        red: {
          500: '#C34648',
        },

      },
      fontSize: {
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
        xxl: ['28px', '36px'],
      }
    },
  },
  plugins: [],
};
export default config;
