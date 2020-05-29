<template>
	<view>
		<view class="video-box">
		<!-- 	<video src="" poster="../../static/images/178.jpg" controls show-center-play-btn></video> -->
			<view class="video-right">
				<view class="right-kuang-box">
					<view class="right-kuang"></view>
				</view>
				<view class="right-love-box">
					<image src="../../static/images/APP-qie3_0008_01-heart-red.png" mode=""></image>
					<view>2.1w</view>
				</view>
				<view class="right-love-box">
					<image src="../../static/images/APP-qie3_0006_01-spoke.png" mode=""></image>
					<view>6213</view>
				</view>
				<view class="right-love-box" @click="toBack">
					<image src="../../static/images/APP-qie3_0005_01-share.png" mode=""></image>
					<view>368</view>
				</view>
				
			
			</view>
			<view class="recommended">
				来自种草的小喵喵的推荐，你是否心动了呢？“种草”是当下很流行的一个网络用语，拼音是zhongcao
			</view>
		</view>
		<tabbarItem class="z"></tabbarItem>
	</view>
</template>

<script>
	import tabbarItem from "../../components/tabbarItem/tabbar.vue"
	export default {
		components:{
			tabbarItem
		},
		onPullDownRefresh() {//下拉刷新
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		beforeCreate(){
			this.User.navigate({
				
			})
		},
		data() {
			return {
				
			};
		},
		methods:{
			toBack(){
				uni.navigateBack({
					 delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.video-box{
	width:100%;
	height: 100vh;
	background: #007AFF;
	overflow: hidden;
	position: relative;
	video{
		width:100%;
		height: 100%;
		
	}
	.video-right{
		position:fixed;
		width:156upx;
		height: 565upx;
		top:507upx;
		right:0;
		z-index: 2;
		display: flex;
		flex-direction:column;
		.right-kuang-box{
			width:100%;
			height: 190upx;
			padding:37upx 0 0 20upx;
		}
		.right-kuang{
			width:116upx;
			height: 116upx;
			border-radius: 100%;
			border:6upx solid #FFFFFF;
			background: url(../../static/images/caopingshangdegou_3456797.jpg) no-repeat;
			background-size: 200upx;
		}
		.right-love-box{
			width:100%;
			height: 125upx;
			text-align: center;
			image{
				width:68upx;
				height: 56upx;
			}
			view{
				color:#ffffff;
				font-size: 22upx;
				
			}
		}
	}
}
.recommended{
	width:420upx;
	height: 170upx;
	background: rgba(0,0,0,.5);
	position:absolute;
	top:820upx;
	border-radius: 20upx;
	left: 20upx;
	font-size: 26upx;
	color:#ffffff;
	padding: 18upx 14upx;
	z-index: 2;
	line-height: 34upx;
	letter-spacing:1upx;
}
.z{
	z-index:3;
}
</style>
