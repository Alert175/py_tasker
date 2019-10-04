<template>
	<div id="app">
	<router-view />
	</div>
</template>
<script>
export default {
	data:()=>({

	}),
	methods: {
		check_auth(){
			if(localStorage.getItem("auth") !== null){
				if(localStorage.getItem("user_id") !== null){
					console.log("auth succes");
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
