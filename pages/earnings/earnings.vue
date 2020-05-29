<template>
	<view>
		<view class="revenue-box" v-for="(item,index) in getMoney">
			<view class="revenue">
				<view class="revenue-title">
					<view class="title-img">
						<image src="../../static/images/APP-qie3_0000_笑脸.png" mode=""></image>
					</view>
					<view class="title-center">您有一笔推荐收益</view>
					<view class="time">{{time[index]}}</view>
					<view class="redBall"></view>
				</view>
				<view class="revenue-money">
					￥<text>{{item.profit}}</text>
				</view>
				<view class="revenue-message" v-if="item.from_customer_shop === null || item.from_customer_shop === undefined || item.from_customer_shop === '' ">
					<text>您</text> 消费{{item.goods_name}}X{{item.number}}，您获得收益{{item.profit}}元
				</view>
				<view class="revenue-message" v-else-if="item.from_customer_shop.user_nickname === null || item.from_customer_shop.user_nickname === undefined || item.from_customer_shop.user_nickname === '' ">
				<!-- 	您的客户 <text>{{item.from_customer_shop.phone}}</text> 在{{time[index]}}消费{{item.goods_title}}X{{item.number}}，您获得收益{{item.profit}}元。 -->
					您的客户 <text>{{item.from_customer_shop.phone}}</text> 消费{{item.goods_name}}X{{item.number}}，您获得收益{{item.profit}}元。
				</view>
				<view class="revenue-message" v-else>
					<!-- 您的客户 <text>{{item.from_customer_shop.user_nickname}} ({{item.from_customer_shop.phone}})</text> 在{{time[index]}}消费{{item.goods_title}}X{{item.number}}，您获得收益{{item.profit}}元。 -->
					您的客户 <text>{{item.from_customer_shop.user_nickname}} ({{item.from_customer_shop.phone}})</text>消费{{item.goods_name}}X{{item.number}}，您获得收益{{item.profit}}元。
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onPullDownRefresh() {//下拉刷新
			this.getItemMoney()
		},
		data() {
			return {
				getMoney:[],
				time:[],
				phone:[],
			};
		},
		methods:{
			async getItemMoney(){
				let [err,res] = await this.$http.post("/api/customer/getCustomerBalanceProfitRecordList");
				if(res.data.code === 200){
					this.getMoney = res.data.data.data
					console.log(this.getMoney)
					if(this.getMoney.length === 0){
						uni.showToast({
							title:"暂无收益信息",
							duration:1000,
							icon:"none"
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1,
							})
						},1100)
						return 
					}
					for(const v in this.getMoney){
						// this.time.push(this.getMoney[v].created_at.substring(10))
						this.time.push(this.getMoney[v].created_at)
						
					}
					for(let i = 0 ; i < this.getMoney.length; i++){
						let phone = this.getMoney[i].from_customer_shop.phone
						let reg = /^(\d{3})\d*(\d{4})$/;
						this.getMoney[i].from_customer_shop.phone = phone.replace(reg,'$1****$2')
					}
					
					uni.stopPullDownRefresh();
				}
			}
		},
		onLoad() {
			this.getItemMoney()
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #f7f7f7;
	}
.revenue-box{
	width:100%;
	height: 100%;
	padding:0 20upx;
	margin-top:20upx;
	.revenue{
		width:100%;
		height: 260upx;
		background: #ffffff;
		border-radius: 10upx;
		// overflow: hidden;
		margin-bottom: 25upx;
		box-shadow: 0 0 10upx #d6d6d6;
		.revenue-title{
			width:100%;
			height: 76upx;
			background: #f2f2f2;
			border-bottom:2px solid #e1e1e1;
			display: flex;
			justify-content: space-between;
			position:relative;
			padding:0 20upx;
			view{
				font-size:20upx;
				line-height: 76upx;
				color:#666666;
			}
			.title-img{
				width:76upx;
				height: 76upx;
				line-height: 76upx;
				image{
					width:70%;
					height:70%;
					margin-top:10upx;
				}
			}
			.title-center{
				width:204upx;
				margin-left: -120upx;
			}
			.redBall{
				width:24upx;
				height: 24upx;
				background: #ff2626;
				border-radius: 100%;
				position:absolute;
				right:-10upx;
				top:-10upx;
			}
		}
		.revenue-money{
			width:100%;
			height: 88upx;
			padding:0 20upx;
			font-size:28upx;
			font-weight: 500;
			color:#666666;
			line-height: 88upx;
			text{
				color:#f49c17;
			}
		}
		.revenue-message{
			width:100%;
			height: 94upx;
			font-size:20upx;
			color:#666666;
			padding:0 20upx;
			line-height: 32upx;
			text{
				color:#f49c17;
				padding:0 8upx;
			}
		}
	}
}
</style>
