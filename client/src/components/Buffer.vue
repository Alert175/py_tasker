<template>
	<div class="wrapper-fixed">
		<div class="content">
			<div class="header">Запишите Ваш ID</div>
			<input type="text" :value="info" ref="user_information">
			<button @click="copy_id">Копировать</button>
			<transition name="show" mode="out-in">
				<popup v-if="show_popup" :info="info_for_popup" :color="popup_color" @close_popup="popup_close"></popup>
			</transition>
		</div>
	</div>
</template>
<script>
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
		popup_color: "0, 0, 0, 0"
	}),
	methods: {
		read_props(){
			if(this.user_id !== null){
				this.info = this.user_id;
			}
			else{
				console.error("props is null")
			}
		},
		copy_id(){
			try{
				let buffer = this.$refs.user_information;
				buffer.select();
				document.execCommand("copy");
				window.getSelection().removeAllRanges();
				this.info_for_popup = "Готово";
				this.popup_color = "102, 170, 255, 1";
				this.show_popup = true;
			}
			catch{
				this.info_for_popup = "ошибка при копировании";
				this.popup_color = "255, 98, 98, 1";
				this.show_popup = true;
			}
		},
		popup_close(){
			this.show_popup = false;
			setTimeout(() => {
				this.close();
			}, 1000);
		},
		close(){
			this.$emit("close_buffer")
		}
	},
	created() {
		this.read_props()
	}
}
</script>
<style lang="scss" scoped>
	.wrapper-fixed{
		z-index: 1;
	}
	.show-enter-active, .show-leave-active {
		transition: .5s;
	}
	.show-enter, .show-leave-to{
		opacity: 0;
		transform: translateY(-100%);
	}
</style>