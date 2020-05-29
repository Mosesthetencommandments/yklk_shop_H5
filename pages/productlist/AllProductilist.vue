<template>
	<view>
		<!-- <view class="isloading" v-if="this.gods.length === 0 ">
			<img src="../../static/images/loading.gif" alt="" >
		</view> -->
		<view>
			<!-- <view class="swiperbox">
				<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
				    <swiper class="swiper-box" @change="change">
				        <swiper-item v-for="(item ,index) in banners" :key="item.id" >
				            <view class="swiper-item">
								<image :src="item" mode=""></image>
				            </view>
				        </swiper-item>
				    </swiper>
				</uni-swiper-dot>
			</view> -->
			<view class="list-content-box">
				<view class="list-content" v-for="(item,index) in gods" :key="index" @click="gotoDetail(item.id)">
					<view class="img-box">
						<img :src="item.main_images_default" alt="">
					</view>
					<view class="list-title-box">
						<view class="list-title">{{item.goods_name}}</view>
						<!-- <view class="self-buying" v-if="item.max_rebate !== '0.00'">
							自返
						</view> -->
					</view>
					<view class="list-money">￥{{item.price}}</view>
					<view class="list-moneyOff">
						<view class="moneyOff" v-if="item.shop_goods_freight_template.template_name !== '' && item.shop_goods_freight_template.template_name !== null && item.shop_goods_freight_template.template_name !== undefined">{{item.shop_goods_freight_template.template_name}}</view>
						<view class="moneyOff1" v-else></view>
						<!-- <view class="shoppingCar">
							<image src="../../static/images/APP-01_0008_shop-car.png" mode=""></image>
						</view> -->
						<!-- <view class="self-buying" v-if="item.max_rebate !== '0.00'">
							最高返{{item.max_rebate}}元
						</view> -->
						<view class="self-buying" v-if="item.max_rebate !== '0.00'">
							自返
						</view>
					</view>
				</view>
			</view>
			<view class="fill">
				
			</view>
		</view>
		<tabbarItem></tabbarItem>
	</view>
	
</template>

<script>
	import {mapActions} from "vuex"
	import tabbarItem from "../../components/tabbarItem/tabbar.vue"
	import uniSwiperDot from "../../components/uni-swiper-dot/uni-swiper-dot.vue"
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'//下拉加载
	var _self, page = 1,timer = null;
	export default {
		components:{
			tabbarItem,uniSwiperDot,uniLoadMore
		},
		data() {
			return {
				gods:[],
				listId:null,
				info: [
					
				],
				current: 0,
				mode: 'round',
				banners:[],
				fuli:[],
				page:1,
				loadingText: '加载中...',
				loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2--contentnomore
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				
			}
		},
		onLoad(option){
			this.listId = option.group_id / 1
			this.getListInfo()
			// this.getBannerInfo()
		
		},
		onPullDownRefresh() {//下拉刷新
			this.getListInfo()
			// this.getBannerInfo()
		},
		onReachBottom() {
			//触底的时候请求数据，即为上拉加载更多
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(()=> {
				this.getListInfo();
			}, 0);
		},
		methods: {
			...mapActions(['addGoodInCar'])	,
			change(e) {
				this.current = e.detail.current;
			},
			gotoDetail(id){
				uni.navigateTo({
					url:"/pages/buy/buy?product_id="+ id
				})
			},
			async getListInfo(){
				if (this.loadingType !== 0) {
					uni.stopPullDownRefresh()//loadingType!=0;直接返回
					return false;
				}
				let [err,res] = await this.$http.post("/api/shop_goods/getShopGoodsCommonList",{
					page:this.page,
					page_size:10,
				});
				console.log(res.data.data)
				if(res.data.code === 200){
					if (res.data.data.current_page > res.data.data.last_page ) {//没有数据
						this.loadingType = 2;
						return;
					}
					let godsbox = []
					godsbox = res.data.data.data
					this.gods = this.gods.concat(godsbox)
					this.page++;//得到数据之后page+1
					// for(let v = 0; v < this.gods.length; v++){
					// 	if(this.gods[v].shop_goods_freight_template.template_name === null){
					// 		continue;
					// 	}
					// 	console.log(this.gods[v])
					// 	this.fuli.push(this.gods[v].shop_goods_freight_template.template_name)
					// }
					this.loadingType = 0
					uni.stopPullDownRefresh();//得到数据后停止下拉刷新
				}
			},
			async getBannerInfo(){
					// console.log(this.listId)
				let [err,res] = await this.$http.post("/api/shop_goods/findShopGoodsGroupInfo",{
					group_id:this.listId
				});
				if(res.data.code === 200){
					// console.log(res.data.data)
					this.banners = res.data.data.img
					this.info.push(res.data.data.img) 
					uni.stopPullDownRefresh();
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f7f7f7;
	}
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
	.isloading{
	 width:100%;
	 height:100vh;
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 img{
	  width:40%;
	 }
	}

	.swiper{
		height: 323upx;
	}
	.swiper-item{
		width:100%;
		height: 323upx;
		background: #007AFF;
	}
	.loading{
		background: url(../../static/images/loading.gif) no-repeat;
		background-size: 140upx 140upx;
		background-position: 300upx;
	}
	.swiperbox{
		width:100%;
		height: 323upx;	
		image{
			width:100%;	
			height: 100%;
		}
	}
	.swiper-box{
		width:100%;
		height:323upx;
	}
.list-content-box{
	width:100%;
	height: 100%;
	// background: #007AFF;
	padding:0 20upx;
	margin-top:20upx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding-bottom:100upx;
	.list-content:last-child{
		margin-bottom: 50upx;
	}
	.list-content:nth-last-child(2){
		margin-bottom: 50upx;
	}
	.fill{
		height:100upx;
	}
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
			justify-content: space-between;
			// background: #007AFF;
			.list-title{
				width:94%;
				height: 62upx;
				line-height: 62upx;
				font-size: 24upx;
				color:#333333;
				padding:0 19upx;
				text-overflow: ellipsis;
				white-space:nowrap;
				overflow:hidden;
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
			.moneyOff1{
				width:140upx;
				height: 38upx;
				border-radius: 4upx;
				border:1px solid #FFFFFF;
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
