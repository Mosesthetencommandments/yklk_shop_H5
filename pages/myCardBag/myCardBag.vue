<template>
	<view>
		<view class="bag-box">
			<!-- 标题 -->
			<view class="bag-title">
				<view class="title">我的卡包 <text>共{{sum+sum1}}张</text></view>
				<view class="img-box" @click="getBack"><image src="../../static/images/APP-qie-out.png" mode=""></image></view>
			</view>
			<!-- 卡包 -->
				<!-- 银行卡 -->
			<view class="bag-card">
				<view class="card-item" v-for="(item,index) in WalletList" :key="index">
					<image :src="item.shop_bank_type.bank_type_pic" mode=""></image>
					<view class="card-name">
						<view class="name">{{item.shop_bank_type.bank_type_name }}<text v-if="item.status === 1">默认</text></view>
						<view class="column">储蓄卡</view>
					</view>
					<view class="card-number">{{item.card_number}}</view>
					<view class="redact" @click="cardRedact(item)">编辑</view>
				</view>
			</view>
				<!-- 支付宝 -->
			<view class="bag-card">
				<view class="card-item" v-for="(item,index) in WalletList1" :key="index">
					<image src="../../static/images/APP-qie10_0000_支付宝icon56x56.png" mode=""></image>
					<view class="card-name">
						<view class="name">支付宝</view>
						<view class="column">{{item.customer_shop.truename}}</view>
					</view>
					<view class="card-number">{{item.card_number}}</view>
					<view class="redact" @click="cardRedact1(item)">编辑</view>
				</view>
			</view>
			<!-- 添加 -->
			<view class="add">
				<view class="alipay" @click="goCreatAlipay">添加支付宝</view>
				<view class="bank" @click="goAddBankCard">添加新的银行卡</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onPullDownRefresh() {//下拉刷新
			this.getShopCustomerWalletList()
			this.getShopCustomerWalletList1()
			this.updateCustomerInfo()
		},
		onLoad() {
			this.getShopCustomerWalletList()
			this.getShopCustomerWalletList1()
			this.updateCustomerInfo()
		},
		data() {
			return {
				WalletList:[],
				isDefault:false,
				sum:null,
				WalletList1:[],
				sum1:null,
				truename:123,
			};
		},
		methods:{
			async updateCustomerInfo(){//获取真实姓名
				let [err,res] = await this.$http.post("/api/customer/updateCustomerInfo");
				if(res.data.code === 200){
					this.truename = res.data.data.truename
				}
			},
			async getShopCustomerWalletList(){
				let[err,res] = await this.$http.post("/api/customer/getShopCustomerWalletList",{
					wallet_type:1
				});
				if(res.data.code === 200){
					this.WalletList = res.data.data
					this.sum = this.WalletList.length
					for(let i = 0 ; i < this.WalletList.length;i++){
						this.WalletList[i].card_number = "****"+(this.WalletList[i].card_number).substr(-4);
					}
					uni.stopPullDownRefresh();
				}
			},
			async getShopCustomerWalletList1(){
				let[err,res] = await this.$http.post("/api/customer/getShopCustomerWalletList",{
					wallet_type:2
				});
				if(res.data.code === 200){
					this.WalletList1 = res.data.data
					this.sum1 = this.WalletList1.length
					console.log(this.sum1 + "awe")
					console.log(this.WalletList1)
					for(let i = 0 ; i < this.WalletList1.length;i++){
						this.WalletList1[i].card_number = "****"+(this.WalletList1[i].card_number).substr(-4);
					}
					uni.stopPullDownRefresh();
				}
			},
			cardRedact(item){//银行卡编辑
				console.log(item)
				uni.navigateTo({
				    url: '../addBankCard/addBankCard?shop_customer_wallet_id=' + item.id + '&status=' + item.status
				});
			},
			cardRedact1(item){//支付宝编辑
				console.log(item)
				uni.navigateTo({
				    url: '../creatAlipay/creatAlipay?shop_customer_wallet_id=' + item.id + '&status=' + item.status
				});
			},
			goAddBankCard(){
				if(this.truename === null || this.truename === undefined ||this.truename ===''){
					uni.showToast({
						title:"请完善用户信息",
						duration:1000,
						icon:"none"
					})
					return 
				}
				uni.navigateTo({
				    url: '../addBankCard/addBankCard'
				});
			},
			getBack(){
				// uni.redirectTo({
				//     url: '../useredit/useredit'
				// });
				uni.navigateBack({
				    delta: 1
				});
			},
			goCreatAlipay(){
				if(this.truename === null || this.truename === undefined ||this.truename ===''){
					uni.showToast({
						title:"请完善用户信息",
						duration:1000,
						icon:"none"
					})
					return 
				}
				uni.navigateTo({
					url:'../creatAlipay/creatAlipay'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.bag-box{
	width:100%;
	height: 100%;
	padding: 0 24upx;
	.bag-title{
		width:100%;
		height: 80upx;
		display: flex;
		justify-content: space-between;
		.title{
			width:70%;
			height: 80upx;
			line-height: 80upx;
			font-size: 30upx;
			color:#444444;
			text{
				font-size: 18upx;
				color: #999999;
			}
		}
		.img-box{
			width:56upx;
			height: 80upx;
			line-height: 80upx;
			padding-top:10upx;
			image{
				text-align: right;
				width:56upx;
				height:56upx;
			}
		}
	}
}
.bag-card{
	width:100%;
	height: 100%;
}
.card-item{
	width:100%;
	height:120upx;
	background:rgba(255,255,255,1);
	box-shadow:0upx 5upx 21upx 0upx rgba(216,216,216,0.75);
	border-radius:20upx;
	padding: 32upx 27upx 32upx 32upx;
	display: flex;
	margin-bottom: 16upx;
	image{
		width:56upx;
		height:56upx;
	}
	.card-name{
		width:380upx;
		height: 56upx;
		font-size: 22upx;
		color: #444444;
		margin-left: 24upx;
		text{
			display: inline-block;
			text-align: center;
			width:44upx;
			height:22upx;
			background:rgba(255,236,208,1);
			border:1upx solid rgba(244, 156, 23, 1);
			border-radius:2px;
			font-size: 18upx;
			color: #F49C17;
			line-height:20upx;
			margin-left: 10upx;
		}
		.column{
			font-size: 18upx;
			color:#444444;
		}
	}
	.card-number{
		font-size:22upx;
		font-weight:400;
		color:rgba(68,68,68,1);
		width:110upx;
		height: 56upx;
		text-align: right;
	}
	.redact{
		width:56upx;
		height: 56upx;
		border-left: 2px solid #EEEEEE;
		font-size: 18upx;
		color: #999999;
		text-align: right;
		line-height: 56upx;
		margin-left: 22upx;
	}
}
.add{
	width:100%;
	height: 100upx;
	position: fixed;
	bottom:0;
	left: 0;
	display: flex;
	view{
		width:50%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		color: #ffffff;
		font-size: 30upx;
	}
	.alipay{
		background: #369EFF;
	}
	.bank{
		background: #024F97;
	}
}	

</style>
