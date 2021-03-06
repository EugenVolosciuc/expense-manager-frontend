module.exports = {
	purge: [
		'src/**/*.js',
		'src/**/*.jsx',
		'public/**/*.html',
	],
	theme: {
		extend: {
			colors: {
				main: '#2EC4B6',
				secondary: '#DAF2F0',
				accent: '#337DDE'
			}
		},
	},
	variants: {},
	plugins: [],
	corePlugins: {
		borderColor: true
	}
}