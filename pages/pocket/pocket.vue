<template>
	<view>
		<view v-if="this.shopgods === null || this.shopgods.length === 0" @click="gotoshop">
			<view class="header"></view>
			<view class="header-bu"></view>
			<view class="message-box">
				<view class="message">
					<view class="massage-title">
						共<text class="blue">{{0}}</text> 件宝贝<text class="blue">{{0}}</text>元，已选<text class="orange">{{0}}</text>件 共<text
						 class="orange">{{0}}</text>元
					</view>
					<view class="xian"></view>
				</view>
			</view>
			<tabbarItem></tabbarItem>
		</view>
		<view v-else>
			<!-- 头部 -->
			<view class="header"></view>
			<view class="header-bu"></view>
			<!-- 已选信息 -->
			<view class="message-box">
				<view class="message">
					<view class="massage-title">
						共<text class="blue">{{totalNum}}</text> 件宝贝<text class="blue">{{totalPrice}}</text>元，已选<text class="orange">{{chooseNum}}</text>件
						共<text class="orange">{{Math.round(choosePrice * 100) / 100}}</text>元
					</view>
					<view class="xian"></view>
				</view>
			</view>
			<!-- 编辑 -->
			<view class="compile">
				<view class="compile-left">
					<!-- <img src="../../static/images/son_0018_right2.png" alt=""> -->
					<p>壹口两口</p>
				</view>
				<view class="compile-right" @click="removeGods" v-if="this.shopState === 1">
					<p>编辑</p>
				</view>
				<view class="compile-right" @click="chooseGods" v-else>
					<p>完成</p>
				</view>
			</view>
			<!-- 购物车 -->
			<view style="padding-bottom:200upx;">
				<view class="shopcar-box" v-for="(shopItem,index) in shopgods" :key="index" 
				 @touchend.stop="touchend">
					<view v-if="shopItem.number">
						<view class="shopcar">
							<view class="shopcar-top"></view>
							<view class="shopcar-center">
								<view class="center-left">
									<img src="../../static/images/son_0019_right1.png" alt="" v-if="shopItem.isClick" @click="changeClickT(index)">
									<img src="../../static/images/son_0018_right2.png" alt="" v-else @click="changeClickF(index)">
								</view>
								<view class="center-img">
									<view class="img-box">
										<img :src="shopItem.shop_goods.image_thumb" alt="">
									</view>
								</view>
								<view class="center-center">
									<view class="center-center1">
										<view class="c-size">{{shopItem.shop_goods_common.goods_name}}</view>
										<view class="c-gg" v-for="(item,index) in shopItem.shop_goods.species_value" :key = "index">规格：{{item}}</view>	
									</view>
									<view class="center-right">
										<view class="money_box">
											<view class="c-money">￥ {{shopItem.shop_goods.actual_price}}</view>
										</view>
										<view class="number-box">
											<view class="count">
												<view class="reduce" :class="shopItem.number === 1 || shopState === 2? 'noNumber':[]" @click="reduceGods(index)" id="reduce">-</view>
												<view class="number">{{shopItem.number}}</view>
												<view class="increase" :class="shopState === 2? 'noNumber':[]" @click="addGods(index)">+</view>
											</view>
										</view>
									</view>
								</view>
								
							</view>
							<view class="shopcar-bottom">合计：<text>￥ {{shopItem.shop_goods.actual_price*shopItem.number}}</text></view>
						</view>
					</view>
				</view>
			</view>

			<!-- 底部结算 -->
			<view class="settlement-box">
				<view class="settlement">
					<view class="settlement-left">
						<label>
							<checkbox-group @change="checkAll">
								<checkbox style="transform:scale(0.7)" value="cb" :checked="isCheckAll" />全选
							</checkbox-group>

							<!-- <checkbox style="transform:scale(0.7)" value="cb"  @click="selectAll" :checked="checked"/>全选 -->
						</label>
					</view>
					<view class="settlement-center">
						<view class="hj">合计: <text>￥{{choosePrice}}</text></view>
						<!-- <input type="checkbox" style="width:10px;height:10px"> -->
					</view>
					<view class="settlement-right">
						<view class="js" size="mini" @click="pay" v-if="this.shopState === 1">结算</view>
						<view  class="removeGods" size="mini" @click="deleteGods" v-else>删除</view>
					</view>
				</view>
			</view>
		</view>

		<tabbarItem></tabbarItem>
	</view>

