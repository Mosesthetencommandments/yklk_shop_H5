<template>
	<view>
		<!-- #ifdef H5 -->
		<view class="box">
			<view class="scancode">
				<view class="left">
					<image src="../../static/images/qie_0001_上传照片.png" mode="" @click="useScan"></image>
				</view>
				<view class="right" v-show="isShow">
					<p>商品名称：{{ScanInfo.agent_goods.goods_name}}</p>
					<!-- <p>原归属：{{ScanInfo.customer_shop.truename}}</p> -->
					<p>数量：{{totalNum}}</p>
					<p>变更为：{{d_truename}}</p>
					<view class="submit" @click="changeGoodsCustomer">
						<p>变更</p>
					</view>
				</view>
			</view>
		</view>
		<tabbarItem></tabbarItem>
		<!-- #endif -->
	</view>
</template>

<script>
	import jweixin from "jweixin-module"
	import config from '../../common/config.js';
	import tabbarItem from "../../components/WarehouseTabbar/tabbar.vue"
	export default {
		components:{
			tabbarItem
		},
		onLoad(option) {
			this.d_truename = option.truename
			this.new_customer_id = option.customer_id	
		},
		data() {
			return{
				wx_info:{
					appId:null,
					nonceStr:null,
					rawString:null,
					signature:null,
					timestamp:null,
					url:null,
				},
				d_truename:null,
				new_customer_id:null,
				isShow:false,
				isClick:false,
				parameter:{
					type:null,
					id:null,
					goods_id:null
				},
				ScanInfo:{
					agent_goods:{},
					customer_shop:{}
				},
				number:0,
				bigArr:[],
				smallArr:[],
			}
		},
		computed: {
			totalNum: {
				get() {
					let num_total = 0
					num_total += this.number
					return (Math.round((num_total) * 100) / 100);
				}
			},
		},
		methods:{
			useScan(){
				var jweixin = require('jweixin-module')
				this.getWXInfo()
			},
			async getWXInfo(){
				uni.showLoading({
				    title: '加载中'
				});
				let [err,res] = await this.$http.post('/api/shop/getWxConf',{
					url:window.location.href.split('#')[0] 
				});
				if(res.data.code == 200){
					this.wx_info.appId = res.data.data.appId
					this.wx_info.nonceStr =  res.data.data.nonceStr
					this.wx_info.rawString = res.data.data.rawString
					this.wx_info.signature = res.data.data.signature
					this.wx_info.timestamp = res.data.data.timestamp
					this.wx_info.url = res.data.data.url
					jweixin.config({
					  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					  appId: this.wx_info.appId, // 必填，公众号的唯一标识
					  timestamp:this.wx_info.timestamp , // 必填，生成签名的时间戳
					  nonceStr: this.wx_info.nonceStr, // 必填，生成签名的随机串
					  signature: this.wx_info.signature,// 必填，签名
					  jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
					});
					uni.hideLoading()
					jweixin.ready(()=> {
						jweixin.scanQRCode({
							needResult : 1,
							scanType : [ "qrCode","barCode"],
							success : res => {
								this.parameter.type = res.resultStr.split('&')[0].split('=')[1]
								this.parameter.goods_id = res.resultStr.split('&')[1].split('=')[1]
								this.parameter.id = res.resultStr.split('&')[2].split('=')[1]
								
								this.wxScanInfo()//详情
							}
						});
					});
				}
			},
			changeGoodsCustomer(){//变更
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/changeGoodsCustomer",
					method: 'POST',
					data:{
						goods:this.smallArr,
						new_customer_id:this.new_customer_id
					},
					header: {
						'shop': "1",
						'Authorization':warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							uni.showToast({title:'变更成功',icon:'none'})
							setTimeout(()=>{
								uni.navigateBack({
								    delta: 1
								});
							},1000)
						}else if (res.data.errcode === 44) {
							uni.showToast({title: "请重新登录",icon: 'none'})
							setTimeout(() => {
								uni.redirectTo({
									url: '../../pages/cloudWarehouse/warehouseLogin'
								});
							}, 1000)
						} else {
							uni.showToast({title: res.data.errstr,icon: 'none'})
						}
					}
				})
			},
			wxScanInfo(){//详情
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/wxScanInfo",
					data:{
						type:this.parameter.type,
						id:this.parameter.id,
						gooods_id:this.parameter.gooods_id,
						// type:'box',
						// id:44,
					},
					method: 'POST',
					header:{
						shop:1
					},
					success: (res) => {
						if (res.data.code == 200) {
							if(res.data.data.type === 'item'){
								this.number = this.number + 1
								this.ScanInfo = res.data.data
								this.isShow = true
								this.smallArr.push({
									id:res.data.data.id,
									type:res.data.data.type,
									goods_id:res.data.data.goods_id
								})
								// this.bigArr.push(this.smallArr1)
								console.log(this.smallArr)
							}else{
								this.number = this.number + res.data.data.item_number
								this.ScanInfo = res.data.data
								this.isShow = true
								this.smallArr.push({
									id:res.data.data.id,
									type:res.data.data.type,
									goods_id:res.data.data.goods_id
								})
								// this.bigArr.push(this.smallArr)
								console.log(this.smallArr)
							}
							uni.showToast({title:'扫码成功',icon:'none'})
							setTimeout(()=>{
								this.getWXInfo()
							},1000)
							// setTimeout(()=>{
							// 	this.wxScanInfo()
							// },10000)
							uni.stopPullDownRefresh();
						} else {
							uni.showToast({title: res.data.errstr,icon: 'none'})
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
.box{
	width:100%;
	height: 600upx;
	padding:30upx 30upx 0;
	.scancode{
		width:100%;
		height: 326upx;
		background: #fff;
		border-radius: 30upx;
		box-shadow: 0 0 10upx #e5e5e7;
		padding: 90upx 50upx 0 80upx;
		display: flex;
		justify-content: space-between;
		.left{
			width: 198upx;
			height: 146upx;
			background: #007AFF;
			image{
				width:100%;
				height: 100%;
			}
		}
		.right{
			width:290upx;
			height: 220upx;
			font-size: 24upx;
			color:#353535;
			font-weight: 600;
			p{
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				line-height: 40upx;
			}
			p:nth-child(1){
				margin-top: 10upx;
			}
			.submit{
				width:100%;
				height: 42upx;
				display: flex;
				flex-direction:row-reverse;
				margin-top:30upx;
				p{
					margin-top: 0;
					width:112upx;
					height: 42upx;
					background-color:#4881d8 ;
					font-weight: 400;
					text-align: center;
					line-height: 44upx;
					color:#fff;
					font-size: 24upx;
					border-radius: 8upx;
				}
			}
		}
	}
}
</style>
