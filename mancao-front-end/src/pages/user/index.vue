<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:52:36
 * @LastEditTime: 2022-01-01 15:56:26
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view class="userinfo-wraper">
    <view class="userinfo">
      <view class="avatar-warper" @click="onUserInfo">
        <image
          :src="userInfo.avatar ? userInfo.avatar : defaultAvatar"
          class="avatar"
        ></image>
        <text class="avatar-title">请上传图片</text>
      </view>
      <view class="userinfo-detail">
        <text>用户名：{{ userInfo.username }}</text>
        <text>签名{{ userInfo.motto }}</text>
      </view>
    </view>
    <button @click="onLogout">退出</button>
  </view>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { removeToken } from "../../utils/auth";

const defaultAvatar = "/static/images/default_avatar.png";
const store = useStore();
const userInfo = computed(() => store.state.user.userInfo).value;

const onLogout = () => {
  new Promise((resolve, reject) => {
    removeToken();
    resolve();
  }).then(() => {
    location.reload();
  });
};

const onUserInfo = () => {
  uni.navigateTo({
    url: '/pages/user/info/index'
});
}
</script>

<style lang="scss" scoped>
.userinfo-wraper {
  padding: 40rpx;
}
.userinfo {
  display: flex;
  .userinfo-detail {
    padding-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
.avatar-warper {
  position: relative;
}
.avatar {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
}
.avatar-title {
  position: absolute;
  left: 6%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12rpx;
}
</style>
