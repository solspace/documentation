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
    extend: {},
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]'],
  corePlugins: {
    preflight: false,
  },
  blocklist: ['container'],
};
