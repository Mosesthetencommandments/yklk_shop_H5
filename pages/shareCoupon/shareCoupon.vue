<template>
	<view>
		<view class="box">
			<view class="shareCoupon" v-for="(item,index) in couponList" :key="index">
				<view class="shareCoupon-left" v-if="item.coupon_type === 1 ">
					<view class="l-top">￥<text>{{item.offset_money}}</text></view>
					<view class="l-bottem">满{{item.require_total_pay}}使用</view>
				</view>
				<view class="shareCoupon-left" v-else>
					<view class="l-top">折<text>{{item.offset_percent / 10}}</text></view>
					<view class="l-bottem">满{{item.require_total_pay}}使用</view>
				</view>
				<view class="shareCoupon-right">
					<view class="r-top">
						<view class="zi">{{item.coupon_name}}</view>
						<view class="btn" @click="goShareQrCode(item.id)">当面分享</view>
					</view>
					<view class="r-bottom">
						{{item.start_at}}至{{item.end_at}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			try {
			    const value = uni.getStorageSync('distribution_level_id');
			    if (value) {
			        this.distribution_level_id = value
			    }
			} catch (e) {
			    // error
			}
			this.getShopCouponList()
		},
		onPullDownRefresh() { //下拉刷新
			this.getShopCouponList()
		},
		data() {
			return {
				distribution_level_id:null,
				couponList:[]
			};
		},
		methods:{
			async getShopCouponList(){
				let [err,res] = await this.$http.post("/api/coupon/getShopCouponList",{
					page:1,
					page_size:10,
					distribution_level_id:this.distribution_level_id
				})
				if(res.data.code == 200){
					let list = res.data.data
					for(let i = 0 ; i < list.length ; i++){
						this.couponList.push({
							id:list[i].id,
							coupon_type:list[i].coupon_type,
							start_at:list[i].start_at,
							end_at:list[i].end_at,
							offset_money:list[i].offset_money,
							require_total_pay:list[i].require_total_pay,
							coupon_name:list[i].coupon_name,
							offset_percent:list[i].offset_percent,
						})
					}
					// console.log(this.couponList)
					uni.stopPullDownRefresh();
				}
			},
			goShareQrCode(id){
				// console.log(id)
				uni.navigateTo({
					url:"../shareQrCode/shareQrCode?shop_coupon_id=" + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

.box{
	width:100%;
	height: 100%;
	padding: 20upx 20upx;
}
.shareCoupon{
	width:100%;
	height: 188upx;
	border-radius: 20upx;
	overflow: hidden;
	display: flex;
	overflow: hidden;
	justify-content: space-between;
	margin-bottom: 20upx;
	background: #ffffff;
	.shareCoupon-left{
		width:218upx;
		height: 188upx;
		background: url(../../static/images/APP-qie9_0000_share-di.png) no-repeat;
		background-size: 100% 100%;
		.l-top{
			width:100%;
			height: 122upx;
			text-align: center;
			font-size: 26upx;
			color:#ffffff;
			line-height: 122upx;
			text{
				font-size: 48upx;
				font-weight: 900;
			}
		}
		.l-bottem{
			width:100%;
			height: 60upx;
			color:#ffffff;
			text-align: center;
			font-size: 26upx;
		}
	}
	.shareCoupon-right{
		width:458upx;
		height: 188upx;
		.r-top{
			width:412upx;
			height: 127upx;
			border-bottom:1px dashed #dddddd ;
			display: flex;
			justify-content: space-between;
			.zi{
				width:258upx;
				height: 127upx;
				font-size: 24upx;
				color:#2097ff;
				padding-top:36upx;
			}
			.btn{
				width:146upx;
				height: 44upx;
				border:2upx solid #dddddd;
				border-radius: 40upx;
				font-size: 22upx;
				color: #666666;
				text-align: center;
				line-height:42upx ;
				margin-top:34upx;
			}
		}
		.r-bottom{
			width:100%;
			height: 59upx;
			font-size: 22upx;
			color: #888888;
			line-height: 59upx;
		}
	}
}
</style>
