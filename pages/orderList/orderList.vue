<template>
    <view>
        <uni-segmented-control 
			:current="current" 
			:values="items" 
			@clickItem="onClickItem" 
			style-type="text" 
			active-color="#369eff"
		>
		</uni-segmented-control>
        <view class="content">
			<!-- 全部 -->
            <view v-show="current === 0">

			</view>
			<!-- 待付款 -->
			<view v-show="current === 1">
			
			</view>
            <!-- 待发货 -->
			<view v-show="current === 2">
             <!--   <p>{{this.$store.state.openid}}</p> -->
				
            </view>
			<!-- 待收货 -->
			<view v-show="current === 3 ">
			    
			</view>
			<!-- 已完成 -->
			<view v-show="current === 4">
			    
			</view>
        </view>
		<!-- 没有数据的时候的页面 -->
		<view class="none" v-if="isShow">
			<image src="../../static/images/APP-qie4_0000_空白.png" mode=""></image>
			<view>我的天呐！居然空空如也！</view>
			<button type="primary" size="mini">去逛逛</button>
		</view>
		<!-- 有数据的页面 -->
		<view class="content" v-for="(items,index) in newsList" :key="index"  v-if="!isShow" @click="gotologistics(items.id)">
			<view class="list" >
				<view class="list-item" >
					<view class="list-item-top">
						<view class="top-state">
							<text class="title">订单状态:</text>
							<text class="active2" v-if="items.shop_orders_status === 4">交易关闭</text>
							<text class="active" v-if="items.if_pay ===2 && items.if_received === 2 && items.shop_orders_status !== 4">交易成功</text>
							<text class="active1" v-if="items.if_pay ===2 && items.if_received === 0 && items.shop_orders_status !== 4" >买家已付款</text>
							<text class="active1" v-if="items.if_pay ===2 && items.if_received === 1 && items.shop_orders_status !== 4" >卖家已发货</text>
							<text class="active2" v-if="items.if_pay ===1 && items.shop_orders_status !== 4" >等待买家付款</text>
						</view>
						<view class="top-number">订单编号:{{items.orders_shop_unique_id}}</view>
					</view>
					<view class="list-item-center" v-for = "(gods,index) in items.orders_shop_items" :key = "index">
						<view v-if="gods.shop_goods === null" class="center-img">
							<image :src="gods.shop_goods_common.main_images_default" mode=""></image>
						</view>
						<view v-else class="center-img">
							<image :src="gods.shop_goods.image_thumb" mode=""></image>
						</view>
						<view class="center-info">
							<view class="info-title">{{gods.shop_goods_common.goods_name}}</view>
							<view v-if="gods.shop_goods !== null" class="">
								<view class="info-model"  v-for="(gg,index) in gods.shop_goods.species_value" :key="index">规格: <text>{{gg}}</text></view>
							</view>
							<view v-else class="info-model"></view>
							<view class="info-money">
								<view>￥{{gods.price}}</view><view class="num"><text style="margin-right: 3px;">x</text>{{gods.number}}</view>
							</view>
						</view>
					</view>
					<view class="list-item-footer">
						<view class="total" >
							共{{items.number}}件，合计： <text>￥{{items.actual_pay}}</text>（含运费￥{{items.freight}}）
							<p></p>
						</view>
						<view class="goPay" v-if="items.if_pay ===1 && items.shop_orders_status !== 4">
							<button size="mini" plain="true" @click.stop="cancelOrders(items)">取消订单</button>
							<button class="go" size="mini" plain="true" @click.stop="goOrders(items)">去付款</button>
						</view>
						<view class="goPay" v-if="items.if_pay ===2 && items.if_received !== 0">
							<button class="go1" size="mini" plain="true">查看物流</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="noNumber" v-if="this.loadingType ===2">
			{{this.contentText.contentnomore}}
		</view>
		<view class="noNumber" v-else>
			{{this.contentText.contentdown}}
		</view>
    </view>
</template>

