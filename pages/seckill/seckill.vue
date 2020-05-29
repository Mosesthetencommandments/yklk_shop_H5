<template>
	<view>
<!-- 		<view class="isloading" v-if="this.seckill.length ===0">
			<img src="../../static/images/loading.gif" alt="">
		</view> -->
		<view>
			<view class="swiperbox">
				<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
				    <swiper class="swiper-box" @change="change">
				        <swiper-item v-for="(item ,index) in banners" :key="item.id" >
				            <view class="swiper-item">
				               <!-- {{item.content}} -->
								<image :src="item" mode=""></image>
				            </view>
				        </swiper-item>
				    </swiper>
				</uni-swiper-dot>
			</view>
		<view>
			<view class="s-time" >
				<text>距下一波秒杀还有：</text>
				<uni-countdown class="countdown"
				    color="#FFFFFF" 
				    background-color="#ec373e" 
				    border-color="#ec373e" 
				    :day="1" 
				    :hour="14" 
				    :minute="35" 
				    :second="0">
				</uni-countdown>
			</view>
		</view>
		<view style="margin-bottom:100upx">
			<view class="seckill-shop">
				<view class="seckill-linebox" v-for="(item,index) in gods" :key="index">
					<image :src="item.main_images_default" class="shopimg"></image>
					<view class="s-shop-detail">
						<view class="s-shop-bt">
							<text class="shop-name">{{item.goods_name}}</text>
							<view class="seck-shop-time">
								<text class="miao">秒杀中</text>
								<view class="shop-countdown">
									<uni-countdown
									    background-color="#FFFFFF" 
									    border-color="#FFFFFF" 
										color="#ec373e"
										splitor-color="#ec373e"
										:show-day="false" 
									    :hour="20" 
									    :minute="30" 
									    :second="0">
									</uni-countdown>
								</view>
							</view>
						</view>
					<!-- 	<view class="ss-biao">
							<text>生鲜热销排名第一</text>
						</view> -->
						<view class="ss-man">
							<text>
								{{item.shop_goods_freight_template.template_name}}
							</text>
						</view>
						<view class="shop-price">
							<view class="real-price">
								<view class="red-price">￥{{item.price}}</view>
								<view class="gray-price">{{item.origin_price}}</view>
							</view>
							<view class="start">
								<navigator>
									<text class="start-num">{{item.sold_count}}件已售</text><br />
									<text class="start-do" @click="toDetail(item.id)">马上秒</text>
								</navigator>
							</view>
						</view>
					</view>
				</view>
				
				<!-- <view class="seckill-linebox">
					<image src="../../static/images/01.png" class="shopimg"></image>
					<view class="s-shop-detail">
						<view class="s-shop-bt">
							<text class="shop-name">饱满夏威夷贝肉饱满夏威夷贝肉</text>
							<view class="seck-shop-time">
								<text class="miao">秒杀中</text>
								<view class="shop-countdown">
									<uni-countdown
									    background-color="#FFFFFF" 
									    border-color="#FFFFFF" 
										color="#ec373e"
										splitor-color="#ec373e"
										:show-day="false" 
									    :hour="13" 
									    :minute="21" 
									    :second="41">
									</uni-countdown>
								</view>
							</view>
						</view>
						<view class="ss-biao">
							<text>生鲜热销排名第一</text>
						</view>
						<view class="ss-man">
							<text>
								满138元包邮
							</text>
						</view>
						<view class="shop-price">
							<view class="real-price">
								<text class="red-price">￥66.00</text>
								<text class="gray-price">88.00</text>
							</view>
							<view class="start">
								<navigator>
									<text class="start-num">453件已售</text><br />
									<text class="start-do">马上秒</text>
								</navigator>
							</view>
						</view>
					</view>
				</view> -->
				
				<!-- <view class="seckill-linebox">
					<image src="../../static/images/02.png" class="shopimg"></image>
					<view class="s-shop-detail">
						<view class="s-shop-bt">
							<text class="shop-name">最后200捡</text>
							<view class="seck-shop-time">
								<text class="miao over">已结束</text>
								<view class="shop-countdown overboder">
									<uni-countdown
									    background-color="#FFFFFF" 
									    border-color="#FFFFFF" 
										color="#666666"
										splitor-color="#666666"
										:show-day="false" 
									    :hour="0" 
									    :minute="0" 
									    :second="0">
									</uni-countdown>
								</view>
							</view>
						</view>

						<view class="ss-man">
							<text>
								满138元包邮
							</text>
						</view>
						<view class="shop-price">
							<view class="real-price">
								<text class="red-price"></text>
								<text class="gray-price"></text>
							</view>
							<view class="start over">
								<navigator>
									<text class="start-num">453件已售</text><br />
									<text class="start-do">已结束</text>
								</navigator>
							</view>
						</view>
					</view>
				</view> -->
			</view>
		</view>
		</view>
		
		<tabbarItem></tabbarItem>
	</view>
</template>

