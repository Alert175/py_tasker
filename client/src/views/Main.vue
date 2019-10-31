<template>
	<div class="wrapper">
		<div class="header grid-center">
			<div class="user_info" @click="show_user_card = true">
				<img class="icon-image" src="images/user.svg" alt="user_logo">
			</div>
			<div class="text grid-center">Задачи</div>
		</div>
		<div class="content" v-if="user_tasks.length">
			<task class="tasks" v-for="(item, index) in user_tasks" :key="index" :task="item"></task>
		</div>
		<p v-else>Пока у вас нет записанных задач :)</p>
		<div class="new_task grid-center">
			<img src="images/plus-symbol.svg" alt="plus" @click="show_new_task = true">
		</div>
		<transition name="show" mode="out-in">
			<popup v-if="show_popup" :info="info_for_popup" :color="popup_color" @close_popup="show_popup = false"></popup>
			<new_task v-if="show_new_task" @close_new_task="show_new_task = false" @update_task_array="refresh_task_array"></new_task>
			<user_card v-if="show_user_card" @close_user_info="show_user_card = false"></user_card>
		</transition>
	</div>
</template>

<script>
const axios = require("axios");
export default {
	components:{
		popup: ()=> import(/* webpackChunkName: "Popup" */ "@/components/Popup.vue"),
		task: ()=> import(/* webpackChunkName: "Task" */ "@/components/Task.vue"),
		new_task: ()=> import(/* webpackChunkName: "NewTask" */ "@/components/NewTask.vue"),
		user_card: ()=> import(/* webpackChunkName: "UserCard" */ "@/components/UserCard.vue")
	},
	data: ()=> ({
		user_tasks: [],
		user_id: null,
		user_name: null,
		show_popup: false,
		info_for_popup: null,
		popup_color: null,
		show_new_task: false,
		show_user_card: false
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
		refresh_task_array(new_task_array){
			this.user_tasks.length = 0;
			for (const iterator of new_task_array) {
				this.user_tasks.push(iterator)
			}
			this.show_new_task = false;
		},
		async get_tasks(){
			try{
				const responce = await axios.post("api/task/get_tasks", {
					"user_id": JSON.stringify(this.user_id)
				});
				this.user_tasks.length = 0;
				this.user_name = responce.data.user_name;
				this.call_popup(`Привет ${this.user_name}`, "43, 163, 255, 1");
				for (const iterator of responce.data.tasks) {
					this.user_tasks.push(iterator);
				}
			}
			catch(error){
				console.error(error.response.status);
				if(error.response.status == 401){
					localStorage.removeItem("user_id");
					localStorage.removeItem("auth");
					this.$router.push("/");
					this.call_popup("пользователь не найден", "255, 98, 98, 1");
				}
				else{
					this.call_popup("ошибка :(", "255, 98, 98, 1");
				}
			}
		}
	},
	created() {
		this.read_localStorage();
		this.get_tasks();
	}
};
</script>
<style lang="scss" scoped>
	.wrapper{
		.header{
			grid-template-columns: auto 1fr;
			width: 85%;
			.text{
				padding-right: 10%;
			}
		}
		.content{
			height: 70vh;
			overflow: auto;
		}
		.new_task{
			position: fixed;
			top: auto;
			left: 0;
			right: 0;
			bottom: 5vh;
			font-size: 2rem;
			img{
				height: 5vh;
				width: auto;
				padding: 5px;
				border-radius: 100%;
				box-shadow: 0px 0px 10px $bg_dark;
				cursor: pointer;
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