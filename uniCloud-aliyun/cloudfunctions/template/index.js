'use strict';
//云数据库
const db = uniCloud.database();

exports.main = async (event, context) => {
	//访问云函数
	switch (event.method) {
		case 'queryTemplate':
			return queryTemplate(event)
			break;
		default:
			break;
	}
};

// app请求成功返回
function serverSuccess(data, retmsg) {
	return {
		"retcode": "0000",
		"retmsg": retmsg ? retmsg : "操作成功",
		"data": data
	}
}
// app请求失败返回
function serverFailure(retmsg) {
	return {
		"retcode": "0001",
		"retmsg": retmsg ? retmsg : '系统异常，请联系管理员',
		"data": null
	}
}

/**
 * 查询海报模板
 */
async function queryTemplate(data) {
	try {

		let tem = await db.collection('template').get()
		return serverSuccess(tem)
	} catch (err) {
		return err.message
	}
}
