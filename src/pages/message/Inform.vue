<template>
  <view class="inform-wrapper">
    <view class="inform" @click="goInform('头像、资料作假')">
      <text>头像、资料作假</text>
      <span class="iconfont"> &#xe662; </span>
    </view>
    <view class="inform" @click="goInform('广告、营销')">
      <text>广告、营销</text>
      <span class="iconfont"> &#xe662; </span>
    </view>
    <view class="inform" @click="goInform('诈骗、托儿')">
      <text>诈骗、托儿</text>
      <span class="iconfont"> &#xe662; </span>
    </view>
    <view class="inform" @click="goInform('色情低俗')">
      <text>色情低俗</text>
      <span class="iconfont"> &#xe662; </span>
    </view>
    <view class="inform" @click="goInform('恶意骚扰、不文明语音')">
      <text>恶意骚扰、不文明语音</text>
      <span class="iconfont"> &#xe662; </span>
    </view>
    <view class="inform" @click="goInform('涉及未成年人有害信息')">
      <text>涉及未成年人有害信息</text>
      <span class="iconfont"> &#xe662; </span>
    </view>
    <view class="inform" @click="goInform('0')">
      <text>其他</text>
      <span class="iconfont"> &#xe662; </span>
    </view>
    <view class="hint-wraper">
      <view class="hint"
        ><text>请告诉举报原因，让我们一起让蔓草兴趣变得更好！</text></view
      >
      <view class="hint"
        ><text>（为了保护您的隐私，完全匿名举报，请放心填写）</text></view
      >
    </view>
  </view>
</template>
<script>
export default {
  setup() {
    const goInform = (title) => {
          uni.navigateTo({
    url: `/pages/message/InformDetail?title=${title}`,
  });
    }
    return {
        goInform
    }
  },
};
</script>

<style lang="scss" scoped>
.inform-wrapper {
  padding: 40rpx;
  .inform {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
    border-bottom: 1rpx solid #dbdbdb;
  }
  .hint-wraper {
    position: fixed;
    bottom: 60rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #787878;
    .hint {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 60rpx;
    }
  }
}
</style>
