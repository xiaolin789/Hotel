// 接口请求的地址，真实上线是一个域名
const baseUrl = 'http://localhost:3000'
const http = (options = {}) => {
	return new Promise((resolve, reject) => {
		uni.request({
				url: baseUrl + options.url || '',
				method: options.type || 'GET',
				data: options.data || {},
				headers: options.headers || {},
			}).then((response) => {
				console.log(response);
				resolve(response.data)
			}).catch(error => {
				reject(error)
			})
		})
}
const get = (url, data, options = {}) => {
	options.type = 'get';
	options.data = data;
	options.url = url;
	return http(options)
}
const post = (url, data, options = {}) => {
	options.type = 'post';
	options.data = data;
	options.url = url;
	return http(options)
}
const put = (url, data, options = {}) => {
	options.type = 'put';
	options.data = data;
	options.url = url;
	return http(options)
}

export default {
	get,
	post,
	put
}