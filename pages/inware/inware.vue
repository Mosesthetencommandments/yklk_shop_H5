<template>
	<view>
		<view class="box">
			<view class="message">
				<view><text>商品名称</text>  {{ScanInfo.agent_goods.goods_name}}</view>
				<view><text>商品所有者</text>  {{ScanInfo.customer_shop.truename}}</view>
				<view><text>防伪码</text>  {{ScanInfo.code}}</view>
				<view><text>扫描次数</text>  {{ScanInfo.scan_number}}</view>
				<view><text>录入时间</text>  {{ScanInfo.last_time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		onLoad(option) {
			this.parameter.type = option.type
			this.parameter.id = option.id
			this.parameter.goods_id = option.id
			this.wxScanInfo()
		},
		onPullDownRefresh() {//下拉刷新
			this.wxScanInfo()
		},
		data() {
			return {
				ScanInfo:{
					agent_goods:{},
					customer_shop:{}
				},
				parameter:{
					type:null,
					id:null,
					goods_id:null
				}
			};
		},
		methods:{
			wxScanInfo(){
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/wxScanInfo",
					data:{
						type:this.parameter.type,
						id:this.parameter.id,
						gooods_id:this.parameter.gooods_id
					},
					method: 'POST',
					header:{
						shop:1
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.ScanInfo = res.data.data
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

<style lang="scss" scoped>
.box{
	width:100%;
	height: 700upx;
	padding: 30upx 30upx;
	.message{
		width:100%;
		height: 326upx;
		background: #fff;
		border-radius: 20upx;
		box-shadow: 0 0 10upx #e2e2e2;
		padding: 54upx 108upx;
		view{
			width:100%;
			height: 46upx;
			line-height: 46upx;
			font-size: 24upx;
			color:#333333;
			text:nth-child(1){
				width:150upx;
				display: inline-block;
				color:#5aacff;
				margin-right: 30upx;
				text-align: right;
			}
		}
	}
}
</style>
