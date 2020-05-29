<template>
	<view>
		<view class="isloading" v-if="this.realDetail.length === 0 ">
			<img src="../../static/images/loading.gif" alt="" >
		</view>
		<view v-else>
			<!-- 分享后弹出 -->
			<view class="wolsok" v-if="d_isLoading">
				<img src="../../static/images/加载中-海报alpha.gif" alt="" >
			</view>
			<view class="mask" v-if="isShare">
				<div class="buyImg swiper-container">
					<div class="swiper-wrapper">
						<div
						  v-for="(item,index) in shareImg_box" 
						  :key="index"
						  class="swiper-slide"
						>
							<!-- <view class="mask_name">
								<view class="mask_name_headPortrait">
									<image :src="CustomerInfo.user_headimgurl" mode=""></image>
								</view>
								<view class="mask_name_headline">
									<view class="">
										您的好友 <text>{{CustomerInfo.user_nickname}}</text>
									</view>
									<view class="">
										向您推荐了一款美食
									</view>
								</view>
							</view> -->
							<!-- <view class="mask_img">
								<image :src="item.url" mode=""></image>
							</view>
							<view class="mask_presentation">
								<view class="">{{realDetail.goods_title}}</view>
								<view class="">{{realDetail.goods_name}}</view>
							</view>
							<view class="mask_code">
								<view class="mask_code_money">
									<view class="">￥ {{realDetail.price}}</view>
									<view class="">
										原价：￥{{realDetail.origin_price}}
									</view>
								</view>
								<view class="mask_code_code">
									<view class="">
										<image :src="shareImg" mode=""></image>
									</view>
									<view class="">
										扫描或长按二维码
									</view>
								</view>
							</view> -->
						 <img
							:src="item"
						  >
						</div>
					</div>
					
				<!-- 	<div class="goX" @click="noShare">
						<img src="../../static/images/APP-qie3_0003_02-close.png" alt="" >
					</div> -->
					<!-- quxiao -->
				</div>
				<div class="goX" @click="noShare">
					<img src="../../static/images/APP-qie14_0005_close.png" alt="" >
				</div>
				<view 
					class="copylink" 
					@click="getWebUrl"
					v-clipboard:copy="copyText"
					v-clipboard:success="onCopy">
					<image src="../../static/images/APP-qie16_0004_链接按钮.png" mode=""></image>
					<view class="">
						复制链接
					</view>
				</view>
			</view>
