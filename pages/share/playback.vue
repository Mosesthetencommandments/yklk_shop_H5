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
					:src="item.playURL"
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
					<view class="shopNumber" id="adf" :animation="animationData" v-if="isShoss">
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
									{{item.item.goods_name}}
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
							<input 
							type="text" 
							v-model="danmuValue" 
							class="danmu-input1" 
							placeholder="跟主播互动~" 
							@blur="_ipt_blur" 
							@focus="PopInput" 
							:class="isPopp === true ? 'danmu_active' : ''" />
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
						<view class="fenxiang" @click="goLiveToShare(item)">
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
											{{item.goods_title}}
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
						<image :src="item.anchor_head_img" mode=""></image>
						<view class="message-center">
							<view class="ads">{{item.anchor_nickname}}</view>
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
							<image :src="item.anchor_head_img" mode=""></image>
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
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		onLoad(option) {
			clearTimeout(this.test1);
			clearTimeout(this.test2);
			clearTimeout(this.test3);
			clearTimeout(this.test4);
			clearTimeout(this.test5);
			clearTimeout(this.test6);
			clearTimeout(this.GoodsListTime);
			clearTimeout(this.live_noticeTime);
			console.log(option)
			this.video_id = option.video_id
			
			this.d_detail()
			this.item.is_full = false
			
			this.getCumstomerInfo()
			
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
				video_id:null,
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
				animationData: {},
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
				Img:null
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
							if (this.listHeight > (res[1].height - 28)) {
								this.scrollTopS = this.listHeight - res[1].height
							}
						}, 10)
					})
				})
			},
			PopInput(){
				this.isPopp = true
			},
			shoeod(){
				
				this.isPop = true
			},
			goLiveToShare(item){
				this.isFXHB = true
				// uni.navigateTo({
				// 	url:'/pages/share/PlaybackShare?video_id=' + item.video_id
				// })
			},
			async shareShopCouponCode(){
				let [err,res] = await this.$http.post("/api/coupon/shareShopCouponCode",{
					shop_coupon_url: config.webUrl1+'/#/pages/QRcode/QRcode',
					type:5,
					video_id:this.video_id
				});
				if(res.data.code === 200){
					this.Img = res.data.data
				}
			},
			gosssss(item){
				console.log(this.item.look_count)
				console.log(item)
				this.Hanzi()
				// window.history.pushState(null,null,'#/pages/share/shareLive?id=1');
				console.log(item)
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
					
				}
			},
			d_detail(){//单个直播
				const token = uni.getStorageSync('token')				uni.request({				    url: config.webUrl2 + '/vod/getVideoVodInfo', 					method:"POST",				    data: {				        video_id:this.video_id,						type:'one',				    },				    header: {				        'Authorization': token 				    },				    success: (res) => {						if(res.data.code === 200){							let list = res.data.data
							console.log(list)							const tempItem = {}							tempItem.id = list.lr_id							tempItem.room_img=list.room_img							tempItem.look_count=list.look_count							tempItem.title=list.room_title							tempItem.playURL=list.playURL							tempItem.anchor_head_img=list.anchor_head_img							tempItem.anchor_nickname=list.anchor_nickname							tempItem.follow_count=this.numberFormat(list.follow_count)							tempItem.look_count=list.look_count
							tempItem.video_id = list.video_id							this.item = Object.assign({}, tempItem)						}							    },								})	
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
				// this.is_open_socket = true
				// this.ListeningToArray()
				if(this.danmuValue === ''){
					uni.showToast({title: '请输入内容',icon:'none'});
					return
				}
				let danmuValue = this.danmuValue
				this.sendSocketMessage('barrage_connect',{msg:danmuValue})
				this.danmuValue = ""				
			},
			ListeningToArray(){
				if(this.danmuList.length >100){
					this.danmuList.splice(0,1)
				}
			},
			ListeningToHeadList() {
				if (this.headList.length > 4) {
					this.headList.splice(0, 1)
				}
			},
			_ipt_blur() {
				uni.pageScrollTo({
					scrollTop: this.scrollTopPX,
					duration: 0
				});
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
					// console.log(jsonData)
					const data = JSON.parse(jsonData);
					console.log(data)
					if(data.code === 10001){
						this.cantSay = true
						return 
					}
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
						console.log(this.isNewGoods)
						this.isNewGoods = false
						console.log(this.isNewGoods)
						this.newGg = []
						let list = data.data.goods_list
						this.newGg=list
						this.d_newGoods = []
						for(let i = 0 ; i < this.newGg.length; i++){
							this.d_newGoods.push({
								id:this.newGg[i].shop_goods_common.id,
								species_values:this.newGg[i].shop_goods_common.species_values,
								actual_price:this.newGg[i].actual_price,
								image_thumb:this.newGg[i].image_thumb,
								goods_title:this.newGg[i].shop_goods_common.goods_title
							})
						}
						console.log(this.d_newGoods)
						
					}
				});
			
			},
			sendSocketMessage(type,data) {//封装发送
				console.log(this.is_open_socket)
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
				this.abc = false
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
			console.log(this.d_live_room_id)
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/liveRoom/follow',
					method: "POST",
					data: {
						customer_id: this.customer_id, //客户id
						lr_id: this.item.id, //直播间id
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
				console.log(this.d_live_room_id)
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/liveRoom/follow',
					method: "POST",
					data: {
						customer_id: this.customer_id, //客户id
						lr_id: this.item.id, //直播间id
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
				  this.animationData = animation.export() 
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
							
							for(let i = 0; i < list.length;i++){
								this.LiveRoomGoodsList.push({
									id:list[i].shop_goods.shop_goods_common.id,
									goods_title:list[i].shop_goods.shop_goods_common.goods_title,
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
							console.log(res.data)
							if (res.data.data !== '' && res.data.data !== null && res.data.data !== undefined) {
								console.log(111111111)
								this.announcement = res.data.data
								this.isNotice = true
							} else {
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
	width:100vw;
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
	height:100vh;
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
			padding-top:40upx;
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
				height: 280upx;
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
		width:100upx;
		// height: 300upx;
		background: rgba(0,0,0,.5);
		border-radius:10upx;
		text-align: center;
		display: flex;
		justify-content: center;
		flex-wrap:wrap;
		padding-top:6upx;
		.MainProducts_item{
			width:90upx;
			height: 90upx;
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
				height: 22upx;
				position: absolute;
				background: rgba(0,0,0,.5);
				// background: #007AFF;
				border-top-right-radius:8upx ;
				bottom:0;
				left:0;
				z-index: 1;
				font-size: 12upx;
				color: #ffffff;
				line-height: 22upx;
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
					font-size: 22upx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.SingleListItem_message_money {
					color: #f19d19;
					font-size: 18upx;
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
</style>
