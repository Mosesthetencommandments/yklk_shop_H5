<template>
	<view class="alltitle">
		<view class="share-title">
			<view class="cha">
				<image style="width:20upx;height: 20upx;" src="../../static/images/APP-qie01_x.png" mode=""></image>
			</view>
			<view class="headline">壹口两口</view>
			<view class="dian">
				<image src="../../static/images/APP-qie01….png" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.alltitle{
	width:100%;
	height: 50upx;
	overflow: hidden;
}
.share-title{
	width:100%;
	background: #f2f2f2;
	padding: 0 20upx;
	display: flex;
	justify-content: space-between;
	position: relative;
}
.cha{
	width:20upx;
	height: 20upx;
	margin-top: 5upx;
}
.headline{
	width:100upx;
	height: 50upx;
	font-size:24upx;
	line-height: 50upx;
	position: absolute;
	left:56upx
}
.dian{
	width:24upx;
	height: 50upx;
	image{
		width:100%;
		height: 100%;
	}
}
</style>
