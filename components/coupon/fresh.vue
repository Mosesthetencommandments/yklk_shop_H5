<template>
	<view class="coupon-fresh">
		<view class="coupon-fresh-box">
			<view class="coupon-fresh-title">
				<view class="coupon-fresh-title-left">
					<img src="../../static/images/APP-qie5_0008_fish.png" alt="">
					<text>生鲜优惠券</text>
				</view>
				<view class="coupon-fresh-title-right">
					<text>GO > > ></text>
				</view>		
			</view>
			<view class="coupon-fresh-card">
				<view class="coupon-fresh-card-left">
					<view class="coupon-fresh-card-left-img">
						<img src="../../static/images/coupon-fish_03.png" alt="">
					</view>
					<view class="coupon-fresh-card-left-text">
						<p><text>￥</text>20<text>满299减20</text></p>
						<p>满减优惠券</p>
						<p>2019.10.19 00:00 至 2019.11.18 23:59</p>
					</view>
				</view>
				<view class="coupon-fresh-card-right">
					<p>去使用</p>
				</view>
			</view>
			<view class="coupon-fill"></view>
			<view class="coupon-fresh-card">
				<view class="coupon-fresh-card-left">
					<view class="coupon-fresh-card-left-img">
						<img src="../../static/images/coupon-fish_03.png" alt="">
					</view>
					<view class="coupon-fresh-card-left-text">
						<p><text>￥</text>20<text>满299减20</text></p>
						<p>满减优惠券</p>
						<p>2019.10.19 00:00 至 2019.11.18 23:59</p>
					</view>
				</view>
				<view class="coupon-fresh-card-right">
					<p>去使用</p>
				</view>
			</view>
			<view class="coupon-big-fill"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.coupon-fresh{
	height:420upx;
	width:100%;
	.coupon-fresh-box{
		height:420upx;
		width:95%;
		margin-left:20upx;
		margi-right:20upx;
		border-radius:20upx 20upx 20upx 20upx;
		.coupon-fresh-title{
			display:flex;
			justify-content: space-between;
			height:69upx;
			background:#fff;
			border-radius:20upx 20upx 0 0;
			.coupon-fresh-title-left{
				line-height:0;
				margin-top:18upx;
				img{
					width:34upx;
					height:31upx;
					margin-left:23upx;
				}
				text{
					font-size:30upx;
					font-weight:600;
					color:#666666;
					margin-left:14upx;
				}
			}
			.coupon-fresh-title-right{
				font-weight:600;
				font-size:28upx;
				color:#ec373e;
				margin-top:18upx;
				margin-right:23upx;
			}
		}
		.coupon-fresh-card{
			width:100%;
			height:160upx;
			display:flex;
			background:#fff;
			.coupon-fresh-card-left{
				width:73.5%;
				height:160upx;
				background:#fff6ee;
				border-radius:20upx 20upx 20upx 20upx;
				margin-left:20upx;
				display:flex;
				.coupon-fresh-card-left-img{
					height:160upx;
					display:flex;
					align-items:center;
					img{
						width:120upx;
						height:120upx;
						margin-left:20upx;
					}
				}
				.coupon-fresh-card-left-text{
					p:first-child{
						margin-top:21upx;
						font-size:35upx;
						font-weight:500;
						color:#f49c17;
						text:first-child{
							font-size:23upx;
							color:#444444;
							margin-left:13upx;
							margin-right:3upx;
						}
						text:last-child{
							font-size:23upx;
							font-weight:500;
							margin-left:10upx;
						}
					}
					p:nth-child(2){
						font-size:23upx;
						font-weight:500;
						color:#9a9997;
						margin:0 0 0 13upx;
					}
					p:last-child{
						font-size:25upx;
						font-weight:700;
						margin:10upx 0 0 -30upx;;
						color:#9a9997;
						transform:scale(0.8,0.8);  
						white-space: nowrap;
					}
				}
			}
			.coupon-fresh-card-right{
				width:21.5%;
				height:160upx;
				background:#fff6ee;
				border-radius:20upx 20upx 20upx 20upx;
				margin-right:20upx;
				z-index:5;
				display:flex;
				justify-content:center;
				align-items: center;
				p{
					font-size:30upx;
					font-weight:600;
					color:#f49c17;
				}
			}
		}
		.coupon-fill{
			height:10upx;
			background:#fff;
		}
		.coupon-big-fill{
			height:22upx;
			background:#fff;
			border-radius:0upx 0upx 20upx 20upx;
		}
	}

}
</style>
