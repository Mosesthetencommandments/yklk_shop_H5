<template>
	<view class="content">
		<view class="renheader">
			<view class="renbg"></view>
			<view class="renshopcar1" v-if="this.orderlist.if_pay === 1">
				<img src="../../static/images/dengdai.png" alt="">
				<text>等待买家付款</text>
			</view>
			<view class="renshopcar" v-if="this.orderlist.if_pay === 2 && this.orderlist.if_received === 0">
				<img src="../../static/images/yifk.png" alt="">
				<text>买家已付款</text>
			</view>
			<view class="renshopcar"  v-if="this.orderlist.if_pay === 2 && this.orderlist.if_received === 1" >
				<img src="../../static/images/car1_03.png" alt="">
				<text>卖家已发货</text>
			</view>
			<view class="renshopcar"  v-if="this.orderlist.if_pay === 2 && this.orderlist.if_received === 2" >
				<view>
					<img src="../../static/images/car1_03.png" alt="" >
					<text>交易成功</text>
				</view>
				
			</view> 
			<view class="renshopcar"  v-if="this.orderlist.if_assemble ===4">
				<img src="../../static/images/jyclose.png" alt="">
				<text>交易关闭</text>
			</view>
			<view class="renfill"></view>
			<view v-if="this.orderlist.if_pay === 2 && this.orderlist.if_received === 1">
				<view class="renExpressInformation" v-for="(bag,index) in this.orderlist.orders" @click="shopSuccess(bag.orders_unique_id)">
					<img src="../../static/images/2_07.png" alt="">
					<view class="rencenter" >
						<p class="fromAddress">【东莞市】快件已从虎门转运中心发出，正在发往 青岛转运中心</p>
						<text class="fromTime">2019-10-25 01:57:39</text>
					</view>
					<img src="../../static/images/right_10.png" alt="" class="renRigthArrow">
				</view>
			</view>
			
			<view  v-if="this.orderlist.if_pay === 2 && this.orderlist.if_received === 2">
				<view class="renExpressInformation" v-for="(bag,index) in this.orderlist.orders" @click="shopSuccess(bag.orders_unique_id)">
					<img src="../../static/images/2_07.png" alt="">
					<view class="rencenter" >
						<p class="fromAddress">【已签收】签收人凭取货码签收</p>
						<text class="fromTime">2019-10-25 01:57:39</text>
					</view>
					<img src="../../static/images/right_10.png" alt="" class="renRigthArrow">
				</view>
				
			</view>
			<view class="renRecipients" >
				<img src="../../static/images/zhuyi_03.png" alt="">
				<view class="rencenter">
					<view class="toCommunication">
						<text class="name">{{this.orderlist.orders_shop_receiver_info.receive_name}}</text>
						<text class="phone">{{this.orderlist.orders_shop_receiver_info.phone}}</text>
					</view>
					<view class="toAddress">
						<p>{{this.orderlist.orders_shop_receiver_info.province_name}} {{this.orderlist.orders_shop_receiver_info.city_name}} {{this.orderlist.orders_shop_receiver_info.district_name}} {{this.orderlist.orders_shop_receiver_info.address}}</p>
					</view>
				</view>
				
			</view>
		</view>
		<view>
		<view>
			<view class="fill"></view>
			<view class="containAll">
				<view class="renGods">
					<img src="../../static/images/small_03.png" alt="">
					<text>壹口两口</text>
				</view>
				<view class="myGods"  v-for = " (item,index) in this.orderlist.orders_shop_items">	
					<view class="mybox">
						<view class="godsImg">
							<img :src="item.shop_goods.image_thumb" alt="">
						</view>
						<view class="godsDes">
							<text class="godsName">{{item.shop_goods_common.goods_name}}</text>
							<text class="godsWeight" v-for="(items,index) in item.shop_goods.species_value" :key="index">规格: {{items}}</text>
							<text class="godsPrice">￥{{item.actual_pay}}</text>
						</view>
					</view>
					<view class="godsNum">
						<text class="textX">X</text>
						<text class="textNum">{{item.number}}</text>
					</view>
				</view>
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
							<text class="message">{{this.orderlist.remark}}</text>
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
								<p>￥{{totalPrice}}</p>
								<p>+￥{{this.orderlist.freight}}</p>
								<p v-if="this.orderlist.if_pay === 1">待支付</p>
								<p v-else>微信支付</p>
							</view>
						</view>
						<view class="godsAll">
							<view class="allLeft">
								<p>合计</p>
							</view>
							<view class="allRight">
								<p>￥{{totalPrice+this.orderlist.freight}}</p>
							</view>
						</view>
					</view>
					<view class="fill"></view>
				</view>
			</view>
		</view>	
		
		<view class="shoplist">
			<view class="listHeader">
				<view class="yellowDiv"></view>
				<view>
					<h2>订单信息</h2>
				</view>
			</view>
			<view class="listMessage">
				<p>订单编号：{{this.orderlist.orders_shop_unique_id}}</p>
				<p>创建时间：{{this.orderlist.created_at}}</p>
				<p v-if="this.orderlist.if_pay === 2">支付时间：2019-09-09 16:36:23</p>
			</view>
		</view>
		<shopfooter></shopfooter>
	</view>

	</view>
