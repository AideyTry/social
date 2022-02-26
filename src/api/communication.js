/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-02-25 17:56:49
 * @LastEditTime: 2022-02-26 22:28:44
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { request } from '../utils/request.js'

export const setFollow = (params) => {
	return request(`/communications/setFollow`,'POST', params)
}

export const getFollow = (params) => {
	return request(`/communications/getFollow`,'GET', params)
}