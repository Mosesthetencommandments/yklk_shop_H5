<template>
	<view>
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
			<!-- 种草拍赚 -->
			<view v-if="this.titleIndex==2">
				<!-- 昵称 -->
				<view class="nickname-box">
					<view class="nickname-left">
						<view class="kuang">
							<image :src="user_headimgurl" mode=""></image>
						</view>
					</view>
					<view class="nickname-center">{{user_nickname}}</view>
					<view class="nickname-right">
						<button class="recommended"><image src="../../static/images/son_0022_anniu-mov.png" mode=""></image>推荐视频</button>
					</view>
				</view>
				<!-- 下方选项卡 -->
				<view class="bj">
					
				</view>
				<view class="works-box">
					<view class="works">
						<view class="works-tabbar">
							<view class="w-left" @click="chooseProduction">
								<text>作品 0</text>
								<view class="xian" v-if="isClick === true"></view>
							</view>
							<view class="w-right" @click="chooseLike">
								<text>喜欢 0</text>
								<view class="xian" v-if="isClick1 === true"></view>
							</view>
						</view>
					</view>
				</view>
				<!-- 视频区域 -->
				<view class="video" v-if="isClick === true">
					<view class="video-item-box">
						<view class="video-item">
							<!-- <view class="item" @tap="videoDetails()">
								<view class="movie-number">
									<img src="../../static/images/APP-01_0010_play02.png" alt="">
									<view>888</view>
								</view>
							</view>
							<view class="item"></view>
							<view class="item"></view>
							<view class="item"></view> -->
						</view>
					</view>
				</view>
				
				<view class="addItem">
					<img src="../../static/images/APP-qie3_0009_01-ADD.png" alt="">
				</view>
			</view>
			<!-- ... -->
		</view>
		<view class="wdlshare" v-else>
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
			<!-- 种草拍赚 -->
			<view v-if="this.titleIndex==2">
				<!-- 昵称 -->
				<view class="nickname-box">
					<view class="nickname-left">
						<view class="kuang">
							<image src="../../static/images/APP-01_0007_DI-1.png" mode=""></image>
						</view>
					</view>
					<view class="nickname-center" @click="gologin">请登录</view>
					<view class="nickname-right">
						<button class="recommended"><image src="../../static/images/son_0022_anniu-mov.png" mode=""></image>推荐视频</button>
					</view>
				</view>
				<!-- 下方选项卡 -->
				<view class="bj">
					
				</view>
				<view class="works-box">
					<view class="works">
						<view class="works-tabbar">
							<view class="w-left" @click="checkInfo(index)">
								<text>作品 0</text>
								<view class="xian"></view>
							</view>
							<view class="w-right">
								<text>喜欢 0</text>
								<view class="xian"></view>
							</view>
						</view>
					</view>
				</view>
				<!-- 视频区域 -->
				<view class="video">
					<view class="video-item-box">
						登录后查看作品~
					</view>
				</view>
			</view>
		</view>
		<tabbarItem v-if="abc !== true"></tabbarItem>
	</view>
</template>

