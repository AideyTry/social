<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-01 16:48:06
 * @LastEditTime: 2021-12-17 16:07:59
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<script>
	import {
		getToken
	} from './utils/auth.js'
	import { getUserInfo } from './api/user'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let info = uni.getSystemInfoSync()
			console.log('info===', info)
			if (!getToken()) {
				uni.navigateTo({
					url: "pages/login/index"
				});
			}
		getUserInfo().then(res => {
					console.log('userInfo========', res)
		})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("static/css/common.css");
</style>
