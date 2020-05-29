<template>
	<view>
		<view class="mask1" v-if="isLoading">
			<img src="../../static/images/加载中-海报alpha.gif" alt="" class="loadingImg">
		</view>
		<view class="mask"  v-if="isHave">
			<view class="gotoX" @click="isHave = false">
				<img src="../../static/images/APP-qie14_0005_close.png" alt="">
			</view>
			<div class="firstImg swiper-container">
				<div class="swiper-wrapper">
					<div
					  v-for="(item, i) in imgInfo"
					  :key="i"
					  class="swiper-slide"
					>
				  <!-- 具体内容 -->
					  <img
						:src="item"
					  >
					</div>
				</div>
			</div>
			<div class="secondImg swiper-container">
				<div class="swiper-wrapper">
					<div
					  v-for="(item, i) in imgInfo"
					  :key="i"
					  class="swiper-slide"
					>
				  <!-- 具体内容 -->
					  <img
						:src="item"
					  >
					</div>
				</div>
			</div>
			<view  class="copylink" 
				   @click="getShareWeb"
				   v-clipboard:copy="copyText"
				   v-clipboard:success="onCopy"
			>
				<view class="copyImg">
					<img src="../../static/images/APP-qie16_0004_链接按钮.png" alt="">
				</view>
				<view class="copyText">
					<text>复制链接</text>
				</view>
			</view>
		</view>
		<view v-if="isSShow">
			<!-- 推荐 -->
			<view class="header-box">
				<view class="header-s"></view>
				<view class="header-x">
					<view style="height: 60upx;">
						<view class="kuang">
							<image v-if="isClick" :src="parentHeadimgurl" mode=""></image>
							<image v-else src="../../static/images/APP-qie8_0000_mo-head2.png" mode=""></image>
						</view>
						<view class="title">
							<text class="headline">推荐人</text>
							<text class="name" v-if="isClick">{{parentName}}</text>
							<text class="name" v-else>您还没有推荐人，<text class="isloin" @click="goInvitation">点击填写</text></text>
						</view>
					</view>
				</view>
			</view>
			<!-- 卡片 -->
			<view class="card-box">
				<view class="card">
					<view class="card-top">
						<view class="kuang">
							<image :src="user_headimgurl" mode=""></image>
						</view>
						<view class="card-name">
							<view class="text">{{user_nickname}}</view>
							<view class="VIPimg">
								<img src="../../static/images/son_0000_VIP_02.png" alt="">
								<view class="VIPimg-box">{{user_distribution_level_name}}</view>
							</view>
						</view>
						
					</view>
					<view class="card-bottom">
						<view class="earnings">累计收益</view>
						<view class="money">￥  <text>{{profit_all}}</text></view>
					</view>
				</view>
			</view>
			<!-- 余额 -->
			<view class="arrange-box">
				<view class="arrange">
					<view class="arrange-top">
						<view class="top-left">
							<view class="yu">冻结佣金</view>
							<view class="qian">￥ <text>{{profit_frozen}}</text></view>
						</view>
						
					</view>
					<view class="arrange-center">
						<view class="top-left">
							<view>
								<view class="yu">可用账户</view>
								<view class="qian">￥ <text>{{balance}}</text></view>
							</view>
							<view class="top-right">
								<button class="withdraw" @click="gotoAccount"><image src="../../static/images/son_0020_anniu-tixian.png" mode=""></image>立即提现</button>
							</view>
						</view>
					</view>
					<view class="arrange-center-second">
						<view class="top-left-second">
							<view>
								<text>账单</text>
							</view>
						</view>
						<view class="top-right-second" @click="gotomyBill">
							<view>
								<text>查看记录</text>
								<img src="../../static/images/right_10.png" alt="">
							</view>
						</view>
					</view>
					<view class="arrange-buttom">
						<view>每月1~5日可提现可用账户的收益</view>
					</view>
				</view>
			</view>
			<!-- 底部三个卡片 -->
			<view class="footer-box">
				<view class="footer">
					<view class="footer-left ka" @click="getSharePoster">
						<view class="fx-header">分享海报</view>
						<view class="fx-title">点击分享我的海报</view>
					</view>
					<view class="footer-center ka" @click="gotoAssociation">
						<view class="fx-header">我的社群</view>
						<view class="fx-title">我的团队我管理</view>
					</view>
					<view class="footer-right ka" @click="gotoEarnings">
						<view class="fx-header">收益明细</view>
						<view class="fx-title">查看收益详细情况</view>
					</view>
				</view>
			</view>
		</view>
		<view class="wdlvip" v-else>
			<view class="header-box">
				<view class="header-s"></view>
				<view class="header-x">
					<view style="height: 60upx;">
						<view class="kuang">
							<image src="../../static/images/APP-qie8_0000_mo-head2.png" mode=""></image>
						</view>
						<view class="title">
							<text class="headline">推荐人</text>
							<text class="name">您还没有推荐人，<text class="isloin">点击填写</text></text>
						</view>
					</view>
				</view>
			</view>
			<!-- 卡片 -->
			<view class="card-box">
				<view class="card">
					<view class="card-top">
						<view class="kuang">
							<image src="../../static/images/APP-qie8_0001_mo-head1.png" mode=""></image>
						</view>
						<view class="card-name">
							<text class="text" @click="gologin">请 登录</text>
						</view>
					</view>
					<view class="card-bottom">
						<view class="earnings">累计收益</view>
						<view class="money">￥  <text>0</text></view>
					</view>
				</view>
			</view>
		</view>
		<tabbarItem></tabbarItem>
	</view>
