<template>
	<view>
		<view class="codeBox">
			<view class="sharebox-view1" v-if="isload">
				<img src="../../static/images/loading.gif" alt="" >
			</view>
			<view class="imgbox" v-else>
				<image :src="img" mode=""></image>
			</view>
		</view>
		<view class="btn" >
			<view @click="popUp">保存图片</view>
		</view>
		<!-- 遮罩层 -->
		<view class="mask" v-if="isShow" @click.stop="isShow = false">
			<view class="shareImg-box" @click.stop="isShow = true">
				<image :src="img" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		onLoad(option) {
			if(option){
				this.shop_coupon_id = option.shop_coupon_id
				this.getShopCouponList()
			}
		},
		onPullDownRefresh() {//下拉刷新
			this.getShopCouponList()
		},
		data() {
			return {
				shop_coupon_id:null,
				img:null,
				isShow:false,
				isload:true
			}
		},
		onPullDownRefresh() {//下拉刷新
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			async getShopCouponList(){
				let [err,res] = await this.$http.post("/api/coupon/shareShopCouponCode",{
					shop_coupon_url: config.webUrl1+'/#/pages/QRcode/QRcode',
					type:1,
					shop_coupon_id:this.shop_coupon_id
				});
				if(res.data.code == 200){
					let list = res.data.data
					this.img = list
					// console.log(this.img)
					this.isload = false
					uni.stopPullDownRefresh();
				}
			},
			popUp(){
				this.isShow = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sharebox-view1{
		width: 100%;
		height:760upx;
		background:#ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		img{
			width:40%;
		}
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
	.mask{
		width:100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
		padding: 140upx 60upx;
		position: fixed;
		top:0;
		left: 0;
		z-index: 10;
		.shareImg-box{
			width:100%;
			height: 722upx;
			background: #ffffff;
			padding: 20upx 20upx 20upx 10upx;
			image{
				width:100%;
				height: 100%;
			}
		}
	}
.codeBox{
	width:100%;
	height: 672upx;
	margin-top:30upx;
	padding:0 80upx 0 56upx;
	.imgbox{
		width:584;
		height: 672upx;
		image{
			width:100%;
			height: 100%;
		}
	}
}
.btn{
	width:100%;
	height:170upx;
	padding-top: 60upx;
	view{
		width:276upx;
		height: 76upx;
		border-radius: 10upx;
		border:2upx solid #d6d7db;
		background: #ffffff;
		text-align: center;
		line-height: 76upx;
		margin:0 auto;
	}
}
</style>
