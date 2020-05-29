<template>
	<view class="integral-center">
		<view class="integral-center-box">
			<view class="integral-center-users">
				<view class="integral-center-users-header">
					<view class="integral-center-usersImg">
						<img :src="userInfo.user_headimgurl" alt="">
					</view>
				</view>
				<view class="integral-center-users-info">
					<p class="integral-center-users-info-header">{{userInfo.user_nickname}}</p>
					<view class="integral-center-usersinfo">
						<view class="integral-center-users-info-left">
							<p>会员编号: {{userInfo.customer_id}}</p>
							<p>关注时间: {{userInfo.created_at}}</p>
						</view>
					</view>		
				</view>
				<view class="integral-center-users-info-right">
					<view class="YB">
						<p>银贝&nbsp;&nbsp;(个)</p>
						<view>
							<img src="../../static/images/APP-qie7_0000_bei-1.png" alt="">
							<p>{{balance_silver}}</p>
						</view>
						
					</view>
				</view>
			</view>
			<view class="integral-center-usersinfo-B">
			<!-- 	<view class="JB">
					<p>金贝   (个)</p>
					<view>
						<img src="../../static/images/APP-qie7_0002_bei-3.png" alt="">
						<p>2986</p>
					</view>
					
				</view> -->
				
			</view>
		</view>

		<view class="integral-center-chooseCard">
			<view class="integral-center-chooseCard-content" >
				<view v-for="(item,index) in choosecard" :key="index" class="integral-center-chooseCard-box">
					<view class="integral-center-chooseCard-item" @tap="changetap(index)" :class="{'active':integralIndex ===index}">
						<img :src="item.path" alt="">
						<text>{{item.title}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 下方选项卡 -->
		<view class="integral-fill"></view>
		<!-- 兑换中心 -->
		<view class="integral-goods-box_box" v-if="this.integralIndex === 0">
			<view class="integral-goods-box" v-for="item in IntegralGoods" :key="item.id">
				<view class="integral-goods">
					<view class="integral-goods-text">
						<view class="integral-goods-text-header">
							<view class="integral-goods-text-chunk" ></view>
							<view class="goods_title">{{item.shop_goods_common.goods_name}}</view>
						</view>
						<view class="integral-goods-text-content">
							<p>兑换：<text>{{item.integral_price}}积分+￥{{item.integral_discount_price}}元</text></p>
							<p>库存：<text>{{item.stock_surplus}}/{{item.stock_total}}份</text></p>
							<p>参考价：<text>{{item.origin_price}}元</text></p>
						</view>
						<view class="integral-goods-text-button">
							<view class="goIntegral" v-if="item.integral_price <= balance_silver" @click="goPoint_mall_settlement(item.id)">
								<!-- <text>{{item.integral_price}}积分+￥{{item.integral_discount_price}}</text> -->
								<text>兑换</text>
							</view>
							<view class="notenough" v-else>
							<!-- 	<text>{{item.integral_price}}积分+￥{{item.integral_discount_price}}</text> -->
								<text>不足</text>
							</view>
							<view class="goshop" @click="GoodsPurchased(item.id)">
								<text>购买</text>
							</view>
							
							
						</view>
					</view>
					<view class="integral-goods-img">
						<img :src="item.image_thumb" alt="">
					</view>
				</view>
				<!-- <view class="integral-goods-fill"></view> -->
			</view>
			<view class="" style="width:100%;height: 100upx;">
				
			</view>
		</view>
		<!-- 已兑换 -->
		<view v-if="this.integralIndex === 1" class="conversion">
			<view class="conversion-box" v-for="item in HasChange" :key="item.id" >
				<view class="conversion-box-img">
					<img :src="item.shop_goods.image_thumb" alt="">
				</view>
				<view class="conversion-box-content">
					<view class="conversion-box-content-item">
						<p>{{item.shop_goods_common.goods_name}}</p>
						<p>兑换数量: {{item.shop_goods_number}}</p>
						<p>兑换时间: {{item.created_at}}</p>
					</view>
				</view>
				<view class="conversion-box-iscontent">
					<p>已兑换</p>
				</view>
			</view>
		</view>
		<!-- 排行榜 -->
		<view v-if="this.integralIndex === 2" class="leaderboard" @click="getCustomerRankInfo">
		<!-- 	<view class="leaderboard-header">
				<p>积分排名前100</p>
			</view> -->
			<view class="leaderboard-all-box">
				<view class="leaderboard-all-fill"></view>
				<view class="leaderboard-box leaderboard-box-active" v-if="leaderboard.length >0">
					<view class="leaderboard-box-left">
						<view>
							<img src="../../static/images/APP-qie5_0004_1.png" alt="">
						</view>
						<view>
							<img :src="leaderboard0.customer_shop.user_headimgurl" alt="">
						</view>
						<view>
							<text>{{leaderboard0.customer_shop.user_nickname}}</text>
						</view>	
					</view>
					<view class="leaderboard-box-right">
						<p>{{leaderboard0.number}}</p>
					</view>
				</view>
				<view class="leaderboard-box leaderboard-box-active" v-if="leaderboard.length > 1">
					<view class="leaderboard-box-left">
						<view>
							<img src="../../static/images/APP-qie5_0003_2.png" alt="">
						</view>
						<view>
							<img :src="leaderboard1.customer_shop.user_headimgurl" alt="">
						</view>
						<view>
							<text>{{leaderboard1.customer_shop.user_nickname}}</text>
						</view>	
					</view>
					<view class="leaderboard-box-right">
						<p>{{leaderboard1.number}}</p>
					</view>
				</view>
				<view class="leaderboard-box leaderboard-box-active" v-if="leaderboard.length > 2">
					<view class="leaderboard-box-left">
						<view>
							<img src="../../static/images/APP-qie5_0002_3.png" alt="">
						</view>
						<view>
							<img :src="leaderboard2.customer_shop.user_headimgurl" alt="">
						</view>
						<view>
							<text>{{leaderboard2.customer_shop.user_nickname}}</text>
						</view>	
					</view>
					<view class="leaderboard-box-right">
						<p>{{leaderboard2.number}}</p>
					</view>
				</view>
				<view class="leaderboard-box" v-for="item in leaderboard" :key="item.id" :class="[item.isTop === true? 'leaderboard-box-active' :'']" v-if="leaderboard.length > 3">
					<view class="leaderboard-box-left">
						<view>
							<img src="../../static/images/leaderlis_03.png" alt="">
						</view>
						<view>
							<img :src="item.customer_shop.user_headimgurl" alt="">
						</view>
						<view>
							<text>{{item.customer_shop.user_nickname}}</text>
						</view>	
					</view>
					<view class="leaderboard-box-right">
						<p>{{item.number}}</p>
					</view>
				</view>
			</view>
		</view>
		<tabbarItem></tabbarItem>
	</view>
	
</template>

<script>	
	import tabbarItem from "../../components/tabbarItem/tabbar.vue"
	export default {
		components:{
			tabbarItem,
		},
		onPullDownRefresh() {//下拉刷新
			this.getShopGoodsIntegralList()
			this.getCustomerInfo()
		},
		data() {
			return {
				integralIndex:0,
				choosecard:[
					{id:1,title:"兑换中心",path:"../../static/images/APP-qie5_0007_jifen-1.png"},
					{id:2,title:"已兑换",path:"../../static/images/APP-qie5_0006_jifen-2.png"},
					{id:3,title:"排行榜",path:"../../static/images/APP-qie5_0005_jifen-3.png"}
				],
				goodscontent:[],
				leaderboard0:[],
				leaderboard1:[],
				leaderboard2:[],
				leaderboard:[],
				userInfo:{},
				balance_silver:0,
				IntegralGoods:[],
				HasChange:[]
			}
		},
		onLoad() {
			this.getCustomerInfo()
			this.getCustomerMoneyInfo()
			this.getShopGoodsIntegralList()//积分商品列表
		},
		methods: {
			// getCustomerRankInfo(){
			// 	console.log(1)
			// 	this.getCustomerIntegralRankingList()
			// },
			changetap(index){
				this.integralIndex=index;
				if(this.integralIndex === 0){
					this.getCustomerInfo()
					this.getCustomerMoneyInfo()
					this.getShopGoodsIntegralList()//积分商品列表
					return 
				}
				if(this.integralIndex === 1){
					this.getShopGoodsIntegralExchangeList()
					return 
				}
				if(this.integralIndex === 2){
					this.getCustomerIntegralRankingList()
					return 
				}
			},
			async getCustomerIntegralRankingList(){//积分排行榜
				let [err,res] = await this.$http.post("/api/customer/getCustomerIntegralRanking");
				if(res.data.code === 200){
					this.leaderboard = res.data.data
					console.log(this.leaderboard)
					for(let i = 0 ; i < this.leaderboard.length; i++){
						this.leaderboard0 = this.leaderboard[0]
						this.leaderboard1 = this.leaderboard[1]
						this.leaderboard2 = this.leaderboard[2]
					}
					if(this.leaderboard.length>3){
						this.leaderboard.splice(0,3)
					}
				}
			},
			async getCustomerInfo(){//获取token中的用户信息
				let [err,res] = await this.$http.post('/api/customer/getCustomerInfo');
				if(res.data.code === 200){
					console.log(res.data.data)
					this.userInfo = res.data.data
					// this.getShopGoodsIntegralExchangeList()
				}
			},
			async getCustomerMoneyInfo(){//获取用户金贝银贝信息
				// const token = uni.getStorageSync('token')
				// if (token === '' || token === null || token === undefined) {
				// 	return
				// }
				let [err,res] = await this.$http.post('/api/customer/getCustomerMoneyInfo');
				if(res.data.code === 200){
					this.balance_silver = res.data.data.balance_silver
				}
			},
			async getShopGoodsIntegralExchangeList(){//已兑换的商品列表
				let [err,res] = await this.$http.post('/api/shop/getShopGoodsIntegralExchangeList',{
					customer_id:this.userInfo.customer_id,
					page_size:100
				});
				if(res.data.code === 200){
					this.HasChange = res.data.data.data
				}
			},
			async getShopGoodsIntegralList(){//积分商品列表
				let [err,res] = await this.$http.post('/api/shop/getShopGoodsIntegralList',{
					integral_status:1,
					page_size:100
				});
				if(res.data.code === 200){
					this.IntegralGoods = res.data.data.data
					console.log(this.IntegralGoods)
					uni.stopPullDownRefresh();
				}
			},
			async goPoint_mall_settlement(id){
				let [err,res] = await this.$http.post('/api/orders/updatePreparedOrders',{//预处理订单
					shop_orders_source:5,
					shop_goods_id:id,
					shop_goods_number:1
				});
				if(res.data.code === 200){
					uni.setStorageSync('shop_goods_id',id);
					uni.navigateTo({
						url: '/pages/settle-accounts/Point_mall_settlement?shop_goods_id=' + id + '&d_integral=dxs'
					});
				}
				
			},
			async GoodsPurchased(id){
				console.log(id)
				let [err,res] = await this.$http.post('/api/orders/updatePreparedOrders',{//预处理订单
					shop_orders_source:1,
					shop_goods_id:id,
					shop_goods_number:1
				});
				if(res.data.code === 200){
					uni.setStorageSync('shop_goods_id',id);
					uni.navigateTo({
					    url: '/pages/settle-accounts/settle-accounts'
					});
				}
				
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	page{
		background:#fff;
	}
	.integral-center{
		width:100%;
		height:100%;
		.integral-center-box{
			height:330upx;
			background-image: linear-gradient(to bottom right, #49c6fe, #369eff);
		}
		.integral-center-usersinfo-B{
			margin-left:130upx;
			margin-right:130upx;
			display:flex;
			justify-content: space-between;
			.JB{
				color:#ffffff;
				font-size:24upx;
				
				view{
					display:flex;
					img{
						width:26upx;
						height:23upx;
						margin-top:26upx;
					}
					p{
						font-size: 40upx;
						color:#f3fffb;
						margin-top:10upx;
						margin-left:5upx;
						font-weight: 600;
					}
				}
			}
			
		}
		.integral-center-users{
			height:192upx;
			display:flex;
			.integral-center-users-header{
				padding-top:50upx;
				margin-left:78upx;
				display:flex;
				.integral-center-usersImg{
					img{
						width:138upx;
						height:138upx;
						border:6upx solid #ffffff;
						border-radius:50%;
					}
				}
			}
			.integral-center-users-info{
				width:350upx;
				height: 192upx;
				padding-top:78upx;
				padding-left: 20upx;
				.integral-center-users-info-header{	
					font-size:30upx;
					color:#eeffff;
					font-weight: 600;
				}
				.integral-center-usersinfo{
					display: flex;
					justify-content: space-between;
					.integral-center-users-info-left{
						p{
							font-size:18upx;
							color: #ffffff;
						}
						p:last-child{
							margin-top:10upx;
							font-size:18upx;
							color: #ffffff;
						}
					}
					
				}
				.integral-center-usersinfo-B{
					display: flex;

				}
			}
			.integral-center-users-info-right{
				width:180upx;
				height: 192upx;
				padding-top:110upx;
				.YB{
					color: #ffffff;
					font-size:24upx;
					view{
						display:flex;
						margin-top:-20upx;
						img{
							width:32upx;
							height:28upx;
							margin-top:26upx;
						}
						p{
							font-size: 40upx;
							color:#f3fffb;
							margin-top:10upx;
							margin-left:5upx;
							font-weight: 500;
						}
					}
				}
			}
		}

		.integral-center-chooseCard{
			height:180upx;
			width:100%;
			.integral-center-chooseCard-content{
				// background: #007AFF;
				margin-left:28upx;
				margin-right:28upx;
				height:170upx;
				border-radius:25upx 25upx 25upx 25upx;
				display:flex;
				justify-content: space-around;
				background:#fff;
				box-shadow: 0upx 0upx 10upx  #c3c3c3;
				margin-top:-95upx;
				.integral-center-chooseCard-box{
					display:flex;
					.integral-center-chooseCard-item{
						display:flex;
						flex-direction:column;
						justify-content: center;
						align-items: center;
						img{
							width:50upx;
							height:50upx;
						}
						text{
							font-size:22upx;
							color:#999999;
							margin-top:16upx;
						}
					}
				}
			}
			
		}
		.integral-fill{
			height:28upx;
			width:100%;
			background-color: #ffffff;
		}
		.integral-goods-box_box{
			// height: 100%;
			// margin-bottom:50upx;
			// background-color: #007AFF;
		}
		.integral-goods-box{
			margin-bottom:19upx;
			width:100%;
			height:330upx;
			background:#fff;
			padding: 0 30upx;
			.integral-goods{
				height:330upx;				
				display: flex;
				justify-content: space-between;
				.integral-goods-text{
					width:50%;
					.integral-goods-text-header{
						height: 48upx;
						line-height: 48upx;
						display:flex;
						justify-content: space-between;
						.integral-goods-text-chunk{
							width:8upx;
							height:28upx;
							background:#3c7cfa;
							margin-top:10upx;
						}
						.goods_title{
							width:93%;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							font-size:30upx;
						}
					}
					.integral-goods-text-content{
						margin-left:26upx;
						p{
							font-size:24upx;
							color:#666666;
							margin-bottom:10upx;
							text{
								color:#f49c16;
							}
						}
						p:first-child{
							margin-top:30upx;
						}
					}
					
				}
				
				.integral-goods-img{
					img{
						width:330upx;
						height:330upx;
						border-radius: 16upx;
					}	
				}
			}
			.integral-goods-fill{
				height:19upx;
				background:#fff;
				width:100%;
			}
		}
	}
	.integral-goods-text-button{
		margin-top:30upx;
		// height:86upx;
		margin-left: 20upx;
		display: flex;
		justify-content: space-between;
		.notenough{
			background:#666666;
			width:49%;
			border-radius:10upx;
			color:#fff;
			line-height:86upx;
			text-align: center;
			text:last-child{
				font-size:29upx;
			}
		}
		.goshop{
			background: #007AFF;
			width:49%;
			border-radius:10upx;
			background:#369eff;
			color:#fff;
			line-height:86upx;
			text-align: center;
			text:last-child{
				font-size:29upx;
			}
		}
		.goIntegral{
			width:49%;
			// height:86upx;
			border-radius:10upx;
			background:#369eff;
			color:#fff;
			line-height:86upx;
			text-align: center;
			// text:first-child{
			// 	font-size:18upx;
			// 	margin-right:12upx;
			// }
			text:last-child{
				font-size:29upx;
			}
		}
	}
	.conversion{
		width:100%;
		height:100%;
		.conversion-box{
			margin-left:28upx;
			margin-right:28upx;
			background:#ffffff;
			height:170upx;
			border-radius:20upx;
			display:flex;
			justify-content: space-between;
			margin-bottom:20upx;
			box-shadow: -2upx 2upx 10upx #eaeaea;
			padding:20upx;
			.conversion-box-img{
				width:170upx;
				height:100%;
				display: flex;
				justify-content: center;
				align-items: center;
				img{
					width:130upx;
					height:130upx;
					border-radius: 14upx;
				}
			}
			.conversion-box-content{
				width: 400upx;
				height:100%;
				display: flex;
				align-items: center;
				.conversion-box-content-item{
					height:130upx;
					width:400upx;
					p{
						
						font-size:20upx;
						color:#d0d0d0;
					}
					p:first-child{
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						font-size:23upx;
						color:#666666;
						margin-bottom: 10upx;
					}
					p:nth-child(2){
						// margin-top:20upx;
					}
				}
			}
			.conversion-box-iscontent{
				// width:240upx;
				height:100% ;
				// background-color: #1AAD19;
				p{
					right:20upx;
					text-align: right;
					font-size:21upx;
					color:#f49c17;
					line-height: 36upx;
				}
			}
		}
	}
	.leaderboard{
		width:100%;
		height:100%;
		background:#fff;
		.leaderboard-header{
			height:56upx;
			width:295upx;
			background:#47c2fe;
			border-radius:0 25upx 25upx 0upx;
			display:flex;
			align-items: center;
			p{
				margin-left:55upx;
				color:#fff;
				font-size:28upx;
			}
		}
		.leaderboard-all-box{
			width:100%;
			height:100%;
			.leaderboard-all-fill{
				width:100%;
				height:21upx;
			}
			.leaderboard-box{
				margin-left:28upx;
				margin-right:28upx;
				margin-bottom:10upx;
				height:76upx;
				border-radius: 18upx;
				background:#fafafa;
				display:flex;
				align-items: center;
				justify-content: space-between;
				.leaderboard-box-left{
					height:76upx;
					line-height:76upx;
					display:flex;
					img{
						height:34upx;
					}
					view{
						height:76upx;
					}
					view:first-child{
						width:34upx;
						margin-left:23upx;
					}
					view:nth-child(2){
						margin-left:30upx;
						img{
							border-radius: 50%;
						}
					}
					view:last-child{
						margin-left:11upx;
						text{
							font-size:28upx;
							color:#666666;
						}
					}
				}
				.leaderboard-box-right{
					margin-right:21upx;
					color:#f79c17;
					font-size:23upx;
				}
			}
			.leaderboard-box-active{
				background:#fcf5ef;
			}
		}
	}
</style>
