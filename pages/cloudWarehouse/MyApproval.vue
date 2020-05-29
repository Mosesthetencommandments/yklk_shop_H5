<template>
	<view>
		<!-- #ifdef H5-->
		<view class="myApproval_box">
			<view class="myApproval_title" @click="isApproval = !isApproval">
				待审批
			</view>
			<view class="myApproval_shopgods_item_box" v-if="isApproval">
				<view class="myApproval_shopgods_item" v-for="(item,index) in GoodsApprovalList" :key="index">
					<view class="item_left">
						<img :src="item.agent_goods.goods_image" mode=""></img>
						<view class="">{{item.name}}</view>
					</view>
					<view class="item_right">
						<view>您的代理进货：{{item.agent_goods.goods_name}}</view>
						<view>进货数量：{{item.number}}</view>
						<view>货款：{{Math.round((item.number * item.price) * 100) / 100}}</view>
						<p>
							<view @click="updateAgentGoodsAgreeApproval(item,status=1)">同意</view>
							<view @click="updateAgentGoodsAgreeApproval(item,status=2)">拒绝</view>
						</p>
					</view>
				</view>
			</view>
			<view class="myApproval_title" @click="isApproval1 = !isApproval1">
				已审批
			</view>
			<view class="myApproval_shopgods_item_box" v-if="isApproval1">
				<view class="myApproval_shopgods_item" v-for="(item,index) in ExaminedApproved" :key="index">
					<view class="item_left">
						<img :src="item.agent_goods.goods_image" mode=""></img>
						<view class="">{{item.name}}</view>
					</view>
					<view class="item_right">
						<view>您的代理进货：{{item.agent_goods.goods_name}}</view>
						<view>贷款：{{Math.round((item.number * item.price) * 100) / 100}}</view>
					</view>
				</view>
			</view>
			<!-- <view class="myApproval_title" @click="isMySubmitted = !isMySubmitted">
				我提交的
			</view>
			<view class="myApproval_shopgods_item_box" v-if="isMySubmitted">
				<view class="myApproval_shopgods_item" v-for="(item,index) in mySubmit" :key="index">
					<view class="item_left">
						<img src="../../static/images/12.jpg" mode=""></img>
					</view>
					<view class="item_right">
						<view>进货商品：{{item.agent_goods.goods_name}}</view>
						<view>进货数量：{{item.number}}</view>
						<view>贷款：{{Math.round((item.number * item.price) * 100) / 100}}</view>
						<view class="opinion" v-if="item.status === 1">已同意</view>
						<view class="opinion1" v-if="item.status === 2">已拒绝</view>
						<view class="opinion2" v-if="item.status === 3">待审批</view>
					</view>
				</view>
			</view> -->
		</view>
		<tabbarItem></tabbarItem>
		<!-- #endif -->
	</view>
</template>

