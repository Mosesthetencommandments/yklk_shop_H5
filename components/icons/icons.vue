<template>
	<view class="icons">
		<view class="iconsbox">
			<view class="mj">
				<view class="item-box" v-for="(item,index) in icons" :key="item.id">
					<view class="img-box" :id="item.id" @click="toPage(item,index)">
						<image :src="item.icon" mode=""></image>
					</view>
					<view class="item-title">{{item.group_name}}</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				icons:[

				],
				nogo:false
			};
		},
		created(){
			this.getIcons()
		},
		methods:{
			toPage(item,index){
				console.log(item)
				console.log(index)
				if(item.url === null || item.url === undefined || item.url === ""){
					this.nogo = true
					this.$emit('childByValue',this.nogo)
					return 
				}
				uni.navigateTo({
				    url: item.url
				});
			},
			async getIcons(){
				let [err,res] = await this.$http.post("/api/shop_goods/getShopGoodsGroupList")
				if(res.data.code === 200){
					this.icons = res.data.data[0]
					console.log(this.icons)
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
.icons{
	padding: 28upx 28upx 0;
}
.iconsbox{
	width:100%;
	height: 340upx;
}
.mj{
	display: flex;
	flex-wrap:wrap;
	justify-content: space-between;
	.item-box{
		width:138upx;
		height:138upx;
		margin-bottom: 30upx;
		text-align: center;
		.img-box{
			width:90upx;
			height: 90upx;
			margin:0 auto;
			image{
				width:100%;
				height: 100%;
			}
		}
		.item-title{
			width:100%;
			height: 48upx;
			color:#323232;
			font-weight:600;
			font-size: 24upx;
			line-height: 48upx;
		}
	}
}

</style>
