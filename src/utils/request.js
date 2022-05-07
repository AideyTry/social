/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:41:15
 * @LastEditTime: 2022-05-06 14:32:19
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { getToken, getIMToken } from './auth.js'

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

export const request = (url, method, data = {}, contentType = 'application/json') => {
	console.log('url===', url)
	console.log('process.env.BASE_URL=', process.env.BASE_URL)
	console.log('contentType===', contentType)
	return new Promise((resolve, reject) => {
		showLoading()
		uni.request({
			// url: `http:127.0.0.1:3000${url}`,
			url: process.env.BASE_URL + url,
			method,
			data,
			header: {
			  'Content-Type': contentType,
			  'token': getToken()
			},
			success: res => {
				resolve(res)
				// showToast(res.data.msg)
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

export const requestIM = (url, method, data = {}, contentType = 'application/json') => {
	console.log('url===', url)
	console.log('contentType===', contentType)
	return new Promise((resolve, reject) => {
		showLoading()
		uni.request({
			url: process.env.BASE_URL + url,
			method,
			data,
			header: {
			  'Content-Type': contentType,
			  'token': getIMToken()
			},
			success: res => {
				resolve(res)
				// showToast(res.data.msg)
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