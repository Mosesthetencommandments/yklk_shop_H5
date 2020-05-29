import {SYNC_UPDATE} from "./const"
export default {
	[SYNC_UPDATE](state,cars){
		state.cars = cars
	}
}