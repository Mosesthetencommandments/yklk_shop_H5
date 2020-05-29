<template>
	<view>
		<view class="AuthorizedPosters_box">
			<image :src="d_image" mode=""></image>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		onLoad(option) {
			this.distribution_level_id = option.distribution_level_id
			this.getCertificate()
		},
		data() {
			return {
				distribution_level_id:null,
				d_image:null
			};
		},
		methods:{
			getCertificate(){
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/getCertificate",
					method: 'POST',
					data: {
						url: config.webUrl1+'/#/pages/cloudWarehouse/perfectInformation',
						distribution_level_id :this.distribution_level_id,
					},
					header: {
						'shop': "1",
						'Authorization': warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.d_image = res.data.data
							uni.stopPullDownRefresh();
						} else if (res.data.errcode === 44) {
							uni.showToast({title: "请重新登录",icon: 'none'})
							setTimeout(() => {
								uni.redirectTo({
									url: '../../pages/cloudWarehouse/warehouseLogin'
								});
							}, 1000)
						} else {
							uni.showToast({title: res.data.errstr,icon: 'none'})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.AuthorizedPosters_box{
	width:100vw;
	height: 100vh;
	image{
		width:100%;
		height: 100%;
	}
}
</style>
