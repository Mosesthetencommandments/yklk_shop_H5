Vue.prototype.sendRequest = function(param,backpage, backtype){
    var _self = this, 
        url = param.url,
        method = param.method,
        header = {},
        data = param.data || {}, 
        token = "";
        
    //拼接完整请求地址
    var requestUrl = this.siteBaseUrl + url;
    //固定参数:仅仅在小程序绑定页面通过code获取token的接口默认传递了参数token = login
    if(!data.token){//其他业务接口传递过来的参数中无token
        token = uni.getStorageSync(this.sessionKey);//参数中无token时在本地缓存中获取
        console.log("当前token:" + token);
        if(!token){//本地无token需重新登录(退出时清缓存token)
            _self.login(backpage, backtype);
            return;
        }else{
            data.token = token;
        }
    }
    var timestamp = Date.parse(new Date());//时间戳
    data["timestamp"] = timestamp;
    // #ifdef MP-WEIXIN
    data["device"] = "wxapp";
    data["ver"] = "1.1.30";
    // #endif
    // #ifdef APP-PLUS || H5
    data["device"] = "iosapp";
    data["ver"] = "1.0.0";
    // #endif
    
    //请求方式:GET或POST(POST需配置header: {'content-type' : "application/x-www-form-urlencoded"},)
    if(method){
        method = method.toUpperCase();//小写改为大写
        if(method=="POST"){
            header = {'content-type' : "application/x-www-form-urlencoded"};
        }else{
            header = {'content-type' : "application/json"};
        }
    }else{
        method = "GET";
        header = {'content-type' : "application/json"};
    }
    //用户交互:加载圈
    if (!param.hideLoading) {
        uni.showLoading({title:'加载中...'});
    }
    
    console.log("网络请求start");
    //网络请求
    uni.request({
        url: requestUrl,
        method: method,
        header: header,
        data: data,
        success: res => {
            console.log("网络请求success:" + JSON.stringify(res));
            if (res.statusCode && res.statusCode != 200) {//api错误
                uni.showModal({
                    content:"" + res.errMsg
                });
                return;
            }
            if (res.data.code) {//返回结果码code判断:0成功,1错误,-1未登录(未绑定/失效/被解绑)
                if (res.data.code == "-1") {
                    _self.login(backpage, backtype);
                    return;
                }
                if (res.data.code != "0") {
                    uni.showModal({
                        showCancel:false,
                        content:"" + res.data.msg
                    });
                    return;
                }
            } else{
                uni.showModal({
                    showCancel:false,
                    content:"No ResultCode:" + res.data.msg
                });
                return;
            }
            typeof param.success == "function" && param.success(res.data);
        },
        fail: (e) => {
            console.log("网络请求fail:" + JSON.stringify(e));
            uni.showModal({
                content:"" + e.errMsg
            });
            typeof param.fail == "function" && param.fail(e.data);
        },
        complete: () => {
            console.log("网络请求complete");
            uni.hideLoading();
            typeof param.complete == "function" && param.complete();
            return;
        }
    });
}