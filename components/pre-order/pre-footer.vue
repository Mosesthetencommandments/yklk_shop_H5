<template>
	<view class="footer">
		<text @click="gotoIndex">店铺主页</text>
		<text></text>
		<text @click="gotoOrders">我的订单</text>
		<text></text>
		<text @click="gotoContact">联系客服</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gotoIndex(){
				uni.navigateTo({
					url:"../../pages/index/index"
				})
			},
			gotoOrders(){
				uni.navigateTo({
					url:"../../pages/orderList/orderList"
				})
			},
			gotoContact(){
				uni.navigateTo({
					url:"../../pages/contactUs/contactUs"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.footer{
		height:110upx;
		width:100%;
		background:#eeeeee;
		display:flex;
		align-items: center;
		justify-content: space-around;
		text{
			font-size:22upx;
			color:#666666;
		}
		text:first-child{
			margin-left:134upx;
		}
		text:nth-child(2){
			width:2px;
			height:22upx;
			background:#666666;
		}
		text:nth-child(4){
			width:2px;
			height:22upx;
			background:#666666;
		}
		text:last-child{
			margin-right:134upx;
		}
	}
	
</style>
