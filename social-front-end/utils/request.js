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

export const request = (url, method, data = {}) => {
	return new Promise((resolve, reject) => {
		showLoading()
		uni.request({
			url,
			method,
			data,
			header: {
			  'Content-Type': 'application/json',
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