/**
 * user模块
 * user相关服务
 */
let {call} = require('../utils/call.js')

module.exports = {
	queryTemplate(data,hideLoading) {
		data.method = 'queryTemplate'
		return callit(data,hideLoading)
	}
}

const callit = (data,hideLoading) => {
	return call('template', data,hideLoading)
}
