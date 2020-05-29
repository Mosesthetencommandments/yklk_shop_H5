<template>
	<view>
		<view class="isloading">
			<img src="../../static/images/loading.gif" alt="" >
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.shop_goods_id = option.shop_goods_id
			this.orders_id = parseInt(option.orders_id)
			// console.log(this.orders_id)
			// if(this.orders_id){
			// 	this.goCheckOrders()
			// }else
			 if (this.shop_goods_id !== null && this.shop_goods_id !== undefined && this.shop_goods_id!== '' && this.orders_id !== null && this.orders_id !==undefined && this.orders_id !== ''){
				this.goCheckOrders1()
			}else if(this.orders_id){
				this.goCheckOrders()
			}
		},
		data() {
			return {
				orders_id:null,
				shop_goods_id:null
			};
		},
		methods:{
			async goCheckOrders(){
				let [err,res] = await this.$http.post("/api/orders/confirmOrders",{orders_id:this.orders_id});
				if(res.data.code == 200){
					uni.redirectTo({
						url:'../checkOrders/checkOrders?orders_id='+this.orders_id
					})
				}
			},
			async goCheckOrders1(){
				let [err,res] = await this.$http.post("/api/orders/confirmOrders",{orders_id:this.orders_id,shop_orders_source:5});
				if(res.data.code == 200){
					console.log(2222)
					uni.redirectTo({
						url:'../checkOrders/checkOrders?orders_id='+this.orders_id + '&shop_goods_id=' + this.shop_goods_id
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.isloading{
	width:100%;
	height:100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	img{
		width:40%;
	}
}
</style>
