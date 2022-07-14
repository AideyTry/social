<template>
  <view class="setting-wrapper">
    <view class="setting" @click="onEdit">
      <text>编辑</text>
      <span class="iconfont"> &#xe662; </span>
    </view>
    <view class="setting" @click="onAbout">
      <text>关于蔓草</text>
      <span class="iconfont"> &#xe662; </span>
    </view>
    <view class="logout-wraper">
      <button @click="onCancel" class="cancel">账户注销</button>
      <button @click="onLogout" class="logout">退出登录</button>
    </view>
  </view>
</template>

<script>
import { ref } from "vue";
import { removeToken } from "@/utils/auth";
export default {
  setup() {
    const onEdit = () => {
      //#ifdef APP-PLUS || H5
      uni.navigateTo({
        url: "/pages/user/info/index",
      });
      //#endif
      //#ifdef MP-WEIXIN
      uni.navigateTo({
        url: "/pages/userInfo/infoIndex/InfoIndex",
      });
      //#endif
    };
    const onAbout = () => {
      //#ifdef APP-PLUS || H5
      uni.navigateTo({
        url: "/pages/user/about/about",
      });
      //#endif
      //#ifdef MP-WEIXIN
      uni.navigateTo({
        url: "/pages/userInfo/about/about",
      });
      //#endif
    };
    const onCancel = () => {};
    const onLogout = () => {
      new Promise((resolve, reject) => {
        removeToken();
        resolve();
      }).then(() => {
        //#ifdef H5
        location.reload();
        //#endif
        //#ifdef APP-PLUS || MP-WEIXIN
        uni.reLaunch({
          url: "/pages/login/index",
        });
        //#endif
      });
    };
    return {
      onEdit,
      onAbout,
      onCancel,
      onLogout,
    };
  },
};
</script>

<style scoped lang="scss">
.setting-wrapper {
  padding: 40rpx;
  .setting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
    border-bottom: 1rpx solid #dbdbdb;
  }
  .logout-wraper {
    margin-top: 60rpx;
    .cancel {
      background-color: #ccc;
      color: #fff;
    }
    .logout {
      margin-top: 30rpx;
      background-color: #000;
      color: #fff;
    }
  }
}
</style>
