import { request } from '../utils/request.js'

export const sendCode = (params) => {
	return request(`/users/sendCode`,'GET',params)
}

export const codePhoneLogin = (params) => {
	return request(`/users/codePhoneLogin`,'GET',params)
}

export const getUserInfo = () => {
	return request(`/users/userInfo`,'GET')
}