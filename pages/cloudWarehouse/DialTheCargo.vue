<template>
	<view>
		<view class="DialTheCargo_box">
			<view class="DialTheCargo">
				<view class="DialTheCargo_goods">
					<p>选择商品：</p>
					<picker @change="bindPickerChange" range-key="name" :value="index" :range="objectArray">
						<view class="wold">
							{{objectArray[index]}}
							<view class="d3"></view>
						</view>
					</picker>
				</view>
				<view class="DialTheCargo_number">
					<p>拨货数量：</p>
					<input id="ceshi" type="number" @blur="getNumber" v-model="d_goods_number" value="" placeholder="单行输入"/>
				</view>
				<view class="DialTheCargo_stock">
					<p>剩余云仓库存：<text>{{d_stock_number}}</text></p>
				</view>
				<view class="DialTheCargo_submit" @click="submit">
					拨货
				</view>
			</view>
		</view>
		<!-- 弹出 -->
		<view class="confirmationMessage_box" v-if="isShow" @click.stop="isShow = false">
			<view class="confirmationMessage" @click.stop="isShow = true">
				<p>收货人：{{d_truename}}</p>
				<p>商品名称：{{objectArray[index]}}</p>
				<p>拨货数量：{{d_goods_number }}</p>
				<p><view class="" @click="createAllocateGoods">确认</view></p>
			</view>
		</view>
		
	</view>
</template>

<script>
	import config from '../../common/config.js';
	import tabbarItem from "../../components/WarehouseTabbar/tabbar.vue"
	export default {
		onLoad(option) {
			this.getAgentGoodsList()
			this.d_customer_id = option.customer_id
			this.d_truename = option.truename
		},
		onPullDownRefresh() {//下拉刷新
			this.getAgentGoodsList()
		},
		data() {
			return {
				index:0,
				 objectArray: ['请选择'],
				isShow:false,
				GoodsList:[],
				goods_id:null,
				d_stock_number:null,
				d_goods_number:'',
				d_customer_id:null,
				d_id:null,
				d_truename:null
			};
		},
		methods:{
			bindPickerChange(e){
				this.index = e.target.value   
				for(let i = 0; i < this.GoodsList.length ; i++){
					this.goods_id = this.GoodsList[e.target.value - 1].agent_goods.id
					this.d_stock_number = this.GoodsList[e.target.value - 1].number
					this.d_id = this.GoodsList[e.target.value - 1].id
				}
				console.log(this.goods_id)
				console.log(this.d_stock_number)
			},
			getAgentGoodsList(){//商品列表
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/getAgentGoodsSelectList",
					method: 'POST',
					header: {
						'shop': "1",
						'Authorization':warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.GoodsList = res.data.data
							console.log(this.GoodsList)
							for(let i = 0; i < this.GoodsList.length ; i++){
								this.objectArray.push(this.GoodsList[i].agent_goods.goods_name)
							}
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
			getNumber(e){
				console.log(e.detail.value)
				this.d_goods_number = e.detail.value
				if(this.d_goods_number > this.d_stock_number){
					uni.showToast({title:'库存不足',icon:'none'})
					this.d_goods_number = ''
				}
				console.log(this.d_goods_number)
			},
			createAllocateGoods(){//拨货
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/createAllocateGoods",
					method: 'POST',
					data:{
						customer_id:this.d_customer_id,
						number:this.d_goods_number,
						goods_id:this.goods_id,
						id:this.d_id
					},
					header: {
						'shop': "1",
						'Authorization':warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							console.log(res)
							uni.redirectTo({
								url:'/pages/cloudWarehouse/WarehouseMine'
							})
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
			submit(){
				if(this.d_truename !==undefined && this.d_goods_number !== undefined ){
					this.isShow = true
				}else{
					uni.showToast({title:'库存不足',icon:'none'})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.DialTheCargo_box{
	width:100%;
	height: 750upx;
	padding: 100upx 86upx 0; 
	.DialTheCargo{
		width:100%;
		height: 100%;
		view{
			display: flex;
			justify-content: space-between;
			width:100%;
			height: 54upx;
			margin-bottom: 50upx;
			line-height: 54upx;
			p{
				font-size:28upx;
				color:#333333;
				text{
					color:#aaaaaa;
				}
			}
			input{
				width:430upx;
				height: 54upx;
				border:2upx solid #c3c3c3;
				border-radius: 6upx;
				padding-left: 14upx;
				font-size: 28upx;
				color:#aaaaaa;
				line-height: 54upx;
			}
			
		}
		.DialTheCargo_goods{
			.wold{
				width:430upx;
				height: 54upx;
				border:2upx solid #c3c3c3;
				border-radius: 10upx;
				padding-left: 14upx;
				font-size: 28upx;
				color:#aaaaaa;
				line-height: 54upx;
				margin:0;
				.d3{
					margin-right: 14upx;
					 margin-top:20upx;
					 width: 0; 
					 height: 0;
					 border-width: 16upx;
					 border-style: solid;
					 border-color:#000000 transparent transparent transparent;
				}
			}
		}
		.DialTheCargo_submit{
			width:340upx;
			height: 72upx;
			background: #53affc;
			color:#fff;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 16upx;
			margin-top:320upx;
			font-size:32upx;
			letter-spacing:10upx;
		}
	}
}



.confirmationMessage_box{
	width:100vw;
	height:100vh;
	background: rgba(0,0,0,.5);
	position:fixed;
	top:0;
	left:0;
	display: flex;
	justify-content: center;
	align-items: center;
	.confirmationMessage{
		width:440upx;
		height: 516upx;
		background: #FFFFFF;
		border-radius: 30upx;
		font-size: 26upx;
		color:#727272;
		padding: 100upx 78upx 0;
		p{
			width:100%;
			line-height: 70upx;
		}
		view{
			width:178upx;
			height: 54upx;
			background: #78bffd;
			text-align: center;
			line-height: 54upx;
			color:#fff;
			border-radius: 50upx;
			margin:80upx auto;
		}
	}
}
</style>