</template>

<script>
	import shopheader from "../../components/pre-order/pre-header"
	import shopcontain from "../../components/pre-order/pre-contain"
	import shoplist from "../../components/pre-order/pre-list"
	import shopfooter from "../../components/pre-order/pre-footer"
	export default {
		components:{
			shopheader,shopcontain,shoplist,shopfooter
		},
		onPullDownRefresh() {//下拉刷新
			this.getOrderList()
		},
		data() {
			return {
				orders_id:null,
				orderlist:[],
				orderid:null,
			}
		},
		computed:{
			totalPrice(){
				let allNum = 0;
				this.orderlist.orders_shop_items.forEach(item =>{
					allNum += item.actual_pay / 1
				})
				return allNum
			}
		},
		onLoad(id) {
			console.log(id)
			let remark = id
			for(const v in remark){
				this.orders_id = remark[v] / 1
				this.orderid = remark[v] / 1
			}
			this.getOrderList()
		},
		methods: {
			async getOrderList(){
				let [err,res] = await this.$http.post("/api/orders/getOrdersInfo", {orders_id:this.orders_id});
				if (res.data.code === 200) {
					this.orderlist = res.data.data
					console.log(this.orderlist)
					uni.stopPullDownRefresh();
				}
				
			},
			shopSuccess(id){
				uni.navigateTo({
					url:"../end-post/end-post?id=" + this.orderid + "uniid" + id 
				})
				console.log(this.orderid,id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.renheader{
		width:100%;
		height:100%;		
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
				width:60upx;
				margin-left:60upx;
			}
			text{
				color:#138EFF;
				font-size:36upx;
				margin-left:31upx;
				font-weight:500;
			}
		}
		.renshopcar1{
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
				width:60upx;
				margin-left:60upx;
			}
			text{
				color:#F49507;
				font-size:36upx;
				margin-left:31upx;
				font-weight:500;
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
					font-size:22upx;
					color:#56A8FD;
				}
				.fromTime{
					font-size:16upx;
					color:#999999;
					margin-top:20upx;
					margin-left:15upx;
				}
			}
			.renRigthArrow{
				width:22upx;
				height:32upx;
				margin-left:250upx;
			}
		}
		.renRecipients{
			height:180upx;
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
	.shoplist{
		width:100%;
		height:160upx;
		background:#fff;
		.listHeader{
			height:43upx;
			width:100%;
			position:relative;
			.yellowDiv{
				position:absolute;
				top:20upx;
				width:6upx;
				height:24upx;
				background:#f49c17;
				margin-left:40upx;
			}
			h2{
				font-size:23upx;
				margin-left:55upx;
				position:absolute;
				top:14upx
			}
		}
		.listMessage{
			height:118upx;
			width:100%;
			display:flex;
			flex-direction:column;
			p{
				font-size:28px;
				color:#cdcdcd;
				margin:5upx;
				margin-left:40upx;
				align-items: center;
			}
		}
	}
	.fill{
		background: #eeeeee;
		width:100%;
		height:20upx;
	}
	.containAll{
		width:100%;
		height:100%;
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
			margin-bottom:20upx;
			.mybox{
				display:flex;
				width:90%;
				height:100%;
			}
			.godsImg{
				img{
					width:180upx;
					height:180upx;
					border-radius:30upx 30upx 30upx 30upx;
				}
				margin-left:40upx;
			}
			.godsDes{
				margin-left:10upx;
				display:flex;
				flex-direction:column;
				justify-content: space-between;
				.godsName{
					margin-top:8upx;
					font-size:30upx;
					color:#444444;
					text-overflow:ellipsis;
					white-space: nowrap;
					overflow: hidden;
					width:400upx;
					margin-bottom:6upx;
				}
				.godsWeight{
					font-size:24upx;
					color:#a9a9a9;
				}
				.godsPrice{
					font-size:24upx;
					color:#f49c17;
					margin-bottom:30upx;
				}
			}
			.godsNum{
				.textX{
					font-size:20upx;
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
			height:100%;
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
			height:260upx;
			.godsMoney{
				display:flex;
				justify-content: space-between;
				border:1px solid #eeeeee;
				height:180upx;
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

