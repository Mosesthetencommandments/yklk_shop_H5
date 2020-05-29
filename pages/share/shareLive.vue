<template>
	<view>
		<view class="viedoItem">
			<view class="viedo" >
				<!-- 视频 -->
				<video 
					:id="'aaa' + item.id"
					:controls="controls"
					:show-center-play-btn="false"
					:playsinline="playsinline"
					webkit-playsinline="true"
					x5-video-player-type="h5"
					x5-video-player-fullscreen="true"
					:preload="preload"
					@play="gosssss(item)" 
					@click="gosssss(item)" 
					class="kkk"
					:src="item.pullUrl + '/' + item.stream_key_pull"
				>
					<!-- 遮罩层 -->
					<view class="cover" v-if="isShow">
						<image class="anN" src="../../static/images/APP-qie3_0001_播放play.png" mode=""></image>
						<image class="image" :src="item.room_img" mode=""></image>
					</view>
					
				</video>
			</view>
			
			<!-- 弹幕神马的 -->
			<view class="shade" v-if="item.is_full !== undefined">
			
				<view class="fordanmu">
					<!-- 谁谁在购买 -->
					<view class="shopNumber" id="adf" :animation="animationData0" v-if="isShoss">
						<view class="s_img_box">
							<image src="../../static/images/APP-qie13_0009_购物车满.png" mode=""></image>
						</view>
						<view>
							<text>{{fir}}***{{fit}}</text> 等{{num}}人正在购买
						</view>
					</view>
					<!-- 弹幕 -->
					<view class="danmu-box">
						<view class="danmu-content">
							<scroll-view scroll-y="true" class="scroll-Y" :scroll-top="scrollTopS" id="scrollview"> 
								<view class="danmu-content-chat" v-for="(item,index) in danmuList" :key="index">
									<image class="vip" :src="item.vip" mode=""></image>
									<text class="name1" v-if="item.time===99">{{item.name}} <text style="margin-left: 10upx;">  </text> </text>
									<text class="name" v-if="item.time===3">{{item.name}}：</text>
									<text :style="{color:item.color}">{{item.text}}</text> 
								</view>
							</scroll-view>
						</view>
					</view>
					<!-- 飘在列表上面的 -->
					<view class="SingleListItem_box" :animation="animationData3" @click.stop="isliveGoodsList = true">
						<view class="SingleListItem" v-for="(item,index) in wosj" :key="index">
							<view class="SingleListItem_img">
								<image :src="item.image_thumb" mode=""></image>
							</view>
							<view class="SingleListItem_message">
								<view class="SingleListItem_message_title">
									{{item.goods_name}}
								</view>
								<view class="SingleListItem_message_money">
									￥{{item.price}}
								</view>
							</view>
						</view>
						<view class="dsj">
						</view>
					</view>
					<!-- 短连接小黄车 -->
					
					<!-- 小黄车 -->
					<view class="button-box">
						<view class="mengceng" v-if="isPopp === true" @click="isPopp=false">
						
						</view>
						<view class="danmu-button">
							<!-- 	<view class="danmu-input1" @click="fashe">
								发射弹幕
							</view> -->
							<input type="text" v-model="danmuValue" class="danmu-input1" placeholder="跟主播互动~" @blur="_ipt_blur" @focus="PopInput"
							 :class="isPopp === true ? cantSay === false ?'danmu_active' : '' : ''" v-if="cantSay === false"/>
							<input type="text" v-model="danmuValue" class="danmu-input1" placeholder="您已被禁言" @blur="_ipt_blur" @focus="PopInput"
							  :class="isPopp === true ?  cantSay === false ?'danmu_active' : '' : ''"  :disabled="true"   v-else/>
							<view class="sendDanmu1" v-if="isPopp === true" @click="senddanmu">
								<view>发送</view>
							</view>
						</view>
						<!-- <view class="sendDanmu" @click="senddanmu">
							<view>发送</view>
						</view> -->
						<view class="shop" @click="isliveGoodsList = true">
							<view class="redDot">
								{{several}}
							</view>
							<image src="../../static/images/包动画3.gif" mode=""></image>
						</view>
						<view class="fenxiang" @click="goLiveToShare(item.id)">
							<image src="../../static/images/APP-qie13_0000_分享.png" mode=""></image>
						</view>
						<view class="fenxiangHB_box" v-if="isFXHB" @click.stop="isFXHB = false">
							<view class="x_box" @click.stop="isFXHB = true">
								<view class="fenxiangHB">
									<image :src="Img" mode=""></image>
								</view>
								<view class="fenxiangXZ_box">
									<image src="../../static/images/APP-qie13_0000_到手机.png" mode=""></image>
									<view>长按图片保存</view>
								</view>
							</view>
							
						</view>
					</view>
					<!-- 列表 -->
					<view class="liveProductList_box" v-if="isliveGoodsList" @click.stop="isliveGoodsList = false">
						<view class="liveProductList">
							<view class="liveProductList_top">
								全部宝贝 {{several}}
							</view>
							<view class="liveProductList_bottom">
								<scroll-view scroll-y="true" class="d_scroll-Y">
								<view 
									class="liveProductList_bottom_item" 
									v-for="(item,index) in LiveRoomGoodsList" 
									:key="index" 
									@click.stop="goBuy(item)"
								>
									<view class="item_headUrling">
										<image :src="item.image_thumb" mode=""></image>
									</view>
									<view class="item_message">
										<view class="item_message_title">
											{{item.goods_name}}
										</view>
										<view class="item_message_onsale">
											直播间下单享受更多优惠
										</view>
										<view class="item_message_money">
											<view class="d_money">
												￥{{item.price}}
											</view>
											<view class="d_shop_car">
												<image src="../../static/images/APP-01_0008_shop-car.png" mode=""></image>
											</view>
										</view>
									</view>
								</view>
								<view class="" style="height: 30upx;"></view>
								</scroll-view>
							</view>
						</view>
					</view>
			
				</view>
				<!-- End -->
				<!-- 顶部主播信息 -->
				<view class="shade-header-box">
					<view class="header-message" @click="attention">
						<image :src="item.head_img" mode=""></image>
						<view class="message-center">
							<view class="ads">{{item.nickname}}</view>
							<view class="fans">
								本场热度：{{totalNum}}
							</view>
						</view>
						<view class="message-right" v-if="isFollow">
							<image src="../../static/images/APP-qie13_0010_关注.png" mode=""></image>
							关注
						</view>
					</view>
				
					<view class="header-fans">
						<!-- <view class="touxiang">
							<view class="img-box" v-for="(itemss,indexs) in headList" :key="indexs">
								<image class="ads" :src="itemss.head" mode=""></image>
							</view>
						</view> -->
						<!-- <view class="fans-number">
							{{totalNum}}
						</view> -->
						<image @click="goBack(item)" class="image" src="../../static/images/APP-qie3_0000_叉.png" mode=""></image>
					</view>
				</view>
				<!-- 公告 -->
				<view class="notice" 
					v-if="isNotice"
					:animation="animationData1" 
					style="min-width: 300upx;max-width: 500upx;"
				>
					<image src="../../static/images/APP-qie13_0011_广播(1).png" mode=""></image>
					{{announcement}}
				</view>
				<!-- 主推 -->
				<view class="MainProducts_box" v-if="isNewGoods">
					<view class="MainProducts">
						<view class="MainProducts_item" @click="goBuy(items)" v-for="(items,index) in YellowCar" :key="index">
							<view class="MainProducts_item_money">
								￥{{items.actual_price}}
							</view>
							<image :src="items.image_thumb" mode=""></image>
						</view>
						
					</view>
				</view>
				<!-- 主推 -->
				<view class="MainProducts_box" v-else>
					<view class="MainProducts">
						<view class="MainProducts_item" @click="goBuy(itemss)" v-for="(itemss,indexx) in d_newGoods" :key="indexx">
							<view class="MainProducts_item_money">
								￥{{itemss.actual_price}}
							</view>
							<image :src="itemss.image_thumb" mode=""></image>
						</view>
					</view>
				</view>
				<!-- 关注 -->
				<view class="attention-box" @click.stop="isAttention=false" v-if="isAttention">
					<view class="attention">
						<view class="headerPortrait">
							<image :src="item.head_img" mode=""></image>
						</view>
						<view class="headerName">{{item.nickname}}</view>
						<view class="total"></view>
						<view class="label">{{item.desc}}</view>
						<view class="Ta">Ta的粉丝</view>
						<view class="fansNumber">{{item.follow_count}}</view>
						<view class="d_attention" @click.stop="follow(item)" v-if="isFollow">
							<text>+</text>
							关注TA
						</view>
						<view class="d_attention1" v-else>
							已关注
						</view>
					</view>
				</view>
				<!-- 抽奖 -->
				<view class="drawALotteryOrRaffle" @click="corona">
					<image src="../../static/images/cjLogo.png" mode=""></image>
				</view>
				<view class="drawALotteryOrRaffle1" @click="getShopCouponList">
					<image src="../../static/images/APP-qie17_0002_优惠券.png" mode=""></image>
				</view>
				<!-- 背景黑框 -->
				<!-- 抽奖中的手机号注册 -->
				<view class="phoneRegistered_box" v-if="isPhone">
					<view class="phoneRegistered">
						<view class="img_box" @click="isPhone = false">
							<image src="../../static/images/APP-qie14_0005_close.png" mode=""></image>
						</view>
						<view class="phoneRegistered_bj">
							<view class="phoneRegistered_bj_phone_title">
								请完善手机号码
							</view>
							<view class="phoneRegistered_bj_phone">
								<input type="number" placeholder="填写手机号码" value="" @blur="getPhone" />
								<view class="" v-if="!d_isShow" @tap="getCheckNum">
									获取验证码
								</view>
								<view class="" v-else>已获取({{codetime}}s)</view>
							</view>
							<view class="phoneRegistered_bj_code">
								<input type="number" placeholder="输入验证码" value="" @blur="getsms_code" />
							</view>
							<view class="phoneRegistered_bj_submit" @click="checkphone">
								确认提交
							</view>
						</view>
					</view>
				</view>
				<!-- 转盘抽奖 -->
				<view class="turntable" v-if="isCorona">
					<view class="turntable_bj">
						<view class="turntable_bj_img_box">
							<image src="../../static/images/APP-qie14_0005_close.png" mode="" @click="isCorona = false"></image>
						</view>
						<view class="turntable_bj_title">幸运大转盘</view>
						<view class="turntable_bj_title1">好礼赢不停</view>
						<!-- 轮盘 -->
						<view class="">
							<view class="wosli">
								<!-- <image src="../../static/images/kuang_box.png" mode=""></image> -->
								<view class="kuang1">
									<image class="qweqe" src="../../static/images/sda.png" mode=""></image>
								</view>
								<view @tap="playReward" class="canvas-btn" v-bind:class="btnDisabled"></view>
							</view>
							<view class="main" style="padding-top: 20upx;">
							    <view class="canvas-container">
							        <view :animation="animationData" class="canvas-content" id="zhuanpano" style="">
							            <view class="canvas-line">
							                <view class="canvas-litem" v-for="(item,index) in d_list" :key="index"
							                      :style="{transform:'rotate('+(index * width + width / 2)+'deg)'}"></view>
							            </view>
							
							            <view class="canvas-list">
							                <view class="canvas-item" :style="{transform: 'rotate('+(index * width)+'deg)', zIndex:index, }" v-for="(iteml,index) in d_list" :key="index">
							                    <view class="canvas-item-text" :style="'transform:rotate('+(index )+')'">
													<img :src="iteml.prize_img" mode=""></img>
							                        <!-- <text class="b" style="font-size: 32upx;">{{iteml.name}}</text>
							                        <text class="icon-awrad iconfont " :class="iteml.icon"></text> -->
							                    </view>
							                </view>
							            </view>
							        </view>

							    </view>
							</view>	
						</view>
						<view class="turntable_record" @click="getCustomerWinnerDrawRecordList">
							中奖纪录
						</view>
						
					</view>
					
				</view>
				<!-- 中奖纪录 -->
				
				<view class="record_box" v-if="isDrawRecordList">
					<view class="record">
						<view class="record_title">
							<view>中奖纪录</view>
							<view><text></text></view>
						</view>
						
							<view class="record_content">
								<scroll-view scroll-y="true" class="scroll-Y">
									<view class="record_content_shell" v-for="(item,index) in WinningList" :key="index">
										<image src="../../static/images/APP-qie17_0003_喇叭09.png" mode=""></image>
										<view class="">
											{{item.winner_draw_time}} 获得 <text> {{item.customer_winner_draw_record.prize_name}}</text>
										</view>
									</view>
								</scroll-view>
							</view>
						
						<view class="record_submit" @click="isDrawRecordList = false">
							我知道了
						</view>
					</view>
				</view>
				<!-- 中奖 -->
				<view class="winPrizeInlottery_box" v-if="isZJ">
					<view class="winPrizeInlottery">
						<view class="first">
							<view class="winPrizeInlottery_title">恭喜您抽中了{{isZJ_prize_name}}</view>
							<view class="winPrizeInlottery_LQ" @click="ImmediatelyToReceive">
								立即领取
							</view>
						</view>
						<view class="">
							<image src="../../static/images/APP-qie14_0005_close.png" mode="" @click="isZJ = false"></image>
						</view>
					</view>
				</view>
				<!-- 收货地址 -->
				<view class="shippingAddress_box" v-if="isAddress">
					<view class="shippingAddress">
						<view class="shippingAddress_title">
							<view class="shippingAddress_content">
								<view class="shippingAddress_content_name">
									请填写收货地址
								</view>
								<input class="input_name" type="text" value="" placeholder="姓名" @blur="getName"/>
								<input class="input_phone" type="number" maxlength="11" value="" placeholder="手机号码" @blur="getAddressPhone"/>
								<textarea class="input_address" name="" id="" cols="30" rows="10" placeholder="收货地址：详细到道路、门牌号、小区" @blur="getShippingAddress"></textarea>
								<view class="input_submit" @click="createWinnerDrawCustomerInfo">
									确认提交
								</view>
							</view>
						</view>
						<view class="shippingAddress_img">
							<image src="../../static/images/APP-qie14_0005_close.png" mode="" @click="isAddress = false"></image>
						</view>
					</view>
				</view>
				<!-- 成功提示 -->
				<view class="SuccessfulTip_box" v-if="isSuccesss">
					<view class="">
						<image src="../../static/images/APP-qie14_0008_提交成功.png" mode=""></image>
					</view>
				</view>
				<!-- 优惠券 -->
				<view class="mask" @click="isHave=false" v-if="isHave">
					<view class="newCoupon_box">
						<view class="newCoupon">
							<view class="newCoupon_title">
								<image src="../../static/images/APP-qie16_0001_13.png" mode=""></image>
								<view class="">
									恭喜您获得<text>{{fullReduction.length}}</text>张优惠券
								</view>
							</view>
							<view class="discountCoupon" @click="goCoupon">
								<view class="discountCoupon_title">
									壹口两口送您{{fullReduction.length}}张代金券，直接放入账户中 可在“我的—优惠券”中查看
								</view>
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
								<view class="d_draw">
									一键领取
								</view>
							</view>
						</view>
					</view>
				</view>
				
				
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		onLoad(option) {
			// 获取奖品列表
			this.width = 360 / this.list.length
			clearTimeout(this.test1);
			clearTimeout(this.test2);
			clearTimeout(this.test3);
			clearTimeout(this.test4);
			clearTimeout(this.test5);
			clearTimeout(this.test6);
			clearTimeout(this.GoodsListTime);
			clearTimeout(this.live_noticeTime);
			clearTimeout(this.timer1);
			this.d_live_room_id = option.live_room_id
			if(this.d_live_room_id !== null && this.d_live_room_id !==undefined && this.d_live_room_id !== ''){
				this.getCumstomerInfo()
				this.getLiveRoomDrawList()
			}
			this.d_detail()
			this.item.is_full = false
			// console.log(this.item.is_full)
			// window.addEventListener("popstate", () => {
			// 	console.log(location.hash)
			// 	if (location.hash === "#/pages/share/shareLive") {
			// 		uni.redirectTo({
			// 			url: '/pages/share/shareLive'
			// 		});
			// 	}
			// }, false)
		},
		onPullDownRefresh() {//下拉刷新
			this.getCumstomerInfo()
		},
		onPageScroll(res){
			this.scrollTopPX = res.scrollTop;
		},
		data() {
			return {
				isFXHB:false,
				isNotice:false,
				isliveGoodsList:false,
				isMh:true,
				isNewGoods:true,
				isPopp:false,
				showPopupBottom:false,
				focus:true,
				isPop:false,
				isShoss:true,
				isGZ:false,
				isVideo: true,
				isSSSS: false,
				isFollow: true,
				isAttention: false,
				aaaa:false,
				videoContext:null,
				preload:'auto',
				controls:false,
				playsinline:true,
				isShow:true,
				item:{},
				customer_id:null,
				isSShow:true,
				openid:'',
				titleIndex:2,
				name:'',
				user_headimgurl:"",
				isSSS:true,
				abc:false,
				danmuList: [],
				danmuValue: '',
				token:null,
				//websocket
				socketTask: null,
				// 确保websocket是打开状态
				is_open_socket: false,
				userinfo:{},
				d_videoList:[],
				d_videoList1:[],
				d_videoList2:[],
				viedeoLiseId:null,
				isClick:true,
				isClick1:false,
				YellowCar:[],
				d_follow_list:[],
				status_arr:[],//关注列表
				status_arr1:[],
				headList: [], //观看头像列表,
				fir: "青",
				fit: "飞",
				num: '759',
				d_live_room_id:null,
				d_newGoods:[],
				animationData0: {},
				animationData1:{},
				animationData2:{},
				animationData3:{},
				d_animation1:{},
				test1:{},
				test2:{},
				test3:{},
				test4:{},
				test5:{},
				test6:{},
				GoodsListTime:{},
				live_noticeTime:{},
				singleYellowCar:[],
				dom:null,
				//自动还是手动滚动
				Real:0,
				newGg:[],
				several:null,
				LiveRoomGoodsList:[],
				announcement:null,
				wosj:[],
				listHeight: 0,
				scrollTopS: 0,
				cantSay:false, // 控制禁言
				timer1:null,
				Img:null,
				// XJ
				d_phone:null,
				d_isShow:false,
				codetime:"60",
				isPhone:false,
				sms_code:null,
				//转盘
				list: [
				  {
					"name": "1折",
					"value": "5",
					icon: 'icondazhe text-danger',
					'd_img':'./img/0bd13186957f54dcfbc39f5fc79e417-恢复的.png'
				  },
				  {
					"name": "2折",
					"value": "6",
					icon: 'icondazhe text-danger',
					'd_img':'./img/0bd13186957f54dcfbc39f5fc79e417-恢复的.png'
				  },
				  {
					"name": "3折",
					"value": "7",
					icon: 'icondazhe text-danger',
					'd_img':'./img/0bd13186957f54dcfbc39f5fc79e417-恢复的.png'
				  },
				  {
					"name": "4折",
					"value": "8",
					icon: 'icondazhe text-danger',
					'd_img':'./img/0bd13186957f54dcfbc39f5fc79e417-恢复的.png'
				  },
				  {
					"name": "5折",
					"value": "9",
					icon: 'icondazhe text-danger',
					'd_img':'./img/0bd13186957f54dcfbc39f5fc79e417-恢复的.png'
				  },
				 {
				   "name": "6折",
				   "value": "10",
				   icon: 'iconfangqi1 text-master',
				   'd_img':'./img/0bd13186957f54dcfbc39f5fc79e417-恢复的.png',
				   isNoPrize: true, // 是否未中奖
				 }, {
					"name": "7折",
					"value": "10",
					icon: 'iconfangqi1 text-master',
					'd_img':'./img/0bd13186957f54dcfbc39f5fc79e417-恢复的.png',
					isNoPrize: true, // 是否未中奖
				  }, {
					"name": "8折",
					"value": "10",
					icon: 'iconfangqi1 text-master',
					'd_img':'./img/0bd13186957f54dcfbc39f5fc79e417-恢复的.png',
					isNoPrize: true, // 是否未中奖
				  },
				],
				width: 0,
				animationData: {},
				btnDisabled: '',
				isCorona:false,
				isZJ:false,
				isAddress:false,
				d_list:[],
				prize:{},
				no_prize:[],
				d_index:null,
				isZJ_prize_name:null,
				d_getAddress:{
					name:null,
					phone:null,
					address:null
				},
				isSuccesss:false,
				WinningList:[],
				isDrawRecordList:false,
				isHave:false,
				fullReduction:[],
				couponList:[],
				winner_draw_time:null
			}
		},
		computed:{
			totalNum:{
				get(){
					let num_total = 0
					num_total += this.item.look_count + this.Real
					return num_total;
				}
			},
		},
		methods:{
			ceshi1() {
				let query = uni.createSelectorQuery()
				this.$nextTick(() => {
					query.selectAll('.danmu-content-chat').boundingClientRect()
					query.select('#scrollview').boundingClientRect()
					query.exec((res) => {
						res[0].forEach(item => {
							this.listHeight = (item.height + 4) * res[0].length + 28
						})
						setTimeout(() => {
							if (this.listHeight >= (res[1].height - 56)) {
								this.scrollTopS = 2*(this.listHeight - res[1].height)
							}
						}, 10)
					})
				})
			},
			PopInput(){
				if(this.cantSay === true){
					this.isPopp = false
					uni.showToast({
						title:"您已被封禁,无法在此直播间发言",
						icon:"none",
						duration:1000
					})
				}else{
					this.isPopp = true
				}
				// this.isPopp = true
			},
			goLiveToShare(id){
				this.isFXHB = true
				// uni.navigateTo({
				// 	url:'/pages/share/LiveToShare?live_room_id=' + id
				// })
			},
			async shareShopCouponCode(){
				let [err,res] = await this.$http.post("/api/coupon/shareShopCouponCode",{
					shop_coupon_url: config.webUrl1+'/#/pages/QRcode/QRcode',
					type:4,
					live_room_id:this.viedeoLiseId
				});
				if(res.data.code === 200){
					this.Img = res.data.data
				}
			},
			gosssss(item){
				// console.log(item)
				this.Hanzi()
				// window.history.pushState(null,null,'#/pages/share/shareLive?id=1');
				// console.log(item)
				this.viedeoLiseId = item.id
				this.isShow = false
				this.$set(item, 'is_full', true)
				this.YellowCar=[]
				this.liveRoomGoods()//小黄车接口
				this.longConnection()
				this.d_animation()
				this.d_notics()
				this.d_shopgoodslistnotice()
				this.getLiveRoomGoodsList()
				this.live_notice()//公告
				this.live_noticeTime = setInterval(()=>{
					this.live_notice()//公告
				},60000)
				// this.GoodsListTime = setInterval(()=>{
				// 	this.getLiveRoomGoodsList()//商品列表
				// },10000)
				this.randomYellowCar()
				let token = uni.getStorageSync("token")
				if (token !== undefined && token !== null && token !== '') {
					this.validateRoom(item)
				} else {
				
				}
				this.getCantSayInfo()
				this.shareShopCouponCode()
			},
			async getCumstomerInfo() { //获取用户个人信息
				let token = uni.getStorageSync("token")
				if(token === undefined || token === null || token === ''){
					return false
				}
				let [err, res] = await this.$http.post('/api/customer/getCustomerInfo');
				if (res.data.code === 200) {
					this.customer_id = res.data.data.customer_id
					// console.log(this.customer_id)
					uni.stopPullDownRefresh();
					this.d_phone = res.data.data.phone
					console.log(res.data.data)
				}
			},
			d_detail(){//单个直播
				const token = uni.getStorageSync('token')
				uni.request({
				    url: config.webUrl2 + '/liveRoom/detail', 
					method:"POST",
				    data: {
				        lr_id:this.d_live_room_id,//客户id
				    },
				    header: {
				        'Authorization': token 
				    },
				    success: (res) => {
						if(res.data.code === 200){
							let list = res.data.data
							const tempItem = {}
							tempItem.id = list.id
							tempItem.room_img=list.room_img
							tempItem.look_count=list.look_count
							tempItem.status=list.status
							tempItem.title=list.title
							tempItem.pullUrl=list.pullUrl
							tempItem.stream_key_pull=list.stream_key_pull
							tempItem.head_img=list.room_anchor.head_img
							tempItem.nickname=list.room_anchor.nickname
							tempItem.follow_count=this.numberFormat(list.follow_count)
							tempItem.look_count=list.look_count
							tempItem.desc = list.room_anchor.desc
							this.item = Object.assign({}, tempItem)
						}
			
				    },
				
				})	
			},
			numberFormat (value){//过万封装
				if(value > 9999){
					value = (value / 10000).toFixed(1) + "万"
					return value
				}
				if(value <= 9999){
					return value
				}
			},
			senddanmu(){//点击发送时
				const token = uni.getStorageSync('token')
				// if (token === '' || token === null || token === undefined) {
				// 	uni.showToast({
				// 		title: '请先登录',
				// 		icon: 'none'
				// 	})
				// 	return false
				// }
				// if(this.cantSay === true){
				// 	uni.showToast({
				// 		title: '您已被拉黑, 请注意自身言论',
				// 		icon: 'none'
				// 	});
				// }
				this.isPopp = false
				if (this.danmuValue === '') {
					uni.showToast({
						title: '请输入内容',
						icon: 'none'
					});
					return
				}
				let danmuValue = this.danmuValue
				this.sendSocketMessage('barrage_connect', {
					msg: danmuValue
				})
				this.danmuValue = ""
				
				// if(this.danmuValue === ''){
				// 	uni.showToast({title: '请输入内容',icon:'none'});
				// 	return
				// }
				// let danmuValue = this.danmuValue
				// this.sendSocketMessage('barrage_connect',{msg:danmuValue})
				// this.danmuValue = ""				
			},
			//直播间判断禁言
			getCantSayInfo(){
				// console.log(this.customer_id)
				// console.log(this.d_live_room_id)
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/liveRoom/validateBlacklist',
					method: "POST",
					data: {
						customer_id: this.customer_id, //客户id
						live_room_id: this.d_live_room_id, //直播间id
					},
					header: {
						'Authorization': token
					},
					success: (res) => {
						console.log(res)
						if(res.data.code === 2002){
							this.danmuValue = ''
							this.isPopp = false
							this.cantSay = true
							this.timer1 = setTimeout(()=>{
								this.getCantSayInfo()
							},10000)
						}else{
							this.cantSay = false
							this.timer1 =setTimeout(()=>{
								this.getCantSayInfo()
							},10000)
						}
					}
				});
			},
			
			ListeningToArray(){
				if(this.danmuList.length > 30){
					this.danmuList.splice(0,1)
				}
			},
			ListeningToHeadList() {
				if (this.headList.length > 4) {
					this.headList.splice(0, 1)
				}
			},
			_ipt_blur(){
				if(this.cantSay === true){
					this.danmuValue = ''
					return
				}
				uni.pageScrollTo({
					scrollTop: this.scrollTopPX,
					duration: 0
				});
				// setTimeout(()=>{
				// 	this.isPopp = false
				// },1)
			},
			longConnection() { //websocket   长连接
				const token = uni.getStorageSync('token')
				this.socketTask = uni.connectSocket({
					url: config.websocketUrl + "/barrage",
					success(data) {
						console.log("websocket连接成功");
					},
				});
				this.socketTask.onOpen((res) => {
					console.log("WebSocket连接正常打开中...！");
					this.is_open_socket = true
					let token = uni.getStorageSync("token")
					if(token === undefined || token === null || token === ''){
						return false
					}else{
						this.sendSocketMessage('first_connect', {})
						this.sendSocketMessage('live_realtime_follow', {})
						this.sendSocketMessage('master_push_live_goods', {})
					}
			
				})
				uni.onSocketError((res) => {
					console.log('WebSocket连接打开失败，请检查！');
				});
				uni.onSocketMessage((res) => { //监听WebSocket接受到服务器的消息事件。
					if(this.is_open_socket === false){
						return
					}
					this.ListeningToArray()
					this.ListeningToHeadList()
					const jsonData = res.data
					const data = JSON.parse(jsonData);
					console.log(data)
					// if(data.code === 10001){
					// 	this.cantSay = true
					// 	return 
					// }
					// if(data.code === 10002){
					// 	this.cantSay = true
					// 	return 
					// }
					// if(data.code === 200){
					// 	this.cantSay = false
					// 	return 
					// }
					if (data.data.type === 'first_connect') {
						this.ceshi1()	
						// console.log(data.data.data)
						this.headList = this.headList.filter(item => {
							if (item.id !== data.data.data.id) {
								return true
							}
						})
						if(data.data.data.user_headimgurl !== null && data.data.data.user_headimgurl !== undefined && data.data.data.user_headimgurl !== ''){
							this.headList.push({
								head: data.data.data.user_headimgurl,
								id: data.data.data.id
							})
						}else{
							this.headList.push({
								head: "/static/images/APP-qie8_0000_mo-head2.png",
								id: data.data.data.id
							})
						}
						
						this.headList.reverse()
						// console.log(this.headList)
						if (data.data.data.user_nickname !== null && data.data.data.user_nickname !== undefined && data.data.data.user_nickname !== "") {
							// console.log(data.data.data.distribution_level_img)
							this.danmuList.push({
								text: "进入直播间",
								name: data.data.data.user_nickname,
								vip: data.data.data.distribution_level_img,
								color: '#ffcd46',
								time: 99
							})
						}
						//  else {
						// 	let phone = data.data.data.phone
						// 	let reg = /^(\d{3})\d*(\d{4})$/
						// 	let newPhone = phone.replace(reg, '$1****$2')
						// 	this.danmuList.push({
						// 		text: "进入直播间",
						// 		name: newPhone,
						// 		vip: data.data.data.distribution_level_img,
						// 		color: '#ffcd46',
						// 		time: 99
						// 	})
						// 	// console.log("收到服务器内容：" + newPhone + "来了")
						// }
					} else if (data.type === 'barrage_connect') {
						this.ceshi1()
						this.isMh = false
						console.log(data.data)
						if (data.data.userInfo.user_nickname !== null && data.data.userInfo.user_nickname !== undefined && data.data.userInfo
							.user_nickname !== "") {
							this.danmuList.push({
								text: data.data.msg,
								name: data.data.userInfo.user_nickname,
								vip: data.data.userInfo.distribution_level_img,
								color: '#ffffff',
								time: 3
							})
						} else {
							uni.showToast({title: '请完善昵称',icon:'none'});
							// let phone = data.data.userInfo.phone
							// let reg = /^(\d{3})\d*(\d{4})$/
							// let newPhone = phone.replace(reg, '$1****$2')
							// this.danmuList.push({
							// 	text: data.data.msg,
							// 	name: newPhone,
							// 	vip: data.data.userInfo.distribution_level_img,
							// 	color: '#ffffff',
							// 	time: 3
							// })
						}
					}else if(data.type === 'live_realtime_follow'){
						// console.log(data.data.data.real)
						this.Real = data.data.data.real
					}else if(data.type === 'master_push_live_goods'){
						// console.log(this.isNewGoods)
						this.isNewGoods = false
						// console.log(this.isNewGoods)
						this.newGg = []
						let list = data.data.goods_list
						if(list ===undefined){
							return false
						}
						this.newGg=list
						this.d_newGoods = []
						// if(this.newGg.length === undefined){
						// 	return
						// }
						console.log(this.newGg.length)
						for(let i = 0 ; i < this.newGg.length; i++){
							this.d_newGoods.push({
								id:this.newGg[i].shop_goods_common.id,
								species_values:this.newGg[i].shop_goods_common.species_values,
								actual_price:this.newGg[i].actual_price,
								image_thumb:this.newGg[i].image_thumb,
								goods_title:this.newGg[i].shop_goods_common.goods_title
							})
						}
						// console.log(this.d_newGoods)
						
					}
				});
			
			},
			sendSocketMessage(type,data) {//封装发送
				// console.log(this.is_open_socket)
			  if (this.is_open_socket) {
				const token = uni.getStorageSync('token')
				const rooid = this.viedeoLiseId
			    uni.sendSocketMessage({
			      data: JSON.stringify({ type: type,room_id:rooid,token: token,data:data }),
			    });
			  } 
			},
			async liveRoomGoods() { //小黄车接口
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/liveRoomGoods/masterPushGoodsInfo',
					method: "POST",
					data: {
						live_room_id: this.viedeoLiseId
					},
					header: {
						'Authorization': token
					},
					success: (res) => {
						let list = res.data.data
						for (let i = 0; i < list.length; i++) {
							this.YellowCar.push({
								id: list[i].shop_goods_common.id,
								species_names:list[i].shop_goods_common.species_names,
								species_values:list[i].shop_goods_common.species_values,
								actual_price: list[i].actual_price,
								image_thumb: list[i].image_thumb,
								goods_title: list[i].shop_goods_common.goods_title
							})
							// console.log(this.YellowCar)
						}

					}
				});
			},
			goBack(item) { //关闭全屏
				// this.videoContext.pause()
				item.is_full = undefined
				this.is_open_socket = false
				console.log(this.is_open_socket)
				clearTimeout(this.test1);
				clearTimeout(this.test2);
				clearTimeout(this.test3);
				clearTimeout(this.test4);
				clearTimeout(this.test5);
				clearTimeout(this.test6);
				clearTimeout(this.GoodsListTime);
				clearTimeout(this.live_noticeTime);
				clearTimeout(this.timer1);
				this.abc = false
				this.cantSay = false
				this.danmuValue = ''
				uni.redirectTo({
				    url: '/pages/share/live'
				});
			},
			goBuy(items){
				uni.navigateTo({
					url:'../buy/buy?product_id=' + items.id
				})
			},
			attention(){
				this.isAttention = true
			},
			follow(item) { //关注
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/liveRoom/follow',
					method: "POST",
					data: {
						customer_id: this.customer_id, //客户id
						lr_id: this.d_live_room_id, //直播间id
						type: 'follow'
					},
					header: {
						'Authorization': token
					},
					success: (res) => {
						// console.log(res.data.errstr)
						// console.log(this.isFollow)
						if (res.data.errstr == '关注成功') {
							this.isFollow = false
							this.validateRoom()
						}
					}
				});
			},
			validateRoom() { //关注
				// console.log(this.d_live_room_id)
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/liveRoom/follow',
					method: "POST",
					data: {
						customer_id: this.customer_id, //客户id
						lr_id: this.d_live_room_id, //直播间id
						type: 'validate'
					},
					header: {
						'Authorization': token
					},
					success: (res) => {
						if (res.data.errstr == '已关注') {
							this.isFollow = false
						} else {
							this.isFollow = true
						}
			
					}
				});
			},
			Hanzi() {
				let Arr = ["天", "ie", "人", "和", "红", "我", "点", "瞄","有","腹","肌","的","熊","猫","骑","驴","逛","超","市","白","开","Marldin","宇","sigidn","周"];
				let n = Math.floor(Math.random() * Arr.length + 1) - 1;
				this.fir = Arr[n]
				this.fit = Arr[n + 1]
				this.num = Math.floor(Math.random() * (20 - 40) + 40);
			},
			d_animation (){
				this.test1 = setInterval(()=>{
					animation.translate(-230).opacity(0).step()		
					 
				  },5000)
				let animation = uni.createAnimation({
				  duration: 1000,
				  timingFunction: "ease",
				  delay: 0
				})
				this.animation = animation
				
				this.test2 = setInterval(function() {
				  this.Hanzi()
				  animation.translate(220).opacity(1).step()
				  this.animationData0 = animation.export() 
				  this.randomYellowCar()//控制是否出现小黄车
				}.bind(this), 10000)
				
			},
			d_notics(){
				this.test3 = setInterval(()=>{
					animation.translate(-400).opacity(0).step()		
				  },3000)
				let animation = uni.createAnimation({
				  duration: 1000,
				  timingFunction: "ease",
				  delay: 0
				})

				this.test4 = setInterval(function() {
				  animation.translate(345).opacity(1).step()
				  this.animationData1 = animation.export() 
				}.bind(this), 6000)
				
			},
			d_shopgoodslistnotice() {
				let animation1 = uni.createAnimation({
					duration: 500,
					timingFunction: "ease",
					delay: 0
				})
				this.test6 = setInterval(function() {
					animation1.opacity(0).step()
					this.animationData3 = animation1.export()
				}.bind(this), 15000)
				let animation = uni.createAnimation({
					duration: 500,
					timingFunction: "ease",
					delay: 0
				})
				this.test5 = setInterval(function() {
					animation.opacity(1).step()
					this.animationData3 = animation.export()
					this.wosjs() //商品列表
				}.bind(this), 10000)
			},
			getLiveRoomGoodsList(){//商品列表
				// console.log(this.viedeoLiseId)
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/liveRoomGoods/getLiveRoomGoodsList',
					method: "POST",
					data: {
						room_id:this.viedeoLiseId, //客户id
						
					},
					header: {
						'Authorization': token
					},
					success: (res) => {
						if(res.data.code === 200){
							// console.log(res.data.data)
							this.wosj=[]
							let list = res.data.data
							this.several = list.length
							console.log(list)
							for(let i = 0; i < list.length;i++){
								this.LiveRoomGoodsList.push({
									id:list[i].shop_goods.shop_goods_common.id,
									goods_name:list[i].shop_goods.shop_goods_common.goods_name,
									image_thumb:list[i].shop_goods.image_thumb,
									price:list[i].shop_goods.shop_goods_common.price
								})
							}
						}
				
					}
				});
			},
			wosjs(){
				this.wosj = []
				let index = Math.floor((Math.random() * this.LiveRoomGoodsList.length));
				
				this.wosj.push(this.LiveRoomGoodsList[index])
			},
			live_notice() { //公告
				// console.log(this.viedeoLiseId)
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/liveRoom/live_notice',
					method: "POST",
					data: {
						live_room_id: this.viedeoLiseId, //客户id
			
					},
					header: {
						'Authorization': token
					},
					success: (res) => {
						if (res.data.code === 200) {
							// console.log(res.data)
							// console.log(222222)
							if (res.data.data !== '' && res.data.data !== null && res.data.data !== undefined) {
								this.isNotice = true
								this.announcement = res.data.data
								
							} else {
								// console.log()
								this.isNotice = false
							}
						}
			
					}
				});
			},
			randomYellowCar(){//控制是否出现小黄车
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/liveRoom/randomYellowCar',
					method: "POST",
					data: {
						live_room_id:this.viedeoLiseId, //直播间id
						
					},
					header: {
						'Authorization': token
					},
					success: (res) => {
						if(res.data.code === 200){
							// console.log(res.data.data.random_yellow_car)
							if(res.data.data.random_yellow_car === 1){
								this.isShoss = true
							}else{
								this.isShoss = false
							}
							
						}
				
					}
				});
			},
			// 轮盘抽奖
			async corona(){
				if(this.d_phone === '' || this.d_phone === null || this.d_phone === undefined){
					this.isPhone = true
				}else{
					this.isCorona = true
				}
			},
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
					return false
				}else{
					this.d_phone = e.detail.value
				}
				typeof(Number(this.d_phone))
				this.d_phone = e.detail.value
			},
			//点击获取验证码执行
			async getCheckNum(){
				let [err,res] = await this.$http.post('/api/customer/sendSmsCode',{phone:this.d_phone,type:"register"});
				if(res.data.code == 200){
					this.d_isShow=true
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
			},
			async checkphone(){//注册手机号
				if(!this.d_phone && this.sms_code){
					uni.showToast({
						title: '请正确输入',
						duration: 1000,
						icon:'none'
					});
					return
				}else{
					let [err,res] = await this.$http.post('/api/customer/updateCustomerPhone',{
						phone:this.d_phone,
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
								this.isPhone = false
							},500)
						}
					}
				}
				
			},
			animation1(index, duration){
			  //中奖index
			  var list = this.list;
			  // var awardIndex = 1 || Math.round(Math.random() * (awardsNum.length - 1)); //随机数
			  var runNum = 4; //旋转8周
			
			  // 旋转角度
			  this.runDeg = this.runDeg || 0;
			  this.runDeg = this.runDeg + (180 - this.runDeg % 360) + (360 * runNum - index * (360 / list.length)) +1
			  //创建动画 
			  var animationRun = uni.createAnimation({
			    duration: duration,
			    timingFunction: 'ease'
			  })
			  animationRun.rotate(this.runDeg).step();
			  this.animationData = animationRun.export();
			  this.btnDisabled = 'disabled';
			
			},
			//发起抽奖
			playReward(){
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/api/liveRoomDraw/getGift', 
					method:"POST",
					data: {
						live_room_id:this.d_live_room_id,//直播间id
					},
					header: {
						'Authorization': token 
					},
					success: (res) => {
						if(res.data.code === 200){
							let list = res.data.data
							if(list.length === 0){
								uni.showToast({
									title:res.data.errstr,
									icon:"none",
									duration:1000
								})
							}else{
								this.prize = res.data.data.prize
								this.no_prize = res.data.data.no_prize
								this.d_list
								for(let i = 0 ; i < this.d_list.length; i++){
									if(this.prize.id === this.d_list[i].id){
										this.d_index = i
									}
								}
						// 		for(let i = 0 ; i < this.no_prize.length; i++){
						// 			if(this.prize.id === this.no_prize[i].id){
						// 				this.d_index = i
						// 			}
						// 		}
						
								let index = parseInt(this.d_index), duration = 7000
								console.log(index )
								this.animation1(index, duration)
								
								setTimeout(() => {
									this.isCorona = false
									this.isZJ = true
									this.isZJ_prize_name = this.prize.prize_name
									// uni.showModal({content: this.no_prize[index].prize_name})
									this.btnDisabled = '';
									// document.getElementById('zhuanpano').style=''
								 }, duration + 1000)
							}
							
						}else{
							uni.showToast({title: res.data.errstr,icon:'none'});
						}
							
					},
				})	
				
			},
			//奖品
			getLiveRoomDrawList(){
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/api/liveRoomDraw/getLiveRoomDrawList', 
					method:"POST",
					data: {
						live_room_id:this.d_live_room_id,//直播间id
					},
					header: {
						'Authorization': token 
					},
					success: (res) => {
						console.log(res)
						if(res.data.code === 200){
							console.log(res)
							this.d_list = res.data.data
						}else{
							uni.showToast({title: res.data.errstr,icon:'none'});
						}
			
					},
				})	
						
			},
			getName(e){//获取收货人姓名
				this.d_getAddress.name = e.detail.value
			},
			getAddressPhone(e){//获取收货人手机号
				this.d_getAddress.phone = e.detail.value
			},
			getShippingAddress(e){//获取收货地址
				this.d_getAddress.address = e.detail.value
				console.log(this.d_getAddress)
			},
			ImmediatelyToReceive(){//抽中立即领取
				this.isZJ = false
				console.log(this.prize.draw_type)
				if(this.prize.draw_type === 1){
					this.isAddress = true
				}else{
					this.isSuccesss = true
					let d_codetime= 2;
					let timer = setInterval(()=>{
						d_codetime--;
						if(d_codetime === 0){
							this.isSuccesss = false
							clearInterval(timer)
						}
					},1000)
				}
			},
			createWinnerDrawCustomerInfo(){//收货确认提交
				if(this.d_getAddress.phone === null || this.d_getAddress.name ===null || this.d_getAddress.address === null || this.d_getAddress.address === '' ||this.d_getAddress.address === undefined ||this.d_getAddress.phone === '' || this.d_getAddress.name===''){
					uni.showToast({
					    title: '请正确填写信息',
						icon:'none'
					});
					return
				}
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/api/liveRoomDraw/createWinnerDrawCustomerInfo', 
					method:"POST",
					data: {
						winner_draw_record_id:this.prize.winner_draw_record_id,
						phone:this.d_getAddress.phone,
						name:this.d_getAddress.name,
						addr:this.d_getAddress.address
					},
					header: {
						'Authorization': token 
					},
					success: (res) => {
						if(res.data.code === 200){
							if(res.data.data === true){
								this.isAddress = false
								this.isSuccesss = true
								let d_codetime= 2;
								let timer = setInterval(()=>{
									d_codetime--;
									if(d_codetime === 0){
										this.isSuccesss = false
										clearInterval(timer)
									}
								},1000)
							}
						}else{
							uni.showToast({
							    title: res.data.errstr,
								icon:'none'
							});
						}
							
					},
				})	
			},
			getCustomerWinnerDrawRecordList(){//用户中奖信息列表
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/api/liveRoomDraw/getCustomerWinnerDrawRecordList', 
					method:"POST",
					header: {
						'Authorization': token 
					},
					data:{
						live_room_id:this.d_live_room_id
					},
					success: (res) => {
						if(res.data.code === 200){
							this.isDrawRecordList = true
							this.WinningList = res.data.data
							for(let i = 0 ; i < this.WinningList.length; i++){
								this.WinningList[i].winner_draw_time = this.WinningList[i].winner_draw_time.slice(0,10)
								
							}
							// this.winner_draw_time = res.data.data.winner_draw_time.slice(0,9)
							console.log(this.WinningList)
						}else{
							uni.showToast({title: res.data.errstr,icon:'none'});
						}
							
					},
				})	
			},
			async getShopCouponList(){//获取优惠券列表
				let [err,res] = await this.$http.post("/api/coupon/getShopCouponList",{
					page:1,
					page_size:10,
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
				this.couponList = list.slice(0,3)
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
.fenxiangHB_box{
	width:100%;
	height: 100vh;
	background: rgba(0,0,0,.5);
	position: fixed;
	top:0;
	left: 0;
	z-index: 100;
	display: flex;
	justify-content: center;
	// flex-wrap: wrap;
	
	.fenxiangHB{
		margin-top:160upx;
		width:448upx;
		height: 794upx;
		image{
			width:100%;
			height: 100%;
		}
	}
	.fenxiangXZ_box{
		text-align:center;
		width:448upx;
		height: 170upx;
		font-size: 26upx;
		color:#ffffff;
		line-height:26upx;
		image{
			width:80upx;
			height: 80upx;
			margin-top: 40upx;
			margin-bottom: 18upx;
		}
	}
}
	
	
	
.viedoItem{
	width:100vw;
	height: 100vh;
	#aaa{
		width:100vw;
		height: 100vh;
	}
}
.cover{
	width:100%;
	height: 100vh;
	position:absolute;
	top:0;
	left: 0;
	z-index: 1;
	.image{
		width:100%;
		height: 100%;
	}
	.anN{
		position: absolute;
		left: 50%;
		top: 50%;
		margin: -50upx 0 0 -50upx;
		width:100upx;
		height: 100upx;
		z-index: 2;
	}
}
.kkk{
	width:750upx;
	height: 100vh;
	position:fixed;
	top:0;
	left:0;
	z-index: 101;
}
	.shopNumber {
		// min-width: 380upx;
		max-width: 380upx;
		background: #e1dfe0;
		height: 40upx;
		color: #454545;
		line-height: 40upx;
		font-size: 22upx;
		border-radius: 6upx;
		display: flex;
		padding: 0 15upx;
		margin-left:-400upx ;
		opacity:0.1;	
		text{
			color:#fe5655;
			margin-right: 10upx;
		}
		.s_img_box {
			width: 30upx;
			height: 28upx;
			margin-top: 6upx;
			margin-right: 12upx;
	
			image {
				width: 100%;
				height: 100%;
			}
		}
	
	}


	.share-tab-box {
		width: 100%;
		height: 100%;
		padding: 0 20upx;
		background: #ffffff;
	}

	.newheight {
		height: 100upx !important;
		width: 100%;
		background: #53aefc;
		border-bottom-left-radius: 30upx;
		border-bottom-right-radius: 30upx;
		padding: 0 28upx;
		display: flex;
		justify-content: space-around;
	}

	.share-tab {
		width: 100%;
		height: 160upx;
		background: #53aefc;
		border-bottom-left-radius: 30upx;
		border-bottom-right-radius: 30upx;
		padding: 0 28upx;
		display: flex;
		justify-content: space-around;
	}

	.share-tab-item {
		width: 160upx;
		height: 100upx;
	}

	.tab-item-s {
		width: 160upx;
		height: 75upx;
		line-height: 75upx;
		color: #1d5f98;
		font-size: 28upx;
		text-align: center;

		&.active {
			font-weight: 900;
			font-size: 32upx;
			color: #ffffff;
		}
	}

	.tab-item-x {
		&.active {
			margin-left: 42upx;
			width: 76upx;
			height: 16upx;
			background: url(../../static/images/son_0023_top-line.png) no-repeat;
			background-size: 76upx;
		}
	}

	//直播达人

	.myattention {
		width: 100%;
		height: 280upx;
		background: #ffffff;
		padding: 0 20upx;

		.m-top {
			width: 100%;
			height: 70upx;
			font-size: 28upx;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 70upx;
			display: flex;

			.xian {
				display: inline-block;
				border-radius: 10upx;
				width: 6upx;
				height: 32upx;
				background: rgba(251, 67, 91, 1);
				margin-top: 20upx;
				margin-right: 10upx;
			}
		}

		.m-bottom {
			width: 100%;
			height: 180upx;
			background: url(../../static/images/APP-qie9_0000_zhibo03.png) no-repeat;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			padding: 16upx 40upx;

			.m-item {
				width: 92upx;
				height: 100%;
				margin-right: 20upx;

				.whiteBox {
					width: 89upx;
					height: 89upx;
					border: 1px solid #ffffff;
					border-radius: 100%;
					position: relative;
					overflow: hidden;

					.view {
						width: 90upx;
						height: 90upx;
						position: absolute;
						top: 0;
						left: 0;
						background: rgba(0, 0, 0, .5);
						z-index: 1;
						border-radius: 100%;
					}

					.vessel {
						width: 81upx;
						height: 81upx;
						border-radius: 50%;
						background: #007AFF;
						position: absolute;
						left: 0;
						top: 0;
						right: 0;
						bottom: 0;
						margin: auto;
						overflow: hidden;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}

				.m-name {
					width: 92upx;
					height: 56upx;
					font-size: 22upx;
					color: #ffffff;
					text-align: center;

					.d_name {
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.peopleNumber {
						font-size: 16upx;
					}
				}
			}

		}
	}

	.m-recommend {
		width: 100%;
		height: 70upx;
		font-size: 28upx;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 70upx;
		display: flex;
		padding: 0 20upx;

		.xian {
			display: inline-block;
			border-radius: 10upx;
			width: 6upx;
			height: 32upx;
			background: rgba(251, 67, 91, 1);
			margin-top: 20upx;
			margin-right: 10upx;
		}
	}

	.shade {
		width: 100vw;
		height: 100vh;
		background: rgba(255, 255, 255, 0.1);
		// background: #007AFF;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 500;
		padding-top:60upx;
	}

	.addItem {
		width: 80upx;
		height: 80upx;
		position: absolute;
		right: 10upx;
		bottom: 120upx;

		img {
			width: 100%;
			height: 100%;
		}
	}


	.videoItemBox {
		width: 100%;
		height: 100%;
		padding: 0 20upx;
		padding-bottom: 100upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		

		.live {
			width: 100%;
			height: 116upx;
			// background: #C8C7CC;
			padding: 12upx 12upx;

			.live-title {
				width: 100%;
				height: 45upx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 22upx;
				color: #444444;
				position: relative;

				.state {
					width: 100upx;
					height: 52upx;
					background: #1AAD19;
					position: absolute;
					top: 0;
					left: 0;
				}
			}

			.live-name {
				display: flex;
				width: 100%;
				height: 46upx;
				padding-top: 10upx;

				image {
					width: 34upx;
					height: 34upx;
				}

				.img {
					border-radius: 100%;
				}

				view {
					width: 80%;
					font-size: 20upx;
					color: #888888;
					margin: 0 10upx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
	}

	.attention-box {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, .5);
		z-index: 299;
	}

	.attention {
		width: 750upx;
		height: 370upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx 20upx 0px 0px;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 300;
		text-align: center;

		.headerPortrait {
			width: 134upx;
			height: 134upx;
			background: #ffffff;
			border-radius: 100%;
			margin: 0 auto;
			text-align: center;
			margin-top: -65upx;
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 94%;
				height: 94%;
				border-radius: 100%;
			}
		}

		.headerName {
			font-size: 24upx;
			color: #666666;
			line-height: 50upx;
		}

		.total {
			font-size: 18upx;
			color: #888888;
			line-height: 30upx;
		}

		.label {
			font-size: 18upx;
			color: #888888;

			text {
				margin: 0 14upx;
			}
		}

		.Ta {
			margin-top: 60upx;
			font-size: 24upx;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			line-height: 52upx;
		}

		.fansNumber {
			// margin-top: 20upx;
			font-size: 44upx;
			font-weight: 400;
			color: rgba(54, 158, 255, 1);
		}

		.d_attention {
			position: absolute;
			bottom: 44upx;
			right: 40upx;
			width: 176upx;
			height: 52upx;
			background: rgba(242, 242, 242, 1);
			border-radius: 10upx;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			line-height: 52upx;
			font-size: 24upx;

			text {
				font-size: 34upx;
				color: #53AEFC;
				margin-right: 27upx;
			}
		}

		.d_attention1 {
			position: absolute;
			bottom: 44upx;
			right: 40upx;
			width: 176upx;
			height: 52upx;
			background: rgba(242, 242, 242, 1);
			border-radius: 10upx;
			font-weight: 400;
			color: #666666;
			line-height: 52upx;
			font-size: 24upx;
		}
	}
	.notice{
		min-width:400upx;
		max-width:550upx;
		height: 46upx;
		padding-right: 20upx;
		background: #fe5454;
		line-height: 46upx;
		border-radius: 30upx;
		margin-top:20upx;
		margin-left: -600upx;
		font-size: 24upx;
		color:#ffffff;
		display: flex;
		align-items: center;
		image{
			width:40upx;
			height: 40upx;
			margin-left: 4upx;
			margin-right: 10upx;
		}
	}
	// 直播
	.shade-header-box {
		width: 100%;
		height: 90upx;
		// background: #007AFF;
		padding: 10upx 20upx;
		display: flex;
		justify-content: space-between;
	
		.header-message {
			// width:260upx;
			height: 70upx;
			background: rgba(0, 0, 0, .5);
			border-radius: 60upx;
			display: flex;
			justify-content: space-between;
			padding: 6upx;
			image {
				width: 60upx;
				height: 60upx;
				border-radius: 50%;
				// margin: 4upx;
			}
	
			.message-center {
				margin-right: 10upx;
				height: 60upx;
				// background: #1AAD19;
				// padding: 8upx 0 8upx 8upx;
				color: #ffffff;
				font-size: 18upx;
				margin-left: 14upx;
				.ads {
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					width: 100%;
					height: 37upx;
					font-size: 24upx;
					line-height: 37upx;
				}
	
				.fans {
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: 16upx;
				}
	
				margin-right: 14upx;
			}
	
			.message-right {
				width: 100upx;
				height: 46upx;
				background: #ffffff;
				border-radius: 30upx;
				text-align: center;
				line-height: 46upx;
				font-size: 20upx;
				color: #ff5353;
				display: flex;
				justify-content: center;
				font-weight: 600;
				margin: 8upx;
				align-items: center;
				image{
					width:34upx;
					height:24upx;
					margin-right: 8upx;
				}
			}
		}
	
		.header-fans {
			display: flex;
			justify-content: space-between;
	
			.touxiang {
				width: 240upx;
				height: 56upx;
				overflow: hidden;
				display: flex;
	
				.img-box {
					width: 50upx;
					height: 50upx;
					overflow: hidden;
					border-radius: 100% 100%;
					background: #007AFF;
					margin-top: 4upx;
					margin-right: 10upx;
	
					.ads {
						width: 100%;
						height: 37upx;
						font-size: 24upx;
						line-height: 37upx;
					}
	
				}
			}
	
			.fans-number {
				width: 100upx;
				height: 56upx;
				background: rgba($color: #000000, $alpha: 0.3);
				border-radius: 30upx;
				text-align: center;
				line-height: 56upx;
				font-size: 20upx;
				color: #ffffff;
				margin: 0 22upx 0 16upx;
			}
	
			.image {
				width: 26upx;
				height: 26upx;
				line-height: 56upx;
				margin-top: 24upx;
			}
		}
	
	}

	//底部点赞
	.giveALink {
		width: 260upx;
		height: 260upx;
		// background:#007AFF;
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 47upx 20upx 20upx;

		.love-box {
			width: 100%;
			height: 100upx;
			// background: #C0C0C0;
			text-align: right;

			image {
				width: 68upx;
				height: 56upx;
			}

			.love-number {
				margin-left: 145upx;
				width: 76upx;
				text-align: center;
				height: 30upx;
				// background: #1AAD19;
				color: #ffffff;
				font-size: 24upx;
				line-height: 30upx;
			}
		}

		.d-auction-box1 {
			width: 100%;
			height: 60upx;
			// background: #3F536E;
			margin-top: 132upx;
			padding-left: 150upx;

			.d-imgbox1 {
				width: 60upx;
				height: 60upx;
				background: rgba(0, 0, 0, .3);
				border-radius: 100%;
				text-align: center;
				line-height: 60upx;

				image {
					width: 36upx;
					height: 28upx;
				}
			}
		}

		.d-auction-box {
			width: 100%;
			height: 60upx;
			// background: #3F536E;
			margin-top: 36upx;
			display: flex;
			justify-content: space-between;

			view {
				width: 60upx;
				height: 60upx;
				border-radius: 100%;
			}

			.d-auction {
				background: #339efe;
				text-align: center;
				line-height: 60upx;
				color: #ffffff;
				font-size: 20upx;
			}

			.d-imgbox {
				width: 60upx;
				height: 60upx;
				background: rgba(0, 0, 0, .3);
				border-radius: 100%;
				text-align: center;
				line-height: 68upx;

				image {
					width: 40upx;
					height: 36upx;
				}
			}

			.d-imgbox1 {
				width: 60upx;
				height: 60upx;
				background: rgba(0, 0, 0, .3);
				border-radius: 100%;
				text-align: center;
				line-height: 60upx;

				image {
					width: 36upx;
					height: 28upx;
				}
			}
		}
	}

	// 弹幕
	.fordanmu {
		width: 100%;
		padding: 20upx 20upx;
		position: absolute;
		// background:#808080;
		bottom: 0;
		left: 0;
		z-index: 1;

		#smallYelloCar {
			white-space: nowrap;
			position: relative;
			width: 100%;
			height: 150upx;
			background: #ffffff;
			border-radius: 8upx;
			padding: 15upx 10upx;
			margin-top: 20upx;
			overflow: hidden;

			#k-box {
				position: absolute;
				left: 0px;
				height: 120upx;

				#z-box {
					float: left;
					display: flex;
					width: 170px;
					height: 120upx;
					border-right: 1px solid #f4f4f4;
				}
			}

			.z-img-box {
				margin-left: 2px;
				width: 120upx;
				height: 120upx;
				background: #007AFF;
				border-radius: 10upx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.z-shop-box {
				margin-left: 10upx;
				width: 190upx;
				height: 120upx;

				// background: #1AAD19;
				.z-shop-box-top {
					width: 100%;
					height: 50%;
					// background: #2C405A;
					display: flex;
					justify-content: space-between;

					.z-title {
						width: 70%;
						height: 100%;
						// background: #DD524D;
						font-size: 24upx;
						color: rgba(25, 17, 11, 1);
						line-height: 22upx;
						.qwe {
							width: 190upx;
							line-height: 30upx;
							height:30upx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}
						.gg {
							width: 190upx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							font-size: 16upx;
							line-height:24upx;
							color: #888888;
							margin-top: 6upx;
						}
					}
				}

				.z-shop-box-bottom {
					width: 100%;
					height: 50%;
					// background: #555555;
					display: flex;
					justify-content: space-between;

					.z-title-shopcar {
						padding-top: 18upx;
						height: 100%;

						// text-align: left;
						.moneyCar_right {
							width: 46upx;
							height: 46upx;
							border-radius: 100%;
							background: #53affc;
							text-align: center;
							line-height: 46upx;

							image {
								width: 30upx;
								height: 28upx;
							}
						}
					}

					.z-money {
						width: 60%;
						height: 100%;
						// background: #3F536E;
						color: #F49C17;
						font-size: 24upx;
						padding-top: 30upx;
					}

					.z-go {
						width: 40%;
						height: 100%;
						// background: #DD524D;
						padding-top: 20upx;
						padding-left: 30upx;

						.go {
							color: #53AEFC;
							font-size: 24upx;
						}
					}
				}
			}
		}

		.danmu-box {
			width: 350upx;
			height: 280upx;
			// background:red;
			margin-top: 20upx;
			overflow: hidden;
			.danmu-content {
		
				// width:100%;
				// height: 100%;
				.danmu-content-chat:last-child {
					margin-bottom: 30upx;
				}
		
				.danmu-content-chat {
					background: rgba(0, 0, 0, .5);
					border-radius: 6upx;
					padding: 10upx;
					margin-bottom: 10upx;
					padding-left: 16upx;
					.vip {
						width:56upx;
						height: 24upx;
						margin-right: 6upx;
						marign-top:4upx;
					}
				}
		
				font-size: 24upx;
				color: #ffffff;
		
				view {
					color: #fe5552
				}
			}
		
			.scroll-Y {
				height: 300upx;
			}
		}

		.button-box {
			
			// background:#007AFF;
			display:flex;
			margin-top:20upx;
			height:60upx;
			position: relative;
			justify-content: space-between;
			.shop {
				width: 60upx;
				height: 60upx;
				background: rgba(0,0,0,.5);
				// background: #007AFF;
				margin-right:80upx;
				border-radius: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				.redDot{
					width:20upx;
					height: 20upx;
					background: #ff1d1e;
					position:absolute;
					right:0;
					top:0;
					border-radius: 100%;
					font-size: 14upx;
					color: #ffffff;
					text-align: center;
					line-height: 20upx;
				}
				image {
					position: absolute;
					top:-42upx;
					left: -20upx;
					width:160%;
					height:160%;
				}
			}
			.fenxiang {
				width: 60upx;
				height: 60upx;
				position: absolute;
				right: 0;
				border-radius: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				background: rgba(0,0,0,.5);
				image {
					width: 34upx;
					height: 28upx;
				}
			}
			.mengceng{
				position:fixed;
				top:0;
				left:0;
				width:100vw;
				height: 100vh;
				background: rgba(0,0,0,0)
			}
		}

		.danmu-button {
			width: 230upx;
			height: 60upx;
			border-radius: 30upx;
			line-height: 60upx;
			background: #231a1b;
			// background: red;
			.danmu-input1{
				// background: #1AAD19;
				
				height: 60upx;
				line-height: 60upx;
				font-size: 26upx;
				color: #666666;
				padding-left: 30upx;
				-webkit-transform: translate3d(0, 0, 0);
			}
			.danmu_active{
				z-index: 1;
				width:100%;
				height: 80upx;
				background: #ffffff;
				position: fixed;
				bottom:0;
				left: 0;
				display: flex;
				justify-content: space-between;
				padding: 15upx 120upx 15upx 20upx;
					line-height: 60upx;
					font-size: 26upx;
					color: #666666;
					-webkit-transform: translate3d(0, 0, 0);
			}
			.sendDanmu1 {
				z-index: 3;
				position:absolute;
				bottom:-6upx;
				right:0;
				width: 100upx;
				height: 50upx;
				// margin-left: 30upx;
				background: #F49C17;
				border-radius: 30upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26upx;
				color: #F2F2F2;
			}
		}

		.sendDanmu {
			width: 100upx;
			height: 60upx;
			margin-left: 30upx;
			background: #F49C17;
			border-radius: 30upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #F2F2F2;
		}
	}

	.wdlshare .video .video-item-box {
		font-size: 22upx;
		color: #999999;
		text-align: center;
		padding-top: 228upx;
	}

	.wdlshare {
		width: 100%;
		height: 100%;

		.nickname-box {
			.nickname-left {
				.kuang {
					overflow: hidden;
					background: #eeeeee;
					text-align: center;

					image {
						margin-top: 18upx;
						width: 70%;
						height: 70%;
					}
				}
			}

			.nickname-center {
				color: #53affc;
			}
		}
	}
.smallYelloCar1{
  width:70%;
  height: 150upx;
  background: #ffffff;
  border-radius:8upx;
  padding: 15upx 10upx;
  margin-top:20upx;
  display: flex;
  justify-content: space-between;
  .z-img-box{
	  width:120upx;
	  height:120upx;
	  background: #007AFF;
	  border-radius: 10upx;
	  overflow: hidden;
	  image{
		  width:100%;
		  height: 100%;
	  }
  }
  .z-shop-box{
	  width:73%;
	  height:120upx;
	  // background: #1AAD19;
	  .z-shop-box-top{
		  width:100%;
		  height: 50%;
		  // background: #2C405A;
		  display: flex;
		  justify-content: space-between;
		  .z-title{
			  width:70%;
			  height: 100%;
			  // background: #DD524D;
			  font-size:24upx;
			  color:rgba(25,17,11,1);
			  line-height:22upx;
			  padding-top:12upx;
			  .qwe{
				  line-height: 30upx;
				  white-space: nowrap;
				  text-overflow: ellipsis;
				  overflow: hidden;
			  }
			  .gg{
				 font-size:16upx;
				 color: #888888;
				 margin-top:6upx;
			  }
		  }
		  .z-title-shopcar{
			  width:30%;
			  height: 100%;
			  // text-align: left;
			  .moneyCar_right{
				width:46upx;
				height: 46upx;
				border-radius: 100%;
				background:#53affc;
				text-align: center;
				line-height: 46upx;
				margin-top:12upx;
				image{
					width:30upx;
					height: 28upx;
				}
			  }
		  }
	  }
	  .z-shop-box-bottom{
		  width:100%;
		  height: 50%;
		  // background: #555555;
		  display: flex;
		  justify-content:space-between;
		  .z-money{
			  width:60%;
			  height: 100%;
			  // background: #3F536E;
			  color:#F49C17;
			  font-size: 24upx;
			  padding-top:24upx;
		  }
		  .z-go{
			  width:40%;
			  height: 100%;
			  // background: #DD524D;
			   padding-top:20upx;
			   padding-left: 30upx;
			  .go{
				color:#53AEFC;
				font-size:24upx;
			  }
		  }
	  }
  }
}
// 主推
.MainProducts_box{
	width:100%;
	height: 510upx;
	// background: #007AFF;
	margin-top:20upx;
	padding:0 20upx;
	.MainProducts{
		width:120upx;
		// height: 300upx;
		background: rgba(0,0,0,.5);
		border-radius:10upx;
		text-align: center;
		display: flex;
		justify-content: center;
		flex-wrap:wrap;
		padding-top:6upx;
		.MainProducts_item{
			width:110upx;
			height: 110upx;
			overflow: hidden;
			border-radius: 6upx;
			// margin-top:6upx;
			margin-bottom:6upx;
			position: relative;
			image{
				width:100%;
				height: 100%;
			}
			.MainProducts_item_money{
				// width:66upx;
				padding:0 4upx;
				height: 28upx;
				position: absolute;
				background: rgba(0,0,0,.5);
				// background: #007AFF;
				border-top-right-radius:10upx ;
				bottom:0;
				left:0;
				z-index: 1;
				font-size: 18upx;
				color: #ffffff;
				line-height: 28upx;
				font-weight: 600;
			}
		}
		
	}
}
//飘在商品列表上面的
	.SingleListItem_box {
		position: absolute;
		right: 20upx;
		bottom: 105upx;
		opacity: 0;
		width: 280upx;
		height: 110upx;

		.SingleListItem {
			width: 280upx;
			height: 100upx;
			background: #ffffff;
			border-radius: 8upx;
			padding: 10upx;
			display: flex;
			justify-content: space-between;

			.SingleListItem_img {
				width: 78upx;
				height: 78upx;
				border-radius: 8upx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.SingleListItem_message {
				width: 168upx;
				height: 78upx;

				.SingleListItem_message_title {
					width: 100%;
					line-height: 42upx;
					color: #1a110c;
					font-size:26upx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.SingleListItem_message_money {
					color: #f19d19;
					font-size:22upx;
				}
			}
		}

		.dsj {
			position: absolute;
			right: 96upx;
			width: 0;
			height: 0;
			border-left: 18upx solid transparent;
			border-right: 18upx solid transparent;
			border-top: 20upx solid #ffffff;
		}

	}
// 商品列表
.liveProductList_box{
	width:100%;
	height: 100vh;
	background:rgba(0,0,0,.1);
	position:fixed;
	top:0;
	left: 0;
	.liveProductList{
		width:100%;
		height: 625upx;
		// background: #1AAD19;
		position:absolute;
		bottom:0;
		padding:0 20upx;
	}
	.liveProductList_top{
		// background: #007AFF;
		padding-left:30upx;
		width:100%;
		height: 44upx;
		line-height: 20upx;
		color:#ffffff;
		font-size:24upx;
		
	}
	.liveProductList_bottom{
		width:100%;
		height: 580upx;
		background: #ffffff;
		border-top-right-radius: 16upx;
		border-top-left-radius: 16upx;
		padding:0 20upx;
		.liveProductList_bottom_item{
			width:100%;
			height: 179upx;
			// background-color: #007AFF;
			border-bottom: 2upx solid #eeeeee;
			padding: 20upx 0;
			display: flex;
			justify-content:space-between;
			.item_headUrling{
				width:140upx;
				height: 140upx;
				border-radius: 10upx;
				// background-color: #DD524D;
				overflow: hidden;
				image{
					width:100%;
					height: 100%;
				}
			}
			.item_message{
				width:508upx;
				height: 140upx;
				// background: #F0AD4E;
				.item_message_title{
					width:100%;
					height: 40upx;
					// background: #1AAD19;
					font-size: 30upx;
					line-height: 40upx;
					color:#444444;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				.item_message_onsale{
					height: 48upx;
					font-size: 22upx;
					color:#ff5553;
				}
				.item_message_money{
					width:100%;
					height: 50upx;
					line-height: 50upx;
					display: flex;
					justify-content: space-between;
					// background: #E5E5E5;
					align-items: center;
					.d_money{
						font-size: 24upx;
						color:#f49c17;
						font-weight: 600;
					}
					.d_shop_car{
						width:46upx;
						height: 46upx;
						background: #fe5454;
						border-radius: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						image{
							width:30upx;
							height: 28upx;
						}
					}
				}
			}
		}
	}
}
.d_scroll-Y{
	height: 625upx;
}
// 轮盘抽奖
.drawALotteryOrRaffle{
	width:130upx;
	height: 130upx;
	position: absolute;
	top:170upx;
	right:20upx;
	text-align: center;
	image{
		width:128upx;
		height: 128upx;
	}
}
.drawALotteryOrRaffle1{
	width:130upx;
	height: 130upx;
	position: absolute;
	top:310upx;
	right:20upx;
	text-align: center;
	// background: #007AFF;
	image{
		width:130upx;
		height: 90upx;
	}
}
// 背景透明黑 手机号注册
.phoneRegistered_box{
	width:100vw;
	height: 100vh;
	position: fixed;
	top:0;
	left: 0;
	background:rgba(0,0,0,.5);
	// background: #007AFF;
	z-index: 10;
	padding-left: 40upx;
	display: flex;
	justify-content: center;
	align-items: center;
	.phoneRegistered{
		width:500upx;
		height: 428upx;
		.img_box{
			width: 100%;
			text-align: right;
			image{
				margin-right: 0;
				width:36upx;
				height: 36upx;
				text-align: right;
			}
		}
		.phoneRegistered_bj{
			width:460upx;
			height: 340upx;
			background: #FFFFFF;
			border-radius: 20upx;
			padding: 0 25upx;
			.phoneRegistered_bj_phone_title{
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				border-bottom: 2px solid #f0f0f0;
				font-size: 28upx;
				
			}
			.phoneRegistered_bj_phone{
				height: 80upx;
				// line-height: 80upx;
				border-bottom: 2px solid #f0f0f0;
				font-size: 28upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				input{
					margin-left: 20upx;
				}
				view{
					width:156upx;
					height: 42upx;
					background: #e2f2ff;
					border:2px solid #86c4ff;
					border-radius: 30upx;
					font-size: 20upx;
					color: #9a9a9c;
					text-align: center;
				}
			}
			.phoneRegistered_bj_code{
				height: 80upx;
				line-height: 80upx;
				border-bottom: 2px solid #f0f0f0;
				font-size: 28upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				input{
					margin-left: 20upx;
				}
			}
			.phoneRegistered_bj_submit{
				width:363upx;
				height: 76upx;
				line-height: 76upx;
				background: #ff6702;
				border-radius: 50upx;
				text-align: center;
				margin:0 auto;
				margin-top:50upx;
				font-size: 30upx;
				color:#ffffff;
				font-weight: 700;
				letter-spacing:8upx;
			}
		}
	}
}
// 转盘抽奖
.turntable{
	width:100vw;
	height: 100vh;
	position: fixed;
	top:0;
	left: 0;
	background:rgba(0,0,0,.5);
	z-index: 10;
	.turntable_bj{
		width: 560upx;
		height: 890upx;
		// background: #007AFF;
		margin:0 auto;
		margin-top:146upx;
		position: relative;
		.turntable_bj_img_box{
			width:100%;
			height: 62upx;
			// background: #1AAD19;
			text-align: right;
			image{
				width:36upx;
				height: 36upx;
			}
		}
		.turntable_record{
			position: absolute;
			bottom:40upx;
			left: 190upx;
			width:200upx;
			height: 56upx;
			background-image: linear-gradient(to right, #b99273,#e1b284,#b99273);
			text-align: center;
			line-height: 56upx;
			font-size: 32upx;
			color:#ffffff;
			font-weight: 700;
			border-radius: 40upx;
			letter-spacing:2upx;
			z-index: 10;
		}
	}
	.turntable_bj_title{
		width:270upx;
		height: 60upx;
		// background: #ED373D;
		background-image: linear-gradient(#c39772, #b98556);
		border-radius: 30upx;
		text-align: center;
		line-height: 60upx;
		font-size: 38upx;
		color:#ffffff;
		font-weight: 700;
		letter-spacing:6upx;
		margin:0 auto;
	}
	.turntable_bj_title1{
		text-align: center;
		line-height: 56upx;
		height: 56upx;
		font-size: 24upx;
		margin:0 auto;
		color:#ffffff;
	}
}
//转盘
    .icon-awrad {
        font-size: 50upx !important;
    }

    .conbox {
        width: 750upx;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .container,
    image.cont {
        width: 750upx;
        min-height: 100vh;
        height: auto;
        position: relative;
    }

    image.cont {
        height: 100%;
        position: absolute;
        z-index: 0;
    }

    image.caidai {
        position: absolute;
        top: 0;
        left: 0;
        width: 750upx;
        height: 1024upx;
    }


    .header-title>view {
        padding: 8upx 16upx;
        border: 1px solid #d89720;
        color: #d89720;
        font-size: 28upx;
        border-radius: 26upx;
    }

    /* 转盘 */
    .canvas-container {
        margin: 0 auto;
        position: relative;
        width: 546upx;
        height: 546upx;
        background: url(../../static/images/APP-qie15_0001_转盘.png) no-repeat;
        background-size: cover;
        border-radius: 50%;
    }


    .canvas-content {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        display: block;
        width: 546upx;
        height: 546upx;
        border-radius: inherit;
        /* background-clip: padding-box; */
        /* background-color: #ffcb3f; */
    }

    .canvas-list {
        position: absolute;
        left: 0;
        top: 0;
        width: inherit;
        height: inherit;
        z-index: 9999;
    }

    .canvas-item {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        color: #e4370e;
        /* text-shadow: 0 1upx 1upx rgba(255, 255, 255, 0.6); */
    }

    .canvas-item-text {
        position: relative;
        display: block;
        padding-top: 26upx;
        margin: 0 auto;
        text-align: center;
        -webkit-transform-origin: 50% 300upx;
        transform-origin: 50% 300upx;
        display: flex;
        flex-direction: column;
        align-items: center;
        // color: #FB778B;
    }

    .canvas-item-text img {
        width:188upx;
        height: 250upx;
    }

    /* 分隔线 */
   .canvas-line {
        position: absolute;
        left: 0;
        top: 0;
        width: inherit;
        height: inherit;
        z-index: 99;
    }

    .canvas-litem {
       position: absolute;
        left: 273upx;
        top: 0;
        width: 3upx;
        height:273upx;
        background-color: rgba(228, 55, 14, 0.4);
        overflow: hidden;
        -webkit-transform-origin: 50% 273upx;
        transform-origin: 50% 273upx;
    }

    /**
* 抽奖按钮
*/
    .canvas-btn {
        position: absolute;
        left: 215upx;
        top: 222upx;
        z-index: 400;
        width: 110upx;
        height: 110upx;
        border-radius: 50%;
        /* color: #f4e9cc;
        background-color: #e44025; */
		background: url(../../static/images/anniu11.png) no-repeat;
		background-size: 110upx 110upx;
        line-height: 80upx;
        text-align: center;
        font-size: 26upx;
        /* text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.6); */
        box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.6);
        /* text-decoration: none; */
    }

    .canvas-btn::after {
/*        position: absolute;
        display: block;
        content: ' ';
        left: 0upx;
        top: 0upx;
        width:185upx;
        height: 243upx;
		 background: #D89720; 
		background: url(./img/kuang.png) no-repeat;
		
		border:1px solid #D89720; */
	}
    .canvas-btn.disabled {
       pointer-events: none;
      /*  background: #b07a7b;
        color: #ccc; */
    }

    .canvas-btn .disabled::after {
        border-bottom-color: #b07a7b;
    }
	// .canvas-container
	 .kuang1{
		transform:rotate(2.0deg);
		width:192upx;
		height: 255upx;
		/* background: #E4370E; */
		position: absolute;
		left: 178upx;
		top: 266upx;
		// background:url(../../static/images/sda.png) no-repeat;
		// background-size: 100%;
	}
	.kuang1 .qweqe{
		width:100%;
		height: 100%;
	}


    .typecheckbox view {
        border: 1px solid #FF3637;
        background: transparent;
        color: #FF3637;
        display: flex;
        height: 60upx;
        width: 140upx;
        border-radius: 50upx;
        align-items: center;
        justify-content: center;
        display: flex;
        margin-left: 20upx;
    }
	.wosli{
		width: 546upx;
		height: 546upx;
		background: url(../../static/images/kuang_box.png) no-repeat;
		background-size: 546upx 546upx;
		image{
			width: 546upx;
			height: 546upx;
		}
		 margin: 0 auto;
		 position:absolute;
		 z-index:99;
		 top:196upx;
		 left:8upx;
	}
	// 中奖
.winPrizeInlottery_box{
	width:100vw;
	height: 100vh;
	position: fixed;
	top:0;
	left: 0;
	background:rgba(0,0,0,.5);
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
	.winPrizeInlottery{
		width:390upx;
		height: 446upx;
		display: flex;
		margin-left: 70upx;
		justify-content: space-between;
		.first{
			width:340upx;
			height: 446upx;
			background:url(../../static/images/APP-qie14_0004_恭喜您___di.png) no-repeat;
			background-size: 340upx;
			text-align: center;
			.winPrizeInlottery_title{
				width:100%;
				height: 114upx;
				margin-top:212upx;
				text-align: center;
				font-size: 26upx;
				color: #f14c4a;
				line-height: 114upx;
			}
			.winPrizeInlottery_LQ{
				width:220upx;
				height: 72upx;
				background: #f34b4b;
				margin: 0 auto;
				line-height:72upx;
				border-radius: 50upx;
				box-shadow: 0px 8upx 0px #fecbca;
				font-size: 30upx;
				color:#ffffff;
			}
		}
		view:last-child{
			image{
				width:36upx;
				height:36upx;
			}
		}
	}
}
// 收货地址
.shippingAddress_box{
	width:100vw;
	height: 100vh;
	position: fixed;
	top:0;
	left: 0;
	background:rgba(0,0,0,.5);
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
	.shippingAddress{
		width: 500upx;
		height: 598upx;
		// background: #007AFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-left: 40upx;
		.shippingAddress_title{
			width:460upx;
			height: 598upx;
			// background: #1AAD19;
			.shippingAddress_content{
				width:460upx;
				height: 500upx;
				background: #ffffff;
				border-radius: 20upx;
				margin-top:60upx;
				padding: 0 26upx;
				.shippingAddress_content_name{
					width:100%;
					height: 80upx;
					border-bottom:4upx solid #f0f0f0;
					text-align: center;
					line-height: 80upx;
					font-size: 30upx;
					
				}
				input{
					width:100%;
					height: 62upx;
					background-color: #f6f6f6;
					// border: 1upx solid #efddc9;
					border-radius: 10upx;
					padding:0 14upx;
					margin-bottom:20upx;
					font-size: 24upx;
				}
				.input_name{
					margin-top:30upx;
				}
				.input_address{
					border-radius: 10upx;
					text-align: left;
					width:100%;
					background-color: #f6f6f6;
					height: 124upx;
					font-size: 24upx;
					padding: 16upx 14upx;
				}
				.input_submit{
					width:363upx;
					height: 76upx;
					line-height: 76upx;
					text-align: center;
					font-size: 32upx;
					color:#ffffff;
					border-radius: 60upx;
					margin:0 auto;
					background-image: linear-gradient(to right,#fe6905, #feac00);
					margin-top:50upx;
					font-weight: 700;
					letter-spacing:14upx;
				}
			}
		}
		.shippingAddress_img{
			width:40upx;
			height: 100%;
			image{
				width:36upx;
				height: 36upx;
			}
		}
	}
}
// 成功提示

.SuccessfulTip_box{
	width:100vw;
	height: 100vh;
	position: fixed;
	top:0;
	left: 0;
	background:rgba(0,0,0,.5);
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
	view{
		width:204upx;
		height: 204upx;
		image{
			width:100%;
			height: 100%;
		}
	}
}

// 中奖纪录
.record_box{
	width:100vw;
	height: 100vh;
	position: fixed;
	top:0;
	left: 0;
	background:rgba(0,0,0,.5);
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
	.record{
		width:488upx;
		height: 640upx;
		background: url(../../static/images/APP-qie17_0004_记录-di.png) no-repeat;
		background-size: 488upx 640upx;
		padding:0 30upx;
		margin-top:-80upx;
		.record_title{
			width:100%;
			height: 60upx;
			// background: #007AFF;
			margin-top:28upx;
			padding:0 150upx;
			text-align: center;
			view:first-child{
				font-size: 24upx;
				font-weight: 900;
				text-align: center;
				line-height: 30upx;
				padding-top:14upx;
				letter-spacing:6upx
			}
			view:last-child{
				width:100%;
				height: 6upx;
				text-align: center;
				background: #ffd42d;
				text{
					width:80upx;
					height: 6upx;
					background: #ffd42d;
					
				}
				
				
			}
		}
		.scroll-Y{
			height: 390upx;
		}
		.record_content{
			width:100%;
			height:390upx;
			// background: #1AAD19;
			padding:0 8upx;
			.record_content_shell{
				width:100%;
				height: 50upx;
				margin-bottom: 6upx;
				background: #fff2e9;
				display: flex;
				line-height: 50upx;
				padding: 0 6upx;
				align-items: center;
				image{
					width:28upx;
					height: 24upx;
					margin-right: 10upx;
				}
				view{
					font-size: 24upx;
					text{
						color:#ed8001;
						margin-left: 4upx;
					}
				}
			}
		}
		.record_submit{
			width:200upx;
			height: 70upx;
			background: #ffd52b;
			border-radius: 50upx;
			text-align: center;
			line-height: 74upx;
			font-size: 24upx;
			margin:0 auto;
			margin-top:32upx;
		}
	}
}

//优惠券
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
</style>
