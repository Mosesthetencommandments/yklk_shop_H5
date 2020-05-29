<template>
	<view>
		<view class="eait-box">
			<!-- 修改时显示 -->
			<view class="eait" v-if="isXG">
				<!-- v-model="receive_name" -->
				<input type="text" :value="receive_name" placeholder="收货人" @blur="getName" /> 
				<input type="number" :value="phone" maxlength="11" placeholder="手机号码" @blur="getPhone"/>
				<view class="Text" @tap="showMulLinkageThreePicker" v-if="isSS">{{pickerText}}</view>
				<view class="Text" @tap="showMulLinkageThreePicker" v-else>{{province_a}}</view>
				<input class="details" type="text" color="#c2e2ff"  @blur="getAddress" :value="address" placeholder="详细地址:如道路、门牌号、小区、楼栋号、单元室等" />
			</view>
			<!-- 新建时显示 -->
			<view class="eait" v-else>
				<input type="text" placeholder="收货人" @blur="getName" />
				<input type="number" maxlength="11" placeholder="手机号码" @blur="getPhone"/>
				<view class="Text" @tap="showMulLinkageThreePicker" v-if="isSS">{{pickerText}}</view>
				<view class="Text" @tap="showMulLinkageThreePicker" v-else>{{Province}} {{City}} {{District}}</view>
				<input class="details" type="text" color="#c2e2ff"  @blur="getAddress" placeholder="详细地址:如道路、门牌号、小区、楼栋号、单元室等" />
			</view>
			<view class="default">
				<view class="zi">设为默认地址</view>
				<view class="swi">
					<switch :checked="isAA" @change="isButton" style="transform:scale(0.7)" />
				</view>
			</view>
			<view class="del" v-if="isDelete" @click="delAddress">删除收货地址</view>
		</view>
		<button type="primary" size="default" @tap="updateCustomerAddress" v-if="isReveal">修改</button>
		<button type="primary" size="default" @tap="createCustomerAddress" v-else>保存</button>
		<mpvue-city-picker themeColor="#007AFF" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		  @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from "../../components/mpvue-citypicker/mpvueCityPicker.vue"
	export default {
		components:{
			mpvueCityPicker
		},
		onPullDownRefresh() {//下拉刷新
			this.getCustomerAddressInfo()
		},
		onLoad(option) {
			this.d_integral = option.d_integral
			// console.log(option)
			if(option.dontJump == 1){
				this.noGopay = true
			}
			if(option.warehouse === 'warehouse'){
				this.warehouse = true
			}
			this.id = option.id
			this.modification = option.modification
			if(option.id || option.modification){	
				this.getCustomerAddressInfo()
			}
			if(option.modification){
				this.isXG = true
				this.isReveal = true
			}
			if(this.is_default === 0){
				this.isDelete = true
			}else if(this.is_default === 1 ){
				this.isDelete = false
			}
		},
		data() {
			return {
				warehouse:false,
				noGopay:false,
				isAA:false,
				cityPickerValueDefault:[0,0,1],
				pickerText:'所在地区',
				name:null,
				isXG:false,
				receive_name:null,
				phone:null,
				postcode:null,
				province:null,
				city:null,
				district:null,
				address:null,
				is_default:null,
				isDelete:true,
				id:null,
				newid:null,
				newReceive_name:"",
				newPhone:"",
				newProvince_name:null,
				newCity_name:null,
				newDistrict_name:null,
				newAddress:"",
				isSS:true,
				Province:null,
				City:null,
				district_name:null,
				isReveal:false,
				d_integral:null
			};
		},
		computed:{
			province_a(){
				var province_address = ''
				province_address = this.pickerText
				return province_address
			}
		},
		methods:{
			//省市县三级联动
			showMulLinkageThreePicker(){
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e){
				this.pickerText = e.label
				this.province = e.provinceCode
				this.city = e.cityCode
				this.district = e.areaCode
				// console.log(e)
			},
			onBackPress() {
			  if (this.$refs.mpvueCityPicker.showPicker) {
			  	this.$refs.mpvueCityPicker.pickerCancel();
			    return true;
			  }
			},
			onUnload() {
				if (this.$refs.mpvueCityPicker.showPicker) {
					this.$refs.mpvueCityPicker.pickerCancel()
				}
			},
			getName(e){
				this.receive_name = e.detail.value
			},
			getPhone(e){
				let a = /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(Number(e.detail.value))
				if(!a){
					uni.showToast({
					    title: '手机号错误',
					    duration: 1500,
						icon:'none'
					});
					return false
				}else{
					typeof(Number(this.phone))
					this.phone = e.detail.value
				}
			},
			getAddress(e){
				this.address = e.detail.value
			},
			async getCustomerAddressInfo(){//获取地址信息
				let [err,res] = await this.$http.post("/api/customer/getCustomerAddressInfo",{id:this.id});
				if(res.data.code == 200){
					let list = res.data.data
					// console.log(list)
					this.receive_name=list.receive_name
					this.phone=list.phone
					this.province=list.province
					this.city=list.city
					this.district=list.district
					this.address=list.address
					this.is_default=list.is_default
					this.Province=list.province_name
					this.City=list.city_name
					this.District=list.district_name
					this.pickerText = this.Province + ' ' + this.City + ' '+ this.District
					if(this.newIs_default === 1){
						this.isDelete = false
					}
					if(this.is_default === 1){
						this.isAA = true
						this.isDelete = false
					}
					this.isSS = false
					uni.stopPullDownRefresh();
				}	
			},
			async createCustomerAddress(){//创建
				if(this.receive_name === '' || this.receive_name === undefined || this.receive_name === null){
					uni.showToast({
						title: '请添加收货人',
						icon:"none",
						duration: 1000,
					})
					return
				}
				if(this.phone === '' || this.phone === undefined || this.phone === null){
					uni.showToast({
						title: '请添加收货人手机号码',
						icon:"none",
						duration: 1000,
					})
					return
				}
				if(this.city === '' || this.city === undefined || this.city === null){
					uni.showToast({
						title: '请添加城市',
						icon:"none",
						duration: 1000,
					})
					return
				}
				let [err,res] = await this.$http.post("/api/customer/createCustomerAddress",{
					receive_name:this.receive_name,
					phone:this.phone,
					province:this.province,
					city:this.city,
					district:this.district,
					address:this.address,
					is_default:this.is_default
				})
				if(res.data.code == 200){
					if(this.noGopay === true){
						uni.navigateTo({
						    url: '../address/address?dontJump=1'
						});
					}else if(this.d_integral == 'dxs'){
						uni.redirectTo({
							url:'../address/address?d_integral=dxs'
						})
					}else{
						uni.navigateTo({
						    url: '../address/address'
						});
					}	
				}			
			},
			async updateCustomerAddress(){//修改
				let [err,res] = await this.$http.post("/api/customer/updateCustomerAddress",{
					id:this.id,
					receive_name:this.receive_name,
					phone:this.phone,
					province:this.province,
					city:this.city,
					district:this.district,
					address:this.address,
					is_default:this.is_default
				});
				if(res.data.code == 200){ 
					if(this.noGopay === true){
						uni.redirectTo({
						    url: '../address/address?dontJump=1'
						});
					}else if(this.d_integral == 'dxs'){
						uni.redirectTo({
						    url: '../address/address?d_integral=dxs'
						});
					}else{
						uni.redirectTo({
						    url: '../address/address'
						});
					}
				}
			},
			async delAddress(){ //删除收货地址
				let [err,res] = await this.$http.post("/api/customer/deleteCustomerAddress",{id:this.id});
				if(res.data.code == 200){
					if(this.this.d_integral == 'dxs'){
						uni.redirectTo({
						    url: '../address/address?d_integral=dxs'
						});
					}else{
						uni.redirectTo({
						    url: '../address/address'
						});
					}
					
				}
			},
			isButton(e){
				console.log(e.detail.value)
				if(e.detail.value === false){
					e.detail.value = 0
				}else{
					e.detail.value = 1
				}
				this.is_default = e.detail.value
				// console.log(this.is_default)
				if(this.is_default === 0){
					this.isDelete = true
					this.is_default = 0
				}else if(this.is_default === 1){
					this.isDelete = false
					this.is_default = 1
					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Text{
		width:100%;
		height:80upx;
		font-size:22upx;
		line-height: 80upx;
		color:#878787;
		border-bottom: 1px solid #f0f0f0;
	}
.eait-box{
	width:100%;
	height: 100%;
}
.eait{
	width:100%;
	height: 356upx;
	background:#ffffff;
	padding: 0 30upx;
	input{
		width:100%;
		height: 81upx;
		border-bottom: 1px solid #f0f0f0;
		color:#999999;
		font-size: 26upx;
	}
	.details{
		border:0;
	}
}
.default{
	width:100%;
	height: 84upx;
	background: #fff;
	margin-top:20upx;
	display: flex;
	margin-bottom:20upx;
	display: flex;
	justify-content: space-between;
	.zi{
		width:50%;
		height: 84upx;
		font-size:26upx;
		color:#444444;
		line-height: 84upx;
		margin-left: 30upx;
	}
	.swi{
		line-height: 84upx;
	}
}
.del{
	width:100%;
	height: 84upx;
	background: #ffffff;
	display: flex;
	font-size:26upx;
	color:#ec373e;
	line-height: 84upx;
	padding-left: 30upx;
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
