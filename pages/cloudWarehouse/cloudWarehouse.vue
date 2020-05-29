<template>
	<view>
		<view class="cloudWarehose_header_box">
			<view class="cloudWarehose_header">
				<view class="cloudWarehose_header_top">
					<view class="headPortrait">
						<image :src="d_warehouseUserinfo.user_headimgurl" mode=""></image>
					</view>
					<view class="personalDetails">
						<p>{{d_warehouseUserinfo.truename}}</p>
						<p>ID：{{d_warehouseUserinfo.customer_id}}</p>
						<p>上级领导人：{{d_warehouseUserinfo.parentName}}</p>
					</view>
					<view class="vip">
						<view class="vip_box">
							<image src="../../static/images/qie01_0000_星.png" mode=""></image>
							<view>{{d_warehouseUserinfo.distribution_level_name}}</view>
							<image src="../../static/images/qie01_0005__.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="cloudWarehose_header_bottom">
					<view class="" @click="goPickUpGoodsDetail">
						<p>{{d_warehouseUserinfo.my_goods_out_number}}</p>
						<p>本月提货量</p>
					</view>
					<view class="" @click="goPurchaseDetails">
						<p>{{d_warehouseUserinfo.my_goods_in_number}}</p>
						<p>本月进货量</p>
					</view>
				</view>
			</view>
		</view>
		<view class="productList_box">
			<view class="productList">
				<view class="productList_item" v-for="(item,index) in GoodsList" :key='index'> 
					<image :src="item.goods_image" mode=""></image>
					<view class="productList_item_right">
						<view class="inDetail">
							<p>{{item.goods_name}}</p>
							<p>规格 | {{item.goods_specs}}</p>
							<p>零售价：{{item.price}}</p>
							<p>库存：{{item.stock_number}}</p>
						</view>
						<view class="anniu">
							<view class="" @click="goWarehouseStock(item.id)">
								进货
							</view> 
							<view class="" @click="goPickUpGoods(item)">
								提货
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="loading" v-if="isCD">加载中...</view>
			<view class="loading" v-else>我是有底线的...</view> -->
		</view>
		
		<tabbarItem></tabbarItem>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	import tabbarItem from "../../components/WarehouseTabbar/tabbar.vue"
	export default {
		components:{
			tabbarItem
		},
		onLoad() {
			this.getCustomerAgentInfo()//个人信息
			this.getAgentGoodsList()//商品列表
		},
		onReachBottom() {//上拉加载更多
			this.A = 1
			this.getAgentGoodsList()//商品列表
		},
		onPullDownRefresh() {//下拉刷新
			this.A = 2
			this.getCustomerAgentInfo()
			this.getAgentGoodsList()//商品列表sssss
		},
		data() {
			return {
				d_warehouseUserinfo:{},
				sell:null,
				buy:null,
				GoodsList:[],
				d_page:{
					page:1,
					page_size:1000
				},
				getMore:true,//判断上拉加载的数量
				isCD:false,
				A:''
			};
		},
		methods:{
			getCustomerAgentInfo(){//个人信息
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/getCustomerAgentInfo",
					method: 'POST',
					header: {
						'shop': "1",
						'Authorization':warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.d_warehouseUserinfo = res.data.data
							console.log(this.d_warehouseUserinfo)
							this.sell = this.d_warehouseUserinfo.customer_agent.sell
							this.buy = this.d_warehouseUserinfo.customer_agent.buy
							uni.stopPullDownRefresh();
						}else if(res.data.errcode === 44){
							uni.showToast({title:"请重新登录",icon:'none'})
							 setTimeout(()=>{
								uni.redirectTo({
								    url: '../../pages/cloudWarehouse/warehouseLogin'
								});
							},1000)
						}else{
							uni.showToast({title:res.data.errstr,icon:'none'})
						}
					}
				})
			},
			getAgentGoodsList(){//商品列表
				// if(this.getMore === false){
				// 	uni.stopPullDownRefresh() 
				// 	return false;
				// }
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/getAgentGoodsList",
					method: 'POST',
					data:{
						page:this.d_page.page,
						page_size:this.d_page.page_size
					},
					header: {
						'shop': "1",
						'Authorization':warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							// if(this.A === 1){
							// 	console.log(121213)
							// 	this.d_page.page++
							// }else if(this.A === 2){
							// 	this.GoodsList = []
							// }
							// if(res.data.data.data.length === 0){
							// 	return
							// }
							// console.log(res.data.data)
							// this.isCD = true
							// if (res.data.data.current_page === res.data.data.last_page) {
							// 	this.isCD = false
							// 	this.getMore = false
							// 	console.log(this.isCD)
							// }
							// let list = []
							// list = res.data.data.data
							// this.GoodsList = this.GoodsList.concat(list)
							this.GoodsList = res.data.data.data
							console.log(this.GoodsList)
							uni.stopPullDownRefresh();
						}else if(res.data.errcode === 44){
							uni.showToast({title:"请重新登录",icon:'none'})
							 setTimeout(()=>{
								uni.redirectTo({
									url: '../../pages/cloudWarehouse/warehouseLogin'
								});
							},1000)
						}else{
							uni.showToast({title:res.data.errstr,icon:'none'})
						}
					}
				})
			},
			goWarehouseStock(id){
				uni.navigateTo({
					url: '../../pages/cloudWarehouse/WarehouseStock?goods_id=' + id
				})
			},
			goPickUpGoods(item){
				uni.navigateTo({
					url: '../../pages/cloudWarehouse/pickUpGoods?goods_id=' + item.id + '&stock_number=' + item.stock_number
				})
			},
			goPickUpGoodsDetail(){
				uni.navigateTo({
					url: '../../pages/cloudWarehouse/PickUpGoodsDetail'
				})
			},
			goPurchaseDetails(){
				uni.navigateTo({
					url: '../../pages/cloudWarehouse/PurchaseDetails'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.cloudWarehose_header_box{
	width:100%;
	height: 332upx;
	// background: #007AFF;
	padding: 0 28upx;
	overflow: hidden;
	.cloudWarehose_header{
		width:100%;
		height: 290upx;
		// background: ;
		border-radius: 20upx;
		margin-top:20upx;
		box-shadow: 0 2px 10upx #cdddf7;
		background:#53affc url(../../static/images/qie01_0000_yun.png) no-repeat 0 214upx;
		background-size: 100% 80upx;
		.cloudWarehose_header_top{
			width:100%;
			height: 146upx;
			padding-left: 38upx;
			display: flex;
			justify-content:space-between;
			padding-top: 34upx;
			.headPortrait{
				width:112upx;
				height: 112upx;
				image{
					width:100%;
					height: 100%;
					border-radius: 100%;
				}
			}
			.personalDetails{
				padding-left: 10upx;
				width:312upx;
				height: 112upx;
				// background-color: #2C405A;
				font-size: 20upx;
				color:#fff;
				line-height: 24upx;
				p:nth-child(1){
					font-size: 30upx;
					line-height: 50upx;
					margin-top: 10upx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				p:nth-child(3){
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
			.vip{
				width:214upx;
				height: 112upx;
				// background: #DD524D;
				display: flex;
				align-items: center;
				.vip_box{
					width:100%;
					height: 50upx;
					background-image: linear-gradient(to right, rgba(255, 255, 255,.5) , rgba(255, 255, 255, 0));
					border-top-left-radius: 50upx;
					border-bottom-left-radius: 50upx;
					padding:2upx;
					display: flex;
					align-items: center;
					// justify-content: space-between;
					font-size: 28upx;
					color:#fff;
					line-height: 50upx;
					image:first-child{
						width:46upx;
						height: 46upx;
					}
					view{
						width:116upx;
						margin:0 16upx 0 8upx ;
						text-align: center;
						// padding-top: 8upx;
					}
					image:last-child{
						width:14upx;
						height: 22upx;
					}
				}
			}
		}
	}
	.cloudWarehose_header_bottom{
		width:100%;
		height: 144upx;
		display: flex;
		justify-content: space-between;
		overflow: hidden;
		view{
			width:50%;
			// height: 100%;
			// background: #007AFF;
			text-align: center;
			color:#fff;
			font-size: 30upx;
			line-height: 40upx;
			margin-top:40upx;
		}
	}
}
.productList_box{
	width:100%;
	// height: 1000upx;
	padding: 0 28upx;
	.loading{
		width:100%;
		height: 100upx;
		text-align: center;
		line-height: 100upx;
		font-size: 24upx;
		color: #999999;
		margin-bottom: 100upx;
	}
	.productList{
		width:100%;
		height: 100%;
		background: #fff;
		border-radius: 20upx;
		padding: 48upx 30upx 0;
		margin-bottom: 150upx;
		.productList_item{
			width:100%;
			height: 196upx;
			margin-bottom: 40upx;
			display: flex;
			image{
				width:196upx;
				height: 196upx;
				border-radius: 20upx;
				margin-right: 50upx;
			}
			.productList_item_right{
				width:398upx;
				height: 100%;
				.inDetail{
					width:100%;
					height: 156upx;
					overflow: hidden;
					color:#222222;
					line-height: 34upx;
					p:nth-child(1){
						margin-top: 20upx;
						font-size: 28upx;
					}
					p:nth-child(2){
						font-size: 22upx;
						color: #919191;
					}
					p:nth-child(3){
						font-size: 22upx;
					}
					p:nth-child(4){
						font-size: 22upx;
					}
				}
				.anniu{
					width:100%;
					height: 40upx;
					line-height: 40upx;
					display: flex;
					flex-direction:row-reverse;
					view{
						width: 102upx;
						height: 100%;
						background: #53affc;
						color:#ffffff;
						text-align: center;
						line-height: 40upx;
						font-size: 24upx;
						border-radius: 10upx;
					}
					view:first-child{
						margin-left: 20upx;
					}
				}
			}
		}
	}
}
</style>
