
<script>
	export default {
		onLaunch: function() {
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onLoad() {
			// this.wxicon()
		},
		created(){
			// this.$store.dispatch("initCar")
		},
		data(){
			return{
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
	::-webkit-scrollbar{
		display: none;
	}
</style>
