/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-22 11:15:02
 * @LastEditTime: 2022-02-03 22:52:55
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