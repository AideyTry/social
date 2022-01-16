/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-01-16 17:21:18
 * @LastEditTime: 2022-01-16 17:22:19
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { request } from '../utils/request.js'

// export const sendCode = (params) => {
// 	console.log('send params=', params)
// 	return request(`/users/sendCode`,'POST', params)
// }

export const getVideoList = () => {
	console.log('send params=')
	return request(`/users/getVideoList`,'GET')
}
