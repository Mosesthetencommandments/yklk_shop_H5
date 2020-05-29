<template>
	<view>
		<view>
			<view class="renheader">
				<view class="renbg"></view>
				<view class="hg"></view>
				<view class="renshopcar">
					<img src="../../static/images/zhuyi_03.png" alt="">
					<!-- 判断有没有设置过地址 -->
					<view class="rencenter" v-if="isAddress" @tap="goAddress">
						<view class="toCommunication">
							<text class="name">{{receive_name}}</text>
							<text class="phone">{{phone}}</text>
						</view>
						<view class="toAddress">
							<p>{{province_name}} {{city_name}} {{district_name}} {{address}}</p>
						</view>
					</view>
					<view v-else class="setAddress"><view>请填写您的收货地址</view> <view @tap="goAddress" style="text-align: right;color:#389eff">去设置</view></view>
					<img src="../../static/images/right_10.png" alt="" class="rightImg">
				</view>
				<view class="renfill"></view>
				<view class="renRecipients">
					<view class="renRecipients-box">
						<view class="renRecipients-content">
							<view class="renRecipients-content-header" v-for="(item,index) in arr" :key="index">
								<view class="leftImg">
									<img :src="item.img" alt="">
								</view>
								<view class="centreWord">
									<view class="p_box">
										<p class="godsName">{{item.name}}</p>
										<p class="godsWeight" v-for="itemss in item.gg" :key="itemss.id">规格: <text>{{itemss}}</text></p>
									</view>
									<view class="money_box">
										<view class="godsPrice">￥{{item.price}}</view>
										<view class="rightP">x{{item.number}}</view>
									</view>
									
								</view>
							</view>
							<view class="renRecipients-content-footer">
								<view class="renRecipients-content-footer-distribution">
									<text>配送方式</text>
									<text>快递运送</text>
									<!-- <text class="yf">运费 {{freight}}</text> -->
									<text class="yf">运费 {{D_freight}}</text>
								</view>
								<view class="renRecipients-content-footer-remark">
									<text>订单备注</text>
									<input type="text" @blur="getvalue" placeholder-class="adf" placeholder="选填，事情先与商家协商一致"></input>
								</view>
								<view class="renRecipients-content-footer-remark" v-if="isCoupons">
									<text>选择优惠</text>
									<text>没有可用优惠</text>									
								</view>
								<view class="renRecipients-content-footer-remark" v-else @click="openCouponList">
									<view v-if="coupon_type === null">
										<text>选择优惠</text>
										<text class="coupon">有可用的优惠券</text>															
										<image src="../../static/images/APP-qie4_0001_箭头.png" mode=""></image>
									</view>
									<view v-else-if="coupon_type === 1">
										<text>选择优惠</text>
										<text class="coupon">{{coupon_name}}满{{require_total_pay}}减{{offset_money}}</text>
										<image src="../../static/images/APP-qie4_0001_箭头.png" mode=""></image>
									</view>
									<view v-else>
										<text>选择优惠</text>
										<text class="coupon">{{coupon_name}}满{{require_total_pay}}可用</text>																			<image src="../../static/images/APP-qie4_0001_箭头.png" mode=""></image>
									</view>
									
								</view>
								<view class="renRecipients-content-footer-price">
									<text>共{{totalNum}}件,</text>
									<text>小计：</text>
									<text>￥{{Math.round(totalPrice1 * 100) / 100}}元</text>
								</view>
								<view class="renRecipients-content-footer-choose">
									<view class="renRecipients-content-footer-choose-img">
										<img src="../../static/images/son_0019_right1.png" alt="" v-if="isChoose===true" @click="ConsumeRecord">
										<img src="../../static/images/son_0018_right2.png" alt="" v-else @click="ConsumeRecord">
										<p :class="isChoose === false ? 'adss' : ''">使用金贝支付</p>
									</view>
									<view class="renRecipients-content-footer-jinbei" v-if="isChoose">
										<img src="../../static/images/APP-qie7_0002_bei-3.png" alt="">
										<p>{{Math.floor(balance_gold)}}</p>
									</view>
								</view>
							</view>
						</view>
					</view>				
				</view>
			</view>
			<view class="consumption">
				<view class="consumptionLeft">
					<p>共<text>{{totalNum}}</text>件</p>
				</view>
				<view class="consumptionRight">
					<view class="consumptionRight-Text" v-if="coupon_type === null">
						<p>合计: <text>￥{{Math.round((totalPrice - offset_money) * 100) / 100}}</text></p>
						<p>含运费</p>
					</view>
					<!-- 满减 -->
					<view class="consumptionRight-Text" v-else-if="coupon_type === 1">
						<p>合计: <text>￥{{Math.round((totalPrice - offset_money) * 100) / 100}}</text></p>
						<p>含运费</p>
					</view>
					<!-- 折扣 -->
					<view class="consumptionRight-Text" v-else>
						<p>合计: <text>￥{{Math.round((totalPrice - (totalPrice / 100) * (100 - offset_percent)) * 100) / 100}}</text></p>
						<p>含运费</p>
					</view>
					<view class="consumptionRight-Button">
						<button @click="sub()">提交</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹出支付方式 -->
		<view class="goPay" v-if="isGopay" @click.stop="isGopay=false">
			<view class="bj">
				<view class="yj" @click="yeGoLockOrders" :class="isClick===true?'gray' : ''">
					<view class="accountBalance">账户余额</view>
					<view class="money" v-if="isClick===true">{{balance}}(不足)</view>
					<view class="money" v-else>{{balance}}</view>
				</view>
				<view class="wx" @click="goLockOrders">微信支付</view>
			</view>
		</view>
		<!-- 弹出选择优惠券 -->
		<view class="select" @click.stop="isCo = false" v-if="isCo">
			<view class="cou-box">
				<scroll-view scroll-y="true" class="scroll-Y">
				<view class="itemBox">
					<view class="couponItem" v-for="(item,index) in coupons" :key="index">
						<view class="item-left" @click.stop="selectImage(index)">
							<image src="../../static/images/son_0019_right1.png" mode="" v-if="item.isClick"></image>
							<image src="../../static/images/son_0018_right2.png" mode="" v-else></image>
						</view>
						<!-- 满减 -->
						<view class="item-right" v-if="item.coupon_type === 1 ">
							<view class="r-top">￥{{item.offset_money}} <text>{{item.coupon_name}}，满{{item.require_total_pay}}减5</text></view>
							<view class="r-bottom">有效期：{{item.start_at}}至{{item.end_at}}</view>
						</view>
						<!-- 折扣 -->
						<view class="item-right" v-else>
							<view class="r-top">折{{item.offset_percent / 10}} <text>{{item.coupon_name}}，满{{item.require_total_pay}}可用</text></view>
							<view class="r-bottom">有效期：{{item.start_at}} 至 {{item.end_at}}</view>
						</view>
						<view class="btnn" @click.stop="selectCoupon">选好了</view>
					</view>
				</view>
				</scroll-view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		created() {
			this.getCustomerMoneyInfo()//余额
			this.selectCoupons()//优惠券列表信息
		},
		onPullDownRefresh() {//下拉刷新
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad(option) {
			this.id = option.id
			if(this.id !== null && this.id !== '' && this.id !== undefined){
				this.getCustomerAddressInfo()
			} else {
				this.getCustomerDefaultAddressInfo()
			}
			this.getPreparedOrdersInfo()
		},
		computed:{
			totalPrice:{
				get(){
					var allPrice  = 0;
					this.arr.forEach(item =>{
						allPrice += (item.number * item.price) 
					})
					if(this.isChoose === true){
						if(((allPrice + this.freight) - this.balance_gold) >= 0){
							allPrice = (allPrice + this.D_freight) - this.balance_gold
						}else if(((allPrice + this.D_freight) - this.balance_gold) <= 0){
							allPrice = Math.round((this.totalPrice1 - Math.floor(this.totalPrice2)) *100) / 100
							
						}
					}else{
						allPrice = allPrice + this.D_freight
					}
					return allPrice
				}
			},
			totalPrice1:{
				get(){
					var allPrice  = 0;
					this.arr.forEach(item =>{
						allPrice += (item.number * item.price) 
					})
						allPrice = allPrice + this.D_freight
					return allPrice
				}
			},
			totalPrice2:{
				get(){
					var allPrice  = 0;
					this.arr.forEach(item =>{
						allPrice += (item.number * item.price) 
					})
						allPrice =  this.balance
					return allPrice
				}
			},
			totalNum:{
				get(){
					var num_total = 0
					this.arr.forEach(item =>{
						num_total += item.number
					})
					return num_total;
				}
			},
		},
		data(){
			return{
				isImage:false,
				isCo:false,
				isCoupons:false,//优惠券
				isChoose:false,
				freight:'',
				obj:null,
				arr:[],
				newArr:[],
				GG:null,
				NF:null,
				isAddress:false,
				receive_name:null,
				id:null,
				phone:null,
				province_name:null,
				city_name:null,
				district_name:null,
				address:null,
				is_default:null,
				isGopay:false,
				remark:"",//订单备注
				orders_id:null,
				names:null,
				phones:null,
				province_names:null,
				city_names:null,
				district_names:null,
				addresss:null,
				balance:null,//账户余额
				isClick:false,
				coupons:[],
				shop_customer_coupon_id:null,
				coupon_name:null,
				coupon_type:null,
				offset_money:null,
				offset_percent:null,
				require_total_pay:null,
				balance_gold:null,//金贝
				gold_number:null,
				orders_shop_items:[],
				PROVINCE:null,
				D_freight:null,
			}
		},
		methods:{
			async getPreparedOrdersInfo(){//获取预处理订单信息
				let [err,res] = await this.$http.post("/api/orders/getPreparedOrdersInfo");
				if(res.data.code == 200){
					let list = res.data.data.orders_shop_items
					this.orders_shop_items = res.data.data.orders_shop_items
					console.log(list)
					let arr = []
					this.freight = res.data.data.freight
					
					for(var i = 0; i < list.length; i++){
						arr.push({
							img:list[i].shop_goods.image_thumb,
							price:list[i].price,
							number:list[i].number,
							name:list[i].shop_goods_common.goods_title,
							gg:list[i].shop_species_value
						})
					}
					this.arr = arr
					this.calcFreight()
				}
			},
			async getCustomerAddressInfo(){//一进入页面 获取的用户地址
				let [err,res] = await this.$http.post("/api/customer/getCustomerAddressInfo",{id:this.id});
				if(res.data.code == 200 && res.data.data !== '') {
					let newList = res.data.data
					this.receive_name=newList.receive_name
					this.id=newList.id
					this.phone=newList.phone
					this.province_name=newList.province_name
					this.city_name=newList.city_name
					this.district_name=newList.district_name
					this.address=newList.address
					this.is_default=newList.is_default
					this.isAddress = true
					this.PROVINCE = newList.province
				}
			},
			sub(){
				this.isGopay = true
				if(this.balance < this.totalPrice){
					// console.log(111)
					this.isClick = true
					// return false
				}
			},
			getvalue(e){//获取订单备   注
				this.remark = e.detail.value
			},
			async goLockOrders(){//锁定预处理订单  微信支付
				let [err,res] = await this.$http.post("/api/orders/lockOrders",{
					customer_address_id:this.id,
					pay_type:2,
					remark:this.remark
				});
				if(res.data.code == 200 && res.data.data.message === 'ok'){
					this.orders_id = res.data.data.data.id
					uni.redirectTo({
					    url: '../blankJump/blankJump?orders_id='+this.orders_id
					});
				} else if (res.data.code == 200 && res.data.data.message === 'stock_empty') {
					uni.redirectTo({
					    url: '../sellOut/sellOut'
					});
				}else{
					uni.showModal({
					    title: '提示',
					    content: '收货地址不存在请重新选择',
					    success: function (res) {
					      
					    }
					});
				}
			},
			async yeGoLockOrders(){//锁定预处理订单   余额支付
				let [err,res] = await this.$http.post("/api/orders/lockOrders",{
					customer_address_id:this.id,
					pay_type:1,
					remark:this.remark
				});
				if(res.data.code == 200 && res.data.data.message === 'ok'){
					this.orders_id = res.data.data.data.id
					uni.redirectTo({
					    url: '../blankJump/blankJump?orders_id='+this.orders_id
					});
				} else if (res.data.code == 200 && res.data.data.message === 'stock_empty') {
					uni.redirectTo({
					    url: '../sellOut/sellOut'
					});
				}else{
					uni.showModal({
					    title: '提示',
					    content: '收货地址不存在请重新选择',
					    success: function (res) {
					      
					    }
					});
				}
			},
			async cleanShoppingCar(){
				let [err,res] = await this.$http.post("/api/cart/deleteGoodsFromCartMassively",{
					shop_cart_items_ids:this.$store.state.mycar.cars
				});
				if(res.data.code === 200){
					this.$store.state.mycar.cars = []
					localStorage.cars = JSON.stringify(this.$store.state.mycar.cars)
				}
			},
			goAddress(){//去设置收货地址那
				uni.navigateTo({
					url:"/pages/address/address"
				})
			},
			async getCustomerDefaultAddressInfo(){ //获取默认收货地址
				let [err,res] = await this.$http.post("/api/customer/getCustomerDefaultAddressInfo");
				if(res.data.code == 200 && res.data.data !== '') {
					let newList = res.data.data
					this.receive_name=newList.receive_name
					this.id=newList.id
					this.phone=newList.phone
					this.province_name=newList.province_name
					this.city_name=newList.city_name
					this.district_name=newList.district_name
					this.address=newList.address
					this.is_default=newList.is_default
					this.isAddress = true
					this.PROVINCE = newList.province
				}
			},
			async getCustomerMoneyInfo(){//获取账户余额信息
				let [err,res] = await this.$http.post('/api/customer/getCustomerMoneyInfo');
				if(res.data.code == 200){
					// console.log(res.data.data)
					this.balance = res.data.data.balance	
				}
			},
			async selectCoupons(){//优惠券列表信息
				let [err,res] = await this.$http.post("/api/orders/getOrdersAvailableCouponList");
				if(res.data.code == 200){
					if(res.data.data.length===0){
						this.isCoupons = true
						return
					}
					let list = res.data.data
					// console.log(list)
					for(let i = 0 ; i < list.length ;  i++){
						this.coupons.push({
							id:list[i].id,
							start_at:list[i].start_at,
							end_at:list[i].end_at,
							coupon_name:list[i].shop_coupon.coupon_name,
							coupon_type:list[i].shop_coupon.coupon_type,
							offset_money:list[i].shop_coupon.offset_money,
							offset_percent:list[i].shop_coupon.offset_percent,
							require_total_pay:list[i].shop_coupon.require_total_pay,
							isClick:false
						})
					}
					for(let k = 0; k < this.coupons.length; k++){
						 this.coupons[k].start_at = (this.coupons[k].start_at).substr(0,10)
						 this.coupons[k].end_at = (this.coupons[k].end_at).substr(0,10)
					}
					// console.log(this.coupons)
					
				}
			},
			openCouponList(){
				this.isCo = true;
			},
			async selectCoupon(){//选择订单可用优惠卷
				let [err,res] = await this.$http.post("/api/orders/selectCoupon",{
					shop_customer_coupon_id:this.shop_customer_coupon_id
				});
				// console.log(this.shop_customer_coupon_id)
				if(res.data.code == 200){
					this.isCo = false
				}
			},
			selectImage(index){
				// console.log(index)
				this.isImage = !this.isImage;
				for(let k = 0; k < this.coupons.length; k++){
					// console.log(k)
					if(index === k){
						this.coupons[k].isClick = true;
						this.shop_customer_coupon_id = this.coupons[k].id
						
						this.coupon_name = this.coupons[k].coupon_name
						this.coupon_type = this.coupons[k].coupon_type
						this.offset_money = this.coupons[k].offset_money
						this.offset_percent = this.coupons[k].offset_percent
						this.require_total_pay = this.coupons[k].require_total_pay
					}else{
						this.coupons[k].isClick = false
					}
				}
			},
			ConsumeRecord(){//判断金贝
				console.log(this.isChoose)
				this.balanceGold()		
			},
			async balanceGold(){
				let [err,res] = await this.$http.post("/api/orders/createShopGoldConsumeRecord",{
					type:1,
				});
				if(res.data.code !== 200){
					return
				}
				if(res.data.code === 200){
					console.log(res.data)
					this.isChoose = !this.isChoose
					this.balance_gold = res.data.data.number
				}
			},
			async calcFreight(){
				let [err,res] = await this.$http.post("/api/orders/calcFreight",{
					orders_shop_items:this.orders_shop_items,
					province:this.PROVINCE
				});
				if(res.data.code === 200){
					console.log(res.data.data)
					this.D_freight = res.data.data
				}
			}
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
							input{
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
							justify-content:flex-end;
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
