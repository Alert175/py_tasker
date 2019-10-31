<template>
	<div class="wrapper">
		<div class="content grid-center">
			<div class="header">Привет, я твой помощник :)</div>
			<div class="container grid-center">
				<img class="logo" src="images/robotic.svg" alt="robotic">
				<div class="text grid-center">
					<p>Я создан чтобы помогать тебе не забывать важные дела.<br>Просто запиши их, а я напомню в нужное время.</p>
				</div>
			</div>
			<div class="control grid-center">
				<button @click="show_modal_for_new_user">Я здесь впервые</button>
				<button @click="show_modal_for_id">У меня есть ID</button>
			</div>
		</div>
		<transition name="show" mode="out-in">
			<v-modal v-if="show_modal" :settings="value_modal" @close_modal="show_modal = false"></v-modal>
		</transition>
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
<style lang="scss" scoped>
	.wrapper{
		height: 100vh;
		.content{
			grid-template-rows: 1fr 2fr 1fr;
			.container{
				grid-template-columns: auto auto;
				.logo{
					height: 100px;
					width: auto;
				}
				.text{
					width: 90%;
					text-align: left;
					font-size: 1.2rem;
				}
			}
			.control{
				grid-template-columns: repeat(2, auto);
				button{
					text-transform: uppercase;
					font-size: .8rem;
					padding: 10px 15px;
					border: 1px solid $dark;
					border-radius: 100px;
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