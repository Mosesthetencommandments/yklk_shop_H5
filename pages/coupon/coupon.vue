<template>
	<view>
		<uni-segmented-control
			:current="current" 
			:values="items" 
			@clickItem="onClickItem" 
			style-type="text" 
			active-color="#369eff"
		>
		</uni-segmented-control>
		<view class="content">
			<!-- 未使用 -->
		    <view v-show="current === 0">
		
			</view>
			<!-- 已使用 -->
			<view v-show="current === 1">
			
			</view>
		    <!-- 已失效 -->
			<view v-show="current === 2">
				
		    </view>
			<!-- 待收货 -->
			<!-- <view v-show="current === 3 ">
			    
			</view> -->
		</view>
		<!-- 没有数据的时候的页面 -->
		<view class="none" v-if="isShow">
			<image src="../../static/images/APP-qie4_0000_空白.png" mode=""></image>
			<view>暂时还没有优惠券噢！</view>
		</view>
		<!-- 有数据的时候的页面 -->
		<view class="box">
			<view class="coupon-box" v-for="(item,index) in coupons" :key="index">
				<img src="../../static/images/APP-qie16_0007_-s-券b.png" alt="" v-if="item.coupon_status === 1 && ordersQuery.coupon_status !== 3 || item.coupon_status === 2 && ordersQuery.coupon_status !== 3" class="couponImg">
				<img src="../../static/images/APP-qie16_0006_-s-券h.png" alt="" v-if="ordersQuery.coupon_status === 3">
				<view class="leftMoney" v-if="item.coupon_type === 1">
					<text>￥</text>
					<text>{{item.offset_money}}</text>
				</view>
				<view class="leftMoney" v-else>
					<text>{{item.offset_percent /10}}</text>
					<text>折</text>
				</view>
				<view class="leftLimit">
					<text>满{{item.require_total_pay}}元使用</text>
				</view>
				<view class="rightInfo">
					<text class="rightInfoTitle1" v-if="ordersQuery.coupon_status === 3">{{item.coupon_name}}</text>
					<text class="rightInfoTitle" v-else>{{item.coupon_name}}</text>
					<view class="rightButton" v-if="item.coupon_status === 1 && ordersQuery.coupon_status !== 3">
						<view class="toUse" @click="gotoUse(index)">
							<text>去使用</text>
						</view>
						<view class="toShare" @click="goShareCoupon(item)">
							<text>分享</text>
						</view>
					</view>
					<view class="haveUse" v-if="item.coupon_status === 2 && ordersQuery.coupon_status !== 3">
						<img src="../../static/images/APP-qie16_0005_已使用tag.png" alt="">
					</view>
				</view>
				<view class="rightBottom">
					<text>领到卷当日开始7天有效</text>
				</view>
			</view>
		</view>
		<view class="getCoupon" v-if="fullReduction.length > 0 && ordersQuery.coupon_status === 1">
			<view class="getCouponBox" v-for="(item,index) in fullReduction" :key="index">
				<img src="../../static/images/APP-qie16_0008_-s-券O.png" alt="" >
				<view class="leftMoney1" v-if="item.coupon_type === 1">
					<text>￥</text>
					<text>{{item.offset_money}}</text>
				</view>
				<view class="leftMoney1" v-else>
					<text>{{item.offset_percent / 10}}</text>
					<text>折</text>
				</view>
				<view class="leftLimit1">
					<text>满{{item.require_total_pay}}元使用</text>
				</view>
				<view class="rightInfo1">
					<text class="rightInfoTitle1" v-if="ordersQuery.coupon_status === 3">{{item.coupon_name}}</text>
					<text class="rightInfoTitle" v-else>{{item.coupon_name}}</text>
					<view class="rightButton">
						<view class="toGet" @click="receiveShopCustomerCoupon(item)">
							<text>点击领取</text>
						</view>
					</view>
				</view>
				<view class="rightBottom1">
					<text>领到卷当日开始7天有效</text>
				</view>
			</view>
		</view>
		<view class="mask" v-if="isShare" @click="isShare = false">
			<view class="QRCodeImg">
				<img :src="QRcode_Img" alt="">
			</view>
			<view 
				class="getShareWeb"
				@click="getWebUrl"
				v-clipboard:copy="copyText"
				v-clipboard:success="onCopy"
				>
				<img src="../../static/images/2fee69c906ef69df85c55a04d37015e.png" alt="">
			</view>
			<view class="getShareWebWord">
				生成链接
			</view>
		</view>
		<!-- 下方悬浮 -->
