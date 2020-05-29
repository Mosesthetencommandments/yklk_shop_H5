<template>
    <div class="tabbar">
        <TabItem txt="首页" mark="pages/index/index" :sel="selected" @change-selected="changeSelected">
            <img slot="normalImg" src="../../static/images/APP-01_0007_DI-1.png" alt="">
            <img slot="activeImg" src="../../static/images/APP-01_0003_DI-choose1.png" alt="">
        </TabItem>
        <TabItem txt="直播" 
			mark="pages/share/live" 
			:sel="selected" 
			@change-selected="changeSelected">
            <img slot="normalImg" src="../../static/images/APP-01_0006_DI-2.png" alt="">
            <img slot="activeImg" src="../../static/images/APP-01_0002_DI-choose2.png" alt="">
        </TabItem>
        <TabItem txt="会员中心" mark="pages/vip/vip" :sel="selected" @change-selected="changeSelected">
            <img slot="normalImg" src="../../static/images/blue.png" alt="">
            <img slot="activeImg" src="../../static/images/orange.png" alt="">
        </TabItem>
        <TabItem txt="口袋" mark="pages/pocket/pocket" :sel="selected" @change-selected="changeSelected">
            <img slot="normalImg" src="../../static/images/APP-01_0005_DI-3.png" alt="">
            <img slot="activeImg" src="../../static/images/APP-01_0001_DI-choose3.png" alt="">
        </TabItem>
        <TabItem txt="我的" mark="pages/mine/mine" :sel="selected" @change-selected="changeSelected">
            <img slot="normalImg" src=".../../static/images/APP-01_0004_DI-4.png" alt="">
            <img slot="activeImg" src="../../static/images/APP-01_0000_DI-choose4.png" alt="">
        </TabItem>
    </div>
</template>

<script>
import TabItem from "./tabbarItem"
export default {
    data(){
        return {
            selected:this.$route.meta.pagePath,
        }
    },
    methods:{
        changeSelected(sel){
			console.log(this.$route)
            this.selected = sel;
        }
    },
    components:{
        TabItem
    }
}
</script>

<style lang="scss">
    .tabbar{
        position: fixed;
        width:100%;
        height:100upx;
        left:0;
        bottom:0;
        background: #fff;
        display: flex;
		border-top:2upx solid #999999;
		z-index:200;
		.tabitem:nth-child(3){
			img{
				border-radius:50%;
				width:100upx;
				height:100upx;
				border :10upx solid #fff;
				margin-top:-58upx;
			}
			span{
				margin-bottom:10upx;
			}
		}
    }
</style>
