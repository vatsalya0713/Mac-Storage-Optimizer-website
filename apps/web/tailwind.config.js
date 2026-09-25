/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: { DEFAULT: '#FF0055', dark: '#CC0044' },
        green: { accent: '#4ADE80' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#1D1D1F',
            '--tw-prose-headings': '#1D1D1F',
            '--tw-prose-links': '#007AFF',
            '--tw-prose-bold': '#1D1D1F',
            '--tw-prose-bullets': '#C8DEFF',
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
