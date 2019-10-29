<template>
	<div class="wrapper">
		<div class="content">
			<div class="container col-3">
				<div :class="{status: true, oval: true, succesfull: info.status_complete}" @click="change_status_task">
					<span :class="{circle: true, left: !info.status_complete, right: info.status_complete}"></span>
				</div>
				<input type="text" v-model="info.description">
				<button @click="delete_task">x</button>
			</div>
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
		},
		id_task:{
			type: Number,
			default: null
		}
	},
	data: ()=> ({
		info:{},
		show_popup: false,
		info_for_popup: null,
		popup_color: null
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
					"id_task": JSON.stringify(this.id_task),
					"status_task": JSON.stringify(this.info.status_complete)
				});
			} catch (error) {
				console.error(error);
				this.call_popup("Ошибка", "255, 98, 98, 1");
			}
		},
		async delete_task(){
			try {
				const response = await axios.post("api/task/delete_task",{
					"id_user": localStorage.getItem("user_id"),
					"id_task": JSON.stringify(this.info.id)
				});
				this.$emit("delete_task");
			} catch (error) {
				console.error(error);
				this.call_popup("Ошибка", "255, 98, 98, 1");
			}
		}
	},
	created() {
		this.read_props();
	}
}
</script>
<style lang="scss" scoped>
	$line_thickness: 5px;
	.wrapper{
		.content{
			width: 90%;
			.container{
				grid-template-columns: auto 1fr auto;
				.oval{
					box-sizing: border-box;
					position: relative;
					min-height: 30px;
					min-width: 50px;
					border: $line_thickness solid #c6c6c6;
					border-radius: 100px;
					cursor: pointer;
					.circle{
						position: absolute;
						top: -$line_thickness;
						bottom: 0;
						height: 100%;
						width: 50%;
						border: $line_thickness solid #c6c6c6;
						border-radius: 100px;
						background-color: rgb(255, 255, 255);
					}
					.left{
						left: -$line_thickness;
						right: auto;
						transition: .3s ease;
					}
					.right{
						transform: translateX(50%);
						transition: .3s ease;
					}
				}
				.succesfull{
					background-color: rgb(35, 201, 35);
					transition: .3s ease;
				}
			}
		}
	}
	.show-enter, .show-leave-to{
		opacity: 0;
		transform: translateY(-100%);
	}
</style>