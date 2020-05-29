<template>
	<view>
		<!-- 弹出银行卡类型 -->
		<view class="cardType-box" v-if="isCardType" @click.stop="isCardType = false">
			<view class="cardType">
				<scroll-view scroll-y="true" class="scroll-Y" >
				<!-- 零钱 -->
<!-- 				<view class="cardTypeItem" @click.stop="asds">
					<view class="c-left">
						<image src="../../static/images/APP-qie10_0001_零钱icon56x56.png" mode=""></image>
						<view class="title-box">
							<view class="title">零钱</view>
							<view class="note">(500 以下提现推荐使用)</view>
						</view>
					</view>
					<image class="c-right" src="../../static/images/son_0019_right1.png" mode="" v-if="isLooseChange"></image>
					<image class="c-right" src="../../static/images/son_0018_right2.png" mode="" v-else></image>
				</view> -->
				<!-- 卡  -->
				<view class="cardTypeItem" v-for="(item,index) in WalletList" :key="index" @click.stop="selectImage(index)">
					<view class="c-left">
						<image src="../../static/images/APP-qie10_0000_支付宝icon56x56.png" mode="" v-if="item.bank_type_pic === undefined"></image>
						<image :src="item.bank_type_pic" mode="" v-else></image>
						<view class="title-box">
							<view class="title">{{item.bank_type_name ? item.bank_type_name : '支付宝'}}({{item.cardBag.name}})</view>
							<view class="note">{{item.bank_type_name ? "24小时内到账" : '(1000 一下提现推荐使用)'}}</view>
						</view>
					</view>
					<image class="c-right" src="../../static/images/son_0019_right1.png" mode="" v-if="item.isClick === true && isLooseChange1 === true" ></image>
					<image class="c-right" src="../../static/images/son_0018_right2.png" mode="" v-else></image>
				</view>
				
				</scroll-view>
				<view class="cardTypeItem1" @click.stop="goAccount">添加新的银行卡</view>
			</view>
		</view>
		<!-- 头部银行卡选择 -->
		<view class="bankCard" @click="isCardType = true">
			<!-- <view class="title">到账账户</view>
			<view class="card" v-if="this.kk === 1">
				<image src="../../static/images/APP-qie10_0001_零钱icon56x56.png" mode="" ></image>
				零钱
			</view>
			<view class="card" v-else>
				<image src="../../static/images/APP-qie10_0000_支付宝icon56x56.png" mode="" v-if="bank_type_pic === null"></image>
				<image :src="bank_type_pic" mode="" v-else></image>
				{{bank_type_name}}（{{card_number}}）
			</view> -->
			<view class="card" v-if="this.kk ==1">
				请选择提现方式
			</view>
			<view class="card" v-else>
				<image src="../../static/images/APP-qie10_0000_支付宝icon56x56.png" mode="" v-if="bank_type_pic === null"></image>
				<image :src="bank_type_pic" mode="" v-else></image>
				{{bank_type_name}}（{{card_number}}）
			</view>
			<view class="arrow-box"><image class="arrow" src="../../static/images/APP-qie4_0001_箭头.png" mode=""></image></view>
			
		</view>
		<!-- 转出部分 -->
		<view class="rollOut">
			<view class="rollOut-title">转出金额</view>
			<!-- <view class="rollOut-money">￥<input type="number" :value="val"/></view> -->
			<!-- <view class="rollOut-money" @tap="openKeyBoard('idCard')" v-if = "this.isAllMoney">
				￥{{allmoney}}
			</view> -->
			<view class="rollOut-money" @tap="openKeyBoard('idCard')">
				￥{{passStr}}
			</view>
			<view class="rollOut-draw">账户余额{{money}}， <text @click="withdraw">全部提现</text></view>
		</view>
		<!-- <tabbarItem></tabbarItem> -->
		
		<!-- 数字键盘 -->
		<keyboard-package ref="number"  @onInput="onInput" @onDelete="onDelete" @onConfirm="onConfirm" :disableDot="true"/>
		<!-- 身份证键盘 -->
		<keyboard-package ref="idCard" type="idCard"  @onInput="onInput" @onDelete="onDelete" @onConfirm="onConfirm"/>
		<!-- 车牌键盘 -->
		<keyboard-package ref="plateNumber" type="plateNumber"  @onInput="onInput" @onDelete="onDelete" @onConfirm="onConfirm"/>
	</view>
</template>

