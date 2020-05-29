<template>
	<view>
		<view class="img_box">
			<img :src="d_img" alt="" :style="imgInfo">
			<view 
				v-if="isSh"
				class="ClickCopyLink"
				@click.stop="wi"
				v-clipboard:copy="copyText"    
				v-clipboard:success="onCopy"
			>生成链接发送
			</view>
			<input class="wer" type="text" :value="copyText" />
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		onLoad(optaion){
			this.d_status = this.getQueryVariable("state")
			this.getBecomeSilent()
			this.getCumstomerInfo()
			uni.getSystemInfo({
			    success: res => {
					this.imgInfo.width = res.windowWidth + "px"
					this.number = 750 / res.windowWidth
					this.imgInfo.height  = 1180 / this.number + "px"
			    }
			});
		},
		onShow(){
			this.getname()
		},
		data() {
			return {
				d_status:null,
				d_img:null,
				customer_id:null,
				copyText:null,
				isSh:false,
				imgInfo:{
					width:null,
					height:null,
				},
				s_customer_id:null
			};
		},
		methods:{
			wi(){
				this.copyText = null
				this.copyText = config.webUrl1 + '/#/pages/CommunityToShare/CustomerPosters?pid=' + this.customer_id
				console.log(this.copyText)
			},
			onCopy(e){
				uni.showToast({
					icon:'none',
					title:'生成链接成功'
				})
			},
			getActivityPoster(){
				const token = uni.getStorageSync('token');
				uni.request({
					url: config.webUrl + '/api/customer/getActivityPoster', //仅为示例，并非真实接口地址。
					data: {
						type:1,
						url:config.webUrl1 + '/#/pages/CommunityToShare/CustomerPosters?pid=' + this.customer_id 
					},
					method:'POST',
					header: {
						'shop':"1",
						'Authorization':token
					},
					success: (res) => {
						if(res.data.code == 200){
							this.d_img = res.data.data
							this.isSh = true
						} else if(res.data.code == 44){
							
							this.getBecomeSilent()
						}
					}
				})
				// let [err,res] = await this.$http.post('/api/customer/getActivityPoster',{
				// 	type:1,
				// 	url:config.webUrl1 + '#/pages/CommunityToShare/CustomerPosters?pid=' + this.customer_id 
				// })
				// if(res.data.code == 200){
				// 	this.d_img = res.data.data
				// }
			},
			getCumstomerInfo() { //获取用户个人信息
				const token = uni.getStorageSync('token');
				uni.request({
					url: config.webUrl + '/api/customer/getCustomerInfo', 
					method:'POST',
					header: {
						'shop':"1",
						'Authorization':token
					},
					success: (res) => {
						if (res.data.code === 200) {
							this.customer_id = res.data.data.customer_id
							this.getActivityPoster()
						}else if(res.data.code === 44){
							// let token = '';
							// uni.setStorageSync('token', token);
							// let wx_open_id = ''
							// uni.setStorageSync('wx_open_id', wx_open_id);
							const value = uni.getStorageSync('token');
							console.log(value + '111')
							this.getBecomeSilent()
						}
					}
				})
				// let [err, res] = await this.$http.post('/api/customer/getCustomerInfo');
				// if (res.data.code === 200) {
				// 	this.customer_id = res.data.data.customer_id
				// 	this.getActivityPoster()
				// }
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
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/CommunityToShare/CommunityToShare') + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
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
			getOpenId (code) {
				const token = uni.getStorageSync('token');
				uni.request({
					url: config.webUrl + '/api/customer/getCustomerWxOpenId', 
					data: {
						code:code,
					},
					method:'POST',
					header: {
						'shop':"1",
						'Authorization':token
					},
					success: (res) => {
						if (res.data.code === 200) {
							let datas = res.data.data.openid
							this.openid = datas
							uni.setStorageSync("wx_open_id",this.openid)//同步本地存储
							console.log(this.openid)
							this.getname()
						}else if(res.data.code == 44){
							this.getBecomeSilent()
						}
					}
				})
				// let [err,res] = await this.$http.post('/api/customer/getCustomerWxOpenId',{code:code})
				// console.log(res)
				// if (res.data.code === 200) {
				// 	let datas = res.data.data.wx_open_id
				// 	this.openid = datas
				// 	uni.setStorageSync("wx_open_id",this.openid)//同步本地存储
				// 	console.log(this.openid)
				// 	this.getname()
				// }
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
						}else if(resp1.data.data.success_message == 'not_registered'){
							this.NonSilentLogin()
						}else if(resp1.data.data.success_message == 'not_unionid'){
							this.s_customer_id = resp1.data.data.customer_id
							this.NonSilentLogin1()
						}
					} else {
						
					}
				}else{
					this.getCumstomerInfo()
				}
				
			},
			// 非静默
			NonSilentLogin(){
				// const local01 = window.location.href
				if(this.d_status != 2){
					 location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ config.appid +'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/CommunityToShare/CommunityToShare') + '&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
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
			getftoken(code1){
				const token = uni.getStorageSync('token');
				uni.request({
					url: config.webUrl + '/api/customer/getWxUserInfo', 
					data: {
						code:code1,
					},
					method:'POST',
					header: {
						'shop':"1",
						'Authorization':token
					},
					success: (res) => {
						let userinfo = res.data.data.userinfo
						let d_unionid = res.data.data.userinfo.unionid
						console.log(res.data.data)
						uni.setStorageSync("wx_open_id",userinfo.openid)//同步本地存储
						// 存储下来微信的信息
						uni.setStorageSync('userinfo', userinfo);
						console.log(userinfo)
						const values = uni.getStorageSync('customer_id');
						// console.log(values)
						if(userinfo){
							uni.request({
								url: config.webUrl + '/api/customer/wxRegister', //仅为示例，并非真实接口地址。
								data: {
									nickname:userinfo.nickname,
									headimgurl:userinfo.headimgurl,
									wx_open_id:userinfo.openid,
									wx_union_id:d_unionid
								},
								method:'POST',
								header: {
									'shop':"1",
									'Authorization':token
								},
								success: (res) => {
									uni.setStorageSync('token',res.data.data.token);
									this.getCumstomerInfo()
								}
							})
						}	
					}
				})
			},
			// wx_union_id
			NonSilentLogin1(){
				// const local01 = window.location.href
				if(this.d_status != 2){
					 location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ config.appid +'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/CommunityToShare/CommunityToShare') + '&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
				}else{
					const code1 = this.GGetUrlParam1('code')
					this.getftoken1(code1)
					console.log(code1)
				}
			},
			GGetUrlParam1(name){
				let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				let r = window.location.search.substr(1).match(reg)
				if(r != null) return unescape(r[2])
				return null
			},
			//获取非静默登录的token
			 getftoken1(code1){
				 uni.request({
					url:config.webUrl+"/api/customer/getWxUserInfo",
					data: {'code':code1},
					method:'POST',
					header:{
						'shop':"1"
					},
					success: (res) => {
						let d_unionid = res.data.data.userinfo.unionid
						uni.request({
							url:config.webUrl+"/api/customer/updateWxUnionId",
							data: {'wx_union_id':d_unionid,'customer_id':this.s_customer_id},
							method:'POST',
							header:{
								'shop':"1"
							},
							success: (res) => {
								
							}
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.img_box{
		width:100%;
		height: 100vh;
		position: relative;
		display: flex;
		justify-content: center;
		.ClickCopyLink{
			width:180upx;
			height: 60upx;
			background: #eeeeee;
			border-radius: 8upx;
			position: absolute;
			bottom:30upx;
			font-size: 24upx;
			text-align: center;
			line-height: 60upx;
			color:#444444;
		}
		.wer{
			display: none;
		}
	}
	.interlinkage{
		width:200upx;
		height:50upx;
		background: #e3e3e3;
		font-size: 24upx;
		line-height: 50upx;
		border-radius: 8upx;
		color:#444444;
		text-align: center;
		
		position:absolute;
		bottom:40upx;
		
	}
	.optionInput{
		width:10upx;
		height: 10upx;
		display: none;
	}
</style>
