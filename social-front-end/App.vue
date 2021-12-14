<script>
	import {
		getToken
	} from './utils/auth.js'
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
