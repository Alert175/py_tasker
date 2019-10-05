<template>
	<div class="wrapper" :style="`background-color: rgba(${color});`">
		<div v-if="info === null" class="text">ОК</div>
		<div v-else class="text">{{info}}</div>
	</div>
</template>
<script>
export default {
	props:{
		info:{
			type: String,
			default: null
		},
		color:{
			type: String,
			default: "0, 0, 0, 0"
		}
	},
	methods: {
		close(){
			this.$emit("close_popup")
		}
	},
	mounted() {
		setTimeout(()=>{
			this.close();
		}, 1000*2)
	}
}
</script>
<style lang="scss" scoped>
	.wrapper{
		z-index: 9999;
		position: absolute;
		min-height: 10vh;
		width: 100vw;
		top: 0;
		bottom: auto;
		left: 0;
		right: 0;
		.text{
			text-align: center;
		}
	}
</style>