<!-- 			<view class="sharebox" v-if="isShare">
				<view class="sharebox-view1" v-if="isload">
					<img src="../../static/images/loading.gif" alt="" >
				</view>
				<view class="sharebox-view" v-else>
					<image :src="shareImg" mode=""></image>
				</view>
				<view class="share-border"></view>
				<view class="x"  @click="isShare = false">
					<img src="../../static/images/x.png" alt="">
				</view>
			</view> -->
			<view id="example-buy">
				<view class="uni-padding-wrap">
					<img src="../../static/images/APP-qie-out.png" alt="" class="goback" @click="goback">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							 <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor">
								<swiper-item v-for="(item,index) in realDetail.main_images" :key="index" >
									<view class="swiper-item">
										<image :src="item.url" class="iwd"></image>
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
				<view class="wenbens">
					<view class="wen-line">
						<view class="ifnoGods">
							<h3 class="shopname">{{realDetail.goods_name}}</h3>
							<p v-if="flag === false">【已售罄】</p>
						</view>
						<text class="yellow">￥{{realDetail.price}}</text><br />
						<text class="yun">运费：￥{{this.item_info.base_price}}</text>	
						<text 
							v-if="realDetail.max_rebate !== '0.00'" 
							class="self-buying">自返
						</text>
						<!-- class="self-buying">最高返{{realDetail.max_rebate}}元 -->
					</view>
				</view>
				<view class="wenbens" @tap="isshow = !isshow">
					<view class="wen-line">
						<text class="shopnamee text-ma">促销</text>
					<!-- 	<text class="yellow-bg text-ma">满减送</text> -->
						<text class="yun-bd text-ma" v-if="item_info.is_free === 1">{{item_info.template_name}}</text>
						<!-- <image src="../../static/san.png" class="point"></image> -->
					</view>
				</view>
				<view class="wenbens" >
					<view class="wen-line">
						<text class="shopname text-ma">规格：</text>
						<!-- <image src="../../static/san.png" class="point"></image> -->
					</view>
				</view>
				<view class="flex-buy">
					<view class="btn-area">
						<!-- <view class="alert-box" v-if="is_alert" >
							<view @click="goShareCoupon">分享优惠券</view>
							<view @click="shareShopCouponCode">
							  分享商品
								<i class="market-nav-arrow"></i>
							</view>
						</view> -->
						<view url="" hover-class="navigator-hover" class="btn01"@click="shareShopCouponCode">
							<img src="../../static/images/APP-qie10_share.png" class="share"><br />
							<text class="nav-share" style="color:#F3B047">分享</text>
						</view>
						<view url="" hover-class="navigator-hover" class="btn01" @click="gotoPocket">
							<img src="../../static/images/APP-qie-big.png" class="share"><br />
							<text class="nav-share">口袋</text>
						</view>
						<view url="" hover-class="navigator-hover" class="btn01"  @click="gotoIndex">
							<img src="../../static/images/APP-qie-list.png" class="share"><br />
							<text class="nav-share">首页</text>
						</view>
						<view url="" open-type="redirect" hover-class="other-navigator-hover" class="btn02" v-if="flag === true">
							<button type="default" class="nav-btn" @click="addGood"><text>加入购物车</text></button>
						</view>
						<view url="" open-type="switchTab" hover-class="other-navigator-hover" class="btn03" v-if="flag === true">
							<button type="default" class="nav-btn1" @click="gotopocket"><text>立即购买</text></button>
						</view>
						<view v-else class="noGods">
							<view class="noGodsInfo">该商品已售罄</view>
						</view>
					</view>
				</view>
				<!-- <scroll-view scroll-y="true" class="scroll-Y"> -->
				<view class="bot" @click="is_alert = false">
					<view>
						<img :src="item.url" class="iwdd" v-for="(item,index) in realDetail.goods_description" :key = "index">
					</view>
				</view>
				<transition name="bounce">
					<view v-if="show" @tap.stop ="closed()" class="zhe-hidden">
						<view class="alert-shop" @tap.stop ="show = true">
							<view class="alert-shop-t">
								<view class="alert-shop-t-show">
									<image :src="selectshop === null ? realDetail.main_images_default : selectshop.image_thumb"></image>
								</view>
								<view class="shop-show-right">
									<text class="shopname">{{realDetail.goods_name}}</text><br />
									<text class="yellow">￥{{ selectshop === null ? realDetail.price : selectshop.actual_price }}</text>
										
									<view  v-if="isLogin === true">
										<text class="self-buyingz" v-if="selectshop !== null && selectshop !== undefined && selectshop !== '' && selectshop.rebate !=='0.00'">自购返利</text>
										<text v-else></text>
									</view>
									<view  v-else>
										<text class="self-buyingz" v-if="selectshop !== null && selectshop !== undefined && selectshop !== '' && selectshop.rebate !=='0.00'">最高返利元</text>
										<text v-else></text>
									</view>	
									<image src="../../static/images/APP-qie3_0003_02-close.png" class="shop-closed" @tap.stop ="closed()"></image>
								</view>
							</view>
							<scroll-view style="height:200px" :scroll-y="true">
								<view class="specification-content">
									<view class="specification-item" v-for="(item, index1) in speciesMap" :key="index1">
										<view class="item-title">{{ speciesNames[index1] }}</view>
										<view class="item-wrapper">
											<view
												class="item-content"
												v-for="(item_value, index2) in item"
												@tap="skuClick2(index1, index2)"
												:key="index2"
												:class="[selectedSpecies[index2] !== undefined ? 'actived' : '', blockSpecies[index2] !== undefined ? 'noactived' : '']"
											>
												{{ item_value }}
											</view>
										</view>
									</view>
								</view>	
							</scroll-view>
							<view class="shop-num">
								<text>购买数量：</text>
								<view class="shop-num-btn">
									<button class="num-btn-k" :class="num === 1 ? 'cantChoose' : ''" @tap.stop="reduce()">-</button>
									<input type="text" placeholder="0" class="shop-num-s" v-model.number="num" />
									<button class="num-btn-a" @tap.stop="add()">+</button>
								</view>
							</view>
							<view class="alert-shop-good"  @click.stop="confirmChoose" >
								<text>选好啦</text>
							</view>
						</view>
					</view>
				</transition>
				<transition name="bounce">
				<view class="zhe-hidden" v-if="isshow" @tap.stop="isclosed">
					<view class="discounts" @tap.stop="isshow =true">
						<view class="discounts-top">
							<text>优惠</text>
							<image src="../../static/images/APP-qie3_0003_02-close.png" class="shop-closed" @tap.stop="isclosed"></image>
						</view>
						<view class="discounts-main">
							<text>满减：</text>
							<view class="discounts-btn">
								<view class="yellow-btn" v-if="item_info.is_free === 1" @click="isfree = !isfree" :class="isfree === true ? 'isfree': ''">{{item_info.template_name}}</view>
							<!-- 	<view class="yellow-btn">满138减15元</view>
								<view class="yellow-btn">满1000减200元</view> -->
							</view>
						</view>
						
						<view class="alert-shop-good" @click.stop="discountsChoose">
							<text>选好啦</text>
						</view>
					</view>
				</view>
				</transition>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		onPullDownRefresh() {//下拉刷新
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		data() {
			return {
				isload:true,
				shareImg:null,
				show: false,
				isshow:false,
				getId:null,
				detail:[],
				realDetail:[],
				keyGods:null,
				weight:"",
				size:"",
				activeIndex:0,
				addChoose:[],
				isChoose:false,
				selected_sku: {},
				available_sku: {},
				choose_sku:[],
				all_sku: [],
				b:[],
				shop_goods_id:null,//带sku商品id
				shop_goods_common_id:null,//商品公共信息id
				num:1,//数量
				gods:[],//localStorage数据,
				shop_goods:{},//localStorage数据,
				allgods:{},
				id:0,//localStorage数据
				chooseTrueNum:0,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				indicatorColor:"#ffffff",
				indicatorActiveColor:"#369eff",
				isShare:false,
				isHave:false,
				price:null,
				pricearr:[],
				selected_sku1: {},
				ceshi:[],
				sku_gods:{},
				item_info:{//商品折扣信息
					base_price:null,
					continue_price:null,
					free_condition:null,
					is_free:null,
					template_name:null,
					skuid:null,
				},
				isfree:false,
				is_alert:false,
				sku:[],
				//sku信息
				sku_keys:[],//储存skukey
				sku_values:[],//储存skuvalue
				specifications:[],
				sku_JQinfo:[],
				itemPrice:false,
				godsStock:[],
				flag:true,//判断是否全部售罄
				token:null,
				godsRebit:null,
				skuid:null,

				

				subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
				selectshop: null, //存放最后选中的商品
				selectNum: 1, //选中数量,

                speciesMap: {},
                selectedSpeciesMap: {},
                UnselectedSpeciesMap: {},
                selectedSpecies: {},
                speciesNames: {},
                shopGoodsList: [],
                blockSpecies: {},
                availableGoods: [],
				
				levelSort:null,
				isLogin:false,
				d_status:null,
				swiper1:null,
				phoneInfo:{
					width:null,
					height:null,
				},
				imgInfo:[
					
				],
				windowHeight:false,
				CustomerInfo:{},
				copyText:null,
				shareImg_box:[],
				d_isLoading:false,
				s_customer_id:null
			}
		},
		onLoad(option) {
			if(option.wx_pid !== undefined && option.wx_pid !== null && option.wx_pid !== ''){//从微信来的上级id
				uni.setStorageSync('wx_pid', option.wx_pid);
			}
			uni.getSystemInfo({
			    success: (res) => {
					if(res.windowHeight > 723){
						this.windowHeight = true
					}
			    }
			});
			if (uni.getStorageSync('token')) {
				// console.log(JSON.parse(localStorage.getItem("gods")))
				this.isLogin = true
			} else {
				this.isLogin = false
			}
			if(option.product_id !== undefined && option.product_id !== '' && option.product_id !== null){
				uni.setStorageSync('product_id', option.product_id);
			}
			// this.getId = parseInt(option.product_id)
			const levelSort = uni.getStorageSync('distribution_level_sort');
			this.levelSort = levelSort
			if(option.customer_id){
				uni.setStorageSync('customer_id',option.customer_id);
			}
			this.getCarsInfo()
			this.d_status = this.getQueryVariable("state")
			this.getBecomeSilent()
			this.getCumstomerInfo()
		},

		onShow(){
			this.getname()
		},
		computed: {
			canCount() {
				return this.subIndex.some(item => item === -1);
			}
		},
		methods: {
			async getWebUrl(){
				let [err, res] = await this.$http.post('/api/shop/getShortUrl',{
					long_url:config.webUrl1 + "/#/pages/QRcode/QRcode?customer_id=" + this.CustomerInfo.customer_id + "&type=2&id=" + this.getId
				});
				if(res.data.code === 200){
					uni.showToast({
						icon:'none',
						title:'生成链接成功'
					})
					// this.copyText = null
					this.copyText = res.data.data.splicing_domain_name
					console.log(this.copyText)
				}
			},
			onCopy(e){
				
			},
			async getCumstomerInfo() { //获取用户个人信息
				let token = uni.getStorageSync("token")
				if(token === undefined || token === null || token === ''){
					return false
				}
				let [err, res] = await this.$http.post('/api/customer/getCustomerInfo');
				if (res.data.code === 200) {
					this.CustomerInfo = res.data.data
					// console.log(res.data.data)
				}
			},
			aaa(e){
				e.target.id = "aaa"
				// console.log(e)
			},
            skuClick2(speciesNameId, speciesId) {
				console.log(speciesNameId)
				console.log(speciesId)
				// console.log(this.UnselectedSpeciesMap)
                if (speciesNameId !== null && speciesId !== null) {
                    if (this.blockSpecies[speciesId] !== undefined) {
                        return
                    }
                    if (this.selectedSpecies[speciesId] === undefined || this.selectedSpecies[speciesId] === null) {
                        this.selectedSpeciesMap[speciesNameId] = this.speciesMap[speciesNameId]
                        delete this.UnselectedSpeciesMap[speciesNameId]

                        const selectedSpecies = {}
                        selectedSpecies[speciesId] = speciesId
                        for (const i in this.speciesMap[speciesNameId]) {
                            if (this.selectedSpecies[i] !== undefined || this.selectedSpecies[i] !== null) {
                                delete this.selectedSpecies[i]
                            }
                        }
                        this.selectedSpecies = Object.assign(this.selectedSpecies, selectedSpecies)
                    } else {
                        this.UnselectedSpeciesMap[speciesNameId] = this.speciesMap[speciesNameId]
                        delete this.selectedSpeciesMap[speciesNameId]
                        const selectedSpecies = Object.assign({}, this.selectedSpecies)
                        delete selectedSpecies[speciesId]
                        this.selectedSpecies = Object.assign({}, selectedSpecies)
                    }
                }
                const blockSpecies = {}
                const allIds = this.filterProduct(this.selectedSpecies)
                for (const v in this.UnselectedSpeciesMap) {
                    for (const i in this.UnselectedSpeciesMap[v]) {
                        if (allIds[i] === undefined || allIds[i] === null) {
                            blockSpecies[i] = i
                        }
                    }
                }
                for (const v in this.selectedSpeciesMap) {
                    const selectedSpecies = Object.assign({}, this.selectedSpecies)
                    for (const i in this.selectedSpeciesMap[v]) {
                        if (selectedSpecies[i] !== undefined && selectedSpecies[i] !== null) {
                            delete selectedSpecies[i]
                        }
                    }
                    const allIds = this.filterProduct(selectedSpecies)
                    for (const i in this.selectedSpeciesMap[v]) {
                        if (allIds[i] === undefined || allIds[i] === null) {
                            blockSpecies[i] = i
                        }
                    }
                }
                this.blockSpecies = blockSpecies
				this.filterProduct(this.selectedSpecies)
				if (this.availableGoods.length === 1) {
					this.selectshop = this.availableGoods[0]
					this.skuid = this.selectshop.id
					console.log(this.selectshop)
				} else {
					this.selectshop = null
				}
            },
            filterProduct(selectedSpecies) {
                this.availableGoods = []
                const result = {}
                for (const goods of this.shopGoodsList) {
                    let available = true
                    for (const v in selectedSpecies) {
                        if (goods.species_value[v] === undefined || goods.species_value[v] === null) {
                            available = false
                            break
                        }
                    }
                    if (available) {
                        this.availableGoods.push(goods)
                        for (const i in goods.species_value) {
                            result[i] = i
                        }
                    }
                }
                return result
            },
			gotoPocket(){
				uni.navigateTo({
					url:"../pocket/pocket"
				})
			},
			gotoIndex(){
				uni.navigateTo({
					url:"../index/index"
				})
			},
			discountsChoose(){
				this.isshow = false
			},
			//数组对象去重
			deteleObject(obj) {
			    var uniques = [];
			    var stringify = {};
			    for (var i = 0; i < obj.length; i++) {
			        var keys = Object.keys(obj[i]);
			        keys.sort(function(a, b) {
			            return (Number(a) - Number(b));
			        });
			        var str = '';
			        for (var j = 0; j < keys.length; j++) {
			            str += JSON.stringify(keys[j]);
			            str += JSON.stringify(obj[i][keys[j]]);
			        }
			        if (!stringify.hasOwnProperty(str)) {
			            uniques.push(obj[i]);
			            stringify[str] = true;
			        }
			    }
			    uniques = uniques;
			    return uniques;
			},
			remove(i){
			    var gods = JSON.parse(localStorage.getItem('gods'));
			    gods.splice(i, 1);
			    localStorage.setItem('gods', JSON.stringify("gods"));
			},
			async getCarsInfo(){
				 const product_id = uni.getStorageSync('product_id');
				 this.getId = product_id
				let [err,res] = await this.$http.post("/api/shop_goods/getShopGoodsCommonInfo",{
					goods_common_id:this.getId ,
					levelSort:this.levelSort
				});
				if(res.data.code === 200){
					this.realDetail = res.data.data
					// console.log(this.realDetail)
					this.speciesMap = Object.assign({}, res.data.data.species_values)
					this.UnselectedSpeciesMap = Object.assign({}, res.data.data.species_values)
					
					this.speciesNames = Object.assign({}, res.data.data.species_names)
					for (const goods of res.data.data.product_goods) {
						if (goods.stock > 0 && goods.status === 1) {
							this.shopGoodsList.push(goods)
						}
					}
					if (this.shopGoodsList.length === 1) {
						for (const i in this.shopGoodsList[0].species_value) {
							this.selectedSpecies[i] = i 
						}
					}
					if (this.shopGoodsList.length <= 0) {
						this.flag = false
					}
					this.skuClick2(null, null)
					// this.item_info.sku_id = res.data.data.shop_goods_freight_template
					this.item_info.base_price = res.data.data.shop_goods_freight_template.base_price
					this.item_info.continue_price = res.data.data.shop_goods_freight_template.continue_price
					this.item_info.free_condition = res.data.data.shop_goods_freight_template.free_condition
					this.item_info.is_free = res.data.data.shop_goods_freight_template.is_free
					this.item_info.template_name = res.data.data.shop_goods_freight_template.template_name
				}
			},
			async  confirmChoose(){
				if (this.selectshop === null) {
					uni.showToast({
						title:'请选择商品规格',			
						icon:"none",
						duration:1000,							
					})
					return
				}
				//有token点击加入购物车
				if(this.chooseTrueNum === 1){
					// if(this.isHave === false){
					// 	uni.showToast({								
					// 		title:'请选择您需要的商品规格',								
					// 		duration:1000,							
					// 	})
					// 	this.show = false
					// 	return
					// }
					console.log(this.selectshop)
					this.godsRebit = this.selectshop.rebate
					this.isShowPrice = false
					if(this.selectshop.actual_price === "" || this.selectshop.actual_price === undefined ||  this.selectshop.actual_price === null){
						uni.showToast({
							title:'请选择商品规格',	
							icon:"none",
							duration:1000,							
						})
						this.show = false
						return
					}
					let [err,res] = await this.$http.post("/api/cart/addGoodsToCart",{
							shop_goods_id:this.selectshop.id,
							shop_goods_common_id:this.selectshop.goods_common_id,
							number:this.num,
					})
					if(res.data.code === 200){
						uni.showToast({
							title:"加入购物车成功",
							icon:"none",
							duration: 1000,
						})	
					}
					this.show = false
					return
				}
				//有token点击立即购买
				if(this.chooseTrueNum === 2 || this.chooseTrueNum === 4) {
					// if(this.isHave === false){
					// 	uni.showToast({								
					// 		title:'请选择您需要的商品规格',								
					// 		duration:1000,							
					// 	})
					// 	this.show = false
					// 	return
					// }
					if(this.selectshop.actual_price === "" || this.selectshop.actual_price === undefined ||  this.selectshop.actual_price === null){
						uni.showToast({
							title:'请选择您需要的商品规格',		
							icon:"none",
							duration:1000,							
						})
						this.show = false
						return
					}
					let [err,res] = await this.$http.post("/api/orders/updatePreparedOrders",{
						shop_orders_source : 1,
						shop_goods_id : this.selectshop.id,
						shop_goods_number : this.num
					})
					if(res.data.code === 200){
						console.log(this.selectshop.id)
						uni.showToast({
							// title:'请稍后',
							// duration:1000
							icon:'loading'
						})
						setTimeout(() => {
							uni.navigateTo({
								url:"../../pages/settle-accounts/settle-accounts"
							})
						}, 500)
					}
				}
				//无token点击加入购物车
				if(this.chooseTrueNum === 3){
					// if(this.isHave === false){
					// 	uni.showToast({
					// 		title:'请选择您需要的商品规格',
					// 		duration:1000,
					// 	})
					// 	return 
					// }
					if(this.selectshop.actual_price === "" || this.selectshop.actual_price === undefined ||  this.selectshop.actual_price === null){
						uni.showToast({
							title:'请选择您需要的商品规格',	
							icon:"none",
							duration:1000,							
						})
						this.show = false
						return
					}
					this.allgods.number = this.num
					this.allgods.isClick = false
					this.gods.push(this.allgods)
					if(this.isHave === true){
						uni.showToast({
							title:'请稍后',
							icon:"none",
							duration:1000,
						})
					}
					let add = JSON.parse(localStorage.getItem('gods'))  
					if(add === null || add.length === 0){
						localStorage.setItem('gods',JSON.stringify(this.gods))
						this.show = false
						return
					}	
					for(const v in add){
						if(add[v].shop_goods.id === this.allgods.shop_goods.id){
							this.remove(v)
							this.gods.splice(v,1).push(this.allgods)
							localStorage.setItem('gods',JSON.stringify(this.gods))
							this.show = false
							return 
						}
					}
					for(const p in add){
						add.push(this.allgods)
						let add1 = add
						if(add[p].shop_goods.id !== this.allgods.shop_goods.id){
							for(let i =0 ;i < add1.length;i++){
								let item = add1[i]
								for(let j = i + 1;j < add1.length;j++){
									if(item.shop_goods.id == add1[j].shop_goods.id){
										add1.splice(j,1)
									}
								}
							}
							this.gods = add1
							window.localStorage.removeItem('gods')
							localStorage.setItem('gods',JSON.stringify(this.gods))
						}
						this.show = false
						return 
					}	
				}
				//无token点击立即购买
				if(false){
					if(this.isHave === false){
						uni.showToast({
							title:'请选择您需要的商品规格',
							duration:1000,
						})
						return 
					}
					this.allgods.number = this.num
					this.allgods.isClick = false
					this.gods.push(this.allgods)
					if(this.isHave === true){
						console.log(this.isHave)
						uni.showToast({
							title:'请稍后',
							duration:1000,
						})
					}
					let add = JSON.parse(localStorage.getItem('gods'))  
					if(add === null || add.length === 0){
						localStorage.setItem('gods',JSON.stringify(this.gods))
						this.show = false
						uni.redirectTo({
							url:"../../pages/login/login"
						})
						return 
					}
					for(const v in add){
						if(add[v].shop_goods.id === this.allgods.shop_goods.id){
							this.remove(v)
							this.gods.splice(v,1).push(this.allgods)
							localStorage.setItem('gods',JSON.stringify(this.gods))
							this.show = false
							uni.redirectTo({
								url:"../../pages/login/login"
							})
							return 
						}
					}
					for(const p in add){
						add.push(this.allgods)
						let add1 = add
						if(add[p].shop_goods.id !== this.allgods.shop_goods.id){
							for(let i =0 ;i < add1.length;i++){
								let item = add1[i]
								for(let j = i + 1;j < add1.length;j++){
									if(item.shop_goods.id == add1[j].shop_goods.id){
										add1.splice(j,1)
									}
								}
							}
							this.gods = add1
							window.localStorage.removeItem('gods')
							localStorage.setItem('gods',JSON.stringify(this.gods))
						}
						uni.redirectTo({
							url:"../../pages/login/login"
						})
						this.show = false
						return 
					}
				}
			},
			getCar(){
				return localStorage.gods? JSON.parse(localStorage.gods) : [] 
			},
			addGood(){
				this.show = true				
				if(uni.getStorageSync('token') === ''){				
					this.chooseTrueNum = 3
				}else{
					this.chooseTrueNum = 1				
				}			
			},
			gotopocket(){
				this.show = true
				if(uni.getStorageSync('token') === ''){
					this.chooseTrueNum = 4
				}else{
					this.chooseTrueNum = 2				
				}	
			},
			goback(){
				const value = uni.getStorageSync('customer_id');
				if (value) {
					uni.redirectTo({
						url: '/pages/index/index',
					});
				}else{
					uni.navigateBack({
						 delta: 1,
					})
				}
				// if(this.$route.type === undefined){
				// 	uni.redirectTo({
				// 		url: '/pages/index/index',
				// 	});
				// }else{
				// 	uni.redirectTo({
				// 		url: '/pages/index/index',
				// 	});
				// }
			},
			closed: function() {
				this.show = false;
			},
			isclosed: function() {
				this.isshow = false;
			},
			add:function(){
				this.num += 1;
				
			},
			reduce:function(){
				this.num -= 1;
			},
			shareAlert(){
				this.is_alert = true
			},
			noShare(){
				this.isShare = false
			},
			//分享二维码
			async shareShopCouponCode(){
				this.d_isLoading = true
				let [err,res] = await this.$http.post("/api/coupon/shareShopCouponCode",{
					shop_coupon_url: config.webUrl1 + "/#/pages/QRcode/QRcode",
					type:2,
					shop_goods_common_id:this.getId
				});
				// let [err,res] = await this.$http.post("/api/coupon/getQrCode",{
				// 	url: config.webUrl1 + "/#/pages/QRcode/QRcode?customer_id=" + this.CustomerInfo.customer_id + "&type=2&id=" + this.getId,
				// });
				if(res.data.code === 200){
					this.d_isLoading = false
					this.isShare = true
					this.$nextTick(() => {
						this.swiper1 = new Swiper(".buyImg",{
							loop: false, // 循环模式选项
							observer:true,
							observeParents:true,
							slidesPerView: 'auto',
							centeredSlides: true,
						})
					})
					if(this.windowHeight === true){
						var textNode = document.getElementsByClassName('goX');
						console.log(textNode[0])
					}
					this.is_alert = false
					const product_id = uni.getStorageSync('product_id');
					this.getId = product_id
					this.isload = false
					// this.shareImg = res.data.data
					this.shareImg_box = res.data.data
					// console.log(this.shareImg_box)
					// for(let i = 0 ; i < this.shareImg_box.length; i++){
					// 	// console.log(this.shareImg_box[i])
					// }
				}
			},
			goShareCoupon(){
				uni.navigateTo({
					url:"../coupon/coupon"
				})
			},
			getQueryVariable(variable){//获取URL中的state
			   let query = window.location.search.substring(1);
			   let vars = query.split("&");
			   for (let i= 0;i <vars.length;i++) {
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
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/buy/buy') + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
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
			async getOpenId (code) {
				let [err,res] = await this.$http.post('/api/customer/getCustomerWxOpenId',{code:code})
				console.log(res)
				if (res.data.code === 200) {
					let datas = res.data.data.openid
					this.openid = datas
					uni.setStorageSync("wx_open_id",this.openid)//同步本地存储
					console.log(this.openid)
					this.getname()
				}
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
						}else if(resp1.data.data.success_message == 'not_registered'){
							this.NonSilentLogin()
						}
					} else {
						
					}
				}
				
			},
			// 非静默
			NonSilentLogin(){
				// const local01 = window.location.href
				if(this.d_status != 2){
					 location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ config.appid +'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/buy/buy') + '&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
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
			async getftoken(code1){
				const wx_pid = uni.getStorageSync('wx_pid');
	
				let [err,res] = await this.$http.post('/api/customer/getWxUserInfo', {code:code1})
				let userinfo = res.data.data.userinfo
				let d_unionid = res.data.data.userinfo.unionid
				console.log(res.data.data)
				uni.setStorageSync("wx_open_id",userinfo.openid)//同步本地存储
				// 存储下来微信的信息
				uni.setStorageSync('userinfo', userinfo);
				if(userinfo){
					let [err,res] = await this.$http.post('/api/customer/wxRegister', {
							nickname:userinfo.nickname,
							headimgurl:userinfo.headimgurl,
							wx_open_id:userinfo.openid,
							wx_union_id:d_unionid,
							pid:wx_pid
					});
					if(res.data.code === 200){
						console.log(res.data.data.token)
						uni.setStorageSync('token',res.data.data.token);
					}
					
				}
				
			},
		},
	}
