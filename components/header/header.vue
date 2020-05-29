<template>
	<view>
		<!-- 导航 -->
		<view class="header">
			<view class="header-search-left">
				<view class="search" @click="goto">
					<p>美味三文鱼降价</p>
				</view>
				<!-- <input class="search" type="text" style="padding-left: 62upx;" placeholder="美味三文鱼降价"> -->
				<image class="icon-search" src="../../static/images/APP-01_0023_sousuo.png" mode=""></image>
			</view>
			<view class="header-search-right" @click="earnings()">
				<img src="../../static/images/APP-01_0022_xinxi.png" alt="">
			</view>
		</view>
		<!-- 首页消息 --> 
		<view class="earnings-box" v-if="isshow" @tap.stop="conceal()">
			<view class="earnings">
				<view class="triangle"></view>
				<view class="triangele-bottom" @tap.stop="skip()">
					<!-- 收益列表 -->
					<view class="earnings-item" v-for="(item,index) in this.getMoney" :key="index">
						<view class="item-img">
							<img src="../../static/images/APP-qie3_0001_qd.png" alt="">
						</view>
						<view class="item-title">
							<view class="title-time">{{time}}</view>
							<view class="title-money">收益 <text>{{item.profit}}</text>元</view>						
						</view>
						<view class="item-redBall">
							<view class="redBall"></view>
						</view>
					</view>
							
					<view class="more">
						更多消息
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isshow:false,
				getMoney:[],
				time:null,
			};
		},
		created() {
			this.getItemMoney()
		},
		methods:{
			async getItemMoney(){
				const token = uni.getStorageSync('token')
				if (token === '' || token === null || token === undefined) {
					return
				}
				let [err,res] = await this.$http.post("/api/customer/getCustomerBalanceProfitRecordList",{});
				if(res.data.code === 200){
					this.getMoney = res.data.data.data.slice(0,4)
					for(const v in this.getMoney){
						this.time = this.getMoney[v].created_at.substring(10)
					}
				}
			},
			goto(){
				uni.navigateTo({
					url:"../../pages/index-search/index-search"
				})
			},
			conceal(){
				this.isshow=!this.isshow;
			},
			earnings(){
				if(!uni.getStorageSync('token')){
					
				}else{
					this.isshow=!this.isshow;
				}
				
			},
			skip(){
				uni.navigateTo({
				    url: '../../pages/earnings/earnings'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 导航样式
	.header{
		width:100%;
		height:90upx;
		background:#53aefc;
		position: relative;
		z-index: 5;
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
			margin-top: 24upx;
			display:flex;
			align-items:center;
			p{
				font-weight:600;
				color:#d0cecf;
				margin-left:60upx;
			}
	
		}
		.header-search-right{
			
		}
		.header-search-right{
			float: right;
			padding-right:28upx ;
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
	// 首页消息样式
	.earnings-box{
		width:100vw;
		height: 100vh;
		background:rgba(0,0,0,.5);
		position:fixed;
		z-index: 10;
		top:0;
		.earnings{
			width:260upx;
			height:415upx;
			float: right;
			margin:80upx 20upx 0 0;	
			.triangle{
					width:0;
				    height:0;
					border-right:12upx solid transparent;
					border-left:12upx solid transparent;
					border-bottom:24upx solid #ffffff;
					margin-left:216upx;
					// border-top-left-radius: 10upx;
					// border-top-right-radius: 10upx;
			}
			.triangele-bottom{
				width:260upx;
				height: 404upx;
				background: #ffffff;
				border-radius: 8upx;
				padding:0 10upx;
				position:relative;
				.earnings-item{
					width:100%;
					height: 85upx;
					border-bottom: 4upx solid #e2e2e2;
					display: flex;
					
					.item-img{
						width:72upx;
						height: 85upx;
						padding:20upx 16upx;
						img{
							width:100%;
							height: 100%;
						}
					}
					.item-title{
						width:152upx;
						height: 85upx;
						padding-top:25upx;
						font-size:18upx;
						color:#666666;
						line-height: 24upx;
						text{
							color:#f49d17;
							margin:0 8upx;
						}
					}
					.item-redBall{
						width:16upx;
						height: 85upx;
						.redBall{
							margin-top:38upx;
							width:14upx;
							height: 14upx;
							background:#ff2626;
							border-radius: 100%;
						}
					}
					
				}
			}
		}
	}
	.more{
		width:240upx;
		height: 57upx;
		line-height: 57upx;
		font-size: 18upx;
		color:#666666;
		text-align: center;
		position:absolute;
		bottom:0;
	}
	
</style>
