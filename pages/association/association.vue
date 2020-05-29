<template>
	<view>
		<view class="association-box">
			<view class="peopleNumber">
				 {{this.people}}人（每小时更新一次）
			</view>
			<!-- 搜索 -->
			<view class="sou">
				<view class="header">
					<view class="header-search-left">
						<input class="search" type="text" style="padding-left: 70upx;" placeholder="输入会员ID、手机号">
						<image class="icon-search" src="../../static/images/APP-01_0023_sousuo.png" mode=""></image>
					</view>
				</view>
				<view class="report">
					<view class="r-box" @click="gotomyGloup">
						<image src="../../static/images/APP-qie6_0000_she-baogao.png" mode=""></image>
						<view class="r-title">
							社群报告
						</view>
					</view>
				</view>
			</view>
			<view class="mine">
				<view class="shopkeeper">
					我的店主
				</view>
			</view>
		</view>
		<!-- 下方卡片 -->
		<view class="card-box">
			<view class="card" v-for="(item,index) in usersGroup" :key="index">
				<view class="card-s">
					<view class="kuang-box">
						<view class="img-box">
							<view class="round">
								<img :src="item.user_headimgurl" alt="">
							</view>
						</view>		
						<view class="vip">{{item.shop_distribution_level.distribution_level_name}}</view>
					</view>
					<view class="phone-box">
						<view class="phone-title-box">
							<view class="phone-title">{{phone[index]}}</view>
							<image src="../../static/images/APP-qie6_0002_she-2.png" mode=""></image>
						</view>
						<view class="recommended">{{idcode[index]}}</view>
					</view>
					<view class="referrer">
						<view class="zhuan">专</view>
						<view class="people">
							推荐人：{{item.customer_shop_pid.user_nickname}}
						</view>
					</view>
				</view>
				<view class="card-x">
					<view>TA的店主：{{item.team_number}}人</view><view class="time">入住时间：{{item.created_at}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'//下拉加载
	export default {
		onPullDownRefresh() {//下拉刷新
			this.getUsersGroup()

		},
		onReachBottom() {
			//触底的时候请求数据，即为上拉加载更多
			this.getUsersGroup()
		},
		data() {
			return {
				usersGroup:[],
				phone:[],
				idcode:[],
				getMore:true,
				people:0,
				getInfo:{
					page:1,
					page_size:8,
				},
				token:null,
			}
		},
		methods:{
			async getUsersGroup(){
				let arr = []
				if(this.getMore === false){
					return false
				}
				let [err,res] = await this.$http.post("/api/customer/getCustomerShopSons",this.getInfo)
				if(res.data.code === 200){
					if(res.data.data.current_page === res.data.data.last_page){
						this.getMore = false
					}
					arr = res.data.data.data
					this.getInfo.page++
					this.usersGroup = this.usersGroup.concat(arr)
					// console.log(res.data)
					// for(let a = 0; a < this.usersGroup.length;a++){
					// 	this.people  = a + 1
					// }
					// this.people = res.data.data.total
					this.usersGroup.forEach(item =>{
						this.phone.push(item.phone.substr(0, 3) + '****' + item.phone.substr(7))
						this.idcode.push(item.invite_code.substr(0,2) + '**'+ item.invite_code.substr(4))
					})
				}
				uni.stopPullDownRefresh();
			},
			async gotomyGloup(){
				let [err,res] = await this.$http.post("/api/customer/updateCustomerShopTeamNumber");
				if(res.data.code === 200){
					let [err,res] = await this.$http.post("/api/customer/upgradeCustomerDistributionLevelPersonalCenter");
					if(res.data.code === 200){
						uni.navigateTo({
							url:"../myGloup/myGloup"
						})
					}
					uni.stopPullDownRefresh();
				}
			},
			async getTeamNumber(){
				let [err,res] = await this.$http.post("/api/customer/getCustomerInfo",{token:this.token})
				if(res.data.code === 200){
					this.people = res.data.data.team_number - 1
					// console.log(this.people)
					console.log(res.data.data)
				}
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.getUsersGroup()
			this.getTeamNumber()
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #eeeeee;
	}
.association-box{
	width:100%;
	height: 100%;
	background: #09BB07;
}
.peopleNumber{
	widht:100%;
	height: 90upx;
	background:#ffffff;
	line-height: 90upx;
	font-size: 24upx;
	color:#cdcbcb;
	text-align: center;
}
.sou{
	width:100%;
	height: 65upx;
	background: #ffffff;
	padding:0 20upx;
	display: flex;
	// 导航样式
	.header{
		width:85%;
		height:65upx;
		position: relative;
		z-index: 5;
		.search{
			width:580upx;
			height: 56upx;
			background: #f6f6f6;
			border-radius: 30upx;
			font-size: 24upx;	
			
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
			left:26upx;
			top:16upx;
		}
	}
	.report{
		width:15%;
		height: 65upx;
		.r-box{
			width:68upx;
			height: 65upx;
			margin-left: 42upx;
			image{
				width:44upx;
				height: 38upx;
				text-align: center;
				display: block;
				margin-left: 10upx;
			}
			.r-title{
				font-size: 18upx;
				color:#666666;
				line-height: 30upx;
			}
		}
	}
}
.mine{
	width:100%;
	height: 75upx;
	background: #ffffff;
	display: flex;
	justify-content: center;
	.shopkeeper{
		width:110upx;
		height: 75upx;
		border-bottom: 8upx solid #369eff;
		font-size: 20upx;
		line-height: 71upx;
		text-align: center;
	}
}
//下方卡片
.card-box{
	width:100%;
	height:100%;
	padding: 20upx;
	.card{
		width:100%;
		height: 260upx;
		background: #ffffff;
		border-radius: 24upx;
		overflow: hidden;
		margin-bottom: 20upx;
	}
	.card-s{
		width:100%;
		height: 156upx;
		padding-right: 28upx;
		display: flex;
		.kuang-box{
			width:156upx;
			height: 156upx;
			overflow: hidden;
			position:relative;
			.img-box{
				width:102upx;
				height: 114upx;
				background: url(../../static/images/APP-qie6_0005_head-ring.png) no-repeat;
				background-size: 100% 100%;
				margin:21upx;
				overflow: hidden;
				padding-top: 19upx;
				padding-left: 7upx;
				.round{
					width:89upx;
					height: 89upx;
					border-radius: 100%;
					overflow:hidden;
					background: #ffffff;
					img{
						width:100%;
						height:100%;
					}
				}
			}
			.vip{
				width:78upx;
				height: 28upx;
				background:#3d3d3d;
				position: absolute;
				top:126upx;
				left: 35upx;
				border-radius: 16upx;
				font-size: 20upx;
				text-align: center;
				font-weight: 900;
				color:#ffe3a0;
				line-height: 30upx;
			}
		}
		.phone-box{
			width:382upx;
			height: 156upx;
			.phone-title-box{
				display: flex;
				margin-top:60upx;
				.phone-title{
					font-size: 20upx;
					color:#666666;
					line-height: 30upx;
				}
				image{
					margin:0 10upx;
					width:30upx;
					height: 30upx;
				}
			}
			.recommended{
				font-size: 20upx;
				color:#999999;
			}
		}
		.referrer{
			width:142upx;
			height: 156upx;
			.zhuan{
				width:28upx;
				height: 26upx;
				background-color: #ffc101;
				color:#ffffff;
				font-size: 20upx;
				line-height: 26upx;
				text-align: center;
				border-radius: 8upx;
				margin-top:63upx;
				margin-left:114upx;
			}
			.people{
				font-size: 20upx;
				color:#999999;
				text-align: right;
				line-height: 30upx;
			}
		}
	}
	.card-x{
		width:100%;
		height: 104upx;
		padding: 0 28upx;
		display: flex;
		view{
			color:#999999;
			font-size: 24upx;
			line-height: 104upx;
		}
		.time{
			margin-left: 80upx;
		}
	}
}
</style>