<script>
	import uniSwiperDot from '../../components/uni-swiper-dot-1/uni-swiper-dot.vue'
	import uniCountdown from "../../components/uni-countdown-1/uni-countdown-1.vue"
	import tabbarItem from "../../components/tabbarItem/tabbar.vue"
	export default {
		components: {
			uniSwiperDot,
			uniCountdown,
			tabbarItem,
		},
		onLoad(option) {
			console.log(option)
			this.listId = option.group_id
			this.getListInfo()
			this.getBannerInfo()
		},
		onPullDownRefresh() {//下拉刷新
			this.getListInfo()
		},
		mounted(){
		},
		data() {
			return {
				autoplay: true,
				interval: 2000,
				duration: 500,
				banner:[],
				info: [{
						colorClass: 'uni-bg-red',
						url: '../../static/images/banner01.png',
					},
					{
						colorClass: 'uni-bg-green',
						url: '../../static/images/banner02.png',
					},
				],
				dotsStyles: {
						width: '6',
						backgroundColor: 'rgba(255, 255, 255, .9)',
						border: '1px rgba(255, 255, 255, .9) solid',
						selectedBackgroundColor: 'rgba(27, 133, 233, .9)',
						selectedBorder: '1px rgba(27, 133, 233, .9) solid',
				},
				modeIndex: -1,
				styleIndex: -1,
				current: 0,
				mode: 'round',
				seckill:[],
				gods:[],
				listId:null
			}

		},
		methods: {
		     change(e) {
		         this.current = e.detail.current;
		     },
			 // async getShopGoodsCommonList(){
			 // 	let[err,res] = await this.$http.post('/api/shop_goods/getShopGoodsCommonList');
			 // 	if(res.data.code === 200){
			 // 		this.seckill = res.data.data.data
			 // 	}
			 // },
			 async getListInfo(){
			 	let [err,res] = await this.$http.post("/api/shop_goods/getShopGoodsCommonList",{
			 		group_id:this.listId
			 	});
			 	console.log(res.data.data)
			 	if(res.data.code === 200){
			 		let godsbox = []
			 		godsbox = res.data.data.data
			 		this.gods = godsbox
			 		for(let v = 0; v < this.gods.length; v++){
			 			if(this.gods[v].shop_goods_freight_template.template_name === null){
			 				continue;
			 			}
			 			
			 		}
			 		this.loadingType = 0
			 		// this.scrollsList = res.data.data.data
			 	}
			 	uni.stopPullDownRefresh();//得到数据后停止下拉刷新
			 },
			 toDetail(id){
			 	uni.navigateTo({
			 		url:"/pages/buy/buy?product_id="+ id			
			 	})
			 },
			 async getBannerInfo(){
			 		// console.log(this.listId)
			 	let [err,res] = await this.$http.post("/api/shop_goods/findShopGoodsGroupInfo",{
			 		group_id:this.listId
			 	});
			 	if(res.data.code === 200){
			 		// console.log(res.data.data)
			 		this.banners = res.data.data.img
			 		this.info =  res.data.data.img
			 	}
			 },
		}
	}
</script>

<style>
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
	.seckill-shop{
		margi-bottom:100upx;
		height:100%;
	}
	.start-num{
		font-size: 24upx;
	}
	.start-do{
		font-size: 38upx;
		font-weight: bold;
	}
	.start{
		background: #ec373e;
		text-align: center;
		color: #FFFFFF;
		border-radius: 8upx;
		padding: 0 24upx;
		margin-left: 10upx;
		position: absolute;
		right: 20upx;
		bottom: 20upx;
	}
	.red-price{
		font-size: 32upx;
		color: #ec373e;
	}
	.gray-price{
		font-size: 28upx;
		color: #999999;
		text-decoration:line-through;
		margin-left: 34upx;
	}
	.real-price{
		width: 212upx;
		height: 100upx;
		margin-top: 60upx;
		/* position: absolute; */
		/* bottom: 20upx; */
	}
	.shop-price{
		display: flex;
		flex-direction: row;
		width: 215px;
	}
	.miao{
		width: 90upx;
		text-align: center;
	}
	.ss-man{
		font-size: 24upx;
		color: #ed373d;
		margin-top: 20upx;
		
	}
	.ss-man text{
		border: 1px solid #ed373d;
		background: #ffeded;
		border-radius: 6upx;
		padding: 6upx 8upx;
		font-size: 24upx;
	}
	.ss-biao{
		font-size: 24upx;
		color: #ed373d;
		margin: 22upx 0;
	}
	.s-shop-bt{
		display: flex;
		flex-direction: row;
	}
	.shop-countdown{
		background: #FFFFFF;
		border: 1px solid #ec373e;
		border-radius: 6upx;
	}
	.overboder{
		border: 1px solid #666666;
	}
	.seck-shop-time{
		background: #ec373e;
		color: #fff;
		font-size: 24upx;
		height: 44upx;
		line-height: 44upx;
		display: flex;
		flex-direction: row;
		border-radius: 6upx;
	}
	.over{
		background: #666666;
		border: 1px solid #666666;
	}
	.shop-name{
		font-size: 30upx;
		color: #333;
		width: 200upx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.s-shop-detail{
		padding: 24upx 18upx 0 18upx;
		width: 430upx;
		position: relative;
	}
	.shopimg{
		width: 280upx;
		height: 280upx;
		border-radius: 8upx 0 0 8upx;
	}
	.seckill-linebox{
		display: flex;
		flex-direction: row;
		border-radius: 8upx;
		margin: 18upx 20upx;
		background: #FFFFFF;
		
	}
	.seckill-shop{
		width: 100%;
		height: 100%;	
	}
	.countdown .uni-countdown__number{
		font-size: 50upx;
	}
	.s-time{
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 70upx;
		padding-left: 40upx;
		margin-top: 40upx;
		font-size: 34upx;
		text-align: center;
	}
	.swiper-boxs{
		width: 100%;
		height: 400upx;
	}
	.swiper-box {
		height: 400upx;
	}
	
	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: #eee;
		color: #fff;
	}
	
	.swiper-item image {
		width: 100%;
		height: 100%;
	}
	
</style>
