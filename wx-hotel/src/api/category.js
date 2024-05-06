import http from '../common/http.js'

// export const getCategoryListApi = () => {
// 	return http.get('/app/category')
// }

export const getListApi = () => {
	return http.get('/app/category/list')
}