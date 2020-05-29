<template>
	<view>
		<view class="box">
			<view class="myApproval_shopgods_item_box" v-for="(item,index) in mySubmit" :key='index'>
				<view class="myApproval_shopgods_item">
					<view class="created_time">
						进货时间：{{item.created_at}}
					</view>
					<view class="myApproval_shopgods_item_d">
						<view class="item_left">
							<img src="../../static/images/12.jpg" mode=""></img>
						</view>
						<view class="item_right">
							<view>商品名称：{{item.agent_goods.goods_name}}</view>
							<view>进货数量：{{item.number}}</view>
							<view>货款：{{Math.round((item.number * item.price) * 100) / 100}}</view>
							<view class="opinion" v-if="item.status === 1">已同意</view>
							<view class="opinion1" v-if="item.status === 2">已拒绝</view>
							<view class="opinion2" v-if="item.status === 3">待审批</view>
						</view>
					</view>
				</view>
			</view>
			<view class="loading" v-if="isCD">加载中...</view>
			<view class="loading" v-else>我是有底线的...</view>
		</view>
		<tabbarItem></tabbarItem>
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
			this.MySubmitted()
		},
		onReachBottom() {//上拉加载更多
			this.MySubmitted()//商品列表
		},
		onPullDownRefresh() {//下拉刷新
			this.MySubmitted()
		},
		data() {
			return {
				mySubmit:[],
				d_page:{
					page:1,
					page_size:6
				},
				getMore:true,
				isCD:false
			};
		},
		methods:{
			MySubmitted(){
				if(this.getMore === false){
					uni.stopPullDownRefresh() 
					return false;
				}
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/getMyAgentGoodsApprovalList",
					method: 'POST',
					data:{
						// i_sub_status:1,
						type:1,
						page:this.d_page.page,
						page_size:this.d_page.page_size
					},
					header: {
						'shop': "1",
						'Authorization': warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.isCD = true
							if (res.data.data.current_page === res.data.data.last_page) {
								this.isCD = false
								this.getMore = false
							}
							this.d_page.page++
							let list = []
							list = res.data.data.data
							this.mySubmit = this.mySubmit.concat(list)
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

<style lang="scss" scoped>
	.loading{
		width:100%;
		height: 100upx;
		text-align: center;
		line-height: 100upx;
		font-size: 24upx;
		color: #999999;
		// margin-bottom: 100upx;
	}
.box{
	padding:20upx 0 100upx;
}
.myApproval_shopgods_item_box{
	width:100%;
	height: 100%;
	padding:10upx 30upx;
	
}
.myApproval_shopgods_item{
	width:100%;
	height: 200upx;
	background: #fff;
	border-radius: 20upx;
	padding:0 38upx;
	.created_time{
		 font-size: 18upx;
		 line-height: 40upx;
		 color:#4a4957;
	}
}
.myApproval_shopgods_item_d{
	display: flex;
	justify-content: space-between;
	// padding:18upx 30upx 0 30upx;
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
		width:440upx;
		height: 100%;
		text-align: left;
		position: relative;
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
			position: absolute;
			right:0;
			top:0;
			// margin-left:340upx ;
			// width:100upx;
			font-size: 24upx;
			color:#74bdff;
			// margin-top:-40upx;
		}
		.opinion1{
			position: absolute;
			right:0;
			top:0;
			// margin-left:340upx ;
			// width:100upx;
			font-size: 24upx;
			color:#ff4443;
			// margin-top:-40upx;
		}
		.opinion2{
			position: absolute;
			right:0;
			top:0;
			// margin-left:340upx ;
			// width:100upx;
			font-size: 24upx;
			color:#F0AD4E;
			// margin-top:-40upx;
		}
	}
}
</style>
