<template>
	<view>
		<view class="box">
			<view class="content">
				<view class="content-title">
					<view>完善手机号</view> 
					<!-- <view class="zhuc">未注册手机号将直接为您注册</view> -->
				</view>
				<view class="content-center">
					<input class="input-s" type="text" placeholder="请输入手机号" maxlength="11" @blur="getPhone">
					<input class="input-x" type="text" placeholder="请输入验证码" maxlength="4" @blur="getsms_code">
					<view class="validation" size="mini" v-if="!isShow" @tap="getCheckNum" >获取验证码</view>
					<view class="validation1" size="mini" v-else>已获取({{codetime}}s)</view>
				</view>
				<view class="invitationCode" v-if="show">
					<input class="input-code" type="text" placeholder="输入邀请码(非必填)">
				</view>
				<view class="content-footer">
					<button @click="sigiIn">确定</button>
					<!-- <view class="agreement">
						<view class="diamonds">
							<image @click="add" v-if="isClick" src="../../static/images/APP-qie3_0001_dui-8.png" mode="" />
							<image v-else @click="isClick = !isClick" src="" mode=""></image>
						</view>
						<view class="me" >我已阅读并同意</view>
						<view class="orange">《用户服务协议》</view>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		beforeMount() {
			try {
			    const value = uni.getStorageSync('wx_open_id');
			    if (value) {
			        console.log(value);
					this.openid = value
			    }
			} catch (e) {
			    // error
			}
			
		},
		onPullDownRefresh() {//下拉刷新
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		computed:{
			...mapState({
				loginInfo:state => state.userInfo.state
			})
		},
		data() {
			return {
				isClick:false,
				isShow:false,
				codetime:"60",
				show:false,
				isClick:true,
				phone:'',
				sms_code:'',
				openid:null,
				hwh:'',
				id:'',
				customer_id:'',
				pid:''
				
			}	
		},
		onLoad() {
			 const values = uni.getStorageSync('customer_id');
			 this.pid = values
		},
		methods:{
			//拿到验证码
			getsms_code(e){
				this.sms_code = e.detail.value
			},
			//拿到手机号
			getPhone(e){
				let a = /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(Number(e.detail.value))
				if(!a){
					uni.showToast({
					    title: '手机号错误',
					    duration: 1500,
						icon:'none'
					});
					this.isClick = false
					return false
				}else{
					this.isClick = true
					this.phone = e.detail.value
				}
				typeof(Number(this.phone))
				this.phone = e.detail.value
			},
			//点击获取验证码执行
			async getCheckNum(){
				if(this.isClick === true){
					let [err,res] = await this.$http.post('/api/customer/sendSmsCode',{phone:this.phone,type:"register"});
					if(res.data.code == 200){
						this.isShow=true
						//发送成功，开启倒计时
						this.codetime= 60;
						let timer = setInterval(()=>{
							this.codetime--;
							if(this.codetime === 0){
								this.isShow = false
								clearInterval(timer)
							}
						},1000)
					}
				}
				
			},
			//点击注册执行
			sigiIn(){
				if(!this.phone && this.sms_code){
					uni.showToast({
					    title: '请正确输入',
					    duration: 1000,
						icon:'none'
					});
				}else{
					this.checkphone()
				}
				
			},
			async getLostorageInfo(){
				this.shopgods = JSON.parse(localStorage.getItem("gods"))
				console.log(this.shopgods)
				let [err,res] = await this.$http.post('/api/cart/syncUserCart',{shop_goods_list:this.shopgods});
				if(res.data.code === 200){
					console.log(1111)
				}else{
					console.log(res.data.errstr)
				}
			},
			async checkphone(){
				let [err,res] = await this.$http.post('/api/customer/updateCustomerPhone',{
					phone:this.phone,
					sms_code:this.sms_code
				});
				if(res.data.code === 200 ){
					if(res.data.data.phone !== '' || res.data.data.phone !== undefined || res.data.data.phone !== null){
						uni.showToast({
							title: '完善手机号成功',
							duration: 600,
							icon:'none'
						});
						setTimeout(() => {
						      // uni.navigateBack({
						      //  delta: 1
						      // });
							  uni.setStorageSync('token', '');
							  uni.redirectTo({
							      url: '/pages/index/index'
							  });
						},500)
					}
				}
			},
			add(){
				this.isClick = !this.isClick
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background:#ffffff;
	}
	.diamonds{
		width:26upx;
		height:26upx;
		border:1px solid #ababab;
		margin-top: 18upx;
		position: relative;
		image{
			width:120%;
			height: 120%;
			position: absolute;
			top:-6upx;
		}
	}
	.invitationCode{
		width:100%;
		height: 66upx;
		margin-top:64upx;
		input{
			width:70%;
			height: 63upx;
			border-bottom:1px solid #b6b6b6;
			font-size: 24upx;
		}
	}
.box{
	width:100%;
	height: 100%;
	// background: #007AFF;
	padding:0 94upx;
	.content{
		width:100%;
		height: 860upx;
		// background: #09BB07;
		.content-title{
			margin-top: 50upx;
			width:100%;
			height: 180upx;
			padding-top:20upx;
			// line-height: 180upx;
			// background: #333333;
			font-size: 44upx;
			color:#339eff;
			font-weight: 900;
			.zhuc{
				font-size:20upx ;
				color: #888888;
				font-weight: 400;
			}
		}
		.content-center{
			width:100%;
			height: 296upx;
			// background: #E80080;
			overflow: hidden;
			position: relative;
			input{
				width:100%;
				height: 63upx;
				border-bottom:1px solid #b6b6b6;
				font-size: 24upx;
			}
			.input-s{
				margin-top:109upx;
				margin-bottom: 65upx;
			}
			.input-x{
				
			}
			.validation{
				width:156upx;
				height: 44upx;
				border-radius:20upx;
				background: #e5f1ff;
				border:2upx solid #6eace7;
				position:absolute;
				right:0;
				bottom:12upx;
				text-align: center;
				line-height: 40upx;
				font-size: 20upx;
				color:#999999;
			}
			.validation1{
				width:156upx;
				height: 44upx;
				border-radius:20upx;
				background: #f2f2f2;
				border:2upx solid #c2c2c2;
				position:absolute;
				right:0;
				bottom:12upx;
				text-align: center;
				line-height: 40upx;
				font-size: 20upx;
				color:#999999;
			}
		}
		.content-footer{
			width:100%;
			height: 144upx;
			margin-top:140upx;
			button{
				border-radius: 50upx;
				height: 86upx;
				color:#ffffff;
				background: #369eff;
				font-size: 36upx;
				line-height: 86upx;
			}
			.agreement{
				width:100%;
				height: 100%;
				display: flex;
				line-height: 58upx;
				justify-content: center;
				label{
					width:34upx;
					height: 100%;
					position:relative;
					image{
						width:30upx;
						height: 30upx;
						position:absolute;
						top:12upx;left:10upx;
					}
				}
				.me{
					color:#999999;
					font-size: 20upx;
					padding-left: 14upx;
				}
				.orange{
					color:orange;
					font-size: 20upx;
				}
				
			}
		}
	}
}
</style>
