<template>
	<view>
		<view class="address-box">
			<view class="address-item" v-for="(item,index) in arr" :key="index">
				<view class="img-box" v-if="item.is_default === 1">
					<image src="../../static/images/APP-qie4_0006_地址.png" mode=""></image>
				</view>
				<view class="img-box" style="background: #858585;" v-else>
					<image src="../../static/images/APP-qie4_0006_地址.png" mode=""></image>
				</view>
				<view class="address-title" @click="goSettle(item)">
					<view class="title-name">
						<text class="name">{{item.receive_name}}</text><text class="phone">{{item.phone}}<text class="default" v-if="item.is_default === 1">默认</text></text>
					</view>
					<view class="place">
						{{item.province_name}} {{item.city_name}} {{item.district_name}} {{item.address}}
					</view>
				</view>
				<view class="compile" @click="goEait(item)">编辑</view>
			</view>
		</view>
		<button type="primary" size="default" @tap="goEditAddress">添加新地址</button>
	</view>
</template>
<script>
	export default {
		created() {
			this.getCustomerAddressList()
		},
		onPullDownRefresh() { //下拉刷新
			this.getCustomerAddressList()
		},
		onLoad(option) {
			this.d_integral = option.d_integral
			// console.log(option.dontJump)
			if(option.dontJump == 1){
				// this.dontJump = option.dontJump
				// console.log(123)
				this.dontGo = 1
				this.notGoPay = true
			}
			 const warehouse = uni.getStorageSync('warehouse');
			 if(warehouse === 'warehouse'){
				 this.warehouse = true
			 }
			  const goods_id = uni.getStorageSync('goods_id');
			  this.d_goods_id = goods_id
			  if(goods_id){
			  	this.goods_id = true
				console.log(this.goods_id + '123456')
			  }
		},
		data() {
			return {
				d_goods_id:null,
				goods_id:false,
				warehouse:false,
				notGoPay:false,
				dontGo:null,
				dontJump:null,
				receive_name:null,
				phone:null,
				province_name:null,
				city_name:null,
				district_name:null,
				address:null,
				is_default:null,
				isShow:true,
				arr:[],
				d_integral:null
			};
		},
		methods:{
			goEditAddress(e){
				if(this.notGoPay === true){
					uni.navigateTo({
						url:'../editAddress/editAddress?&dontJump=1'
					})
				}else if(this.d_integral=='dxs'){
					uni.navigateTo({
						url:'../editAddress/editAddress?d_integral=dxs'
					})
				}else{
					uni.navigateTo({
						url:'../editAddress/editAddress'
					})
				}
			},
			goSettle(e){//去商品结算
				if(this.dontGo === 1){
					return
				}
				if(this.d_integral == 'dxs'){
					uni.redirectTo({
					   url:"/pages/settle-accounts/Point_mall_settlement?id="+e.id+'&d_integral=dxs'
					});
				}else if(this.warehouse === true){
					uni.redirectTo({
					   url:"/pages/cloudWarehouse/pickUpGoods?id="+e.id + '&goods_id='+this.d_goods_id
					});
				}else{
					uni.redirectTo({
					   url:"/pages/settle-accounts/settle-accounts?id="+e.id
					});
				}
				
			},
			goEait(e){//去编辑地址
				if(this.notGoPay === true){
					uni.redirectTo({
					   url:"/pages/editAddress/editAddress?modification=modification&id="+e.id+'&dontJump=1'
					});
				}else if(this.d_integral == 'dxs'){
					uni.redirectTo({
					   url:"/pages/editAddress/editAddress?modification=modification&id="+e.id + '&d_integral=dxs'
					   
					});
				}else if(this.warehouse === true){
					uni.redirectTo({
					   url:"/pages/editAddress/editAddress?modification=modification&id="+e.id+'&warehouse=warehouse'
					});
				}else{
					uni.redirectTo({
					   url:"/pages/editAddress/editAddress?modification=modification&id="+e.id
					});
				}
			},
			async getCustomerAddressList(){
				let [err,res] = await this.$http.post("/api/customer/getCustomerAddressList",{
					page:1,
					page_size:100
				})
				if(res.data.code == 200){
					let list = res.data.data
					let arr = []
					for(var i = 0; i < list.length; i++){
						arr.push({
							id:list[i].id,
							receive_name:list[i].receive_name,
							phone:list[i].phone,
							province_name:list[i].province_name,
							city_name:list[i].city_name,
							district_name:list[i].district_name,
							address:list[i].address,
							is_default:list[i].is_default,
						})
					}
					this.arr = arr
					uni.stopPullDownRefresh();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
page{
	background: #eeeeee;
}
.address-box{
	width:100%;
	height: 100%;
	padding: 24upx 20upx;
}
.address-item{
	width:100%;
	height: 120upx;
	background: #ffffff;
	border-radius: 20upx;
	box-shadow: 0 0 10upx #e1e1e1;
	padding:26upx 20upx 0 27upx;
	display: flex;
	margin-bottom: 10upx;
	justify-content: space-between;
	.img-box{
		width:66upx;
		height: 64upx;
		background: #f49c17;
		border-radius: 100%;
		margin-top:6upx;
		margin-right: 22upx;
		image{
			width:26upx;
			height: 34upx;
			display: block;
			margin:16upx 20upx;
		}
	}
	.address-title{
		width:470upx;
		height:80upx;
		.title-name{
			width:100%;
			height: 34upx;
			line-height: 20upx;
			.name{font-size: 30upx;  color:#333333;margin-right: 10upx;}
			.phone{font-size: 24upx;color:#888888;margin-right: 10upx;}
			.default{
				width:24upx;
				padding:0 10upx;
				height: 24upx;
				line-height: 24upx;
				background:#ffecd0;
				border:1px solid #f49c17;
				border-radius: 4upx;
				font-size: 24upx;
				color:#f49c17;
				margin-left: 10upx;
			}
		}
		.place{
			width:100%;
			height: 60upx;
			font-size: 24upx;
			color:#444444;
			line-height: 24upx;
		}
	}
}
.compile{
	width:72upx;
	height: 56upx;
	border-left: 1px solid #eeeeee;
	font-size: 24upx;
	color:#888888;
	text-align: right;
	line-height: 56upx;
	margin-top:6upx;
}
button{
	width:100%;
	height: 100upx;
	border-radius: 0;
	border:0;
	line-height: 100upx;
	background: #369eff;
	position: fixed;
	bottom: 0;
}
</style>
