<template>
	<view>
		<view class="sellOut">
			<image src="../../static/images/APP-qie4_0000_空白.png" mode=""></image>
			<view class="">
				慢了一步！该商品已售罄！
			</view>
		</view>
		<view class="recommend">
			<view class="r-top">
				<view class="xian"></view>
				<view class="title">试试其他宝贝</view>
				<view class="xian"></view>
			</view>
			<view class="r-bottom">
				<view>为您推荐</view> 
			</view>
		</view>
		<view class="tabCenter-item" style="display: flex;">
			<view class="bjt" v-for="(item,index) in gods" :key="index"  @click="toDetail(item.id)">
				<view class="imgbox">
					<img :src="item.main_images_default" alt="">
				</view>
				<view class="po-box">
					<view class="tabCenter-bigtitle">{{item.goods_name}}</view>
					<view class="tabCenter-smalltitle">{{item.sold_count}}位用户已下单</view>
					<view class="tabCenter-number">{{item.price}} <text class="text">元 </text></view>
					<view class="tabCenter-icon">
						<img src="../../static/images/APP-01_0008_shop-car.png" alt="">
					</view>
				</view>										
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onPullDownRefresh() {//下拉刷新
			this.getListInfo()
		},
		onLoad() {
			this.getListInfo()
		},
		data() {
			return {
				gods:[]
			};
		},
		methods:{
			async getListInfo(){
				let [err,res] = await this.$http.post("/api/shop_goods/getShopGoodsCommonList");
				if(res.data.code == 200){
					this.gods = res.data.data.data
					console.log(this.gods)
					uni.stopPullDownRefresh();
				}
			},
			toDetail(id){
				uni.navigateTo({
					url:"/pages/buy/buy?product_id="+ id			
				})
			},
		}
		
	}
</script>

<style lang="scss">
.sellOut{
	width:100%;
	height: 400upx;
	background: #ffffff;
	text-align: center;
	padding-top:103upx;
	image{
		width:100upx;
		height: 100upx;
	}
	font-size: 26upx;
	color: #888888;
	line-height: 50upx;
}
.recommend{
	width:100%;
	height: 100upx;
	// background: #007AFF;
	padding: 20upx 56upx;
	
	.r-top{
		width:100%;
		height: 36upx;
		// background: #2C405A;
		display: flex;
		justify-content: space-between;
		.xian{
			width:220upx;
			height: 1px;
			background: #666666;
			margin-top:10upx;
		}
		.title{
			width: 208upx;
			height: 36upx;
			font-size: 26upx;
			color: #666666;
			text-align: center;
			line-height: 20upx;
		}
	}
	.r-bottom{
		width:100upx;
		height: 30upx;
		margin:0 auto;
		view{
			width:110upx;
			height: 30upx;
			background: #369eff;
			border-radius: 20upx;
			font-size: 20upx;
			color:#ffffff;
			text-align: center;
			line-height: 30upx;
		}
	}
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
	margin-bottom:100upx;
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
		.list-title{
			width:100%;
			height: 62upx;
			line-height: 62upx;
			font-size: 24upx;
			color:#333333;
			padding:0 19upx;
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

.tabCenter-item{
		width:100%;
		height:100%;
		// background:red;
		display: flex;
		justify-content:space-between;
		padding:0 20upx;
		flex-wrap: wrap;
		margin-bottom:100upx;
		::-webkit-scrollbar {
		    width: 0px;
		}
		::-webkit-scrollbar {
		    display: none;
		}
		.bjt{
			width:334upx;
			height:474upx;
			background:white;
			border-radius:8upx;
			
			position:relative;
			margin-bottom:20upx;
			.imgbox{
				widht:334upx;
				height:334upx;
				img{
					width:100%;
					height:100%;
				}
			}
			
		}
		.tabCenter-bigtitle{
			font-size:28upx;
			color:#464545;
			line-height: 28upx;
			width:100%;
			height: 28upx;
			font-weight:600;
			text-overflow:ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
		.tabCenter-smalltitle{
			font-size:20upx;
			color:#53aefc;
			line-height: 26upx;
			width:100%;
			height:26upx; 
			margin-top:4upx;
		}
		.tabCenter-number{
			color:#ff0b0b;
			font-size:30upx;
			margin-top:16upx;
			.text{
				margin-left: 14upx;
				font-size:20upx;
			}
		}
		.tabCenter-icon{
			width:47upx;
			height: 47upx;
			position: absolute;
			border-radius: 50%;
			background:#53aefc;
			left:250upx;
			bottom:0upx;
			img{
				width:30upx;
				height: 28upx;
				text-align: center;
				line-height: 30upx;
				display: block;
				margin:10upx 0 0 8upx;
			}
		}
	}
	.po-box{
		position:absolute;
		margin-top:20upx;
		margin-left:20upx;
		width:308upx;
	}
</style>