<script>
	import config from '../../common/config.js';
	import tabbarItem from "../../components/WarehouseTabbar/tabbar.vue"
	export default {
		components:{
			tabbarItem
		},
		onLoad() {
			this.getCertificate()
			this.MySubmitted()
		},
		onPullDownRefresh() {//下拉刷新
			this.getCertificate()		
			this.MySubmitted()
		},
		// onReachBottom() {//上拉加载更多
		// 	this.getCertificate()	
		// },
		data() {
			return {
				GoodsApprovalList:[],//待审批
				ExaminedApproved:[],//已审批
				parameterInfo:{
					type:1,
					approval_id:null,
					status:1,
					number:null,
					goods_id:null,
					customer_id:null
				},
				d_page:{
					page:1,
					page_size:1000
				},
				// isShow:true,
				// isSShow:true,
				getMore:true,//判断上拉加载的数量
				isApproval:true,
				isApproval1:false,
				isMySubmitted:false,
				mySubmit:[]
				
			};
		},
		methods:{
			getCertificate(){//审批记录列表
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/getAgentGoodsApprovalList",
					method: 'POST',
					data: {
						type:1,
						status:3	
					},
					header: {
						'shop': "1",
						'Authorization': warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.GoodsApprovalList = res.data.data
							uni.stopPullDownRefresh();
						} else if (res.data.errcode === 44) {
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
				// if(this.getMore === false){
				// 	uni.stopPullDownRefresh() 
				// 	return;
				// }
				uni.request({
					url: config.webUrl + "/api/agent/getAgentGoodsApprovalList",
					method: 'POST',
					data: {
						type:1,
						status:1,
						page:this.d_page.page,
						page_size:this.d_page.page_size
					},
					header: {
						'shop': "1",
						'Authorization': warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							console.log(res)
							// if(res.data.data.total > 6){
							// 	if (res.data.data.current_page > res.data.data.last_page) {
							// 		this.getMore = false
							// 		return
							// 	}	
							// 	this.d_page.page++
							// 	let list = []
							// 	list = res.data.data.data
							// 	// console.log(list)
							// 	this.ExaminedApproved = this.ExaminedApproved.concat(list)
							// }else{
							// 	this.ExaminedApproved = res.data.data.data
							// }
								this.ExaminedApproved = res.data.data.data
							console.log(this.ExaminedApproved)
							uni.stopPullDownRefresh();
						} else if (res.data.errcode === 44) {
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
			updateAgentGoodsAgreeApproval(item,status){//更新审批状态
				console.log(item)
				if(status==1){
					this.parameterInfo.status =1
					this.parameterInfo.number = item.number
					this.parameterInfo.goods_id = item.goods_id
					this.parameterInfo.customer_id = item.customer_id
				}else{
					this.parameterInfo.status =2
					this.parameterInfo.number = item.number
					this.parameterInfo.goods_id = item.goods_id
					this.parameterInfo.customer_id = item.customer_id
				}
				this.parameterInfo.approval_id=item.id
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/updateAgentGoodsAgreeApproval",
					method: 'POST',
					data: this.parameterInfo,
					header: {
						'shop': "1",
						'Authorization': warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.getCertificate()
							this.MySubmitted()
							uni.stopPullDownRefresh();
						} else if (res.data.errcode === 44) {
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
			MySubmitted(){
				const warehouseToken = uni.getStorageSync('warehouseToken');
					uni.request({
						url: config.webUrl + "/api/agent/getAgentGoodsApprovalList",
						method: 'POST',
						data:{i_sub_status:1,type:1},
						header: {
							'shop': "1",
							'Authorization': warehouseToken
						},
						success: (res) => {
							if (res.data.code == 200) {
								console.log(res.data.data)
								this.mySubmit = res.data.data
								uni.stopPullDownRefresh();
							} else if (res.data.errcode === 44) {
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
			}
		}
	}
</script>

<style lang="scss">
.myApproval_box{
	width:100%;
	// background: #007AFF;
	padding:0 20upx;
	text-align: center;
	overflow: hidden;
	padding-top:60upx ;
	.myApproval_title{
		width:94%;
		height: 62upx;
		text-align: center;
		margin: 0 auto 40upx;
		background: #53affc;
		border-radius: 10upx;
		line-height: 62upx;
		font-size: 34upx;
		color: #fff;
		font-weight: 700;
		box-shadow: 0 0 10upx #b1b1b1; 
	}
}
.myApproval_shopgods_item_box{
	width:100%;
	height: 100%;
}
.myApproval_shopgods_item{
	width:100%;
	height: 200upx;
	background: #fff;
	border-radius: 20upx;
	display: flex;
	justify-content: space-between;
	padding:18upx 30upx 0 30upx;
	margin-bottom:20upx;
	.item_left{
		width:146upx;
		height: 182upx;
		img{
			width:146upx;
			height: 146upx;
			border-radius: 16upx;
		}
		view{
			width:146upx;
			height: 38upx;
			text-align: center;
			line-height: 40upx;
			font-size:  24upx;
			color:#494953;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
	.item_right{
		width:460upx;
		height: 100%;
		text-align: left;
		view{
			font-size: 28upx;
			color:#494b5a;
			line-height: 46upx;
			font-weight: 600;
		}
		p{
			width:100%;
			height: 36upx;
			display: flex;
			justify-content:flex-end;
			view{
				width:100upx;
				height: 36upx;
				line-height: 36upx;
				background: #53affc;
				border-radius: 10upx;
				text-align: center;
				color:#fff;
				font-size:24upx;
			}
			view:first-child{
				margin-right: 8upx;
			}
		}
		.opinion{
			margin-left:340upx ;
			width:100upx;
			font-size: 24upx;
			color:#74bdff;
		}
		.opinion1{
			margin-left:340upx ;
			width:100upx;
			font-size: 24upx;
			color:#ff4443;
		}
		.opinion2{
			margin-left:340upx ;
			width:100upx;
			font-size: 24upx;
			color:#F0AD4E;
		}
	}
}
</style>
