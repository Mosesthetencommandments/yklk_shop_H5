<template>
	<view>
		<view class="box">
			<view class="Mine_header">
				<view class="Mine_header_left"><image :src="d_warehouseUserinfo.user_headimgurl" mode=""></image></view>
				<view class="Mine_header_right">
					<p>名字：{{d_warehouseUserinfo.truename}}</p>
					<p>等级：{{d_warehouseUserinfo.distribution_level_name}}</p>
					<p>上级领导人：{{d_warehouseUserinfo.parentName}}</p>
					<p>我的代理数：{{d_warehouseUserinfo.my_agent_number}}</p>
					<p>我的进货数量：{{d_warehouseUserinfo.my_goods_in_number}}</p>
					<!-- <p>编辑我的资料></p> -->
				</view>
			</view>
			<view class="button_box">
				<view class="" @click="isClick = true">生成我的授权码</view>
				<view class="" @click="goMyApproval">我的审批</view>
				<view class="" @click="goScanning">扫码出货</view>
			</view>
			<view class="d_button_box">
				<!-- 选项卡 -->
				<view class="" v-for="(item,index) in examineApprove" :key="index">
					<view class="vip d_button" @click="getMyAgentList(item,index)"  >{{item.distribution_level_name}}</view>
					<view class="" v-for="(items,indexs) in MyAgentList" :key="indexs" v-if="index == number && item.isShow === true">
						<view class="customerInformation" >
							<view class="customerInformation_item">
								<image :src="items.user_headimgurl" mode=""></image>
								<view class="customerInformation_title">
									<p>名字：{{items.truename}}</p>
									<p>进货数量：{{items.my_goods_number}}</p>
									<p>联系方式：{{items.phone}}</p>
								</view>
								<view class="customerInformation_submit" @click="goDialTheCargo(items)">
									拨货
								</view>
							</view>
						</view>
					</view>
				</view>	
			</view>
			<!-- 弹出 -->
			<view class="select_box" v-if="isClick">
				<view class="select">
					<view class="select_title">请选择发展级别：</view>
					<view class="select_content">
						<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="frame">
							<view>{{array[index]}}</view>
							<view><image src="../../static/images/qie01_0005__2.png" mode=""></image></view>
						</view>
						</picker>
					</view>
					<view class="select_bottom">
						<view @click="isClick = false">取消</view>
						<view @click="goAuthorizedPosters(index)">确定</view>
					</view>
				</view>
				<!-- <view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view> -->
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
			this.getCustomerAgentInfo()
			this.getMyDistributionLevelList()
		},
		onPullDownRefresh() {//下拉刷新
			this.getCustomerAgentInfo()
			this.getMyDistributionLevelList()
		},
		data() {
			return {
				isShow:false,
				isClick:false,
				array: [],
				index: 0,
				d_warehouseUserinfo:{},
				examineApprove:[],
				MyAgentList:[],
				number:0,
				distribution_level_id:null
			};
		},
		methods:{
			ceshi(index){
				this.number = index
			},
			bindPickerChange(e){
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value       
			},
			getCustomerAgentInfo(){//个人信息
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/getCustomerAgentInfo",
					method: 'POST',
					header: {
						'shop': "1",
						'Authorization':warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.d_warehouseUserinfo = res.data.data
							console.log(this.d_warehouseUserinfo)
							uni.stopPullDownRefresh();
						}else{
							uni.showToast({title:res.data.errstr,icon:'none'})
						}
					}
				})
			},
			getMyDistributionLevelList(){//获取我能发展的下级
				const wx_open_id = uni.getStorageSync('wx_open_id');
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/getMyDistributionLevelList",
					method: 'POST',
					data:{
						wx_open_id:wx_open_id
					},
					header: {
						'shop': "1",
						'Authorization':warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							console.log(res.data.data)
							this.examineApprove = res.data.data
							for(let i = 0; i < this.examineApprove.length; i++){
								this.array.push(this.examineApprove[i].distribution_level_name)
								this.examineApprove[i].isShow = false
							}
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
			getMyAgentList(item,index){//获取我的下级
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/getMyAgentList",
					method: 'POST',
					data:{
						distribution_level_id:item.id
					},
					header: {
						'shop': "1",
						'Authorization':warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.MyAgentList = res.data.data
							console.log(this.MyAgentList)
							if(item.isShow === true){
								item.isShow = false
								return
							}
							for(let i = 0 ; i<this.examineApprove.length ;i++){
								this.examineApprove[i].isShow = false
							}
							this.number = index

							item.isShow = true
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
			goAuthorizedPosters(index){
				for(let i= 0; i < this.examineApprove.length; i++){
					this.distribution_level_id = this.examineApprove[index].id
				}
				uni.redirectTo({
					url:'../../pages/cloudWarehouse/AuthorizedPosters?distribution_level_id=' + this.distribution_level_id
				})
			},
			goMyApproval(){
				uni.redirectTo({
					url:'../../pages/cloudWarehouse/MyApproval'
				})
			},
			goDialTheCargo(items){
				console.log(items)
				uni.redirectTo({
					url:'../../pages/cloudWarehouse/DialTheCargo?customer_id=' + items.customer_id + '&truename=' +items.truename
				})
			},
			goScanning(){
				uni.redirectTo({
					url:'../../pages/cloudWarehouse/Scanning_outbound' 
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #fff;
	}
.box{padding-bottom: 100upx;}
.Mine_header{
	width:100%;
	height: 354upx;
	background: #53affc url(../../static/images/qie01_0000_lang2.png) no-repeat 20upx 60upx;
	background-size: 730upx 300upx;
	display: flex;
	justify-content: space-between;
	padding: 54upx 58upx;
	.Mine_header_left{
		width:212upx;
		height: 212upx;
		border-radius: 100%;
		overflow: hidden;
		margin-right: 46upx;
		image{
			width:100%;
			height: 100%;
		}
	}
	.Mine_header_right{
		width: 366upx;
		height: 100%;
		font-size: 26upx;
		color:#ffffff;
		line-height: 38upx;
		p:first-child{
			margin-top:4upx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		p:nth-child(3){
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		// p:last-child{
		// 	margin-top: 14upx;
		// 	text-align: right;
		// }
	}
}
.button_box{
	width:100%;
	height: 100%;
	// background-color: #007AFF;
	overflow: hidden;
	view:first-child{
		margin-top:30upx;
	}
	
	view{
		width:650upx;
		height: 64upx;
		background: #53affc;
		border-radius:10upx;
		text-align: center;
		margin:0 auto;
		margin-bottom: 20upx;
		color:#fff;
		line-height: 64upx;
		font-size: 30upx;
		font-weight: 600;
		letter-spacing:2px;	
		box-shadow: 0 0 10 #d3d5ff;
	}
	view:nth-child(3){
		margin-bottom: 60upx;
	}
}
.d_button_box{
	width:100%;
	height: 100%;
	.d_button{
		width:650upx;
		height: 64upx;
		background: #53affc;
		border-radius: 10upx;
		text-align: center;
		margin:0 auto;
		margin-bottom: 20upx;
		color:#fff;
		line-height: 64upx;
		font-size: 30upx;
		font-weight: 600;
		letter-spacing:2px;	
		box-shadow: 0 0 10 #d3d5ff;
	}
	.vip{
		
	}
	.customerInformation{
		width:650upx;
		height: 100%;
		border-radius: 0;
		margin:0 auto;
		.customerInformation_item{
			width:100%;
			height: 116upx;
			background: #fff;
			border-radius: 16upx;
			padding: 6upx 28upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10upx;
			box-shadow: 0 0 10 #d3d5ff;
			image{
				width:104upx;
				height: 104upx;
				border-radius: 100%;
			}
			.customerInformation_title{
				width:300upx;
				// height: 100%;
				border-radius: 0;
				font-size: 24upx;
				color:#2d2d2d;
				line-height: 34upx;
				text-align: left;
				font-weight: 500;
				letter-spacing:0;
				p{
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
			.customerInformation_submit{
				width:100upx;
				height: 40upx;
				text-align: center;
				color:#fff;
				background: #53affc;
				font-size: 24upx;
				border-radius: 10upx;
				line-height: 40upx;
				margin:0;
			}
		}
	}
}
//弹出
.select_box{
	z-index: 400;
	width:100vw;
	height: 100vh;
	background: rgba(0,0,0,.5);
	position: fixed;
	left:0;
	top:0;
	display: flex;
	align-items: center;
	justify-content: center;
	.select{
		width:606upx;
		height: 372upx;
		background: #fff;
		overflow: hidden;
		border-radius: 40upx;
		.select_title{
			width:100%;
			height: 126upx;
			// background: #007AFF;
			text-align: center;
			line-height: 126upx;
			font-size: 34upx;
			font-weight: 600;
		}
		.select_content{
			width:100%;
			height: 158upx;
			border-bottom: 2px solid #dcdcdc;
			overflow: hidden;
			.frame{
				width:480upx;
				height: 76upx;
				border:4upx solid #dcdcdc;
				margin:0 auto;
				margin-top:14upx;
				background: #f7f7f7;
				display: flex;
				justify-content: space-between;
				line-height: 76upx;
				padding-left: 24upx;
				view:first-child{
					font-size: 30upx;
					color:#444444;
					font-weight: 600;
				}
				view:last-child{
					width:74upx;
					height: 74upx;
					// background: #00B26A;
					display: flex;
					align-items: center;
					justify-content: center;
					border-left: 4upx solid #dcdcdc;
					image{
						width:18upx;
						height: 32upx;
						transform:rotate(90deg);
					}
				}
			}
		}
	}
}
.select_bottom{
	width:100%;
	height: 92upx;
	// background: #007AFF;
	display: flex;
	justify-content: space-between;
	view{
		width:50%;
		height: 100%;
		text-align: center;
		line-height: 92upx;
		font-size: 34upx;
		color:#1b1b1b;
		font-weight: 600;
	}
	view:last-child{
		background: #53affc;
		color: #fff;
	}
}
</style>