</script>


<style lang="scss" scoped>
	page{
		background: #ffffff;
	}
	
	.mask {
		position: fixed;
		top:0;
		left:-6%;
		z-index:10;
		width:114%;
		height:100vh;
		background:rgba(0,0,0,0.7);
		display: flex;
		.swiper-container{
		    width:100%;
		    height:840upx;
			margin-top:120upx;
		}
		.swiper-container img{
			position:relative;
		    width:100%;
		    height:100%;
		}
		.copylink{
			width:160upx;
			height: 128upx ;
			image{
				width:80upx;
				height: 80upx;
				margin-bottom: 10upx;
			}
			position:absolute;
			left:40%;
			top:996upx;
			font-size: 26upx;
			color: #ffffff;
			text-align: center;
		}
		.swiper-slide {
			img{
				width:100%;
				height: 100%;
			}
		   width:65%;
		  text-align: center;
		  font-size: 18px;
		  background: #fff;
		  padding: 0 10upx;
		  // background-color: #1AAD19;
		  /* Center slide text vertically */
		  // display: -webkit-box;
		  // display: -ms-flexbox;
		  // display: -webkit-flex;
		  // display: flex;
		  // -webkit-box-pack: center;
		  // -ms-flex-pack: center;
		  // -webkit-justify-content: center;
		  // justify-content: center;
		  // -webkit-box-align: center;
		  // -ms-flex-align: center;
		  // -webkit-align-items: center;
		  // align-items: center;
		  transition: 300ms;
		  transform: scale(0.8);
 		  .mask_name{
 		  	width:100%;
 		  	height: 90upx;
 		  	// background: #007AFF;
			padding: 10upx 0;
			display: flex;
			justify-content: space-between;
			.mask_name_headPortrait{
				width:70upx;
				height: 70upx;
				image{
					width:100%;
					height: 100%;
				}
			}
			.mask_name_headline{
				width:386upx;
				height: 70upx;
				// background: #1AAD19;
				text-align:left ;
				font-size: 18upx;
				// view{
				// 	height: 50%;
				// 	line-height: 50%;
				// }
				text{
					color:#379dff;
					margin-left: 6upx;
				}
			}
 		  }
		  .mask_img{
			  width:100%;
			  height: 430upx;
			  // background-color: #DD524D;
			  image{
				  width:100%;
				  height: 100%;
			  }
		  }
		  .mask_presentation{
			  width:100%;
			  height: 90upx;
			  // background: #DD524D;
			  padding: 0 14upx;
			  font-size: 26upx;
			  color: #333333;
			  text-align: left;
			  view:first-child{
				  line-height: 54upx;
			  }
		  }
		  .mask_code{
			  width: 100%;
			  height: 184upx;
			  // background: #F0AD4E;
			  display: flex;
			  justify-content: space-between;
			  view{
				  width:50%;
				  height: 100%;
			  }
			  .mask_code_money{
				  // background: #007AFF;
				  padding: 0 14upx;
				  view:first-child{
					  width:100%;
					  height: 100upx;
					  font-size: 34upx;
					  color: #f1b048;
					  text-align: left;
					  line-height: 150upx;
				  }
				  view:last-child{
					  text-align: left;
					  width:100%;
					  height:60upx;
					  font-size: 24upx;
					  color:#999999;
					  line-height: 50upx;
					  text-decoration:line-through;
				  }
			  }
			  .mask_code_code{
				  // background: #1AAD19;
				   text-align: right;
					view:first-child{
					  width:96upx;
					  height:96upx;
						margin-right: 0;
					  image{
						  margin-left: 136upx;
						  width:100%;
						  height: 100%;
					  }
					}
					view:last-child{
						width: 100%;
						font-size: 24upx;
					   color:#999999;
					   line-height: 60upx;
					}
			  }
		  }
		}
		.swiper-slide-active,.swiper-slide-duplicate-active{
		  transform: scale(1);
		}
		.goX{
			width:50upx;
			height:50upx;
			position:absolute;
			top:50upx;
			right:90upx;
			img{
				width:100%;
				height:100%;
			}
		}
		
	}
	.sharebox{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height: 100vh;
		padding: 220upx 80upx 0;
		background:rgba(0,0,0,0.7);
		z-index:5;
		.sharebox-view1{
			width: 100%;
			height:760upx;
			background:#ffffff;
			display: flex;
			justify-content: center;
			align-items: center;
			img{
				width:60%;
			}
		}
		.sharebox-view{
			width: 100%;
			height:760upx;
			img{
				width:100%;
				height: 100%;
			}
		}
		.share-img-box{
			width:560upx;
			height:560upx;
			display: flex;
			justify-content: center;
			align-items: center;
			.img-box{
				border:10upx solid #FFFFFF;
				width:518upx;
				height:518upx;
				img{
					width:100%;
					height:100%;
				}
			}
		}
		.introduce{
			height:220upx;
			width:560upx;
			display:flex;
			justify-content: space-around;
			.name{
				p:first-child{
					font-size:30upx;
					color:#343434;
				}
				p:last-child{
					margin-top:76upx;
					font-size:48upx;
					color:#f2b248;
				}
			}
			.QRcode{
				display:flex;
				flex-direction: column;
				align-items: flex-end;
				.qrcode{
					width:112upx;
					height:112upx;
					img{
						width:100%;
						height:100%;
					}
				}
				.qrname{
					margin-top:18upx;
					font-size:18upx;
					color:#afafaf;
				}
			}
		}
		.share-border{
			width:276upx;
			height:120upx;
			border-right:4upx solid #FFFFFF;
		}
		.x{
			img{
				width:60upx;
				height:60upx;
				margin-left:244upx;
			}
		}
	}
