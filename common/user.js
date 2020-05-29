import $http from "./request.js"
export default {
	//用户token
	token:false,
	//openid
	openid:false,
	//用户信息
	userinfo:false,
	//初始话
	__init(){
		//获取用户信息
		this.userinfo == uni.getStorageSync("userinfo");
		this.token = uni.getStorageSync("token");
		this.openid = uni.getStorageSync("openid")
	},
	//登录
	async login(option = {}){
		//请求登录
		let [err,res] = await $http.post(option.url,option.data)
		// // //登录失败
		// if(!http.errorCheck(err,res)) return false;
		//登录成功 保存状态
		this.token = res.data.data.token;
		this.userinfo = this.__formatUserinfo(res.data.data)
		//本地存储
		uni.setStorageSync("userinfo",this.userinfo);
		uni.setStorageSync("token",this.token);
		//成功提示
		
		//返回上一 步
		if (!options.Noback){
			uni.navigateBack({
				delta:1
			})
			
		}
		return true;
	},
	//权限跳转
	navigate(options,type = 'navigateTo'){
		//权限验证
		if(!this.token && this.openid){
			return uni.navigateTo({url:'/pages/login/login'});
		}
		if(!this.openid){
			return uni.navigateTo({url:'/pages/index/index'});
		}
		if(res.data.code === 44){
			return uni.navigateTo({url:'/pages/login/login'});
		}
		//跳转 
		switch (type){
			case "uni.navigateTo":
			uni.navigateTo(options);
				break;
			case "redirectTo":
			uni.redirectTo(options);
				break;
			case "reLaunch":
			uni.reLaunch(options);
				break;
			case "switchTab":
			uni.switchTab(options);
				break;
		}
	},
	__formatUserinfo(obj){
		return {
			id: obj.user_account.id || obj.id,
			user_id:obj.user_account.user_id,
			phone:obj.phone || '',
			username: obj.user_account.nickname || obj.nickname,
			userpic: obj.user_headimgurl || obj.user_account.head_img,
			create_time: obj.created_at || obj.user_account.created_at,
			token: obj.user_account.token,
			wx_open_id:obj.wx_open_id || '',
			invite_code:obj.invite_code || '',
		}
	},
}