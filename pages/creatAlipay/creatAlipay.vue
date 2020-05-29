<template>
	<view>
		<view class="AlipayInformation-box">
			<!-- 修改时显示 -->
			<view class="eait" v-if="isXG">
				<view class="input-box">
					<view class="title">真实姓名</view><input type="text" v-model='getName' disabled= 'true'/>
				</view>
				<view class="input-box">
					<view class="title">支付宝账号</view>
					<input type="text" value="" :placeholder="card_number" disabled="true" @blur="getCardNumber" />
				</view>
				<view class="input-box1">
					<view class="title">确认支付宝账号</view><input type="text" disabled="true" value="" @blur="ConfirmCardNumber" :placeholder="card_number"/>
				</view>
			</view>
			<!-- 新建时显示 -->
			<view class="eait" v-else>
				<view class="input-box">
					<view class="title">真实姓名</view><input type="text" :value="truename" disabled= 'true'/>
				</view>
				<view class="input-box">
					<view class="title">支付宝账号</view>
					<input type="text" value="" :placeholder="cardNumber" @blur="getCardNumber" />
				</view>
				<view class="input-box1">
					<view class="title">确认支付宝账号</view><input type="text" value="" @blur="ConfirmCardNumber" :placeholder="confirmCardNumber"/>
				</view>
			</view>
			<view class="del" @click="deleteShopCustomerWallet">删除支付宝信息</view>
			<view class="footer">
				<view class="callOff" @click="callOff">取消</view>
				<view class="keep" @click="createShopCustomerWallet">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onPullDownRefresh() {//下拉刷新
			this.deleteShopCustomerWallet()
		},
		onLoad(option) {
			// console.log(option)
			this.id = option.shop_customer_wallet_id
			this.status = option.status
			if(option.id || option.status){
				this.getShopCustomerWalletInfo()
			}
			if(option.shop_customer_wallet_id !== undefined){
				this.isXG = true
			}
			this.updateCustomerInfo()
		},
		data() {
			return {
				truename:null,
				card_number:null,
				cardNumber:"输入支付宝账号",
				confirmCardNumber:"输入支付宝账号",
				id:null,
				isXG:false
			};
		},
		computed:{
			getName(){
				let name = ''
				name = this.truename
				return name
			}
		},
		methods:{
			getCardNumber(e){//填写支付宝
				this.cardNumber = e.detail.value
				// console.log(this.cardNumber)
			},
			ConfirmCardNumber(e){//再次填写支付宝
				this.confirmCardNumber = e.detail.value
				// console.log(this.confirmCardNumber)
				if(this.cardNumber !== this.confirmCardNumber){
					uni.showToast({title:'两次支付宝不同',icon:'none'});
				}else{
					this.card_number = this.confirmCardNumber
				}
			},
			async updateCustomerInfo(){//获取真实姓名
				let [err,res] = await this.$http.post("/api/customer/updateCustomerInfo");
				if(res.data.code === 200){
					this.truename = res.data.data.truename
				}
			},
			async createShopCustomerWallet(){
				let [err,res] = await this.$http.post("/api/customer/createShopCustomerWallet",{
					wallet_type:2,
					card_number:this.card_number
				});
				if(res.data.code === 200){
					// console.log(111)
					// console.log(res.data.data)
					this.id = res.data.data.id
					uni.redirectTo({
						url:'../myCardBag/myCardBag'
					})
				}
			},
			callOff(){
				uni.redirectTo({
					url:'../myCardBag/myCardBag'
				})
			},
			async deleteShopCustomerWallet(){
				let [err,res] = await this.$http.post("/api/customer/deleteShopCustomerWallet",{
					shop_customer_wallet_id:this.id
				});
				if(res.data.code === 200){
					uni.redirectTo({
					    url: '../myCardBag/myCardBag'
					});
				}
			},
			async getShopCustomerWalletInfo(){// 获取支付宝信息
				let [err,res] = await this.$http.post("/api/customer/getShopCustomerWalletInfo",{
					shop_customer_wallet_id:this.id
				});
				if(res.data.code === 200){
					this.ChangeBankCard = res.data.data
					this.card_number = this.ChangeBankCard.card_number
					uni.stopPullDownRefresh();
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.AlipayInformation-box{
	width:100%;
	height: 100%;
}
.eait{
	width:100%;
	height: 256upx;
	background:#ffffff;
	padding: 0 30upx;
	margin-bottom: 20upx;
	.input-box{
		width:100%;
		height: 84upx;
		display: flex;
		border-bottom: 1px solid #f0f0f0;
		.title{
			width:220upx;
			height: 84upx;
			font-size:26upx;
			line-height: 84upx;
		}
	}
	.input-box1{
		width:100%;
		height: 84upx;
		display: flex;
		.title{
			width:220upx;
			height: 84upx;
			font-size:26upx;
			line-height: 84upx;
		}
	}
	input{
		width:440upx;
		height: 84upx;
		color:#999999;
		font-size: 26upx;
		
	}
	.details{
		border:0;
	}
}
.del{
	width:100%;
	height: 84upx;
	background: #ffffff;
	display: flex;
	font-size:26upx;
	color:#ec373e;
	line-height: 84upx;
	padding-left: 30upx;
}
.footer{
	width:100%;
	height: 100upx;
	background: #1AAD19;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	view{
		width:50%;
		height: 100upx;
		color:#ffffff;
		font-size:30upx;
		text-align: center;
		line-height: 100upx;
	}
	.callOff{
		background: #EC373E;
	}
	.keep{
		background: #369EFF;
	}
}
</style>
