const tokenKey = 'TOKEN'

export function getToken(){
	return uni.getStorageSync(tokenKey)
}


export function setToken(token) {
  return uni.setStorageSync(tokenKey,token)
}

export function removeToken() {
  return uni.removeStorageSync(tokenKey);
}