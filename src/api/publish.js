/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-03-01 23:21:49
 * @LastEditTime: 2022-03-05 15:25:25
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { request } from '../utils/request.js'

export const getPublish = (params) => {
	console.log('params===', params)
	return request(`/publishs/getPublish`,'GET', params)
}

export const getMylikes = (params) => {
	console.log('params===', params)
	return request(`/publishs/getMylikes`,'GET', params)
}