</template>

<script>
	import tabbarItem from "../../components/tabbarItem/tabbar.vue"
	import config from '../../common/config.js'
	import Swiper from 'swiper';
	import 'swiper/css/swiper.min.css';
	export default {
		components:{
			tabbarItem,
		},
		onPullDownRefresh() {//下拉刷新
			this.getCustomerMoneyInfo()
			this.getBecomeSilent()
		},
		onShow(){
			this.getname1()
		},
		onLoad() {
			this.getCustomerMoneyInfo()
			this.d_status = this.getQueryVariable("state")
			this.getBecomeSilent()
			this.getCumstomerInfo()
			// if(this.d_status == 2){
			// 	this.NonSilentLogin() 
			// }
		},
		created() {

		},
		data() {
			return {
				isClick:true,
				isSShow:true,
				name:'',
				user_headimgurl:"",
				openid:'',
				balance:'',
				profit_all:'',
				profit_frozen:'',
				parentName:'',
				parentHeadimgurl:"",
				pid:"",
				isDe:true,
				user_nickname:null,
				user_distribution_level_name:null,
				d_status:null,
				swiper1:null,
				swiper2:null,
				isHave:false,
				imgInfo:[
					
				],
				copyText:null,
				customerInfo:[],
				isLoading:false,
				s_customer_id:null
			};
		},
		methods:{
			goInvitation(){
				uni.redirectTo({
					url:"/pages/invitation/invitation"
				})
			},
			gotoAccount(){
				uni.navigateTo({
					url:"/pages/account/account"
				})
			},
			gotoAssociation(){
				uni.navigateTo({
					url:"/pages/association/association"
				})
			},
			gotoEarnings(){
				uni.navigateTo({
					url:"/pages/earnings/earnings"
				})
			},
			onCopy(e){
				
			},
			async getShareWeb(){
				let [err, res] = await this.$http.post('/api/shop/getShortUrl',{
					long_url:config.webUrl1 + "/#/pages/QRcode/QRcode?customer_id=" + this.customerInfo.customer_id + "&type=3" 
				});
				if(res.data.code === 200){
					uni.showToast({
						icon:'none',
						title:'生成链接成功'
					})
					this.copyText = null
					this.copyText = res.data.data.splicing_domain_name
					console.log(this.copyText)
				}
			},
			async getSharePoster(){//获取用户分享海报
				this.isLoading = true
				let [err,res] = await this.$http.post("/api/coupon/shareShopCouponCode",{
					shop_coupon_url: config.webUrl1+'/#/pages/QRcode/QRcode',
					type:3,
				});
				if(res.data.code === 200){
					this.imgInfo = res.data.data
				}
				this.isLoading = false
				this.goSharePosters()
			},
			// async getSharePoster(){ //获取客户分享海报图片
			// 	let [err,res] = await this.$http.post('/api/shop/getShopPosterTemplateList')
			// 	if(res.data.code === 200){
			// 		this.imgInfo = res.data.data
			// 	}
			// 	this.goSharePosters()
			// },
			async getname1(){//通过token换用户信息
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
					// console.log(res.data.data)
					this.user_distribution_level_name = res.data.data.distribution_level_name
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
					if(this.user_headimgurl == ""){//判断头像 昵称  若是获取不到 则显示默认
						this.user_headimgurl = "../../static/images/APP-qie8_0000_mo-head2.png"
					}
					let pid = res.data.data.pid
					this.pid = pid
					if(this.pid !== "" && this.pid !== null){//判断有没有推荐人
						this.getCustomerParentInfo()
					}else{
						this.isClick = false
					}
					this.isSShow = true
				}
				
			},
			async getCumstomerInfo() { //获取用户个人信息
				let token = uni.getStorageSync("token")
				if(token === undefined || token === null || token === ''){
					return false
				}
				let [err, res] = await this.$http.post('/api/customer/getCustomerInfo');
				if (res.data.code === 200) {
					this.customerInfo = res.data.data
				}
			},
			async getCustomerMoneyInfo(){//获取用户金额信息
				const token = uni.getStorageSync('token')
				if (token === '' || token === null || token === undefined) {
					return
				}
				let [err,res] = await this.$http.post('/api/customer/getCustomerMoneyInfo');
				if(res.data.code == 200){
					let balance = res.data.data.balance
					this.balance = balance
					let profit_all = res.data.data.profit_all
					this.profit_all = profit_all
					let profit_frozen = res.data.data.profit_frozen
					this.profit_frozen = profit_frozen
				}
				uni.stopPullDownRefresh();
			},
			async getCustomerParentInfo(){//推荐人的数据
				let [err,res] = await this.$http.post('/api/customer/getCustomerParentInfo');
				if(res.data.code == 200){
					console.log(res.data.data)
					let parentName = res.data.data.user_nickname
					this.parentName = parentName
					let parentHeadimgurl = res.data.data.user_headimgurl
					this.parentHeadimgurl = parentHeadimgurl
					let phone = res.data.data.phone
					let reg = /^(\d{3})\d*(\d{4})$/;
					if(phone !== null && phone !== '' && phone !== undefined){
						let newPhone = phone.replace(reg,'$1****$2')
					}
					if(this.parentHeadimgurl == ""){//判断头像 昵称  若是获取不到 则显示默认
						this.parentHeadimgurl = "../../static/images/APP-qie8_0000_mo-head2.png"
					}
					if(this.parentName == ""){//判断 昵称  若是获取不到 则显示默认
						this.parentName = newPhone + '的用户'
					}
					this.isDe= false
					
				}else{
					uni.showToast({
					    title: '获取推荐人失败',
					    duration: 2000
					});
				}
			},
			gologin(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			gotomyBill(){
				uni.navigateTo({
					url:"../myBill/myBill"
				})
			},
			goSharePosters(){
				this.isHave = true
				this.$nextTick(() => {
					this.swiper1 = new Swiper(".firstImg",{
						loop: false, // 循环模式选项
						observer:true,
						observeParents:true,
						slidesPerView: 'auto',
						centeredSlides: true,
						 watchSlidesVisibility: true,//防止不可点击
						thumbs: {
						    swiper: {
						      el: '.secondImg', //注意此处的设置方式
						      slidesPerView: this.imgInfo.length / 1,
							  // spaceBetween: 10,
							   watchSlidesVisibility: true,//防止不可点击
						    }
						 },
					})
				})
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
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/vip/vip') + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
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
						} else if(resp1.data.data.success_message == 'not_unionid'){
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
					 location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ config.appid +'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/vip/vip') + '&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
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
						'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/vip/vip') +
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
		}
	}
