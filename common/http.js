//引入配置文件
import config from './config.js';

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
	interceptor:{
		request:null,
		response:null
	},
	request(options){
		if(!options){
			options = {}
		}
		options.header = options.header || this.config.header;
		options.method = options.method || this.config.method;
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.url.indexOf('http://') < 0 ? this.config.baseUrl + options.url : options.url
		options.data =  options.data || {}
		return new Promise((resolve,reject) => {
			let _config = null
			options.complete = (response) => {
				let statusCode = response.statusCode
				if(statusCode === 200){
					
				}else{
					
				}
			}
		})
	}
}