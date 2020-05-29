import {SYNC_UPDATE} from "./const"
export default {
	//初始化购物车
	
	initCar({commit}){
		let cars = getCar()
		commit(SYNC_UPDATE,cars)
	},
	//添加商品到购物车
	addGoodInCar({commit},goodInfo){
		let cars = getCar()
		let isHas = cars.some(item =>{
			if(item.id === goodInfo.id){
				item.num++
				return true
			}
		})
		if(!isHas){
			goodInfo.num = 1;
			cars.push(goodInfo)
		}
		localStorage.cars = JSON.stringify(cars)
		commit(SYNC_UPDATE,cars)
	},
	//减少商品到购物车
	reduceGoodInCar({commit},goodInfo){
		let cars = getCar()
		cars = cars.filter(item =>{
			if(item.id === goodInfo.id){
				item.num--
				if(item.num <= 0){
					return false
				} 
			}
			return true
		})
		localStorage.cars = JSON.stringify(cars)
		commit(SYNC_UPDATE,cars)
	}
}



	



//localStorage

function getCar(){
	return localStorage.cars? JSON.parse(localStorage.cars) : [] 
}

