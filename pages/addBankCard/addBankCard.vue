<template>
	<view>
		<view class="eait-box">
			<!-- 弹出银行卡类型 -->
			<view class="cardType-box" 
				v-if="isCardType" 
				@click.stop="isCardType = false"
			>
				<view class="cardType">
					<view class="cardTypeItem" v-for="(item,index) in BankTypeList" :key="index">
						<view class="item" @click.stop="selectImage(index)">
							<view>{{item.bank_type_name}}</view>
							<image  src="../../static/images/son_0019_right1.png" mode="" v-if="item.isClick === true"></image>
							<image  src="../../static/images/son_0018_right2.png" mode="" v-else></image>
						</view>
						
					</view>
				</view>
			</view>		
			<!-- 修改时显示 -->
			<view class="eait" v-if="isXG">
				<view class="input-box">
					<view class="title">真实姓名</view><input type="text" disabled="true" :value="truename" placeholder="姓名" />
				</view>
				<view class="Text"> 
					<text>卡类型</text> 
					{{cardName === null ? bank_type_name : cardName}}  
					<image src="../../static/images/APP-qie4_0001_箭头.png" mode=""></image>
				</view>
				<view class="input-box">
					<view class="title">银行卡卡号</view><input type="number" disabled="true" maxlength="19" :value="ChangeBankCard.card_number" placeholder="请填写银行卡号" @blur="getCardNumber"/>
				</view>
				<view class="input-box">
					<view class="title">确认银行卡卡号</view><input type="number" disabled="true" maxlength="19" :value="ChangeBankCard.card_number" placeholder="请填写银行卡号" @blur="ConfirmCardNumber"/>
				</view>
				<view class="Text">
					<text>开户地区</text>
					{{ChangeBankCard.province_name}} {{ChangeBankCard.city_name}} {{ChangeBankCard.district_name}}
					<image src="../../static/images/APP-qie4_0001_箭头.png" mode=""></image>
				</view>
				
				<view class="input-box">
					<view class="title">支行名称</view><input class="details" disabled="true" :value="ChangeBankCard.bank_branch" placeholder="" />
				</view>
			</view>
			<!-- 新建时显示 -->
			<view class="eait" v-else>
				<view class="input-box">
					<view class="title">真实姓名</view><input type="text" disabled="true" :value="truename"  placeholder="姓名" />
				</view>
				<view class="Text" @click="getShopBankTypeList"> 
					<text>卡类型</text> 
					{{cardName === null ? "请选择银行" : cardName}}  
					<image src="../../static/images/APP-qie4_0001_箭头.png" mode=""></image>
				</view>
				<view class="input-box">
					<view class="title">银行卡卡号</view><input type="number" maxlength="19" placeholder="填写银行卡号" @blur="getCardNumber"/>
				</view>
				<view class="input-box">
					<view class="title">确认银行卡卡号</view><input type="number" maxlength="19" placeholder="填写银行卡号" @blur="ConfirmCardNumber"/>
				</view>
				<view class="Text" @tap="showMulLinkageThreePicker" v-if="isSS"> 
					<text>开户地区</text>  
					{{pickerText}}
					<image src="../../static/images/APP-qie4_0001_箭头.png" mode=""></image>
				</view>
				<view class="Text" @tap="showMulLinkageThreePicker" v-else>
					<text>开户地区</text>
					{{Province}} {{City}} {{District}}
					<image src="../../static/images/APP-qie4_0001_箭头.png" mode=""></image>
				</view>
				<view class="input-box">
					<view class="title">支行名称</view><input class="details" @blur="getAddress" placeholder="输入开户支行名称" />
				</view>
			</view>
			<view class="default">
				<view class="zi">设为默认银行卡</view>
				<view class="swi">
					<switch :checked="isAA" @change="isButton" style="transform:scale(0.7)" />
				</view>
			</view>
			<view class="del" v-if="isDelete" @click="deleteShopCustomerWallet">删除银行卡信息</view>
		</view>
		<!-- <button type="primary" size="default" @tap="updateCustomerAddress" v-if="isReveal">修改</button> -->
		<!-- <button type="primary" size="default" @tap="createCustomerAddress" v-else>保存</button> -->
		<view class="footer" v-if="isReveal">
			<view class="callOff" @click.stop="callOf">取消</view>
			<view class="keep" @click.stop="updateShopCustomerWalletStatus">修改</view>
		</view>
		<view class="footer" v-else>
			<view class="callOff" @click.stop="callOf">取消</view>
			<view class="keep" @click.stop="bankCardSave">保存</view>
		</view>
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
			this.getShopCustomerWalletInfo()
		},
		onLoad(option) {
			this.id = option.shop_customer_wallet_id
			this.status = option.status
			if(option.id || option.status){
				this.getShopCustomerWalletInfo()
			}
			if(option.shop_customer_wallet_id !== undefined){
				this.isXG = true
				this.isReveal = true
			}
			if(this.status === 1){
				this.isDelete = true
			}else if(this.status === 2 ){
				this.isDelete = false
			}		
			this.updateCustomerInfo()
		},
		data() {
			return {
				isCardType:false,
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
				status:null,
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
				BankTypeList:[],
				cardName:null,
				cardNumber:null,
				confirmCardNumber:null,
				card_number:null,//银行卡号
				bank_type_id:null,//卡类型id
				ChangeBankCard:{},//修改的数据
				bank_type_name:null,
				truename:'姓名'
			};
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
			getCardNumber(e){//填写银行卡号
				this.cardNumber = e.detail.value
				// console.log(this.cardNumber)
				this.luhmCheck(this.cardNumber)
			},
			ConfirmCardNumber(e){//再次填写银行卡号
				this.confirmCardNumber = e.detail.value
				// console.log(this.confirmCardNumber)
				this.luhmCheck(this.confirmCardNumber)
				if(this.cardNumber !== this.confirmCardNumber){
					uni.showToast({title:'两次银行卡号不同',icon:'none'});
				}else{
					this.card_number = this.confirmCardNumber
				}
			},
		   luhmCheck(bankno){//银行卡号验证
			  var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）
			  var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
			  var newArr=new Array();
			  for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
				  newArr.push(first15Num.substr(i,1));
			  }
			  var arrJiShu=new Array();  //奇数位*2的积 <9
			  var arrJiShu2=new Array(); //奇数位*2的积 >9
			  var arrOuShu=new Array();  //偶数位数组
			  for(var j=0;j<newArr.length;j++){
				  if((j+1)%2==1){//奇数位
					  if(parseInt(newArr[j])*2<9)
					  arrJiShu.push(parseInt(newArr[j])*2);
					  else
					  arrJiShu2.push(parseInt(newArr[j])*2);
				  }
				  else //偶数位
				  arrOuShu.push(newArr[j]);
			  }
			  var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
			  var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
			  for(var h=0;h<arrJiShu2.length;h++){
				  jishu_child1.push(parseInt(arrJiShu2[h])%10);
				  jishu_child2.push(parseInt(arrJiShu2[h])/10);
			  }        
			  var sumJiShu=0; //奇数位*2 < 9 的数组之和
			  var sumOuShu=0; //偶数位数组之和
			  var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
			  var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
			  var sumTotal=0;
			  for(var m=0;m<arrJiShu.length;m++){
				  sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
			  }
			  for(var n=0;n<arrOuShu.length;n++){
				  sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
			  }
			  for(var p=0;p<jishu_child1.length;p++){
				  sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
				  sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
			  }      
			  //计算总和
			  sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
			  //计算Luhm值
			  var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;        
			  var luhm= 10-k;
			  if(lastNum==luhm){
			  //$("#banknoInfo").html("Luhm验证通过")
			  return true;
			  }
			  else{
			  //$("#banknoInfo").html("银行卡号必须符合Luhm校验")
			   uni.showToast({title:'请填写正确银行卡号',icon:'none'});
			  return false;
			  }        
		  },
			async bankCardSave(){//保存   创建
				let [err,res] = await this.$http.post("/api/customer/createShopCustomerWallet",{
					wallet_type:1,
					status:this.status,
					card_number:this.card_number,
					bank_type_id:this.bank_type_id,
					province:this.province,
					city:this.city,
					district:this.district,
					bank_branch:this.address
				});
				if(res.data.code === 200){
					console.log(res.data.data)
					uni.showToast({title:'创建成功',icon:'none'});
					setTimeout(()=>{
						uni.redirectTo({
						    url: '../myCardBag/myCardBag'
						});
					}, 10);
				}
			},
			async getShopCustomerWalletInfo(){// 获取银行卡信息信息
				let [err,res] = await this.$http.post("/api/customer/getShopCustomerWalletInfo",{
					shop_customer_wallet_id:this.id
				});
				if(res.data.code === 200){
					this.ChangeBankCard = res.data.data
					this.bank_type_name = this.ChangeBankCard.shop_bank_type.bank_type_name
					this.status = this.ChangeBankCard.status
					if(this.status === 1){
						this.isAA = true
						this.isDelete = false
					}
					uni.stopPullDownRefresh();
				}
			},
			async updateShopCustomerWalletStatus(){//修改
				let [err,res] = await this.$http.post("/api/customer/updateShopCustomerWalletStatus",{
					shop_customer_wallet_id:this.id,
					status:this.status
				});
				if(res.data.code === 200){
					// console.log(this.status)
					uni.redirectTo({
					    url: '../myCardBag/myCardBag'
					});
				}
			},
			async deleteShopCustomerWallet(){
				let [err,res] = await this.$http.post("/api/customer/deleteShopCustomerWallet",{
					shop_customer_wallet_id:this.id
				});
				if(res.data.code === 200){
					uni.redirectTo({
					    url: '../myCardBag/myCardBag'
					});
				}
			},
			callOf(){//取消
				uni.redirectTo({
				    url: '../myCardBag/myCardBag'
				});
			},
			getAddress(e){
				this.address = e.detail.value
			},
			async getShopBankTypeList(){//卡类型  拿bank_type_id
				  this.BankTypeList = []
				  this.isCardType = true
				  let [err,res] = await this.$http.post("/api/customer/getShopBankTypeList");
				  if(res.data.code === 200){
					  // console.log(res.data.data)
					  let list = res.data.data
					  for(let i = 0 ; i < list.length; i++){
						  this.BankTypeList.push({
							bank_type_name:list[i].bank_type_name,
							bank_type_id : list[i].id,
							isClick:false
						  })
					  } 
				  }
			},
			selectImage(index){
				for(let k = 0; k < this.BankTypeList.length; k++){
					if(index === k){
						this.BankTypeList[k].isClick = true;
						this.cardName = this.BankTypeList[k].bank_type_name
						this.bank_type_id = this.BankTypeList[k].bank_type_id
						// console.log(this.bank_type_id)
					}else{
						this.BankTypeList[k].isClick = false
					}
				}
			},
			isButton(e){
				if(e.detail.value === false){
					e.detail.value = 2
				}else{
					e.detail.value = 1
				}
				this.status = e.detail.value
				// console.log(this.status)
				if(this.status === 2){
					this.isDelete = true
					this.status = 2
				}else if(this.status === 1){
					this.isDelete = false
					this.status = 1
					
				}
			},
			async updateCustomerInfo(){//获取真实姓名
				let [err,res] = await this.$http.post("/api/customer/updateCustomerInfo");
				if(res.data.code === 200){
					this.truename = res.data.data.truename
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cardType-box{
		width:100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
		position:fixed;
		top:0;
		left:0;
		z-index: 20;
		.cardType{
			width:100%;
			height: 700upx;
			border-radius: 20px 20px 0px 0px;
			position:absolute;
			bottom: 0;
			padding: 0 50upx;
			background: #ffffff;
			.cardTypeItem{
				width:100%;
				height: 100upx;
				line-height: 100upx;
				.item{
					display: flex;
					justify-content: space-between;
				}
				view{
					font-size:26upx;
					font-weight:400;
					color:rgba(102,102,102,1);
				}
				image{
					width:30upx;
					height:30upx;
					margin-top:36upx;
				}
			}
		}
	}
	.footer{
		width:100%;
		height: 100upx;
		background: #1AAD19;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		view{
			width:50%;
			height: 100upx;
			color:#ffffff;
			font-size:30upx;
			text-align: center;
			line-height: 100upx;
		}
		.callOff{
			background: #EC373E;
		}
		.keep{
			background: #369EFF;
		}
	}
	.Text{
		width:100%;
		height:80upx;
		font-size:22upx;
		line-height: 80upx;
		color:#878787;
		border-bottom: 1px solid #f0f0f0;
		position:relative;
		text{
			width:220upx;
			display:inline-block;
			height: 80upx;
			color:#000000;
			font-size: 26upx;
		}
		image{
			width:12upx;
			height: 22upx;
			transform: rotate(90deg);
			position: absolute;
			right:10upx;
			top:26upx;
		}
	}
.eait-box{
	width:100%;
	height: 100%;
}
.eait{
	width:100%;
	height: 498upx;
	background:#ffffff;
	padding: 0 30upx;
	.input-box{
		width:100%;
		height: 81upx;
		display: flex;
		border-bottom: 1px solid #f0f0f0;
		.title{
			// display: inline-block;
			width:220upx;
			height: 81upx;
			font-size:26upx;
			line-height: 81upx;
		}
	}
	input{
		width:440upx;
		height: 81upx;
		color:#999999;
		font-size: 26upx;
		// display: inline-block;
		
	}
	.details{
		border:0;
	}
}
.default{
	width:100%;
	height: 84upx;
	background: #ffffff;
	margin-top:20upx;
	display: flex;
	margin-bottom:20upx;
	.zi{
		width:200upx;
		font-size:26upx;
		color:#444444;
		line-height: 84upx;
		margin-left: 30upx;
	}
	.swi{
		margin-left: 400upx;
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
