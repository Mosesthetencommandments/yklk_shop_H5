<template>
	<view class="banner loading">
		<view class="swiperbox">
			<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
			    <swiper class="swiper-box" @change="change">
			        <swiper-item v-for="(item ,index) in banners" :key="item.id" @click="gotoUrl(item)">
			            <view class="swiper-item">
			                {{item.content}}
							<!-- <image :src="item.img_url" mode=""></image> -->
							<img :src="item.img_url" alt="">
			            </view>
			        </swiper-item>
			    </swiper>
			</uni-swiper-dot>
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from "../uni-swiper-dot/uni-swiper-dot.vue"
	export default {
		components:{
			uniSwiperDot
		},
		
		data() {
			return {
				info: [

				],
				current: 0,
				mode: 'round',
				banners:[],
			}
		},
		computed: {
		 },
		methods: {
			change(e) {
				this.current = e.detail.current;
			},
			async getbanners(){
				let [err,res] = await this.$http.post("/api/shop/getShopBannerList");
				if(res.data.code === 200){
					this.banners = res.data.data
					this.info = res.data.data
				}
			},
			gotoUrl(item){
				uni.navigateTo({
					url:item.link
				})
			},
		},
		mounted(){
			this.getbanners()
		}	
	}
</script>
	
<style lang="scss" scoped>
	img{
		width:100%;
		height: 400upx;
	}
	.swiper{
		height: 400upx;
	}
	.swiper-item{
		width:100%;
		height: 400upx;
		background: #007AFF;
	}
	.loading{
		background: url(../../static/images/loading.gif) no-repeat;
		background-size: 140upx 140upx;
		background-position: 300upx;
	}
	.swiperbox{
		width:100%;
		height: 400upx;
	}
	.swiper-box{
		width:100%;
		height:400upx;
	}
</style>
