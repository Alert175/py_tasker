<template>
	<div class="wrapper">
		<div class="header">Задачи</div>
			<div class="content">
				<div class="tasks" v-for="(item, index) in user_tasks" :key="index"></div>
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
		user_tasks: [],
		user_id: null,
		show_popup: false,
		info_for_popup: null,
		popup_color: null
	}),
	methods: {
		read_localStorage(){
			this.user_id = localStorage.getItem("user_id");
		},
		call_popup(text, color){
			this.info_for_popup = text;
			this.popup_color = color;
			this.show_popup = true;
		},
		async get_tasks(){
			try{
				const responce = await axios.post("api/task/get_tasks", {
					"user_id": JSON.stringify(this.user_id)
				});
				this.call_popup("Данные получены", "43, 163, 255, 1");
				console.log(responce.data);

			}
			catch(error){
				console.error(error);
				this.call_popup("ошибка :(", "255, 98, 98, 1");
			}
		}
	},
	created() {
		this.read_localStorage();
		this.get_tasks();
	}
};
</script>
<style lang="scss">
	.show-enter-active, .show-leave-active {
		transition: .5s;
	}
	.show-enter, .show-leave-to{
		opacity: 0;
		transform: translateY(-100%);
	}
</style>