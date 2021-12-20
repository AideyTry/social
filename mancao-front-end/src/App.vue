<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:33:16
 * @LastEditTime: 2021-12-20 18:02:55
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<script>
	import {
		getToken
	} from './utils/auth.js'
	import { store } from './store'
export default {
  onLaunch: function () {
    console.log('App Launch')
    			if (!getToken()) {
				uni.navigateTo({
					url: "pages/login/index"
				});
			} else {
             store.dispatch('user/GetUserInfo')
			}
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
	/*每个页面公共css */
	@import url("static/css/common.css");
</style>