<!-- 		<view class="share-box" @click="goShareCoupon">去分享！>></view>
		<view class="goCoupon" @click="goRedPacket">去领券！>></view> -->
	</view>
</template>
<script>
import uniSegmentedControl from "../../components/uni-segmented-control/uni-segmented-control.vue"
import config from '../../common/config.js';
export default {
	components:{
		uniSegmentedControl
	},
	onLoad(option) {
		if(option.wx_pid !== undefined && option.wx_pid !== null && option.wx_pid !== ''){//从微信来的上级id
			uni.setStorageSync('wx_pid', option.wx_pid);
		}

		this.d_status = this.getQueryVariable("state")
		this.getBecomeSilent()
		
	},
	onShow(){
		this.getname()
	},
	onPullDownRefresh() {//下拉刷新
		this.getShopCustomerCouponList()
		this.getShopCouponList()
	},
    data() {
        return {
			items: ['未使用','已使用','已失效'],
			current: 0,
			isShow:false,
			ordersQuery: {
				// page: 1,
				// page_size: 10,
				// limit_goods_type:undefined,
				coupon_status:1,
			},
			coupons:[],
			couponsDetails:[],
			ids:[],
			limit_goods:[],
			Arr:{},
			haveGet:true,
			fullReduction:[],
			shop_coupon_id:null,
			QRcode_Img:null,
			isShare:false,
			copyText:null,
			CustomerInfo:{},
			d_status:null
        }
    },
    methods: {
		async getWebUrl(){
			let [err, res] = await this.$http.post('/api/shop/getShortUrl',{
				long_url:config.webUrl1 + '/#/pages/QRcode/QRcode?customer_id=' + this.CustomerInfo.customer_id + '&type=1'
			});
			if(res.data.code === 200){
				uni.showToast({icon:'none',title:'生成链接成功'})
				this.copyText = null
				this.copyText = res.data.data.splicing_domain_name
				console.log(this.copyText)
			}
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
		onCopy(e){
			
		},
		onClickItem(index) {
		    if (this.current !== index) {
		        this.current = index;
				switch(index) {
					case 0:
						this.ordersQuery.coupon_status = 1
						this.getShopCouponList()
						break
					case 1:
						this.ordersQuery.coupon_status = 2
						break
					case 2:
						this.ordersQuery.coupon_status = 3
						break
					default:
						break
				}
				this.getShopCustomerCouponList()
		    }
		},
		async getShopCustomerCouponList(){//优惠券列表
			this.coupons = []
			let [err,res] = await this.$http.post("/api/coupon/getShopCustomerCouponList",this.ordersQuery);
				if (res.data.code === 200) {
					let list = res.data.data.data
					if(list.length === 0 && this.ordersQuery.coupon_status !== 1){
						this.isShow = true
					}else if(list.length === 0 && this.fullReduction.length === 0 && this.ordersQuery.coupon_status === 1){
						this.isShow = true
					}else{
						this.isShow = false
					}
					for(let i = 0 ; i < list.length; i++){
						this.coupons.push({
							 coupon_status:list[i].coupon_status,
							 coupon_id:list[i].coupon_id,
							 id:list[i].id,
							 start_at:list[i].start_at,
							 end_at:list[i].end_at,
							 coupon_type:list[i].shop_coupon.coupon_type,
							 require_total_pay:list[i].shop_coupon.require_total_pay,
							 offset_percent:list[i].shop_coupon.offset_percent,
							 coupon_name:list[i].shop_coupon.coupon_name,
							 coupon_img:list[i].shop_coupon.coupon_img,//图片
							 coupon_remark:list[i].shop_coupon.coupon_remark,
							 limit_goods_type:list[i].shop_coupon.limit_goods_type,
							 limit_goods:list[i].shop_coupon.limit_goods,
							 offset_money:list[i].shop_coupon.offset_money
						 })
					 }
				}
				for(let k = 0; k < this.coupons.length; k++){
					 this.coupons[k].start_at = (this.coupons[k].start_at).substr(0,10)
					 this.coupons[k].end_at = (this.coupons[k].end_at).substr(0,10)
					 // if(this.coupons[k].coupon_img === "" || this.coupons[k].coupon_img === null){
					 // 	this.coupons[k].coupon_img = "../../static/images/APP-预处理图.png"
					 // }
					// for(let j = 0; j < this.coupons[k].limit_goods.length;j++){
					// 	this.ids.push(
					// 		this.coupons[k].limit_goods[j]
					// 	)
					// }
					let Arr = JSON.stringify( this.coupons[k].limit_goods)
					this.Arr = Arr
				}
				uni.stopPullDownRefresh();//结束下拉刷新
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
			for(let i = 0 ; i < list.length; i++){
				this.fullReduction.push({
					coupon_name:list[i].coupon_name,
					id:list[i].id,
					coupon_type:list[i].coupon_type,
					offset_money:list[i].offset_money,
					require_total_pay:list[i].require_total_pay,
					offset_percent:list[i].offset_percent,
					limit_goods:list[i].limit_goods,
					// aaaa : false,
				})
			}
			uni.stopPullDownRefresh();
		},
		async receiveShopCustomerCoupon(item){//领取优惠券
			this.id = item.id
			let [err,res] = await this.$http.post("/api/coupon/receiveShopCustomerCoupon",{shop_coupon_id:this.id});
			if(res.data.code === 200){
				let coupon_id = res.data.data.coupon_id
				if(coupon_id === this.id){
					if (item.coupon_type === 1) {
						this.successReceiveCouponType = 1
						this.successReceiveMessage = item.offset_money
					} else {
						this.successReceiveCouponType = 2
						this.successReceiveMessage = item.offset_percent / 10
					}
					// item.aaaa = true
					uni.showToast({
					    title: '领取成功',
					    duration: 1000
					});
					this.getShopCustomerCouponList()
					this.getShopCouponList()
				}
			}else{
				// item.aaaa = false
			}
		},
		async shareQRCode(){ //分享二维码
			let [err,res] = await this.$http.post("/api/coupon/shareShopCouponCode",{
				shop_coupon_url: config.webUrl1+'/#/pages/QRcode/QRcode',
				type:1, 
				shop_coupon_id:this.shop_coupon_id
			});
			if(res.data.code == 200){
				let list = res.data.data
				this.QRcode_Img = list
				this.isload = false
				this.isShare = true
				uni.stopPullDownRefresh();
			}
		},
		goSearch(index){
			for(let i = 0 ; i < this.coupons.length; i++){
				if(index === i){
					this.limit_goods = this.coupons[i].limit_goods
					let a = this.limit_goods[0]
					let b = this.limit_goods[1]
					// console.log(a,b)
					uni.navigateTo({
						url:'../index-search/index-search?ids=' + this.Arr
					})
				}else{
					
				}
			}
		
		},
		goShareCoupon(item){
			// console.log(item)
			this.shop_coupon_id = item.coupon_id
			this.shareQRCode()
		},
		// goShareCoupon(){
		// 	uni.navigateTo({
		// 		url:'../shareCoupon/shareCoupon'
		// 	})
		// },
		goRedPacket(){
			uni.navigateTo({
				url:'../red-packet/red-packet'
			})
		},
		gotoUse(index){
			for(let i = 0 ; i < this.coupons.length; i++){
				if(index === i){
					this.limit_goods = this.coupons[i].limit_goods
					let a = this.limit_goods[0]
					let b = this.limit_goods[1]
					// console.log(a,b)
					uni.navigateTo({
						url:'../index-search/index-search?ids=' + this.Arr
					})
				}else{
					
				}
			}
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
				location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/coupon/coupon') + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
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
				uni.setStorageSync("wx_open_id",datas)//同步本地存储
				console.log(datas)
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
						this.getShopCustomerCouponList()
						this.getShopCouponList()
						this.getCumstomerInfo()
					}else if(resp1.data.data.success_message == 'not_registered'){
						this.NonSilentLogin()
					}
				} else {
				}
			}else{
				this.getShopCustomerCouponList()
				this.getShopCouponList()
				this.getCumstomerInfo()
			}
			
		},
		// 非静默
		NonSilentLogin(){
			// const local01 = window.location.href
			if(this.d_status != 2){
				 location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ config.appid +'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/coupon/coupon') + '&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
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
					// this.getShopCustomerCouponList()
					this.getShopCouponList()
					this.getCumstomerInfo()
				}
				
			}
			
		},
    }
}
</script>
<style lang="scss" scoped>
//选项卡
page{
	background:#eeeeee;
}
.mask {
	position: fixed;
	top:0;
	left:0;
	z-index:999;
	width:100%;
	height:100vh;
	background:rgba(0,0,0,0.7);
	.QRCodeImg{
		margin:0 auto;
		margin-top:100upx;
		width:592upx;
		height:670upx;
		img{
			width:100%;
			height:100%;
		}
	}
	.getShareWeb{
		margin:0 auto;
		margin-top:60upx;
		width:100upx;
		height:100upx;
		display:flex;
		justify-content: center;
		align-items: center;
		background:#FFFFFF;
		border-radius: 50%;
		img{
			width:100%;
			height:100%;
		}
	}
	.getShareWebWord{
		margin:0 auto;
		margin-top:30upx;
		font-size:30upx;
		text-align: center;
		color:#FFFFFF;
	}
}
.getCoupon{
	width:100%;
	height: 100%;
	padding:0upx 20upx;
	.getCouponBox{
		width:100%;
		height:200upx;
		border-radius:20upx 20upx 20upx 20upx;
		margin-bottom: 20upx;
		position:relative;
		img{
			width:100%;
			height:100%;
		}
		.leftMoney1{
			position:absolute;
			top:40upx;
			left:20upx;
			text:first-child{
				font-size:24upx;
				color:#FFFFFF;
			}
			text:last-child{
				font-size:48upx;
				margin-left:5upx;
				color:#FFFFFF;
			}
		}
		.leftLimit1{
			position:absolute;
			bottom:40upx;
			left:20upx;
			text{
				font-size:28upx;
				color:#FFFFFF;
			}
		}
		.rightInfo1{
			position:absolute;
			width:420upx;
			height:128upx;
			top:0;
			right:30upx;
			border-bottom: 1px dashed #e5e5e5;
			display: flex;
			.rightInfoTitle{
				display: block;
				width:260upx;
				font-size: 28upx;
				color:#1f95ff;
				font-weight: 600;
				margin-top:35upx;
			}
			.rightInfoTitle1{
				display: block;
				width:260upx;
				font-size: 28upx;
				color:#666666;
				font-weight: 600;
				margin-top:35upx;
			}
			.haveUse{
				position:absolute;
				right:-30upx;
				width:112upx;
				height:66upx;
				top:0;
				img{
					width:100%;
					height:100%;
				}
			}
			.rightButton{
				width:160upx;
				.toGet{
					width:150upx;
					border: 2px solid #eeeeee;
					height:46upx;
					margin-top:34upx;
					margin-left:5upx;
					border-radius: 20upx 20upx 20upx 20upx;
					display: flex;
					justify-content: center;
					align-items: center;
					text{
						font-size:22upx;
						color:#686868;
						font-weight: 700;
					}
				}
			}
		}
		.rightBottom1{
			width:420upx;
			right:30upx;
			position:absolute;
			bottom:18upx;
			text{
				font-size:22upx;
				color: #999999;
			}
		}
	}
}
//优惠券=样式
.box{
	width:100%;
	height: 100%;
	margin-top:30upx;
	padding:0upx 20upx;
	.coupon-box{
		width:100%;
		height:200upx;
		border-radius:20upx 20upx 20upx 20upx;
		margin-bottom: 20upx;
		position:relative;
		img{
			width:100%;
			height:100%;
		}
		// .couponImg{
		// 	position:relative;
		// }
		.leftMoney{
			position:absolute;
			top:40upx;
			left:20upx;
			text:first-child{
				font-size:24upx;
				color:#FFFFFF;
			}
			text:last-child{
				font-size:48upx;
				margin-left:5upx;
				color:#FFFFFF;
			}
		}
		.leftLimit{
			position:absolute;
			bottom:40upx;
			left:20upx;
			text{
				font-size:28upx;
				color:#FFFFFF;
			}
		}
		.rightInfo{
			position:absolute;
			width:420upx;
			height:128upx;
			top:0;
			right:30upx;
			border-bottom: 1px dashed #e5e5e5;
			display: flex;
			.rightInfoTitle{
				display: block;
				width:260upx;
				font-size: 28upx;
				color:#1f95ff;
				font-weight: 600;
				margin-top:35upx;
			}
			.rightInfoTitle1{
				display: block;
				width:260upx;
				font-size: 28upx;
				color:#666666;
				font-weight: 600;
				margin-top:35upx;
			}
			.haveUse{
				position:absolute;
				right:-30upx;
				width:112upx;
				height:66upx;
				top:0;
				img{
					width:100%;
					height:100%;
				}
			}
			.rightButton{
				width:160upx;
				.toUse{
					width:150upx;
					border: 2px solid #eeeeee;
					height:46upx;
					margin-top:16upx;
					margin-left:5upx;
					border-radius: 20upx 20upx 20upx 20upx;
					display: flex;
					justify-content: center;
					align-items: center;
					text{
						font-size:22upx;
						color:#686868;
						font-weight: 700;
					}
				}
				.toShare{
					width:150upx;
					border: 2px solid #eeeeee;
					height:46upx;
					margin-left:5upx;
					margin-top:10upx;
					border-radius: 20upx 20upx 20upx 20upx;
					display: flex;
					justify-content: center;
					align-items: center;
					text{
						font-size:22upx;
						color:#686868;
						font-weight: 700;
					}
				}
			}
		}
		.rightBottom{
			width:420upx;
			right:30upx;
			position:absolute;
			bottom:18upx;
			text{
				font-size:22upx;
				color: #999999;
			}
		}
		.coupon-title{
			display:flex;
			justify-content: space-between;
			height:69upx;
			background:#fff;
			border-radius:20upx 20upx 0 0;
			.coupon-title-left{
				line-height:0;
				margin-top:19upx;
				img{
					width:34upx;
					height:34upx;
					margin-left:23upx;
				}
				text{
					font-size:30upx;
					font-weight:600;
					color:#666666;
					margin-left:14upx;
				}
			}
			.coupon-title-right{
				font-weight:600;
				font-size:28upx;
				color:#ec373e;
				margin-top:18upx;
				margin-right:23upx;
			}
		}
		.coupon-card{
			width:100%;
			height:160upx;
			display:flex;
			background:#fff;
			.coupon-card-left{
				width:73.5%;
				height:160upx;
				background:#fff6ee;
				border-radius:20upx 20upx 20upx 20upx;
				margin-left:20upx;
				display:flex;
				.coupon-card-left-img{
					height:160upx;
					display:flex;
					align-items:center;
					img{
						width:120upx;
						height:120upx;
						margin-left:20upx;
					}
				}
				.coupon-card-left-text{
					p:first-child{
						margin-top:21upx;
						font-size:35upx;
						font-weight:500;
						color:#f49c17;
						text:first-child{
							font-size:23upx;
							color:#444444;
							margin-left:13upx;
							margin-right:3upx;
						}
						text:last-child{
							font-size:23upx;
							font-weight:500;
							margin-left:10upx;
						}
					}
					p:nth-child(2){
						font-size:23upx;
						font-weight:500;
						color:#9a9997;
						margin:0 0 0 13upx;
					}
					p:last-child{
						font-size:25upx;
						font-weight:700;
						margin:10upx 0 0 -20upx;;
						color:#9a9997;
						transform:scale(0.8,0.8);  
						white-space: nowrap;
					}
				}
			}
			.coupon-card-right{
				width:21.5%;
				height:160upx;
				background:#fff6ee;
				border-radius:20upx 20upx 20upx 20upx;
				margin-right:20upx;
				z-index:5;
				display:flex;
				justify-content:center;
				align-items: center;
				p{
					font-size:30upx;
					font-weight:600;
					color:#f49c17;
				}
			}
		}
		.coupon-fill{
			height:10upx;
			background:#fff;
		}
		.coupon-big-fill{
			height:22upx;
			background:#fff;
			border-radius:0upx 0upx 20upx 20upx;
		}
	}

}







//下方悬浮	
.share-box{
	width:180upx;
	height: 56upx;
	border:2px solid #369eff;
	border-left: 0;
	border-bottom-right-radius: 40upx;
	border-top-right-radius: 40upx;
	text-align: center;
	line-height: 50upx;
	background:#ffffff;
	color:#369eff;
	font-size: 24upx;
	position: fixed;
	bottom:100upx;
	z-index: 10;
}
.goCoupon{
	width:180upx;
	height: 56upx;
	border:2px solid #ec373e;
	border-right: 0;
	border-bottom-left-radius: 40upx;
	border-top-left-radius: 40upx;
	text-align: center;
	line-height: 50upx;
	color:#ec373e;
	font-size: 24upx;
	position: fixed;
	bottom:100upx;
	background:#ffffff;
	right: 0;
	z-index: 10;
}
//没有优惠券的样式
.none{
	width:100%;
	height:700upx;
	text-align: center;
	image{
		width:100upx;
		height: 100upx;
		margin-top:198upx;
	}
	view{
		color:#999999;
		font-size:26upx;
		line-height: 86upx;
	}
}
</style>
