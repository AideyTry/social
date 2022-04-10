/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-02-25 17:56:49
 * @LastEditTime: 2022-04-10 22:55:08
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

export const deleteFollow = (params) => {
	return request(`/communications/deleteFollow`,'POST', params)
}

export const getFollows = (params) => {
	return request(`/communications/getFollows`,'GET', params)
}

export const getFollowsInfo = (params) => {
	return request(`/communications/getFollowsInfo`,'POST', params)
}

export const getFansInfo = (params) => {
	return request(`/communications/getFansInfo`,'POST', params)
}

export const getFans = (params) => {
	return request(`/communications/getFans`,'GET', params)
}

export const setComment = (params) => {
	return request(`/communications/setComment`,'POST', params)
}

export const getComment = (params) => {
	console.log('params=====================', params)
	return request(`/communications/getComment`,'GET', params)
}

export const setLike = (params) => {
	return request(`/communications/setLike`,'POST', params)
}

export const getLike = (params) => {
	return request(`/communications/getLike`,'GET', params)
}