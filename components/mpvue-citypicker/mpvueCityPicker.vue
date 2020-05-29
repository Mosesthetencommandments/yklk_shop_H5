
<template>
	<div class="mpvue-picker">
		<div :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></div>
		<div class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
			<div class="mpvue-picker__hd" catchtouchmove="true">
				<div class="mpvue-picker__action" @click="pickerCancel">取消</div>
				<div class="mpvue-picker__action" :style="{color:themeColor}" @click="pickerConfirm">确定</div>
			</div>
			<picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange">
				<block>
					<picker-view-column>
						<div class="picker-item" v-for="(item,index) in provinceDataList" :key="index">{{item.label}}</div>
					</picker-view-column>
					<picker-view-column>
						<div class="picker-item" v-for="(item,index) in cityDataList" :key="index">{{item.label}}</div>
					</picker-view-column>
					<picker-view-column>
						<div class="picker-item" v-for="(item,index) in areaDataList" :key="index">{{item.label}}</div>
					</picker-view-column>
					
					
					
					<!-- <picker-view-column>
						<div class="picker-item"></div>
					</picker-view-column>
					<picker-view-column>
						<div class="picker-item" ></div>
					</picker-view-column>
					<picker-view-column>
						<div class="picker-item" ></div>
					</picker-view-column> -->
				</block>
			</picker-view>
		</div>
	</div>
</template>

