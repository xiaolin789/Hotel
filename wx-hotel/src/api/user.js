import http from '../common/http.js'

export const wxLoginApi = (code) => {
	return http.post("/wxapi/user/wxLogin", {code:code})
}