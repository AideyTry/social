/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-05-14 00:51:54
 * @LastEditTime: 2022-05-14 13:45:52
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
const totalKey = 'totalIM'
const userKey = 'userinfo'

export function getTotalIM(){
	return uni.getStorageSync(totalKey)
}


export function setTotalIM(data) {
  return uni.setStorageSync(totalKey,data)
}

export function getStoreUserInfo(){
	return uni.getStorageSync(userKey)
}


export function setStoreUserInfo(data) {
  return uni.setStorageSync(userKey, data)
}