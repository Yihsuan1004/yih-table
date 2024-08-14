/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--yh-primary-color)',
        'secondary': 'var(--yh-secondary-color)',
        'gray-light': 'var(--yh-gray-color)',
    },
  },
},
  plugins: [],
}

