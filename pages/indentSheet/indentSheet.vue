<template>
	<view>
		<view>
			<view class="renheader">
				<view class="renbg"></view>
				<view class="hg"></view>
				<view class="renshopcar">
					<img src="../../static/images/zhuyi_03.png" alt="">
					<!-- 判断有没有设置过地址 -->
					<view class="rencenter">
						<view class="toCommunication">
							<text class="name">{{receive_info.receive_name}}</text>
							<text class="phone">{{receive_info.phone}}</text>
						</view>
						<view class="toAddress">
							<p>{{receive_info.province_name}} {{receive_info.city_name}} {{receive_info.district_name}} {{receive_info.address}}</p>
						</view>
					</view>
					<img src="../../static/images/right_10.png" alt="" class="rightImg">
				</view>
				<view class="renfill"></view>
				<view class="renRecipients">
					<view class="renRecipients-box">
						<view class="renRecipients-content">
							<view class="renRecipients-content-header" v-for="(item,index) in product_info" :key="index">
								<view class="leftImg">
									<img :src="item.goods_info.image_thumb" alt="">
								</view>
								<view class="centreWord">
									<view class="p_box">
										<p class="godsName">{{item.goods_info.goods_name}}</p>
										<p class="godsWeight" v-for="itemss in item.goods_info.species_value" :key="itemss.id">规格: <text>{{itemss}}</text></p>
									</view>
									<view class="money_box">
										<view class="godsPrice">￥{{item.goods_info.actual_price}}</view>
										<view class="rightP">x{{item.number}}</view>
									</view>
								</view>
							</view>
							<view class="renRecipients-content-footer">
								<view class="renRecipients-content-footer-remark">
									<text>订单备注</text>
									<view class="">
										{{all_info.order_remark}}
									</view>
								</view>
								<view class="renRecipients-content-footer-price">
									<view class="freight">
										<text>运费:{{all_info.freight}}元</text>
									</view>
									<view>
										<text>共{{product_info.length}}件,</text>
										<text>小计：</text>
										<text>￥{{all_info.total_price}}元</text>
									</view>
								</view>
								
							</view>
						</view>
					</view>				
				</view>
			</view>
			<view class="consumption">
				<view class="consumptionLeft">
					<p>共<text>{{product_info.length}}</text>件</p>
				</view>
				<view class="consumptionRight">
					<view class="consumptionRight-Text">
						<p>合计: <text>￥{{all_info.order_price}}</text></p>
						<p>含运费</p>
					</view>
					<view class="consumptionRight-Button">
						<button @click="sub()">完成</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default{
		onPullDownRefresh() {//下拉刷新
			setTimeout(function () {
			}, 1000);
		},
		onLoad() {
			console.log(this.$route.query)
			let data = this.$route.query
			if(Object.keys(data).length === 0){
				console.log(1)
			}else{
				let add = JSON.parse(localStorage.getItem('purchaseInfoId'))
				if(add === null || add.length === 0){
				  localStorage.setItem('purchaseInfoId',(this.$route.query.id))
				}else{
				  localStorage.purchaseInfoId = this.$route.query.id
				}
				let add2 = JSON.parse(localStorage.getItem('purchaseInfoCheck'))
				if(add2 === null || add2.length === 0){
				  localStorage.setItem('purchaseInfoCheck',(this.$route.query.check))
				}else{
				  localStorage.purchaseInfoCheck = this.$route.query.check
				}
			}
			this.purchaseInfo.id = localStorage.purchaseInfoId
			this.purchaseInfo.check = localStorage.purchaseInfoCheck
			console.log(this.purchaseInfo)
			const token = uni.getStorageSync('token');
			if(token === undefined || token === null || token ===''){
				this.getPreparedOrdersInfo()
			}
		},
		onShow() {
			this.getname()
		},
		data(){
			return{
				d_status:null,
				all_info:[],
				product_info:[],
				receive_info:{},
				purchaseInfo:{
					id:null,
					check:null,
				},
				pid:null,
				s_customer_id:null
			}
		},
		methods:{
			async getPreparedOrdersInfo(){//获取预处理订单信息
				this.purchaseInfo.id = localStorage.purchaseInfoId
				this.purchaseInfo.check = localStorage.purchaseInfoCheck
				console.log(this.purchaseInfo)
				let [err,res] = await this.$http.post("/api/shop/getShopReplacePurchaseInfo",this.purchaseInfo);
				if(res.data.code == 200){
					this.all_info = res.data.data
					this.pid = res.data.data.product_customer_id
					this.product_info = res.data.data.product_info
					this.receive_info = res.data.data.receive_info
				}
				this.d_status = this.getQueryVariable("state")
				this.getBecomeSilent()
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
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/indentSheet/indentSheet') + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
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
							this.getPreparedOrdersInfo()
						}else if(resp1.data.data.success_message == 'not_registered'){
							this.NonSilentLogin()
						}else if(resp1.data.data.success_message == 'not_unionid'){
							this.s_customer_id = resp1.data.data.customer_id
							this.NonSilentLogin1()
						}
					} else {
						
					}
				}else{
					this.getPreparedOrdersInfo()
				}
				
			},
			// 非静默
			NonSilentLogin(){
				if(this.d_status != 2){
					 location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ config.appid +'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/indentSheet/indentSheet') + '&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
				}else{
					const code1 = this.GGetUrlParam('code')
					this.getftoken(code1)
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
				uni.setStorageSync("wx_open_id",userinfo.openid)//同步本地存储
				// 存储下来微信的信息
				uni.setStorageSync('userinfo', userinfo);
				const values = uni.getStorageSync('customer_id');
				if(userinfo){
					let [err,res] = await this.$http.post('/api/customer/wxRegister', {
							nickname:userinfo.nickname,
							headimgurl:userinfo.headimgurl,
							wx_open_id:userinfo.openid,
							pid:this.pid,
							wx_union_id:d_unionid
					});
					if(res.data.code === 200){
						console.log(res.data.data.token)
						uni.setStorageSync('token',res.data.data.token);
					}
				}
			},// wx_union_id
			NonSilentLogin1() {
				if (this.d_status != 2) {
					window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid +
						'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/indentSheet/indentSheet') +
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
			async sub(){//点击完成
				let [err,res] = await this.$http.post("/api/shop/confirmShopReplacePurchase",this.purchaseInfo);
				if(res.data.code === 200){
					uni.showToast({
						title:'订单确认成功',
						icon:'none'
					})
				}
			},
		
		}
	}
	
