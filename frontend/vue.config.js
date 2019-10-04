module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: {
					"host": "localhost",
					"protocol": 'http:',
					"port": 5000
				},
				ws: false
			}
		}
	},
	css: {
		loaderOptions: {
			sass: {
				data: `@import "@/assets/template.scss";`
			}
		}
	}
}