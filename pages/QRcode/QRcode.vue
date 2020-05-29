<template>
	<view>
		<view class="QRcode-box" v-if="isShow">
			<view class="title">
				<p>终于等到您~</p>
				<p>欢迎来到 壹口两口 商城</p>
			</view>
			<view class="d_code_box">
				<image class="apple" src="../../static/images/APP-qie12_0002_二维码kuang.png" mode=""></image>
				<view class="QRcode">
					<image :src="qrcode" mode=""></image>
				</view>
				<image v-if="isClick" class="yklk" src="../../static/images/APP-qie12_0001_中间.png" mode=""></image>
			</view>
			<view class="d_ann">
				<view class="d_img_box">
					<image src="../../static/images/APP-qie12_0000_指纹.png" mode=""></image>
				</view>
				<view class="orange">长按识别二维码</view>
				<view>获取您的专属福利</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		onLoad(option) {
			if(option.customer_id !== undefined && option.customer_id !== '' && option.customer_id !== null){
				if(option.customer_id !==undefined && option.customer_id !== '' && option.customer_id !== null){
					uni.setStorageSync('customer_id',option.customer_id);
				}
					uni.setStorageSync('codeInfo',option);
				// this.codeInfo = option
			}
			this.d_status = this.getQueryVariable("state")
			this.getBecomeSilent()
			// if(option.customer_id !==undefined && option.customer_id !== '' && option.customer_id !== null){
			// 	uni.setStorageSync('customer_id',option.customer_id);
			// }
			// this.codeInfo = option
			
		},
		onShow(){
			this.getname()
		},
		data() {
			return {
				// codeInfo:{},
				qrcode:null,
				nickname:null,
				headimgurl:null,
				userinfo:{},
				openid:null,
				isShow:false,
				isClick:false,
				d_status:null
			};
		},
		methods:{
			async createQrStrSceneCode(){
				const codeInfo = uni.getStorageSync('codeInfo');
				let [err,res] = await this.$http.post('/api/customer/createQrStrSceneCode',{
					type:codeInfo.type,
					id:codeInfo.id
				});
				if(res.data.code === 200){
					// console.log(res.data.data)
					this.qrcode = res.data.data.qrcode
					
					// setTimeout(()=>{
						this.isClick = true
					// },2000)
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
				this.openid = openid
				
				if (openid) {
					this.getWxUserInfoByUnionID()
					return
				}
				const AppId = this.appId
				const code = this.getUrlParam('code')
				const local = window.location.href
				if(code === undefined || code === null || code === ''){
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/QRcode/QRcode') + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
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
					this.openid = openid
					if (openid !== null && openid !== '' && openid !== undefined) {
						let [err1, resp1] = await uni.request({
							url:config.webUrl+"/api/customer/wxLogin",
							data: { 'wx_open_id': openid },
							method:'POST',
							header:{
								'shop':"1"
							},
						})
						if(resp1.data.data.success_message == 'success'){
							uni.setStorageSync('token',resp1.data.data.token);
							this.getWxUserInfoByUnionID()
						}else if(resp1.data.data.success_message == 'not_registered'){
							this.NonSilentLogin()
						}
					} else {
					}
				}
				
			},
			// 非静默
			NonSilentLogin(){
				// const local01 = window.location.href
				if(this.d_status != 2){
					 location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ config.appid +'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/QRcode/QRcode') + '&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
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
				console.log(res.data.data)
				uni.setStorageSync("wx_open_id",userinfo.openid)//同步本地存储
				// 存储下来微信的信息
				uni.setStorageSync('userinfo', userinfo);
				if(userinfo){
					const customer_id = uni.getStorageSync('customer_id');
					let [err,res] = await this.$http.post('/api/customer/wxRegister', {
							nickname:userinfo.nickname,
							headimgurl:userinfo.headimgurl,
							wx_open_id:userinfo.openid,
							pid:customer_id,
							wx_union_id:userinfo.unionid
					});
					if(res.data.code === 200){
						console.log(res.data.data.token)
						uni.setStorageSync('token',res.data.data.token);
						this.getWxUserInfoByUnionID()
					}
					
				}
			},
			
			async getWxUserInfoByUnionID(){
				let [err1,res1] = await this.$http.post('/api/customer/getWxUserInfoByUnionID',{
					wx_open_id:this.openid
				})
				if(res1.data.code === 200){
					const codeInfo = uni.getStorageSync('codeInfo');
					
					if(res1.data.data.userinfo.subscribe === 0){//未关注
						this.isShow = true
						this.createQrStrSceneCode()
					}else if(res1.data.data.userinfo.subscribe === 1){//已关注
						if(codeInfo.type == 1){
							uni.redirectTo({
								url: '/pages/coupon/coupon'
							});
						}else if(codeInfo.type == 2){
							uni.redirectTo({
							    url: '/pages/buy/buy?product_id=' + codeInfo.id
							});
						}else if(codeInfo.type == 3){
							uni.redirectTo({
							    url: '/pages/index/index'
							});
						}else if(codeInfo.type == 4){
							uni.redirectTo({
							    url: '/pages/share/shareLive?live_room_id=' + codeInfo.id
							});
						}else if(codeInfo.type == 5){
							uni.redirectTo({
							    url: '/pages/share/shareLive?video_id=' + codeInfo.id
							});
						}
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #ffffff;
	}
	.QRcode-box{
		width:100%;
		height:1334upx;
		.title{
			line-height: 46upx;
			width:100%;
			height: 276upx;
			text-align: center;
			padding-top: 100upx;
			font-size: 28upx;
			color:#666666;
		}
		.d_code_box{
			width:394upx;
			height: 394upx;
			margin:0 auto;
			position: relative;
			.apple{
				width:100%;
				height: 100%;
			}
			.QRcode{
				position: absolute;
				top:110upx;
				left: 84upx;
				width:226upx;
				height: 226upx;
				image{
					width:100%;
					height: 100%;
				}
			}
			.yklk{
				position: absolute;
				top:200upx;
				left: 170upx;
				width:52upx;
				height: 52upx;
			}
		}
		.d_ann{
			width:100%;
			height: 500upx;
			padding-top:120upx;
			text-align: center;
			font-size: 24upx;
			color:#666666;
			.d_img_box{
				width:160upx;
				height: 160upx;
				margin:0 auto;
				image{
					width:100%;
					height: 100%;
				}
				margin-bottom: 72upx;
			}
			.orange{
				font-size: 20upx;
				color:#e88e14;
				line-height: 40upx;
				margin-bottom:10upx;
			}
		}
		
	
	}
</style>