<script>
import uniSegmentedControl from "../../components/uni-segmented-control/uni-segmented-control.vue"
//引入loadmore组件
import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'
var _self, page = 1,timer = null;
export default {
    components: {uniSegmentedControl,uniLoadMore},
	onLoad(option) {
		if(option.id){
			this.current= parseInt(option.id) + 1
			let Cindex = this.current
			switch(Cindex) {
				case 0:
					this.ordersQuery.page = 1
					this.ordersQuery.if_pay = undefined
					this.ordersQuery.if_received = undefined
					break
				case 1:					
					this.ordersQuery.page = 1
					this.ordersQuery.shop_orders_status = 3
					this.ordersQuery.if_pay = 1
					this.ordersQuery.if_received = 0
					break
				case 2:
					this.ordersQuery.page = 1
					this.ordersQuery.shop_orders_status = 3
					this.ordersQuery.if_pay = 2
					this.ordersQuery.if_received = 0
					break
				case 3:
					this.ordersQuery.page = 1
					this.ordersQuery.shop_orders_status = 3
					this.ordersQuery.if_received = 1
					this.ordersQuery.if_pay = 2
					break
				case 4:
					this.ordersQuery.page = 1
					this.ordersQuery.shop_orders_status = 3
					this.ordersQuery.if_pay = 2
					this.ordersQuery.if_received = 2
					break
				default:
					break
			}
		}else{
			this.current= 0
		}
		// 待付款的接口
		this.getnewsList()
		_self = this;
	},
	onPullDownRefresh() {
		this.loadingType = 0
		this.ordersQuery.page = 1//下拉刷新
		this.newsList = []
		this.getnewsList()
	},
	onReachBottom() {
		//触底的时候请求数据，即为上拉加载更多
		if (timer != null) {
			clearTimeout(timer);
		}
		timer = setTimeout(()=> {
			_self.getnewsList();
		}, 300);
	},
	// onReachBottom(){//上拉加载
	// 	this.getMoreOrdersList()
	// },
    data() {
        return {
            items: ['全部','待付款','待发货','待收货','已完成'],
            current: 0,
			currentID:"",
			isShow:false,
			obligations:[],
			GG:null,
			NF:null,
			newArr:[],
			if_pays:'',
			ordersQuery: {
				page: 1,
				page_size: 5,
				shop_orders_status:undefined,
				if_pay: undefined,
				if_received: undefined,
			},
			loadingText: '加载中...',
			loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2--contentnomore
			contentText: {
				contentdown: '上拉显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			newsList:[],
			number:null,
			endPage:null,
			
		}
    },
    methods: {
		async getnewsList() {//第一次回去数据
			if (this.loadingType !== 0) {
				uni.stopPullDownRefresh()//loadingType!=0;直接返回
				return false;
			}
			this.ordersQuery.page;
			this.loadingType = 1;
			let [err,res] = await this.$http.post("/api/orders/getOrdersList",this.ordersQuery);
			if(res.data.code === 200){
				if (res.data.data.current_page > res.data.data.last_page ) {//没有数据
					this.loadingType = 2;
					return;
				}
				let moreList = res.data.data.data
				for(const v of moreList){
					v.number = 0
					for(const j of v.orders_shop_items){
						v.number += j.number
					}
				}
				console.log(moreList)
				if(this.current === 1){
					moreList = moreList.filter(item => {
						if(item.shop_orders_status === 4){
							return false
						}
						return true
					})
				}
				this.newsList = this.newsList.concat(moreList)
				// if(this.current === 1){
				// 	this.newsList = this.newsList.filter(item => {
				// 		if(item.shop_orders_status === 4){
				// 			return false
				// 		}
				// 		return true
				// 	})
				// }
				// console.log(this.newsList)
				this.ordersQuery.page++;//得到数据之后page+1
				this.loadingType = 0
			}
			uni.stopPullDownRefresh();//得到数据后停止下拉刷新
		},	
        onClickItem(index) {
            if (this.current !== index) {
				this.newsList = []
				this.loadingType = 0
                this.current = index;
				switch(index) {
					case 0:
						this.ordersQuery.page = 1
						this.ordersQuery.if_pay = undefined
						this.ordersQuery.if_received = undefined
						break
					case 1:					
						this.ordersQuery.page = 1
						this.ordersQuery.if_pay = 1
						this.ordersQuery.shop_orders_status = 3
						this.ordersQuery.if_received = 0
						break
					case 2:
						this.ordersQuery.page = 1
						this.ordersQuery.if_pay = 2
						this.ordersQuery.shop_orders_status = 3
						this.ordersQuery.if_received = 0
						break
					case 3:
						this.ordersQuery.page = 1
						this.ordersQuery.if_received = 1
						this.ordersQuery.shop_orders_status = 3
						this.ordersQuery.if_pay = 2
						break
					case 4:
						this.ordersQuery.page = 1
						this.ordersQuery.if_pay = 2
						this.ordersQuery.shop_orders_status = 3
						this.ordersQuery.if_received = 2
						break
					default:
						break
				}
				this.getnewsList()
            }
        },
		gotologistics(id){
			uni.navigateTo({
				url:"../logistics-details/logistics-details?orders_id=" + id 
			})
		},
		async cancelOrders(items){
			let orders_id = items.id
			console.log(this.current)
			let [err,res] = await this.$http.post("/api/orders/cancelOrders", {orders_id});
			if(res.data.code === 200){
				items.shop_orders_status = 4
				this.getnewsList()
				this.current = 0
			}
		  },
		goOrders(items){
			if(items.shop_orders_status === 2){
				uni.navigateTo({
				    url: '../blankJump/blankJump?orders_id=' + items.id
				});
			}else if(items.shop_orders_status ===3){
				uni.navigateTo({
				    url: '../checkOrders/checkOrders?orders_id=' + items.id
				});
			}
		}
	}
	
}
</script>
<style lang="scss" scoped>
	.go1{
		border-color: #eeeeee;
		color:#676767
	}
// 数据渲染样式
.sectionalzer{
	width:100%;
}
.content{
	width:100%;
	height:100%;
	padding:0 20upx;
	.list{
		width:100%;
		height: 100%;
		margin-top:31upx;
		.list-item{
			width:100%;
			height: 100%;
			background: #ffffff;
			border-radius: 20upx;
			padding:0 20upx;
			margin-bottom: 10upx;
			.list-item-top{
				width:100%;
				height: 96upx;
				border-bottom: 1px solid #eeeeee;
				.top-state{
					width:100%;
					height: 52upx;
					display: flex;
					justify-content: space-between;
					font-size:28upx;
					color:#444444;
					line-height: 58upx;
					.active{
						color:#138EFF;
					}
					.active1{
						color:#f49c17;
					}
					.active2{
						color:#EA2E36;
					}
				}
				.top-number{
					width:100%;
					height: 44upx;
					color:#888888;
					font-size:24upx;
					line-height: 38upx;
				}
			}
			.list-item-center{
				width:100%;
				// height: 200upx;
				border-bottom: 1px solid #eeeeee;
				padding:20upx 0;
				display: flex;
				.center-img{
					width:160upx;
					height: 160upx;
					border-radius: 16upx;
					overflow: hidden;
					image{
						width:100%;
						height: 100%;
					}
				}
				.center-info{
					padding-left: 20upx;
					width:500upx;
					// height: 160upx;
					.info-title{
						font-size: 32upx;
						color:#444444;
					}
					.info-model{
						color:#888888;
						font-size: 24upx;
						line-height: 39upx;
					}
					.info-money{
						font-size:30upx;
						color:#f69b16;
						display: flex;
						justify-content: space-between;
						line-height: 69upx;
						.num{
							color:#666666;
						}
					}
				}
			}
			.list-item-footer{
				width:100%;
				height:100%;
				.total{
					line-height: 62upx;
					font-size: 26upx;
					text-align: right;
					text{
						color:#f49c16;
					}
				}
				.goPay{
					width:100%;
					height: 64upx;
					display: flex;
					font-size:20upx;
					justify-content: flex-end;
					button{
						width:150upx;
						height: 44upx;
						border-radius: 50upx;
						text-align: center;
						line-height:44upx ;
						padding:0;
						border:1px solid #eeeeee;
						color:#666666;
						font-weight: 600;
					}
					.go{
						color:#f49c17;
						border:1px solid #f49c17;
						margin-left: 20upx;
					}
				}
			}
		}
	}
}
.noNumber{
	color:#9f9f9f;
	font-size:22upx;
	text-align: center;
	line-height: 82upx;
	weith:100%;
	height: 82upx;
	font-weight: 600;
}



// 没有数据跳转样式
.none{
	width:100%;
	height:700upx;
	text-align: center;
	image{
		width:100upx;
		height: 100upx;
		margin-top:198upx;
	}
	view{
		color:#999999;
		font-size:26upx;
		line-height: 86upx;
	}
	button{
		width:226upx;
		height: 70upx;
		line-height: 70upx;
		font-size:34upx;
		margin-top:16upx;
		background: #369eff;
	}
}
</style>