</script>

<style lang="scss" scoped>
	.scroll-Y{
		height: 600upx;
	}
	//选择优惠券
	.select{
		width:100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
		z-index: 100;
		position:fixed;
		top:0;
		left:0;
		.cou-box{
			width:100%;
			height: 600upx;
			background:#ffffff;
			position:fixed;
			bottom:0;
			border-top-left-radius: 30upx;
			border-top-right-radius: 30upx;
			.itemBox{
				width:100%;
				height: 600upx;
				padding: 0 20upx;
				.couponItem{
					width:100%;
					height: 144upx;
					border-bottom: 2upx solid #e6e6e6;
					display: flex;
					padding: 0 20upx;
					.item-left{
						width:68upx;
						height: 144upx;
						image{
							width:30upx;
							height: 30upx;
							margin-top:60upx;
						}
					}
					.item-right{
						width:610upx;
						height: 144upx;
						.r-top{
							width:100%;
							height: 84upx;
							font-size: 44upx;
							color: #f4af47;
							line-height: 130upx;
							text{
								margin-left: 10upx;
								font-size: 24upx;
								color:#333333;
							}
						}
						.r-bottom{
							font-size: 22upx;
							color:#888888;
							padding-top:10upx ;
							padding-left: 10upx;
						}
					}
				}
			}
			.btnn{
				width:100%;
				height: 100upx;
				background: #f16d23;
				text-align: center;
				font-size: 30upx;
				color:#ffffff;
				position: fixed;
				bottom: 0;
				left: 0;
				line-height: 100upx;
			}
		}
	}
	.hg{
		width:100%;
		height: 100upx;
	}
	.adf{
		color:#888888;
		font-size: 26upx;
	}
	.goPay{
		position:fixed;
		top:0;
		width:100vw;
		height: 100vh;
		background: rgba($color: #000000, $alpha: 0.5);
		z-index: 10;
		.bj{
			width:100vw;
			height: 160upx;
			background: #ffffff;
			position:absolute;
			bottom:0;
			border-top-left-radius:30upx ;
			border-top-right-radius:30upx ;
			display: flex;
			justify-content: space-between;
			padding:30upx 60upx;
			button{
				width:260upx;
				height: 100upx;
				line-height: 100upx;
				color:#ffffff;
				font-weight: 700;
				border-radius: 100upx;
				
			}
			.yj{
				width:260upx;
				height:100upx;
				border-radius: 100upx;
				background: #369eff;
				font-size: 26upx;
				text-align: center;
				overflow: hidden;
				color:#ffffff;
				.accountBalance{
					width:100%;
					height: 60upx;
					line-height: 90upx;
				}
				.money{
					width: 100%;
					height: 40upx;
					font-size: 20upx;
					line-height: 22upx;
					text-align: center;
				}
				&.gray{
					background: #666666;
					cursor: not-allowed;
					pointer-events:none;
				}
			}
			
			.wx{
				width:260upx;
				height:100upx;
				border-radius: 100upx;
				background:#23bc52;
				font-size: 26upx;
				text-align: center;
				overflow: hidden;
				color:#ffffff;
				line-height: 100upx;
			}
		}
	}
	.setAddress{
		width:580upx;
		font-size: 26upx;
		color:#999999;
		text-align: left;
		margin-left: 34upx;
		display: flex;
		justify-content: space-between;
	}
	.renheader{
		width:100%;
		height:100%;		
		diplay:flex;
		justify-content: center;
		align-items: center;
		position:relative;
		.renbg{
			height:100upx;
			width:100%;
			justify-content: center;
			background-image: linear-gradient(to right, #49c6fe , #369eff);
			position:fixed;
			top:0;
		}
		.renshopcar{
			height:120upx;
			width:93%;
			background:#ffffff;
			margin:0 auto;
			display:flex;
			align-items: center;
			justify-content: space-between;
			position:fixed;
			top:24upx;
			left:28upx;
			border-radius:25upx;
			box-shadow: 0px 5px 5px #eeeeee;
			img{
				width:70upx;
				height:70upx;
				margin-left:39upx;
			}
			.rencenter{	
				.toCommunication{
					margin-top:-20upx;
					.name{
						font-size:28upx;
					}
					.phone{
						font-size:24upx;
						color:#888888;
						margin-left:15upx;
					}
				}
				.toAddress{
					font-size:24upx;
					color:#444444;
					width:460upx;
					margin-top:-10upx;
				}
			}
			.rightImg{
				width:12upx;
				height:22upx;
				margin-right:20upx;
			}
		}
		.renfill{
			width:100%;
			height:64upx;
		}
		.renExpressInformation{
			height:159upx;
			width:100%;
			border-bottom:1upx solid #eeeeee;
			display:flex;
			align-items: center;
			background:#fff;
			img{
				width:56upx;
				height:56upx;
				margin-left:28upx;
			}
			.renRigthArrow{
				width:12upx;
				height:22upx;
				margin-right:28upx;
			}
		}
		.renRecipients{
			height:100%;
			width:100%;
			marign-top:200upx;
			margin-bottom:80upx;
			display:flex;
			align-items: center;
			.renRecipients-box{
				background:#fff;
				height:100%;
				margin-left:28upx;
				margin-right:28upx;
				width:100%;
				border-radius:25upx 25upx 25upx 25upx;
				.renRecipients-content{
					width:100%;
					height:100%;
					margin-left:4upx;
					.renRecipients-content-header{
						width:100%;
						min-height:223upx;
						padding-bottom: 30upx;
						display:flex;
						justify-content: space-between;
						border-bottom:1upx solid #f0f0f0;
						.leftImg{
							display: flex;
							// align-items: center;
							margin-top: 26upx;
							margin-left:16upx;
							img{
								width:160upx;
								height:160upx;
								border-radius: 14upx;
							}
						}
						.centreWord{
							width:492upx;
							padding-right: 16upx;
							.p_box{
								width:100%;
							}
							.money_box{
								margin-top:20upx;
								display: flex;
								justify-content: space-between;
							}
							.godsName{
								margin-top:26upx;
								font-size:30upx;
								color:#444444;
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
							}
							.godsWeight{
								font-size:24upx;
								color:#888888;
							}
							.godsPrice{
								font-size:28upx;
								color:#f69b16;
								// margin-top:34upx;
							}
						}
						.rightP{
							font-size: 28upx;
							// margin:134upx 23upx 0 0;
						}
					}
					.renRecipients-content-footer{
						height:100%;
						.renRecipients-content-footer-distribution{
							width:100%;
							height:83upx;
							display: flex;
							align-items: center;
							border-bottom:1upx solid #f0f0f0;
							.yf{
								width:120upx;
								height: 80upx;
								display: inline-block;
								text-align: right;
								line-height: 80upx;
							}
							text{
								font-size:26upx;
							}
							text:first-child{
								margin-left:87upx;
								color:#333333;
							}
							text:nth-child(2){
								margin-left:22upx;
								color:#888888;
							}
							text:last-child{
								margin-left:240upx;
								color:#888888;
							}
						}
						.renRecipients-content-footer-remark{
							width:100%;
							height:83upx;
							display: flex;
							align-items: center;
							border-bottom:1upx solid #f0f0f0;
							position: relative;
							text{
								font-size:26upx;
							}
							text:first-child{
								margin-left:87upx;
								color:#333333;
							}
							text:last-child{
								margin-left:22upx;
								color: #666666;
							}
							.coupon{
								margin-left:22upx;
								color:#f59d17;
								line-height:80upx ;
							}
							view{
								width:470upx;
								font-size:26upx;
								color:#888888;
								padding-left: 20upx;
							}
							image{
								width:12upx;
								height: 22upx;
								text-align: right;
								position:absolute;
								right:20upx;
								margin-top:30upx;
							}
						}
						.renRecipients-content-footer-price{
							height:90upx;
							display: flex;
							align-items: center;
							justify-content:space-between;
							border-bottom:1upx solid #f0f0f0;
							text{
								font-size:26upx;
							}
							text:first-child{
								color:#444444;
							}
							text:nth-child(2){
								margin-left:22upx;
								color:#444444;
							}
							text:last-child{
								margin-right:22upx;;
								color:#f69b16;
							}
							.freight{
								margin-left:86upx;
								text{
									color:#444444;
								}
							}
						}
						.renRecipients-content-footer-choose{
							height:100%;
							width:100%;
							.renRecipients-content-footer-choose-img{
								padding-right:20upx;
								display: flex;
								justify-content: flex-end;
								height: 76upx;
								.adss{
									color:#888888;
								}
								img{
									width:34upx;
									height:34upx;
									margin-top:22upx;
									margin-right:16upx;
								}
								p{
									margin-top:20upx;
									font-size:26upx;
									color:#444444;
								}
							}
							.renRecipients-content-footer-jinbei{
								padding-right:20upx;
								display:flex;
								justify-content: flex-end;
								height: 55upx;
								line-height: 20upx;
								img{
									margin-right:8upx;
									margin-top:-2upx;
									width:22upx;
									height:22upx;
								}
								p{
									font-size:26upx;

									color:#f69b16;
								}
							}
						}
					}
				}
			}
		}
	}
	.consumption{
		height:94upx;
		position:fixed;
		bottom:0upx;
		height:90upx;
		width:100%;
		border-top:1upx solid #b7b7b7;
		display:flex;
		justify-content: space-between;
		background:#fff;
		.consumptionLeft{
			margin-left:48upx;
			margin-top:14upx;
			p{
				font-size:26upx;
				color: #888888;
				text{
					font-size:26upx;
					color:#f2b248;
				}
			}		
		}
		.consumptionRight{
			margin-right:48upx;
			display:flex;
			align-items: center;
			.consumptionRight-Text{
				margin-right:12upx;
				
				p:first-child{
					font-size:26upx;
					color:#888888;
					text{
						color:#f59d18;
						font-size:26upx;
					}
				}
				p:last-child{
					font-size:20upx;
					margin-left:70upx;
					color:#888888;
				}
			}
			.consumptionRight-Button{
				button{
					width:124upx;
					height:64upx;
					background:#369eff;
					line-height:64upx;
					font-size:25upx;
					color:#fff;
				}
			}
		}
	}
</style>
