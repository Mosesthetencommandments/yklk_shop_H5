<template>
	<view>
		<!-- 顶部 -->
		<view class="header">
			<image src="../../static/images/APP-qie8_0000_图层-2.png" mode=""></image>
		</view>
		<!-- 标题 -->
		<view class="xs-box">
			<view class="xian"></view>
			<view class="zi">
				限时满减券
			</view>
			<view class="xian"></view>
		</view>
		<!-- 优惠券 -->
		<view class="coupons-box" >
			<view v-for="(item,index) in fullReduction" :key="index">
				<!-- 满减 -->
				<view class="coupons" v-if="item.coupon_type === 1 ">
					<view class="red-packet-ticket-one-content-left">
						<p><text>￥</text>{{item.offset_money}}</p>
					</view>
					<view class="red-packet-ticket-one-content-right">
						<p>满减红包</p>
						<p>满{{item.require_total_pay}}可用</p>
						<view class="btnBox">
							<view @click="receiveShopCustomerCoupon(item)" :class="[item.aaaa === true? 'active' :'']">{{!item.aaaa ? '':'已'}}领取</view>
						</view>
					</view>
				</view>
				<!-- 折扣 -->
				<view class="coupons" v-else>
					<view class="red-packet-ticket-one-content-left">
						<p><text style="font-size: 24upx;">折</text>{{item.offset_percent / 10}}</p>
					</view>
					<view class="red-packet-ticket-one-content-right">
						<p>满减红包</p>
						<p>满{{item.require_total_pay}}可用</p>
						<view class="btnBox">
							<view @click.stop="receiveShopCustomerCoupon(item)" :class="[item.aaaa === true? 'active' :'']">{{!item.aaaa ? '':'已'}}领取</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		<!-- 标题 -->
		<view class="xs-box">
			<view class="xian"></view>
			<view class="zi">
				可用商品
			</view>
			<view class="xian"></view>
		</view>
		<!-- 商品列表 -->
		<view class="goods-box" v-for="(items,index) in goods" :key="index">
			<view class="goods">
				<view class="coupon-fresh-card">
					<view class="coupon-fresh-card-left">
						<view class="coupon-fresh-card-left-img">
							<img :src="items.main_images_default" alt="">
						</view>
						<view class="coupon-fresh-card-left-text">
							<p>{{items.goods_name}}</p>
							<p><text>￥</text>{{items.price}}</p>
							<p>2019.11.18 00:00 至 2019.12.18 23:59</p>
						</view>
					</view>
					<view class="coupon-fresh-card-right">
						<view class="btn" @click="goGoodsDatils(items.id)">购买</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 领取成功 -->
		<view class="successful-box" @click="asd" v-if="isShow">
			<view class="successful">
				<view class="successful-top">
					<image src="../../static/images/APP-qie8_0006_√.png" mode=""></image>
					<view class="">领取成功</view>
				</view>
				<view class="successful-bottom">
					<view class="img-box">
						<view class="img-box-left">{{ successReceiveMessage }}
							<text v-if="successReceiveCouponType === 1">元</text>
							<text v-else>折</text>
						</view>
						<view class="img-box-right">
							<view class="top">新人专享券</view>
							<view class="bottom">适用新人专享产品</view>
						</view>
					</view>
					<view class="footer">
						快去使用你的专属优惠券吧！
					</view>
				</view>
			</view>
			<view class="xxian"></view>
			<view class="shutDown-box">
				<image class="shutDown" src="../../static/images/APP-qie10_0000_x.png" mode=""></image>
			</view>
		</view>
		<!-- 领取失败 -->
		<view class="failure-box" @click="add" v-if="isClcik">
			<view class="failure">
				<view class="failure-top">
					<image src="../../static/images/APP-qie8_0005_x.png" mode=""></image>
					<view class="">领取失败</view>
				</view>
				<view class="failure-bottom">
					<image src="../../static/images/APP-qie8_0004_han.png" mode=""></image>
					<view>此卷新用户适用</view>
					<view>再去看看其他优惠券吧~</view>
				</view>
			</view>
			<view class="xxian"></view>
			<view class="shutDown-box">
				<image class="shutDown" src="../../static/images/APP-qie10_0000_x.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onPullDownRefresh() {//下拉刷新
			this.getShopCouponList()	
		},
		onLoad() {
			this.getShopCouponList()
		},
		data() {
			return {
				isShow:false,
				isClcik:false,
				isSShow:false,
				discount:[],
				fullReduction:[],
				ids:[],
				goods:[],
				id:null,
				gods:[],
				successReceiveMessage: '',
				successReceiveCouponType: undefined,
				id:null
			};
		},
		methods:{
			goGoodsDatils(id){
				console.log(id)
				this.id = id
				uni.navigateTo({
					url:"../buy/buy?product_id=" + this.id,
				})
			},
			async getShopCouponList(){//获取优惠券列表
				let [err,res] = await this.$http.post("/api/coupon/getShopCouponList",{
					page:1,
					page_size:10,
					only_new_customer:1//新人券
				})
				if(res.data.code !== 200){
					return
				}
				this.fullReduction = []
				let list = res.data.data
				for(let i = 0 ; i < list.length; i++){
					this.fullReduction.push({
						id:list[i].id,
						coupon_type:list[i].coupon_type,
						offset_money:list[i].offset_money,
						require_total_pay:list[i].require_total_pay,
						offset_percent:list[i].offset_percent,
						limit_goods:list[i].limit_goods,
						aaaa : false,
					})
				}
				for(let k = 0; k < this.fullReduction.length; k++){
					for(let j = 0; j < this.fullReduction[k].limit_goods.length;j++){
						this.ids.push(
							this.fullReduction[k].limit_goods[j]
						)
					}
				
				}
				this.getShopGoodsCommonList()
				uni.stopPullDownRefresh();
			},
			async getShopGoodsCommonList(){//根据优惠券获取商品列表
				let [err,res] = await this.$http.post("/api/shop_goods/getShopGoodsCommonList",{
					ids:this.ids
				});
				if(res.data.code == 200){
					this.goods=[]
					let list = res.data.data.data
					// console.log(list)
					for(let i = 0 ; i < list.length; i++){
						this.goods.push({
							id:list[i].id,
							main_images_default:list[i].main_images_default,
							price:list[i].price,
							goods_title:list[i].goods_title,
							goods_name:list[i].goods_name,
						})
					}
					// console.log(this.goods)
				}
			},
			async receiveShopCustomerCoupon(item){//根据接口判断是否领取成功
				this.id = item.id
				let [err,res] = await this.$http.post("/api/coupon/receiveShopCustomerCoupon",{shop_coupon_id:this.id});
				if(res.data.code === 200){
					let coupon_id = res.data.data.coupon_id
					if(coupon_id === this.id){
						if (item.coupon_type === 1) {
							this.successReceiveCouponType = 1
							this.successReceiveMessage = item.offset_money
						} else {
							this.successReceiveCouponType = 2
							this.successReceiveMessage = item.offset_percent / 10
						}
						item.aaaa = true
						this.isShow = true
					}
				}else{
					item.aaaa = false
					this.isClcik = true
				}
				// }else{
				// 	let coupon_id = res.data.data.coupon_id
				// 	console.log(coupon_id)
				// 	if(this.id === coupon_id){
				// 		this.isClcik = false
				// 		this.isSShow = false
				// 	}	
				
			},
			asd(){
				this.isShow = false
			},
			add(){
				this.isClcik = false
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #ffffff;
	}
.header{
	width:100%;
	height: 310upx;
	image{
		width:100%;
		height: 100%;
	}
}
.xs-box{
	width:100%;
	height: 74upx;
	padding-top: 23upx;
	display: flex;
	justify-content: center;
	line-height: 74upx;
	.xian{
		width:95upx;
		height: 2px;
		background: #eeeeee;
		line-height: 74upx;
		margin-top: 17upx;
	}
	.zi{
		width:150upx;
		height: 36upx;
		background: #eeeeee;
		border-radius: 20upx;
		font-size: 24upx;
		color:#666666;
		text-align: center;
		line-height:36upx ;
	}
}
.coupons-box{
	width:100%;
	height: 100%;
	padding: 0 40upx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.coupons{
		width:320upx;
		height: 162upx;
		background: url(../../static/images/APP-qie5_0009_quan-di.png) no-repeat;
		background-size: 312upx 162upx;
		display: flex;
		margin-bottom:20upx;
	}
}
.red-packet-ticket-one-content-left{
	margin-left:26upx;
	margin-top:36upx;
	font-size:70upx;
	color:#b88240;
	font-weight: 900;
	text{
		font-size:36upx;
	}
}
.red-packet-ticket-one-content-right{
	margin-top:48upx;
	margin-left:15upx;
	p{
		line-height: 36upx;
	}
	p:first-child{
		font-size:30upx;
		font-weight:900
	}
	p:nth-child(2){
		font-size:24upx;
		font-weight:900
	}
	.btnBox{
		width:140upx;
		height:40upx ;
		position:relative;
		view{
			width:100upx;
			height:34upx;
			position: absolute;
			top:4upx;
			left:8upx;
			border-radius:40upx;
			line-height:34upx;
			font-size:20upx;
			background:#fff9ee;
			text-align: center;
		}
	}
	
	.active{
		cursor: not-allowed;
		pointer-events:none;
		background:red;
		color:#bd894a;
		border-radius:20upx;
	}
}
.goods-box{
	width:100%;
	height: 100%;
	padding:0 40upx;
}
.coupon-fresh-card{
	width:100%;
	height:160upx;
	margin-bottom: 14upx;
	background:#eeeeee;
	border-radius: 16upx;
	padding:20upx 22upx;
	display: flex;
	.coupon-fresh-card-left{
		width:524upx;
		height:160upx;
		display:flex;
		.coupon-fresh-card-left-img{
			width:120upx;
			height: 120upx;
			border-radius: 14upx;
			overflow: hidden;
			img{
				width:100%;
				height:100%;
			}
		}
		.coupon-fresh-card-left-text{
			width:400upx;
			height:120upx;
			padding:0 14upx;
			padding-top:14upx;
			p:first-child{
				font-size:22upx;
				color:#666666;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			p:nth-child(2){
				text:first-child{
					font-size: 20upx;
					color:#454545;
					margin-right: 4upx;
				}
				text:nth-child(2){
					font-size: 20upx;
					color:#f49c17;
					margin-left:6upx;

				}
				font-size:34upx;
				color:#f49c17;
			}
			p:last-child{
			font-size:25upx;
			margin-top:-14upx;
			margin-left: -40upx;
			color:#9a9997;
			transform:scale(0.8,0.8);  
			white-space: nowrap;
			}
		}
	}
	.coupon-fresh-card-right{
		width:94upx;
		height:120upx;
		.btn{
			background: #2a3e45;
			color:#ffffff;
			width:94upx;
			height: 40upx;
			font-size: 24upx;
			border-radius: 20upx;
			text-align: center;
			line-height: 40upx;
			margin-top:38upx;
		}
	}
}

// 领取成功
.successful-box{
	width:100%;
	height: 100vh;
	background: rgba(0,0,0,.5);
	z-index: 10;
	position:fixed;
	top:0;
	padding: 0 100upx;
	padding-top:370upx;
	.successful{
		width:100%;
		height: 356upx;
		background: #f49c17;
		border-radius: 30upx;
		padding:35upx 55upx;
	}
	.shutDown-box{
		width:100%;
		height: 60upx;
		display: flex;
		justify-content: center;
		padding-left: 12upx;
		.shutDown{
			width:60upx;
			height: 60upx;
			display: block;
			
		}
	}
	
}
.successful-top{
	width:100%;
	height:80upx ;
	display: flex;
	text-align: center;
	image{
		width:60upx;
		height: 60upx;
		margin-left:30upx;
		margin-top:10upx;
	}
	view{
		font-size: 64upx;
		color:#ffffff;
		font-weight: 900;
		margin-left: 20upx;
		line-height: 64upx;
	}
	
}
.successful-bottom{
	width:100%;
	height: 190upx;
	.img-box{
		width:100%;
		height: 146upx;
		background: #ffffff;
		margin-top:10upx;
		background: url(../../static/images/APP-qie10_0000_优惠券.png) no-repeat;
		background-size:100% 146upx ;
		display: flex;
		.img-box-left{
			text-align: center;
			width:156upx;
			height: 100%;
			font-size: 64upx;
			color: #f49c17;
			line-height: 144upx;
			font-weight: 600;
			text{
				font-size: 28upx;
			}
		}
		.img-box-right{
			width:200upx;
			height: 100%;
			padding-top: 41upx;
			.top{
				font-size: 30upx;
				color:#121212;
			}
			.bottom{
				font-size: 20upx;
				color: #666666;
			}
		}
	}
}
.footer{
	font-size: 24upx;
	text-align: center;
	color:#ffffff;
	line-height: 60upx;
}
.xxian{
	width:2px;
	height: 130upx;
	background: #ffffff;
	margin-left:279upx;
}
// 领取失败
.failure-box{
	width:100%;
	height: 100vh;
	background: rgba(0,0,0,.5);
	z-index: 10;
	position:fixed;
	top:0;
	padding: 0 100upx;
	padding-top:370upx;
	.shutDown-box{
		width:100%;
		height: 60upx;
		display: flex;
		justify-content: center;
		padding-left: 12upx;
		.shutDown{
			width:60upx;
			height: 60upx;
			display: block;
		}
	}
	.failure{
		width:100%;
		height: 356upx;
		background: #999999;
		border-radius: 30upx;
		padding:35upx 55upx;
	}
}
.failure-top{
	width:100%;
	height:80upx ;
	display: flex;
	text-align: center;
	image{
		width:60upx;
		height: 60upx;
		margin-left:30upx;
		margin-top:10upx;
	}
	view{
		font-size: 64upx;
		color:#ffffff;
		font-weight: 900;
		margin-left: 20upx;
		line-height: 64upx;
	}
	
}
.failure-bottom{
	width:100%;
	height: 200upx;
	text-align: center;
	image{
		width:96upx;
		height: 96upx;
		margin-top:30upx;
	}
	view{
		font-size: 24upx;
		color:#ffffff;
	}
}
</style>
