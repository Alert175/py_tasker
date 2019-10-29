<template>
	<div class="wrapper-fixed grid-center">
		<div v-if="property === 'new_user'" class="content grid-center">
			<div class="header">Как к Вам обращаться?</div>
			<input type="text" v-model="new_user_name">
			<button @click="regitry_new_user">Готово</button>
		</div>
		<div v-if="property === 'old_user'" class="content grid-center">
			<div class="header">Введите ваш ID</div>
			<input type="text" v-model="user_id">
			<button @click="login">Войти</button>
		</div>
		<transition name="show" mode="out-in">
			<buffer v-if="show_buffer" :user_id="info_for_buffer" @close_buffer="buffer_close"></buffer>
			<popup v-if="show_popup" :info="info_for_popup" :color="popup_color" @close_popup="show_popup = false"></popup>
		</transition>
	</div>
</template>
<script>
const axios = require("axios");
export default {
	components:{
		buffer: ()=> import(/* webpackChunkName: "Buffer" */ "@/components/Buffer.vue"),
		popup: ()=> import(/* webpackChunkName: "Popup" */ "@/components/Popup.vue")
	},
	props:{
		settings:{
			type: String,
			default: undefined
		}
	},
	data:()=>({
		property: null,
		new_user_name: null,
		show_buffer: false,
		info_for_buffer: null,
		user_id: null,
		show_popup: false,
		info_for_popup: null,
		popup_color: null
	}),
	methods: {
		read_props(){
			if(this.settings !== undefined){
				this.property = this.settings;
			}
			console.log(this.property);
		},
		call_popup(text, color){
			this.info_for_popup = text;
			this.popup_color = color;
			this.show_popup = true;
		},
		buffer_close(){
			this.show_buffer = false;
			if(localStorage.getItem("user_id") !== null){
				localStorage.setItem("auth", true);
				this.$router.push("/");
			}
		},
		async regitry_new_user(){
			if(this.new_user_name !== null && this.new_user_name !== ""){
				try{
					const response = await axios.post("api/auth/create_user",{
						new_user_name: String(this.new_user_name)
					});
					if(response.data.hasOwnProperty("id_user")){
						localStorage.setItem("user_id", response.data.id_user)
						this.info_for_buffer = response.data.id_user;
						this.show_buffer = true;
					}
				}
				catch(error){
					console.error(error);
				}
			}
			else{
				this.call_popup("необходимо заполнить поле", "255, 98, 98, 1");
			}
		},
		async login(){
			try{
				if(this.user_id !== null && this.user_id !== ""){
					const response = await axios.post("api/auth/login",{
						"user_id": JSON.stringify(this.user_id)
					});
					localStorage.setItem("auth", true);
					localStorage.setItem("user_id", this.user_id);
					this.call_popup(`Добро пожаловать ${response.data.user_name}`, "83, 144, 219, 1");
					this.$router.push("/");
				}
				else{
					this.call_popup("необходимо заполнить поле", "255, 98, 98, 1");
				}
			}
			catch(error){
				if(error.response.status == 401){
					this.call_popup("пользователь не найден", "255, 98, 98, 1");
				}
				else{
					console.error(error);
					this.call_popup("попробуйте еще раз", "255, 98, 98, 1");
				}
			}
		}
	},
	created() {
		this.read_props()
	}
}
</script>
<style lang="scss" scoped>
	.wrapper-fixed{}
	.show-enter-active, .show-leave-active {
		transition: .5s;
	}
	.show-enter, .show-leave-to{
		opacity: 0;
		transform: translateY(-100%);
	}
</style>