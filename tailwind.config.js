/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'light-red-color': '#ff976b',
				'light-gray-color': '#f1f6fa',
				'gray-color': '#e7eef3',
				'dark-gray-color': '#5787a1',
				'button-color': '#e2edf1',
				'red-color': '#fc8550',
				'green-color': '#4ab068',
			},
			gridTemplateColumns: {
				'auto-fit': 'repeat(auto-fit, minmax(350px, 1fr))',
				task: '1fr 32px',
			},
			height: {
				output: 'calc(100vh - 80px)',
			},
		},
	},
	plugins: [],
};
