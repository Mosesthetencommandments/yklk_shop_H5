<template>
	<view>
		<!-- #ifdef H5-->
		<view class="share" v-if="isSShow">
			<!-- 选项卡 -->
			<view class="share-tab-box">
				<view class="share-tab" :class="(this.titleIndex!=2?'newheight':'')">
					<view class="share-tab-item" v-for="(item,index) in titles" :key="index">
						<view class="tab-item-s" :class="{'active':titleIndex==index}" @click="adb(item)">
							{{item.title}}
						</view>
						<view class="tab-item-x" :class="{'active':titleIndex==index}">
							<img src="" alt="">
						</view>
					</view>
				</view>
			</view>

			<!-- 直播达人 -->
			<view v-if="this.titleIndex==0">
				<!-- 可控制编译线上线下 -->
				<view v-if="isSSS">

					<view class="myattention" v-if="isGZ">
						<view class="m-top">
							<view class="xian"></view>
							<view>我的关注</view>
						</view>
						<view class="m-bottom">
							<view class="m-item" v-for="(items,index) in status_arr" :key="items.id">
								<view class="whiteBox">
									<view class="view" v-if="items.status == 0"></view>
									<view class="vessel">
										<image :src="items.anchor_img" mode=""></image>
									</view>
								</view>
								<view class="m-name">
									<view class="d_name">{{items.anchor_nickname}}</view>
									<view class="peopleNumber" v-if="items.status == 0">正在休息</view>
									<view class="peopleNumber" v-else>{{items.look_count}}人观看</view>
								</view>
							</view>
							<view class="m-item" v-for="(items,index) in status_arr1" :key="items.id">
								<view class="whiteBox">
									<view class="view" v-if="items.status == 0"></view>
									<view class="vessel">
										<image :src="items.anchor_img" mode=""></image>
									</view>
								</view>
								<view class="m-name">
									<view class="d_name">{{items.anchor_nickname}}</view>
									<view class="peopleNumber" v-if="items.status == 0">正在休息</view>
									<view class="peopleNumber" v-else>{{items.look_count}}人观看</view>
								</view>
							</view>
						</view>
					</view>
					<view class="m-recommend">
						<view class="xian"></view>
						<view>为您推荐</view>
					</view>
					<view class="videoItemBox">
						<view class="viedoItem" v-for="(item,index) in d_videoList1" :key="item.id">
							<view class="viedo">
								
								<view 
								v-if="item.status === 0 ? isVideo=false : isVideo=true" 
								:id="'aaa' + item.id" 
								@click="gosssss(item)" 
								>
									<!-- 遮罩层 -->
									<view class="cover" v-if="item.is_full !== true">
										<view class="blankScreen" @click.stop="noLive(item)" v-if="item.status === 0"></view>
										<image :src="item.room_img" mode=""></image>
										<view class="viedo-status" v-if="item.status === 1">
											<view class="viedo-status-left">
												<view></view>
												直播中
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="live" v-if="item.is_full !== true">
								<view class="live-title">{{item.title}}</view>
								<view class="live-name">
									<image class="img" :src="item.head_img" mode=""></image>
									<view>{{item.nickname}}</view>
									<image class="sli" @click="FX(item)" src="../../static/images/APP-qie12_0000_分享.png" mode=""></image>
								</view>
							</view>
							<!-- 分享选择 -->
							<view class="ShareOption_box" v-if="isShareOption" @click.stop="isShareOption = false">
								<view class="ShareOption">
									<view class="ShareOption_top">					
										<view 
											class="d_left" 
											@click.stop="wi(FXid)"
											v-clipboard:copy="copyText"    
											v-clipboard:success="onCopy" >
											<image src="../../static/images/APP-qie13_0001_生成海报.png" mode=""></image>
											<view>
												生成链接发送
											</view>
											<input class="optionInput" type="text" :value="copyText">
										</view>
										<view class="d_right" @click.stop="goLiveToShare(FXid)">
											<image src="../../static/images/APP-qie13_0000_生成链接.png" mode=""></image>
											<view class="">
												生成海报分享
											</view>
										</view>
									</view>
									<view class="ShareOption_bottom" @click.stop="isShareOption = false">
										取消
									</view>
								</view>
							</view>
					
							
						</view>

						<view class="viedoItem" v-for="(item,index) in d_videoList2" :key="item.id">
							<view class="viedo">
								<view class="cover" v-if="item.status === 0">
									<view class="blankScreen" @click.stop="noLive(item)" v-if="item.status === 0"></view>
									<view v-if="item.status === 0" class="d_mc"></view>
									<image :src="item.room_img" mode=""></image>
									<view class="nextNotice_box">
										<view class="nextNotice">
											<image src="../../static/images/APP-qie13_0011_广播(1).png" mode=""></image>
											<marquee scrollamount=10><text class="viewss">
													下次开播时间
													<text class="noticeTime">
														{{item.next_live_time}}
													</text>
												</text>
											</marquee>

										</view>
									</view>
									<view class="viedo-status1" v-if="item.status === 0">
										<view class="viedo-status-left">
											<view></view>
											休息中
										</view>
									</view>
								</view>
							</view>
							<view class="live" v-if="item.is_full !== true">
								<view class="live-title">{{item.title}}</view>
								<view class="live-name">
									<image class="img" :src="item.head_img" mode=""></image>
									<view>{{item.nickname}}</view>
									<image class="sli" @click="FX(item)" src="../../static/images/APP-qie12_0000_分享.png" mode=""></image>
								</view>
							</view>
							<!-- 分享选择 -->
							<view class="ShareOption_box" v-if="isShareOption" @click.stop="isShareOption = false">
								<view class="ShareOption">
									<view class="ShareOption_top">					
										<view 
											class="d_left" 
											@click.stop="wi(FXid)"
											v-clipboard:copy="copyText"    
											v-clipboard:success="onCopy" >
											<image src="../../static/images/APP-qie13_0001_生成海报.png" mode=""></image>
											<view>
												生成链接发送
											</view>
											<input class="optionInput" type="text" :value="copyText">
										</view>
										<view class="d_right" @click.stop="goLiveToShare(FXid)">
											<image src="../../static/images/APP-qie13_0000_生成链接.png" mode=""></image>
											<view class="">
												生成海报分享
											</view>
										</view>
									</view>
									<view class="ShareOption_bottom" @click.stop="isShareOption = false">
										取消
									</view>
								</view>
							</view>
						</view>
						
					</view>
					
					<view class="videoItemBox">
						<!-- 回放 -->
						<view class="viedoItem" v-for="(item,index) in d_getVideoList" :key="index">
							<view class="viedo">
								<view class="cover" >
									<view class="blankScreen" @click.stop="goPlayBack(item)" ></view>
									<view  class="d_mc"></view>
									<image :src="item.room_img" mode=""></image>
										
									<view class="viedo-status2" >
										<view class="viedo-status-left">
											<view></view>
											点击回放直播
										</view>
									</view>
								</view>
							</view>
							<view class="live" v-if="item.is_full !== true">
								<view class="live-title">{{item.room_title}}</view>
								<view class="live-name">
									<image class="img" :src="item.head_img" mode=""></image>
									<view>{{item.room_nickname}}</view>
									<image class="sli" @click="PlaybackVideoSharing(item)" src="../../static/images/APP-qie12_0000_分享.png" mode=""></image>
								</view>
							</view>
							<!-- 分享选择 -->
							<view class="ShareOption_box" v-if="isShareOption1" @click.stop="isShareOption1 = false">
								<view class="ShareOption">
									<view class="ShareOption_top">					
										<view 
											class="d_left" 
											@click.stop="PlaybackVideo(HFid)"
											v-clipboard:copy="copyText1"    
											v-clipboard:success="onCopy1" >
											<image src="../../static/images/APP-qie13_0001_生成海报.png" mode=""></image>
											<view>
												生成链接发送
											</view>
											<input class="optionInput" type="text" :value="copyText1">
										</view>
										<view class="d_right" @click.stop="goPlayBackShare(HFid)">
											<image src="../../static/images/APP-qie13_0000_生成链接.png" mode=""></image>
											<view class="">
												生成海报分享
											</view>
										</view>
									</view>
									<view class="ShareOption_bottom" @click.stop="isShareOption = false">
										取消
									</view>
								</view>
							</view>
						</view>
						<!-- 回放结束 -->
					</view>
					
				</view>
			</view>
		</view>
		<tabbarItem v-if="abc !== true"></tabbarItem>
		<!-- #endif -->
	</view>
