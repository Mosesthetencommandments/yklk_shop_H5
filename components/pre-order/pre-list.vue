<template>
	<view class="shoplist">
		<view class="listHeader">
			<view class="yellowDiv"></view>
			<view>
				<h2>订单信息</h2>
			</view>
		</view>
		<view class="listMessage">
			<p>订单编号：S20191022163041601014505</p>
			<p>创建时间：2019-09-09 16:30:41</p>
			<p>支付时间：2019-09-09 16:36:23</p>
		</view>
	</view>
</template>

<script>
	
	
</script>

<style lang="scss" scoped>
	.shoplist{
		width:100%;
		height:160upx;
		background:#fff;
		.listHeader{
			height:43upx;
			width:100%;
			position:relative;
			.yellowDiv{
				position:absolute;
				top:20upx;
				width:6upx;
				height:24upx;
				background:#f49c17;
				margin-left:40upx;
			}
			h2{
				font-size:23upx;
				margin-left:55upx;
				position:absolute;
				top:14upx
			}
		}
		.listMessage{
			height:118upx;
			width:100%;
			display:flex;
			flex-direction:column;
			p{
				font-size:17upx;
				color:#cdcdcd;
				margin:5upx;
				margin-left:40upx;
				align-items: center;
			}
		}
	}
	
	
</style>
