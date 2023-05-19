/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
				'gpt-gray': '#343541',
				'gpt-lightgray': '#40414F',
				'gpt-deepgray': '#202123'
			},

			keyframes: {
				blink: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 }
				}
			},

			animation: {
				blink: 'blink 1s infinite'
			}
		}
  },
  plugins: []
}