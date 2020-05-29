import User from '../../common/user.js'
import request from "../../common/request.js"
import config from "../../common/config.js"
export default {
	//静默登录
	getBecomeSilent({commit,state}){
		console.log("静默")
		const openid = uni.getStorageSync('wx_open_id');
		if (openid) {
			commit("GET_OPENID",openid)
			return
		}
		// const AppId = config.appId
		const code = getUrlParam('code')
		const local = window.location.href
		if(code === undefined || code === null || code === ''){
			location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
		}else{
			let code2 = code
			uni.request({
				url: config.webUrl + "/api/customer/getCustomerWxOpenId",
				data: {
					code:code2 
				},
				header: {
					'shop': 1, //自定义请求头信息
				},
				success: (res) => {
					console.log(res)
					if(res.data.code !== 200){
						console.log(res.data.errstr)
						return
					}
					let datas = res.data.data.openid
					if(datas !== null && datas !== undefined && datas !==''){
						commit("GET_OPENID",datas)
						uni.setStorageSync("wx_open_id",openid)//同步本地存储
					}	
					return 
				},
			})
		}
	},
	//通过token换取用户信息
	async getUserInfo({commit,state}){//通过token换用户信息
		let openid = state.loginInfo.openId
		let token = state.loginInfo.token
		if (token === '' || token === undefined || token === null) {
			// const openid = uni.getStorageSync('wx_open_id');
			if (openid !== null && openid !== '' && openid !== undefined) {
				let [err1, resp1] =  await uni.request({
					url:config.webUrl+"/api/customer/wxLogin",
					data: { 'wx_open_id': openid },
					methods:'POST',
					header:{
						'shop':"1"
					},
				})
				if(resp1.data.data.success_message === "success") {
					let token1 = resp1.data.data.token
					commit("GET_TOKEN",token1)
					// console.log(token1)
					uni.setStorageSync('token', token1)
				} 
			}else{
				console.log("没有openid信息")
			}
		}
		// uni.request({
		// 	url: config.webUrl + "/api/customer/getCustomerInfo",
		// 	header: {
		// 		'shop': 1, //自定义请求头信息
		// 		"Authorization":state.loginInfo.token
		// 	},
		// 	success: (res) => {
		// 		if(res.data.code !== 200){
		// 			return
		// 		}
		// 		let userObj = res.data.data
		// 		commit("GET_CUSTOMER_INFO",userObj)
		// 	},
		// })
		uni.request({
			url: config.webUrl + "/api/customer/getCustomerInfo",
			header: {
				'shop': 1, //自定义请求头信息
				"Authorization":state.loginInfo.token
			},
			success: (res) => {
				if(res.data.code !== 200){
					return
				}
				let userObj = res.data.data
				commit("GET_CUSTOMER_INFO",userObj)
			},
		})
		
		
	},
}
function getUrlParam(name){
	console.log("获取code")
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
	var r = window.location.search.substr(1).match(reg)
	if(r != null) return unescape(r[2])
	return null
}
function getOpenId(code){
	console.log("获取openid")
	uni.request({
		url: config.webUrl + "/api/customer/getCustomerWxOpenId",
		data: {
			code
		},
		header: {
			'shop': 1, //自定义请求头信息
		},
		success: (res) => {
			console.log(res)
			if(res.data.code !== 200){
				console.log(res.data.errstr)
				return
			}
			let datas = res.data.data.openid
			uni.setStorageSync("wx_open_id",openid)//同步本地存储
		},
	})
}