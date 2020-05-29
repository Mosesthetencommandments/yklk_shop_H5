<template>
	<view>
		<view class="perfectInformation_box">
			<view class="perfectInformation">
				<view class="perfectInformation_item">
					<view class="item_left">您的姓名</view>
					<input class="item_right" type="text" @blur="getName" value="" placeholder="请输入姓名" v-if="isName"></input>
					<view class="item_right" v-else>{{d_name}}</view>
				</view>
				<view class="perfectInformation_item">
					<view class="item_left">身份证号</view>
					<input class="item_right" type="text" @blur="getIdcard" value="" placeholder="请输入身份证号" v-if="isSFZ"></input>
					<view class="item_right" v-else>
						{{d_idcard}}
					</view>
				</view>
				<view class="perfectInformation_item">
					<view class="item_left">初始密码</view>
					<input class="item_right" type="text" @blur="getPassword" value="" password="true" placeholder="请输入密码" v-if="isPassword"></input>
				</view>
				<view class="perfectInformation_item">
					<view class="item_left">联系方式</view>
					<input class="item_right" type="number" @blur="getPhone" value="" placeholder="请输入手机号" v-if="isPhone"></input>
					<view class="item_right" v-else>
						{{d_phone}}
					</view>
				</view>
				<view class="perfectInformation_item" v-if="isCode">
					<view class="item_left">验证码</view>
					<view class="d_box">
						<input class="d_item_right" type="number" @blur="getCode" placeholder="请输入验证码" value=""></input>
						<view class="Code" v-if="!isSShow" @tap="getCheckNum">获取验证码</view>
						<view class="validation" size="mini" v-else>已获取({{codetime}}s)</view>
					</view>
				</view>
				<view class="submit" @click="open">
					提交
				</view>
			</view>
		</view>
		<!-- 弹出 -->
		<view class="confirmationMessage_box" v-if="isShow" @click.stop="isShow = false">
			<view class="confirmationMessage" @click.stop="isShow = true">
				<p>您的信息是</p>
				<view class="">您的姓名：{{d_name}}</view>
				<view class="">联系方式：{{d_phone}}</view>
				<view class="">身份证号：{{d_idcard}}</view>
				<view class="">初始密码：{{d_password}}</view>
				<view class="" @click.stop="register">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js'
	export default {
		onLoad(option) {
			if(option.customer_id !== undefined && option.customer_id !== '' && option.customer_id !== null){
				uni.setStorageSync('pid', option.customer_id);
			}
			if(option.distribution_level_id !== undefined && option.distribution_level_id !== '' && option.distribution_level_id !== null){
				uni.setStorageSync('distribution_level_id', option.distribution_level_id);
			}
			this.d_status = this.getQueryVariable("state")
			this.getBecomeSilent()
			let token = uni.getStorageSync("token")
			if(token !== undefined && token !== null && token !== ''){
				this.getCumstomerInfo()
			}
			
		},
		onShow(){
			this.getname()
		},
		data() {
			return {
				isShow:false,
				d_status:null,
				isName:false,
				isPhone:false,
				isSFZ:false,
				isPassword:true,
				isCode:false,
				d_name:null,
				d_phone:null,
				d_idcard:null,
				d_password:null,
				d_code:null,
				isSShow:false,
				codetime:"60",
				d_customer_id:null,
				GetPhoneNumber:null,
				s_customer_id:null
			};
		},
		methods:{
			open(){
				if(this.d_name !== null && this.d_idcard !== null && this.d_password !== null && this.d_phone !== null){
					this.isShow = true
				}else{
					uni.showToast({title:'请填写信息',icon:'none'})
				}
			},
			async getCumstomerInfo() { //获取用户个人信息
				let [err, res] = await this.$http.post('/api/customer/getCustomerInfo');
				if (res.data.code === 200) {
					console.log(res.data.data)
					let list = res.data.data
					this.GetPhoneNumber = list.phone
					if(list.truename ===null || list.truename === undefined || list.truename===''){
						this.isName = true
					}else{
						this.d_name = list.truename
					}
					if(list.phone === null || list.phone === undefined || list.phone === ''){
						this.isPhone = true
						this.isCode = true
					}else{
						this.d_phone = list.phone
					}
					if(list.idcard === null || list.idcard === undefined || list.idcard ===''){
						this.isSFZ = true
					}else{
						this.d_idcard = list.idcard
						console.log(this.d_idcard)
					}
					this.d_customer_id = list.customer_id
				}
			},
			getName(e){//获取姓名
				this.d_name = e.detail.value
			},
			getIdcard(e){//获取身份证
				this.d_idcard = e.detail.value
			},
			getPassword(e){//获取密码
				this.d_password = e.detail.value
			},
			getPhone(e){//获取手机号
				this.d_phone = e.detail.value
			},
			getCode(e){
				this.d_code = e.detail.value
			},
			async getCheckNum(){//点击获取验证码执行
				let [err,res] = await this.$http.post('/api/customer/sendSmsCode',{phone:this.d_phone,type:"register"});
				if(res.data.code == 200){
					this.isSShow=true
					//发送成功，开启倒计时
					this.codetime= 60;
					let timer = setInterval(()=>{
						this.codetime--;
						if(this.codetime === 0){
							this.isSShow = false
							clearInterval(timer)
						}
					},1000)
				}
			},
			async register(){//注册成为代理
				if(this.GetPhoneNumber !== '' && this.GetPhoneNumber !== undefined && this.GetPhoneNumber !== null){
					this.d_phone = ''
				}
				const pid = uni.getStorageSync('pid');
				const distribution_level_id = uni.getStorageSync('distribution_level_id'); 
				let [err,res] = await this.$http.post('/api/agent/register',{
					customer_id:this.d_customer_id,
					truename:this.d_name,
					phone:this.d_phone,
					idcard:this.d_idcard,
					password:this.d_password,
					sms_code:this.d_code,
					pid:pid,
					distribution_level_id:distribution_level_id
				});
				if(res.data.code == 200){
					this.isShow = false
					uni.removeStorageSync('pid');
					uni.removeStorageSync('distribution_level_id');
					uni.redirectTo({
					    url: '/pages/cloudWarehouse/warehouseLogin'
					});
				}
			},
			getQueryVariable(variable) { //获取URL中的state
				let query = window.location.search.substring(1);
				let vars = query.split("&");
				for (let i = 0; i < vars.length; i++) {
					let pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return (false);
			},
			//静默登录
			getBecomeSilent() {
				const openid = uni.getStorageSync('wx_open_id');
				if (openid) {
					return
				}
				const AppId = this.appId
				const code = this.getUrlParam('code')
				const local = window.location.href
				if (code === undefined || code === null || code === '') {
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid +
						'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/cloudWarehouse/perfectInformation') +
						'&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
				} else {
					this.code = code
					this.getOpenId(code)
				}
			},
			//获取code的方法
			getUrlParam(name) {
				console.log("获取code")
				let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				let r = window.location.search.substr(1).match(reg)
				if (r != null) return unescape(r[2])
				return null
			},
			async getOpenId(code) {
				let [err, res] = await this.$http.post('/api/customer/getCustomerWxOpenId', {
					code: code
				})
				if (res.data.code === 200) {
					let datas = res.data.data.openid
					this.openid = datas
					uni.setStorageSync("wx_open_id", this.openid) //同步本地存储
					this.getname()
				}
			},
			async getname() {
				let token = uni.getStorageSync("token")
				if (token === '' || token === undefined || token === null) {
					const openid = uni.getStorageSync('wx_open_id');
					if (openid !== null && openid !== '' && openid !== undefined) {
						let [err1, resp1] = await uni.request({
							url: config.webUrl + "/api/customer/wxLogin",
							data: {
								'wx_open_id': openid
							},
							method: 'POST',
							header: {
								'shop': "1"
							},
						})
						console.log(resp1)
						if (resp1.data.data.success_message == 'success') {
							uni.setStorageSync('token', resp1.data.data.token);
						} else if (resp1.data.data.success_message == 'not_registered') {
							this.NonSilentLogin()
						} else if(resp1.data.data.success_message == 'not_unionid'){
							this.s_customer_id = resp1.data.data.customer_id
							this.NonSilentLogin1()
						} else if (resp1.data.code !== 200) {
							uni.showToast({title: resp1.data.errstr,icon: 'none'});
						}
					} else {
			
					}
				}
			},
			// 非静默
			NonSilentLogin() {
				// const local01 = window.location.href
				if (this.d_status != 2) {
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid +
						'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/cloudWarehouse/perfectInformation') +
						'&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
				} else {
					const code1 = this.GGetUrlParam('code')
					this.getftoken(code1)
				}
			},
			GGetUrlParam(name) {
				let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				let r = window.location.search.substr(1).match(reg)
				if (r != null) return unescape(r[2])
				return null
			},
			//获取非静默登录的token
			async getftoken(code1){
				let [err,res] = await this.$http.post('/api/customer/getWxUserInfo', {code:code1})
				let userinfo = res.data.data.userinfo
				let d_unionid = res.data.data.userinfo.unionid
				uni.setStorageSync("wx_open_id",userinfo.openid)//同步本地存储
				// 存储下来微信的信息
				const values = uni.getStorageSync('pid');
				if(userinfo){
					let [err,res] = await this.$http.post('/api/customer/wxRegister', {
							nickname:userinfo.nickname,
							headimgurl:userinfo.headimgurl,
							wx_open_id:userinfo.openid,
							pid:values,
							wx_union_id:d_unionid
					});
					if(res.data.code === 200){
						uni.setStorageSync('token',res.data.data.token);
					}
					
				}
				
			},
			// wx_union_id
			NonSilentLogin1() {
				if (this.d_status != 2) {
					window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid +
						'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/cloudWarehouse/perfectInformation') +
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
.perfectInformation_box{
	width:100vw;
	height: 100vh;
	background: #ffffff;
	padding: 60upx 68upx;
	.perfectInformation{
		width:100%;
		.perfectInformation_item{
			width:100%;
			height: 90upx;
			border-bottom: 2upx solid #f6f6f6;
			display: flex;
			justify-content: space-between;
			line-height: 88upx;
			font-size: 28upx;
			.item_left{
				width:216upx;
				height:88upx;
				color:#6b7072;	
			}
			.item_right{
				width:398upx;
				height: 88upx;
				color:#5b5b5b;
				font-size:24upx ;
			}
			.d_box{
				width:398upx;
				height: 88upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.d_item_right{
				width:200upx;
				height: 88upx;
				color:#5b5b5b;
				font-size:24upx ;
				// background: #007AFF;
			}
			.validation{
				width:166upx;
				height: 50upx;
				background: #e5e5e5;
				line-height: 50upx;
				text-align: center;
				font-size: 28upx;
				color:#6c7073;
				border-radius: 10upx;
			}
			.Code{
				width:166upx;
				height: 50upx;
				background: #e5e5e5;
				line-height: 50upx;
				text-align: center;
				font-size: 28upx;
				color:#6c7073;
				border-radius: 10upx;
			}
		}
		.submit{
			width:90%;
			height: 88upx;
			background-color: #53aefc;
			text-align: center;
			line-height: 88upx;
			color: #fff;
			border-radius: 20upx;
			position: absolute;
			left:50%;
			bottom:50upx;
			margin-left: -45%;
			
		}
	}
}
.confirmationMessage_box{
	width:100vw;
	height: 100vh;
	background: rgba(0,0,0,.5);
	position:fixed;
	left:0;top:0;
	display: flex;
	justify-content: center;
	align-items: center;
	.confirmationMessage{
		width:512upx;
		height: 600upx;
		background:#fff;
		padding:90upx 78upx;
		border-radius: 30upx;
		p{font-size: 34upx;color:#000;}
		view{
			font-size: 24upx;
			color:#737272;
			line-height: 58upx;
		}
		view:last-child{
			width:188upx;
			height: 54upx;
			background: #4ac3ee;
			line-height: 54upx;
			text-align: center;
			border-radius: 40upx;
			margin:50upx auto;
			color:#fff;
			letter-spacing:8upx;
		}
	}
}
</style>
