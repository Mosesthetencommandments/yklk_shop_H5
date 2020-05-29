<template>
	
	<view>
		<view v-if="isSShow">
			<!-- 我的信息 -->
			<view class="mine-box">
				<view class="mine">
					<view class="mine-top">
						<view class="mine-top-l">
							<view class="kuang" >
								<image :src="user_headimgurl" mode=""></image>
							</view>
						</view>
						<view class="mine-top-c">
							<view>{{user_nickname}}</view>
							<image src="../../static/images/son_0014_wo-xiugai.png" mode="" @click="ceshi"></image>
						</view>
						<view class="mine-top-r"></view>
					</view>
					<view class="mine-buttom">
						<view class="power" @click="gotocoupon">
							<view class="power-s">
								<image src="../../static/images/son_0011_wo-1.png" mode=""></image>
							</view>
							<view class="power-x">优惠券</view>
						</view>
						<view class="power" @click="goIntegralCenter">
							<view class="power-c-s">
								<image src="../../static/images/son_0013_wo-2.png" mode=""></image>
							</view>
							<view class="power-x">积分</view>
						</view>
						<view class="power">
							<view class="power-r-s" @click="gotovideo">
								<image src="../../static/images/son_0012_wo-3.png" mode=""></image>
							</view>
							<view class="power-x">种草视频</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 订单 -->
			<view class="orderForm-box">
				<view class="orderForm">
					<view class="orderForm-title">我的订单</view>
					<view class="item-box">
						<view class="item" v-for="item in powers" :key="item.id" @click="gotoorderlist(item.id)">
							<view class="item-s">
								<view class="img-box">
									<img :src="item.image" alt="">
								</view>
							</view>
							<view class="item-x">
								<text>{{item.title}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		
			<!-- 金贝银贝 -->
			<view class="kimbe-box">
				<view class="kimbe">
					<view class="item">
						<view class="">金贝余额</view>
						<view class=""> <text>{{balance_gold}}</text> 个</view>
					</view>
					<view class="item1">
						<view class="">银贝余额</view>
						<view class=""> <text>{{balance_silver}}</text> 个</view>
					</view>
				</view>
			</view>
		</view>
		<view class="wdlmine" v-else>
			<!-- 我的信息 -->
			<view class="mine-box">
				<view class="mine">
					<view class="mine-top">
						<view class="mine-top-l">
							<view class="kuang" >
								<image src="../../static/images/APP-01_0007_DI-1.png" mode=""></image>
							</view>
						</view>
						<view class="mine-top-c">
							<view @click="gologin">请登录</view>
						</view>
						<view class="mine-top-r"></view>
					</view>
					<view class="mine-buttom">
						<view class="power">
							<view class="power-s">
								<image src="../../static/images/son_0011_wo-1.png" mode=""></image>
							</view>
							<view class="power-x">优惠券</view>
						</view>
						<view class="power">
							<view class="power-c-s" >
								<image src="../../static/images/son_0013_wo-2.png" mode=""></image>
							</view>
							<view class="power-x">积分</view>
						</view>
						<view class="power">
							<view class="power-r-s">
								<image src="../../static/images/son_0012_wo-3.png" mode=""></image>
							</view>
							<view class="power-x">种草视频</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 订单 -->
			<view class="orderForm-box">
				<view class="orderForm">
					<view class="orderForm-title">我的订单</view>
					<view class="item-box">
						<view class="item" v-for="item in powers" :key="item.id"  @click="gotoorderlist(item.id)">
							<view class="item-s">
								<view class="img-box">
									<img :src="item.image" alt="">
								</view>
							</view>
							<view class="item-x">
								<text>{{item.title}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<tabbarItem></tabbarItem>
	</view>
</template>

<script>
	import tabbarItem from "../../components/tabbarItem/tabbar.vue"
	import config from '../../common/config.js';
	export default {
		components:{
			tabbarItem
		},
		onPullDownRefresh() {//下拉刷新
			this.getCustomerMoneyInfo()
			this.getBecomeSilent()
			this.getname()
		},
		onShow(){
			this.getname1()
		},
		onLoad() {
			this.getCustomerMoneyInfo()
			// this.getBecomeSilent()
			this.d_status = this.getQueryVariable("state")
			this.getBecomeSilent()
			// if(this.d_status == 2){
			// 	this.NonSilentLogin() 
			// }
		},
		data() {
			return {
				code:"12",
				isSShow:false,
				name:'',
				user_headimgurl:"",
				openid:'',
				powers:[
					{id:0,image:"../../static/images/son_0010_wo-5.png",title:"待付款"},
					{id:1,image:"../../static/images/son_0009_wo-6.png",title:"待发货"},
					{id:2,image:"../../static/images/son_0008_wo-7.png",title:"待收货"},
					{id:3,image:"../../static/images/son_0007_wo-8.png",title:"已完成"}
				],
				balance_gold:null,
				balance_silver:null,
				d_status:null,
				s_customer_id:null
			};
		},
		methods:{
			// ceshi2(){
			// 	uni.navigateTo({
			// 		url:'/pages/sf/sf'
			// 	})
			// },
			ceshi(){
				uni.navigateTo({
					url:"/pages/useredit/useredit"
				})
				// const local01 = config.webUrl1 +'/#/pages/useredit/useredit'
				// window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ config.appid +'&redirect_uri=' + encodeURIComponent(local01) + '&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
			},
			gotocoupon(){
				uni.navigateTo({
					url:"/pages/coupon/coupon"
				})
			},
			gotointegralcenter(){
				uni.navigateTo({
					url:"/pages/integral-center/integral-center"
				})
			},
			gotovideo(){
				uni.navigateTo({
					url:"/pages/share/video"
				})
			},
			gotoorderlist(id){
				uni.navigateTo({
					url:"/pages/orderList/orderList?id="+ id
				})
			},
			async getname1(){
				let token = uni.getStorageSync("token")
				if (token === '' || token === undefined || token === null) {
					const openid = uni.getStorageSync('wx_open_id');
					if (openid !== null && openid !== '' && openid !== undefined) {
						let [err1, resp1] = await uni.request({
							url:config.webUrl+"/api/customer/wxLogin",
							data: { 'wx_open_id': openid },
							methods:'POST',
							header:{
								'shop':"1"
							},
						})
						if(resp1.data.data.success_message === "success") {
							token = resp1.data.data.token
							uni.setStorageSync('token', token)
						} else {
							this.isSShow = false
							return
						}
					} else {
						this.isSShow = false
						return
					}
				}
				let [err,res] = await this.$http.post('/api/customer/getCustomerInfo');
				if(res.data.code === 200){
					// let name = res.data.data.phone
					// this.name = name
					this.user_nickname = res.data.data.user_nickname
					if(this.user_nickname == ""){
						this.user_nickname = res.data.data.phone + "的用户"
					}
					let user_headimgurl = res.data.data.user_headimgurl
					this.user_headimgurl = user_headimgurl
					let distribution_level_id = res.data.data.distribution_level_id
					uni.setStorageSync('distribution_level_id', distribution_level_id);
					let distribution_level_sort = res.data.data.distribution_level_sort
					uni.setStorageSync('distribution_level_sort',distribution_level_sort)
					if(this.user_headimgurl == ""){
						this.user_headimgurl = "../../static/images/APP-qie8_0000_mo-head2.png"
					}
					this.isSShow = true
					uni.stopPullDownRefresh();
				}
			},
			gologin(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			async getCustomerMoneyInfo(){//获取用户金贝银贝信息
				const token = uni.getStorageSync('token')
				if (token === '' || token === null || token === undefined) {
					return
				}
				let [err,res] = await this.$http.post('/api/customer/getCustomerMoneyInfo');
				if(res.data.code === 200){
					this.balance_gold = res.data.data.balance_gold
					this.balance_silver = res.data.data.balance_silver
				}
				uni.stopPullDownRefresh();
			},
			getQueryVariable(variable){//获取URL中的state
			   let query = window.location.search.substring(1);
			   let vars = query.split("&");
			   for (let i=0;i<vars.length;i++) {
					   let pair = vars[i].split("=");
					   if(pair[0] == variable){return pair[1];}
			   }
			   return(false);
			},
			//静默登录
			getBecomeSilent(){
				const openid = uni.getStorageSync('wx_open_id');
				if (openid) {
					return
				}
				const AppId = this.appId
				const code = this.getUrlParam('code')
				const local = window.location.href
				if(code === undefined || code === null || code === ''){
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/mine/mine') + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
				}else{
					this.code = code
					this.getOpenId(code)
				}				
			},
			//获取code的方法
			getUrlParam(name){
				console.log("获取code")
				let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				let r = window.location.search.substr(1).match(reg)
				if(r != null) return unescape(r[2])
				return null
			},
			async getOpenId (code) {
				let [err,res] = await this.$http.post('/api/customer/getCustomerWxOpenId',{code:code})
				console.log(res)
				if (res.data.code === 200) {
					let datas = res.data.data.openid
					this.openid = datas
					uni.setStorageSync("wx_open_id",this.openid)//同步本地存储
					console.log(this.openid)
					this.getname()
				}
			},
			async getname(){
				let token = uni.getStorageSync("token")
				if (token === '' || token === undefined || token === null) {
					const openid = uni.getStorageSync('wx_open_id');
					if (openid !== null && openid !== '' && openid !== undefined) {
						let [err1, resp1] = await uni.request({
							url:config.webUrl+"/api/customer/wxLogin",
							data: { 'wx_open_id': openid },
							method:'POST',
							header:{
								'shop':"1"
							},
						})
						console.log(resp1)
						if(resp1.data.data.success_message == 'success'){
							uni.setStorageSync('token',resp1.data.data.token);
						}else if(resp1.data.data.success_message == 'not_registered'){
							this.NonSilentLogin()
						}else if(resp1.data.data.success_message == 'not_unionid'){
							this.s_customer_id = resp1.data.data.customer_id
							this.NonSilentLogin1()
						}
					} else {
						
					}
				}
				
			},
			// 非静默
			NonSilentLogin(){
				// const local01 = window.location.href
				if(this.d_status != 2){
					 location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ config.appid +'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/mine/mine') + '&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
				}else{
					const code1 = this.GGetUrlParam('code')
					this.getftoken(code1)
					console.log(code1)
				}
			},
			GGetUrlParam(name){
				let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				let r = window.location.search.substr(1).match(reg)
				if(r != null) return unescape(r[2])
				return null
			},
			//获取非静默登录的token
			async getftoken(code1){
				let [err,res] = await this.$http.post('/api/customer/getWxUserInfo', {code:code1})
				let userinfo = res.data.data.userinfo
				let d_unionid = res.data.data.userinfo.unionid
				console.log(res.data.data)
				uni.setStorageSync("wx_open_id",userinfo.openid)//同步本地存储
				// 存储下来微信的信息
				uni.setStorageSync('userinfo', userinfo);
				const values = uni.getStorageSync('customer_id');
				console.log(values)
				if(userinfo){
					let [err,res] = await this.$http.post('/api/customer/wxRegister', {
							nickname:userinfo.nickname,
							headimgurl:userinfo.headimgurl,
							wx_open_id:userinfo.openid,
							wx_union_id:d_unionid
					});
					if(res.data.code === 200){
						console.log(res.data.data.token)
						uni.setStorageSync('token',res.data.data.token);
					}
					
				}
			},
			// wx_union_id
			NonSilentLogin1() {
				if (this.d_status != 2) {
					window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid +
						'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/mine/mine') +
						'&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
				} else {
					const code1 = this.GGetUrlParam1('code')
					this.getftoken1(code1)
					console.log(code1)
				}
			},
			GGetUrlParam1(name) {
				let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				let r = window.location.search.substr(1).match(reg)
				if (r != null) return unescape(r[2])
				return null
			},
			// //获取非静默登录的token
			async getftoken1(code1) {
				let [err, res] = await this.$http.post('/api/customer/getWxUserInfo', {
					code: code1
				})
				if(res.data.code === 200){
					// console.log(res.data.data.userinfo.unionid)
					let d_unionid = res.data.data.userinfo.unionid
					let [err, res1] = await this.$http.post('/api/customer/updateWxUnionId', {
						 wx_union_id:d_unionid,
						 customer_id:this.s_customer_id
					})
					if(res1.data.code === 200){
						 console.log(res.data.data)
					}
				}
			
			},
			goIntegralCenter(){
				uni.navigateTo({
					url:"/pages/integral-center/integral-center"
				})
			}
			
		},
		computed:{
		
		}
	}
</script>

<style lang="scss" scoped>
	.kimbe-box{
		width:100%;
		height: 100%;
		padding-top:140upx;
		padding: 140upx 30upx;
		.kimbe{
			width:100%;
			height: 200upx;
			background: #f5f5f5;
			border-radius: 20upx;
			.item{
				width:100%;
				padding: 0 26upx;
				height: 98upx;
				border-bottom:2px solid #eeeeee;
				font-size: 28upx;
				color:#666666;
				display: flex;
				justify-content: space-between;
				line-height: 100upx;
				text{
					color:#55b0f9;
					margin-right: 10upx;
				}
			}
			.item1{
				width:100%;
				padding: 0 26upx;
				height:100upx;
				font-size: 28upx;
				color:#666666;
				display: flex;
				justify-content: space-between;
				line-height: 100upx;
				text{
					color:#55b0f9;
					margin-right: 10upx;
				}
			}
		}
	}
	
	
	.wdlmine{
		.mine-top-c{
			color:#ffffff;
		}
		.mine{
			.mine-top{
				.mine-top-l{
					.kuang{
						background: #eeeeee;
						text-align: center;
						image{
							margin-top:18upx;
							width:70%;
							height: 70%;
						}
					}
				}
			}
		}
		
	}
	page{
		background:#ffffff;
	}
	.mine-box{
		width:100%;
		height: 480upx;
		// background: #4ac6ff;
		background-image: linear-gradient(to bottom right, #4ac6ff, #369eff);
		padding:0 35upx;
		.mine-top{
			width:100%;
			height: 200upx;
			// background-color: #09BB07;
			overflow: hidden;
			display: flex;
			.kuang{
				width:130upx;
				height: 130upx;
				border-radius: 100%;
				overflow: hidden;
				border:6upx solid #FFFFFF;
				margin-left:70upx;
				margin-top:40upx;
				image{
					width:100%;
					height: 100%;
				}
			}
			.mine-top-c{
				font-size:28upx;
				color:#ffffff;
				width:100%;
				margin:100upx 0 0 20upx;
				height: 48upx;
				display: flex;
				image{
					width:28upx;
					height: 28upx;
					margin-left: 40upx;
					margin-top: 6upx;
				}
			}
		}
		.mine-top-r{
			width:174upx;
			height: 68upx;
			margin-top:96upx;
			background: url(../../static/images/APP-01_0022_xinxi.png) no-repeat;
			background-size: 49upx 49upx;
		}
		.mine-buttom{
			width:624upx;
			height: 142upx;
			// background: #8A6DE9;
			margin:0 28upx;
			display: flex;
			.power{
				width:208upx;
				height: 142upx;
				.power-s{
					padding-top:8upx ;
					image{
						width:70upx;
						height: 48upx;
						margin:42upx 0 0 68upx;
					}
				}
				.power-c-s{
					
					image{
						width:62upx;
						height: 56upx;
						margin:42upx 0 0 72upx;
					}	
				}
				.power-r-s{
					image{
						width:46upx;
						height: 54upx;
						margin:42upx 0 0 80upx;
					}
					
				}
				.power-x{
					color:#ffffff;
					text-align: center;
					lien-height:48upx;
					font-size:22upx;
				}
			}
		}
	}
	
// 订单
.orderForm-box{
	width:100%;
	height: 200upx;
	// background: #007AFF;
	    position: fixed;
	    top: 380upx;
	padding:0 35upx;
	
	.orderForm{
		width:100%;
		height: 200upx;
		background:#ffffff;
		border-radius: 26upx;
		// position:flex;
		// top:435upx;
		box-shadow: 0 0 10upx #b5b5b5;
		z-index: 1;
		.orderForm-title{
			width:100%;
			height: 66upx;
			// background: #007AFF;
			font-size:28upx ;
			color:#333333;
			font-weight: 600;
			padding-left: 35upx;
			line-height: 66upx;
		}
		.item-box{
			width:100%;
			height: 134upx;
			// background: #09BB07;
			display: flex;
			justify-content: space-between;
			.item{
				width:162upx;
				height: 134upx;
				// background: red;
				text-align: center;
				.item-s{
					width:100%;
					height: 80upx;
					// background:#F0AD4E;
					overflow: hidden;
					.img-box{
						width:48upx;
						height: 48upx;
						img{
							width:100%;
							margin: 22upx 0 0 54upx;
						}
					}
				}
				.item-x{
					font-size:22upx;
					color:#999999;
				}
				
			}
			
		}
	}
}
</style>
