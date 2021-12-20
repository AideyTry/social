<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:52:36
 * @LastEditTime: 2021-12-20 18:06:01
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
	<view class="userinfo-wraper">
	    <view >
			<text>用户名：</text>
			<text></text>
		</view>
		<button @click="onLogout">退出</button>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
	import { removeToken } from '../../utils/auth'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
		  ...mapGetters('user', ['userInfo'])
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
