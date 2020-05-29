<template>
	<view>
		<view class="pickUpGoods_box">
			<view class="pickUpGoods" v-if="isAddress" @click="goAddress">
				<view class="top_box">
					<view class="address_name">
						{{receive_name}}
					</view>
					<view class="address_phone">
						{{phone}}
						<image src="../../static/images/qie01_0005__2.png" mode=""></image>
					</view>
				</view>
				<view class="detailedAddress ">
					收货地址：{{province_name}} {{city_name}} {{district_name}} {{address}}
				</view>
			</view>
			<view class="pickUpGoods" v-else  @click="goAddress">
				<view class="top_box">
					<view class="address_name">
						请填写您的收货地址
					</view>
					<view class="address_phone">
						去设置
						<image src="../../static/images/qie01_0005__2.png" mode=""></image>
					</view>
				</view>
				<!-- <view class="detailedAddress ">
					收货地址：山东省青岛市李沧区京口路100号京峰雅居
				</view> -->
			</view>
			<view class="cloudWarehose_header">
				<view class="stock_top">
					<image src="../../static/images/12.jpg" mode=""></image>
					<view class="stock_top_title">
						<p>{{goodsInfo.goods_name}}</p>
						<p>剩余库存：<text>{{stock_number}}</text> </p>
						<view class="quantityIn">
							<p>提货数量</p>
							<view class="number-box">
								<view class="count">
									<view class="reduce" :class="number === 1 ? 'noNumber':[]" @click="reduceGods">-</view>
									<!-- <view class="number">{{number}}</view> -->
									<input class="number" @blur="getNumber" type="number" :value="number"/>
									<view class="increase" @click="addGods">+</view>
								</view>
							</view>
							
					</view>
					</view>
				</view>
			</view>
			<view class="pickUpGoods_bottom">
				<view class="">
					共 <text>{{number}}</text> 件
				</view>
				<view class="" @click="createAgentGoodsRapport">
					立即提交
				</view>
			</view>
			<tabbarItem></tabbarItem>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	import tabbarItem from "../../components/WarehouseTabbar/tabbar.vue"
	export default {
		components:{
			tabbarItem
		},
		onLoad(option) {
			uni.removeStorageSync('warehouse');
			this.id = option.id
			this.stock_number  =  option.stock_number
			if(this.id !== null && this.id !== '' && this.id !== undefined){
				this.getCustomerAddressInfo()
			} else {
				this.getCustomerDefaultAddressInfo()
			}
			uni.setStorageSync('goods_id', option.goods_id);
			// this.goods_id = option.goods_id
			this.findAgentGoodsInfo()
			
		},
		onPullDownRefresh() {//下拉刷新
			this.findAgentGoodsInfo()
		},
		data() {
			return {
				number:1,
				isAddress:false,
				receive_name:null,
				id:null,
				phone:null,
				province_name:null,
				city_name:null,
				district_name:null,
				address:null,
				is_default:null,
				PROVINCE:null,
				goods_id:null,
				goodsInfo:{},
				stock_number:null
			};
		},
		methods:{
			reduceGods(){
				this.number -= 1;
			},
			addGods(){
				this.number += 1;
			},
			getNumber(e){
				this.number = parseInt(e.detail.value)
			},
			async getCustomerAddressInfo(){//一进入页面 获取的用户地址
				let [err,res] = await this.$http.post("/api/customer/getCustomerAddressInfo",{id:this.id});
				if(res.data.code == 200 && res.data.data !== '') {
					let newList = res.data.data
					this.receive_name=newList.receive_name
					this.id=newList.id
					this.phone=newList.phone
					this.province_name=newList.province_name
					this.city_name=newList.city_name
					this.district_name=newList.district_name
					this.address=newList.address
					this.is_default=newList.is_default
					this.PROVINCE = newList.province
					this.isAddress = true
				}
			},
			async getCustomerDefaultAddressInfo(){ //获取默认收货地址
				let [err,res] = await this.$http.post("/api/customer/getCustomerDefaultAddressInfo");
				if(res.data.code == 200 && res.data.data !== '') {
					let newList = res.data.data
					this.receive_name=newList.receive_name
					this.id=newList.id
					this.phone=newList.phone
					this.province_name=newList.province_name
					this.city_name=newList.city_name
					this.district_name=newList.district_name
					this.address=newList.address
					this.is_default=newList.is_default
					this.PROVINCE = newList.province
					this.isAddress = true
				}
			},
			goAddress(){//去设置收货地址那
				 uni.setStorageSync('warehouse', 'warehouse');
				uni.navigateTo({
					url:"/pages/address/address"
				})
			},
			findAgentGoodsInfo(){//商品详情
				const warehouseToken = uni.getStorageSync('warehouseToken');
				const goods_id = uni.getStorageSync('goods_id');
				uni.request({
					url: config.webUrl + "/api/agent/findAgentGoodsInfo",
					method: 'POST',
					data:{
						goods_id:goods_id
					},
					header: {
						'shop': "1",
						'Authorization':warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.goodsInfo = res.data.data
							console.log(this.goodsInfo)
							uni.stopPullDownRefresh();
						}else if(res.data.errcode === 44){
							uni.showToast({title:"请重新登录",icon:'none'})
							 setTimeout(()=>{
								uni.redirectTo({
								    url: '../../pages/cloudWarehouse/warehouseLogin'
								});
							},1000)
						}else{
							uni.showToast({title:res.data.errstr,icon:'none'})
						}
					}
				})
			},
			createAgentGoodsRapport(){//提交
				if(this.id === undefined || this.id === null || this.id === ''){
					uni.showToast({title:'请选择您的收货地址',icon:'none'})
					return false
				}
				if(this.number < 1){
					uni.showToast({title:'提货数量必须大于等于1',icon:'none'})
					return false
				}
				const goods_id = uni.getStorageSync('goods_id');
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/createAgentGoodsRapport",
					method: 'POST',
					data:{
						goods_id:goods_id,
						number:this.number,
						type:2,
						price:this.goodsInfo.actual_price,
						customer_address_id:this.id
					},
					header: {
						'shop': "1",
						'Authorization':warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							uni.showToast({title:'提交成功',icon:'none'})
							setTimeout(()=>{
								uni.redirectTo({
									url: './cloudWarehouse'
								});
							},500)
							
							uni.stopPullDownRefresh();
							// //成功后删除本地goods_id
							uni.removeStorageSync('goods_id');
						}else if(res.data.errcode === 44){
							uni.showToast({title:"请重新登录",icon:'none'})
							 setTimeout(()=>{
								uni.redirectTo({
								    url: '../../pages/cloudWarehouse/warehouseLogin'
								});
							},1000)
						}else{
							uni.showToast({title:res.data.errstr,icon:'none'})
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.pickUpGoods_box{
	width:100%;
	// background: #007AFF;
	padding: 0 28upx;
	overflow: hidden;
	.pickUpGoods{
		width:100%;
		height: 204upx;
		border-radius: 20upx;
		margin-top:20upx;
		box-shadow: 0 2px 10upx #d5d5d5;
		background:#fff url(../../static/images/qie01_0000_bg.png) no-repeat 0 180upx;
		background-size: 100% 14upx;
		padding:40upx 28upx  0 56upx;
		//地址
		.top_box{
			width:100%;
			height: 52upx;
			// background-color: #007AFF;
			display: flex;
			justify-content: space-between;
			font-size: 32upx;
			color:#323232;
			.address_phone{
				overflow: hidden;
					image{
						width:18upx;
						height: 28upx;
						margin-left: 24upx;
						// margin-top:2upx;
					}
			}
		}
		.detailedAddress{
			margin-top:8upx;
			width:100%;
			height: 66upx;
			// background: #00B26A;
			font-size: 26upx;
			color:#b3b3b3;
		}
	}
	
}
.cloudWarehose_header{
	width:100%;
	// height: 356upx;
	border-radius: 20upx;
	margin-top:20upx;
	box-shadow: 0 0px 10upx #d4d4d4;
	background:#fff;
	padding:0 32upx;
	margin-bottom:80upx;
}
.stock_top{
	padding-top:34upx;
	width:100%;
	height: 254upx;
	display: flex;
	justify-content: space-between;
	image{
		width:176upx;
		height: 176upx;
		border-radius: 20upx;
	}
	.stock_top_title{
		width:420upx;
		height: 176upx;
		color:#343434;
		font-size: 26upx;
		p:nth-child(1){
			font-size: 28upx;
			line-height: 50upx;
		}
		p:nth-child(2){
			margin-top: 16upx;
			line-height: 50upx;
			text{
				color:#8fc9f7;
			}
		}
		.quantityIn{
			width:100%;
			// height: ;
			display: flex;
			justify-content: space-between;
			.number-box{
				width:150upx;
				.count {
					margin-top: 8upx;
					width: 100%;
					height: 38upx;
					display: flex;
					overflow: hidden;
					align-items: center;
					justify-content: space-between;
				
					.reduce {
						text-align: center;
						line-height: 34upx;
						width: 34upx;
						height: 34upx;
						background: #e9e8ed;
						border-radius: 6upx;
						font-size: 40upx;
						color: #808080;
				
						&.noNumber {
							background: #b9b9b9;
							cursor: not-allowed;
							pointer-events: none;
						}
					}
				
					.number {
						font-size: 24upx;
						color: #414141;
						width: 50%;
						height: 34upx;
						background: #e9e8ed;
						border-radius: 6upx;
						line-height: 36upx;
						text-align: center;
					}
				
					.increase {
						width: 34upx;
						height: 34upx;
						background: #e9e8ed;
						text-align: center;
						line-height: 30upx;
						font-size: 40upx;
						font-weight: 600;
						border-radius: 6upx;
						color: #808080;
				
						&.noNumber {
							background: #b9b9b9;
							cursor: not-allowed;
							pointer-events: none;
						}
					}
				}
			}
		}
	}
}
.stock_bottom{
	width:100%;
	height: 96upx;
	display: flex;
	view:first-child{
		line-height: 96upx;
		width:50%;
		height: 100%;
		font-size:32upx;
		padding-left: 50upx;
		text{
			color:#54aefc;
			margin:0 10upx;
		}
	}
	view:last-child{
		line-height: 96upx;
		width:50%;
		height: 100%;
		font-size:32upx;
		text-align: right;
		text{
			color:#ff615e;
			margin:0 16upx 0 10upx;
		}
	}
}
.pickUpGoods_bottom{
	width:100%;
	height: 190upx;
	background: #fff;
	position: fixed;
	left:0;
	bottom:0;
	box-shadow: 0 -2upx 10upx #eeeeee;
	display: flex;
	justify-content: space-between;
	padding-left: 40upx;
	view:first-child{
		width:210upx;
		height:92upx;
		font-size:30upx;
		color:#333333;
		line-height: 92upx;		
			font-weight: 600;
		text{
			font-weight: 700;
			margin:0 6upx;
		}
	}
	view:last-child{
		width:250upx;
		height: 92upx;
		background: #53affc;
		text-align: center;
		color:#FFF;
		line-height:92upx;
		font-size: 30upx;
		letter-spacing:2px;
	}
}
</style>
