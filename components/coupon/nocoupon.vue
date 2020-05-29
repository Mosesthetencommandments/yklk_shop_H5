<template>
	<view class="no-coupon">
		<view class="no-coupon-big-fill"></view>
		<view class="no-coupon-big-content">
			<img src="../../static/images/nocoupon_03.png" alt="">
			<p>暂时还没有优惠券</p>
		</view>
	</view>
	
</template>

<script>
	
	
</script>

<style lang="scss" scoped>
	.no-coupon{
		height:355upx;
		.no-coupon-big-fill{
			height:200upx;
		}
		.no-coupon-big-content{
			width:100%;
			height:155upx;
			display:flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			img{
				width:100upx;
				height:100upx;
			}
			p{
				margin-top:28upx;
				color:#989898;
			}
		}
	}

	
</style>
