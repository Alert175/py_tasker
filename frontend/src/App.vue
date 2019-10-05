<template>
	<div id="app">
	<router-view />
	</div>
</template>
<script>
const axios = require("axios");
export default {
	data:()=>({

	}),
	watch:{
		'$route' (to, from) {
			this.check_auth();
		}
	},
	methods: {
		check_auth(){
			if(localStorage.getItem("auth") !== null){
				if(localStorage.getItem("user_id") !== null){
					console.log("auth succes");
					// отлавливаю ошибки типа "NavigationDuplicated"
					this.$router.push("/main").catch(error => {
						console.log(error)
					});
				}
				else{
					this.$router.push("/auth");
				}
			}
			else{
				this.$router.push("/auth");
			}
		}
	},
	created() {
		this.check_auth();
	}
}
</script>
<style lang="scss">
	.wrapper{
		font-family: "Roboto-Regular"
	}
</style>
