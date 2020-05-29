//引入配置文件
import config from './config.js';
import User from './user.js'
export default {
	config:{
		baseUrl:config.webUrl,
		header:{
			'shop': 1,
			'Authorization':uni.getStorageSync('token')
		},
		data:{},
		method:"GET",
		dataType:"json",
	},
	
	async request(options = {}){
		try{
			options.header = options.header || this.config.header;
			options.method = options.method || this.config.method;
			options.dataType = options.dataType || this.config.dataType;
			options.url = options.url.indexOf('http://') < 0 ? this.config.baseUrl + options.url : options.url
			let [err, res] = await uni.request(options)
			if (res.data.errcode === 44) {
				let token = '';
				uni.setStorageSync('token', token);
				const openid = uni.getStorageSync('wx_open_id');
				if (openid !== null && openid !== '' && openid !== undefined) {
					let [err1, resp1] = await uni.request({
						url:this.config.baseUrl+"/api/customer/wxLogin",
						data: { 'wx_open_id': openid },
						method:'POST',
						header:{
							'shop':"1"
						},
					})
					if (resp1.data.code !== 200) {
						uni.navigateTo({
							url:'/pages/index/index' 
						});
					}
					if(resp1.data.data.success_message === "success") {
						const token = resp1.data.data.token
						uni.setStorageSync('token', token);
						// TODO
						options.header.Authorization = token
						return uni.request(options)
					}else if(resp1.data.data.success_message === 'not_registered'){
						this.NonSilentLogin()
					}
				} else {
					uni.navigateTo({
						url:'/pages/index/index'
					});
				}
			} else if(res.data.errcode === 66){
				uni.navigateTo({
					url:'/pages/login/login'
				});
			}else if (res.data.code === undefined || res.data.code === null || res.data.code !== 200) {
				await uni.showToast({title:res.data.errstr, icon: "none"})
			}
			return [err, res]
		} catch(e) {
			return Promise.reject()
		}
	},
	get(url,data,options={}){
		options.url = url;
		options.data = data;
		options.method = "GET";
		return this.request(options);
	}, 
	post(url,data,options={}){
		options.url = url;
		options.data = data;
		options.method = "POST";
		options.header = {
			'shop': 1,
			'Authorization':uni.getStorageSync('token')
		}
		return this.request(options);
	},
	NonSilentLogin(){
		location.replace(location.href.replace(location.search, ""));
		const local01 = window.location.href
		let token = uni.getStorageSync('token')
		if(token === ''){
			 location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ config.appid +'&redirect_uri=' + encodeURIComponent(config.webUrl1 + '#/pages/index/index') + '&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
		}else{
			const code1 = this.GGetUrlParam('code')
			this.getftoken(code1)
			console.log(code1)
		}
	},
	GGetUrlParam(name){
		let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
		let r = window.location.search.substr(1).match(reg)
		if(r != null) return unescape(r[2])
		return null
	},
	//获取非静默登录的token
	async getftoken(code1){
		let [err1, resp1] = await uni.request({
			url:this.config.baseUrl+"/api/customer/getWxUserInfo",
			data: { 'code': code1 },
			method:'POST',
			header:{
				'shop':"1"
			},
		})
		if(resp1.data.code === 200){
			let userinfo = resp1.data.data.userinfo
			console.log(resp1.data.data)
			uni.setStorageSync("wx_open_id",userinfo.openid)//同步本地存储
			// 存储下来微信的信息
			uni.setStorageSync('userinfo', userinfo);
			if(userinfo){
				let [err,res] = await this.$http.post('/api/customer/wxRegister', {
						nickname:userinfo.nickname,
						headimgurl:userinfo.headimgurl,
						wx_open_id:userinfo.openid,
				});
				if(res.data.code === 200){
					console.log(res.data.data.token)
					uni.setStorageSync('token',res.data.data.token);
				}
				
			}
		}
	},
	// 请求错误处理封装
	errorCheck(err,res,errfun=false,resfun=false){
		if(err){
			typeof errfun === 'function' && errfun();
		    uni.showToast({title:'加载失败',icon:'none'});
			return false;
		}
		if(res.data.errstr !== ""){
			typeof errfun === 'function' && resfun();
			uni.showToast({title:res.data.code,icon:'none'});
			return false;
		}
		return true;
	}

}