</template>

<script>
	import tabbarItem from "../../components/tabbarItem/tabbar.vue"
	import config from '../../common/config.js';
	export default {
		components: {
			tabbarItem
		},
		onPullDownRefresh() { //下拉刷新
			this.getCumstomerInfo()
			this.videoList()
		},
		onPageScroll(res) {
			this.scrollTopPX = res.scrollTop;
		},
		onLoad() {
			this.getCumstomerInfo()
			// this._ipt_blur()
			this.getVideoList() //回放视频
			clearTimeout(this.test1);
			clearTimeout(this.test2);
			clearTimeout(this.test3);
			clearTimeout(this.test4);
			clearTimeout(this.test5);
			clearTimeout(this.test6);
			clearTimeout(this.GoodsListTime);
			clearTimeout(this.live_noticeTime);
			this.videoList()
			// this.d_nextTimeNotics()
			// window.addEventListener("popstate", () => {
			// 	// console.log(location.hash)
			// 	if (location.hash === "#/pages/share/shareLive") {
			// 		uni.redirectTo({
			// 			url: '/pages/share/live'
			// 		});
			// 		// this.videoContext.pause()
			// 		// this.is_open_socket = false
			// 		// for (const item of this.d_videoList) {
			// 		// 	item.is_full = undefined
			// 		// }
			// 	}
			// }, false)

		},
		data() {
			return {
				isShareOption:false,
				copyText:null,
				copyText1:null,
				isNotice: false,
				isliveGoodsList: false,
				isMh: true,
				isNewGoods: true,
				isPopp: false,
				showPopupBottom: false,
				focus: true,
				isPop: false,
				isShoss: true,
				isGZ: false,
				isVideo: true,
				isSSSS: false,
				isFollow: true,
				isAttention: false,
				videoContext: null,
				preload: 'auto',
				controls: false,
				playsinline: true,
				isSShow: true,
				openid: '',
				titleIndex: 0,
				name: '',
				user_headimgurl: "",
				isSSS: true,
				isSingle: true,
				titles: [{
						id: 0,
						title: "直播达人"
					},
					{
						id: 1,
						title: "精选素材"
					},
					{
						id: 2,
						title: "种草赚拍"
					}
				],
				abc: false,
				danmuList: [],
				danmuValue: '',
				token: null,
				//websocket
				socketTask: null,
				// 确保websocket是打开状态
				is_open_socket: false,
				userinfo: {},
				d_videoList: [],
				d_videoList1: [],
				d_videoList2: [],
				viedeoLiseId: null,
				isClick: true,
				isClick1: false,
				YellowCar: [],
				customer_id: null,
				d_follow_list: [],
				status_arr: [], //关注列表
				status_arr1: [],
				headList: [], //观看头像列表,
				fir: "青",
				fit: "飞",
				num: '759',
				animationData: {},
				animationData1: {},
				animationData2: {},
				animationData3: {},
				d_animation1: {},
				test1: {},
				test2: {},
				test3: {},
				test4: {},
				test5: {},
				test6: {},
				GoodsListTime: {},
				live_noticeTime: {},
				d_getVideoList: [],
				singleYellowCar: [],
				dom: null,
				//自动还是手动滚动
				auto: true,
				Real: 0,
				newGg: [],
				d_newGoods: [],
				several: null,
				LiveRoomGoodsList: [],
				announcement: null,
				wosj: [],
				listHeight: 0,
				scrollTopS: 0,
				HFid:null,
				isShareOption1:false
			};
		},
		computed: {
			totalNum: {
				get() {
					let num_total = 0
					this.d_videoList1.forEach(item => {
						num_total += item.look_count + this.Real
					})
					return num_total;
				}
			},
		},
		methods: {
			goPlayBackShare(id){
				uni.navigateTo({
					url: '/pages/share/PlaybackShare?video_id=' + id
				})
			},
			PlaybackVideoSharing(item){
				console.log(item)
				this.isShareOption1 = true
				this.HFid = item.video_id
			},
			FX(item){
				console.log(item)
				this.FXid = item.id
				this.isShareOption = true
			},
			async wi(id){
				let [err, res] = await this.$http.post('/api/shop/getShortUrl',{
					long_url:config.webUrl1 + '/#/pages/QRcode/QRcode?customer_id=' + this.customer_id + '&type=4' + '&id=' + id
				});
				if(res.data.code === 200){
					this.isShareOption = false
					uni.showToast({
						icon:'none',
						title:'生成链接成功'
					})
					this.copyText = null
					this.copyText = res.data.data.splicing_domain_name
					console.log(this.copyText)
				}
			},
			async PlaybackVideo(id){
				let [err, res] = await this.$http.post('/api/shop/getShortUrl',{
					long_url:config.webUrl1 + '/#/pages/QRcode/QRcode?customer_id=' + this.customer_id + '&type=5' + '&id=' + id
				});
				if(res.data.code === 200){
					this.isShareOption1 = false
					uni.showToast({
						icon:'none',
						title:'生成链接成功'
					})
					this.copyText1 = null
					this.copyText1 = res.data.data.splicing_domain_name
					console.log(this.copyText1)
				}
			},
			onCopy(e){
				
			},
			onCopy1(e){
				
			},
			onError(){
				this.$message.console.error('复制失败');
			},
			goPlayBack(item){
				uni.navigateTo({
					url:'/pages/share/playback?video_id=' + item.video_id
				})
			},
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
			PopInput() {
				this.isPopp = true
			},
			shoeod() {
				this.isPop = true
			},
			goLiveToShare(id) {
				uni.navigateTo({
					url: '/pages/share/LiveToShare?live_room_id=' + id
				})
			},
			adb(item) {
				if (item.id === 2) {
					uni.navigateTo({
						url: '/pages/share/share'
					});
				} else if (item.id === 1) {
					uni.navigateTo({
						url: '/pages/share/choiceness'
					});
				}
			},
			noLive(item) {
				if (item.status === 0) {
					uni.showToast({
						title: '主播正在赶来的路上~',
						icon: 'none'
					})
					return
				}
			},
			async getCumstomerInfo() { //获取用户个人信息
				let token = uni.getStorageSync("token")
				if (token === undefined || token === null || token === '') {
					return false
				}
				let [err, res] = await this.$http.post('/api/customer/getCustomerInfo');
				if (res.data.code === 200) {
					this.customer_id = res.data.data.customer_id
					// console.log(this.customer_id)
					this.follow_list() //首页关注列表
					uni.stopPullDownRefresh();
				}
			},
			gosssss(item) {
				uni.navigateTo({
					url:'/pages/share/shareLive?live_room_id=' + item.id
				})
				// window.history.pushState(null, null, '#/pages/share/live?id=1');
				// this.Hanzi()
				// this.videoContext = uni.createVideoContext('aaa' + item.id)
				// this.abc = true //控制tabbar
				// this.viedeoLiseId = item.id
				// this.ListeningToArray()
				// this.$set(item, 'is_full', true)
				// this.YellowCar = []
				// this.liveRoomGoods() //小黄车接口
				// this.longConnection()
				// this.d_notics()
				// this.d_animation()
				// this.d_shopgoodslistnotice()
				// this.getLiveRoomGoodsList()
				
				
				
				// this.GoodsListTime = setInterval(()=>{
				// 	this.getLiveRoomGoodsList()//商品列表	
				// },10000)

				// this.live_notice() //公告
				// this.live_noticeTime = setInterval(() => {
				// 	this.live_notice() //公告
				// }, 60000)
				// let token = uni.getStorageSync("token")
				// if (token !== undefined && token !== null && token !== '') {
				// 	this.validateRoom(item)
				// } else {

				// }
				// this.randomYellowCar()
			},
			senddanmu() { //点击发送时
				const token = uni.getStorageSync('token')
				if (token === '' || token === null || token === undefined) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					return false
				}
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
			
			},
			ListeningToArray() {
				if (this.danmuList.length >30) {
					this.danmuList.splice(0, 1)
					// this.ceshi1()
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
				// setTimeout(()=>{
				// 	this.isPopp = false
				// },1000)

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
					if (token === undefined || token === null || token === '') {
						return false
					} else {
						this.sendSocketMessage('first_connect', {})
						this.sendSocketMessage('live_realtime_follow', {})
						this.sendSocketMessage('master_push_live_goods', {})
					}

				})
				uni.onSocketError((res) => {
					console.log('WebSocket连接打开失败，请检查！');
				});
				uni.onSocketMessage((res) => { //监听WebSocket接受到服务器的消息事件。

					if (this.is_open_socket === false) {
						return
					}
					this.ListeningToArray()
					this.ListeningToHeadList()
					const jsonData = res.data
					// console.log(jsonData)
					const data = JSON.parse(jsonData);
					console.log(data)

					if (data.data.type === 'first_connect') {
						this.ceshi1()
						// console.log(data.data.data)
						this.headList = this.headList.filter(item => {
							if (item.id !== data.data.data.id) {
								return true
							}
						})
						if (data.data.data.user_headimgurl !== null && data.data.data.user_headimgurl !== undefined && data.data.data
							.user_headimgurl !== '') {
							this.headList.push({
								head: data.data.data.user_headimgurl,
								id: data.data.data.id
							})
						} else {
							this.headList.push({
								head: "/static/images/APP-qie8_0000_mo-head2.png",
								id: data.data.data.id
							})
						}

						this.headList.reverse()
						// console.log(this.headList)
						if (data.data.data.user_nickname !== null && data.data.data.user_nickname !== undefined && data.data.data.user_nickname !==
							"") {
							// console.log(data.data.data.distribution_level_img)
							this.danmuList.push({
								text: "进入直播间",
								name: data.data.data.user_nickname,
								vip: data.data.data.distribution_level_img,
								color: '#ffcd46',
								time: 99
							})
						}
						console.log()
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
						if (data.data.userInfo.user_nickname !== null && data.data.userInfo.user_nickname !== undefined && data.data
							.userInfo
							.user_nickname !== "") {
							this.danmuList.push({
								text: data.data.msg,
								name: data.data.userInfo.user_nickname,
								vip: data.data.userInfo.distribution_level_img,
								color: '#ffffff',
								time: 3
							})
						} else {
							uni.showToast({
								title: '请完善昵称',
								icon: 'none'
							});
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
					} else if (data.type === 'live_realtime_follow') {
						// console.log(data.data.data.real)
						this.Real = data.data.data.real
					} else if (data.type === 'master_push_live_goods') {
						console.log(this.isNewGoods)
						this.isNewGoods = false
						console.log(this.isNewGoods)
						this.newGg = []
						let list = data.data.goods_list
						this.newGg = list
						this.d_newGoods = []
						for (let i = 0; i < this.newGg.length; i++) {
							this.d_newGoods.push({
								id: this.newGg[i].shop_goods_common.id,
								species_values: this.newGg[i].shop_goods_common.species_values,
								actual_price: this.newGg[i].actual_price,
								image_thumb: this.newGg[i].image_thumb,
								goods_title: this.newGg[i].shop_goods_common.goods_title
							})
						}
						console.log(this.d_newGoods)

					}
				});

			},
			sendSocketMessage(type, data) { //封装发送
				// console.log(this.is_open_socket)
				if (this.is_open_socket) {
					const token = uni.getStorageSync('token')
					const rooid = this.viedeoLiseId
					uni.sendSocketMessage({
						data: JSON.stringify({
							type: type,
							room_id: rooid,
							token: token,
							data: data
						}),
					});
				}
			},
			getVideoList() { //回放列表
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/vod/getVideoVodList',
					method: "POST",
					data: {
						page: 1,
						size: 100
					},
					header: {
						'Authorization': token
					},
					success: (res) => {
						if (res.data.code == 200) {
							let list = res.data.data
							// console.log(list)
							for (let i = 0; i < list.length; i++) {
								this.d_getVideoList.push({
									id: list[i].lr_id,
									playURL: list[i].playURL,
									coverURL: list[i].coverURL,
									head_img: list[i].head_img,
									room_nickname: list[i].room_nickname,
									room_title: list[i].room_title,
									room_img: list[i].room_img,
									video_id:list[i].video_id
								})
							}
							// console.log(this.d_getVideoList)
						}

					},
				});
			},
			videoList() { //直播列表
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/liveRoom/list',
					method: "POST",
					data: {
						page: 1,
						size: 10
					},
					header: {
						'Authorization': token
					},
					success: (res) => {
						let list = res.data.data
						// console.log(list)
						this.d_videoList = []
						for (let i = 0; i < list.length; i++) {
							this.d_videoList.push({
								id: list[i].id,
								room_img: list[i].room_img,
								status: list[i].status,
								title: list[i].title,
								pullUrl: list[i].pullUrl,
								stream_key_pull: list[i].stream_key_pull,
								head_img: list[i].room_anchor.head_img,
								nickname: list[i].room_anchor.nickname,
								desc: list[i].room_anchor.desc,
								next_live_time: list[i].next_live_time,
								follow_count: this.numberFormat(list[i].follow_count), //粉丝数
								look_count: list[i].look_count //观看人数、
							})
						}
						this.d_videoList1 = this.d_videoList.filter(item => {
							if (item.status === 1) {
								return true
							}
							return false
						})
						// console.log(this.d_videoList1)
						this.d_videoList2 = this.d_videoList.filter(item => {
							if (item.status === 0) {
								return true
							}
							return false
						})
						// console.log(this.d_videoList1)
						uni.stopPullDownRefresh();
					},
					fail: () => {
						uni.showToast({
							title: '777777777777',
							duration: 1000,
							icon: 'none'
						})
					}
				});
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
								species_names: list[i].shop_goods_common.species_names,
								species_values: list[i].shop_goods_common.species_values,
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
				this.videoContext.pause()
				item.is_full = undefined
				this.is_open_socket = false
				// console.log(this.is_open_socket)
				clearTimeout(this.test1);
				clearTimeout(this.test2);
				clearTimeout(this.test3);
				clearTimeout(this.test4);
				clearTimeout(this.test5);
				clearTimeout(this.test6);
				clearTimeout(this.GoodsListTime);
				clearTimeout(this.live_noticeTime);
				this.abc = false
			},
			goBuy(items) {
				// console.log(items.id)
				uni.navigateTo({
					url: '../buy/buy?product_id=' + items.id
				})
			},
			numberFormat(value) { //过万封装
				if (value > 9999) {
					value = (value / 10000).toFixed(1) + "万"
					return value
				}
				if (value <= 9999) {
					return value
				}
			},
			attention() {
				this.isAttention = true
			},
			follow(item) { //关注
				const token = uni.getStorageSync('token')
				if (token === '' || token === null || token === undefined) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					return false
				}
				uni.request({
					url: config.webUrl2 + '/liveRoom/follow',
					method: "POST",
					data: {
						customer_id: this.customer_id, //客户id
						lr_id: item.id, //直播间id
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
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/liveRoom/follow',
					method: "POST",
					data: {
						customer_id: this.customer_id, //客户id
						lr_id: this.viedeoLiseId, //直播间id
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
			follow_list() { //首页关注列表
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/liveRoom/follow_list',
					method: "POST",
					data: {
						customer_id: this.customer_id, //客户id
					},
					header: {
						'Authorization': token
					},
					success: (res) => {
						if (res.data.code === 200) {
							this.d_follow_list = []
							let list = res.data.data
							// console.log(list)
							if (list.length < 1) {
								this.isGZ = false
							} else {
								this.isGZ = true
							}
							for (let i = 0; i < list.length; i++) {
								this.d_follow_list.push({
									look_count: list[i].follow_live_room.look_count,
									status: list[i].follow_live_room.status,
									anchor_img: list[i].follow_live_room.anchor_img,
									anchor_nickname: list[i].follow_live_room.anchor_nickname
								})
							}
							this.status_arr = this.d_follow_list.filter(item => {
								if (item.status === 1) {
									return true
								}
								return false
							})
							this.status_arr1 = this.d_follow_list.filter(item => {
								if (item.status === 0) {
									return true
								}
								return false
							})
						}

					}
				});
			},
			Hanzi() {
				let Arr = ["天", "ie", "人", "和", "红", "我", "点", "瞄", "有", "腹", "肌", "的", "熊", "猫", "骑", "驴", "逛", "超", "市", "白","开", "Marldin", "宇", "sigidn", "周","吴","wsizi"];
				let n = Math.floor(Math.random() * Arr.length + 1) - 1;
				this.fir = Arr[n]
				this.fit = Arr[n + 1]
				this.num = Math.floor(Math.random() * (20 - 40) + 40);
			},
			d_animation() {
				this.test1 = setInterval(() => {
					animation.translate(-230).opacity(0).step()

				}, 5000)
				let animation = uni.createAnimation({
					duration: 1000,
					timingFunction: "ease",
					delay: 0
				})
				this.animation = animation

				this.test2 = setInterval(function() {
					this.Hanzi()
					animation.translate(230).opacity(1).step()
					this.animationData = animation.export()
					this.randomYellowCar() //控制是否出现小黄车
				}.bind(this), 10000)

			},
			d_notics() {
				this.test3 = setInterval(() => {
					animation.translate(-400).opacity(0).step()
				}, 3000)
				let animation = uni.createAnimation({
					duration: 1000,
					timingFunction: "ease",
					delay: 0
				})

				this.test4 = setInterval(function() {
					animation.translate(345).opacity(1).step()
					this.animationData1 = animation.export()
				}.bind(this), 30000)

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
			scroll() {
				let place = 1;
				let i = 0;
				window.status = Mes[i].substring(0, place);
				if (place >= Mes[i].length) {
					if (i < 2) {
						i++;
						place = 1;
						window.setTimeout("scroll()", 50);
					} else {
						i = 0;
						place = 1;
						window.setTimeout("scroll()", 50);
					}
				} else {
					place++;
					window.setTimeout("scroll()", 50);
				}
			},
			getLiveRoomGoodsList() { //商品列表
				// console.log(this.viedeoLiseId)
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/liveRoomGoods/getLiveRoomGoodsList',
					method: "POST",
					data: {
						room_id: this.viedeoLiseId, //客户id

					},
					header: {
						'Authorization': token
					},
					success: (res) => {
						if (res.data.code === 200) {
							// console.log(res.data.data)
							this.wosj = []
							let list = res.data.data
							this.several = list.length

							for (let i = 0; i < list.length; i++) {
								this.LiveRoomGoodsList.push({
									id: list[i].shop_goods.shop_goods_common.id,
									goods_title: list[i].shop_goods.shop_goods_common.goods_title,
									image_thumb: list[i].shop_goods.image_thumb,
									price: list[i].shop_goods.shop_goods_common.price
								})
							}
							// console.log(this.wosj)
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
							console.log(res.data.data)
							if (res.data.data !== '') {
								this.announcement = res.data.data
								this.isNotice = true
							} else {
								this.isNotice = false
							}
						}

					}
				});
			},
			randomYellowCar() { //控制是否出现小黄车
				const token = uni.getStorageSync('token')
				uni.request({
					url: config.webUrl2 + '/liveRoom/randomYellowCar',
					method: "POST",
					data: {
						live_room_id: this.viedeoLiseId, //直播间id

					},
					header: {
						'Authorization': token
					},
					success: (res) => {
						if (res.data.code === 200) {
							console.log(res.data.data.random_yellow_car)
							if (res.data.data.random_yellow_car === 1) {
								this.isShoss = true
							} else {
								this.isShoss = false
							}

						}

					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
// 分享选择
.ShareOption_box{
	width:100%;
	height: 100vh;
	background: rgba(0,0,0,.1);
	position:fixed;
	top:0;
	left:0;
	z-index: 500;
	.ShareOption{
		width:100%;
		height: 280upx;
		background: #ffffff;
		position:absolute;
		bottom:0;
		left:0;
		overflow: hidden;
		border-top-left-radius:20upx ;
		border-top-right-radius:20upx ;
		.ShareOption_top{
			width:100%;
			height: 200upx;
			display: flex;
			.d_left{
				width:50%;
				height: 100%;
				padding-top:30upx;
				text-align: center;
				image{
					width:100upx;
					height:100upx;
				}
				view{
					font-size:24upx;
					color:#444444;
				}
				.optionInput{
					width:10upx;
					height: 10upx;
					display: none;
				}
			}
			.d_right{
				width:50%;
				height: 100%;
				padding-top:30upx;
				text-align: center;
				image{
					width:100upx;
					height:100upx;
				}
				view{
					font-size:24upx;
					color:#444444;
				}
			}
		}
		.ShareOption_bottom{
			width:100%;
			height: 80upx;
			background: #eeeeee;
			text-align: center;
			line-height: 80upx;
			color:#444444;
			font-size: 34upx;
		}
	}
}

	
	
	
	.Pop_up_barrage_box {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .1);
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.Pop_up_barrage {
		width: 100%;
		height: 80upx;
		background: #ffffff;
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		padding: 15upx 20upx;

		.ensodi {
			width: 65%;
			height: 100%;
			// background: #4CD964;
			line-height: 50upx;

			input {
				height: 50upx;
				width: 100%;
				line-height: 60upx;
				font-size: 26upx;
				color: #666666;
				padding-left: 30upx;
				-webkit-transform: translate3d(0, 0, 0);
			}
		}

		.sendDanmu1 {
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
		margin-left: -400upx;
		opacity: 0.1;

		text {
			color: #fe5655;
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

	.videoItemBox:last-child{
		padding-bottom: 100upx;
	}
	.videoItemBox {
		width: 100%;
		height: 100%;
		padding: 0 20upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.viedoItem {
			width: 100%;
			height: 600upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20upx;
			margin-bottom: 20upx;
			overflow: hidden;

			.viedo {
				width: 100%;
				height: 410upx;
				background: #808080;
				position: relative;

				.cover {
					position: absolute;
					width: 100%;
					height: 100%;
					// background: #1AAD19;
					top: 0;
					left: 0;
					z-index: 100;
					
					.d_mc{
						position:absolute;
						top:0;
						left: 0;
						width:100%;
						height: 100%;
						background: rgba(0,0,0,.2);
						z-index:1;
					}
					.d_imgs {
						width: 60upx;
						height: 60upx;
						position: absolute;
						top: 150upx;
						left: 324upx;
						z-index: 100;
					}

					.blankScreen {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						// background: rgba(0, 0, 0, .5);
						z-index: 999;
					}

					image {
						width: 100%;
						height: 100%;
					}

					.viedo-status {
						width: 100%;
						height: 60upx;
						position: absolute;
						top: 20upx;
						left: 0;
						z-index: 300;
						display: flex;
						justify-content: space-between;
						padding: 20upx;

						.viedo-status-left {
							width: 185upx;
							height: 59upx;
							border-radius: 30upx;
							border: 4upx solid #ffffff;
							font-size: 36upx;
							color: #ffffff;
							background: rgba(0, 0, 0, .3);
							text-align: center;
							line-height: 50upx;
							display: flex;
							justify-content: center;
							align-items: center;

							view {
								width: 16upx;
								height: 16upx;
								background: #fd3758;
								z-index: 400;
								border-radius: 100%;
								margin: 0upx 6upx 0 0upx;
							}
						}

						.viedo-status-right {
							width: 90upx;
							height: 32upx;
							display: flex;
							color: #ffffff;
							font-size: 18upx;
							line-height: 32upx;

							image {
								width: 22upx;
								height: 20upx;
								margin-top: 6upx;
								margin-right: 6upx;
							}
						}
					}

					.nextNotice_box {
						width: 100%;
						height: 80upx;
						padding: 0 24upx;
						position: absolute;
						top: 300upx;
						left: 0;
						z-index: 2;

						.nextNotice {
							width: 100%;
							height: 80upx;
							background: rgba(0, 0, 0, .5);
							border-radius: 60upx;
							line-height: 80upx;
							display: flex;
							align-items: center;
							font-size: 38upx;
							color: #ffffff;
							overflow: hidden;
							white-space: nowrap;
							padding-left: 80upx;
							position: relative;

							.viewss {
								// background: #007AFF;
								width: 570upx;
								height: 80upx;
								// overflow: hidden;
								display: flex;
							}

							image {
								width: 60upx;
								height: 60upx;
								z-index: 100;
								position: absolute;
								top: 10upx;
								left: 10upx;
							}

							.noticeTime {
								// width:320upx;
								// height: 80upx;
								overflow: hidden;
								// background: #1AAD19;
								color: #f49e17;
								margin-left: 16upx;
							}
						}
					}

					.viedo-status1 {
						width: 100%;
						height: 60upx;
						position: absolute;
						top: 20upx;
						left: 20upx;
						z-index: 300;
						display: flex;
						justify-content: space-between;
						padding: 20upx;

						.viedo-status-left {
							width: 185upx;
							height: 59upx;
							border-radius: 30upx;
							border: 4upx solid #ffffff;
							font-size: 36upx;
							color: #ffffff;
							background: rgba(0, 0, 0, .3);
							text-align: center;
							line-height: 50upx;
							display: flex;
							justify-content: center;
							align-items: center;

							view {
								width: 16upx;
								height: 16upx;
								background: #999999;
								z-index: 400;
								border-radius: 100%;
								margin: 0upx 6upx 0 0upx;
							}
						}

						.viedo-status-right {
							width: 90upx;
							height: 32upx;
							display: flex;
							color: #ffffff;
							font-size: 18upx;
							line-height: 32upx;

							image {
								width: 22upx;
								height: 20upx;
								margin-top: 6upx;
								margin-right: 6upx;
							}
						}

						.playBack {
							width: 220upx;
							height: 50upx;
							border: 2upx solid #ffffff;
							color: #ffffff;
							font-size: 26upx;
							border-radius: 30upx;
							display: flex;
							align-items: center;

							.playBack_dian {
								width: 14upx;
								height: 14upx;
								background: #999999;
								border-radius: 100%;
								margin-left: 14upx;
								margin-right: 10upx;
							}

						}
					}
					.viedo-status2 {
						width: 340upx;
						height: 84upx;
						position: absolute;
						top: 160upx;
						left: 190upx;
						z-index: 300;
						display: flex;
						justify-content: space-between;
						// padding: 20upx;
					
						.viedo-status-left {
							width: 340upx;
							height: 84upx;
							border-radius: 60upx;
							border: 4upx solid #ffffff;
							font-size: 40upx;
							color: #ffffff;
							background: rgba(0, 0, 0, .3);
							text-align: center;
							display: flex;
							justify-content: center;
							align-items: center;
					
							view {
								width: 26upx;
								height: 26upx;
								background: #999999;
								z-index: 400;
								border-radius: 100%;
								margin: 0upx 6upx 0 0upx;
							}
						}
					
						.viedo-status-right {
							width: 90upx;
							height: 32upx;
							display: flex;
							color: #ffffff;
							font-size: 18upx;
							line-height: 32upx;
					
							image {
								width: 22upx;
								height: 20upx;
								margin-top: 6upx;
								margin-right: 6upx;
							}
						}
					
						.playBack {
							width: 220upx;
							height: 50upx;
							border: 2upx solid #ffffff;
							color: #ffffff;
							font-size: 26upx;
							border-radius: 30upx;
							display: flex;
							align-items: center;
					
							.playBack_dian {
								width: 14upx;
								height: 14upx;
								background: #999999;
								border-radius: 100%;
								margin-left: 14upx;
								margin-right: 10upx;
							}
					
						}
					}
				}


				.kkk {
					width: 828upx;
					height: 1472upx;
					position: fixed;
					top: 0;
					left: 0;
					z-index: 101;
				}

				.actives {
					cursor: not-allowed;
					pointer-events: none;
				}

				video {
					width: 100%;
					height: 100%;
				}

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.live {
			width: 100%;
			height: 190upx;
			// background: #C8C7CC;
			padding: 22upx;

			.live-title {
				width: 100%;
				height: 76upx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 36upx;
				font-weight: 500;
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
				height: 68upx;
				// background: #007AFF;
				align-items: center;
				line-height: 68upx;

				image {
					width: 68upx;
					height: 68upx;
				}

				.img {
					border-radius: 100%;
				}

				.sli {
					width: 48upx;
					height: 48upx;
				}

				view {
					width: 80%;
					font-size: 34upx;
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

	.notice {
		min-width: 400upx;
		max-width: 550upx;
		height: 46upx;
		padding-right: 20upx;
		background: #fe5454;
		line-height: 46upx;
		border-radius: 30upx;
		margin-top: 20upx;
		margin-left: -600upx;
		font-size: 24upx;
		color: #ffffff;
		display: flex;
		align-items: center;

		image {
			width: 40upx;
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
		// margin-top:20upx;
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
				margin-right:10upx;
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

				image {
					width: 34upx;
					height: 24upx;
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

	// 商品列表
	.liveProductList_box {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .1);
		position: fixed;
		top: 0;
		left: 0;

		.liveProductList {
			width: 100%;
			height: 625upx;
			// background: #1AAD19;
			position: absolute;
			bottom: 0;
			padding: 0 20upx;
		}

		.liveProductList_top {
			// background: #007AFF;
			padding-left: 30upx;
			width: 100%;
			height: 44upx;
			line-height: 20upx;
			color: #ffffff;
			font-size: 24upx;

		}

		.liveProductList_bottom {
			width: 100%;
			height: 580upx;
			background: #ffffff;
			border-top-right-radius: 16upx;
			border-top-left-radius: 16upx;
			padding: 0 20upx;

			.liveProductList_bottom_item {
				width: 100%;
				height: 179upx;
				// background-color: #007AFF;
				border-bottom: 2upx solid #eeeeee;
				padding: 20upx 0;
				display: flex;
				justify-content: space-between;

				.item_headUrling {
					width: 140upx;
					height: 140upx;
					border-radius: 10upx;
					// background-color: #DD524D;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.item_message {
					width: 508upx;
					height: 140upx;

					// background: #F0AD4E;
					.item_message_title {
						width: 100%;
						height: 40upx;
						// background: #1AAD19;
						font-size: 30upx;
						line-height: 40upx;
						color: #444444;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.item_message_onsale {
						height: 48upx;
						font-size: 22upx;
						color: #ff5553;
					}

					.item_message_money {
						width: 100%;
						height: 50upx;
						line-height: 50upx;
						display: flex;
						justify-content: space-between;
						// background: #E5E5E5;
						align-items: center;

						.d_money {
							font-size: 24upx;
							color: #f49c17;
							font-weight: 600;
						}

						.d_shop_car {
							width: 46upx;
							height: 46upx;
							background: #fe5454;
							border-radius: 100%;
							display: flex;
							align-items: center;
							justify-content: center;

							image {
								width: 30upx;
								height: 28upx;
							}
						}
					}
				}
			}
		}
	}

	.d_scroll-Y {
		height: 625upx;
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
						width: 100%;
						height: 90upx;
						// background: #DD524D;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						font-size: 24upx;
						color: rgba(25, 17, 11, 1);
						line-height: 22upx;

						.qwe {
							width: 190upx;
							line-height: 30upx;
							height: 30upx;
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
							line-height: 24upx;
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
						width: 56upx;
						height: 24upx;
						margin-right: 6upx;
						marign-top: 4upx;
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
			display: flex;
			margin-top: 20upx;
			height: 60upx;
			position: relative;
			justify-content: space-between;

			.shop {
				width: 60upx;
				height: 60upx;
				background: rgba(0, 0, 0, .5);
				// background: #007AFF;
				margin-right: 80upx;
				border-radius: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;

				.redDot {
					width: 20upx;
					height: 20upx;
					background: #ff1d1e;
					position: absolute;
					right: 0;
					top: 0;
					border-radius: 100%;
					font-size: 14upx;
					color: #ffffff;
					text-align: center;
					line-height: 20upx;
				}

				image {
					position: absolute;
					top: -42upx;
					left: -20upx;
					width: 160%;
					height: 160%;
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
				background: rgba(0, 0, 0, .5);

				image {
					width: 34upx;
					height: 28upx;
				}
			}

			.mengceng {
				position: fixed;
				top: 0;
				left: 0;
				width: 100vw;
				height: 100vh;
				background: rgba(0, 0, 0, 0)
			}
		}

		.danmu-button {
			width: 260upx;
			height: 60upx;
			border-radius: 30upx;
			line-height: 60upx;
			background: #231a1b;

			// background: red;
			.danmu-input1 {
				// background: #1AAD19;

				height: 60upx;
				line-height: 60upx;
				font-size: 26upx;
				color: #ffffff;
				padding-left: 30upx;
				-webkit-transform: translate3d(0, 0, 0);
			}

			.danmu_active {
				z-index: 1;
				width: 100%;
				height: 80upx;
				background: #ffffff;
				position: fixed;
				bottom: 0;
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
				position: absolute;
				bottom: -6upx;
				right: 0;
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

	page {
		background: #f7f7f7;
	}

	.smallYelloCar1 {
		width: 70%;
		height: 150upx;
		background: #ffffff;
		border-radius: 8upx;
		padding: 15upx 10upx;
		margin-top: 20upx;
		display: flex;
		justify-content: space-between;

		.z-img-box {
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
			width: 73%;
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
					padding-top: 12upx;

					.qwe {
						line-height: 30upx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.gg {
						font-size: 16upx;
						color: #888888;
						margin-top: 6upx;
					}
				}

				.z-title-shopcar {
					width: 30%;
					height: 100%;

					// text-align: left;
					.moneyCar_right {
						width: 46upx;
						height: 46upx;
						border-radius: 100%;
						background: #53affc;
						text-align: center;
						line-height: 46upx;
						margin-top: 12upx;

						image {
							width: 30upx;
							height: 28upx;
						}
					}
				}
			}

			.z-shop-box-bottom {
				width: 100%;
				height: 50%;
				// background: #555555;
				display: flex;
				justify-content: space-between;

				.z-money {
					width: 60%;
					height: 100%;
					// background: #3F536E;
					color: #F49C17;
					font-size: 24upx;
					padding-top: 24upx;
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

	// 主推
	.MainProducts_box {
		width: 100%;
		height: 510upx;
		// background: #007AFF;
		margin-top: 20upx;
		padding: 0 20upx;

		.MainProducts {
			width: 100upx;
			// height: 300upx;
			background: rgba(0, 0, 0, .5);
			border-radius: 10upx;
			text-align: center;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			padding-top: 6upx;

			.MainProducts_item {
				width: 90upx;
				height: 90upx;
				overflow: hidden;
				border-radius: 6upx;
				// margin-top:6upx;
				margin-bottom: 6upx;
				position: relative;

				image {
					width: 100%;
					height: 100%;
				}

				.MainProducts_item_money {
					// width:66upx;
					padding: 0 4upx;
					height: 22upx;
					position: absolute;
					background: rgba(0, 0, 0, .5);
					// background: #007AFF;
					border-top-right-radius: 8upx;
					bottom: 0;
					left: 0;
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
</style>
