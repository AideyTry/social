/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-05-06 13:42:04
 * @LastEditTime: 2022-05-07 12:18:39
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { request } from '../utils/request.js'

export const imLogin = (params) => {
	return request(`/communications/imLogin`,'POST', params)
}

export const imRegister = (params) => {
	return request(`/communications/imRegister`,'POST', params)
}