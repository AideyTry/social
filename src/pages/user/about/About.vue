<template>
  <view class="about-wraper">
    <view class="title-logo">
      <image :src="defaultLogo" class="logo"></image>
      <view><uni-title type="h1" title="蔓草兴趣" color="#363636"></uni-title></view>
      <!-- #ifdef H5 -->
      <view class="version"><text>HTML5 版 v0.0.1</text></view>
      <!-- #endif -->
      <!-- #ifdef APP-PLUS -->
      <view class="version"><text>APP版 v0.0.1</text></view>
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      <view class="version"><text>微信小程序版本 v0.0.1</text></view>
      <!-- #endif -->
      <view class="description-wraper"><text class="description">蔓草兴趣是一款包含英语学习、兴趣爱好分享、聊天的社交应用。</text></view>
    </view>
  </view>
</template>

<script>
import {  ref } from 'vue'
export default {
  setup() {
    const defaultLogo = "/static/logo.png"
    return {
      defaultLogo
    };
  },
};
</script>

<style scoped lang="scss">
.about-wraper {
  background-color: #f2f2f2;
  position: absolute;
  top: 0;
  bottom: 0;
  left:0;
  right:0;
}
.title-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 80rpx;
  .logo {
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
  }
  .version{
    color: #e76f59;
    font-size: 24rpx;
  }
  .description-wraper{
    padding: 30rpx 100rpx;
    .description{
        display: inline-block;
        color: #363636;
        font-size: 32rpx;
        text-indent: 2em;
  }
  }
}
</style>
