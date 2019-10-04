import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "Main",
			component: () =>
			import(/* webpackChunkName: "main" */ "./views/Main.vue")
		},
		{
			path: "/auth",
			name: "auth",
			component: () =>
			import(/* webpackChunkName: "about" */ "./views/Auth.vue")
		},
		{
			path: '/*',
			name: '404',
			component: () => import('./views/404.vue')
		}
	],
	mode: "history"
});
