/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-22 11:15:02
 * @LastEditTime: 2022-02-23 16:13:10
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

/**
 * @description: 上传图片
 * @param {*} params
 * @Author: 
 * @return {*}
 */
export const uploadImage = (params) => {
	return request(`/files/uploadImage`, 'POST', params, 'application/x-www-form-urlencoded')
}

/**
 * @description: 上传视频文件
 * @param {*} params
 * @Author: 
 * @return {*}
 */
export const uploadLargeFile = (params) => {
	return request(`/files/uploadLargeFile`, 'POST', params, 'form')
}


/**
 * @description: 合并视频文件并传递输入的参数
 * @param {*} params
 * @Author: 
 * @return {*}
 */
export const mergeFile = (params) => {
	return request(`/files/mergeFile`, 'POST', params)
}