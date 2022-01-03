/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-01-02 16:20:49
 * @LastEditTime: 2022-01-03 17:32:37
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { request } from '../utils/request.js'

export const loginWechat = (params) => {
	return request(`http://127.0.0.1:3000/users/loginWechat`,'GET', params)
}
