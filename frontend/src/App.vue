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
			if(localStorage.getItem("auth") === null){
				this.$router.push("/auth")
			}
			else{
				
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
