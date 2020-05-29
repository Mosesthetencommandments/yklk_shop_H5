<template>
	<view>
		12345657
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			// const openid = uni.getStorageSync('wx_open_id');
			uni.clearStorageSync();
			// const openid = uni.getStorageSync('wx_open_id');
			//  uni.removeStorageSync('wx_open_id');
			//  uni.removeStorageSync('token');
			uni.showToast({
				title:"删除成功"
			})
			return
			
		}
	}
</script>

<style lang="scss">

</style>
