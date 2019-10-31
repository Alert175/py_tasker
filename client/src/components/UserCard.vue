<template>
	<div class="wrapper-fixed">
		<div class="close" @click="close">
			<img class="icon-image" src="images/cancel.svg" alt="close">
		</div>
		<div class="content grid-center">
			<div class="header">информация пользователя</div>
			<div class="key-user grid-center">
				<div class="container grid-center">
					<img class="icon-image" src="images/edit.svg" alt="edit">
					<input type="text" :value="info" ref="user_key">
				</div>
				<button @click="copy_id">Копировать</button>
			</div>
			<div class="control grid-center">
				<div class="item grid-center" @click="logout">
					<img class="icon" src="images/logout.svg" alt="logout">
					<button>Выйти</button>
				</div>
				<div class="item grid-center" @click="delete_user">
					<img class="icon" src="images/delete.svg" alt="delete_user">
					<button>Удалить у.з.</button>
				</div>
			</div>
			<transition name="show" mode="out-in">
				<popup v-if="show_popup" :info="info_for_popup" :color="popup_color" @close_popup="show_popup = false"></popup>
			</transition>
		</div>
	</div>
</template>
<script>
const axios = require("axios");
export default {
	props:{
		user_id:{
			type: String,
			default: null
		}
	},
	components:{
		popup: ()=> import(/* webpackChunkName: "Popup" */ "@/components/Popup.vue")
	},
	data: ()=> ({
		info: null,
		show_popup: false,
		info_for_popup: null,
		popup_color: "0, 0, 0, 0",
		warning_logout: false,
		warning_delete_user: false
	}),
	methods: {
		call_popup(text, color){
			this.info_for_popup = text;
			this.popup_color = color;
			this.show_popup = true;
		},
		read_props(){
			if(this.user_id !== null){
				this.info = this.user_id;
			}
			else if(localStorage.getItem("user_id") !== null){
				this.info = localStorage.getItem("user_id");
			}
			else{
				console.error("user info not found");
			}
		},
		copy_id(){
			try{
				let buffer = this.$refs.user_key;
				buffer.select();
				document.execCommand("copy");
				window.getSelection().removeAllRanges();
				this.info_for_popup = "Готово";
				this.popup_color = "102, 170, 255, 1";
				this.show_popup = true;
				setTimeout(() => {
					this.close();
				}, 1000);
			}
			catch{
				this.info_for_popup = "ошибка при копировании";
				this.popup_color = "255, 98, 98, 1";
				this.show_popup = true;
			}
		},
		close(){
			this.$emit("close_user_info")
		},
		logout(){
			if(this.warning_logout === false){
				this.call_popup("Не забудьте сохранить ID пользователя, для выхода нажмите кнопку еще раз", "255, 98, 98, 1");
				this.warning_logout = true;
			}
			else{
				localStorage.removeItem("user_id");
				localStorage.removeItem("auth");
				this.$router.push("/");
			}
		},
		async delete_user(){
			if(this.warning_delete_user === false){
				this.call_popup("Внимание, ваша учетная запись будет безвозратно удалена, для подтверждения нажмите кнопку еще раз", "255, 98, 98, 1");
				this.warning_delete_user = true;
			}
			else{
				try {
					const response = await axios.post("api/auth/delete_user",{
						"id_user": localStorage.getItem("user_id")
					})
					if(response.status == 200){
						localStorage.removeItem("user_id");
						localStorage.removeItem("auth");
						this.$router.push("/");
					}
				} catch (error) {
					console.error(error.response)
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
	.wrapper-fixed{
		.content{
			grid-template-rows: 1fr 2fr 1fr;
			.key-user{
				width: 90%;
				.container{
					grid-auto-flow: column;
					padding-bottom: 5px;
					border-bottom: 1px solid $dark;
					margin: 5vh auto;
					input{
						font-size: 1.1rem;
						width: 100%;
						border: none;
					}
				}
				button{
					padding: 10px 25px;
					text-transform: uppercase;
					border: 1px solid $dark;
					border-radius: 100px;
				}
			}
			.control{
				grid-template-columns: auto auto;
				.item{
					grid-template-columns: auto auto;
					grid-column-gap: 5px;
					width: auto;
					padding: 10px 15px;
					border: 1px solid $dark;
					border-radius: 100px;
					img{
						height: 20px;
						width: auto;
					}
					button{
						font-size: 1rem;
						text-transform: uppercase;
					}
				}
			}
		}
	}
	.show-enter-active, .show-leave-active {
		transition: .5s;
	}
	.show-enter, .show-leave-to{
		opacity: 0;
		transform: translateY(-100%);
	}
</style>