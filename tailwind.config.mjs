/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'custom-md': '40px',
        'custom-xl': '46px',
      },
      colors: {
        'light-gray': '#e0e0e0',
        'light-blue': '#675ade',
        'stratos': '#010f40',
        'dark-gray': '#818181',
        'midnight': '#030D03',
        'parsley': '#10410F',
        'australian': '#F4FFB8',
        'light-yellow':"#EDFF8C",
        'light-purpple':"#893EF1",
        'dark-purpple':"#10410f",

      },
     
      lineHeight: {
        141: "141%",
        133: "133%",
        147: "147%",
        162: "162%",
      },
    },
  },
  plugins: [],
};
