/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:41:15
 * @LastEditTime: 2022-05-09 18:27:34
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { request } from '../utils/request.js'

// export const sendCode = (params) => {
// 	console.log('send params=', params)
// 	return request(`/users/sendCode`,'POST', params)
// }

export const sendCode = (params) => {
	console.log('send params=', params)
	return request(`/users/sendCodeTencent`,'POST', params)
}

export const codePhoneLogin = (params) => {
	return request(`/users/codePhoneLogin`,'POST',params)
}

export const setGender = (params) => {
	return request(`/users/setGender`,'POST',params)
}

export const getUserInfo = () => {
	return request(`/users/userInfo`,'GET')
}

export const getFrendInfo = (params) => {
	return request(`/users/frendInfo`,'GET', params)
}

export const getSchool = (params) => {
	return request('/users/getSchool', 'GET', params)
}

export const editUserInfo = (params) => {
	console.log('params=e==', params)
	return request(`/users/editUserInfo`,'POST',JSON.stringify(params.form))
}