/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:41:15
 * @LastEditTime: 2022-02-10 16:44:39
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { getToken } from './auth.js'

// 显示加载loading
function showLoading(title) {
  uni.showLoading({
    title: title || '加载中...'
  })
}
// 隐藏加载loading
function hideLoading() {
  uni.hideLoading()
}

// 加载之后提示
function showToast(title) {
  uni.showToast({
    title: title,
    icon: 'none',
    duration: 2000
  })
}

export const request = (url, method, data = {}, fileType) => {
	console.log('url===', url)
	console.log('process.env.BASE_URL=', process.env.BASE_URL)
	return new Promise((resolve, reject) => {
		showLoading()
		uni.request({
			// url: `http:127.0.0.1:3000${url}`,
			url: process.env.BASE_URL + url,
			method,
			data,
			header: {
			  'Content-Type': fileType === 'image' ? 'application/x-www-form-urlencoded' : 'application/json',
			  'token': getToken()
			},
			success: res => {
				resolve(res)
				showToast('成功')
			},
			fail: (err) => {
				showToast('网络请求失败')
				reject(err)
			},
			complete: () => {
				hideLoading()
			}
		})
	})
}