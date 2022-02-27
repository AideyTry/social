/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-02-25 17:56:49
 * @LastEditTime: 2022-02-27 16:02:35
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { request } from '../utils/request.js'

export const setFollow = (params) => {
	return request(`/communications/setFollow`,'POST', params)
}

export const getFollow = (params) => {
	console.log('params===', params)
	return request(`/communications/getFollow`,'GET', params)
}

export const getFollows = (params) => {
	return request(`/communications/getFollows`,'GET', params)
}

export const getFans = (params) => {
	return request(`/communications/getFans`,'GET', params)
}