<template>
	<view class="content">
		<view class="isloading" v-if="this.newPeople.length ===0 && this.newTitle.length">
			<img src="../../static/images/loading.gif" alt="">
		</view>
		<view v-else>
			<!-- 导航 -->
			<Header class="theader"></Header>
			<!-- banner -->
			<Banner class="tbanner"></Banner>
			<!-- icons -->
			<Icons class="ticons" @childByValue="childByValue"></Icons>
			<!-- 遮罩层11 -->
			<view class="mask" @click="isHave=false" v-if="isHave">
				<view class="newCoupon_box">
					<view class="newCoupon">
						<view class="newCoupon_title">
							<image src="../../static/images/APP-qie16_0001_13.png" mode=""></image>
							<view class="">
								恭喜您获得<text>{{fullReduction.length}}</text>张优惠券
							</view>
						</view>
						<view class="discountCoupon">
							<view class="discountCoupon_title">
								壹口两口送您{{fullReduction.length}}张代金券，直接放入账户中 可在“我的—优惠券”中查看
							</view>
							 <scroll-view  scroll-y="true" class="scroll-Y" >
							    <view class="" v-for="(item,index) in couponList" :key="index" >
							    	<!-- 满减 -->
							    	<view class="discountCoupon_content" v-if="item.coupon_type === 1">
							    		<view class="leftInfo">
							    			<view class="discountCoupon_content_money">
							    				<text>￥</text>{{item.offset_money}}
							    			</view>
							    			<view class="discountCoupon_content_fill">
							    				<view>优惠券</view>
							    				<view>满{{item.require_total_pay}}使用</view>
							    			</view>
							    		</view>
							    		<view class="discountCoupon_content_type">{{item.coupon_name}}</view>
							    	</view>
							    	<!-- 折扣 -->
							    	<view class="discountCoupon_content" v-else>
							    		<view class="leftInfo">
							    			<view class="discountCoupon_content_money">
							    				<text>折</text>{{item.offset_percent / 10}}
							    			</view>
							    			<view class="discountCoupon_content_fill">
							    				<view>优惠券</view>
							    				<view>满{{item.require_total_pay}}使用</view>
							    			</view>
							    		</view>
							    		<view class="discountCoupon_content_type">{{item.coupon_name}}</view>
							    	</view>
							    </view>         	
							 </scroll-view>
							<view class="d_draw" @click="getAllCoupon">
								一键领取
							</view>
						</view>
					</view>
				</view>
				<!-- 	<div class="maskImg" @click="goToRed">
					<p>新人专享优惠券</p>
					<p>全场满300减20元</p>
					<p>点击查看我的礼券</p>
					<img src="../../static/images/APP-qie5_0010_xin-GO.png" alt="">
					<view class="wire"></view>
					<view class="know" @click.stop="isHave = false">我知道了</view>
				</div> -->
			</view>
			<!-- 无url遮罩层 -->
			<view class="noOpen" v-if="this.nogo === true" @click="nogo = false">
				<img src="../../static/images/APP-qie4_0000_白.png" alt="">
				<p>该功能即将上线</p>
			</view>
			<!-- 壹口两口小视频 -->
			<!-- 			<view class="home-movie" @click="ceshi">
				<view class="bj">
					<view class="redbj">
						<view class="redbj-left">
							<img src="../../static/images/APP-01_0009_play01.png" alt="">
							<view class="movie-title" style="font-size: 24upx;">壹口两口小视频</view>
						</view>
						<view class="redbj-right">
							MORE >>
						</view>
					</view>
					<view class="bj-bottom">
						<view class="bj-bottom-movie">
							<view class="movie-item">
								<view class="movie-number">
									<img src="../../static/images/APP-01_0010_play02.png" alt="">
									<view>888</view>
								</view>
								<view class="movie-item-bottom">
									这里放视频的名称
								</view>
							</view>
							<view class="movie-item">
								<view class="movie-number">
									<img src="../../static/images/APP-01_0010_play02.png" alt="">
									<view>888</view>
								</view>
								<view class="movie-item-bottom">
									这里放视频的名称
								</view>
							</view>
							<view class="movie-item">
								<view class="movie-number">
									<img src="../../static/images/APP-01_0010_play02.png" alt="">
									<view>888</view>
								</view>
								<view class="movie-item-bottom">
									这里放视频的名称
								</view>
							</view>
							<view class="movie-item">
								<view class="movie-number">
									<img src="../../static/images/APP-01_0010_play02.png" alt="">
									<view>888</view>
								</view>
								<view class="movie-item-bottom">
									这里放视频的名称
								</view>
							</view>
						</view>
					</view>
				</view>
			</view> -->
			<!-- 新人专享 -->
			<view class="newpeople">
				<view class="newbox">
					<!-- 					<view class="newp">
						<view class="kuai">
							<img src="../../static/images/redbag.png" alt="">
						</view>
						<view class="news">
							<p>新人专享满300减20</p>
							<p>更多优惠尽在壹口两口</p>
						</view>
						<view class="man" @click="goToRedBag">
							<img src="../../static/images/backyellow.png" alt="">
							<p>立即享受</p>
						</view>
					</view> -->
					<!--  -->
					<view class="Super" v-if="aaaaa">
						<view class="super-left" v-for="(item,index) in newTitle" :key="index" @click="gotoMS(index,item)">
							<view class="super-box">
								<view class="super-left-s">
									{{item.group_name}}
								</view>
								<view class="super-time-box">
									<uni-countdown class="super-time" color="#FFFFFF" background-color="#ff0b0b" border-color="#ff0b0b" :show-day="false"
									 :hour="2" :minute="30" :second="0" v-if="item.id === 22">
									</uni-countdown>
								</view>
							</view>

							<view class="super-left-x">{{item.remark}}</view>
							<view class="super-left-x-box">
								<img :src="item.img[0]" alt="">
								<img :src="item.img[1]" alt="">
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 套餐 -->
			<view class="setMeal-box">
				<view class="setMeal">
					<image src="../../static/images/APP-qie11_0000_套餐专区.png" mode=""></image>
					<view>省钱小行家</view>
				</view>
				<view class="setMeal-item">
					<view class="setMeal-item-left" v-for="(items,index) in d_combo" :key="index" @click="toDetail(items.id)">
						<view class="setMeal-item-left-title">
							{{items.goods_name}}
						</view>
						<view class="setMeal-item-left-center">
							<view class="setMeal-item-left-center-img-box">
								<image :src="items.main_images_default" mode=""></image>
							</view>
							<view class="setMeal-item-left-center-info">
								<view class="No1">热销套餐NO.{{index+1}}</view>
								<view class="daynumber">日销量 <text>{{items.sold_count}}份</text></view>
								<view class="moneyCar">
									<view class="moneyCar_left">￥ {{items.price}}</view>
									<view class="moneyCar_right">
										<image src="../../static/images/APP-01_0008_shop-car.png" mode=""></image>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="setMeal-item-right"></view>
				</view>
			</view>

			<view class="stucky-father">
				<view class="tab-box">
					<!-- 选项卡 -->
					<view class="tabControl">
						<!-- 上方tabbar -->
						<view class="tabHeader" :class="this.sTop > 630 ? 'fixation' : ''">
							<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
								<view class="scroll-box">
									<view v-for="(scroll,index) in scrolls" :key="scroll.id" class="tabHeader-title" @tap="onClickItem(index,scroll)">
										<view class="big-title" :class="{'active':tabIndex===index}">{{scroll.group_name}}</view>
										<view class="small-title" :class="{'active':tabIndex===index}">
											<view class="smallbox"><text>{{scroll.remark}}</text></view>
										</view>
									</view>
								</view>

							</scroll-view>
						</view>
						<!-- <view class="tabFill" v-if="this.sTop >720"></view> -->
						<view class="tabCenter">
							<view class="view-box" :current="tabIndex" @change="tabChange">
								<view>
									<view class="tabCenter-item" style="display: flex;">
										<view class="bjt" v-for="(item,index) in scrollsList" :key="index" @click="toDetail(item.id)">
											<view class="imgbox">
												<img :src="item.main_images_default" alt="">
											</view>
											<view class="po-box">
												<view class="tabCenter-bigtitle_box">
													<view class="tabCenter-bigtitle">
														{{item.goods_name}}
													</view>
													<!-- <view class="self-buying" v-if="item.max_rebate !== '0.00'">
													自返
												</view> -->
												</view>
												<view class="tabCenter-smalltitle">{{item.sold_count}}位用户已下单</view>
												<view class="tabCenter-number">
													<view class="tabCenter-money">
														{{item.price}} <text class="text">元 </text>
													</view>
													<view class="tabCenter-icon">
														<view class="self-buying" v-if="item.max_rebate !== '0.00'">
															自返
														</view>
													</view>
												</view>
												<!-- <view class="tabCenter-icon1">
												<img src="../../static/images/APP-01_0008_shop-car.png" alt="">		
											</view> -->
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="isloading" v-if="this.scrollsList.length === 0" @click="ceshi">
								<img src="../../static/images/loading.gif" alt="">
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<tabbarItem></tabbarItem>
	</view>
