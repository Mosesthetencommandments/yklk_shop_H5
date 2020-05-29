<template>
	<view>
		<view class="header">
			<view class="header-search-left">
				<input class="search" type="text" v-model="searchInfo.goods_name" style="padding-left: 62upx;" placeholder="美味三文鱼降价">
				<image class="icon-search" src="../../static/images/APP-01_0023_sousuo.png" mode=""></image>
			</view>
			<view class="header-search-right">
				<view @click="getShopGoodsCommonList">搜索</view>
				<view @click="goIndex">取消</view>
			</view>	
		</view>
		<!-- 下方商品信息 -->
		<!-- 搜索页面 -->
		<view class="list-content-box">
			<view class="list-content" v-for="item in gods" :key="item.id">
				<view class="img-box">
					<img :src="item.main_images_default" alt=""  @click="gotoDetail(item.id)">
				</view>
				<view class="list-title-box">
					<view class="list-title">{{item.goods_name}}</view>
					<!-- <view class="self-buying" v-if="item.max_rebate !== '0.00'">
						自返
					</view> -->
				</view>
				<view class="list-money">￥{{item.price}}</view>
				<view class="list-moneyOff">
					<view class="moneyOff">{{item.shop_goods_freight_template.template_name}}</view>
					<!-- <view class="shoppingCar">
						<image src="../../static/images/APP-01_0008_shop-car.png" ></image>
					</view> -->
					<view class="self-buying" v-if="item.max_rebate !== '0.00'">
						自返
					</view>
				</view>
			</view>
		</view>
		<!-- 从优惠券页面 -->
		<view class="list-content-box">
			<view class="list-content" v-for="item in goods" :key="item.id">
				<view class="img-box">
					<img :src="item.main_images_default" alt=""  @click="gotoDetail(item.id)">
				</view>
				<view class="list-title-box">
					<view class="list-title">{{item.goods_name}}</view>
					<!-- <view class="self-buying" v-if="item.max_rebate !== '0.00'">
						自返
					</view> -->
				</view>
				<view class="list-money">￥{{item.price}}</view>
				<view class="list-moneyOff">
					<view class="moneyOff">{{item.shop_goods_freight_template.template_name}}</view>
					<view class="shoppingCar">
						<image src="../../static/images/APP-01_0008_shop-car.png" ></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		 onPullDownRefresh() {//下拉刷新
			this.CommonList()
		},
		data() {
			return {
				gods:[],
				goods:[],
				goods1:[],
				ids:[],
				type:null,
				searchInfo:{
					page:1,
					page_size:6,
					goods_name:"",
				},
				getMore:true,
				isHave:false,
				isSpecial:false,
			}
		},
		created(){
			
		},
		onLoad(option) {
			if(option.all === "1"){
				this.type = 1
				this.getMore = true
			}else{
				this.type = 2
				this.getMore = true
			}
			// console.log(Array.isArray(option.ids))
			if(option.ids !== undefined){
				// console.log(option.ids)
				this.ids = JSON.parse(option.ids)
			}else{
				this.ids.push("0")
			}
			this.CommonList()
		},
		onReachBottom() {
			//触底的时候请求数据，即为上拉加载更多
			this.CommonList();
		},
		methods: {
			async CommonList(){
				if(this.type === 1){
					if(this.getMore === false){
						uni.stopPullDownRefresh() 
						return false;
					}
					let [err,res] = await this.$http.post("/api/shop_goods/getShopGoodsCommonList",this.searchInfo);
					if(res.data.code == 200){
						if (res.data.data.current_page === res.data.data.last_page) {
							this.getMore = false
						}
						this.searchInfo.page++
						let list = []
						list = res.data.data.data
						this.goods = this.goods.concat(list)
					}
					uni.stopPullDownRefresh();
				}
				if(this.type === 2){
					if(this.isHave === true){
						let [err,res] = await this.$http.post("/api/shop_goods/getShopGoodsCommonList",this.searchInfo)
						if(res.data.code == 200){
							if (res.data.data.current_page === res.data.data.last_page) {
								this.isHave = false
							}
							this.searchInfo.page++
							let list = []
							list = res.data.data.data
							this.gods = this.gods.concat(list)
						}
						uni.stopPullDownRefresh();
						return 
					}
					if(this.getMore === true){
						this.isSpecial = true
						let [err,res] = await this.$http.post("/api/shop_goods/getShopGoodsCommonList",{ids:this.ids});
						if(res.data.code == 200){
							if(res.data.data.current_page === res.data.data.last_page){
								this.getMore = false
							}
							let list = res.data.data.data
							for(let i = 0 ; i < list.length; i++){
								this.goods.push({
									id:list[i].id,
									main_images_default:list[i].main_images_default,
									price:list[i].price,
									goods_title:list[i].goods_title,
									shop_goods_freight_template:{
										template_name:list[i].shop_goods_freight_template.template_name
									},
									goods_name:list[i].goods_name,
								})
							}
							uni.stopPullDownRefresh();
						}
					}
				}
			},
			async getShopGoodsCommonList(){//搜索
				this.type1 = 2
				this.goods = []
				this.gods = []
				this.searchInfo.page = 1
				this.getMore = true
				if(this.type === 1){
					if(this.goods_name == ""){
						this.CommonList();
						return 
					}
					let [err,res] = await this.$http.post("/api/shop_goods/getShopGoodsCommonList",this.searchInfo);
					if(res.data.code === 200){
						let list = res.data.data.data
						this.searchInfo.page++
						this.gods = list
					}
				}
				if(this.type === 2){
					if(this.searchInfo.goods_name == ""){
						if(this.isSpecial === true){
							this.isSpecial = false
							this.CommonList()
						}
						return
					}
					this.isHave = true
					this.CommonList()
				}
			},
			gotoDetail(id){
				uni.navigateTo({
					url:"/pages/buy/buy?product_id="+ id
				})
			},
			goIndex(){
				uni.navigateBack({
					url:"../index/index"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.self-buying{
		// width:100%;
		margin-top:10upx;
		height: 36upx;
		border:2upx solid #fc777a;
		color:#fc1d20;
		text-align: center;
		line-height: 34upx;
		font-weight:400;
		font-size: 20upx;
		border-radius: 6upx;
		padding:0 6upx;
	}
	.header{
		width:100%;
		height:90upx;
		background:#53aefc;
		position: relative;
		z-index: 5;
		margin-bottom: 20upx;
		padding-top:24upx;
		view{
			float:left;
		}
		.search{
			width:480upx;
			height: 46upx;
			background: #FFFFFF;
			border-radius: 30upx;
			margin-left:28upx;
			font-size: 25upx;			
			// margin-top: 24upx;
			display:flex;
			align-items:center;
			p{
				font-weight:600;
				color:#d0cecf;
				margin-left:60upx;
			}
	
		}
		.header-search-right{
			float: right;
			padding-right:28upx ;
			// padding-top:24upx;
			view{
				width:96upx;
				height: 50upx;
				background: #FFFFFF;
				text-align: center;
				border-radius: 10upx;
				font-size: 20upx;
				margin-left:8upx;
				line-height: 50upx;
			}
		}
		.header-search-right img{
			width:50upx;
			height: 50upx;
			margin-top: 24upx;
		}
		.icon-search{
			width:26upx;
			height: 26upx;
			display: block;
			position: absolute;
			left:42upx;
			top:34upx;
		}
	}
	
	
	
	.list-content-box{
		width:100%;
		height: 100%;
		// background: #007AFF;
		padding:0 20upx;
		// margin-top:20upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		// margin-bottom:100upx;
		.list-content{
			width:341upx;
			height: 508upx;
			border-radius: 8upx;
			background:#ffffff;
			overflow: hidden;
			margin-bottom: 30upx;
			.img-box{
				width:100%;
				height: 336upx;
				img{
					width:100%;
	
					height:100%;
				}
			}
			.list-title-box{
				width:100%;
				height: 62upx;
				display: flex;
				padding:0 19upx;
				justify-content: space-between;
				.list-title{
					width:94%;
					height: 62upx;
					line-height: 62upx;
					font-size: 24upx;
					color:#333333;
				
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
			
			.list-money{
				width:100%;
				height: 33upx;
				padding: 0 19upx;
				font-size: 22upx;
				color:#333333;
				line-height:40upx;
			}
			.list-moneyOff{
				width:100%;
				height: 69upx;
				padding:0 19upx;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				.moneyOff{
					width:140upx;
					height: 38upx;
					border-radius: 4upx;
					border:1px solid #f3b047;
					font-size: 24upx;
					text-align: center;
					line-height: 38upx;
					margin-top:10upx;
					color:#f3b047;
				}
				.shoppingCar{
					width:46upx;
					height: 46upx;
					background:#53aefc;
					border-radius: 100%;
					text-align: center;
					image{
						width:64%;
						height: 64%;
					}
				}
			}
		}
	}
	
</style>
