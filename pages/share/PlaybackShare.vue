<template>
	<view>
		<view class="sharePosters">
			<image :src="Img" mode=""></image>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		onLoad(option) {
			console.log(option)
			this.live_room_id = option.live_room_id
			this.video_id = option.video_id
			this.shareShopCouponCode()
		},
		onPullDownRefresh() {//下拉刷新
			this.shareShopCouponCode()
		},
		data() {
			return {
				Img:null,
				live_room_id:null,
				video_id:null
			};
		},
		methods:{
			async shareShopCouponCode(){
				let [err,res] = await this.$http.post("/api/coupon/shareShopCouponCode",{
					shop_coupon_url: config.webUrl1+'/#/pages/QRcode/QRcode',
					type:5,
					video_id:this.video_id
				});
				if(res.data.code === 200){
					this.Img = res.data.data
					uni.stopPullDownRefresh();
				}
			}
		}
	}
</script>

<style lang="scss">
.sharePosters{
	width:100%;
	height: 100vh;
	background: url(../../static/images/loading.gif) no-repeat center;
	background-size: 40%;
	image{
		width:100%;
		height: 100%;
	}
}
</style>