.isloading{
	width:100%;
	height:100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	img{
		width:40%;
	}
}
.issloading{
	width:100%;
	height:100%;
	display: flex;
	justify-content: center;
	align-items: center;
	img{
		width:40%;
	}
}
	.uni-padding-wrap{
		position:relative;
		img{
			position:absolute;
			left:50upx;
			top:20upx;
			width:56upx;
			height:56upx;
			z-index:2;
		}
	}
	.discounts-btn{
		display: flex;
		flex-direction: row;
		margin-top: 20upx;
	}
	.yellow-btn{
		padding: 6upx 10upx;
		border: 1px solid #f3b047;
		color: #f3b047;
		font-size: 26upx;
		border-radius: 8upx;
		margin-right: 10upx;
		&.isfree{
			background:#f16d23;
			color:#fff;
		}
	}
	.discounts-main{
		padding: 20upx 48upx;
		width: 100%;
		height: 222upx;
		font-size: 30upx;
	}
	.discounts-top{
		text-align: center;
		font-size: 26upx;
		padding: 20upx 48upx;
		border-bottom: 1px solid #e6e6e6;
		position: relative;
	}
	
	.discounts{
		background: #fff;
		width: 100%;
		height: 440upx;
		position: fixed;
		bottom: 0;
	}
	
	.bounce-enter-active {
		transition: all .1s ease;
	}

	.bounce-leave-active {
		transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.bounce-enter,
	.bounce-leave-to

		{
		transform: translateY(440upx);
		opacity: 0;
	}

	.zhe-hidden {
		background: rgba(0, 0, 0, .6);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.shop-num-s {
		width: 100upx;
		border: 1px solid #e9e8ed;
		text-align: center;
		height: 44upx;
		font-size: 26upx;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}

	.shop-num-btn {
		position: absolute;
		right: 48upx;
		/* top: -20upx; */
		width: 146upx;
		height: 36upx;
		display: flex;
		flex-direction: row;
	}

	.shop-num-btn button {
		width: 44upx;
		height: 44upx;
		line-height: 44upx;
		border: 0;
		border-radius: 0;
		background: #e9e8ed;
		&.cantChoose{
			cursor: not-allowed;
			pointer-events: none;
		}
	}

	.shop-num {
		padding: 0 48upx;
		margin-top:40upx;
		width: 100%;
		position: relative;
		font-size: 30upx;
		display: flex;
		flex-direction: row;
	}
	.guige-btn-box{
		display:flex;
		margin:5upx;
		flex-wrap: wrap;
	}
	.guige-btn-item{
		width:50%;
		margin:10upx 0upx;
	}
	// .guige-btn-item .gbtn{
	// 	display:flex;
	// 	justify-content: center;
	// 	align-items: center;
	// }
	.guige-btn .gbtn {
		display:flex;
		justify-content: center;
		align-items: center;
		width:320upx;;
		background: #fff;
		color:#f16d23;
		padding: 4upx 30upx;
		margin-right: 18upx;
		border: 1upx solid #f16d23;
		border-radius: 4px;
		
	}
	.guige-btn .active{
		background:#f16d23;
		color:#fff;
	}
	.guige-btn .disabled{
		background:#757575;
		
	}
	.guige-btn .gbtn{
		&.disable{
			color:#b3b3b3
		}
	}
	//上面是互斥
	// .guige-btn .gbtn{
	// 	&.disabled{
	// 		background:#FFFFFF;
	// 		color:#f16d23;
	// 	}
	// }
	.guige-btn {
		flex-direction: row;
		margin-top: 16upx;
	}

	.shop-guige {
		
		 flex-wrap: wrap;
		width: 100%;
		height: 300upx;
		padding: 10upx 30upx;
		font-size: 28upx;
	}
	.shop-guigee{
		display: flex;
		 flex-wrap: wrap;
		width: 100%;
		height: 200upx;
		font-size: 28upx;
	}
	.shop-closed {
		position: absolute;
		right: 10upx;
		top: 4upx;
		width: 38upx;
		height: 38upx;
	}

	.shop-show-right {
		position: relative;
		padding-left: 20upx;
		width: 100%;
	}

	.alert-shop-t-show {
		width: 100upx;
		height: 100upx;
	}

	.alert-shop-t-show image {
		width: 100%;
		height: 100%;
	}

	.alert-shop {
		width: 100%;
		height:840upx;
		background: #fff;
		position: fixed;
		bottom: 0;
		z-index: 999;
	}

	.alert-shop-t {
		padding: 20upx 48upx;
		display: -webkit-flex;
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid #e6e6e6;
	}

	.alert-shop-good {
		background: #f16c23;
		color: #fff;
		text-align: center;
		height: 100upx;
		width: 100%;
		line-height: 100upx;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.uni-swiper .uni-swiper-wrapper .uni-swiper-dots-horizontal .uni-swiper-dot{
		margin-right:10px;
	}
	.swiper {
		width: 100%;
		height: 720upx;
	}

	.iwd {
		width: 100%;
		height: 100%;
	}
	.iwdd{
		width:100%;
	}
	.swiper-item {
		width: 100%;
		height: 720upx;
	}

	.wenbens {
		padding: 10upx 50upx;
		line-height: 48upx;
		color: #666;
		background: #ffffff;
	}

	.yellow {
		color: #f3b047;
		font-size: 32upx;
	}

	.yun {
		color: #989898;
		font-size: 26upx;
	}
	.self-buying{
		position: absolute;
		bottom:20upx;
		right: 50upx;
		// width:25%;
		padding: 0 8upx;
		height: 36upx;
		border:2upx solid #fc777a;
		color:#fc1d20;
		text-align: center;
		line-height: 34upx;
		font-weight:400;
		font-size: 20upx;
		border-radius: 6upx;
	}
	.self-buyingz{
		position: absolute;
		right: 50upx;
		// width:25%;
		bottom:0upx;
		padding: 0 8upx;
		height: 36upx;
		border:2upx solid #fc777a;
		color:#fc1d20;
		text-align: center;
		line-height: 34upx;
		font-weight:400;
		font-size: 20upx;
		border-radius: 6upx;
	}
	.ifnoGods{
		display:flex;
		p{
			color:#FF1717;
			font-size:32upx;
			
		}
	}
	.shopname {
		display:inline-block;
		width:490upx;
		font-size: 32upx;
		color: #333;
	}
	.shopnamee{
		font-size: 32upx;
		color: #333;
	}
	.wenbens {
		border-bottom: 8px solid #eee;
		position: relative;
	}

	.yellow-bg {
		color: #f3b047;
		font-size: 24upx;
		background: #ffeaca;
		padding: 6upx 10upx;
		border-radius: 4px;
	}

	.text-ma {
		margin-right: 20upx;
	}

	.yun-bd {
		color: #f3b047;
		border: #f3b047 1px solid;
		font-size: 24upx;
		padding: 4upx 10upx;
		border-radius: 4px;
	}

	.point {
		width: 12upx;
		height: 24upx;
		position: absolute;
		right: 48upx;
		top: 32upx;
	}

	.bot {
		width: 100%;
		height: 100%;
		margin-bottom:100upx;
	}

	.tu {
		width: 100%;
		height: 100%;
	}

	.btn-area {
		background:#FFFFFF;
		display: flex;
		flex-direction: row;
		height: 100upx;
		width: 100%;
		.alert-box{
			width:180upx;
			height:120upx;
			position:absolute;
			bottom:100upx;
			left:30upx;
			font-size:24upx;
			background:#fff;
			border-radius:5px;
			margin-bottom:10upx;
			view:first-child{
				height:60upx;
				display:flex;
				justify-content: center;
				align-items:center;
				border-bottom:2upx solid #E2E2E2;
			}
			view:nth-child(2){
				height:60upx;
				display:flex;
				justify-content: center;
				align-items:center;
				border-bottom:2upx solid #E2E2E2;
				z-index:3;
				.market-nav-arrow{
					position:absolute;
					bottom:-6px;
					left:20upx;
					height: 0;
					font-size: 0;
					line-height: 0;
					border-style: solid;
					border-width: 7px 7px 0px 7px;
					border-color: #fff transparent ;
				}
			}
		}
	}

	.flex-buy {
		position: fixed;
		bottom: 0;
		width: 100%;

	}

	.share {
		width: 40upx;
		height: 34upx;
		display: inline-block;
	}

	.btn01 {
		width: 18%;
		height: 100upx;
		background: #fff;
		border: 0;
		text-align: center;
		color: #f3b047;
		font-size: 28upx;
		padding-top: 16upx;
		img{
			width:44upx;
			height:44upx;
		}
	}

	.btn02 {
		width: 41%;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
	}

	.btn02 button {
		background: #f3b047;
		color: #fff;
		font-size: 36upx;
		font-weight: bold;
		border: 0;
	}

	.btn03 {
		width: 41%;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		margin-right:30upx;
	}

	.btn03 button {
		background: #f16c23;
		color: #fff;
		font-size: 36upx;
		font-weight: bold;
		border: 0;
	}
	.noGods{
		width: 100%;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		margin-right:30upx;
		.noGodsInfo{
			background:#999999;
			margin-top:10upx;
			line-height:80upx;
			color: #fff;
			font-size: 36upx;
			border-radius:50upx;
		}
	}
	.nav-btn {
		margin-top:10upx;
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		border-radius: 40upx 0 0 40upx;;
		border: 0;
		text{
			font-size:30upx;
			font-weight:100;
		}
	}
	.nav-btn1 {
		margin-top:10upx;
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		border-radius: 0 40upx 40upx 0;
		border: 0;
		text{
			font-size:30upx;
			font-weight:100;
		}
	}
	.nav-share {
		width: 100%;
		border: 0;
		border-radius: 0;
		font-size:22upx;
		color:#666666;
	}

	uni-button:after {
		border-radius: 0;
		border: 0;
	}
	.specification-content {
		font-weight: 500;
	
		.specification-item {
			margin-bottom: 40rpx;
	
			&:last-child {
				margin-bottom: 0;
			}
	
			.item-title {
				margin-left:40upx;
				margin-top: 20rpx;
				font-size: 28rpx;
				color: #999999;
			}
	
			.item-wrapper {
				display: flex;
				flex-direction: row;
				flex-flow: wrap;
				margin-left:40upx;
				.item-content {
					display: inline-block;
					padding: 15upx 35upx;
					margin-top:10upx;
					border-radius: 10upx;
					background-color: #ffffff;
					color: #333333;
					font-size: 28upx;
					margin-right: 20upx;
					border: 2upx solid #f4f4f4;
					box-sizing: border-box;
	
					&.actived {
						background:#f16d23;
						color:#fff;
					}
	
					&.noactived {
						background-color: #f4f4f4;
						border-color: #f4f4f4;
						pointer-events: none;
						user-select:none;
					}
				}
			}
		}
	}
.wolsok{
	width:100vw;
	height: 100vh;
	background: rgba(0,0,0,.5);
	position: fixed;
	left: 0;
	top:0;
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;
	img{
		width:60%;
	}
}
</style>
