<template>
	<view>
		<view class="fill"></view>
		<view class="containAll">
			<view class="renGods">
				<img src="../../static/images/small_03.png" alt="">
				<text>壹口两口</text>
			</view>
			<view class="myGods">	
				<view class="godsImg">
					<img src="../../static/images/gods_06.png" alt="">
				</view>
				<view class="godsDes">
					<text class="godsName">鲜美海蛎子肉</text>
					<text class="godsWeight">规格:  500g</text>
					<text class="godsPrice">￥40.00</text>
				</view>
				<view class="godsNum">
					<text class="textX">X</text>
					<text class="textNum">2</text>
				</view>
			</view>
			<view class="fill"></view>
			<view class="myGods">	
				<view class="godsImg">
					<img src="../../static/images/gods_06.png" alt="">
				</view>
				<view class="godsDes">
					<text class="godsName">鲜美海蛎子肉</text>
					<text class="godsWeight">规格:  500g</text>
					<text class="godsPrice">￥40.00</text>
				</view>
				<view class="godsNum">
					<text class="textX">X</text>
					<text class="textNum">2</text>
				</view>
			</view>
			<view class="fill"></view>
			<view class="godsMessage">
				<view class="godsMethod">
					<view>
						<text>配送方式</text>
					</view>
					<view>
						<text>快递运送</text>
					</view>
				</view>
				<view class="messageBoard">
					<view>
						<text class="buyer">买家留言</text>
					</view>
					<view>
						<text class="message">海蛎子帮我分成三包，两包一样的，一包稍微要小一点的</text>
					</view>
				</view>
				<view class="fill"></view>
				<view class="godsAboutMoney">
					<view class="godsMoney">
						<view class="godsLeft">
							<p>商品金额</p>
							<p>运费</p>
							<p>支付方式</p>
						</view>
						<view class="godsRight">
							<p>￥80.00</p>
							<p>+￥7.00</p>
							<p>微信支付</p>
						</view>
					</view>
					<view class="godsAll">
						<view class="allLeft">
							<p>合计</p>
						</view>
						<view class="allRight">
							<p>￥87.00</p>
						</view>
					</view>
				</view>
				<view class="fill"></view>
			</view>
		</view>
	</view>
	
</template>

<script>
	
	
</script>

<style lang="scss" scoped>
	.fill{
		background: #eeeeee;
		width:100%;
		height:20upx;
	}
	.containAll{
		width:100%;
		height:969upx;
		background:#fff;
		.renGods{
			width:100%;
			height:55upx;
			img{
				width:26upx;
				height:26upx;
				margin-left:40upx;
			}
			text{
				font-size:24upx;
				color:#c1c1c1;
				margin-left:16upx;
				margin-top:21upx;
			}
		}
		.myGods{
			width:100%;
			height:202upx;
			display:flex;
			align-items: center;
			justify-content: space-between;			
			.godsImg{
				img{
					width:160upx;
					height:160upx;
				}
				margin-left:40upx;
			}
			.godsDes{
				display:flex;
				flex-direction:column;
				justify-content: space-between;
				height:202upx;
				margin-right:288upx;
				.godsName{
					margin-top:22upx;
					font-size:23upx;
					color:#444444;
				}
				.godsWeight{
					font-size:16upx;
					color:#a9a9a9;
				}
				.godsPrice{
					font-size:17upx;
					color:#f49c17;
					margin-bottom:60upx;
				}
			}
			.godsNum{
				.textX{
					font-size:12upx;
					color:#666666;
					margin-right:7upx;
				}
				.textNum{
					font-size:17px;
					color:#666666;
					margin-right:41upx;
				}
			}
		}
		.godsMessage{
			width:100%;
			height:204upx;
			.godsMethod{
				height:90upx;
				width:100%;
				display:flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 2upx solid #eeeeee;
				text{
					margin-left:40upx;
					margin-right:40upx;
					font-size:22upx;
					color:#666666;
				}
			}
			.messageBoard{
				width:100%;
				height:112upx;
				display:flex;
				justify-content: space-between;
				.buyer{
					display:inline-block;
					margin-left:40upx;
					margin-top:31upx;
					font-size:22upx;
					color:#666666;
				}
				.message{
					display:inline-block;
					margin-right:40upx;
					margin-top:31upx;
					font-size:22upx;
					color:#666666;
					width:438upx;
				}
			}
		}
		.godsAboutMoney{
			width:100%;
			height:238upx;
			.godsMoney{
				display:flex;
				justify-content: space-between;
				border:1px solid #eeeeee;
				height:160upx;
				p{
					font-size:23upx;
				}
				.godsLeft{	
					margin-left:40upx;
					p{
						color:#666666;
					}
					p:first-child{
						margin-top:30upx;
					}
					p:nth-child(2){
						margin-top:9upx;
					}
					p:last-child{
						margin-top:20upx;
					}
				}
				.godsRight{
					margin-right:40upx;
					p{
						color:#666666;
					}
					p:first-child{
						margin-top:30upx;
						color:#f5a436;
					}
					p:nth-child(2){
						margin-top:9upx;
					}
					p:last-child{
						margin-top:20upx;
					}
				}
			}
			.godsAll{
				display:flex;
				justify-content: space-between;
				height:77upx;
				.allLeft{
					margin-left:40upx;
					p{
						margin-top:21upx;
						font-size:23upx;
						color:#666666;
					}
				}
				.allRight{
					margin-right:40upx;
					p{
						margin-top:23upx;
						font-size:23upx;
						color:#f5a436;
					}
				}
			}
		}
	}
	
</style>