</template>

<script>
	import tabbarItem from "../../components/tabbarItem/tabbar.vue"
	import config from '../../common/config.js';
	import {
		mapState,
		mapActions,
		mapGetters
	} from "vuex"
	export default {
		components: {
			tabbarItem,
		},
		onPullDownRefresh() { //下拉刷新
			this.getUserShopCar()
		},
		computed: {
			//总价2
			// totalPrice() {
			// 	var price_total = 0;
			// 	this.shopgods.forEach(item =>{
			// 		price_total += item.number * item.shop_goods.actual_price
			// 	})
			// 	return price_total;
			// },
			// cars(){
			// 	return this.$store.
			// }
			totalPrice: {
				get() {
					this.allPrice = 0;
					this.shopgods.forEach(item => {
						this.allPrice += item.number * item.shop_goods.actual_price
					})
					return this.allPrice
				},
				set(val) {
					this.allPrice = val;
				}
			},
			totalNum: {
				get() {
					var num_total = 0
					this.shopgods.forEach(item => {
						num_total += item.number
					})
					return num_total;
				},
				set() {

				}
			},
			//已选总数
			chooseNum(index) {
				var num_choose = 0
				this.shopgods.forEach(item => {
					if (item.isClick === true) {
						num_choose += item.number
					}
				})
				return num_choose
			},

			//已选总价
			// this.total += this.shopgods[index].number
			// this.chooseTotalPrice += this.shopgods[index].number * this.shopgods[index].shop_goods.actual_price
			choosePrice(index) {
				var price_choose = 0
				this.shopgods.forEach(item => {
					if (item.isClick === true) {
						price_choose += item.number * item.shop_goods.actual_price
					}
				})
				return price_choose
			},
			//已选商品id
			chooseID(index) {
				var ID_choose = []
				this.shopgods.forEach(item => {
					if (item.isClick === true) {
						// ID_choose = item.id
						ID_choose.push(item.id)
					}
				})
				return ID_choose
			}
		},
		data() {
			return {
				shopgods: [],
				gods: [],
				num: 0,
				allTotalArr: [],
				totalPriceArr: [],
				allToal: 0,
				/* 全部商品数量 */
				total: 0,
				/* 选中商品数量 */
				chooseTotalPrice: 0,
				/* 选中商品价格 */
				allPrice: 0,
				/* 全部商品价格 */
				isClick: false,
				/* 是否单选 */
				activeIndex: 0,
				/* 判断单选条件 */
				isCheckAll: false,
				/* 是否全选 */
				template: 0,
				/* 模板 */
				gg: null,
				chooseId:[],
				/* 选中商品id数组 */
				shopState:1,
			}
		},
		onLoad() {
			if (!uni.getStorageSync('token')) {
				// console.log(JSON.parse(localStorage.getItem("gods")))
				this.shopgods = JSON.parse(localStorage.getItem("gods"))
			} else {
				this.getUserShopCar()
			}
		},
		methods: {
			...mapActions["changeCar"],
			gotoshop() {
				uni.redirectTo({
					url: "../index/index"
				})
			},
			remove(i) {
				var gods = JSON.parse(localStorage.getItem('gods'));
				gods.splice(i, 1);
				localStorage.setItem('gods', JSON.stringify("gods"));
			},
			async getUserShopCar() {//列表
				let [err, res] = await this.$http.post("/api/cart/getUserCartItemsList")
				if (res.data.code === 200) {
					this.shopgods = res.data.data
					this.shopgods = this.shopgods.filter(item => {
						if(item.shop_goods === null){
							return false
						}
						return true
					})
					// console.log(this.shopgods)
					for (const v in this.shopgods) {
						this.$set(this.shopgods[v], "isClick", false)
					}
					uni.stopPullDownRefresh();
				}
			},
			async addGods(index) {
				this.allTotalArr.splice(0, this.allTotalArr.length)
				this.totalPriceArr.splice(0, this.totalPriceArr.length)
				for (const v in this.shopgods) {
					if (index === v / 1) {
						this.shopgods[index].number += 1
						if (uni.getStorageSync('token')) {
							let number = this.shopgods[index].number
							let shop_goods_id = this.shopgods[index].shop_goods.id
							let shop_cart_items_id = this.shopgods[index].id
							let [err, res] = await this.$http.post("/api/cart/updateCartGoods", {
								number,
								shop_goods_id,
								shop_cart_items_id,
							})
							if (res.data.code === 200) {
								console.log(111)
							} else {
								console.log(222)
							}
						} else {
							let add = JSON.parse(localStorage.getItem('gods'))
							for (const v in add) {
								if (add[v].shop_goods.id === this.shopgods[index].shop_goods.id) {
									add[v].number = this.shopgods[index].number
									localStorage.setItem('gods', JSON.stringify(add))
									return
								}
							}
						}
					}
				}

			},
			async reduceGods(index) {
				for (const v in this.shopgods) {
					if (index === v / 1) {
						this.shopgods[index].number -= 1
						if (uni.getStorageSync('token')) {
							let number1 = this.shopgods[index].number
							let shop_goods_id1 = this.shopgods[index].shop_goods.id
							let shop_cart_items_id1 = this.shopgods[index].id
							let [err, res] = await this.$http.post("/api/cart/updateCartGoods", {
								number: number1,
								shop_goods_id: shop_goods_id1,
								shop_cart_items_id: shop_cart_items_id1
							})
							if (res.data.code === 200) {
								
							} else {

							}
						} else {
							let add = JSON.parse(localStorage.getItem('gods'))
							for (const v in add) {
								if (add[v].shop_goods.id === this.shopgods[index].shop_goods.id) {
									add[v].number = this.shopgods[index].number
									localStorage.setItem('gods', JSON.stringify(add))
									return
								}
							}
						}
					}
				}
			},
			// async touchstart(index) {
			// 	for (const v in this.shopgods) {
			// 		if (index === v / 1) {
			// 			let that = this;
			// 			clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
			// 			this.Loop = setTimeout(function() {
			// 				uni.showModal({
			// 					title: '删除',
			// 					content: '请问要删除本条消息吗？',
			// 					success: (res) => {
			// 						if (res.confirm) {
			// 							this.shopgods[index].number = 0
			// 							let shop_cart_items_id = this.shopgods[index].id

			// 							if (uni.getStorageSync('token')) {
			// 								let token = uni.getStorageSync('token')
			// 								// this.asaa()
			// 								uni.request({
			// 									url: config.webUrl + "/api/cart/deleteGoodsFromCart",
			// 									data: {
			// 										shop_cart_items_id,
			// 									},
			// 									header: {
			// 										'shop': 1, //自定义请求头信息
			// 										'Authorization': token,
			// 									},
			// 									success: (res) => {
			// 										this.getUserShopCar()
			// 									}
			// 								})
			// 							} else {
			// 								let add = JSON.parse(localStorage.getItem('gods'))
			// 								for (const v in add) {
			// 									if (add[v].shop_goods.id === this.shopgods[index].shop_goods.id) {
			// 										add.splice(add[v], 1)
			// 										localStorage.setItem('gods', JSON.stringify(add))
			// 										this.shopgods = JSON.parse(localStorage.getItem("gods"))
			// 										return
			// 									}
			// 								}
			// 							}
			// 						} else if (res.cancel) {
			// 							console.log('用户点击取消');
			// 						}
			// 					}
			// 				});
			// 			}.bind(this), 600);
			// 		}
			// 	}
			// },
			async asaa(){
				let [err,res] = await this.$http.post("/api/cart/deleteGoodsFromCart",{
					shop_cart_items_id:shop_cart_items_id
				})
				if(res.data.code === 200){
					this.getUserShopCar()
				}
			},
			removeGods(){
				//默认为1，购买商品。
				//2是删除商品
				this.shopState = 2
				for(const v in this.shopgods){
					this.shopgods[v].isClick = false
				}
				this.isCheckAll = false
			},
			chooseGods(){
				this.shopState = 1
				for(const v in this.shopgods){
					this.shopgods[v].isClick = false
				}
				this.isCheckAll = false
			},
			touchend() {
				console.log('结束')
				clearInterval(this.Loop);
			},
			changeClickF(index) {
				let number = 0
				this.shopgods[index].isClick = true
				for (const v in this.shopgods) {
					if(this.shopgods[v].isClick === true){
						number++
						if(number === this.shopgods.length){
							this.isCheckAll = true;
						}
					}
				}
				return this.total
			},
			changeClickT(index) {
				this.isCheckAll = false
				for (const v in this.shopgods) {
					if (index === v / 1) {
						this.shopgods[index].isClick = false
					}
				}
				return this.total
			},
			//全选和反选
			checkAll(el) {
				console.log(el)
				const checkedItems = el.detail.value
				console.log(checkedItems)
				if (checkedItems.length === 0) {
					for (const v of this.shopgods) {
						this.total -= v.number
						this.chooseTotalPrice -= v.number * v.shop_goods.actual_price
						v.isClick = false
						this.isCheckAll = false;
						this.shopgods.slice(this.shopgods.indexOf(v), 1, v)
					}
				} else {
					this.total = 0
					this.chooseTotalPrice = 0
					for (const v of this.shopgods) {
						this.total += v.number
						this.chooseTotalPrice += v.number * v.shop_goods.actual_price
						v.isClick = true
						this.isCheckAll = true;
						this.shopgods.slice(this.shopgods.indexOf(v), 1, v)
					}
				}
			},
			async pay() {
				if (this.chooseNum === 0) {
					uni.showToast({
						title: '请您挑选您的商品',
						duration: 1000,
						icon:'none'
					})
					return
				}
				if (uni.getStorageSync('token')) {
					let [err, res] = await this.$http.post("/api/orders/updatePreparedOrders", {
						shop_orders_source: 2,
						shop_cart_items_ids: this.chooseID
					})
					if (res.data.code === 200) {
						function getCar(){
							return localStorage.cars? JSON.parse(localStorage.cars) : [] 
						}
						this.chooseId = this.chooseID
						this.$store.state.mycar.cars = this.chooseId 
						localStorage.cars = JSON.stringify(this.$store.state.mycar.cars)
						let timer = setTimeout(() => {
							uni.showToast({
								title: '正在跳转结算页面',
								duration: 1000,
								icon:'none'
							})
							clearTimeout(timer)
							let timer2 = setTimeout(() => {
								uni.navigateTo({
									url: "../../pages/settle-accounts/settle-accounts"
								})
								clearTimeout(timer2)
							}, 1000)
						}, 0);
					} else {
						console.log(11111)
					}
				} else {
					let timer = setTimeout(() => {
						uni.showToast({
							title: "请登录",
							duration: 1000,
							icon:'none'
						})
						clearTimeout(timer)
						let timer2 = setTimeout(() => {
							uni.redirectTo({
								url: "../../pages/login/login"
							})
						}, 1000)
					}, 0)
				}
			},
			async deleteGods(){
				if (uni.getStorageSync('token')) {
					let [err, res] = await this.$http.post("/api/cart/deleteGoodsFromCartMassively", {
						shop_cart_items_ids: this.chooseID
					})
					if (res.data.code === 200) {
						this.getUserShopCar()
					} 
				} else {
					let add = JSON.parse(localStorage.getItem('gods'))
					if(this.isCheckAll === true){
						localStorage.removeItem('gods')
						this.shopgods = JSON.parse(localStorage.getItem("gods"))
						return
					}
					for(let a = 0; a < this.chooseID.length ;a++){
						console.log(this.chooseID)
						for(let v in add){
							console.log(this.chooseID[a])
							if(add[v].id === this.chooseID[a]){
								add.splice(v, 1)
							}
						}
					}
					localStorage.setItem('gods', JSON.stringify(add))
					this.shopgods = JSON.parse(localStorage.getItem("gods"))
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f7f7f7;
	}

	/* 头部 */
	.header {
		width: 100%;
		height: 100upx;
		background: #4ac6ff;
		position: fixed;
		top: 0;
	}

	// 顶部信息
	.message-box {
		width: 100%;
		height: 120upx;
		position: fixed;
		top: 24upx;
		padding: 0 35upx;
	}
	.compile{
		height:74upx;
		display:flex;
		justify-content: space-between;
		align-items: center;
		.compile-left{
			display:flex;
			align-items: center;
			margin-left:44upx;
			img{
				width:30upx;
				height:30upx;
			}
			p{
				// margin-left:13upx;
				font-size:30upx;
				line-height:30upx;
				color:#999999;
			}
		}
		.compile-right{
			p{
				color:#379dff;
				font-size:30upx;
				margin-right:32upx;
			}
		}
	}
	.message {
		width: 100%;
		height: 120upx;
		background: #ffffff;
		border-radius: 20upx;
		box-shadow: 0upx 4upx 16upx #b5b5b5;

		.massage-title {
			font-size: 30upx;
			padding-top: 32upx;
			padding-left: 24upx;
			color: #666666;

			.blue {
				color: #369eff;
				margin: 0 6upx;
			}

			.orange {
				color: #f49c17;
				margin: 0 6upx;
			}
		}

		.xian {
			width: 18upx;
			height: 4upx;
			background: #369eff;
			margin-left: 60upx;
			margin-top: 12upx;
		}
	}

	.header-bu {
		width: 100%;
		height: 140upx;
		background: #ffffff;
	}

	//购物车
	.shopcar-box {
		width: 100%;
		// height: 372upx;
		background: #ffffff;
		padding: 0 35upx;
		margin-bottom: 15upx;

		.shopcar {
			width: 100%;
			// height: 400upx;
			overflow: hidden;

			.shopcar-top {
				width: 100%;
				height: 40upx;
				margin-top: 7upx;
				border-bottom: 1px solid #f0f0f0;

				font-size: 20upx;
				color: #333333;
				line-height: 68upx;
				padding-left: 52upx;
			}

			.shopcar-center {
				width: 100%;
				// height: 244upx;
				border-bottom: 1px solid #f0f0f0;
				// overflow: hidden;
				display: flex;

				.center-left {
					width: 56upx;
					height: 100%;

					img {
						width: 30upx;
						height: 30upx;
						margin: 116upx 0 0 10upx;
					}
				}

				.center-img {
					width: 152upx;
					height: 100%;

					.img-box {
						width: 152upx;
						height: 152upx;
						border-radius: 16upx;
						background: red;
						overflow: hidden;
						margin-top: 34upx;
						margin-bottom: 34upx;

						img {
							width: 100%;
							height: 100%;
						}
					}

				}

				.center-center {
					width: 470upx;
					// height: 230upx;
					// view {
					// 	padding-left: 20upx;
					// }
					.center-center1{
						width:100%;
						// height: 74upx;
						// background: #007AFF;
						padding-left: 16upx;
					}
					
					.center-right {
						width:100%;
						// height: 100%;
						// background: #1AAD19;
						display: flex;
						.money_box{
							padding-left: 16upx;
							width:50%;
							// height: ;
							// background: #2C405A;
						}
						.number-box{
							width:50%;
							// background: #555555;

						}
						.freight {
							color: #888888;
							font-size: 26upx;
							text-align: right;
							line-height: 68upx;
						}
					
						.count {
							margin-top: 36upx;
							margin-left: 94upx;
							width: 60%;
							height: 38upx;
							border: 1px solid #cbcbcb;
							border-radius: 6upx;
							display: flex;
							overflow: hidden;
							align-items: center;
							justify-content: space-between;
							.reduce {
								text-align: center;
								line-height: 34upx;
								width: 34upx;
								height: 34upx;
								background: #e9e8ed;
								border-right: 1px solid #cbcbcb;
								&.noNumber {
									background: #b9b9b9;
									cursor: not-allowed;
									pointer-events: none;
								}
							}
							.number {
								// width:78upx;
								// height: 34upx;
								font-size: 20upx;
							}
					
							.increase {
								width: 34upx;
								height: 34upx;
								background: #e9e8ed;
								border-left: 1px solid #cbcbcb;
								text-align: center;
								line-height: 34upx;
								&.noNumber {
									background: #b9b9b9;
									cursor: not-allowed;
									pointer-events: none;
								}
							}
						}
					}
					
					.c-name {
						width: 100%;
						height: 38upx;
						color: #19110b;
						font-size: 30upx;
						line-height: 38upx;
						padding-top: 40upx;
					}

					.c-size {
						width: 100%;
						height: 36upx;
						line-height: 36upx;
						color: #19110b;
						font-size: 34upx;
						margin-top: 40upx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.c-gg {
						font-size: 20upx;
						color: #888888;
						margin-top: 6upx;
					}

					.c-money {
						margin-top: 36upx;
						font-size: 30upx;
					}
				}

				
			}

			.shopcar-bottom {
				text-align: right;
				width: 100%;
				height: 88upx;
				float: right;
				color: #888888;
				font-size: 30upx;
				line-height: 80upx;

				text {
					font-size: 30upx;
					color: #f7b144;
				}
			}
		}
	}

	//底部结算
	.settlement-box {
		width: 100%;
		height: 91upx;
		border-top: 1px solid #b7b7b7;
		background: #ffffff;
		position: fixed;
		bottom: 100upx;

		.settlement {
			display: flex;
			padding: 0 20upx 0 48upx;

			.settlement-left {
				width: 260upx;
				height: 91upx;
				line-height: 91upx;
			}

			.settlement-center {
				width: 250upx;
				height: 91upx;
				text-align: right;
				line-height: 54upx;
				position: relative;

				.hj {
					margin-top: 5upx;
					line-height: 80upx;
				}

				.yf {

					margin-top: -20upx;
					font-size: 20upx;
				}

				view {
					font-size: 30upx;
					color: #888888;
				}

				text {
					color: #ffb138;
					padding-left: 10upx;
				}
			}

			.settlement-right {
				width: 164upx;
				height: 91upx;
				button {
					background: #369eff;
					color: #ffffff;
					font-size: 26upx;
					margin: 16upx 0 0 34upx;
					// width:120upx;
					// height: 60upx;
				}
				.removeGods{
					background:#FF5736;
					color: #ffffff;
					width:124upx;
					height: 64upx;
					text-align: center;
					line-height: 64upx;
					font-size: 28upx;
					border-radius: 10upx;
					margin: 16upx 0 0 34upx;
				}
				.js{
					width:124upx;
					height: 64upx;
					background: #369eff;
					text-align: center;
					line-height: 64upx;
					font-size: 28upx;
					color:#ffffff;
					border-radius: 10upx;
					margin: 16upx 0 0 34upx;
				}
			}
		}
	}
</style>
