/**
 * 云函数调用封装
 * hideLoading：是否隐藏弹窗 true:无弹窗 ,false or 不传:有弹窗
 */

module.exports = {
	call(service, data, hideLoading) {
		return new Promise((resolve, reject) => {
			if (hideLoading) {
				uniCloud.callFunction({
					name: service,
					data: data
				}).then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				}).finally(() => {})
			} else {
				uni.showLoading({
					title: '处理中......',
					success: () => {
						setTimeout(function(){
							uni.hideLoading();
						},6000);
						uniCloud.callFunction({
							name: service,
							data: data
						}).then(res => {
							resolve(res)
						}).catch(err => {
							reject(err)
						}).finally(() => {
							uni.hideLoading();
						})
					}
				})
			}
		})
	}
}