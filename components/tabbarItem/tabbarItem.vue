<template>
	<div class="tabitem" @click="change">
		<span v-if="!flag"><slot name="normalImg"></slot></span>
		<span v-else><slot name="activeImg"></slot></span>
		<span :class="{active:flag}">{{txt}}</span>
	</div>
   
</template>

<script>
export default {
    props:["txt","mark","sel","mark1","mark2"],
    methods:{
        change(){
            this.$router.push("/" + this.mark)
        }
    },
    computed:{
        flag(){
            if(this.mark === this.sel){
                return true
            }
            return false
        }
    }
}
</script>

<style lang="scss">
	 .tabitem{
		flex:1;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size:24upx;
		span{
			margin-top:10upx;
		}
		img{
			width:40upx;
			height:40upx;
		}
		.active{
			color:#f49c17;
		}
		z-index:5
	}

</style>