<script>
	import keyboardPackage from "@/components/keyboard-package/keyboard-package.vue"
	import passwordInput from "@/components/password-input/password-input.vue"
	import tabbarItem from "../../components/tabbarItem/tabbar.vue"
	export default {
		components:{
			tabbarItem,keyboardPackage,passwordInput
		},
		onPullDownRefresh() {//下拉刷新
			this.getShopCustomerWalletList()
		},
		onLoad() {
			this.kk = 1
			this.wallet_type = 3
			this.getShopCustomerWalletList()
			this.getCustomerMoneyInfo()
		},
		mounted() {//软键盘
			this.openKeyBoard('idCard');
		},
		data() {
			return {
				isCardType:false,
				money:null,
				isAll:false,
				vall:null,
				WalletList:[],
				id:null,
				bank_type_name:null,
				card_number:null,
				numberList:[],
				idCardList:[],
				plateNumberList:[],
				length:4,
				type:'number',
				isLooseChange:true,
				isLooseChange1:false,
				kk:null,
				wallet_type:null,
				allmoney:null,
				isAllMoney:false,
				str:'',
				bank_type_pic:null,
			};
		},
		methods:{
			async getShopCustomerWalletList(){//银行卡 支付宝列表接口
				let [err,res] = await this.$http.post("/api/customer/getShopCustomerWalletList");
				if(res.data.code === 200){
					let list = res.data.data
					// console.log(list)
					for(let i = 0 ; i < list.length; i++){
						if(list[i].wallet_type === 2){
							this.WalletList.push({
								card_number:list[i].card_number,
								id:list[i].id,
								cardBag:{},
								isClick:false
							})
						}else if(list[i].wallet_type === 1){
							this.WalletList.push({
								bank_type_name:list[i].shop_bank_type.bank_type_name,
								bank_type_pic:list[i].shop_bank_type.bank_type_pic,
								card_number:list[i].card_number,
								id:list[i].id,
								cardBag:{},
								isClick:false,
							})
						}else if(list[i].wallet_type === 3){
							this.WalletList.push({
								card_number:'零钱',
								id:0,
								isClcik:false
							})
						}
					}
					for(let j = 0 ; j < this.WalletList.length; j++){
						// console.log(this.WalletList[i].card_number)
						let disLength = (this.WalletList[j].card_number).length
						let newcard_number = (this.WalletList[j].card_number).substring(disLength-4,disLength);
						// console.log(newcard_number)
						this.WalletList[j].cardBag.name = newcard_number
					}
					// this.WalletList.push({
					// 	id:0,
					// 	changName:"零钱"
					// })
					// console.log(this.WalletList)
					uni.stopPullDownRefresh();
				}
			},
			selectImage(index){//点击切换选中状态
				for(let k = 0; k < this.WalletList.length; k++){
					if(index === k){
						this.WalletList[k].isClick = true;
						this.isLooseChange1 = true
						this.id = this.WalletList[k].id
						this.isLooseChange = false
						this.kk = null
						this.bank_type_pic = null
						// this.bank_type_id = this.WalletList[k].bank_type_id
						// // console.log(this.bank_type_id)
					}else{
						this.WalletList[k].isClick = false
					}
				}
				this.getShopCustomerWalletInfo()
				// console.log(this.id)
			},
			async getShopCustomerWalletInfo(){//单个卡详情
				let [err,res] = await this.$http.post("/api/customer/getShopCustomerWalletInfo",{
					shop_customer_wallet_id:this.id,
				});
				if(res.data.code === 200){
					this.wallet_type = res.data.data.wallet_type
					if(this.wallet_type === 1){
						this.bank_type_name = res.data.data.shop_bank_type.bank_type_name
						this.bank_type_pic = res.data.data.shop_bank_type.bank_type_pic
						// this.card_number = res.data.data.card_number
						let dis = (res.data.data.card_number).length
						let new_number1 = (res.data.data.card_number).substring(dis-4,dis);
						this.card_number = new_number1
						// console.log(this.card_number)
					}else if(this.wallet_type === 2){
						// this.card_number = res.data.data.card_number
						this.bank_type_name = "支付宝"
						let dis = (res.data.data.card_number).length
						let new_number1 = (res.data.data.card_number).substring(dis-4,dis);
						this.card_number = new_number1
						// console.log(this.card_number)
					}else{
						this.bank_type_name = "零钱"
					}
				}
			},
			async getCustomerMoneyInfo(){//获取用户金额信息
				const token = uni.getStorageSync('token')
				if (token === '' || token === null || token === undefined) {
					return
				}
				let [err,res] = await this.$http.post('/api/customer/getCustomerMoneyInfo');
				if(res.data.code == 200){
					this.money = res.data.data.balance
				}
			},
			withdraw(){//全部提现
				this.idCardList = []
				let strr = this.money.split('');
				// console.log(strr)
				for(let i = 0; i < strr.length; i++){
					console.log(strr[i])
					this.idCardList.push(strr[i])
				}
				// console.log(this.idCardList)
			},
			goAccount(){
				uni.navigateTo({
					url:'../myCardBag/myCardBag'
				})
			},
			asds(){
				this.isLooseChange = !this.isLooseChange
				this.isLooseChange1 = false
				this.kk = 1
				this.wallet_type = 3
			},
			//软键盘
			openKeyBoard(key) {
				this.type=key;
				this.$refs[key].open();
			},
			onInput(val){
				switch(this.type){
					case 'number':
						if(this.numberList.length>=this.length){
							this.close();
							return;
						};
						if(this.numberList.length===this.length-1){
							this.numberList.push(val);
							this.close();
							return;
						};
						this.numberList.push(val);
						break;
					case 'idCard':
						this.idCardList.push(val);
						// console.log(this.idCardList)
						break;
					case 'plateNumber':
						this.plateNumberList.push(val);
						break;
				}
				
			},
			onDelete(){
				switch (this.type){
					case 'number':
						this.numberList.pop();
						break;
					case 'idCard':
						this.idCardList.pop();
						break;
					default:
						this.plateNumberList.pop();
						break;
				}
			},
			async onConfirm(){
				if(this.kk === 1){
					uni.showToast({
						title:"请选择提现方式",
						duration:1000,
						icon:"none"
					})
					return 
				}
				let [err,res] = await this.$http.post("/api/customer/createCustomerBalanceWithdraw",{
					wallet_type:this.wallet_type,
					customer_wallet_id:this.id,
					withdraw_money:this.passStr
				});
				if(res.data.code === 200){
					uni.showToast({
						title:'完成提现！',
						duration:2000,
						icon:'none'
					})
					this.getCustomerMoneyInfo()
					this.idCardList=[]
					// console.log(this.passStr)
				}
			},
			close(){
				this.$refs[this.type].close();
			}
		},
		computed:{//软键盘
			passStr(){
				let str='';
				this.idCardList.forEach(item=>{
					str+=item.toString();
				})
				return str;
			},	
			plateNumberStr(){
				let str='';
				this.plateNumberList.forEach(item=>{
					str+=item.toString();
				})
				return str;
			}
		}
	}
