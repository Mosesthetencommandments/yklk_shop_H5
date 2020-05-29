<template>
	<view>
		<view class="contactUs-box">
			<view class="contacuUs">
				<view class="img-box">
					<image src="../../static/images/APP-qie5_0001_er-logo.png" mode=""></image>
				</view>
			</view>
			<view class="font">
				<view>我们的宗旨是</view>
				<view>“天然，环保，健康，严选”</view>
			</view>
			<view class="scan">
				<view class="xian"></view>
				<view class="zi">扫码联系平台客服</view>
				<view class="xian"></view>
			</view>
			<view class="yard-box">
				<view class="ma-box">
					<view class="ma">
						<image src="../../static/images/壹口两口公众号二维码.jpg" mode=""></image>
					</view>
				</view>
				<!-- <view class="phone">
					电话：400-8888-8888
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onPullDownRefresh() {//下拉刷新
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	page{
		background: #ffffff;
	}
.contactUs-box{
	width:100%;
	height: 100%;
	
}
.contacuUs{
	width:100%;
	height: 270upx;
	overflow: hidden;
	.img-box{
		width:150upx;
		height: 150upx;
		margin:90upx 0 0 292upx;
		image{
			width:100%;
			height: 95%;
		}
	}
}
.font{
	width:100%;
	height: 88upx;
	font-size:26upx;
	color:#3a3a3a;
	text-align: center;
	line-height: 36upx;
}
.scan{
	width:100%;
	height: 206upx;
	padding:85upx 190upx;
	display: flex;
	justify-content: center;
	.xian{
		width:50upx;
		height: 2px;
		background: #eeeeee;
		margin-top:18upx;
	}
	.zi{
		width:240upx;
		height: 40upx;
		background: #eeeeee;
		border-radius: 20upx;
		text-align: center;
		font-size: 24upx;
		color: #666666;
		font-weight: 600;
		line-height: 40upx;
	}
}
.yard-box{
	width:100%;
	height: 400upx;
	padding:0 213upx;
	.phone{
		width:100%;
		height: 80upx;
		marign-top:50upx;
		text-align: center;
		font-size: 26upx;
		color:#999999;
		line-height: 110upx;
	}
	.ma-box{
		width:294upx;
		height: 294upx;
		background: url(../../static/images/APP-qie5_0000_er-kuang.png) no-repeat;
		background-size:294upx 294upx;
		overflow: hidden;
		text-align: center;
			margin-left: 20upx;
		.ma{
			width:230upx;
			height: 230upx;
			margin:32upx;
			image{
				width:100%;
				height: 100%;
			}
		}
	}
}
</style>
