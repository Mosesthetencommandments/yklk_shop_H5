<template>
	<view class="content">
		<view>
			<shopheader></shopheader>
			<shopcontain></shopcontain>
			<shoplist></shoplist>
			<shopfooter></shopfooter>
		</view>

	</view>
</template>

<script>
	import shopheader from "../../components/cancel/cancel-header.vue"
	import shopcontain from "../../components/cancel/cancel-contain.vue"
	import shoplist from "../../components/cancel/cancel-list.vue"
	import shopfooter from "../../components/cancel/cancel-footer.vue"
	export default {
		components:{
			shopheader,shopcontain,shoplist,shopfooter
		},
		onPullDownRefresh() {//下拉刷新
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			
		}
	}
</script>

<style>

</style>
