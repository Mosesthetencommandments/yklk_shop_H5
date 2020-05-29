import request from "../../common/request.js"
export default {
	GET_OPENID:(state,openid) => {
		state.loginInfo.openId = openid
	},
	GET_TOKEN:(state,token) => {
		state.loginInfo.token = token
	},
	GET_CUSTOMER_INFO:(state,obj) => {
		state.userInfo = obj
	},
}