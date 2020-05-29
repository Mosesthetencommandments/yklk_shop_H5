<template>
	<view>
		<view class="renheader">
			<view class="renbg"></view>
			<view class="renshopcar">
				<img src="../../static/images/car1_03.png" alt="">
				<text>卖家已发货</text>
			</view>
			<view class="renfill"></view>
			<view class="renExpressInformation">
				<img src="../../static/images/2_07.png" alt="">
				<view class="rencenter">
					<p class="fromAddress">【东莞市】快件已从虎门转运中心发出，正在发往 青岛转运中心</p>
					<text class="fromTime">2019-10-25 01:57:39</text>
				</view>
				<img src="../../static/images/right_10.png" alt="" class="renRigthArrow">
			</view>
			<view class="renRecipients">
				<img src="../../static/images/zhuyi_03.png" alt="">
				<view class="rencenter">
					<view class="toCommunication">
						<text class="name">胡巴</text>
						<text class="phone">18852221555</text>
					</view>
					<view class="toAddress">
						<p>山东省 青岛市 崂山区 中韩街道 青岛市 崂山区 中韩街道 国金中心 五号楼 八楼</p>
					</view>
				</view>
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
	.renheader{
		width:100%;
		height:460upx;		
		diplay:flex;
		justify-content: center;
		align-items: center;
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
			img{
				width:64upx;
				height:52upx;
				margin-left:39upx;
			}
			text{
				color:#369eff;
				font-size:33upx;
				margin-left:31upx;
				font-weight:700;
			}
		}
		.renfill{
			width:100%;
			height:44upx;
		}
		.renExpressInformation{
			height:159upx;
			width:100%;
			border-bottom:2upx solid #eeeeee;
			display:flex;
			align-items: center;
			background:#fff;
			img{
				width:56upx;
				height:56upx;
				margin-left:28upx;
			}
			.rencenter{
				display:flex;
				flex-direction: column;			
				margin-left:22upx;
				.fromAddress{
					font-size:20upx;
					color:blue;
				}
				.fromTime{
					font-size:16upx;
					color:#999999;
					margin-top:20upx;
					margin-left:15upx;
				}
			}
			.renRigthArrow{
				width:12upx;
				height:22upx;
				margin-right:28upx;
			}
		}
		.renRecipients{
			height:159upx;
			width:100%;
			display:flex;
			align-items: center;
			background:#fff;
			img{
				width:56upx;
				height:56upx;
				margin-left:28upx;
			}
			.rencenter{
				margin-left:22upx;
				.toCommunication{
					.name{
						font-size:18upx;
						
					}
					.phone{
						font-size:16upx;
						color:#b8b8b8;
						margin-left:15upx;
					}
				}
				.toAddress{
					font-size:20upx;
					color:#444444;
					width:590upx;
				}
			}
		}
	}

</style>
