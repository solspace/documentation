/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    'docusaurus.config.ts',
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './craft-freeform/**/*.{md,mdx}',
    './craft-calendar/**/*.{md,mdx}',
    './ee-calendar/**/*.{md,mdx}',
    './ee-freeform/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        '1/7': '14.2857%', // 1/7 width
        '1/8': '12.5%',   // 1/8 width
        '1/9': '11.1111%', // 1/9 width
        '1/10': '10%',     // 1/10 width
        '1/11': '9.0909%', // 1/11 width
        '1/12': '8.3333%', // 1/12 width
      },
    },
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]'],
  corePlugins: {
    preflight: false,
  },
  blocklist: ['container'],
};