</script>

<style lang="scss" scoped>
page{
	background: #f2f2f2;
}
.bankCard{
	width:100%;
	height: 130upx;
	padding:0 48upx;
	display: flex;
	line-height: 130upx;
	font-size: 22upx;
	color:#666666;
	.title{
		width:184upx;
		height: 130upx;
	}
	.card{
		height: 130upx;
		width: 416upx;
		image{
			width:34upx;
			height: 34upx;
			background: #ffffff;
			margin-right: 10upx;
		}
	}
	.arrow{
		width:12upx;
		height: 22upx;
		line-height: 130upx;
	}
	
}
// 下方转出金额
.rollOut{
	width:100%;
	height: 90%;
	background: #ffffff;
	border-top-left-radius: 26upx;
	border-top-right-radius: 26upx;
	position:absolute;
	bottom: 0;
	left: 0;
	box-shadow: 0 -1upx 20upx #cbcbcb;
	padding:0 48upx;
	.rollOut-title{
		width:100%;
		height: 84upx;
		font-size: 24upx;
		color:#666666;
		line-height: 90upx;
	}
	.rollOut-money{
		width:100%;
		height: 97upx;
		border-bottom: 1px solid #f2f2f2;
		line-height: 97upx;
		display: flex;
		font-size: 40upx;
		font-weight: 700;
		input{
			height: 97upx;
			width:100%;
			padding-left: 20upx;
		}
	}
	.rollOut-draw{
		width:100%;
		height: 61upx;
		line-height: 61upx;
		font-size:20upx;
		color:#b3b3b3;
		text{
			color:#53aefc;
		}
	}
}
.cardType-box{
	width:100%;
	height: 100vh;
	background: rgba(0,0,0,.5);
	position:fixed;
	top:0;
	left:0;
	z-index: 20;
	.cardType{
		width:100%;
		height: 700upx;
		border-radius: 20px 20px 0px 0px;
		position:absolute;
		bottom: 0;
		padding: 0 50upx;
		background: #ffffff;
		.cardTypeItem{
			width:100%;
			height: 100upx;
			// line-height: 100upx;
			display: flex;
			justify-content: space-between;
			.c-left{
				width:400upx;
				height: 100upx;
				color:rgba(102,102,102,1);
				display: flex;
				.title-box{
					width:400upx;
					height: 100upx;
					padding-top:26upx;
					margin-left: 20upx;
					.title{
						font-size:26upx;
					}
					.note{
						font-size:16upx;
						color:rgba(102,102,102,1);
						line-height: 10upx;
					}
				}
				image{
					width:34upx;
					height:34upx;
					margin-top:36upx;
				}
			}
			.c-right{
				width:30upx;
				height:30upx;
				margin-top:40upx;
			}
		}
	}
}
.cardTypeItem1{
	width:100%;
	height: 100upx;
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 0 100upx;
	line-height: 100upx;
	color:rgba(102,102,102,1);
	font-size: 26upx;
}


</style>