</script>

<style lang="scss" scoped>
	.mask1{
		position: fixed;
		top:0;
		left:0;
		z-index:999;
		width:100%;
		height:100vh;
		background:rgba(0,0,0,0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		.loadingImg{
			width:400upx;
			height:400upx;
		}
	}
	.mask{
		position: fixed;
		top:0;
		left:0;
		z-index:999;
		width:100%;
		height:100vh;
		background:rgba(0,0,0,0.7);
		.gotoX{
			width:40upx;
			height:40upx;
			position:absolute;
			top:20upx;
			right:90upx;
			img{
				width:100%;
				height:100%;
			}
		}
		.firstImg{
		    width:100%;
		    height:820upx;
			margin-top:70upx;
		}
		.firstImg img{
			position:relative;
		    width:100%;
		    height:100%;
		}
		.swiper-slide {
		   width:65%;
		  text-align: center;
		  font-size: 18px;
		  /* Center slide text vertically */
		  display: -webkit-box;
		  display: -ms-flexbox;
		  display: -webkit-flex;
		  display: flex;
		  -webkit-box-pack: center;
		  -ms-flex-pack: center;
		  -webkit-justify-content: center;
		  justify-content: center;
		  -webkit-box-align: center;
		  -ms-flex-align: center;
		  -webkit-align-items: center;
		  align-items: center;
		  transition: 300ms;
		  transform: scale(0.8);
		
		}
		.firstImg .swiper-slide-active,.swiper-slide-duplicate-active{
		  transform: scale(1);
		}
		.secondImg{
			width:300upx;
			height:150upx;
			margin-top:10upx;
			.swiper-slide {
				width:40upx;
				height:150upx;
			}
			.swiper-slide-thumb-active{
				border:2px solid #FFFFFF;
				width:50upx;
				height:150upx;
				img{
					width:100%;
					height:100%;
					transform: scale(1);
					opacity:1;
					filter:alpha(opacity=100);
				}
			}
			img{
				width:100%;
				height:100%;
				transform: scale(0.8);
				z-index:1;
				opacity:0.5;
				padding:6upx;
				filter:alpha(opacity=50);
			}
		}
	}
	.copylink{
		margin:0 auto;
		width:200upx;
		height:120upx;
		.copyImg{
			margin:0 auto;
			width:80upx;
			height:80upx;
			margin-bottom:10upx;
			img{
				width:100%;
				height:100%;
			}
		}
		.copyText{
			margin:0 auto;
			display:flex;
			justify-content: center;
			align-items: center;
			text{
				font-size:24upx;
				color:#FFFFFF;
			}
		}
	}
	.wdlvip {
		.isloin{
			color:#379dff;
			text-decoration:underline;
		}
	}
	.isloin{
		color:#379dff;
		text-decoration:underline;
	}
	page{
		background:#ffffff;	
	}
	.header-box{
		width:100%;
		height: 130upx;
		padding: 0 20upx;
		// background: #8A6DE9;
		.header-s{
			width:100%;
			height: 70upx;
			background: #53aefc;
			border-bottom-left-radius: 30upx;
			border-bottom-right-radius: 30upx;
		}
		.header-x{
			width:100%;
			height: 60upx;
			// background: #4CD964;
			display: flex;
			position: relative;
			view{
				width: 100%;
				position: absolute;
				.kuang{
					overflow: hidden;
					width:80upx;
					height: 80upx;
					border-radius: 100%;
					border:4upx solid #FFFFFF;
					margin-left:30upx;
					margin-top:-44upx;
					image{
						width:100%;
						height: 100%;
					}
				}
				.title{
					width:500upx;
					height: 70upx;
					margin:-32upx 0 0 132upx;
					.headline{
						font-size:18upx;
						color: #ffffff;
						line-height: 28upx;
						display: block;
						
					}
					.name{
						display: block;
						font-size: 20upx;
						color:#666666;
						line-height: 40upx;
						
					}
				}
			}
		} 
	}
	.VIPimg{
		width:100%;
		height:30upx ;
		display: flex;
		padding-left: 16upx;
		img{
			height:30upx;
		}
		.VIPimg-box{
			height:30upx;
			padding-right: 10upx;
			background:#3D3D3D;
			font-size:22upx;
			line-height:29upx;
			color:#FFE2A0;
			min-width: 60upx;
			border-radius:0 20upx 20upx 0;
			p{
				margin-right:15upx;
			}
		}
	}
	// 卡片
	.card-box{
		width: 100%;
		height: 342upx;
		padding: 0 20upx;
		.card{
			width: 100%;
			height: 320upx;
			background: url(../../static/images/APP-05vip.png) no-repeat;
			background-size:100% 100% ;
			border-radius: 26upx;
			box-shadow: 0 8upx 14upx #bbbbbb;
		}
		.card-top{
			width:100%;
			height: 162upx;
			padding: 0 20upx;
			overflow: hidden;
			display: flex;
			position:relative;
			.kuang{
				overflow: hidden;
				width:136upx;
				height:136upx;
				border-radius: 100%;
				border:6upx solid #FFFFFF;
				margin-top:20upx;
				image{
					width:100%;
					height: 100%;
				}
			}
			.card-name{
				width:480upx;
				height: 142upx;
				margin-top:26upx;
				.text{
					font-size: 28upx;	
					color:#ffffff;
					margin-left: 20upx;
					line-height: 68upx;
				}
			}
			
		}
		.card-bottom{
			width:100%;
			height: 158upx;
			.earnings{
				font-size: 26upx;
				line-height: 47upx;
				color:#369eff;
				padding-left: 178upx;
			}
			.money{
				color:#369eff;
				line-height: 74upx;
				font-size: 48upx;
				padding-left: 170upx;
			}
		}
	}
//余额
.top-right{
	margin-left: 360upx;
	.withdraw{
		width:176upx;
		height: 52upx;
		font-size: 24upx;
		margin-top:34upx;
		line-height: 52upx;
		box-shadow:8upx #aaaaaa;
		image{
			width:33upx;
			height: 33upx;
			margin:0 8upx -8upx -12upx;	
		}
	}
}
.arrange-box{
	width:100%;
	height: 324upx;
	padding:0 20upx;
	.arrange{
		width:100%;
		height: 330upx;
		background: #ffffff;
		border-radius: 26upx 26upx 0 0;
		box-shadow: 0upx 0upx 12upx #bbbbbb;
		margin-top:21upx;
		.arrange-top{
			width:100%;
			height: 117upx ;
			display: flex;
			border-bottom:2upx solid #f2f2f2;
			.top-left{
				padding-left: 30upx;
				.yu{
					margin-top:20upx;
					color:#666666;
					font-size: 28upx;
					line-height: 40upx;
				}
				.qian{
					color:#666666;
					font-size: 24upx;
					text{
						color:#53aefc;
					}
				}
			}
			
		}
		.arrange-center{
			width:100%;
			height: 111upx;
			overflow: hidden;
			border-bottom: 1px solid #f2f2f2;
			padding:0 30upx;
			display: flex;
			justify-content: space-between;
			.top-left{
				display: flex;
				// padding-left: 30upx;
				.yu{
					margin-top:20upx;
					color:#666666;
					font-size: 26upx;
					line-height: 40upx;
				}
				.qian{
					color:#666666;
					font-size: 24upx;
					text{
						color:#53aefc;
					}
				}
			}
		}
		.arrange-center-second{
			width:100%;
			height: 111upx;
			overflow: hidden;
			display:flex;
			justify-content: space-between;
			align-items: center;
			.top-left-second{
				margin-left:30upx;
				text{
					font-size: 26upx;
				}
			}
			.top-right-second{
				margin-right:20upx;
				font-size: 24upx;
				img{
					margin-left:20upx;
					height:24upx;
					
				}
			}
		}
		.arrange-buttom{
			width:100%;
			height: 56upx;
			background:#f2f2f2;
			border-bottom-left-radius: 26upx;
			border-bottom-right-radius: 26upx;
			font-size:20upx;
			color:#b3b3b3;
			line-height: 56upx;
			view{
				padding-left: 30upx;
			}
		}
	}
}
//底部三个卡片
.fx-header{
	font-size: 24upx;
	color:#333333;
	font-weight: 900;
	line-height: 33upx;
	margin:17upx 0 0 16upx;
}
.fx-title{
	font-size:16upx;
	color:#666666;
	line-height: 25upx;
	margin:4upx 0 0 16upx;
}
.footer-box{
	width:100%;
	height: 100%;
	padding: 100upx 20upx;
	.footer{
		display: flex;
		width:100%;
		height: 100%;
		justify-content: space-between;
		.ka{
			width:209upx;
			height: 91upx;
			background:#FFB400;
			border-radius: 10upx;
			box-shadow: 0upx 0upx 8upx #dedede;
		}
		.footer-left{
			background:url(../../static/images/son_0006_cai-1.png) no-repeat;
			background-size:100% 100%;
			
		}
		.footer-center{
			background:url(../../static/images/son_0005_cai-2.png) no-repeat;
			background-size:100% 100%;
		}
		.footer-right{
			background:url(../../static/images/son_0004_cai-3.png) no-repeat;
			background-size:100% 100%;
		}
	}
}
</style>