<script>
	import $http from "../../common/request.js"
	// import provinceData from './city-data/province.js';
	// import cityData from './city-data/city.js';
	// import areaData from './city-data/area.js';
	export default {
		data() {
			return {
				provinceData: [],
				cityData: [],
				areaData: [],
				pickerValue: [0, 0, 0],
				provinceDataList: [],
				cityDataList: [],
				areaDataList: [],
				/* 是否显示控件 */
				showPicker: false,
				iji:[]
			};
		},
		created() {
			this.jjj()
		},
		beforeMount() {
			
		},
		props: {
			/* 默认值 */
			pickerValueDefault: {
				type: Array,
				default () {
					return [0, 0, 0]
				}
			},
			/* 主题色 */
			themeColor: String
		},
		watch: {
			pickerValueDefault() {
				this.init();
			}
		},
		methods: {
			init() {
				this.handPickValueDefault(); // 对 pickerValueDefault 做兼容处理

				const pickerValueDefault = this.pickerValueDefault

				this.cityDataList = this.cityData[pickerValueDefault[0]];
				this.areaDataList = this.areaData[pickerValueDefault[0]][pickerValueDefault[1]];
				this.pickerValue = pickerValueDefault;
				
			},
			show() {
				setTimeout(() => {
					this.showPicker = true;
				}, 0);
			},
			maskClick() {
				this.pickerCancel();
			},
			pickerCancel() {
				this.showPicker = false;
				this._$emit('onCancel');
			},
			pickerConfirm(e) {
				this.showPicker = false;
				this._$emit('onConfirm');
			},
			showPickerView() {
				this.showPicker = true;
			},
			handPickValueDefault() {
				const pickerValueDefault = this.pickerValueDefault

				let provinceIndex = pickerValueDefault[0]
				let cityIndex = pickerValueDefault[1]
				const areaIndex = pickerValueDefault[2]
				if (
					provinceIndex !== 0 ||
					cityIndex !== 0 ||
					areaIndex !== 0
				) {
					if (provinceIndex > this.provinceData.length - 1) {
						this.pickerValueDefault[0] = provinceIndex = this.provinceData.length - 1;
					}
					if (cityIndex > this.cityData[provinceIndex].length - 1) {
						this.pickerValueDefault[1] = cityIndex = this.cityData[provinceIndex].length - 1;
					}
					if (areaIndex > this.areaData[provinceIndex][cityIndex].length - 1) {
						this.pickerValueDefault[2] = this.areaData[provinceIndex][cityIndex].length - 1;
					}
				}
			},
			pickerChange(e) {
				let changePickerValue = e.mp.detail.value;
				if (this.pickerValue[0] !== changePickerValue[0]) {
					// 第一级发生滚动
					this.cityDataList = this.cityData[changePickerValue[0]];
					this.areaDataList = this.areaData[changePickerValue[0]][0];
					changePickerValue[1] = 0;
					changePickerValue[2] = 0;
				} else if (this.pickerValue[1] !== changePickerValue[1]) {
					// 第二级滚动
					this.areaDataList = this.areaData[changePickerValue[0]][changePickerValue[1]];
					// console.log(this.areaDataList)
					changePickerValue[2] = 0;
				}
				this.pickerValue = changePickerValue;
				this._$emit('onChange');
			},
			_$emit(emitName) {
				let pickObj = {
					label: this._getLabel(),
					value: this.pickerValue,
					provinceCode: this._getProvinceCode(),
					cityCode: this._getCityCode(),
					areaCode: this._getAreaCode()
				};
				this.$emit(emitName, pickObj);
			},
			_getLabel() {
				let cityName = ''
				let areaName = ''
				try {
					cityName = ' '+this.cityDataList[this.pickerValue[1]].label
					areaName = ' '+this.areaDataList[this.pickerValue[2]].label
				} catch (e) {
					
				}
				let pcikerLabel =
					this.provinceDataList[this.pickerValue[0]].label + cityName + areaName;
				return pcikerLabel;
			},
			_getProvinceCode() {
				return this.provinceDataList[this.pickerValue[0]].value;
			},
			_getCityCode() {
				return this.cityDataList[this.pickerValue[1]] !== undefined ? this.cityDataList[this.pickerValue[1]].value : '';
			},
			_getAreaCode() {
				return this.areaDataList !== undefined && this.areaDataList[this.pickerValue[2]] !== undefined ? this.areaDataList[this.pickerValue[2]].value : '';
			},
			//获取省的数组
			async jjj(){
				let [err,res] = await $http.post("/api/orders/getOrdersAreaList");
				if(res.data.code == 200){
					let list = res.data.data
					let arr = []
					const provinceArr = []
					const cityArr = []
					const areaArr = []
					for (let i = 0; i < list.length; i++) {
						cityArr[i] = []
						areaArr[i] = []
						provinceArr.push({ label:list[i].area_name, value: list[i].area_number })
						if (!list[i].hasOwnProperty('children')) {
							continue;
						}
						for (let j = 0; j < list[i]['children'].length; j++) {
							if (!list[i]['children'][j].hasOwnProperty('children')) {
								continue;
							}
							
							cityArr[i].push({ label:list[i]['children'][j].area_name, value: list[i]['children'][j].area_number })
							areaArr[i][j] = []
							for (let k = 0; k < list[i]['children'][j]['children'].length; k++ ) {
								areaArr[i][j].push({ label:list[i]['children'][j]['children'][k].area_name, value: list[i]['children'][j]['children'][k].area_number })
								// console.log(areaArr[i][j])
							}
						}
					}
					this.provinceData = provinceArr
					this.cityData = cityArr
					this.areaData = areaArr
					this.provinceDataList = provinceArr
					this.cityDataList = cityArr[0]
					this.areaDataList = areaArr[0][0]
					this.init()
				}
			}
		}
	};
</script>

<style>
	.pickerMask {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	.mpvue-picker-content {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		transition: all 0.3s ease;
		transform: translateY(100%);
		z-index: 3000;
	}

	.mpvue-picker-view-show {
		transform: translateY(0);
	}

	.mpvue-picker__hd {
		display: flex;
		padding: 9px 15px;
		background-color: #fff;
		position: relative;
		text-align: center;
		font-size: 17px;
	}

	.mpvue-picker__hd:after {
		content: ' ';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1px solid #e5e5e5;
		color: #e5e5e5;
		transform-origin: 0 100%;
		transform: scaleY(0.5);
	}

	.mpvue-picker__action {
		display: block;
		flex: 1;
		color: #1aad19;
	}

	.mpvue-picker__action:first-child {
		text-align: left;
		color: #888;
	}

	.mpvue-picker__action:last-child {
		text-align: right;
	}

	.picker-item {
		text-align: center;
		line-height: 40px;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 16px;
	}

	.mpvue-picker-view {
		position: relative;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 238px;
		background-color: rgba(255, 255, 255, 1);
	}
</style>
