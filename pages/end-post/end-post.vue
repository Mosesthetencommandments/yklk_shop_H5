<template>
	<view class="all-post">
		<view class="renheader">
			<view class="renbg"></view>
			<view class="gobackImg" @click="gobackto">
				<img src="../../static/images/APP-qie-out.png" alt="">
			</view>
			<!-- <view class="renshopcar">
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
			</view> -->
		<!-- 	<view class="renfill"></view> -->
			<view class="renExpressInformation" v-if="this.isHave === false">
				<view class="logistics">
					<view class="logisticsCompany-none">
						<text>物流信息:</text>
						<text>暂无信息</text>
					</view>		
				</view>
			</view>		
			<view class="renExpressInformation" v-else>
				<view class="logistics">
					<view class="logisticsState">
						<text>物流状态:</text>
						<text v-if="this.postInfo.status === 0">无效订单</text>
						<text v-if="this.postInfo.status === 1">未确认</text>
						<text v-if="this.postInfo.status === 2">待发货</text>
						<text v-if="this.postInfo.status === 3">发货中</text>
						<text v-if="this.postInfo.status === 4">断货中</text>
						<text v-if="this.postInfo.status === 5">已签收</text>
						<text v-if="this.postInfo.status === 6">已拒收</text>
						<text v-if="this.postInfo.status === 7">已完成</text>
						<text v-if="this.postInfo.status === 8">已退回</text>
						<text v-if="this.postInfo.status === 9">已废弃</text>
						<text v-if="this.postInfo.status === 10">已退款</text>
					</view>
					<view class="logisticsCompany">
						<text>物流公司:</text>
						<text>{{this.logistics_name}}</text>
					</view>		
					<view class="logisticsNum">
						<text>运单号:</text>
						<text>{{this.logistics_number}}</text>
					</view>											
				</view>
			</view>		
		</view>
		<view class="fill"></view>
		<view class="ld-process" v-if="this.isHave === true">
			<view class="ld-sign">
				<view class="ld-fill"></view>
				<view class="ld-delivery-content" v-if="this.trace === null || this.trace === undefined || this.trace ==='' || this.trace[0] === null || this.trace[0] === undefined || this.trace[0] === ''">
					<view class="ld-delivery-title">
						<view class="img-box">
							<img src="../../static/images/sign-people_06.png" alt="">
						</view>
						<view class="content-box">
							<text >暂无物流信息</text>
						</view>	
					</view>
				</view>
				<view class="ld-delivery-content"  v-else v-for="(post,index) in this.trace" :key="index">
					<view class="ld-delivery-title">
						<view class="img-box">
							<img src="../../static/images/sign-people_06.png" alt="">
						</view>
						
						<view class="content-box">
							<text >{{post.status}}</text>
							<text style="margin-top:10upx;">{{post.time}}</text>
						</view>	
					</view>
				</view>
				<view class="footer">
					<text @click="gotoIndex">店铺主页</text>
					<text></text>
					<text @click="gotoList">我的订单</text>
					<text></text>
					<text @click="gotoPerson">联系客服</text>
				</view>
			</view>
		</view>
<!-- 		<ldfooter></ldfooter> -->
	</view>
</template>

<script>
	// import ldfooter from "../../components/logistics-details/ld-footer.vue"
	export default {
		onPullDownRefresh() {//下拉刷新
			this.getListInfo()
		},
		data() {
			return {
				id:null,
				orders_shop_unique_id:null,
				order_unique_id:null,
				getid:null,
				postInfo:[],
				logistics_name:null,
				logistics_number:null,
				trace:[],
				isHave:null,
			}
		},
		methods: {
			gotoIndex(){
				uni.navigateTo({
					url:"../index/index"
				})
			},
			gotoList(){
				uni.navigateTo({
					url:"../orderList/orderList"
				})
			},
			gotoPerson(){
				uni.navigateTo({
					url:"../contactUs/contactUs"
				})
			},
			gobackto(){
				uni.navigateBack({
					 delta: 1
				})
			},
			async getListInfo(){
				let [err,res] = await this.$http.post("/api/orders/getOrdersInfo",{
					orders_id:this.id
				})
				if(res.data.code === 200){
					console.log(res.data.data)
					this.orders_shop_unique_id = res.data.data.orders[0].orders_unique_id
					uni.stopPullDownRefresh();
				}
				this.getPostInfo()
			},
			async getPostInfo(){
				let [err,res] = await this.$http.post("/api/orders/getOrdersLogisticsTrace", {
					orders_id:this.id,
					orders_unique_id:this.orders_shop_unique_id
				});
				if(res.data.code === 200){
					if(res.data.data === '' || res.data.data === undefined || res.data.data === null){
						this.isHave = false
						return 
					}
					this.isHave = true
					this.postInfo = res.data.data
					// console.log(this.postInfo)
					this.logistics_name = this.postInfo.orders_logistics.logistics_name
					this.logistics_number = this.postInfo.orders_logistics.logistics_number
					this.trace = this.postInfo.orders_logistics.trace
				}
			}
		},
		onLoad(id){
			console.log(id.id)
			this.id = id.id / 1
			this.getListInfo()
		
		},
		
	}
</script>

<style lang="scss" scoped>
	.all-post{
		height:100%;
		.footer{
			height:100upx;
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
	}
	.gobackImg{
		width:60upx;
		height:60upx;
		position:absolute;
		top:20upx;
		left:24upx;
		img{
			width:100%;
			height:100%;
		}
	}
	.renheader{
		width:100%;
		// height:302upx;		
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
					margin-top:10upx;
					text:first-child{
						font-size:24upx;
						color:#666666;
					}
					text:last-child{
						font-size:24upx;
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
				.logisticsCompany-none{
					margin-left:38upx;
					text:first-child{
						font-size:40upx;
						color:#999999;
					}
					text:last-child{
						font-size:40upx;
						color:#999999;
						margin-left:16upx;
					}
				}
				.logisticsNum{
					margin-left:38upx;
					margin-top:-20upx;
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
	.ld-process{
		.ld-sign{
			width:100%;
			.ld-delivery-content:last-child(){
				margin-bottom:100upx;
			}
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
			height:100%;
			width:100%;
			background:#fff;
			position:relative;
			.content-box{
				width:100%;
				display:flex;
				flex-direction: column;
				margin-top:40upx;
				margin-bottom:40upx;
			}
			.ld-delivery-title{
				margin-left:40upx;
				height:100%;
				display:flex;
				align-items: center;
				border-left:3upx dashed #f49c17;
				img{
					position:relative;
					left:-26upx;
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
				height:100%;
				width:100%;
				display:flex;					
				.ld-delivery-contain-icon{
					width:50upx;
					height:130upx;
					margin-left:40upx;
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
