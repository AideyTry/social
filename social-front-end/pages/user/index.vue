<template>
	<view>
	    <view>
			<text>用户名：</text>
			<text></text>
		</view>
		<button @click="onLogout">退出</button>
	</view>
</template>

<script>
	import { removeToken } from '../../utils/auth.js'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			onLogout(){
				new Promise((resolve, reject) => {
					removeToken()
					resolve()
				}).then(() => {
					location.reload()
				})
			}
		}
	}
</script>

<style>

</style>
