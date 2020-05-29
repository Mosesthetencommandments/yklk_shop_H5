<template>
    <div class="tabbar">
        <TabItem txt="首页" mark="pages/cloudWarehouse/cloudWarehouse" :sel="selected" @change-selected="changeSelected">
            <img slot="normalImg" src="../../static/images/qie01_0002_形状-7-拷贝.png" alt="">
            <img slot="activeImg" src="../../static/images/qie01_0004_形状-7.png" alt="">
        </TabItem>
        <TabItem txt="我" 
			mark="pages/cloudWarehouse/WarehouseMine" 
			:sel="selected" 
			@change-selected="changeSelected">
            <img slot="normalImg" src="../../static/images/qie01_0001_形状-10-拷贝.png" alt="">
            <img slot="activeImg" src="../../static/images/qie01_0003_形状-10.png" alt="">
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
