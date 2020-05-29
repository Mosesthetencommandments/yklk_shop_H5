import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex)
import mycar from "./mycar"
import userInfo from "./userInfo"
export default new Vuex.Store({
	modules:{
		mycar,
		userInfo,
	}
})