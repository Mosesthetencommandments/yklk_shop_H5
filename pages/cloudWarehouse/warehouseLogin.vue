<template>
	<view>
		<!-- <view class="warehouseLogin_box">
			<view class="warehouseLogin">
				<input type="text" value="" placeholder="账号" @blur='getPhone' maxlength='11' />
				<input type="text" value="" placeholder="密码" @blur='getPassword' maxlength='18'/>
				<button type="primary" @click="goCloudWarehouse">登录</button>
			</view>
		</view> -->
		<view class="login-content">
				<view class="topImg">
					<view class="">
						<img src="../../static/images/qie_0000_登录-人.png" mode=""></img>
						<view class="">登录</view>
					</view>
				</view>
				<view class="loginlist">
					<view class="username">
						<view class="top">
							<img src="../../static/images/qie_0004_手机.png" alt="">
							<text>手机号</text>
						</view>
						<view class="usernameInput">
							<input type="text" @blur.stop="getPhone" maxlength='11' />
						</view>
					</view>
					<view class="password">
						<view class="top">
							<img src="../../static/images/qie_0003_密码.png" alt="">
							<text>密码</text>
						</view>
						<view class="passwordInput">
							<input :type="inputType" :value="Password" @blur='getPassword' maxlength='18' />
							<img src="../../static/images/qie_0002_del删除.png" alt="" class="img1" @click="removePassword">
							<img src="../../static/images/qie_0005_密码可见.png" v-if="isEye" alt="" class="img2" @click="showPassword">
							<img src="../../static/images/qie_0005_密码不可见.png" alt="" v-else class="img2" @click="showPassword">
							
						</view>
					</view>
					<view class="forgetPassword">
						<!-- <text>忘记密码?</text> -->
					</view>
					<view class="register" @click="goCloudWarehouse">
						<text>登录</text>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		onLoad() {
			uni.removeStorageSync('warehouseToken');
			this.getBecomeSilent()
		},
		onShow() {
			// this.getname()
		},
		data() {
			return {
				openid:null,
				code:null,
				Phone:null,
				Password:'',
				isEye:true,
				inputType:'password'
			};
		},
		methods: {
			showPassword(){//控制密码显示隐藏
				if(this.isEye){
					this.isEye = false
					this.inputType = 'text'
				}else{
					this.isEye = true
					this.inputType = 'password'
				}
			},
			getPhone(e){//获取手机号
				this.Phone = e.detail.value
			},
			getPassword(e){//获取密码
				this.Password = e.detail.value
			},
			removePassword(){
				this.Password = ''
			},
			//静默登录
			getBecomeSilent() {
				const openid = uni.getStorageSync('wx_open_id');
				if (openid) {
					return
				}
				const code = this.getUrlParam('code')
				const local = window.location.href
				if (code === undefined || code === null || code === '') {
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid +
						'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/cloudWarehouse/warehouseLogin') +
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
			getOpenId(code) {
				uni.request({
					url: config.webUrl + "/api/customer/getCustomerWxOpenId",
					data: {
						'code': code
					},
					method: 'POST',
					header: {
						'shop': "1"
					},
					success: (res) => {
						if (res.data.code == 200) {
							let datas = res.data.data.openid
							this.openid = datas
							uni.setStorageSync("wx_open_id", this.openid) //同步本地存储
							console.log(this.openid)
						}
					}
				})
			},
			goCloudWarehouse(){//登录接口
				const openid = uni.getStorageSync('wx_open_id');
				uni.request({
					url: config.webUrl + "/api/agent/login",
					data: {
						'phone': this.Phone,
						'password':this.Password,
						'wx_open_id':openid
					},
					method: 'POST',
					header: {
						'shop': "1"
					},
					success: (res) => {
						if (res.data.code == 200) {
							uni.setStorageSync('warehouseToken', res.data.data.token);
							uni.redirectTo({
								url:'../../pages/cloudWarehouse/cloudWarehouse'
							});
						}else{
							uni.showToast({title:res.data.errstr,icon:'none'})
						}
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
.login-content{
		width:100%;
		height:100vh;
		background:url(../../static/images/登录页面.jpg) no-repeat;
		background-size:cover;
		.topImg{
			width:100%;
			height:342upx;
			display: flex;
			align-items: center;
			justify-content: center;
			img{
				width:134upx;
				height:142upx;
				margin:0 auto;
			}
			view{
				color:#fff;
				font-weight: 600;
				text-align: center;
				font-size: 38upx;
				margin-top:20upx;
			}
		}
		.loginlist{
			width:652upx;
			height:622upx;
			background: #FFFFFF;
			// background: #007AFF;
			margin:0 auto;
			border-radius: 20upx 20upx 20upx 20upx;
			box-shadow: 0px 10px 2px #6ca5f2;
			.username{
				width:570upx;
				// height:100upx;
				margin:0 auto;
				border-bottom: 1px solid #a1b4f8;
				padding-top:60upx;
				// background: #00B26A;
				.top{
					width:100%;
					height:38upx;
					position: relative;
					display: flex;
					// background: #007AFF;
					img{
						position: absolute;
						top:0;
						width:16upx;
						height:24upx;
					}
					text{
						position: absolute;
						top:0;
						font-size:24upx;
						margin-left:30upx;
						color:#496fee;
						line-height:1;
					}
				}
				.usernameInput{
					width:100%;
					height:40upx;
					margin-top:16upx;
					padding-bottom:20upx;
					display: flex;
					input{
						height:22upx;
						font-size:22upx;
						color: #496fee;
						width:485upx;
					}
					img{
						width:24upx;
						height:24upx;
					}
				}
			}
			.password{
				width:570upx;
				// height:100upx;
				margin:0 auto;
				border-bottom: 1px solid #a1b4f8;
				padding-top:50upx;
				.top{
					width:100%;
					height:38upx;
					position: relative;
					display: flex;
					img{
						position: absolute;
						top:0;
						width:16upx;
						height:24upx;
					}
					text{
						position: absolute;
						top:0;
						font-size:24upx;
						margin-left:30upx;
						color:#496fee;
						line-height:1;
					}
				}
				.passwordInput{
					width:100%;
					height:40upx;
					margin-top:16upx;
					padding-bottom:20upx;
					display: flex;
					input{
						height:22upx;
						font-size:22upx;
						color: #496fee;
						width:485upx;
					}
					.img1{
						width:24upx;
						height:24upx;
					}
					.img2{
						width:24upx;
						height:24upx;
						margin-left:20upx;
					}
				}
			}
			.forgetPassword{
				margin-right:54upx;
				text-align: right;
				text{
					font-size:22upx;
					color:#6884f2;
				}
			}
			.register{
				margin:0 auto;
				margin-top:60upx;
				width:570upx;
				height:72upx;
				background:#3e9beb;
				border-radius: 20upx 20upx 20upx 20upx;
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					font-size:24upx;
					color:#FFFFFF;
				}
			}
		}
		.bottomImg{
			width:100%;
			height:342upx;
			img{
				width:100%;
				height:100%;
			}
		}

	}
</style>
