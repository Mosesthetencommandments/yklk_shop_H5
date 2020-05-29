<template>
	<view>
		<!-- 顶部 -->
		<view class="header">
			<image src="../../static/images/header-banner_02.png" mode=""></image>
		</view>
		<!-- 标题 -->
		<view class="xs-box">
			<view class="xian"></view>
			<view class="zi">
				全场优惠券
			</view>
			<view class="xian"></view>
		</view>
		<!-- 优惠券 -->
		<view class="coupons-box" >
			<view v-for="(item,index) in fullReduction" :key="index">
				<!-- 满减 -->
				<view class="coupons" v-if="item.coupon_type === 1 ">
					<view class="red-packet-ticket-one-content-left">
						<p><text>￥</text>{{item.offset_money}}</p>
					</view>
					<view class="red-packet-ticket-one-content-right">
						<p>满减红包</p>
						<p>满{{item.require_total_pay}}可用</p>
						<view class="btnBox">
							<view @click="receiveShopCustomerCoupon(item)" :class="[item.aaaa === true? 'active' :'']">{{!item.aaaa ? '':'已'}}领取</view>
						</view>
					</view>
				</view>
				<!-- 折扣 -->
				<view class="coupons" v-else>
					<view class="red-packet-ticket-one-content-left">
						<p><text style="font-size: 24upx;">折</text>{{item.offset_percent / 10}}</p>
					</view>
					<view class="red-packet-ticket-one-content-right">
						<p>满减红包</p>
						<p>满{{item.require_total_pay}}可用</p>
						<view class="btnBox">
							<view @click.stop="receiveShopCustomerCoupon(item)" :class="[item.aaaa === true? 'active' :'']">{{!item.aaaa ? '':'已'}}领取</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		onPullDownRefresh() {//下拉刷新
			this.getShopCouponList()
		},
		onLoad(optaion) {
			console.log(optaion.customer_id)
			
			uni.setStorageSync('customer_id',optaion.customer_id);
			if(optaion.customer_id){
				this.getBecomeSilent()
			}
			this.getShopCouponList()
		},
		data() {
			return {
				fullReduction:[],
				id:null,
				url:null
			};
		},
		methods:{
			async getShopCouponList(){//获取优惠券列表
				let [err,res] = await this.$http.post("/api/coupon/getShopCouponList",{
					page:1,
					page_size:10,
					only_new_customer:2//通用券
				});
				if(res.data.code !== 200){
					return
				}
				this.fullReduction = []
				let list = res.data.data
				console.log(list)
				for(let i = 0 ; i < list.length; i++){
					this.fullReduction.push({
						id:list[i].id,
						coupon_type:list[i].coupon_type,
						offset_money:list[i].offset_money,
						require_total_pay:list[i].require_total_pay,
						offset_percent:list[i].offset_percent,
						limit_goods:list[i].limit_goods,
						aaaa : false,
					})
				}
				uni.stopPullDownRefresh();
			},
			async receiveShopCustomerCoupon(item){
				this.id = item.id
				let [err,res] = await this.$http.post("/api/coupon/receiveShopCustomerCoupon",{shop_coupon_id:this.id});
				if(res.data.code === 200){
					let coupon_id = res.data.data.coupon_id
					if(coupon_id === this.id){
						if (item.coupon_type === 1) {
							this.successReceiveCouponType = 1
							this.successReceiveMessage = item.offset_money
						} else {
							this.successReceiveCouponType = 2
							this.successReceiveMessage = item.offset_percent / 10
						}
						item.aaaa = true
						uni.showToast({
						    title: '领取成功',
						    duration: 1000
						});
					}
				}else{
					item.aaaa = false
					
				}
			},
			// 静默登录，可以获取code
			getBecomeSilent(){
				const openid = uni.getStorageSync('wx_open_id');
				if (openid) {
					return
				}
				const AppId = this.appId
				const code = this.getUrlParam('code')
				const local = window.location.href
				if(code === undefined || code === null || code === ''){
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ config.appid +'&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
				}else{
					this.code = code
					this.getOpenId(code)
				}
				
			},
			//获取code的方法 
			getUrlParam(name){
				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				var r = window.location.search.substr(1).match(reg)
				if(r != null) return unescape(r[2]) 
				return null
			},
			async getOpenId (code) {
				console.log('starttttttttttttt')// 通过code获取 openId等用户信息
				let [err,res] = await this.$http.post('/api/customer/getCustomerWxOpenId',{code:code})
				console.log(res)
				if (res.data.code === 200) {
					let datas = res.data.data.openid
					this.openid = datas
					// this.$cookieStore.setCookie('openid',"123455")
					uni.setStorageSync("wx_open_id",this.openid)//同步本地存储
					console.log(this.openid)
					return
				}
			},
			
		}
	}
