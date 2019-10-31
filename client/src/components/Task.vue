<template>
	<div class="wrapper">
		<div class="content">
			<div :class="{'container': true, 'col-3': true, 'warning': expired_task, 'active': !expired_task}">
				<div :class="{status: true, oval: true, succesfull: info.status_complete}" @click="change_status_task">
					<span :class="{circle: true, left: !info.status_complete, right: info.status_complete}"></span>
				</div>
				<div class="text">
					{{info.description}}
				</div>
				<button @click="show_edit_task = true">
					<img class="icon-image" src="images/edit.svg" alt="edit_task">
				</button>
			</div>
		</div>
		<transition name="show" mode="out-in">
			<popup v-if="show_popup" :info="info_for_popup" :color="popup_color" @close_popup="show_popup = false"></popup>
			<edit-task v-if="show_edit_task" :task="info" @close_edit_task="show_edit_task = false"></edit-task>
		</transition>
	</div>
</template>
<script>
const axios = require("axios")
export default {
	components:{
		popup: ()=> import(/* webpackChunkName: "Popup" */ "@/components/Popup.vue"),
		EditTask: ()=> import(/* webpackChunkName: "Popup" */ "@/components/EditTask.vue")
	},
	props:{
		task:{
			type: Object,
			default: null
		}
	},
	data: ()=> ({
		info:{},
		show_popup: false,
		info_for_popup: null,
		popup_color: null,
		show_edit_task: false,
		expired_task: false
	}),
	methods: {
		read_props(){
			this.info = this.task;
		},
		call_popup(text, color){
			this.info_for_popup = text;
			this.popup_color = color;
			this.show_popup = true;
		},
		async change_status_task(){
			try {
				this.info.status_complete = !this.info.status_complete;
				const response = await axios.put("api/task/change_status_task", {
					"id_user": localStorage.getItem("user_id"),
					"id_task": this.info.id_task,
					"status_task": JSON.stringify(this.info.status_complete)
				});
			} catch (error) {
				console.error(error);
				this.call_popup("Ошибка", "255, 98, 98, 1");
			}
		},
		time_check(){
			if(this.info.hasOwnProperty("deadline")){
				if(new Date().getTime() > this.info.deadline){
					this.call_popup("Просрочена задача", "255, 98, 98, 1");
					this.expired_task = true;
				}
			}
		}
	},
	created() {
		this.read_props();
		setTimeout(() => {
			this.time_check();
		}, 1000*2);
	}
}
</script>
<style lang="scss" scoped>
	$line_thickness: 3px;
	.wrapper{
		.content{
			width: 90%;
			margin: 1vh auto;
			.warning{
				border-bottom: 1px solid rgba(255, 0, 0, 0.6);
			}
			.active{
				border-bottom: 1px solid rgba(80, 80, 80, 0.2);
			}
			.container{
				grid-template-columns: auto 1fr auto;
				.oval{
					box-sizing: border-box;
					position: relative;
					min-height: 30px;
					min-width: 50px;
					border: $line_thickness solid #4d4b4b;
					border-radius: 100px;
					cursor: pointer;
					.circle{
						position: absolute;
						top: -$line_thickness;
						bottom: 0;
						height: 100%;
						width: 55%;
						border: $line_thickness solid #4d4b4b;
						border-radius: 100px;
						background-color: rgb(255, 255, 255);
					}
					.left{
						left: -$line_thickness;
						right: auto;
						transition: .3s ease;
					}
					.right{
						transform: translateX(55%);
						transition: .3s ease;
					}
				}
				.succesfull{
					background-color: rgb(35, 201, 35);
					transition: .3s ease;
				}
				.text{
					font-family: "Caveat-Regular", Arial;
					font-size: 1.5rem;
				}
			}
		}
	}
	.show-enter, .show-leave-to{
		opacity: 0;
		transform: translateY(-100%);
	}
</style>