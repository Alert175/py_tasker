<template>
	<div class="wrapper">
		<div class="content">
			<div class="header">Привет, я твой помощник :)</div>
			<div class="container grid-center">
				<button @click="show_modal_for_new_user">Я здесь впервые</button>
				<button @click="show_modal_for_id">У меня есть ID</button>
			</div>
		</div>
		<v-modal v-if="show_modal" :settings="value_modal"></v-modal>
	</div>
</template>

<script>
const axios = require("axios");
export default {
	components:{
		vModal: ()=> import(/* webpackChunkName: "Modal" */ "@/components/Modal.vue")
	},
	data: ()=> ({
		show_modal: false,
		value_modal: null
	}),
	methods:{
		show_modal_for_new_user(){
			this.value_modal = "new_user";
			this.show_modal = true;
		},
		show_modal_for_id(){
			this.value_modal = "old_user";
			this.show_modal = true
		}
	}
}
</script>