</template>
<script src="http://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<script>
	import {
		mapState,
		mapActions,
		mapGetters
	} from "vuex"
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import Header from "../../components/header/header.vue"
	import Banner from "../../components/banner/banner.vue"
	import Icons from "../../components/icons/icons.vue"
	import uniCountdown from "@/components/uni-countdown01/uni-countdown.vue"
	import {
		setCookie,
		getCookie,
		delCookie
	} from '../../common/cookie.js';
	import tabbarItem from "../../components/tabbarItem/tabbar.vue"
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue' //下拉加载
	import config from '../../common/config.js';
	import jweixin from "jweixin-module"
	var _self, page = 1,
		timer = null;
	export default {
		components: {
			Header,
			Banner,
			Icons,
			uniCountdown,
			tabbarItem,
			uniSegmentedControl,
			uniLoadMore
		},
		onPullDownRefresh() { //下拉刷新
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 300);
		},
		name: 'Index',
		data() {
			return {
				aaaaa: false,
				changeStyle: false,
				isFixed: false,
				appId: '',
				appsecret: '',
				open: '',
				isHave: false,
				goods: [],
				newPeople: [],
				newTitle: [],
				name: "",
				tabIndex: 0,
				sTop: 0,
				current: 0,
				isfiexed: false,
				items: ['选项卡1', '选项卡2', '选项卡3'],
				group_id: null,
				scrolls: [],
				scrollsList: [

				],
				scrollsListNone: [

				],
				loadingText: '加载中...',
				loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2--contentnomore
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				page: 1,
				nogo: false,
				isLoading: false,
				getMore: true,
				combo: {},
				d_combo: [],
				d_status: null,
				couponList:[],
				fullReduction:[],
				couponIdList:{
					shop_coupon_id:[],
				},
				wx_config1:{
					appId:null,
					nonceStr:null,
					rawString:null,
					signature:null,
					timestamp:null,
					url:null,
				},
				s_customer_id:null
			}
		},
		onLoad(optaion) {
			if(optaion.wx_pid!== undefined && optaion.wx_pid !== null && optaion.wx_pid !== ''){
				uni.setStorageSync('wx_pid', optaion.wx_pid);
			}
			if(optaion.top!== undefined && optaion.top !== null && optaion.top !== ''){
				uni.setStorageSync('top', optaion.top);
			}
			const value = uni.getStorageSync('top');
			if (value) {
				 uni.removeStorageSync('token');	
				 uni.removeStorageSync('top');	
			}
			
			this.getShopCouponList()//优惠券
			
			if (optaion.customer_id) {
				uni.setStorageSync('customer_id', optaion.customer_id);
			}
			
			window.scrollTo(0, 0)
			this.d_status = this.getQueryVariable("state")
			this.getBecomeSilent()
			
			this.getshengxin()
			window.addEventListener("scroll", () => {
				this.sTop = document.body.scrollTop || document.documentElement.scrollTop
			})
		},
		onShow() {
			this.getname()
		},
		onUnload() {
			window.removeEventListener("scroll")
		},
		computed: {
			...mapState({
				loginInfo: state => state.userInfo.state,
			})
		},
		created() {
			this.loadMoreInfo()
			// this.jj()
			// console.log(this.$store)
		},
		mounted() {
			this.getShopGoodsGroupList()
		},
		onReachBottom() {
			//触底的时候请求数据，即为上拉加载更多
			this.getshengxiandata();
		},
		methods: {
			loadMoreInfo() {
				if (this.getMore === false) {
					return
				}
				this.isLoading = true
				this.getshengxin();
				window.addEventListener("beforeunload", this.gotop);
			},
			gotop() {
				window.scrollTo(0, 630);
			},
			//一键领取全部优惠券
			async getAllCoupon(){
				// for(const v in this.couponList){
				// 	// this.couponIdList.shop_coupon_id.push(this.couponList[v].id)
				// 	let [err,res] = await this.$http.post("/api/coupon/receiveShopCustomerCoupon",{
				// 		shop_coupon_id:this.couponList[v].id
				// 	});
				// 	if(res.data.code === 200){
				// 		console.log(res)
				// 	}else{
				// 		uni.showToast({
				// 		    title: res.data.errstr,
				// 		    duration: 1000,
				// 			icon:"none"
				// 		});
				// 	}
				// }
				uni.navigateTo({
					url:"../coupon/coupon"
				})
			},
			async getShopGoodsGroupList() {
				let [err, res] = await this.$http.post("/api/shop_goods/getShopGoodsGroupList");
				if (res.data.code === 200) {
					this.combo = res.data.data[1][0]
					// console.log(this.combo)
					this.newPeople = res.data.data[1]
					this.newTitle = res.data.data[2]
					this.getsetMeal1()
				}
			},
			async getshengxin() {
				let [err, res] = await this.$http.post("/api/shop_goods/getShopGoodsGroupList");
				if (res.data.code === 200) {
					this.scrolls = res.data.data[3]
					this.group_id = this.scrolls[0].id
					if (this.group_id !== null) {
						this.getshengxiandata()
					}
				}
			},
			async getsetMeal1() {
				// console.log(this.combo.id)
				let [err, res] = await this.$http.post("/api/shop_goods/getShopGoodsCommonList", {
					group_id: this.combo.id,
					page: 1,
					page_size: 4,
				});
				if (res.data.code === 200) {
					// console.log(this.combo.id)
					// console.log(res.data.data.data)
					this.d_combo = res.data.data.data

				}
			},
			async getshengxiandata() {
				if (this.loadingType !== 0) {
					uni.stopPullDownRefresh() //loadingType!=0;直接返回
					return false;
				}
				let [err, res] = await this.$http.post("/api/shop_goods/getShopGoodsCommonList", {
					group_id: this.group_id,
					page: this.page,
					page_size: 6,
				})
				if (res.data.code === 200) {
					if (res.data.data.current_page === res.data.data.last_page) {
						this.getMore = false
					}
					if (res.data.data.current_page > res.data.data.last_page) { //没有数据
						this.loadingType = 2;
						return;
					}
					let scrollbox = []
					scrollbox = res.data.data.data
					// console.log(res.data.data.data)
					this.scrollsList = this.scrollsList.concat(scrollbox)
					// console.log(this.scrollsList)
					for (let i = 0; i < this.scrollsList.length; i++) {
						for (let k = i + 1; k < this.scrollsList.length; k++) {
							if (this.scrollsList[i].id === this.scrollsList[k].id) {
								this.scrollsList.splice(k, 1)
							}
						}
					}
					// console.log(this.scrollsList)
					this.isLoading = false
					this.page++; //得到数据之后page+1
					this.loadingType = 0
					// this.scrollsList = res.data.data.data
				}
				uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
				// console.log(this.scrollsList)
			},
			goSetMeal() {
				// console.log(item.url)
				if (item.url === null || item.url === undefined || item.url === '') {
					return false
				}
				uni.navigateTo({
					url: item.url
				});
			},
			onClickItem(index, scroll) {
				if (this.current !== index) {
					this.group_id = scroll.id
					this.tabIndex = index
					this.scrollsList = []
					this.getMore = true
					this.page = 1
					this.loadingType = 0
					this.current = index;
					window.scrollTo(0, 625)
					switch (index) {
						case 0:
							this.getshengxiandata()
							break;
						case 1:
							this.getshengxiandata()
							break;
						case 2:
							this.getshengxiandata()
							break;
						case 3:
							this.getshengxiandata()
							break;
						case 4:
							this.getshengxiandata()
							break;
						case 5:
							this.getshengxiandata()
							break;
						case 6:
							this.getshengxiandata()
							break;
						default:
							break
					}
				}
			},
			gotoMS(index, item) {
				if (item.url !== null) {
					uni.navigateTo({
						url: item.url
					});
				}

			},
			goToRed() {
				uni.navigateTo({
					url: '../newPeople/newPeople'
				});
			},
			goToRedBag() {
				uni.navigateTo({
					url: '../newPeople/newPeople'
				});
			},
			toDetail(id) {
				uni.navigateTo({
					url: "/pages/buy/buy?product_id=" + id
				})
			},
			tabtap(index) {
				//点击事件切换样式
				this.tabIndex = index;
				console.log(config.appid)
			},
			// 滑动事件
			tabChange(e) {
				this.tabIndex = e.detail.current;
			},
			gotoSearch() {
				uni.navigateTo({
					url: "../../pages/index-search/index-search"
				})
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
				// const local = window.location.href
				// location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect"
				if (code === undefined || code === null || code === '') {
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid +
						'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/index/index') +
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
				// console.log(res)
				if (res.data.code === 200) {
					let datas = res.data.data.openid
					this.openid = datas
					uni.setStorageSync("wx_open_id", this.openid) //同步本地存储
					console.log(this.openid)
					this.getname()
				}else{
					// this.getBecomeSilent()	
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
						}else if(resp1.data.code !== 200) {
							uni.showToast({
								title: resp1.data.errstr,
								icon: 'none'
							})
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
						'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/index/index') +
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
			async getftoken(code1) {
				let [err, res] = await this.$http.post('/api/customer/getWxUserInfo', {
					code: code1
				})
				let userinfo = res.data.data.userinfo
				let d_unionid = res.data.data.userinfo.unionid
				uni.setStorageSync("wx_open_id", userinfo.openid) //同步本地存储
				// 存储下来微信的信息
				uni.setStorageSync('userinfo', userinfo);
				let pid = uni.getStorageSync('wx_pid');
				if (userinfo) {
					let [err, res] = await this.$http.post('/api/customer/wxRegister', {
						nickname: userinfo.nickname,
						headimgurl: userinfo.headimgurl,
						wx_open_id: userinfo.openid,
						wx_union_id:d_unionid,
						pid:pid
					});
					if (res.data.code === 200) {
						console.log(res.data.data.token)
						uni.setStorageSync('token', res.data.data.token);
					}

				}

			},
			// wx_union_id
			NonSilentLogin1() {
				if (this.d_status != 2) {
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid +
						'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/index/index') +
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
			childByValue(data) {
				this.nogo = data
			},
			async getShopCouponList(){//获取优惠券列表
				let [err,res] = await this.$http.post("/api/coupon/getShopCouponList",{
					only_new_customer:2//通用券
				});
				if(res.data.code !== 200){
					return
				}
				this.fullReduction = []
				let list = res.data.data
				this.fullReduction = list
				if(this.fullReduction.length >= 1){
					this.isHave = true
				}
				this.couponList = list
			},
			goCoupon(){
				uni.navigateTo({
					url:'../../pages/coupon/coupon'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.setMeal-box {
		width: 100%;
		height: 100%;
		padding: 0 28upx;

		.setMeal {
			width: 100%;
			height: 220upx;
			position: relative;

			image {
				width: 100%;
				height: 92%;
			}

			view {
				width: 244upx;
				height: 50upx;
				text-align: center;
				line-height: 50upx;
				font-size: 26upx;
				color: #FD432F;
				letter-spacing: 7upx;
				position: absolute;
				top: 123upx;
				left: 376upx;
				font-weight: 500;
			}

		}

		.setMeal-item {
			width: 100%;
			height: 400upx;
			background: #eeeeee;
			// box-shadow: 0 0 5upx #888888;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			border-radius: 10upx;
			overflow: hidden;

			.setMeal-item-left:nth-child(3) {
				margin-top: 4upx;
			}

			.setMeal-item-left:nth-child(4) {
				margin-top: 4upx;
			}

			.setMeal-item-left {
				width: 49.9%;
				height: 200upx;
				background: #ffffff;
				// border-top-left-radius: 10upx;
				// border-bottom-left-radius:10upx;
				padding: 4upx 18upx 0 28upx;

				.setMeal-item-left-title {
					width: 100%;
					height: 67upx;
					line-height: 67upx;
					font-size: 30upx;
					color: #464646;
					font-weight: 900;
				}

				.setMeal-item-left-center {
					width: 100%;
					height: 110upx;
					display: flex;

					.setMeal-item-left-center-img-box {
						width: 110upx;
						height: 110upx;
						margin-right: 12upx;
						border-radius: 10upx;
						overflow: hidden;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.setMeal-item-left-center-info {
						color: #454545;

						.No1 {
							font-size: 20upx;
							line-height: 37upx;
						}

						.daynumber {
							font-size: 16upx;
							line-height: 24upx;

							text {
								color: #379dff
							}
						}

						.moneyCar {
							width: 164upx;
							height: 50upx;
							display: flex;
							justify-content: space-between;

							.moneyCar_left {
								font-size: 18upx;
								color: #fe0c0a;
								margin-top: 26upx;
							}

							.moneyCar_right {
								width: 46upx;
								height: 46upx;
								border-radius: 100%;
								background: #53affc;
								text-align: center;
								line-height: 46upx;
								margin-top: 2upx;

								image {
									width: 30upx;
									height: 28upx;
								}
							}
						}
					}
				}
			}

			// .setMeal-item-right{
			// 	width:49.5%;
			// 	height: 230upx;
			// 	background: #ffffff;
			// 	border-top-right-radius: 10upx;
			// 	border-bottom-right-radius:10upx;
			// 	padding: 4upx 18upx 0 28upx;
			// }
		}
	}




	page {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.noInfomation {
		height: 300upx;
	}

	.choose {
		height: 400upx;
	}

	.po-box {
		position: absolute;
		margin-top: 20upx;
		margin-left: 20upx;
		width: 308upx;
	}

	.actives {
		position: fixed;
		top: 0upx;
		background: #f2f2f2;
	}

	.swiper-box {
		height: 100vh;
	}

	.stucky-father {
		position: relative;
	}

	.tab-box {
		position: sticky;
		top: 0;
	}

	.tabControl {
		width: 100%;
		height: 100%;
		// background: #555555;
		overflow: hidden;
		padding: 0 28upx;

		margin-bottom: 50upx;

		.tabHeader:last-child {
			margin-right: 10upx;
		}

		.tabHeader {
			width: 100%;
			height: 152upx;
			background: #f7f7f7;

			&.fixation {
				position: fixed;
				top: 0px;
				left: 20upx;
				margin-right: 20upx;
				width: 100%;
				z-index: 1;
			}
		}
	}

	.tabHeader-title {
		width: 120upx;
		height: 152upx;
		// background:#007AFF;
		margin-right: 20upx;

		.big-title {
			width: 120upx;
			height: 72upx;
			font-size: 36upx;
			font-weight: 400;
			color: #464545;
			text-align: center;
			line-height: 112upx;

			&.active {
				color: #53aefc !important;
			}
		}

		.small-title {
			width: 120upx;
			height: 62upx;
			line-height: 62upx;
			font-size: 20upx;
			text-align: center;
			color: #7a7a7a;

			&.active {
				color: #ffffff;
				text-align: center;
				font-size: 20upx;
				line-height: 36upx;
				display: flex;

				.smallbox {
					width: 120upx;
					height: 42upx;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #53aefc;
					border-radius: 20upx;
					margin-top: 12upx;
				}
			}
		}
	}

	.scroll-view_H {
		width: 100%;
		white-space: nowrap;
	}

	.scroll-box {
		display: flex;

		::-webkit-scrollbar {
			width: 0px;
		}

		::-webkit-scrollbar {
			display: none;
		}
	}

	// 下方样式
	.tabFill {
		width: 100%;
		height: 304upx;
	}

	.tabCenter {
		width: 100%;
		height: 100%;
		min-height: 583px;
		margin-bottom: 50upx;

		::-webkit-scrollbar {
			width: 0px;
		}

		::-webkit-scrollbar {
			display: none;
		}
	}

	.tabCenter-item {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-bottom: 30px;

		::-webkit-scrollbar {
			width: 0px;
		}

		::-webkit-scrollbar {
			display: none;
		}

		.bjt {
			width: 334upx;
			height: 480upx;
			background: white;
			border-radius: 8upx;
			overflow: hidden;
			position: relative;
			margin-bottom: 20upx;

			.imgbox {
				width: 334upx;
				height: 334upx;

				img {
					width: 100%;
					height: 100%;
				}
			}

		}

		.tabCenter-bigtitle_box {
			font-size: 28upx;
			color: #464545;
			line-height: 28upx;
			width: 100%;
			height: 28upx;
			font-weight: 600;
			display: flex;
			justify-content: space-between;

			.tabCenter-bigtitle {
				width: 94%;
				height: 28upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}

			.self-buying {
				// width:100%;
				padding: 0 6upx;
				height: 36upx;
				border: 2upx solid #fc777a;
				color: #fc1d20;
				text-align: center;
				line-height: 34upx;
				font-weight: 400;
				font-size: 20upx;
				border-radius: 6upx;
			}

		}

		.tabCenter-smalltitle {
			font-size: 20upx;
			color: #53aefc;
			line-height: 26upx;
			width: 100%;
			height: 26upx;
			margin-top: 4upx;
		}

		.tabCenter-number {
			width: 100%;
			color: #ff0b0b;
			font-size: 30upx;
			margin-top: 16upx;
			display: flex;
			justify-content: space-between;

			.tabCenter-money {
				width: 60%;
			}

			.text {
				margin-left: 14upx;
				font-size: 20upx;
			}
		}

		.tabCenter-icon {

			height: 40upx;
			margin-top: 4upx;

			.self-buying {
				// width:100%;
				padding: 0 6upx;
				height: 36upx;
				border: 2upx solid #fc777a;
				color: #fc1d20;
				text-align: center;
				line-height: 34upx;
				font-weight: 400;
				font-size: 20upx;
				border-radius: 6upx;
			}
		}

		.tabCenter-icon1 {
			width: 47upx;
			height: 47upx;
			position: absolute;
			border-radius: 50%;
			background: #53aefc;
			left: 250upx;
			bottom: 0upx;

			img {
				width: 30upx;
				height: 28upx;
				text-align: center;
				line-height: 30upx;
				display: block;
				margin: 10upx 0 0 8upx;
			}
		}
	}

	.isloading {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;

		img {
			width: 40%;
		}
	}

	.hhh {
		width: 100%;
		height: 300upx;
		background: #09BB07;
	}

	.content {
		background: #f7f7f7;
	}

	page {
		width: 100%;
		height: 100%;
		background: #f7f7f7;
	}

	/* 遮罩层 */
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;

		// 	.wire{
		// 		position:absolute;
		// 		top:280upx;
		// 		left:240upx;
		// 		width:3upx;
		// 		height:170upx;
		// 		background:#fff;
		// 		z-index:2;
		// 	}
		// 	.know{
		// 		display:flex;
		// 		justify-content: center;
		// 		align-items: center;
		// 		width:200upx;
		// 		height:56upx;
		// 		color:#fff;
		// 		font-size:28upx;
		// 		border:3upx solid #fff;
		// 		border-radius:300upx 300upx 300upx 300upx;
		// 		margin-top:200upx;
		// 		margin-left:140upx;
		// 		bottom:0
		// 	}
		// 	.maskImg{
		// 		width:520upx;
		// 		height:380upx;
		// 		background:url("../../static/images/APP-qie5_0011_xin-di.png") no-repeat;
		// 		background-size:520upx,380upx;
		// 		position: relative;
		// 		z-index:3;
		// 		margin:0 auto;
		// 		overflow: hidden;
		// 	p:first-child{
		// 		margin-top:40upx;
		// 		margin-left:158upx;
		// 		font-size:40upx;
		// 		color:#fff;
		// 		transform:rotate(355deg);
		// 		font-weight:700;
		// 	}
		// 	p:nth-child(2){
		// 		margin-top:30upx;
		// 		margin-left:70upx;
		// 		font-size:45upx;
		// 		color:#fff;
		// 		transform:rotate(355deg); 
		// 		font-weight:700;
		// 	}
		// 	p:nth-child(3){
		// 		margin-top:30upx;
		// 		margin-left:80upx;
		// 		font-size:30upx;
		// 		color:#fff;
		// 		transform:rotate(355deg);
		// 		font-weight:700;
		// 	}
		// 	img:nth-child(4){
		// 		width:116upx;
		// 		height:108upx;
		// 		position:absolute;
		// 		right:84upx;
		// 		bottom:90upx;;
		// 	}
		// }
		.newCoupon_box {
			width: 478upx;
			height: 780upx;
			// background: #2C405A;
			margin: auto;
			overflow: hidden;
			
			.newCoupon {
				background-color: #ffffff;
				height: 732upx;
				position:relative;
				border-radius: 30upx;

				.newCoupon_title {
					position: relative;
					text-align: center;
					width: 100%;
					height: 218upx;
					// background: #f33c5a;
					margin-top: 32upx;
					border-top-right-radius: 30upx;
					border-top-left-radius: 30upx;
					background: url("../../static/images/APP-qie16_0000_2.png") no-repeat;
					background-size: 478upx 218upx;

					// // border-bottom-left-radius: 100upx;
					// border-radius: 0 0 50% 50%;
					image {
						width: 220upx;
						height: 170upx;
						margin-top: -30upx;
					}

					view {
						font-size: 28upx;
						color: #ffffff;

						text {
							font-size: 32upx;
							font-weight: 600;
							margin: 0 8upx;
						}
					}
				}

				.newCoupon_title {
					position: relative;
					text-align: center;
					width: 100%;
					height: 218upx;
					// background: #f33c5a;
					margin-top: 32upx;
					border-top-right-radius: 30upx;
					border-top-left-radius: 30upx;
					background: url("../../static/images/APP-qie16_0000_2.png") no-repeat;
					background-size: 478upx 218upx;

					// // border-bottom-left-radius: 100upx;
					// border-radius: 0 0 50% 50%;
					image {
						width: 220upx;
						height: 170upx;
						margin-top: -30upx;
					}

					view {
						font-size: 28upx;
						color: #ffffff;

						text {
							font-size: 32upx;
							font-weight: 600;
							margin: 0 8upx;
						}
					}
				}
				.discountCoupon{
					width:100%;
					// background-color: #007AFF;
					padding: 0 36upx;
					text-align: center;
					overflow: hidden;
					.discountCoupon_title{
						margin-top: 10upx;
						font-size: 22upx;
						color:#666666;
						line-height: 30upx;
						margin-bottom: 20upx;
					}
					.scroll-Y{
						width:100%;
						height:334upx;
					}
					.discountCoupon_content{
						margin-left: 26upx;
						margin-top:10upx;
						width:362upx;
						height: 102upx;
						background: url(../../static/images/APP-qie16_0000_进入界面-优惠券.png) no-repeat;
						background-size: 362upx 102upx;
						color:#FFFFFF;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 30upx 10upx 18upx;
						.leftInfo{
							width:222upx;
							height:98upx;
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
						.discountCoupon_content_money{
							text-align: left;
							width:108upx;
							text{
								font-size: 26upx;
							}
							font-size: 50upx;
						}
						.discountCoupon_content_fill{
							text-align: left;
							width:110upx;
							font-size: 26upx;
							margin-top:16upx;
							view:last-child{
								font-size: 16upx;
							}
							margin-left: -20upx;
						}
						.discountCoupon_content_type{
							width:130upx;
							height: 95upx;
							font-size: 26upx;
							margin-right:-28upx;
							display:flex;
							justify-content: center;
							align-items: center;
						}
					}
					.d_draw{
						text-align: center;
						position:absolute;
						bottom: 20upx;
						width:265upx;
						height: 58upx;
						background: #f49c17;
						line-height: 58upx;
						border-radius: 50upx;
						font-size: 32upx;
						color:#ffffff;
						margin-left: 80upx;
						margin-top:18upx;
					}
				}
			}



		}
	}

	.noOpen {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		z-index: 10;

		img {
			width: 100upx;
			height: 100upx;
			position: fixed;
			top: 30%;
			left: 43%;
			bottom: 0;
			right: 0;
		}

		p {
			color: #fff;
			font-size: 40upx;
			position: fixed;
			top: 40%;
			left: 33%;
			bottom: 0;
			right: 0;
		}
	}

	/* 壹口两口小视频 */
	.home-movie {
		width: 100%;
		height: 426upx;
		padding: 0 28upx;

	}

	.bj {
		width: 100%;
		height: 398upx;
		background: #FFFFFF;
		box-shadow: 0 0 6upx #555555;
		border-radius: 8upx;
	}

	.redbj {
		width: 100%;
		height: 76upx;
		background: url(../../static/images/APP-01_0011_jianbian01.png) no-repeat;
		background-size: 100%;
	}

	.redbj-left {
		float: left;
		position: relative;
	}

	.redbj-left img {
		display: block;
		width: 36upx;
		height: 36upx;
		margin: 17upx 0 0 20upx;
		position: absolute;
	}

	.movie-title {
		margin-left: 74upx;
		line-height: 70upx;
		color: white;
	}

	.redbj-right {
		float: right;
		padding-right: 22upx;
		line-height: 70upx;
		color: white;
		font-size: 24upx;
	}

	.bj-bottom {
		padding: 0 18upx;
		width: 100%;
		height: 322upx;

	}

	.bj-bottom-movie {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.movie-item {
		width: 204upx;
		height: 292upx;
		background: pink;
		margin-top: 12upx;
		border-radius: 8upx;
		// margin-right:14upx;
		background: url(https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1441953467,2095335145&fm=26&gp=0.jpg) no-repeat;
		background-size: 100% 100%;
		position: relative;
		// float:left;
		// flex:1; 

	}

	.movie-item-bottom {
		width: 100%;
		height: 33upx;
		line-height: 33upx;
		background: #333333;
		/* opacity:0.5; */
		background: rgba(0, 0, 0, .5);
		position: absolute;
		bottom: 0;
		border-bottom-left-radius: 8upx;
		border-bottom-right-radius: 8upx;
		color: white;
		font-size: 20upx;
		text-align: center;
	}

	.movie-number {
		position: absolute;
		width: 99upx;
		height: 30upx;
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
		top: 16upx;
		right: 10upx;
		border-radius: 28upx;
		font-size: 24upx;
		line-height: 34upx;
		background-size: 13upx;
		float: left;
	}

	.movie-number img {
		position: absolute;
		left: 13upx;
		top: 8upx;
		width: 13upx;
	}

	.movie-number view {
		margin-left: 38upx;
	}

	/* 新人专享 */
	.newpeople {
		width: 100%;
		// height:480upx;
		// background: #F1F1F1;
		padding: 0 28upx;
		display: flex;

		.newbox {
			width: 100%;
			// height:480upx;
			border-radius: 8upx;
		}

		.newp {
			width: 100%;
			height: 200upx;
			background: #313745;
			display: flex;
			border-radius: 20upx;
			margin-bottom: 20upx;

			.kuai {
				img {
					width: 200upx;
					margin-top: -20upx;
				}
			}

			.news {
				width: 100%;
				height: 60upx;
				font-size: 30upx;
				color: #eedac2;
				font-weight: 500;
				margin-top: 60upx;
				margin-left: -30upx;

				p:first-child {
					font-size: 35upx;

				}

				p:last-child {
					font-size: 26upx;
				}
			}

			.man {
				height: 100%;
				position: relative;

				img {
					width: 180upx;
					height: 70upx;
					position: absolute;
					right: 0;
					top: 70upx;
					margin-right: 14upx;
				}

				p {
					font-size: 30upx;
					color: #ffffff;
					font-weight: 600;
					position: absolute;
					top: 85upx;
					right: 0;
					width: 164upx;
				}
			}
		}
	}

	.Super {
		width: 100%;
		height: 222upx;
		background: #f7ece6;
		box-shadow: 100upx #333333;
		display: flex;
		justify-content: space-between;

		view {
			width: 49.8%;
			background: white;
		}

		.super-right {
			float: right;
			border-top-right-radius: 8upx;
			border-bottom-right-radius: 8upx;
		}

		.super-left {
			position: relative;
			border-top-left-radius: 8upx;
			border-bottom-left-radius: 8upx;
			box-shadow: 30upx #555555;

			.super-box {
				width: 100%;
				height: 62upx;
				display: flex;

				.super-left-s {
					margin-top: 4upx;
					height: 62upx;
					font-size: 30upx;
					font-weight: 900;
					padding-left: 26upx;
					line-height: 74upx;
					color: #333333;
					display: flex;
					align-items: center;
				}

				.super-time-box {
					width: 100%;

					//计时器
					.super-time {
						font-size: 30upx;
						line-height: -30upx;
						width: 140upx;
						height: 40upx;
						margin-right: 70upx;
						z-index: 2;
					}
				}
			}

			.super-left-s {
				width: 100%;
				height: 62upx;
				font-size: 30upx;
				font-weight: 900;
				padding-left: 26upx;
				line-height: 74upx;
				color: #333333;
			}

			.super-left-x-box {
				margin-top: 10upx;
				width: 100%;
				height: 140upx;

				img {
					width: 49.5%;
					height: 130upx;
				}
			}

			.super-left-x {
				width: 100%;
				font-size: 20upx;
				padding-left: 26upx;
			}
		}
	}

	// 选项卡
</style>
