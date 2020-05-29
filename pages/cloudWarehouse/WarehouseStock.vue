<template>
	<view>
		<view class="cloudWarehose_header_box">
			<view class="cloudWarehose_header">
				<view class="stock_top">
					<image :src="goodsInfo.goods_image" mode=""></image>
					<view class="stock_top_title">
						<p>{{goodsInfo.goods_name}}</p>
						<p>单价：<text>{{goodsInfo.price}}</text> </p>
						<view class="quantityIn">
							<p>进货数量</p>
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
				<view class="stock_bottom">
					<view>共 <text>{{number}}</text> 件</view>
					<view>合计： <text>￥{{totalNum}}</text></view>
				</view>
			</view>
			<view class="aaa" v-if="isImage">
				<image :src="images" mode=""></image>
			</view>
			<view class="voucher" @click="UploadDocuments">
				上传打款凭证
			</view>
			<view class="StockSubmit" @click="createAgentGoodsRapport">
				提交
			</view>
			
		</view>
		<tabbarItem></tabbarItem>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	import tabbarItem from "../../components/WarehouseTabbar/tabbar.vue"
	export default {
		components: {
			tabbarItem
		},
		onLoad(option) {
			this.goods_id = option.goods_id
			this.findAgentGoodsInfo()
		},
		onPullDownRefresh() { //下拉刷新
			this.findAgentGoodsInfo()
		},
		data() {
			return {
				number: 1,
				goodsInfo: {
					agent_goods_rapport:{}
				},
				goods_id: null,
				ceshi: null,
				images: '',
				isImage:false
			};
		},
		computed: {
			totalNum: {
				get() {
					var num_total = 0
					// this.arr.forEach(item =>{
					// 	num_total += item.number
					// })
					num_total += this.number * this.goodsInfo.price

					return (Math.round((num_total) * 100) / 100);
				}
			},
		},
		methods: {
			reduceGods() {
				this.number -= 1;
			},
			addGods() {
				this.number += 1;
			},
			getNumber(e){
				this.number = parseInt(e.detail.value)
			},
			findAgentGoodsInfo() { //商品详情
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/findAgentGoodsInfo",
					method: 'POST',
					data: {
						goods_id: this.goods_id
					},
					header: {
						'shop': "1",
						'Authorization': warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.goodsInfo = res.data.data
							console.log(this.goodsInfo)
							uni.stopPullDownRefresh();
						} else if (res.data.errcode === 44) {
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
			createAgentGoodsRapport() { //提交
				if(this.number < 1){
					uni.showToast({title:'进货数量必须大于等于1',icon:'none'})
					return false
				}
				const warehouseToken = uni.getStorageSync('warehouseToken');
				uni.request({
					url: config.webUrl + "/api/agent/createAgentGoodsRapport",
					method: 'POST',
					data: {
						goods_id: this.goods_id,
						number: this.number,
						type: 1,
						price: this.goodsInfo.price,
						payment_img:this.images
					},
					header: {
						'shop': "1",
						'Authorization': warehouseToken
					},
					success: (res) => {
						if (res.data.code == 200) {
							uni.showToast({title:'提交成功',icon:'none'})
							setTimeout(()=>{
								uni.redirectTo({
									url:'/pages/cloudWarehouse/cloudWarehouse'
								})
							},500)
							
							uni.stopPullDownRefresh();
						} else if (res.data.errcode === 44) {
							uni.showToast({
								title: "请重新登录",
								icon: 'none'
							})
							setTimeout(() => {
								uni.redirectTo({
									url: '../../pages/cloudWarehouse/warehouseLogin'
								});
							}, 1000)
						} else {
							uni.showToast({
								title: res.data.errstr,
								icon: 'none'
							})
						}
					}
				})
			},
			UploadDocuments() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						// console.log(JSON.stringify(res.tempFilePaths));
						let imgFiles = res.tempFilePaths;
						for(let i = 0 ; i < imgFiles.length; i++){
							uni.uploadFile({
								// 需要上传的地址
								url: config.webUrl + '/api/document/uploadImage',
								// filePath  需要上传的文件
								filePath: imgFiles[i],
								name: 'image',
								success: (res1) => {
									// 显示上传信息
									console.log(JSON.parse(res1.data))
									// console.log(JSON.stringify(res1.data))
									this.images = JSON.parse(res1.data).data.url
									this.isImage = true
								}
							});
						}
						
					}
				});
			},
			ssllsl() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.aaa{
		width:80%;
		height: 300upx;
		border:1px solid #007AFF;
		margin:0 auto;
		margin-bottom: 40upx;
		image{
			width:100%;
			height: 100%;
		}
	}
	.cloudWarehose_header_box {
		width: 100%;
		height: 100%;
		padding: 0 28upx;
		overflow: hidden;
		.cloudWarehose_header {
			width: 100%;
			height: 356upx;
			border-radius: 20upx;
			margin-top: 20upx;
			box-shadow: 0 0px 10upx #d4d4d4;
			background: #fff;
			padding: 0 32upx;
			margin-bottom: 80upx;
		}
	}

	.stock_top {
		padding-top: 34upx;
		width: 100%;
		height: 254upx;
		border-bottom: 2px solid #f2f2f2;
		display: flex;
		justify-content: space-between;

		image {
			width: 176upx;
			height: 176upx;
			border-radius: 20upx;
		}

		.stock_top_title {
			width: 420upx;
			height: 176upx;
			color: #343434;
			font-size: 26upx;

			p:nth-child(1) {
				font-size: 28upx;
				line-height: 50upx;
			}

			p:nth-child(2) {
				margin-top: 16upx;
				line-height: 50upx;

				text {
					color: #8fc9f7;
				}
			}

			.quantityIn {
				width: 100%;
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

	.stock_bottom {
		width: 100%;
		height: 96upx;
		display: flex;

		view:first-child {
			line-height: 96upx;
			width: 50%;
			height: 100%;
			font-size: 32upx;
			padding-left: 50upx;

			text {
				color: #54aefc;
				margin: 0 10upx;
			}
		}

		view:last-child {
			line-height: 96upx;
			width: 50%;
			height: 100%;
			font-size: 32upx;
			text-align: right;

			text {
				color: #ff615e;
				margin: 0 16upx 0 10upx;
			}
		}
	}

	.voucher {
		width: 396upx;
		height: 76upx;
		background: #53affc;
		text-align: center;
		margin: 0 auto;
		border-radius: 14upx;
		line-height: 76upx;
		color: #fff;
		margin-bottom: 30upx;
	}

	.StockSubmit {
		width: 396upx;
		height: 76upx;
		background: #53affc;
		text-align: center;
		margin: 0 auto;
		border-radius: 14upx;
		line-height: 76upx;
		color: #fff;
	}
</style>
