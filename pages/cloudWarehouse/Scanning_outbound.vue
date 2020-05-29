<template>
	<view>
	<view class="scan_box">
		<view class="scan">
			<view class="scan_search">
				<input type="text" value="" v-model="key_word" placeholder="请输入姓名或联系方式" />
				<view class="" @click="getMyAgentList">搜索</view>
			</view>
			<view class="shop_Goods_item_box" v-for="(item,index) in MyAgentList" :key="index">
				<view class="shop_Goods_item">
					<image :src="item.user_headimgurl" mode=""></image>
					<view class="message">
						<view class="name">姓名：{{item.truename}}</view>
						<p>联系方式：<text>{{item.phone}}</text></p>
						<view class="lv">
							<p>等级：{{item.shop_distribution_level.distribution_level_name}}</p>
							<view @click="goSanCodeChanges(item)">扫码</view>
						</view>
					</view>
				</view>
			</view>
		</view>
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
			this.getMyAgentList()
		},
		onPullDownRefresh() {//下拉刷新
			this.getMyAgentList()
		},
		data() {
			return {
				key_word:'',
				MyAgentList:[]
			};
		},
		methods:{
			getMyAgentList(){//模糊搜索
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/getMyAgentList",
					method: 'POST',
					data:{
						key_word:this.key_word
					},
					header: {
						'shop': "1",
						'Authorization':warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.MyAgentList = res.data.data
							uni.stopPullDownRefresh();
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
			goSanCodeChanges(item){
				uni.navigateTo({
					url:'/pages/cloudWarehouse/ScanCodeChanges?customer_id=' + item.customer_id + '&truename=' + item.truename
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.scan_box{
	width:100%;
	height: 100%;
	padding: 30upx 10upx 100upx;
	.scan{
		width:100%;
		height: 100%;
		background: #fff;
		border-radius: 20upx;
		overflow: hidden;
		.scan_search{
			width:100%;
			height: 160upx;
			border-bottom: 4upx solid #f3f3f3;
			padding:60upx 72upx;
			display: flex;
			justify-content: space-between;
			input{
				width:420upx;
				height: 48upx;
				background: #eeeeee;
				border: 1px solid #bfbfbf;
				font-size: 24upx;
				line-height: 48upx;
				padding-left: 28upx;
			}
			view{
				width:132upx;
				height: 42upx;
				margin-top: 6upx;
				background-color: #0189ff;
				font-size: 26upx;
				color:#fff;
				text-align: center;
				border-radius: 10upx;
				line-height: 44upx;
			}
		}
	}
}
.shop_Goods_item_box{
	width:100%;
	padding: 0 48upx;
	.shop_Goods_item{
		width:100%;
		height: 242upx;
		border-bottom: 1px solid #f2f2f2;
		padding: 30upx 24upx;
		display: flex;
		justify-content:space-between;
		image{
			width:182upx;
			height: 182upx;
			border-radius: 10upx;
		}
		.message{
			width:370upx;
			height: 182upx;
			.name{
				line-height: 74upx;
				font-size: 28upx;
				color:#333333;
			}
			p{
				width:100%;
				font-size: 28upx;
				color:#333333;
				line-height: 50upx;
				text{
					color:#8ec9f5;
				}
			}
			.lv{
				display: flex;
				justify-content: space-around;
				align-items: center;
				view{
					width:80upx;
					height: 32upx;
					background: #54aefc;
					font-size: 22upx;
					color:#fff;
					text-align: center;
					line-height: 36upx;
					border-radius: 6upx;
				}
			}
		}
	}
}
</style>
