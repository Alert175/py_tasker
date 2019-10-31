<template>
	<div class="wrapper-fixed">
		<div class="close" @click="close">
			<img class="icon-image" src="images/cancel.svg" alt="close">
		</div>
		<div class="content grid-center">
			<div class="header">Редактирование задачи</div>
			<div class="container grid-center">
				<div class="edit-text grid-center">
					<img class="icon-image" src="images/signature.svg" alt="edit_text_task">
					<textarea v-model="info.description"></textarea>
				</div>
				<div class="date-time grid-center">
					<div class="enter-date-time grid-center">
						<img class="icon-image" src="images/calendar.svg" alt="calendar">
						<input type="datetime-local" v-model="date_time" :min="min_date_time" :max="max_date_time">
					</div>
					<!-- <button>Дата выполнения</button> -->
				</div>
			</div>
			<button class="save" @click="update_task">сохранить</button>
		</div>
		<transition name="show" mode="out-in">
			<popup v-if="show_popup" :info="info_for_popup" :color="popup_color" @close_popup="show_popup = false"></popup>
		</transition>
	</div>
</template>

<script>
const axios = require("axios")
export default {
	components:{
		popup: ()=> import(/* webpackChunkName: "Popup" */ "@/components/Popup.vue")
	},
	props:{
		task:{
			type: Object,
			default: null
		}
	},
	data: () => ({
		info: null,
		date_time: null,
		min_date_time: null,
		max_date_time: null,
		old_description: null,
		show_popup: false,
		info_for_popup: null,
		popup_color: null,
	}),
	methods: {
		close(){
			this.$emit("close_edit_task");
		},
		call_popup(text, color){
			this.info_for_popup = text;
			this.popup_color = color;
			this.show_popup = true;
		},
		update_task(){
			if(this.date_time !== null && this.date_time !== ""){
				this.info.deadline = new Date(this.date_time).getTime();
				this.send_task_to_update();
			}
			else if(this.old_description != this.info.description){
				this.send_task_to_update();
			}
			else{
				this.call_popup("Изменений не было");
			}
		},
		async send_task_to_update(){
			try {
				const response = await axios.put("api/task/update_task",{
					"change_task": JSON.stringify(this.info),
					"id_user": localStorage.getItem("user_id")
				});
				console.dir(response);
				if(response.status == 200){
					this.close();
				}
			} catch (error) {
				console.log(error.response);
				this.call_popup("Ошибка", "255, 98, 98, 1");
			}
		},
		convert_current_value_to_input(value){
			if(String(value).length < 2){
				return `0${value}`;
			}
			else{
				return String(value);
			}
		},
		convert_date_to_input_value(date){
			let month = this.convert_current_value_to_input(Number(new Date(date).getMonth()) + 1);
			let day = this.convert_current_value_to_input(new Date(date).getDate());
			let hours = this.convert_current_value_to_input(new Date(date).getHours());
			let minutes = this.convert_current_value_to_input(new Date(date).getMinutes());
			return `${new Date(date).getFullYear()}-${month}-${day}T${hours}:${minutes}`;
		}
	},
	created() {
		if(this.task !== null){
			this.info = this.task;
			this.old_description = this.info.description;
			if(this.info.hasOwnProperty("deadline")){
				this.date_time = this.convert_date_to_input_value(this.info.deadline);
			}
			this.min_date_time = this.convert_date_to_input_value(new Date().getTime());
			this.max_date_time = this.convert_date_to_input_value(new Date().getTime() + (1000 * 60* 60 * 24 * 365));
		}
	},
}
</script>

<style lang="scss" scoped>
	.wrapper-fixed{
		z-index: 9999;
		.content{
			.container{
				grid-template-rows: 3fr 1fr;
				.edit-text{
					width: 80%;
					grid-template-columns: auto 1fr;
					border-bottom: 1px solid $dark;
					padding: 5px;
					textarea{
						width: 90%;
						height: 100%;
						margin: 5px;
						text-align: center;
						font-family: "Caveat-Regular", Arial;
						font-size: 1.5rem;
						border: none;
						background-color: transparent;
						outline: none;
					}
				}
				.date-time{
					width: 90%;
					.enter-date-time{
						width: 90%;
						grid-template-columns: auto 1fr;
						padding: 5px;
						border-bottom: 1px solid $dark;
						input{
							width: 90%;
							height: 90%;
							border: none;
							background-color: transparent;
							text-align: center;
							outline: none;
						}
					}
				}
			}
			.save{
				margin-top: 5vh;
				font-size: 1.1rem;
				text-transform: uppercase;
				font-weight: bold;
				padding-bottom: 5px;
				border-bottom: 1px solid $dark;
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