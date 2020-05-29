const getters = {
	openId: state => state.loginInfo.openId,
	token: state => state.loginInfo.token,
	userInfo: state => state.userInfo
}

export default getters