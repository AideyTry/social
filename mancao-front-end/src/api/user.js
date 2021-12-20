/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:41:15
 * @LastEditTime: 2021-12-20 10:59:30
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { request } from '../utils/request.js'

export const sendCode = (params) => {
	console.log('send params=', params)
	return request(`/users/sendCode`,'GET',params)
}

export const codePhoneLogin = (params) => {
	return request(`/users/codePhoneLogin`,'GET',params)
}

export const getUserInfo = () => {
	return request(`/users/userInfo`,'GET')
}