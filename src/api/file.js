/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-22 11:15:02
 * @LastEditTime: 2022-02-10 16:45:50
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { request } from '../utils/request.js'

export const fileUpload = (params) => {
	return request(`/users/uploadFile`,'POST', params)
}

export const uploadVideo = (params) => {
	return request(`/files/uploadVideo`, 'POST', params)
}

export const uploadImage = (params) => {
	return request(`/files/uploadImage`, 'POST', params, 'image')
}