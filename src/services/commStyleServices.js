
import request from '../utils/request.js';


/**
 * 保存信息接口
 * @param  {number} type   pub->0 pc->1 wap->2
 * @param  {object} params state
 * @return {[type]}        服务器返回的数据
 */
export async function saveStyle(type, params){
	const data = await request(
		'/api/saveState?type=' + type,
		{
			method: 'POST',
			body: JSON.stringify(params)
		}
	);

	return data;
}
