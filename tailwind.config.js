module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			spacing: {
				answer: '30rem',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
