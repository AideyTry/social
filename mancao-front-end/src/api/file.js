/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-22 11:15:02
 * @LastEditTime: 2021-12-22 11:15:02
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { request } from '../utils/request.js'

export const fileUpload = (params) => {
	return request(`/users/uploadFile`,'POST', params)
}