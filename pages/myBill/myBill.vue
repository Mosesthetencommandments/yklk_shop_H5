<template>
	<view class="myBill">
		<view class="myBill-All">
			<view class="myBill-new">
				<view class="myBill-new-top">
					<p v-if="this.allMoney === null || this.allMoney === undefined || this.allMoney ===''">累积提现<text>0</text>元</p>
					<p v-else>累计提现<text>{{this.allMoney}}</text>元</p>
				</view>
			</view>
			<view class="myBill-card" v-for = "(item,index) in allList" :key = "index">
				<view class="myBill-card-top">
					<view class="bank">
						<img :src="item.shop_customer_wallet.shop_bank_type.bank_type_pic" alt="" v-if="item.wallet_type === 1">
						<img src="../../static/images/APP-qie10_0000_支付宝icon56x56.png" alt="" v-if="item.wallet_type === 2">
						<img src="../../static/images/APP-qie10_0001_零钱icon56x56.png" alt="" v-if="item.wallet_type === 3">
						<p>提现-{{money[index]}}</p>
					</view>
					<view class="time">
						<p>{{HalfTime[index] <= 12 ? '上午' : '下午'}}{{Time[index]}}</p>
					</view>
				</view>
				<view class="myBill-card-bottom">
					<p>+{{item.withdraw_money}}</p>
					<p>{{Day[index]}}</p>
				</view>
				<view class="red-radius">
					
				</view>
				<!-- <view class="oldMessage" v-if="item.isShow === true">
					<view>
						<text>以下为旧消息</text>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	//引入loadmore组件
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'
	var _self, page = 1,timer = null;
	export default {
		components: {uniLoadMore},
		onPullDownRefresh() {//下拉刷新
			this.getRecordList()
			this.getRrawRecord()
		},
		onLoad() {
			this.getRecordList()
			this.getRrawRecord()
		},
		onReachBottom() {
			//触底的时候请求数据，即为上拉加载更多
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(()=> {
				this.getRecordList();
			}, 1000);
		},
		data() {
			return {
				users_money:6820.90,
				orderList:{
					page:1,
				},
				//提现记录
				CustomerBalanceWithdrawRecordList:[],
				allList:[],
				Day:[],
				Time:[],
				HalfTime:[],
				money:[],
				//提现总额
				allMoney:null,
				Today:{},
				Tomonth:{},
				Toyear:{},
				//上拉加载
				loadingText: '加载中...',
				loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2--contentnomore
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
			};
		},
		mounted(){
			
		},
		methods:{
			async getRecordList(){
				if (this.loadingType !== 0) {
					uni.stopPullDownRefresh()//loadingType!=0;直接返回
					return false;
				}
				let [err, res] = await this.$http.post("/api/customer/getCustomerBalanceWithdrawRecordList", {
						page:this.orderList.page,
						page_size:6
				})
				if(res.data.code === 200){
					this.CustomerBalanceWithdrawRecordList = res.data.data.data
					if (res.data.data.current_page > res.data.data.last_page ) {//没有数据
						this.loadingType = 2;
						return;
					}
					for(const v in this.CustomerBalanceWithdrawRecordList){
						this.$set(this.CustomerBalanceWithdrawRecordList[v], "isShow", false)
						this.money.push(this.CustomerBalanceWithdrawRecordList[v].withdraw_money)
						let time1 = this.CustomerBalanceWithdrawRecordList[v].withdraw_time.substr(0,10)
						this.Day.push(time1)
						let time2 = this.CustomerBalanceWithdrawRecordList[v].withdraw_time.substr(11)
						this.Time.push(time2)
						let time3 = time2.substr(0,2) / 1
						this.HalfTime.push(time3)
						this.getDate()
					}
					this.allList = this.allList.concat(this.CustomerBalanceWithdrawRecordList)
					// console.log(this.allList)
					this.orderList.page++;//得到数据之后page+1
					this.loadingType = 0
				// 	let numberA = null
				// 	let trueYear = []
				// 	let trueMounth = []
				// 	let trueDay = []
				// 	for(const a in this.Day){
				// 		trueYear.push(this.Day[a].substr(0,4) / 1)
				// 		trueMounth.push(this.Day[a].substr(5,2) / 1)
				// 		trueDay.push(this.Day[a].substr(8,2) / 1) 
				// 	}
				// 	numberA = trueDay.filter(item => {
				// 		if(trueDay[item] === this.Today && trueMounth[item] >= this.Tomonth && trueYear[item]  >= this.Toyear){
				// 			return true
				// 		}
				// 		return false
				// 	})
				// 	numberA = numberA.length - 1
				// 	this.CustomerBalanceWithdrawRecordList[numberA].isShow = true
				// }
				// for(const b in trueDay){
				// 	if(trueDay[b] === this.Today && trueMounth[b] >= this.Tomonth && trueYear[b]  >= this.Toyear){
				// 		console.log(trueDay.length)
				// 		this.CustomerBalanceWithdrawRecordList[b].isShow = true
				// 	}
				}
				uni.stopPullDownRefresh();//得到数据后停止下拉刷新
			},
			async getRrawRecord(){
				let [err, res] = await this.$http.post("/api/customer/sumCustomerBalanceWithdrawRecord")
				if(res.data.code === 200){
					this.allMoney = res.data.data.all_withdraw_money
					console.log(this.allMoney)
					uni.stopPullDownRefresh();
				}
			},
			getDate(){
				let today = new Date()
				this.Today= today.getDate()
				this.Tomonth = today.getMonth() + 1
				this.Toyear = today.getFullYear()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.myBill-All{
		width:100%;
		height:100%;
		background:#eeeeee;
		.myBill-new{
			width:100%;
			height:100%;
			.myBill-new-top{
				width:100%;
				height:70upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size:22upx;
				color:#454545;
				p{
					margin-right:23upx;
				}
				text{
					color:#369eff;
				}
			}
		}
		.myBill-card{
			height:100%;
			margin-left:23upx;
			margin-right:23upx;
			box-shadow: 1px 1px 8px #DFDFDF;
			position: relative;
			margin-bottom:10upx;
			.myBill-card-top{
				height:76upx;
				border-bottom:2upx solid #e1e1e1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background:#f2f2f2;
				border-radius: 20upx 20upx 0 0 ;
				.bank{
					margin-left: 20upx;
					display: flex;
					align-items: center;
					font-size:24upx;
					img{
						width:45upx;
						height:45upx;
						border-radius: 50%;
					}
					p{
						margin-left:21upx;
					}
				}
				.time{
					margin-right:20upx;
					font-size:18upx;
				}
			}
			.myBill-card-bottom{
				border-radius: 0upx 0upx 20upx 20upx ;
				background:#ffffff;
				height:132upx;
				p:first-child{
					margin-left:22upx;
					padding-top:15upx;
					color:#f49d18;
					font-size:36upx;
				}
				p:last-child{
					margin-left:22upx;
					color:#656565;
					font-size:20upx
				}
			}
			.red-radius{
				width:24upx;
				height:24upx;
				border-radius: 50%;
				background:#ff2625;
				position:absolute;
				top:-6upx;
				right:-10upx;
			}
			.oldMessage{
				width:100%;
				height:80upx;
				display: flex;
				justify-content: center;
				align-items: center;
				view{
					display: flex;
					align-items: center;
					height:40upx;
					border-radius: 30upx 30upx 30upx 30upx;
					background:#ffffff;
					text{
						font-size:26upx;
						margin: 0 20upx;
						color:#656565;
					}
				}
			}
		}
	}
</style>