<script>
	import tabbarItem from "../../components/tabbarItem/tabbar.vue"
	import config from '../../common/config.js';
	export default {
		components:{
			tabbarItem
		},
		
		onPageScroll(res){
			this.scrollTopPX = res.scrollTop;
		},
		onPullDownRefresh() {//下拉刷新
			this.getBecomeSilent()
			this.getname()
		},
		mounted() {
		},
		onLoad() {
			this.d_status = this.getQueryVariable("state")
			this.getBecomeSilent()
			// if(this.d_status == 2){
			// 	this.NonSilentLogin() 
			// }
		},
		onShow(){
			this.getname1()
		}, 
		data() {
			return {
				isSSSS:false,
				isFollow:true,
				isAttention:false,
				videoContext:null,
				preload:'auto',
				controls:false,
				playsinline:true,
				isSShow:false,
				openid:'',
				titleIndex:2,
				name:'',
				user_headimgurl:"",
				isSSS:true,
				titles:[
					{id:0,title:"直播达人"},
					{id:1,title:"精选素材"},
					{id:2,title:"种草赚拍"}
				],
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
				viedeoLiseId:null,
				isClick:true,
				isClick1:false,
				YellowCar:[],
				customer_id:null,
				d_status:null,
				s_customer_id:null
			};
		},
		methods:{
			async getname1(){
				let token = uni.getStorageSync("token")
				if (token === '' || token === undefined || token === null) {
					const openid = uni.getStorageSync('wx_open_id');
					if (openid !== null && openid !== '' && openid !== undefined) {
						let [err1, resp1] = await uni.request({
							url:config.webUrl+"/api/customer/wxLogin",
							data: { 'wx_open_id': openid },
							methods:'POST',
							header:{
								'shop':"1"
							},
						})
						if(resp1.data.data.success_message === "success") {
							token = resp1.data.data.token
							uni.setStorageSync('token', token)
						} else {
							this.isSShow = false
							return
						}
					} else {
						this.isSShow = false
						return
					}
				}
				let [err,res] = await this.$http.post('/api/customer/getCustomerInfo');
				if(res.data.code === 200){
					// let name = res.data.data.phone
					// this.name = name
					this.user_nickname = res.data.data.user_nickname
					if(this.user_nickname == ""){
						this.user_nickname = res.data.data.phone + "的用户"
					}
					let user_headimgurl = res.data.data.user_headimgurl
					this.user_headimgurl = user_headimgurl
					let distribution_level_id = res.data.data.distribution_level_id
					uni.setStorageSync('distribution_level_id', distribution_level_id);
					let distribution_level_sort = res.data.data.distribution_level_sort
					uni.setStorageSync('distribution_level_sort',distribution_level_sort)
					if(this.user_headimgurl == ""){
						this.user_headimgurl = "../../static/images/APP-qie8_0000_mo-head2.png"
					}
					this.customer_id = res.data.data.customer_id
					this.isSShow = true	
					uni.stopPullDownRefresh();
				}
			},
			chooseProduction(){
				this.isClick = true
				this.isClick1 = false
			},
			chooseLike(){
				this.isClick1 = true,
				this.isClick = false
			},
			gotoBroadcast(){
				uni.navigateTo({
					url:'../broadcast/broadcast'
				})
			},
			gologin(){
				uni.navigateTo({
					url:'../login/login'
				})	
			},
			titletap(index){
				this.titleIndex=index;
			},
			videoDetails(){
				uni.navigateTo({
					url:'../video/video'
				})
			},
			adb(item){
				if(item.id === 1){
					uni.navigateTo({
					    url: '/pages/share/choiceness'
					});
				}else if(item.id === 0){
					uni.navigateTo({
					    url: '/pages/share/live'
					});
				}
			},
			getQueryVariable(variable){//获取URL中的state
			   let query = window.location.search.substring(1);
			   let vars = query.split("&");
			   for (let i=0;i<vars.length;i++) {
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
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/share/share') + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
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
						}else if(resp1.data.data.success_message == 'not_unionid'){
							this.s_customer_id = resp1.data.data.customer_id
							this.NonSilentLogin1()
						}
					} else {
						
					}
				}
				
			},
			// 非静默
			NonSilentLogin(){
				// const local01 = window.location.href
				if(this.d_status != 2){
					 location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ config.appid +'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/share/share') + '&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
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
				let [err,res] = await this.$http.post('/api/customer/getWxUserInfo', {code:code1})
				let userinfo = res.data.data.userinfo
				let d_unionid = res.data.data.userinfo.unionid
				console.log(res.data.data)
				uni.setStorageSync("wx_open_id",userinfo.openid)//同步本地存储
				// 存储下来微信的信息
				uni.setStorageSync('userinfo', userinfo);
				const values = uni.getStorageSync('customer_id');
				console.log(values)
				if(userinfo){
					let [err,res] = await this.$http.post('/api/customer/wxRegister', {
							nickname:userinfo.nickname,
							headimgurl:userinfo.headimgurl,
							wx_open_id:userinfo.openid,
							wx_union_id:d_unionid
					});
					if(res.data.code === 200){
						console.log(res.data.data.token)
						uni.setStorageSync('token',res.data.data.token);
					}
					
				}
				
			},
			// wx_union_id
			NonSilentLogin1() {
				if (this.d_status != 2) {
					window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid +
						'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/share/share') +
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
			
		}
	}