</script>

<style lang="scss">
	page{
		background: #ffffff;
	}
.header{
	width:100%;
	height: 310upx;
	image{
		width:100%;
		height: 100%;
	}
}
.xs-box{
	width:100%;
	height: 74upx;
	padding-top: 23upx;
	display: flex;
	justify-content: center;
	line-height: 74upx;
	.xian{
		width:95upx;
		height: 2px;
		background: #eeeeee;
		line-height: 74upx;
		margin-top: 17upx;
	}
	.zi{
		width:150upx;
		height: 36upx;
		background: #eeeeee;
		border-radius: 20upx;
		font-size: 24upx;
		color:#666666;
		text-align: center;
		line-height:36upx ;
	}
}
.coupons-box{
	width:100%;
	height: 100%;
	padding: 0 40upx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.coupons{
		width:320upx;
		height: 162upx;
		background: url(../../static/images/APP-qie5_0009_quan-di.png) no-repeat;
		background-size: 312upx 162upx;
		display: flex;
		margin-bottom:20upx;
	}
}
.red-packet-ticket-one-content-left{
	margin-left:26upx;
	margin-top:36upx;
	font-size:70upx;
	color:#b88240;
	font-weight: 900;
	text{
		font-size:36upx;
	}
}
.red-packet-ticket-one-content-right{
	margin-top:48upx;
	margin-left:15upx;
	p{
		line-height: 36upx;
	}
	p:first-child{
		font-size:30upx;
		font-weight:900
	}
	p:nth-child(2){
		font-size:24upx;
		font-weight:900
	}
	.btnBox{
		width:140upx;
		height:40upx ;
		position:relative;
		view{
			width:100upx;
			height:34upx;
			position: absolute;
			top:4upx;
			left:8upx;
			border-radius:40upx;
			line-height:34upx;
			font-size:20upx;
			background:#fff9ee;
			text-align: center;
		}
	}
	
	.active{
		cursor: not-allowed;
		pointer-events:none;
		background:red;
		color:#bd894a;
		border-radius:20upx;
	}
}
.goods-box{
	width:100%;
	height: 100%;
	padding:0 40upx;
}
.coupon-fresh-card{
	width:100%;
	height:160upx;
	margin-bottom: 14upx;
	background:#eeeeee;
	border-radius: 16upx;
	padding:20upx 22upx;
	display: flex;
	.coupon-fresh-card-left{
		width:524upx;
		height:160upx;
		display:flex;
		.coupon-fresh-card-left-img{
			width:120upx;
			height: 120upx;
			border-radius: 14upx;
			overflow: hidden;
			img{
				width:100%;
				height:100%;
			}
		}
		.coupon-fresh-card-left-text{
			width:400upx;
			height:120upx;
			padding:0 14upx;
			padding-top:14upx;
			p:first-child{
				font-size:22upx;
				color:#666666;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			p:nth-child(2){
				text:first-child{
					font-size: 20upx;
					color:#454545;
					margin-right: 4upx;
				}
				text:nth-child(2){
					font-size: 20upx;
					color:#f49c17;
					margin-left:6upx;

				}
				font-size:34upx;
				color:#f49c17;
			}
			p:last-child{
			font-size:25upx;
			margin-top:-14upx;
			margin-left: -40upx;
			color:#9a9997;
			transform:scale(0.8,0.8);  
			white-space: nowrap;
			}
		}
	}
	.coupon-fresh-card-right{
		width:94upx;
		height:120upx;
		.btn{
			background: #2a3e45;
			color:#ffffff;
			width:94upx;
			height: 40upx;
			font-size: 24upx;
			border-radius: 20upx;
			text-align: center;
			line-height: 40upx;
			margin-top:38upx;
		}
	}
}


</style>
