import http from '../common/http.js'

// 获取首页轮播图
export const getSwapperListApi = () => {
	return http.get('/app/swiper')
}

// 获取热推客房
export const getHotListApi = () => {
	return http.get('/app/getlist')
}

// 获取热推客房详情信息
export const getInfoByIdApi = (info_id) => {
	// return http.get('/app/getlist')
	return http.get(`/app/getlist/${info_id}`)
}

// 客房预订提交
export const bookOrderApi = (parm) => {
	return http.post('/app/bookOrder', parm)
}

// 查询订单
export const getOrderListApi = (parm) => {
	return http.get('/app/home/getOrder', parm)
}

export const leaveApi = (room_id) => {
	return http.put(`/app/leave/${room_id}`)
}

// 反馈意见提交
export const addSuggestApi = (parm) => {
	return http.post('/app/suggest', parm)
}