<template>
	<view>
		<view class="myGloup-box">
			<view class="peopleNumber">
				数据仅供参考
			</view>
			<view class="myGloup-card-box">
				<view class="myGloup-card">
					<view class="card-title">昨日</view>
					<view class="card-people">
						<view class="card-left">
							<view class="card-left-s">
								<view class="box"><image src="../../static/images/APP-qie6_0004_shu-up.png" alt=""></view>
								<view>{{this.yesterday.add}}</view>
							</view>
							<view class="card-left-x">
								新增人数
							</view>
						</view>
						<view class="card-left">
							<view class="card-left-s">
								<view class="box"><image src="../../static/images/APP-qie6_0003_shu-down.png" alt=""></view>
								<view>{{this.yesterday.sub}}</view>
							</view>
							<view class="card-left-x">
								减少人数
							</view>
						</view>
						<view class="card-left">
							<view class="card-left-s">
								<view>{{Math.abs(this.yesterday.add - this.yesterday.sub)}}</view>
							</view>
							<view class="card-left-x">
								调整人数
							</view>
						</view>
					</view>
				</view>
			
			<view class="myGloup-card">
				<view class="card-title">本月</view>
				<view class="card-people">
					<view class="card-left">
						<view class="card-left-s">
							<view class="box"><image src="../../static/images/APP-qie6_0004_shu-up.png" alt=""></view>
							<view>{{this.month.add}}</view>
						</view>
						<view class="card-left-x">
							新增人数
						</view>
					</view>
					<view class="card-left">
						<view class="card-left-s">
							<view class="box"><image src="../../static/images/APP-qie6_0003_shu-down.png" alt=""></view>
							<view>{{this.month.sub}}</view>
						</view>
						<view class="card-left-x">
							减少人数
						</view>
					</view>
					<view class="card-left">
						<view class="card-left-s">
							<view>{{this.month.add - this.month.sub}}</view>
						</view>
						<view class="card-left-x">
							调整人数
						</view>
					</view>
				</view>
			</view>
			<view class="myGloup-card">
				<view class="card-title">上月</view>
				<view class="card-people">
					<view class="card-left">
						<view class="card-left-s">
							<view class="box"><image src="../../static/images/APP-qie6_0004_shu-up.png" alt=""></view>
							<view>{{this.last_month.add}}</view>
						</view>
						<view class="card-left-x">
							新增人数
						</view>
					</view>
					<view class="card-left">
						<view class="card-left-s">
							<view class="box"><image src="../../static/images/APP-qie6_0003_shu-down.png" alt=""></view>
							<view>{{this.last_month.sub}}</view>
						</view>
						<view class="card-left-x">
							减少人数
						</view>
					</view>
					<view class="card-left">
						<view class="card-left-s">
							<view>{{this.last_month.add - this.last_month.sub}}</view>
						</view>
						<view class="card-left-x">
							调整人数
						</view>
					</view>
				</view>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mygloop:[],
				yesterday:{},
				month:{},
				last_month:{}
			};
		},
		onLoad(){
			this.getGloup()
		},
		onPullDownRefresh() {//下拉刷新
			this.getGloup()
		},
		methods:{
			async getGloup(){
				let [err,res] = await this.$http.post("/api/customer/getCustomerTeamNumberInfo");
				if(res.data.code === 200){
					this.mygloop = res.data.data
					// console.log(res.data.data)
					this.yesterday = res.data.data.yesterday
					this.last_month = res.data.data.last_month
					this.month = res.data.data.this_month
					uni.stopPullDownRefresh();
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #eeeeee;
	}
.myGloup-box{
	width:100%;
	height: 100%;
}
.peopleNumber{
	widht:100%;
	height: 90upx;
	background:#ffffff;
	line-height: 90upx;
	font-size: 24upx;
	color:#cdcbcb;
	text-align: center;
}
.myGloup-card-box{
	width:100%;
	height: 100%;
	padding: 30upx 20upx;
	.myGloup-card{
		width:100%;
		height: 224upx;
		background: #ffffff;
		border-radius: 20upx;
		padding:0 28upx;
		margin-bottom: 20upx;
		.card-title{
			width:100%;
			height: 64upx;
			border-bottom:1px solid #f0f0f0;
			text-align: center;
			font-size: 24upx;
			color:#444444;
			line-height: 64upx;
		}
		.card-people{
			width:100%;
			height: 159upx;
			display: flex;
			justify-content: space-between;
			.card-left{
				width:33.3%;
				height: 159upx;
				.card-left-s{
					display: flex;
					justify-content: center;
					width:100%;
					height: 66upx;
					.box{
						width:20upx;
						height: 25upx;
						margin-right: 10upx;
						margin-top:40upx;
						image{
							width:100%;
							height: 100%;
						}
					}
					
					view{
						font-size:26upx;
						margin-top:40upx;
					}
				}
				.card-left-x{
					font-size: 16upx;
					line-height: 94upx;
					text-align: center;
					color:#444444;
				}
			}
		}
		
	}
}
</style>