</script>

<style lang="scss" scoped>
	
	
	
	// 直播
	.shade-header-box{
		width:100%;
		height: 76upx;
		// background: #007AFF;
		padding: 10upx 20upx;
		display: flex;
		justify-content: space-between;
		.header-message{
			// width:260upx;
			height: 56upx;
			background: rgba(0,0,0,.5);
			border-radius:60upx;
			display: flex;
			justify-content: space-between;
			image{
				width:50upx;
				height:50upx;
				border-radius:50%;
				margin:4upx;
			}
			.message-center{
				width:110upx;
				height: 56upx;
				// background: #1AAD19;
				padding:8upx 0 8upx 8upx;
				color:#ffffff;
				font-size: 18upx;
				.ads{
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				.fans{
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: 15upx;
				}
				margin-right: 6upx;
			}
			.message-right{
				width: 70upx;
				height: 44upx;
				background: #ffffff;
				border-radius: 30upx;
				text-align: center;
				line-height: 44upx;
				font-size: 22upx;
				color:#369eff;
				font-weight: 600;
				margin: 6upx 9upx;
			}
		}
		.header-fans{
			display: flex;
			justify-content: space-between;
			.touxiang{
				width:220upx;
				height: 56upx;
				// background: #666666;
				overflow: hidden;
				.img-box{
					width:50upx;
					height: 50upx;
					overflow: hidden;
					border-radius: 100% 100%;
					background: #007AFF;
					margin-top:4upx;
					margin-right:10upx ;
					.ads{
						width:100%;
						height: 100%;
					}
					
				}
			}
			.fans-number{
				width:100upx;
				height: 56upx;
				background:rgba($color: #000000, $alpha: 0.3);
				border-radius: 30upx;
				text-align: center;
				line-height: 56upx;
				font-size: 20upx;
				color: #ffffff;
				margin:0 22upx 0 16upx;
			}
			.image{
				width: 26upx;
				height: 26upx;
				line-height: 56upx;
				margin-top:16upx;
			}
		}
		
	}
	//底部点赞
	.giveALink{
		width:260upx;
		height: 260upx;
		// background:#007AFF;
		position: absolute;
		bottom:0;
		right: 0;
		padding: 47upx 20upx 20upx;
		.love-box{
			width:100%;
			height: 100upx;
			// background: #C0C0C0;
			text-align: right;
			image{
				width:68upx;
				height: 56upx;
			}
			.love-number{
				margin-left: 145upx;
				width:76upx;
				text-align: center;
				height: 30upx;
				// background: #1AAD19;
				color:#ffffff;
				font-size: 24upx;
				line-height: 30upx;
			}
		}
		.d-auction-box1{
			width:100%;
			height: 60upx;
			// background: #3F536E;
			margin-top: 132upx;
			padding-left:150upx;
			.d-imgbox1{
				width:60upx;
				height: 60upx;
				background: rgba(0,0,0,.3);
				border-radius: 100%;
				text-align: center;
				line-height: 60upx;
				image{
					width: 36upx;
					height: 28upx;
				}
			}
		}
		.d-auction-box{
			width:100%;
			height: 60upx;
			// background: #3F536E;
			margin-top: 36upx;
			display: flex;
			justify-content: space-between;
			view{
				width:60upx;
				height: 60upx;
				border-radius: 100%;
			}
			.d-auction{
				background: #339efe;
				text-align: center;
				line-height: 60upx;
				color:#ffffff;
				font-size: 20upx;
			}
			.d-imgbox{
				width:60upx;
				height: 60upx;
				background: rgba(0,0,0,.3);
				border-radius: 100%;
				text-align: center;
				line-height: 68upx;
				image{
					width: 40upx;
					height: 36upx;
				}
			}
			.d-imgbox1{
				width:60upx;
				height: 60upx;
				background: rgba(0,0,0,.3);
				border-radius: 100%;
				text-align: center;
				line-height: 60upx;
				image{
					width: 36upx;
					height: 28upx;
				}
			}
		}
	}
// 弹幕
.fordanmu{
  width:560upx;
  padding:20upx 20upx;
  position:absolute;
  // background:#808080;
  bottom: 0;
  left:0;
  z-index:1;
  .smallYelloCar{
	  width:100%;
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
  .danmu-box{
	width:350upx;
	height:280upx;
	// background:red;
	overflow: hidden;
	.danmu-content{
		// width:100%;
		// height: 100%;
		// background: #1AAD19;
		.danmu-content-chat:last-child{
			margin-bottom:20upx ;
		}
		.danmu-content-chat{
			background: rgba(0,0,0,.5);
			border-radius: 24upx;
			padding: 10upx;
			margin-bottom: 10upx;
			padding-left: 16upx;
			.vip{
				font-weight: 700;
				color: #ffe4a1;
				margin-right: 6upx;
			}
		}
		font-size: 24upx;
		color: #ffffff;
		text{
			color:#5caffd
		}
	}
   .scroll-Y{
		height: 280upx;
   }
  }
  .button-box{
	  // z-index: 500;
	  width:350upx;
	  display:flex;
	  margin-top:20upx;
	  height:60upx;
	  // background: #007AFF;
  }
  .danmu-button{
	   width:230upx;
	   height:60upx;
	   border-radius: 30upx;
	   // background:blue;
	   line-height:60upx;
	   background:#231a1b;
	   input{
			height:60upx;
			width:200upx;
			line-height:60upx;
			font-size:26upx;
			color:#666666;
			padding-left: 30upx;
			-webkit-transform: translate3d(0, 0, 0);
		}
	}
	.sendDanmu{
	   width:100upx;
	   height:60upx;
	   margin-left:30upx;
	   background:#F49C17;
	   border-radius: 30upx;
	   display:flex;
	   justify-content: center;
	   align-items: center;
	   font-size:26upx;
	   color:#F2F2F2;
	}
 }
	
	.wdlshare .video .video-item-box{
		font-size:22upx;
		color:#999999;
		text-align: center;
		padding-top:228upx;
	}
	.wdlshare{
		width:100%;
		height: 100%;
		.nickname-box{
			.nickname-left{
				.kuang{
					overflow: hidden;
					background: #eeeeee;
					text-align: center;
					
					image{
						margin-top:18upx;
						width:70%;
						height: 70%;
					}
				}
			}
			.nickname-center{
				color:#53affc;
			}
		}
	}
	page{
		background:#f7f7f7;
	}
//选项卡
// 种草拍赚
.share-tab-box{
	width: 100%;
	height: 100%;
	padding:0 20upx;
	background: #ffffff;
}
.newheight{
	height:100upx!important;
	width:100%;
	background: #53aefc;
	border-bottom-left-radius: 30upx;
	border-bottom-right-radius:30upx;
	padding:0 28upx;
	display: flex;
	justify-content:space-around;
}
.share-tab{
	width:100%;
	height: 160upx;
	background: #53aefc;
	border-bottom-left-radius: 30upx;
	border-bottom-right-radius:30upx;
	padding:0 28upx;
	display: flex;
	justify-content:space-around;
}
.share-tab-item{
	width:160upx;
	height: 100upx;
}
.tab-item-s{
	width:160upx;
	height: 75upx;
	line-height: 75upx;
	color:#1d5f98;
	
	font-size: 28upx;
	text-align: center;
	&.active{
		font-weight: 900;
		font-size: 32upx;
		color:#ffffff;
	}
}
.tab-item-x{
	&.active{
		margin-left:42upx ;
		width:76upx;
		height: 16upx;
		background: url(../../static/images/son_0023_top-line.png) no-repeat;
		background-size:76upx;
	}
	
	// img{
	// 	width:100%;
	// 	margin-left:42upx;
	// }
}
//昵称
.nickname-box{
	width:100%;
	height: 90upx;
	padding: 0 20upx;
	background: #ffffff;
	display: flex;
	position:relative;
	.nickname-left{
		width:216upx;
		height: 90upx;

		.kuang{
			overflow: hidden;
			width:138upx;
			height: 138upx;
			border-radius: 100%;
			border:6upx solid #FFFFFF;
			margin-left:70upx;
			margin-top:-50upx;
			image{
				width:100%;height: 100%;
			}
		}
	}
	.nickname-center{
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		width:230upx;
		height: 90upx;
	
		font-size: 26upx;
		line-height: 90upx;
		padding-left: 14upx;
		color:#666666;
	}
	.nickname-right{
		width:194upx;
		height: 90upx;

		.recommended{
			width:176upx;
			height: 52upx;
			font-size: 24upx;
			margin-top:18upx;
			line-height: 52upx;
			box-shadow:8upx #aaaaaa;
			image{
				width:34upx;
				height: 28upx;
				margin:0 8upx -6upx -12upx;	
			}
		}
	}
}
// 下方选项卡
.bj{
	width: 100%;
	background: #ffffff;
	height:44upx;
}
.works-box{
	width:100%;
	height: 46upx;
	padding: 0 20upx;
	background: #ffffff;
	box-shadow:0upx 4upx 4upx #f1f1f1;
	
	.works-tabbar{
		height: 46upx;
		display: flex;
		justify-content: space-around;
		view{
			width:50%;
			height: 46upx;
			text-align: center;
			line-height: 40upx;
			font-size: 24upx;
		}
		.w-left{
			.xian{
				width:100%;
				height:5upx ;
				background:#53aefc;
				margin-top: 2upx;
				
			}
		}
		.w-right{
			.xian{
				width:100%;
				height:5upx ;
				background:#53aefc;
				margin-top: 2upx;
				
			}
		}
	}
}
//视频区域
.video{
	width:100%;
	height: 100%;
	
	.video-item-box{
		width:100%;
		height: 100%;
		padding-top:12upx;
		.video-item{
			display: flex;
			justify-content:space-between;
			flex-wrap: wrap;
			.item{
				width:236upx;
				height: 340upx;
				background: #ffffff;
				margin-bottom:18upx;
				
				position: relative;
				background:url(../../static/images/caopingshangdegou_3456797.jpg) no-repeat;
				background-size: 100% 100%;
			}
		}
		.video-item:after{content: "";width:236upx;}
	}
}
.movie-number{
	position:absolute;
	width:99upx;
	height: 34upx;
	background-color:rgba(0,0,0,0.5);
	color: white;
	bottom:10upx;
	left: 10upx;
	border-radius: 28upx;
	font-size:12upx;
	line-height: 34upx;
	background-size: 13upx;
	float:left;
}
.movie-number img{
	position:absolute;
	left:13upx;
	top:8upx;
	width:13upx;
}
.movie-number view{
	margin-left: 36upx;
}


// 精选素材
.jx-bigbox{
	width:100%;
	height: 100%;
}
.commodity-box{
	width:100%;
	height: 508upx;
	background: #ffffff;
	margin-bottom: 8upx;
	padding: 0 48upx;
	.commodity{
		width:100%;
		height: 508upx;
		.commodity-top{
			width:100%;
			height: 134upx;
			overflow: hidden;
			display: flex;
			.kuangbox{
				width:82upx;
				height: 134upx;
				.kuang{
					width:68upx;
					height: 68upx;
					border-radius: 100%;
					border:2upx solid #5ea5ce;
					margin-left:6upx;
					margin-top: 20upx;
					overflow: hidden;
					image{
						width:100%;
						height: 100%;
					}
				}
			}
			.describe{
				width:512upx;
				height: 134upx;
				color:#666666;
				.describe-s{
					font-size:28upx;
					line-height: 36upx;
					margin-top:30upx;
					font-weight: 600;
				}
				.describe-x{
					font-size: 16upx;
					line-height: 20upx;
				}
			}
		}
		.commodity-img{
			width:512upx;
			height: 200upx;
			margin-left: 82upx;
			display: flex;
			justify-content: space-between;
			.img-item{
				width:166upx;
				height: 166upx;
				background: #0A98D5;
				image{
					width:100%;
					height: 100%;
				}
			}
		}
		.commodity-center{
			width:100%;
			height: 70upx;
			border-top:1px solid #f0f0f0;
			border-bottom:1px solid #f0f0f0;
			display: flex;
			.icon-box{
				width:66upx;
				height: 66upx;
				.tabCenter-icon{
					width:48upx;
					height: 48upx;
					border-radius: 50%;
					background:#53aefc;
					text-align: center;
					margin-left: 10upx;
					margin-top:10upx;
					overflow: hidden;
					position: relative;
					img{
						width:30upx;
						height: 28upx;
						text-align: center;
						line-height: 30upx;
						display: block;
						position:absolute ;
						top:12upx;
						left: 10upx;
					}
				}
			}
			.info-box{
				width:200upx;
				height: 66upx;
				padding-left: 16upx;
				.info-title{
					font-size:24upx;
					color:#19110b;
					line-height: 36upx;
					margin-top: 6upx;
				}
				.info-txt{
					font-size:20upx;
					color:#999999;
					line-height: 20upx;
				}
			}
			.c-money{
				width:282upx;
				height: 66upx;
				// background: #09BB07;
				color:#333333;
				font-size: 24upx;
				line-height: 44upx;
				text{
					color:#f3b047;
				}
			}
			.go{
				width:105upx;
				height: 66upx;
				color:#f3b047;
				font-size:24upx;
				line-height: 50upx;
			}
		}
		.commodity-footer{
			width:100%;
			height: 104upx;
			// background: #8A6DE9;
			display: flex;
			.footer-left{
				width:100%;
				height: 104upx;
				// background: #0A98D5;
				button{
					width:178upx;
					height: 54upx;
					font-size: 22upx;
					line-height: 60upx;
					color:#666666;
					margin:30upx 0 0 10upx;
					background: #f2f2f2;
					border-radius: 4upx;
					border: none;
					image{
						width:35upx;
						height: 35upx;
						margin: 0 1upx -10upx -18upx;
					}
				}
			}
			.footer-right{
				width:100%;
				height: 104upx;
				// background: #F76260;
				text-align: right;
				display: flex;
				overflow: hidden;
				.iconstitle{
					width:164upx;
					line-height: 104upx;
				}
				.icons{
					margin-left: 28upx;
					margin-top:34upx;
					display: flex;
					width:140upx;
					justify-content: space-between;
					image{
						width:36upx;
						height: 36upx;
						display: block;
					}
				}
			}
		}
	}
}


//直播达人

.myattention{
	width:100%;
	height: 280upx;
	background: #ffffff;
	padding: 0 20upx;
	.m-top{
		width:100%;
		height: 70upx;
		font-size:28upx;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height: 70upx;
		display: flex;
		.xian{
			display: inline-block;
			border-radius: 10upx;
			width:6upx;
			height:32upx;
			background:rgba(251,67,91,1);
			margin-top:20upx;
			margin-right: 10upx;
		}
	} 
	.m-bottom{
		width:100%;
		height: 180upx;
		background:url(../../static/images/APP-qie9_0000_zhibo03.png) no-repeat;
		background-size: 100% 100%;
		border-radius:10px;
		display: flex;
		padding: 16upx 40upx;
		.m-item{
			width:92upx;
			height: 100%;
			background: #3F536E;
			.whiteBox{
				width:89upx;
				height: 89upx;
				border:1px solid #ffffff;
				border-radius: 100%;
				 position: relative;   	
				.vessel{
					width:81upx;
					height:81upx;
					border-radius:50%;
					background: #007AFF;
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					bottom: 0;
					margin: auto;
					overflow: hidden;
				}
			}
			.m-name{
				width:92upx;
				height:56upx;
				background: #4CD964;
				font-size: 22upx;
				color: #ffffff;
				text-align: center;
				.peopleNumber{
					font-size: 16upx;
				}
			}
		}
		
	}
}
.m-recommend{
	width:100%;
	height: 70upx;
	font-size:28upx;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height: 70upx;
	display: flex;
	padding: 0 20upx;
	.xian{
		display: inline-block;
		border-radius: 10upx;
		width:6upx;
		height:32upx;
		background:rgba(251,67,91,1);
		margin-top:20upx;
		margin-right: 10upx;
	}
}
.shade{
	width:100vw;
	height:100vh;
	background: rgba(255,255,255,0.1);
	// background: #007AFF;
	position:fixed;
	top:0;
	left: 0;
	z-index: 500;
}
.addItem{
	width:80upx;
	height:80upx;
	position:absolute;
	right:10upx;
	bottom:120upx;
	img{
		width:100%;
		height:100%;
	}
}


.videoItemBox{
	width:100%;
	height: 100%;
	padding: 0 20upx;
	padding-bottom: 100upx;
	display: flex;
	justify-content: space-between;
	flex-wrap:wrap;
	.viedoItem{
		width:49%;
		height:450upx;
		background:rgba(255,255,255,1);
		border-radius:10upx;
		margin-bottom: 20upx;
		overflow: hidden;
		.viedo{
			width:100%;
			height: 334upx;
			background: #808080;
			position: relative;
			
			.cover{
				position: absolute;
				width:100%;height: 100%;
				// background: #1AAD19;
				top:0;
				left: 0;
				z-index: 100;
				.blankScreen{
					position:absolute;
					top:0;
					left: 0;
					width:100%;
					height: 100%;
					background:rgba(0,0,0,.5);
					z-index:999;
				}
				image{
					width:100%;height: 100%;
				}
				.viedo-status{
					width:100%;
					height: 60upx;
					position:absolute;
					top:0;
					left: 0;
					z-index: 300;
					display: flex;
					justify-content:space-between;
					padding: 20upx;
					.viedo-status-left{
						width:94upx;
						height:32upx;
						border-radius: 30upx;
						border:1px solid #ffffff;
						font-size: 18upx;
						color: #ffffff;
						background: rgba(0,0,0,.3);
						text-align: center;
						line-height: 32upx;
						display: flex;
						view{
							width:9upx;
							height: 9upx;
							background: #fd3758;
							z-index: 400;
							border-radius: 100%;
							margin: 11upx 6upx 0 12upx;
						}
					}
					.viedo-status-right{
						width:90upx;
						height: 32upx;
						display: flex;
						color: #ffffff;
						font-size: 18upx;
						line-height: 32upx;
						image{
							width:22upx;
							height: 20upx;
							margin-top:6upx;
							margin-right: 6upx;
						}
					}
				}
				.viedo-status1{
					width:100%;
					height: 60upx;
					position:absolute;
					top:0;
					left: 0;
					z-index: 300;
					display: flex;
					justify-content:space-between;
					padding: 20upx;
					.viedo-status-left{
						width:94upx;
						height:32upx;
						border-radius: 30upx;
						border:1px solid #ffffff;
						font-size: 18upx;
						color: #ffffff;
						background: rgba(0,0,0,.3);
						text-align: center;
						line-height: 32upx;
						display: flex;
						view{
							width:9upx;
							height: 9upx;
							background: #888888;
							z-index: 400;
							border-radius: 100%;
							margin: 11upx 6upx 0 12upx;
						}
					}
					.viedo-status-right{
						width:90upx;
						height: 32upx;
						display: flex;
						color: #ffffff;
						font-size: 18upx;
						line-height: 32upx;
						image{
							width:22upx;
							height: 20upx;
							margin-top:6upx;
							margin-right: 6upx;
						}
					}
				}
			}
			
			
			.kkk{
				// width:100vw;
				// height: 100vh;
				width:828upx;
				height: 1472upx;
				position:fixed;
				top:0;
				left:0;
				z-index: 101;
			}
			.actives{
				cursor: not-allowed;
				pointer-events:none;
			}
			
			video{
				width:100%;
				height: 100%;
			}
			image{
				width:100%;
				height: 100%;
			}
		}
	}
	.live{
		width:100%;
		height: 116upx;
		// background: #C8C7CC;
		padding: 12upx 12upx;
		.live-title{
			width:100%;
			height: 45upx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-size: 22upx;
			color:#444444;
			position: relative;
			.state{
				width:100upx;
				height: 52upx;
				background: #1AAD19;
				position: absolute;
				top:0;
				left: 0;
			}
		}
		.live-name{
			display: flex;
			width: 100%;
			height: 46upx;
			padding-top:10upx;
			image{
				width:34upx;
				height: 34upx;
				border-radius: 100%;
			}
			view{
				width:80%;
				font-size:20upx;
				color:#888888;
				margin:0 10upx;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
	}
}
.attention-box{
	width:100vw;
	height: 100vh;
	background: rgba(0,0,0,.5);
	z-index: 299;
}
.attention{
	width:750upx;
	height:370upx;
	background:rgba(255,255,255,1);
	border-radius:20upx 20upx 0px 0px;
	position:fixed;
	bottom:0;
	left:0;
	z-index: 300;
	text-align: center;
	.headerPortrait{
		width:134upx;
		height: 134upx;
		background: #ffffff;
		border-radius: 100%;
		margin:0 auto;
		text-align: center;
		margin-top:-65upx;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		image{
			width:94%;
			height: 94%;
			border-radius: 100%;
		}
	}
	.headerName{
		font-size: 24upx;
		color: #666666;
		line-height: 50upx;
	}
	.total{
		font-size: 18upx;
		color:#888888;
		line-height: 30upx;
	}
	.label{
		font-size: 18upx;
		color:#888888;
		text{
			margin:0 14upx;
		}
	}
	.Ta{
		margin-top: 60upx;
		font-size:24upx;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:52upx;
	}
	.fansNumber{
		// margin-top: 20upx;
		font-size:44upx;
		font-weight:400;
		color:rgba(54,158,255,1);
	}
	.d_attention{
		position: absolute;
		bottom: 44upx;
		right: 40upx;
		width:176upx;
		height:52upx;
		background:rgba(242,242,242,1);
		border-radius:10upx;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:52upx;
		font-size: 24upx;
		text{
			font-size: 34upx;
			color:#53AEFC;
			margin-right: 27upx;
		}
	}
	.d_attention1{
		position: absolute;
		bottom: 44upx;
		right: 40upx;
		width:176upx;
		height:52upx;
		background:rgba(242,242,242,1);
		border-radius:10upx;
		font-weight:400;
		color:#666666;
		line-height:52upx;
		font-size: 24upx;
	}
}

</style>
