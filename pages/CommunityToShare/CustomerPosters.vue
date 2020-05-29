<template>
	<view>
		<view class="img_box">
			<!-- <image :src="d_img" mode="" class="d_img"></image> -->
			<img :src="d_img" alt="" :style="imgInfo">
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		onLoad(optaion){
			if(optaion.pid !== undefined && optaion.pid !== '' && optaion.pid !== null){
				uni.setStorageSync('pid', optaion.pid);
			}
			this.d_status = this.getQueryVariable("state")
			this.getBecomeSilent()
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
				d_userinfo:{},
				d_pid:null,
				number:null,
				imgInfo:{
					width:null,
					height:null,
				},
				s_customer_id:null
			};
		},
		methods:{
			 getCumstomerInfo() { //获取用户个人信息
				const token = uni.getStorageSync('token');
				uni.request({
					url:config.webUrl+"/api/customer/getCustomerInfo",
					method:'POST',
					header:{
						'shop':"1",
						'Authorization':token
						//TODO
					},
					success: (res) => {
						if(res.data.code == 200){
							this.customer_id = res.data.data.customer_id
							this.getActivityPoster()
						}
					}
				})
			},
		
			 getActivityPoster(){
				const ppid = uni.getStorageSync('pid');
				const token = uni.getStorageSync('token');
				uni.request({
					url:config.webUrl+"/api/customer/getActivityPoster",
					data: {
						'type':2,
						'url':config.webUrl1 + '/#/pages/CommunityToShare/GroupOfQRcode?pid=' + this.customer_id + '&ppid=' + ppid
					},
					method:'POST',
					header:{
						'shop':"1",
						'Authorization':token
						//TODO
					},
					success: (res) => {
						if(res.data.code == 200){
							this.d_img = res.data.data
						}
					}
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
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/CommunityToShare/CustomerPosters') + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
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
				uni.request({
					url:config.webUrl+"/api/customer/getCustomerWxOpenId",
					data: {'code':code},
					method:'POST',
					header:{
						'shop':"1"
					},
					success: (res) => {
						if(res.data.code == 200){
							let datas = res.data.data.openid
							this.openid = datas
							uni.setStorageSync("wx_open_id",this.openid)//同步本地存储
							console.log(this.openid)
							this.getname()
						}
					}
				})
			},
			 getname(){
				let token = uni.getStorageSync("token")
				if (token === '' || token === undefined || token === null) {
					const openid = uni.getStorageSync('wx_open_id');
					if (openid !== null && openid !== '' && openid !== undefined) {
						uni.request({
							url:config.webUrl+"/api/customer/wxLogin",
							data: { 'wx_open_id': openid },
							method:'POST',
							header:{
								'shop':"1"
							},
							success: (resp1) => {
								if(resp1.data.data.success_message == 'success'){
									uni.setStorageSync('token',resp1.data.data.token);
									this.getCumstomerInfo()
								}else if(resp1.data.data.success_message == 'not_registered'){
									this.NonSilentLogin()
								}else if(resp1.data.data.success_message == 'not_unionid'){
									this.s_customer_id = resp1.data.data.customer_id
									this.NonSilentLogin1()
								}
							}
						})	
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
					 location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ config.appid +'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/CommunityToShare/CustomerPosters') + '&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
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
				uni.request({
					url:config.webUrl+"/api/customer/getWxUserInfo",
					data: {'code':code1},
					method:'POST',
					header:{
						'shop':"1"
					},
					success: (res) => {
						let userinfo = res.data.data.userinfo
						let d_unionid = res.data.data.userinfo.unionid
						uni.setStorageSync("wx_open_id",userinfo.openid)//同步本地存储
						// 存储下来微信的信息
						uni.setStorageSync('userinfo', userinfo)
						if(userinfo){
							const pid = uni.getStorageSync('pid');
							uni.request({
								url:config.webUrl+"/api/customer/wxRegister",
								data: {
									'nickname':userinfo.nickname,
									'headimgurl':userinfo.headimgurl,
									'wx_open_id':userinfo.openid,
									'pid':pid,
									'wx_union_id':d_unionid
								},
								method:'POST',
								header:{
									'shop':"1"
								},
								success: (res) => {
									if(res.data.code === 200){
										console.log(res.data.data.token)
										uni.setStorageSync('token',res.data.data.token);
										this.getCumstomerInfo()
									}
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
					 location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ config.appid +'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/CommunityToShare/CustomerPosters') + '&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
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
		width:100vw;
		height: 100vh;
		display:flex;
		justify-content: center;
		align-items: center;
	}
</style>
