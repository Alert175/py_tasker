<template>
	<div class="wrapper-fixed">
		<div class="close" @click="close">&#10006;</div>
		<div class="content grid-center">
			<div class="header">Новая задача</div>
			<div class="text">
				<textarea v-model="new_task_text"></textarea>
			</div>
			<button @click="create_new_task">Создать</button>
		</div>
		<transition name="show" mode="out-in">
			<popup v-if="show_popup" :info="info_for_popup" :color="popup_color" @close_popup="show_popup = false"></popup>
		</transition>
	</div>
</template>
<script>
const axios = require("axios");
export default {
	components:{
		popup: ()=> import(/* webpackChunkName: "Popup" */ "@/components/Popup.vue")
	},
	data: ()=> ({
		show_popup: false,
		info_for_popup: null,
		popup_color: null,
		new_task_text: null
	}),
	methods: {
		close(){
			this.$emit("close_new_task");
		},
		call_popup(text, color){
			this.info_for_popup = text;
			this.popup_color = color;
			this.show_popup = true;
		},
		async create_new_task(){
			if(this.new_task_text !== null && this.new_task_text !== ""){
				try{
					const response = await axios.post("api/task/create_task", {
						"user_id": localStorage.getItem("user_id"),
						"text": String(this.new_task_text)
					});
					this.$emit("update_task_array", response.data);
				}
				catch(error){
					console.log(error);
					this.call_popup("Ошибка", "255, 98, 98, 1");
				}
			}
			else{
				this.call_popup("Необходимо заполнить поле", "255, 98, 98, 1")
			}
		}
	}
}
</script>
<style lang="scss" scoped>
	.wrapper-fixed{
		.close{
			position: absolute;
			top: 5vh;
			right: 5vh;
			font-size: 1.5rem;
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