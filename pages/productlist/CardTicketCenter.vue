<template>
	<view>
		<view class="header_box"></view>
		<view class="header_title_box">
			<view class="header_title">
				<view class="header_title_left">
					<view class="" v-if="status === 2">我的体验券：</view>
					<view class="" v-if="status === 1">我的会员券：</view>
					<!-- <view class="" v-else>
						我的体验券：
					</view> -->
					<view class="sdfd">
						<image src="../../static/images/APP-qie16_0002_优惠券.png" mode=""></image>
						<view class="wsed">
							{{d_number}}<text>张</text>
						</view>
					</view>
				</view>
				<view class="header_title_right" @click="goShare">
					去分享
				</view>
			</view>
			<view class="RecommendedForYou">
				<view class="RecommendedForYou_xian"></view>
				<view class="RecommendedForYou_content">
					可购买超值商品
					<view class="california">
						为您推荐
					</view>
				</view>
				<view class="RecommendedForYou_xian"></view>

			</view>
		</view>
		<view class="shoppingGoods_box">
			<view class="bjt" v-for="(item,index) in d_shopList" :key="index" @click="gobuy(item.id)">
				<view class="bjt_image">
					<image :src="item.main_images_default" mode=""></image>
				</view>
				<view class="bjt_title_box">
					<view class="tabCenter-bigtitle">{{item.goods_name}}</view>
						<view class="tabCenter-smalltitle">{{item.sold_count}}位用户已下单</view>
						<view class="tabCenter-number">{{item.price}}<text class="text">  元/斤</text></view>
						<view class="tabCenter-icon">
							<img src="../../static/images/APP-01_0008_shop-car.png" alt="">
						</view>
				</view>
			</view>
			
		</view>
		<!-- 弹出海报 -->
		<view class="posterLDL_box" v-if="isShow">
			<view class="posterLDL">
				<view class="posterLDL_left">
					<img :src="shareImg" alt="">
					<!-- <view class="posterLDL_left_headPortrait">
						<image :src="d_userinfo.user_headimgurl" mode=""></image>
						<view class="title_box">
							<p>您的好友 <text>{{d_userinfo.user_nickname}}</text></p>
							<p>给您分享了一张体验券</p>
						</view>
					</view>
					<view class="posterLDL_left_poster">
						<image src="../../static/images/平台升级壹口两口5.jpg" mode=""></image>
						<view class="qwe"><image :src="shareImg" mode=""></image></view>
					</view> -->
				</view>
				<view class="posterLDL_right" @click="isShow = false">
					<image src="../../static/images/APP-qie14_0005_close.png" mode=""></image>
				</view>
				<view
					class="copylink" 
					@click="getWebUrl"
					v-clipboard:copy="copyText"
					v-clipboard:success="onCopy">
					<image src="../../static/images/APP-qie16_0004_链接按钮.png" mode=""></image>
					<view class="">
						复制链接
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		data() {
			return {
				copyText:null,
				isShow:false,
				d_number:null,
				customer_id:null,
				status:null,
				d_shopList:[],
				d_userinfo:{},
				d_status:null,
				member_id:null,
				shareImg:null,
				ceshi:{},
				s_customer_id:null
			};
		},
		onLoad(option) {
			this.ceshi.customer_id = option.customer_id
			this.ceshi.member_id = option.member_id
			if(option.customer_id !== undefined && option.customer_id !== '' && option.customer_id !== null && option.member_id !==undefined && option.member_id !== '' && option.member_id !== null){
				 uni.setStorageSync('customer_id', option.customer_id);
				 uni.setStorageSync('member_id',option.member_id);
				 this.d_status = this.getQueryVariable("state")
				 this.getBecomeSilent()
			}else{
				

				this.d_status = this.getQueryVariable("state")
				this.getBecomeSilent()
			}
			// this.getCumstomerInfo()
			// this.findShopGoodsMemberCustomer()
			// this.getShopGoodsCommonList()
			// this.getQrCode()
			
		},
		onShow(){
			this.getname()
		},
		methods:{
			getWebUrl(){
				const customer_id = uni.getStorageSync('customer_id');
				const member_id = uni.getStorageSync('member_id');
				if(customer_id !== undefined && customer_id !== '' && customer_id !== null){
					this.copyText = null
					this.copyText = config.webUrl1 + "/#/pages/productlist/CardTicketCenter?customer_id=" + customer_id + "&member_id=" + member_id
				}else{
					this.copyText = null
					this.copyText = config.webUrl1 + "/#/pages/productlist/CardTicketCenter?customer_id=" + this.d_userinfo.customer_id + "&member_id=" + this.member_id
				}
				
			},
			
			onCopy(e){
				uni.showToast({
					icon:'none',
					title:'生成链接成功'
				})
			},
			goShare(){
				if(this.status !== 1){
					uni.showToast({
						title:'此会员才可分享',
						icon:'none'
					})
					return
				}
				this.getQrCode()
				this.isShow = true
			},
			async getCumstomerInfo() { //获取用户个人信息
				let token = uni.getStorageSync("token")
				if(token === undefined || token === null || token === ''){
					return false
				}
				let [err, res] = await this.$http.post('/api/customer/getCustomerInfo');
				if (res.data.code === 200) {
					this.customer_id = res.data.data.customer_id
					this.d_userinfo = res.data.data
				}
			},
			async findShopGoodsMemberCustomer() { //获取几张优惠券
				let [err, res] = await this.$http.post('/api/shop_goods/findShopGoodsMemberCustomer',{group_id:18});
				if (res.data.code === 200) {
					console.log(res.data.data)
					if(res.data.data.length === 0){
						this.d_number = 0
						return
					}else{
						this.d_number = res.data.data.use_number
						this.status = res.data.data.status
						this.member_id = res.data.data.member_id
					}
				}
			},
			async getQrCode(){ //二维码
				const customer_id = uni.getStorageSync('customer_id');
				const member_id = uni.getStorageSync('member_id');
				if(customer_id !== undefined && customer_id !== '' && customer_id !== null && member_id !== undefined && member_id !== '' && member_id !== null){
					// let [err,res] = await this.$http.post("/api/coupon/getQrCode",{
					// 	url: config.webUrl1 + "/#/pages/productlist/CardTicketCenter?customer_id=" + customer_id + "&member_id=" + member_id,
					// });
					let [err,res] = await this.$http.post("/api/coupon/shareShopCouponCode",{
						type:6,
						shop_coupon_url:config.webUrl1 + "/#/pages/productlist/CardTicketCenter",
						member_id:member_id
					})
					if(res.data.code === 200){
						this.shareImg = res.data.data
					}
				}else{
					// let [err,res] = await this.$http.post("/api/coupon/getQrCode",{
					// 	url: config.webUrl1 + "/#/pages/productlist/CardTicketCenter?customer_id=" + this.d_userinfo.customer_id + "&member_id=" + this.member_id,
					// });
					let [err,res] = await this.$http.post("/api/coupon/shareShopCouponCode",{
						type:6,
						shop_coupon_url:config.webUrl1 + "/#/pages/productlist/CardTicketCenter",
						member_id:this.member_id
					})
					if(res.data.code === 200){
						this.shareImg = res.data.data
					}
				}
				
			},
			async getShopGoodsCommonList() { //获取商品列表
				let [err, res] = await this.$http.post('/api/shop_goods/getShopGoodsCommonList',{group_id:18});
				if (res.data.code === 200) {
					this.d_shopList = res.data.data.data
					console.log(this.d_shopList)
				}
			},
			gobuy(id){//商品详情页
				if(this.d_number == 0){
					uni.showToast({
						title:'此商品仅为会员提供',
						icon:'none'
					})
				}else{
					uni.navigateTo({
						url: "/pages/buy/buy?product_id=" + id
					})
				}
				
			},
		
			async createTryMemberCustomer(){
				 const customer_id = uni.getStorageSync('customer_id');
				 const member_id = uni.getStorageSync('member_id');
				 if (customer_id !== '' && customer_id !== undefined && customer_id !== null && member_id !== '' && member_id !== undefined && member_id !== null){
					 let [err,res] = await this.$http.post("/api/shop_goods/createTryMemberCustomer",{
					 	customer_id: customer_id,
					 	member_id:member_id
					 });
					 if(res.data.code === 200){
					 	this.findShopGoodsMemberCustomer()
					 }
				 }else{
					 console.log(1111)
					 let [err,res] = await this.$http.post("/api/shop_goods/createTryMemberCustomer",{
					 	customer_id: this.ceshi.customer_id,
					 	member_id:this.ceshi.member_id
					 });
					 if(res.data.code === 200){
					 	this.findShopGoodsMemberCustomer()
					 }
				 }
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
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/productlist/CardTicketCenter') + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
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
							this.getCumstomerInfo()
							this.findShopGoodsMemberCustomer()
							this.getShopGoodsCommonList()
						}else if(resp1.data.data.success_message == 'not_registered'){
							
							this.NonSilentLogin()
						}else if(resp1.data.data.success_message == 'not_unionid'){
							this.s_customer_id = resp1.data.data.customer_id
							this.NonSilentLogin1()
						}
					} else {
						
					}
				}else{
					uni.setStorageSync('customer_id', '');
					uni.setStorageSync('member_id','');
					// const customer_id = uni.getStorageSync('customer_id');
					// const member_id = uni.getStorageSync('member_id');
					if(this.ceshi.customer_id !== undefined && this.ceshi.customer_id !== '' && this.ceshi.customer_id !== null && this.ceshi.member_id !== undefined && this.ceshi.member_id !== '' && this.ceshi.member_id !== null){
						// uni.showToast({
						//     title: this.ceshi.customer_id + '123123',
						//     duration: 5000
						// });
						this.createTryMemberCustomer()
						this.getCumstomerInfo()
						
						this.getShopGoodsCommonList()
					}else{
						
						this.getCumstomerInfo()
						this.findShopGoodsMemberCustomer()
						this.getShopGoodsCommonList()
					}
				}
				
			},
			// 非静默
			NonSilentLogin(){
				// const local01 = window.location.href
				if(this.d_status != 2){
					 location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ config.appid +'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/productlist/CardTicketCenter') + '&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
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
				if(userinfo){
					const pid = uni.getStorageSync('customer_id');
					let [err,res] = await this.$http.post('/api/customer/wxRegister', {
							nickname:userinfo.nickname,
							headimgurl:userinfo.headimgurl,
							wx_open_id:userinfo.openid,
							pid:pid,
							wx_union_id:d_unionid
					});
					if(res.data.code === 200){
						console.log(res.data.data.token)
						uni.setStorageSync('token',res.data.data.token);
						this.getCumstomerInfo()
						this.getShopGoodsCommonList()
						this.createTryMemberCustomer()
					}
					
				}
				
			},
			// wx_union_id
			NonSilentLogin1() {
				if (this.d_status != 2) {
					window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid +
						'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/productlist/CardTicketCenter') +
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
.header_box{
	width:100%;
	height: 150upx;
	background-image: linear-gradient(to right, #49c6fe , #369eff);
}
.header_title_box{
	width:100%;
	padding: 0 28upx;
	
	margin-top:-100upx;
	.header_title{
		width:100%;
		height: 160upx;
		background: #ffffff url(../../static/images/APP-qie16_星星.png) no-repeat 40upx 30upx;
		background-size: 230upx 150upx;
		border-radius: 10upx;
		box-shadow: 0 1upx 10upx #e8e8e8;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 20upx;
		.header_title_right{
			width:160upx;
			height: 72upx;
			background-image: linear-gradient(to right,#4ac5ff,#369eff);
			border-radius: 100upx;
			line-height: 72upx;
			text-align: center;
			font-size: 26upx;
			color:#ffffff;
			
		}
		.header_title_left{
			width:286upx;
			height: 160upx;
			// background: #007AFF;
			view:first-child{
				line-height: 100upx;
				height: 79upx;
				// background: #1AAD19;
				margin-left: 76upx;
				// margin-top:36upx;
				font-size: 24upx;
				color: #666666;
			}
			.sdfd{
				line-height: 100upx;
				height: 79upx;
				// background: #DD524D;
				margin-left: 76upx;
				font-size: 24upx;
				color: #666666;
				display: flex;
				// align-items: center;
				
				image{
					margin-top: 4upx;
					width: 46upx;
					height: 38upx;
					margin-right: 22upx;
				}
				.wsed{
					line-height: 44upx;
					// background: #F0AD4E;
					font-size: 42upx;
					color:#379dff;
					marign-left:22upx;
					text{
						font-size: 22upx;
						color:#666666;
					}
				}
			}
		}
		
	}
}
.RecommendedForYou{
	width:100%;
	height: 130upx;
	// background-color: #1AAD19;
	padding: 0 28upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.RecommendedForYou_xian{
		height: 1px;
		background: #656565;
		width:200upx
	}
	.RecommendedForYou_content{
		// width:248upx;
		// height:100%;
		font-size: 28upx;
		color: #666666;
		position: relative;
		.california{
			position: absolute;
			width:84upx;
			height: 24upx;
			background: #339fff;
			color:#ffffff;
			border-radius: 100upx;
			left:60upx;
			top:46upx;
			font-size: 16upx;
			text-align: center;
			line-height: 26upx;
		}
	}
}
.shoppingGoods_box{
	margin-top:10upx;
	width:100%;
	// background: #EC373E;
	padding:0 28upx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.bjt{
		width:334upx;
		height:480upx;
		background:white;
		border-radius:8upx;
		overflow: hidden;
		position:relative;
		margin-bottom:20upx;
	}
	.bjt_image{
		width:334upx;
		height: 334upx;
		background: #007AFF;
		image{
			width:100%;
			height: 100%;
		}
	}
	.bjt_title_box{
		padding: 16upx 14upx;
		position: relative;
		.tabCenter-bigtitle{
			font-size:28upx;
			color:#464545;
			font-weight: 600;
			line-height: 24upx;
			width:100%;
			height: 28upx;
			// margin-top: 240upx;
			white-space: nowrap;
			text-overflow: ellipsis;
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
			left:270upx;
			top:80upx;
			display: flex;
			align-items: center;
			justify-content: center;
			img{
				width:30upx;
				height: 28upx;
			}
		}
	}
	
}
.posterLDL_box{
	width:100vw;
	height: 100vh;
	background: rgba(0,0,0,.5);
	position:fixed;
	top:0;
	left:0;
	.posterLDL{
		width:524upx;
		height: 1006upx;
		// background: #007AFF;
		margin:0 auto;
		margin-top:110upx;
		display: flex;
		padding-left: 40upx;
		position: relative;
		.posterLDL_left{
			width:446upx;
			height: 794upx;
			background: #ffffff;
			margin-top:42upx;
			padding: 10upx;
			img{
				width:100%;
				height: 100%;
			}
			.posterLDL_left_headPortrait{
				width:100%;
				height: 70upx;
				// background: #4CD964;
				margin-bottom: 10upx;
				display: flex;
				image{
					width:70upx;
					height: 70upx;
					margin-right: 10upx;
				}
				.title_box{
					width:340upx;
					height: 70upx;
					// background: #DD524D;
					font-size: 16upx;
					color:#666666;
					line-height: 30upx;
					p:first-child{
						margin-top:8upx;
						text{
							margin-left: 4upx;
							
							color:#349fff;
						}
					}
				}
				
			}
			.posterLDL_left_poster{
				width:100%;
				height: 694upx;
				position: relative;
				background: #3F536E;
				image{
					width:100%;
					height: 100%;
				}
				.qwe{
					position:absolute;
					width:120upx;
					height: 120upx;
					background: #007AFF;
					top:43.5%;left:36.5%;
					image{
						width:100%;
						height: 100%;
					}
				}
			}
		}
		.posterLDL_right{
			width:38upx;
			height: 38upx;
			// background: #C0C0C0;
			image{
				width:100%;
				height: 100%;
			}
		}
	}
}
.copylink{
	width:160upx;
	height: 128upx ;
	image{
		width:80upx;
		height: 80upx;
		margin-bottom: 10upx;
	}
	position:absolute;
	left:36%;
	// bottom:240upx;
	bottom:0;
	font-size: 26upx;
	color: #ffffff;
	text-align: center;
}
</style>
