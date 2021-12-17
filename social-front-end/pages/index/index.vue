<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-01 16:48:06
 * @LastEditTime: 2021-12-17 16:08:06
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
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
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
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
