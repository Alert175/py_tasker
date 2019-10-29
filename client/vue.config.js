module.exports = {
	/* creating a connection to the server so that there are no errors */
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
	/* import sass for connecting template */
	css: {
		loaderOptions: {
			sass: {
				data: `@import "@/assets/template.scss";`
			}
		}
	},
	/* indicates the path to build the project */
	outputDir: "../server/public",
	/* config property pwa-plugin */
	pwa: {
		name: "Tasker",
		short_name: "Tasker",
		themeColor: "#4A90E2",
		background_color: "#4A90E2",
		msTileColor: "#4A90E2",
		workboxPluginMode: "GenerateSW",
		appleMobileWebAppCapable: "yes",
		display: "fullscreen"
	}
};
