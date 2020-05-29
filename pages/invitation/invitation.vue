<template>
	<view>
		<view class="invitation-box">
			<view class="content-title">填写邀请码</view>
			<view class="content-center">
				<input class="input-x" maxlength="6" @blur="InviteCodeValue" type="text" placeholder="请输入邀请码">
			</view>
			<view class="content-footer">
				<button @click="updateCustomerPinviteCode">完成</button>
				<view class="agreement">
					*只有一次填写机会 请仔细检查
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inviteCode:null,
			};
		},
		onPullDownRefresh() {//下拉刷新
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods:{
			InviteCodeValue(e){
				this.inviteCode = e.detail.value
			},
			async updateCustomerPinviteCode(){
				let [err,res] = await this.$http.post("/api/customer/updateCustomerPinviteCode",{
					pinvite_code:this.inviteCode,
				});
				if(res.data.code == 200){
					uni.redirectTo({
						url:'../vip/vip'
					});
				}else{
					let err = res.data.errstr
					console.log(err)
					uni.showToast({
					    title: err,
					    duration: 2000
					});
					return
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
page{
	background:#ffffff;
}
.invitation-box{
	wdith:100%;
	height:780upx;
	// background: #007AFF;
	padding: 0 94upx;
	.content-title{
		margin-top: 50upx;
		width:100%;
		height: 180upx;
		line-height: 180upx;
		// background: #333333;
		font-size: 44upx;
		color:#339eff;
		font-weight: 900;
	}
	.content-center{
		width:100%;
		height: 440upx;
		// background: #E80080;
		overflow: hidden;
		// position: relative;
		input{
			width:100%;
			height: 63upx;
			border-bottom:1px solid #b6b6b6;
			font-size: 24upx;
		}
		.input-x{
			margin-top:109upx;
		}
	}
	.content-footer{
		button{
			border-radius: 50upx;
			height: 86upx;
			color:#ffffff;
			background: #369eff;
			font-size: 36upx;
			line-height: 86upx;
		}
		.agreement{
			font-size: 20upx;
			color:#f49c17;
			text-align: center;
			line-height: 58upx;
		}
	}
}
</style>
