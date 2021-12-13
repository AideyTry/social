<template>
	<view class="content">
	  <view class="list-wraper">
		 <view class="list-item" v-for="(index, item) in list" :key="index">
			 <text>{{item}}</text>
		 </view>
	  </view>
	</view>
</template>

<script>
	import {request} from '../../utils/request.js'
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			// request('/users/codePhoneLogin?phone=18018751313&code=316782', 'GET').then((data) => {
			// 	console.log('data1=', data)
			// }).finally(() => {
			// 	console.log('end11')
			// })
			// uni.request({
			// 	url: 'https://unidemo.dcloud.net.cn/api/news',
			// 	method: 'GET',
			// 	data: {},
			// 	success: res => {
			// 		console.log('res===', res)
			// 	},
			// 	fail: (err) => {
			// 		console.log('err=', err)
			// 	},
			// 	complete: () => {
			// 		console.log('complete')
			// 	}
			// })
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
