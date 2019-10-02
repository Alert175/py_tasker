module.exports = {
	devServer: {
		proxy: {
			'/': {
				target: {
					"host": "localhost",
					"protocol": 'http:',
					"port": 5000
				},
				ws: false
			}
		}
	}
}