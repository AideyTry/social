/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-01-13 16:06:25
 * @LastEditTime: 2022-05-06 13:40:32
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
const tokenKey = 'TOKEN'
const tokenKeyIM = 'TOKENIM'

export function getToken(){
	return uni.getStorageSync(tokenKey)
}


export function setToken(token) {
  return uni.setStorageSync(tokenKey,token)
}

export function removeToken() {
  return uni.removeStorageSync(tokenKey);
}


export function getIMToken(){
	return uni.getStorageSync(tokenKeyIM)
}


export function setIMToken(token) {
  return uni.setStorageSync(tokenKeyIM,token)
}

export function removeIMToken() {
  return uni.removeStorageSync(tokenKeyIM);
}