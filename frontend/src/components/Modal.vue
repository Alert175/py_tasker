<template>
	<div class="wrapper-fixed grid-center">
		<div v-if="property === 'new_user'" class="content grid-center">
			<div class="header">Как к Вам обращаться?</div>
			<input type="text" v-model="new_user_name">
			<button @click="regitry_new_user">Готово</button>
		</div>
		<div v-if="property === 'old_user'" class="content grid-center">
			old_user
		</div>
	</div>
</template>
<script>
const axios = require("axios");
export default {
	props:{
		settings:{
			type: String,
			default: undefined
		}
	},
	data:()=>({
		property: null,
		new_user_name: null
	}),
	methods: {
		read_props(){
			if(this.settings !== undefined){
				this.property = this.settings
			}
			console.log(this.property)
		},
		async regitry_new_user(){
			if(this.new_user_name !== null && this.new_user_name !== ""){
				try{
					const response = await axios.post("api/auth/create_user",{
						new_user_name: String(this.new_user_name)
					});
					console.log(response.data);
				}
				catch(error){
					console.error(error);
				}
			}
			else{
				alert("К пустоте нельзя обратиться :(")
			}
		}
	},
	created() {
		this.read_props()
	}
}
</script>
<style lang="scss" scoped>
	.wrapper-fixed{
		position: fixed;
		height: 100vh;
		width: 100vw;
		background-color: $white;
	}
</style>