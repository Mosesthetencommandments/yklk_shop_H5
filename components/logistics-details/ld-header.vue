<template>
	<view>
		<view class="renheader">
			<view class="renbg"></view>
			<view class="renshopcar">
				<view class="arrowLeft">
					<img src="../../static/images/left_arrow_03.png" alt="" style="width:12upx;height:22upx">
				</view>
				<view class="goodsImg">
					<img src="../../static/images/gods_03.png" alt="" style="width:80upx;height:80upx;boeder-radius:5upx;">
				</view>				
				<view class="godsDescribe">
					<text class="godsNumber">2</text>
					<text class="godsWord">件商品 ,</text>
					<text>已签收</text>
				</view>
			</view>
			<view class="renfill"></view>
			<view class="renExpressInformation">
				<view class="logistics">
					<view class="logisticsState">
						<text>物流状态:</text>
						<text>运输中</text>
					</view>
					<view class="logisticsCompany">
						<text>物流公司:</text>
						<text>申通快递</text>
					</view>		
					<view class="logisticsNum">
						<text>运单号:</text>
						<text>773003381612173</text>
					</view>											
				</view>
			</view>		
		</view>
		<view class="fill"></view>
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
	.renheader{
		width:100%;
		height:302upx;		
		diplay:flex;
		justify-content: center;
		position:relative;
		.renbg{
			height:100upx;
			width:100%;
			justify-content: center;
			background:#4ac6ff;
		}
		.renshopcar{
			height:120upx;
			width:93%;
			background:#ffffff;
			margin:0 auto;
			display:flex;
			align-items: center;
			position:absolute;
			top:24upx;
			left:28upx;
			border-radius:25upx;
			box-shadow: 0px 5px 5px #eeeeee;
			.arrowLeft{
				margin-left:12upx;
			}
			.goodsImg{
				margin-left:28upx;
				margin-top:10upx;
			}
			.godsDescribe{
				line-height:100upx;
				height:120upx;
				margin-left:33upx;
				text:first-child{
					color:#369eff;
					font-size:27upx;
					font-weight:700;
				}
				text:nth-child(2){
					margin-left:14upx;
					color:#666666;
					font-size:33upx;
				}
				text:last-child{
					margin-left:28upx;
					color:#666666;
					font-size:33upx;
				}
			}
		}
		.renfill{
			width:100%;
			height:44upx;
		}
		.renExpressInformation{
			height:158upx;
			width:100%;
			display:flex;
			align-items: center;
			background:#fff;
			.logistics{
				height:158upx;
				width:100%;
				.logisticsState{
					margin-left:38upx;
					text:first-child{
						font-size:22upx;
						color:#666666;
					}
					text:last-child{
						font-size:22upx;
						color:#f49c17;
						margin-left:21upx;
					}
				}
				.logisticsCompany{
					margin-left:38upx;
					text:first-child{
						font-size:21upx;
						color:#999999;
					}
					text:last-child{
						font-size:21upx;
						color:#999999;
						margin-left:16upx;
					}
				}
				.logisticsNum{
					margin-left:38upx;
					margin-top:-25upx;
					text:first-child{
						font-size:21upx;
						color:#999999;
					}
					text:last-child{
						font-size:21upx;
						color:#999999;
						margin-left:16upx;
					}
				}
			}
		}
	}
	.fill{
		background: #eeeeee;
		width:100%;
		height:20upx;
	}
</style>

</style>
