<template>
	<view>
		<view class="renheader">
			<view class="renbg"></view>
			<view class="renshopcar">
				<img src="../../static/images/jyclose.png" alt="">
				<text>交易关闭</text>
			</view>
			<view class="renfill"></view>
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
		height:300upx;		
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
				width:50upx;
				height:58upx;
				margin-left:39upx;
			}
			text{
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
					font-size:14upx;
					color:#999999;
					margin-top:20upx;
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
						font-size:14upx;
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
