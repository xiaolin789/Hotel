import http from '../common/http.js'


export const getFoodListApi = () => {
	return http.get('/app/getfoodlist')
}


export const getfoodByIdApi = (id) => {
	// return http.get('/app/getlist')
	return http.get(`/app/getfoodlist/${id}`)
}

export const foodOrderApi = (parm) => {
	return http.post('/app/foodOrder', parm)
}

export const getOrderListApi = (parm) => {
	return http.get('/app/food/getOrder', parm)
}

export const cancelApi = (id) => {
	return http.put(`/app/cancel/${id}`)
}