<template>
	<view class="ld-process">
		<view class="ld-sign">
			<view class="ld-fill"></view>
			<view class="ld-sign-content">
				<view class="ld-sign-title">
					<img src="../../static/images/sign-true_03.png" alt="">
					<text>{{ldSignTitle}}</text>
				</view>
				<view class="ld-sign-contain">
					<view class="ld-sign-contain-icon">
						<view class="sign-circle"></view>
					</view>
					<view class="ld-sign-contain-text">
						<p>{{ldSignContainText}}</p>
						<p>{{ldSignContainTime}}</p>
					</view>
				</view>
			</view>
			<view class="ld-claim-content">
				<view class="ld-claim-title">
					<img src="../../static/images/sign-box_03.png" alt="">
					<text>{{ldClaimTitle}}</text>
				</view>
				<view class="ld-claim-contain">
					<view class="ld-claim-contain-icon">
						<view class="claim-circle"></view>
					</view>
					<view class="ld-claim-contain-text">
						<p>{{ldClaimContainText}}<text class="ld-claim-contain-text-phone">{{ldClaimContainCall}}</text></p>						
						<p>{{ldClaimContainTime}}</p>
					</view>
				</view>
			</view>
			<view class="ld-delivery-content">
				<view class="ld-delivery-title">
					<img src="../../static/images/sign-people_06.png" alt="">
					<text>{{ldDeliveryTitle}}</text>
				</view>
				<view class="ld-delivery-contain">
					<view class="ld-delivery-contain-icon">
						<view class="delivery-circle"></view>
					</view>
					<view class="ld-delivery-contain-text">
						<p>{{ldDeliveryContainText}}, 电话<text>{{ldDeliveryContainCall}}</text>，{{ldDeliveryContainMsg}}</p>
						<p>{{ldDeliveryContainTime}}</p>
					</view>
				</view>
			</view>
			<view class="ld-transport-content">
				<view class="ld-transport-title">
					<img src="../../static/images/sign-people_06.png" alt="">
					<text>{{ldDeliveryTitle}}</text>
				</view>
				<view class="ld-transport-contain">
					<view class="ld-transport-contain-icon">
						<view class="transport-circle"></view>
					</view>
					<view class="ld-transport-contain-text">
						<p>{{ldTransportContainText}}</p>
						<p>{{ldTransportContainTime}}</p>
					</view>
				</view>
			</view>
			<view class="ld-road-content">
				<view class="ld-road-contain">
					<view class="ld-road-contain-icon">
						<view class="yellowCircle"></view>				
						<view class="road-circle"></view>
					</view>
					<view class="ld-road-contain-text">
						<p>{{ldRoadContainText}}</p>
						<p>{{ldRoadContainTime}}</p>
					</view>
				</view>
			</view>
			<view class="ld-shipments-content">
				<view class="ld-shipments-title">
					<img src="../../static/images/gods-shipments_03.png" alt="">
					<text>{{ldShipmentTitle}}</text>
				</view>
				<view class="ld-shipments-contain">
					<view class="ld-shipments-contain-icon">
					</view>
					<view class="ld-shipments-contain-text">
						<p>{{ldShipmentsContainText}}</p>
						<p>{{ldShipmentsContainTime}}</p>
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
				ldSignTitle:"已签收",
				ldSignContainText:"已签收，签收人凭取货码签收",
				ldSignContainTime:"2019-09-11 20:41:12",
				ldClaimTitle:"待取件",
				ldClaimContainText:"[自提柜]您的快件已存放至SD国金中心蜂巢【自提柜】,请及时取件。有问题联系派件员：",
				ldClaimContainCall:"15755703999",
				ldClaimContainTime:"2019-09-11 20:41:12",
				ldDeliveryTitle:"派件中",
				ldDeliveryContainText:"【青岛市】山东青岛株洲路公司的派件员：内谁谁啥师傅",
				ldDeliveryContainCall:"15755703999",
				ldDeliveryContainMsg:"当前正在为您派件",
				ldDeliveryContainTime:"2019-09-11 20:41:12",
				ldTransportContainText:"【山东青岛株洲路公司已收入】",
				ldTransportContainTime:"2019-09-11 20:41:12",
				ldRoadContainText:"快递已到达【哪哪哪哪哪哪】扫描员是谁谁谁",
				ldRoadContainTime:"2019-09-11 20:41:12",
				ldShipmentTitle:"已发货",
				ldShipmentsContainText:"您的包裹已出库",
				ldShipmentsContainTime:"2019-09-11 20:41:12",
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.ld-process{
		height:970upx;
		.ld-sign{
			height:169upx;
			width:100%;
			.ld-fill{
				background:#fff;
				height:21upx;
				width:100%;
			}
			.ld-sign-content{
				height:148upx;
				width:100%;
				background:#fff;
				.ld-sign-title{
					margin-left:40upx;
					height:50upx;
					width:100%;
					display:flex;
					align-items: center;
					img{
						width:50upx;
						height:50upx;						
					}
					text{
						font-size:22upx;
						margin-left:20upx;
						color:#f49c17;
					}
				}
				.ld-sign-contain{
					height:98upx;
					width:100%;
					display:flex;					
					.ld-sign-contain-icon{
						width:50upx;
						height:98upx;
						display:flex;
						margin-left:40upx;
						.sign-circle{
							width:24upx;
							height:98upx;
							border-right:3upx dashed #f49c17;
						}
					}
					.ld-sign-contain-text{
						margin-left:20upx;
						p:first-child{
							font-size:22upx;
							color:#f49c17;
						}
						p:last-child{
							font-size:15upx;
							color:#f49c17;
							margin-top:11upx;
						}
					}
				}	
			}
		}
		.ld-claim-content{
			height:206upx;
			width:100%;
			background:#fff;
			.ld-claim-title{
				margin-left:40upx;
				height:50upx;
				width:100%;
				display:flex;
				align-items: center;
				img{
					width:50upx;
					height:50upx;						
				}
				text{
					font-size:22upx;
					margin-left:20upx;
					color:#f49c17;
					span{
						vertical-align: top;
					}
				}
			}
			.ld-claim-contain{
				height:156upx;
				width:100%;
				display:flex;					
				.ld-claim-contain-icon{
					width:50upx;
					height:156upx;
					display:flex;
					flex-direction: column;
					margin-left:40upx;
					.claim-circle{
						width:24upx;
						height:156upx;
						border-right:3upx dashed #f49c17;
					}
				}
				.ld-claim-contain-text{
					width:79%;
					margin-right:50upx;
					margin-left:20upx;
					p:first-child{
						font-size:21upx;
						color:#666666;
						text{
							font-size:21upx;
							color:#f49c17;
						}
					}
					
					.ld-claim-contain-text-phone{
						color:#f49c17;
					}
					p:last-child{
						font-size:15upx;
						color:#666666;
					}
				}
			}
		}
		.ld-delivery-content{
			height:180upx;
			width:100%;
			background:#fff;
			.ld-delivery-title{
				margin-left:40upx;
				height:50upx;
				width:100%;
				display:flex;
				align-items: center;
				img{
					width:50upx;
					height:50upx;						
				}
				text{
					font-size:22upx;
					margin-left:20upx;
					color:#f49c17;
				}
			}
			.ld-delivery-contain{
				height:130upx;
				width:100%;
				display:flex;					
				.ld-delivery-contain-icon{
					width:50upx;
					height:130upx;
					margin-left:40upx;
					.delivery-circle{
						width:24upx;
						height:130upx;
						border-right:3upx dashed #f49c17;
					}
				}
				.ld-delivery-contain-text{
					width:79%;
					margin-right:50upx;
					margin-left:20upx;
					p:first-child{
						font-size:21upx;
						color:#666666;
						text{
							color:#f49c17;
						}
					}
					p:last-child{
						font-size:15upx;
						color:#666666;
					}
					.ld-delivery-contain-text-phone{
						color:#f49c17;
					}
				}
			}
		}
		.ld-transport-content{
			height:166upx;
			width:100%;
			background:#fff;
			.ld-transport-title{
				margin-left:40upx;
				height:50upx;
				width:100%;
				display:flex;
				align-items: center;
				img{
					width:50upx;
					height:50upx;						
				}
				text{
					font-size:22upx;
					margin-left:20upx;
					color:#f49c17;
				}
			}
			.ld-transport-contain{
				height:130upx;
				width:100%;
				display:flex;					
				.ld-transport-contain-icon{
					width:50upx;
					height:130upx;
					display:flex;
					margin-left:40upx;
					.transport-circle{
						width:24upx;
						height:130upx;
						border-right:3upx dashed #f49c17;
					}
				}
				.ld-transport-contain-text{						
					margin-right:50upx;
					margin-left:20upx;
					p:first-child{
						font-size:21upx;
						color:#666666;
						text{
							color:#f49c17;
						}
					}
					p:last-child{
						font-size:15upx;
						color:#666666;
					}
					.ld-transport-contain-text-phone{
						color:#f49c17;
					}
				}
			}
		}
		.ld-road-contain{
			height:96upx;
			width:100%;
			display:flex;		
			background:#fff;
			.ld-road-contain-icon{
				width:50upx;
				height:96upx;
				display:flex;
				flex-direction: column;
				margin-left:40upx;
				.yellowCircle{
					width:20upx;
					height:20upx;
					background:#f49c17;
					border-radius:50%;
					margin:0 auto;
				}
				.road-circle{
					width:24upx;
					height:74upx;
					border-right:3upx dashed #f49c17;
				}
			}
			.ld-road-contain-text{		
				margin-right:50upx;
				margin-left:20upx;
				p:first-child{
					font-size:21upx;
					color:#666666;
					text{
						color:#f49c17;
					}
				}
				p:last-child{
					font-size:15upx;
					color:#666666;
				}
				.ld-road-contain-text-phone{
					color:#f49c17;
				}
			}
		}
		.ld-shipments-content{
			height:155upx;
			width:100%;
			background:#fff;
			.ld-shipments-title{
				margin-left:40upx;
				height:50upx;
				width:100%;
				display:flex;
				align-items: center;
				img{
					width:50upx;
					height:50upx;						
				}
				text{
					font-size:22upx;
					margin-left:20upx;
					color:#f49c17;
				}
			}
			.ld-shipments-contain{
				height:104upx;
				width:100%;
				display:flex;					
				.ld-shipments-contain-icon{
					width:50upx;
					height:104upx;
					display:flex;
					margin-left:40upx;
				}
				.ld-shipments-contain-text{						
					margin-right:50upx;
					margin-left:20upx;
					p:first-child{
						font-size:21upx;
						color:#666666;
						text{
							color:#f49c17;
						}
					}
					p:last-child{
						font-size:15upx;
						color:#666666;
					}
					.ld-shipments-contain-text-phone{
						color:#f49c17;
					}
				}
			}
		}
		
	}
</style>
