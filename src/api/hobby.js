/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-01-16 17:21:18
 * @LastEditTime: 2022-02-23 22:15:39
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { request } from '../utils/request.js'

// export const sendCode = (params) => {
// 	console.log('send params=', params)
// 	return request(`/users/sendCode`,'POST', params)
// }

export const getVideoList = (params) => {
	return request(`/users/getVideoList`,'GET', params)
}


export const videoDetail = (params) => {
	return request(`/users/getVideoDetail`,'GET', params)
}


export const getHobbyList = (params) => {
	return request(`/files/getHobbyList`,'GET', params)
}